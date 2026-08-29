import express, { Request, Response } from "express";
import path from "path";
import multer from "multer";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { PDFParse } from "pdf-parse";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// In-memory file storage only - never saved to disk or persistent storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB absolute upper limit for PDF
    files: 1,
  },
});

// Simple in-memory rate limiter per IP (e.g. max 35 requests per hour)
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimits = new Map<string, RateLimitRecord>();
const RATE_LIMIT_MAX = 35;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimits.get(ip);

  if (!record || now > record.resetTime) {
    rateLimits.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count += 1;
  return true;
}

// Allowed MIME types & extensions mapping
const ALLOWED_IMAGE_MIMES = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_PDF_MIMES = ["application/pdf"];
const REJECTED_EXTENSIONS = [
  ".doc", ".docx", ".txt", ".rtf", ".heic", ".heif", ".tiff",
  ".gif", ".bmp", ".csv", ".xlsx", ".mp4", ".mov", ".avi", ".mp3", ".wav"
];

const SYSTEM_PROMPT = `You are MediExplain AI, an educational medical terminology and laboratory report explanation assistant.

ROLE:
Your role is to explain medical terms and laboratory measurements in uploaded reports using simple educational language. You help users understand what medical words and test names generally mean.

IMPORTANT SAFETY RULES:
- You provide educational information only.
- You do NOT evaluate health.
- You do NOT interpret results for the user personally.
- You do NOT provide medical advice, diagnosis, risk assessment, or recommendations.
- You do NOT tell users whether results are good or bad.
- You do NOT suggest treatments, actions, or lifestyle changes.
- Users must consult healthcare professionals for medical interpretation.

LANGUAGE RULES:
- The user will request analysis in either ENGLISH ('en') or HINDI ('hi').
- When the requested language is ENGLISH ('en'):
  Write ALL explanatory content — "whatItMeasures", "whyMeasured", "simpleSummary", "foodSources", and "unclearMessage" — strictly in clear, simple, beginner-friendly ENGLISH. Do NOT include any Hindi words, Hindi sentences, or Devanagari Hindi script.
- When the requested language is HINDI ('hi'):
  Write all explanatory content — "whatItMeasures", "whyMeasured", "simpleSummary", "foodSources", and "unclearMessage" — in simple, natural Hindi that a general reader without a medical background can easily understand. Use commonly spoken Hindi mixed with widely understood English medical terms where helpful (e.g. keep "हीमोग्लोबिन (Hemoglobin)" together).
- REGARDLESS OF LANGUAGE:
  Do NOT translate the "testName", "value", or "referenceRange" fields — these must remain exactly as extracted from the original report, since altering them could introduce errors.

All safety rules remain identical regardless of language: still no
diagnosis, no personal health evaluation, no treatment suggestions, and
the disclaimer must still be included, translated accurately and in full.

WHEN A USER UPLOADS A REPORT:
1. Extract ALL visible test names, values, and reference ranges exactly as written.
2. Present the information clearly without judging or evaluating results.
3. Generate a detailed educational explanation for EVERY test detected in the input, including tests within the reference range / normal range. Do NOT omit normal-range tests.
For each test include:
- Test Name (exact text from report)
- Value (as shown)
- Reference Range (as written)
- Range Status: "Above Range", "Below Range", "Within Range", or "Unable to determine"
- What this test measures (general biology explanation in requested language for ALL tests)
- Why laboratories commonly measure it (educational purpose in requested language for ALL tests)
- Food Sources: general educational food-source note in requested language ONLY when rangeStatus is "Above Range" or "Below Range" AND a direct, meaningful dietary relationship exists (such as iron for low hemoglobin, soluble fiber for high cholesterol/glucose). For all tests without a direct dietary relationship (such as MPV, P-LCR, Platelets, WBC, ESR, Bilirubin, Creatinine, etc.) or when Within Range, set foodSources strictly to null. Do NOT output generic sentences saying 'this test has no specific diet' — return null.

DO NOT:
- classify results as normal or abnormal
- assess health condition
- estimate risk
- provide personalized interpretation

COMMUNICATION STYLE:
- Use simple, beginner-friendly language in the requested language (English or natural Hindi).
- Explain concepts like a teacher, not a doctor.
- Stay neutral and informational.
- Avoid alarming language.
- If report text is unclear, ask for a clearer image.

OUTPUT FORMAT:
📄 Report Information (Extracted Data with Range Status for ALL detected tests)
🧪 Test Explanations (Detailed educational explanation for EVERY detected test; Food Sources ONLY for applicable Above/Below Range tests with direct dietary relationships)
🧾 Simple Understanding (A short educational summary explaining what types of tests appear in the report.)
⚠️ Disclaimer:
This app provides educational information only and does not provide medical advice or medical interpretation. Consult a qualified healthcare professional for medical guidance.

ADDITIONAL FEATURE — RANGE STATUS & GENERAL FOOD-SOURCE INFORMATION:

For each test, compare the value against the reference range printed on
the report itself, and label it as "Above Range", "Below Range", "Within
Range", or "Unable to determine" if the range format is unclear. This is a
literal numeric comparison against the document's own printed range —
never infer a range that isn't shown.

When a test is "Above Range" or "Below Range" and has a direct, meaningful dietary connection
(for example, for low hemoglobin/iron-related tests, mention iron-rich foods; for high blood glucose
or cholesterol, mention soluble fiber and complex carbohydrates), you may add a short,
GENERAL, EDUCATIONAL note about food sources commonly associated with the nutrient or substance that test relates to.
If an abnormal test has no meaningful dietary relationship (such as MPV, P-LCR, Platelets, WBC, ESR, Creatinine, etc.)
or if the test is "Within Range", set foodSources strictly to null. Never output filler text stating that there is no diet.

STRICT RULES FOR THIS FEATURE:
- Never state or imply the person has a deficiency, disorder, or diagnosis
  (e.g. do NOT say "you have anemia" or "your iron is too low").
- Never claim these foods will "fix," "cure," "treat," "normalize," or
  "correct" the result. Use neutral educational phrasing like "foods
  commonly associated with [nutrient]" rather than "eat this to fix it."
- Never suggest supplements, dosages, or medications.
- Never suggest this replaces medical evaluation.
- Keep food-source notes short (2-3 sentences), general, and factual —
  not a meal plan or diet regimen.
- Always end any food-source note with a reminder to discuss the result
  with a healthcare professional before making dietary changes.`;

// Gemini client initialization
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    throw new Error("GEMINI_API_KEY is not configured. Please set a valid Gemini API key in your .env file or environment variables.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Middleware
app.use(express.json({ limit: "20mb" }));

// Health check route
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Analyze report endpoint
app.post("/api/analyze-report", upload.single("file"), async (req: Request, res: Response): Promise<void> => {
  try {
    const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.ip || "127.0.0.1";
    
    // Rate limit check
    if (!checkRateLimit(clientIp)) {
      res.status(429).json({
        type: "rate_limit",
        message: "You've reached the request limit. Please try again in a while.",
      });
      return;
    }

    const file = req.file;
    if (!file) {
      res.status(400).json({
        type: "invalid_request",
        message: "Please select a medical report file (JPG, PNG, WEBP, or PDF) to analyze.",
      });
      return;
    }

    const originalName = file.originalname.toLowerCase();
    const ext = path.extname(originalName);

    // Explicit rejection check
    if (REJECTED_EXTENSIONS.includes(ext)) {
      res.status(400).json({
        type: "unsupported_file",
        message: "This file type isn't supported. Please upload a JPG, PNG, or PDF.",
      });
      return;
    }

    const isImage = ALLOWED_IMAGE_MIMES.includes(file.mimetype) || [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
    const isPdf = ALLOWED_PDF_MIMES.includes(file.mimetype) || ext === ".pdf";

    if (!isImage && !isPdf) {
      res.status(400).json({
        type: "unsupported_file",
        message: "This file type isn't supported. Please upload a JPG, PNG, or PDF.",
      });
      return;
    }

    // Size limit check
    if (isImage && file.size > 10 * 1024 * 1024) {
      res.status(400).json({
        type: "file_too_large",
        message: "This file is too large. Please upload an image under 10MB.",
      });
      return;
    }

    if (isPdf && file.size > 15 * 1024 * 1024) {
      res.status(400).json({
        type: "file_too_large",
        message: "This file is too large. Please upload a PDF under 15MB.",
      });
      return;
    }

    const requestedLanguage = (req.body.language === "hi" ? "hi" : "en") as "en" | "hi";
    const ai = getGeminiClient();
    const contents: any[] = [];
    let pageCountNote: string | undefined = undefined;

    if (isImage) {
      const mimeType = file.mimetype || (ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg");
      contents.push({
        inlineData: {
          mimeType: mimeType,
          data: file.buffer.toString("base64"),
        },
      });
      contents.push({
        text: requestedLanguage === "hi"
          ? "कृपया इस मेडिकल रिपोर्ट का विश्लेषण करें। रिपोर्ट में पहचाने गए प्रत्येक टेस्ट (सभी सामान्य/Within Range और असामान्य टेस्ट सहित) के लिए विस्तृत शैक्षिक व्याख्याएं (whatItMeasures, whyMeasured, simpleSummary, unclearMessage) सरल व स्वाभाविक हिन्दी में प्रदान करें। सामान्य टेस्टों को न छोड़ें। खाद्य स्रोत (foodSources) केवल तभी प्रदान करें जब टेस्ट 'Above Range' या 'Below Range' हो और कोई प्रत्यक्ष, सार्थक आहार संबंध मौजूद हो (जैसे हीमोग्लोबिन के लिए आयरन); 'Within Range' टेस्टों और गैर-आहार परीक्षणों (जैसे MPV, P-LCR, प्लेटलेट्स, WBC आदि) के लिए foodSources को सख्ती से null रखें (कोई सामान्य संदेश न लिखें)। टेस्ट नाम (testName), मान (value), और संदर्भ सीमा (referenceRange) को मूल रिपोर्ट के अनुसार ही रखें।"
          : "Please analyze this uploaded medical report image. The user has selected ENGLISH. Generate a detailed educational explanation for EVERY test detected in the report, including tests within the reference range / normal range. Do not omit normal-range tests. For every test provide whatItMeasures and whyMeasured. Provide foodSources ONLY for tests that are 'Above Range' or 'Below Range' where a direct, meaningful dietary relationship exists (such as iron for low hemoglobin). Set foodSources strictly to null for 'Within Range' tests and non-dietary tests (such as MPV, P-LCR, Platelets, WBC, ESR, etc.) without writing generic filler. You MUST provide ALL explanatory text entirely in clear, simple English. Do NOT use Hindi. Keep testName, value, and referenceRange exactly as written in the report.",
      });
    } else if (isPdf) {
      // PDF Processing logic
      const MAX_PDF_PAGES = 8;
      let extractedText = "";
      let totalPages = 1;

      try {
        const parser = new PDFParse({ data: file.buffer });
        const textResult = await parser.getText({ first: MAX_PDF_PAGES });
        extractedText = textResult.text ? textResult.text.trim() : "";
        const infoResult = await parser.getInfo();
        totalPages = infoResult.total || 1;
        await parser.destroy();
      } catch (parseErr) {
        // If pdf-parse has issues, we fall back to multimodal PDF input
        console.warn("PDF text parse notice, proceeding with native PDF processing");
      }

      if (totalPages > MAX_PDF_PAGES) {
        pageCountNote = requestedLanguage === "hi"
          ? `इस दस्तावेज़ में ${totalPages} पृष्ठ हैं। केवल पहले ${MAX_PDF_PAGES} पृष्ठों का विश्लेषण किया गया है।`
          : `This document contains ${totalPages} pages. Only the first ${MAX_PDF_PAGES} pages were analyzed.`;
      }

      // If text was successfully extracted and is rich, pass extracted text as well as PDF inlineData
      if (extractedText.length > 50) {
        contents.push({
          text: requestedLanguage === "hi"
            ? `यहाँ अपलोड किए गए PDF दस्तावेज़ से निकाला गया टेक्स्ट है (विश्लेषण किए गए पृष्ठ: ${Math.min(totalPages, MAX_PDF_PAGES)}):\n\n${extractedText}\n\nइसके अतिरिक्त दृश्य सत्यापन के लिए बाइनरी दस्तावेज़ नीचे संलग्न है।`
            : `Here is the extracted text from the uploaded PDF document (pages analyzed: ${Math.min(totalPages, MAX_PDF_PAGES)}):\n\n${extractedText}\n\nIn addition, the binary document is attached below for visual verification.`,
        });
      }

      contents.push({
        inlineData: {
          mimeType: "application/pdf",
          data: file.buffer.toString("base64"),
        },
      });

      contents.push({
        text: requestedLanguage === "hi"
          ? `कृपया इस मेडिकल रिपोर्ट PDF का विश्लेषण करें। रिपोर्ट में पहचाने गए प्रत्येक टेस्ट (सभी सामान्य/Within Range और असामान्य टेस्ट सहित) के लिए विस्तृत शैक्षिक व्याख्याएं (whatItMeasures, whyMeasured, simpleSummary, unclearMessage) सरल व स्वाभाविक हिन्दी में प्रदान करें। सामान्य टेस्टों को न छोड़ें। खाद्य स्रोत (foodSources) केवल तभी प्रदान करें जब टेस्ट 'Above Range' या 'Below Range' हो और कोई प्रत्यक्ष, सार्थक आहार संबंध मौजूद हो (जैसे हीमोग्लोबिन के लिए आयरन); 'Within Range' टेस्टों और गैर-आहार परीक्षणों (जैसे MPV, P-LCR, प्लेटलेट्स, WBC आदि) के लिए foodSources को सख्ती से null रखें (कोई सामान्य संदेश न लिखें)। टेस्ट नाम (testName), मान (value), और संदर्भ सीमा (referenceRange) को मूल रिपोर्ट के अनुसार ही रखें। (नोट: यदि दस्तावेज़ इससे लंबा है तो केवल पहले ${MAX_PDF_PAGES} पृष्ठों का मूल्यांकन करें)।`
          : `Please analyze this uploaded medical report PDF. The user has selected ENGLISH. Generate a detailed educational explanation for EVERY test detected in the report, including tests within the reference range / normal range. Do not omit normal-range tests. For every test provide whatItMeasures and whyMeasured. Provide foodSources ONLY for tests that are 'Above Range' or 'Below Range' where a direct, meaningful dietary relationship exists (such as iron for low hemoglobin). Set foodSources strictly to null for 'Within Range' tests and non-dietary tests (such as MPV, P-LCR, Platelets, WBC, ESR, etc.) without writing generic filler. You MUST provide ALL explanatory text entirely in clear, simple English. Do NOT use Hindi. Keep testName, value, and referenceRange exactly as written in the report. (Note: Only the first ${MAX_PDF_PAGES} pages should be evaluated if the document exceeds this length).`,
      });
    }

    // Call Gemini with multi-model fallback and robust retry
    const candidateModels = [
      "gemini-3.1-flash-lite",
      "gemini-3-flash-preview",
      "gemini-3.1-flash-lite-preview",
      "gemini-3.1-pro-preview",
    ];

    let lastError: any = null;
    let responseText: string | null = null;

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.1, // Low temperature for factual precision & consistency
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                reportInfo: {
                  type: Type.ARRAY,
                  description: "Extracted test names, measured values, reference ranges, and literal printed range status.",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      testName: { type: Type.STRING, description: "Name of the laboratory test or analyte" },
                      value: { type: Type.STRING, description: "The measured result value and units as written in report" },
                      referenceRange: { type: Type.STRING, description: "The reference range interval as written in report (or 'Not specified' if absent)" },
                      rangeStatus: {
                        type: Type.STRING,
                        description: "Literal comparison against printed range: 'Above Range', 'Below Range', 'Within Range', or 'Unable to determine'",
                        enum: ["Above Range", "Below Range", "Within Range", "Unable to determine"],
                      },
                    },
                    required: ["testName", "value", "referenceRange", "rangeStatus"],
                  },
                },
                testExplanations: {
                  type: Type.ARRAY,
                  description: "General educational biology explanation and relevant food sources for EVERY test detected in the report, including within-range / normal tests.",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      testName: { type: Type.STRING, description: "Name of the laboratory test" },
                      whatItMeasures: { type: Type.STRING, description: "Beginner-friendly explanation of what substance or biological marker this measures" },
                      whyMeasured: { type: Type.STRING, description: "General educational explanation of why clinics and labs commonly measure this biomarker" },
                      rangeStatus: {
                        type: Type.STRING,
                        description: "Literal comparison against printed range: 'Above Range', 'Below Range', 'Within Range', or 'Unable to determine'",
                        enum: ["Above Range", "Below Range", "Within Range", "Unable to determine"],
                      },
                      foodSources: {
                        type: Type.STRING,
                        description: "Short educational note (2-3 sentences) on common food sources associated with this nutrient/biomarker ONLY if rangeStatus is 'Above Range' or 'Below Range' AND a direct dietary connection exists. Must be null if Within Range, Unable to determine, or if the biomarker has no specific dietary relation (e.g. MPV, P-LCR, Platelets, WBC).",
                        nullable: true,
                      },
                    },
                    required: ["testName", "whatItMeasures", "whyMeasured", "rangeStatus"],
                  },
                },
                simpleSummary: {
                  type: Type.STRING,
                  description: "A short, neutral, educational paragraph summarizing what types of tests appear in this report without assessing health status.",
                },
                unclear: {
                  type: Type.BOOLEAN,
                  description: "True if the report image/PDF was illegible, blurry, cut off, or not a recognizable medical report.",
                },
                unclearMessage: {
                  type: Type.STRING,
                  description: "Helpful guidance explaining why the document was unreadable and what to re-upload if unclear is true (otherwise empty string).",
                },
              },
              required: ["reportInfo", "testExplanations", "simpleSummary", "unclear", "unclearMessage"],
            },
          },
        });

        if (response.text && response.text.trim()) {
          responseText = response.text.trim();
          break; // Success!
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} attempt failed (${err?.status || err?.message}), trying next candidate model...`);
      }
    }

    if (!responseText) {
      throw lastError || new Error("All analysis model candidates failed to generate a response.");
    }

    // Clean markdown formatting if present
    let cleanedText = responseText;
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    let result: any = {};
    try {
      result = JSON.parse(cleanedText);
    } catch (parseErr) {
      console.error("Failed to parse JSON response from model:", cleanedText);
      throw new Error("Invalid format received from language model.");
    }

    // If report is flagged unclear by model
    if (result.unclear) {
      res.json({
        reportInfo: [],
        testExplanations: [],
        simpleSummary: "",
        unclear: true,
        unclearMessage:
          result.unclearMessage ||
          (requestedLanguage === "hi"
            ? "दस्तावेज़ की सामग्री या फ़ोटो अस्पष्ट थी। कृपया उच्च रिज़ॉल्यूशन वाली स्पष्ट फ़ोटो या PDF अपलोड करें।"
            : "The document text or image was unclear. Please upload a higher resolution photo or clear PDF."),
        pageCountNote,
        analyzedFileName: file.originalname,
        analyzedFileType: isImage ? "image" : "pdf",
        language: requestedLanguage,
      });
      return;
    }

    const validStatuses = ["Above Range", "Below Range", "Within Range", "Unable to determine"];

    // Sanitize and normalize reportInfo
    const normalizedReportInfo = (Array.isArray(result.reportInfo) ? result.reportInfo : []).map((item: any) => {
      let status = item.rangeStatus;
      if (!validStatuses.includes(status)) {
        status = "Unable to determine";
      }
      return {
        testName: String(item.testName || "Unknown Test").trim(),
        value: String(item.value || "").trim(),
        referenceRange: String(item.referenceRange || "Not specified").trim(),
        rangeStatus: status,
      };
    });

    // Sanitize and normalize testExplanations
    const normalizedTestExplanations = (Array.isArray(result.testExplanations) ? result.testExplanations : []).map((item: any) => {
      // Lookup rangeStatus from matching reportInfo if not present or inconsistent
      let status = item.rangeStatus;
      if (!validStatuses.includes(status)) {
        const matched = normalizedReportInfo.find(
          (r: any) => r.testName.toLowerCase() === String(item.testName || "").toLowerCase()
        );
        status = matched ? matched.rangeStatus : "Unable to determine";
      }

      // foodSources may ONLY be present if status is "Above Range" or "Below Range"
      const isAbnormal = status === "Above Range" || status === "Below Range";
      let foodSources = isAbnormal ? item.foodSources : null;
      if (foodSources && typeof foodSources !== "string") {
        foodSources = String(foodSources);
      }
      if (foodSources && foodSources.trim().length === 0) {
        foodSources = null;
      }
      if (foodSources) {
        const lower = foodSources.toLowerCase();
        const fillerWords = [
          "no specific diet",
          "does not have a specific diet",
          "do not have a specific diet",
          "no specific dietary",
          "not directly related to diet",
          "not directly affected by diet",
          "not related to diet",
          "dietary changes are not",
          "no standard dietary",
          "विशिष्ट आहार",
          "विशेष आहार",
          "सीधा संबंध नहीं",
          "कोई सीधा आहार",
        ];
        if (fillerWords.some((w) => lower.includes(w))) {
          foodSources = null;
        }
      }

      return {
        testName: String(item.testName || "Unknown Test").trim(),
        whatItMeasures: String(item.whatItMeasures || "").trim(),
        whyMeasured: String(item.whyMeasured || "").trim(),
        rangeStatus: status,
        foodSources: foodSources || null,
      };
    });

    res.json({
      reportInfo: normalizedReportInfo,
      testExplanations: normalizedTestExplanations,
      simpleSummary:
        result.simpleSummary ||
        (requestedLanguage === "hi"
          ? "इस रिपोर्ट में सामान्य प्रयोगशाला परीक्षण माप शामिल हैं।"
          : "This report contains routine laboratory measurements."),
      unclear: false,
      unclearMessage: "",
      pageCountNote,
      analyzedFileName: file.originalname,
      analyzedFileType: isImage ? "image" : "pdf",
      language: requestedLanguage,
    });
  } catch (error: any) {
    // Never log patient data or file contents to logs
    const errorMsg = error?.message || "Something went wrong while analyzing the report. Please try again.";
    console.error("Analysis request error:", errorMsg);
    
    res.status(500).json({
      type: "server_error",
      message: errorMsg,
    });
  }
});

// Vite & Static file handling
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

}

// Start server only when running locally
if (!process.env.VERCEL) {
  startServer();
}

export default app;