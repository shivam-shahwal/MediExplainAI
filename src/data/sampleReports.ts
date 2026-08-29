import { ReportAnalysisResult, Language } from "../types";

export interface SampleReportItem {
  id: string;
  label: string;
  description: string;
  data: ReportAnalysisResult;
}

export const SAMPLE_REPORTS_EN: SampleReportItem[] = [
  {
    id: "cbc_lipid",
    label: "Complete Blood Count (CBC) & Lipid Panel",
    description: "Standard routine wellness blood work",
    data: {
      reportInfo: [
        { testName: "Hemoglobin (Hgb)", value: "14.2 g/dL", referenceRange: "13.8 - 17.2 g/dL", rangeStatus: "Within Range" },
        { testName: "White Blood Cells (WBC)", value: "6.8 x10^3/uL", referenceRange: "4.0 - 11.0 x10^3/uL", rangeStatus: "Within Range" },
        { testName: "Platelets", value: "245 x10^3/uL", referenceRange: "150 - 450 x10^3/uL", rangeStatus: "Within Range" },
        { testName: "Total Cholesterol", value: "195 mg/dL", referenceRange: "< 200 mg/dL", rangeStatus: "Within Range" },
        { testName: "HDL Cholesterol", value: "52 mg/dL", referenceRange: "> 40 mg/dL", rangeStatus: "Within Range" },
        { testName: "LDL Cholesterol", value: "118 mg/dL", referenceRange: "< 100 mg/dL", rangeStatus: "Above Range" },
        { testName: "Triglycerides", value: "125 mg/dL", referenceRange: "< 150 mg/dL", rangeStatus: "Within Range" }
      ],
      testExplanations: [
        {
          testName: "Hemoglobin (Hgb)",
          whatItMeasures: "Hemoglobin is an iron-rich protein found inside red blood cells. It binds with oxygen in the lungs and carries it throughout the body's tissues.",
          whyMeasured: "Laboratories measure hemoglobin to determine the oxygen-carrying capacity of the blood and check general red blood cell levels.",
          rangeStatus: "Within Range",
          foodSources: null
        },
        {
          testName: "White Blood Cells (WBC)",
          whatItMeasures: "White blood cells (leukocytes) are key cells of the immune system produced in the bone marrow.",
          whyMeasured: "Clinicians check white blood cell counts to understand the baseline activity of the body's natural defense and immune system.",
          rangeStatus: "Within Range",
          foodSources: null
        },
        {
          testName: "Platelets",
          whatItMeasures: "Platelets (thrombocytes) are tiny cell fragments circulating in the bloodstream that assist in forming blood clots.",
          whyMeasured: "Labs measure platelet concentration to assess how the body initiates clotting when blood vessels experience minor injuries.",
          rangeStatus: "Within Range",
          foodSources: null
        },
        {
          testName: "Total Cholesterol",
          whatItMeasures: "Total cholesterol is an overall calculation of lipid (fat-like) substances circulating in the bloodstream, including both high-density and low-density particles.",
          whyMeasured: "Laboratories evaluate total blood fats to establish a broad baseline of circulating lipid particles.",
          rangeStatus: "Within Range",
          foodSources: null
        },
        {
          testName: "HDL Cholesterol",
          whatItMeasures: "High-Density Lipoprotein (HDL) is a protein-lipid complex that helps transport excess cholesterol from peripheral tissues back to the liver for clearance.",
          whyMeasured: "Commonly measured to evaluate the portion of cholesterol being carried toward the liver for natural processing.",
          rangeStatus: "Within Range",
          foodSources: null
        },
        {
          testName: "LDL Cholesterol",
          whatItMeasures: "Low-Density Lipoprotein (LDL) is a particle that delivers cholesterol from the liver to cells throughout the body.",
          whyMeasured: "Measured to observe the concentration of transport particles moving cholesterol toward peripheral tissues.",
          rangeStatus: "Above Range",
          foodSources: "Foods commonly associated with supporting healthy lipid profiles include soluble fiber sources like oats, barley, beans, lentils, and flaxseeds, as well as unsaturated fats found in olive oil and walnuts. Always consult a healthcare professional before making dietary changes."
        },
        {
          testName: "Triglycerides",
          whatItMeasures: "Triglycerides are the most common form of stored fat in the body, derived from dietary calories and energy metabolism.",
          whyMeasured: "Evaluated to monitor circulating energy fats in the bloodstream after dietary processing.",
          rangeStatus: "Within Range",
          foodSources: null
        }
      ],
      simpleSummary: "This report consists of two common panels: a Complete Blood Count (CBC) measuring circulating cellular components of blood (red cells, white cells, and platelets), and a Lipid Panel examining circulating fat and cholesterol carrier particles.",
      unclear: false,
      unclearMessage: "",
      analyzedFileName: "routine_cbc_lipid_panel.pdf",
      analyzedFileType: "pdf",
      language: "en"
    }
  },
  {
    id: "bmp_chemistry",
    label: "Basic Metabolic & Electrolyte Panel",
    description: "Kidney function, sugar metabolism, and electrolytes",
    data: {
      reportInfo: [
        { testName: "Fasting Blood Glucose", value: "92 mg/dL", referenceRange: "70 - 99 mg/dL", rangeStatus: "Within Range" },
        { testName: "Serum Creatinine", value: "0.95 mg/dL", referenceRange: "0.74 - 1.35 mg/dL", rangeStatus: "Within Range" },
        { testName: "Blood Urea Nitrogen (BUN)", value: "15 mg/dL", referenceRange: "7 - 20 mg/dL", rangeStatus: "Within Range" },
        { testName: "Sodium (Na)", value: "140 mEq/L", referenceRange: "135 - 145 mEq/L", rangeStatus: "Within Range" },
        { testName: "Potassium (K)", value: "3.2 mEq/L", referenceRange: "3.5 - 5.0 mEq/L", rangeStatus: "Below Range" }
      ],
      testExplanations: [
        {
          testName: "Fasting Blood Glucose",
          whatItMeasures: "Glucose is the primary simple sugar used by bodily cells and the central nervous system as an immediate fuel source.",
          whyMeasured: "Laboratories measure glucose to observe circulating energy sugar levels during a fasting metabolic state.",
          rangeStatus: "Within Range",
          foodSources: null
        },
        {
          testName: "Serum Creatinine",
          whatItMeasures: "Creatinine is a standard chemical waste byproduct produced by ordinary muscle breakdown and movement.",
          whyMeasured: "Because kidneys filter creatinine at a relatively steady rate, measuring it provides a biomarker of renal filtration mechanics.",
          rangeStatus: "Within Range",
          foodSources: null
        },
        {
          testName: "Blood Urea Nitrogen (BUN)",
          whatItMeasures: "Urea nitrogen is a waste product formed in the liver when dietary and cellular proteins are broken down.",
          whyMeasured: "Laboratories check urea levels to evaluate standard metabolic protein clearance through the kidneys.",
          rangeStatus: "Within Range",
          foodSources: null
        },
        {
          testName: "Sodium (Na)",
          whatItMeasures: "Sodium is an essential mineral electrolyte that helps regulate fluid distribution, osmotic pressure, and electrical signaling in nerves.",
          whyMeasured: "Measured to track the baseline balance of fluids and electrolytes throughout blood plasma.",
          rangeStatus: "Within Range",
          foodSources: null
        },
        {
          testName: "Potassium (K)",
          whatItMeasures: "Potassium is a primary intracellular mineral electrolyte that participates in cellular membrane voltage and muscle contractions.",
          whyMeasured: "Evaluated to monitor proper mineral electrolyte concentration vital for cellular communication and muscle rhythm.",
          rangeStatus: "Below Range",
          foodSources: "Potassium is an essential mineral naturally concentrated in whole foods like bananas, sweet potatoes, spinach, avocados, kidney beans, and dried fruits. Always consult a healthcare professional before making dietary changes."
        }
      ],
      simpleSummary: "This report shows a Basic Metabolic Panel (BMP), which focuses on fundamental body chemistry including glucose energy levels, renal clearance waste markers (creatinine, BUN), and essential fluid electrolytes (sodium, potassium).",
      unclear: false,
      unclearMessage: "",
      analyzedFileName: "metabolic_chemistry.jpg",
      analyzedFileType: "image",
      language: "en"
    }
  }
];

export const SAMPLE_REPORTS_HI: SampleReportItem[] = [
  {
    id: "cbc_lipid",
    label: "कम्प्लीट ब्लड काउंट (CBC) और लिपिड प्रोफाइल",
    description: "नियमित स्वास्थ्य व रक्त जांच",
    data: {
      reportInfo: [
        { testName: "Hemoglobin (Hgb)", value: "14.2 g/dL", referenceRange: "13.8 - 17.2 g/dL", rangeStatus: "Within Range" },
        { testName: "White Blood Cells (WBC)", value: "6.8 x10^3/uL", referenceRange: "4.0 - 11.0 x10^3/uL", rangeStatus: "Within Range" },
        { testName: "Platelets", value: "245 x10^3/uL", referenceRange: "150 - 450 x10^3/uL", rangeStatus: "Within Range" },
        { testName: "Total Cholesterol", value: "195 mg/dL", referenceRange: "< 200 mg/dL", rangeStatus: "Within Range" },
        { testName: "HDL Cholesterol", value: "52 mg/dL", referenceRange: "> 40 mg/dL", rangeStatus: "Within Range" },
        { testName: "LDL Cholesterol", value: "118 mg/dL", referenceRange: "< 100 mg/dL", rangeStatus: "Above Range" },
        { testName: "Triglycerides", value: "125 mg/dL", referenceRange: "< 150 mg/dL", rangeStatus: "Within Range" }
      ],
      testExplanations: [
        {
          testName: "Hemoglobin (Hgb)",
          whatItMeasures: "हीमोग्लोबिन (Hemoglobin) लाल रक्त कोशिकाओं में पाया जाने वाला आयरन युक्त प्रोटीन है। यह फेफड़ों से ऑक्सीजन लेकर शरीर के सभी अंगों और ऊतकों तक पहुँचाता है।",
          whyMeasured: "रक्त की ऑक्सीजन ले जाने की क्षमता और लाल रक्त कोशिकाओं के सामान्य स्तर को समझने के लिए प्रयोगशालाएं हीमोग्लोबिन की जांच करती हैं।",
          rangeStatus: "Within Range",
          foodSources: null
        },
        {
          testName: "White Blood Cells (WBC)",
          whatItMeasures: "श्वेत रक्त कोशिकाएं या व्हाइट ब्लड सेल्स (WBC/Leukocytes) शरीर की प्रतिरक्षा प्रणाली (इम्यून सिस्टम) की मुख्य कोशिकाएं हैं जो बोन मैरो में बनती हैं।",
          whyMeasured: "शरीर की प्राकृतिक रोग-प्रतिरोधक क्षमता और संक्रमण से लड़ने वाली प्रणाली की सामान्य गतिविधि को जानने के लिए डॉक्टर WBC की जांच करते हैं।",
          rangeStatus: "Within Range",
          foodSources: null
        },
        {
          testName: "Platelets",
          whatItMeasures: "प्लेटलेट्स (Platelets/Thrombocytes) रक्त में तैरने वाले छोटे सेल के टुकड़े होते हैं जो चोट लगने पर खून का थक्का (clot) बनाने में मदद करते हैं।",
          whyMeasured: "रक्त वाहिकाओं में किसी चोट के बाद शरीर खून बहने से रोकने की प्रक्रिया कैसे शुरू करता है, यह जानने के लिए प्लेटलेट्स की संख्या जांची जाती है।",
          rangeStatus: "Within Range",
          foodSources: null
        },
        {
          testName: "Total Cholesterol",
          whatItMeasures: "टोटल कोलेस्ट्रॉल (Total Cholesterol) रक्त में तैरने वाले सभी वसा जैसे पदार्थों (लिपिड) की कुल मात्रा की गणना है, जिसमें HDL और LDL दोनों शामिल हैं।",
          whyMeasured: "रक्त में मौजूद कुल फैट पार्टिकल्स की सामान्य स्थिति का आधारभूत आकलन करने के लिए लैब टोटल कोलेस्ट्रॉल की जांच करते हैं।",
          rangeStatus: "Within Range",
          foodSources: null
        },
        {
          testName: "HDL Cholesterol",
          whatItMeasures: "हाई-डेंसिटी लिपोप्रोटीन या एचडीएल (HDL) एक सुरक्षात्मक प्रोटीन-लिपिड कॉम्प्लेक्स है जो अतिरिक्त कोलेस्ट्रॉल को शरीर के अंगों से वापस लिवर तक पहुँचाने में मदद करता है।",
          whyMeasured: "कोलेस्ट्रॉल का कितना हिस्सा प्राकृतिक रूप से लिवर द्वारा बाहर निकालने के लिए भेजा जा रहा है, इसका मूल्यांकन करने के लिए यह मापा जाता है।",
          rangeStatus: "Within Range",
          foodSources: null
        },
        {
          testName: "LDL Cholesterol",
          whatItMeasures: "लो-डेंसिटी लिपोप्रोटीन या एलडीएल (LDL) एक कण है जो लिवर से कोलेस्ट्रॉल को शरीर की कोशिकाओं तक ले जाता है।",
          whyMeasured: "कोलेस्ट्रॉल को कोशिकाओं तक पहुँचाने वाले ट्रांसपोर्ट पार्टिकल्स की मात्रा देखने के लिए इसे मापा जाता है।",
          rangeStatus: "Above Range",
          foodSources: "स्वस्थ लिपिड स्तर को सहारा देने वाले सामान्य खाद्य पदार्थों में घुलनशील फाइबर युक्त चीजें जैसे ओट्स (oats), जौ (barley), बीन्स (beans), दालें (lentils), और अलसी के बीज (flaxseeds), साथ ही जैतून का तेल (olive oil) और अखरोट (walnuts) शामिल हैं। आहार में कोई भी बदलाव करने से पहले हमेशा डॉक्टर से परामर्श लें।"
        },
        {
          testName: "Triglycerides",
          whatItMeasures: "ट्राइग्लिसराइड्स (Triglycerides) शरीर में जमा होने वाले फैट का सबसे सामान्य रूप हैं, जो भोजन से मिलने वाली कैलोरी और ऊर्जा से बनते हैं।",
          whyMeasured: "भोजन के पाचन के बाद रक्तप्रवाह में ऊर्जा के रूप में घूमने वाले फैट के स्तर की निगरानी के लिए यह जांच की जाती है।",
          rangeStatus: "Within Range",
          foodSources: null
        }
      ],
      simpleSummary: "इस रिपोर्ट में दो सामान्य पैनल शामिल हैं: एक कम्प्लीट ब्लड काउंट (CBC) जो रक्त की कोशिकाओं (रेड सेल्स, व्हाइट सेल्स और प्लेटलेट्स) को मापता है, और एक लिपिड प्रोफाइल जो रक्त में फैट और कोलेस्ट्रॉल ले जाने वाले कणों की जांच करता है।",
      unclear: false,
      unclearMessage: "",
      analyzedFileName: "routine_cbc_lipid_panel.pdf",
      analyzedFileType: "pdf",
      language: "hi"
    }
  },
  {
    id: "bmp_chemistry",
    label: "बेसिक मेटाबोलिक और इलेक्ट्रोलाइट पैनल",
    description: "किडनी की कार्यप्रणाली, शुगर मेटाबॉलिज्म और इलेक्ट्रोलाइट्स",
    data: {
      reportInfo: [
        { testName: "Fasting Blood Glucose", value: "92 mg/dL", referenceRange: "70 - 99 mg/dL", rangeStatus: "Within Range" },
        { testName: "Serum Creatinine", value: "0.95 mg/dL", referenceRange: "0.74 - 1.35 mg/dL", rangeStatus: "Within Range" },
        { testName: "Blood Urea Nitrogen (BUN)", value: "15 mg/dL", referenceRange: "7 - 20 mg/dL", rangeStatus: "Within Range" },
        { testName: "Sodium (Na)", value: "140 mEq/L", referenceRange: "135 - 145 mEq/L", rangeStatus: "Within Range" },
        { testName: "Potassium (K)", value: "3.2 mEq/L", referenceRange: "3.5 - 5.0 mEq/L", rangeStatus: "Below Range" }
      ],
      testExplanations: [
        {
          testName: "Fasting Blood Glucose",
          whatItMeasures: "ग्लूकोज (Glucose) एक सरल शुगर (शर्करा) है जिसका उपयोग शरीर की कोशिकाएं और तंत्रिका तंत्र तत्काल ऊर्जा के प्राथमिक स्रोत के रूप में करते हैं।",
          whyMeasured: "उपवास (फास्टिंग) की स्थिति में रक्त में शर्करा के सामान्य ऊर्जा स्तर को देखने के लिए लैब ग्लूकोज मापते हैं।",
          rangeStatus: "Within Range",
          foodSources: null
        },
        {
          testName: "Serum Creatinine",
          whatItMeasures: "सीरम क्रिएटिनिन (Serum Creatinine) मांसपेशियों के सामान्य उपयोग और खिंचाव से बनने वाला एक सामान्य रासायनिक अपशिष्ट (वेस्ट प्रोडक्ट) है।",
          whyMeasured: "चूंकि किडनी क्रिएटिनिन को नियमित गति से फ़िल्टर करती है, इसलिए इसे मापना किडनी के सामान्य फ़िल्ट्रेशन का एक उपयोगी संकेतक है।",
          rangeStatus: "Within Range",
          foodSources: null
        },
        {
          testName: "Blood Urea Nitrogen (BUN)",
          whatItMeasures: "यूरिया नाइट्रोजन (BUN) एक अपशिष्ट उत्पाद है जो लिवर में उस समय बनता है जब भोजन और कोशिकाओं के प्रोटीन का पाचन होता है।",
          whyMeasured: "किडनी द्वारा प्रोटीन अपशिष्ट को सामान्य रूप से साफ करने की प्रक्रिया का मूल्यांकन करने के लिए यूरिया का स्तर जांचा जाता है।",
          rangeStatus: "Within Range",
          foodSources: null
        },
        {
          testName: "Sodium (Na)",
          whatItMeasures: "सोडियम (Sodium) एक आवश्यक मिनरल इलेक्ट्रोलाइट है जो शरीर में पानी के संतुलन और तंत्रिकाओं के विद्युत संकेतों को नियंत्रित करने में मदद करता है।",
          whyMeasured: "रक्त प्लाज्मा में तरल पदार्थ और इलेक्ट्रोलाइट्स के सामान्य संतुलन को ट्रैक करने के लिए सोडियम मापा जाता है।",
          rangeStatus: "Within Range",
          foodSources: null
        },
        {
          testName: "Potassium (K)",
          whatItMeasures: "पोटेशियम (Potassium) कोशिकाओं के अंदर पाया जाने वाला एक मुख्य खनिज इलेक्ट्रोलाइट है जो हृदय गति और मांसपेशियों के संकुचन में महत्वपूर्ण भूमिका निभाता है।",
          whyMeasured: "मांसपेशियों और तंत्रिकाओं के सुचारू रूप से कार्य करने के लिए आवश्यक खनिज इलेक्ट्रोलाइट के स्तर की निगरानी के लिए यह जांच की जाती है।",
          rangeStatus: "Below Range",
          foodSources: "पोटेशियम एक आवश्यक खनिज है जो प्राकृतिक रूप से केले (bananas), शकरकंद (sweet potatoes), पालक (spinach), एवोकाडो (avocados), राजमा (kidney beans), और सूखे मेवों में प्रचुर मात्रा में पाया जाता है। अपने आहार में कोई भी बदलाव करने से पहले हमेशा डॉक्टर से परामर्श लें।"
        }
      ],
      simpleSummary: "यह रिपोर्ट एक बेसिक मेटाबोलिक पैनल (BMP) दर्शाती है, जो शरीर के मूलभूत रसायन जैसे ग्लूकोज ऊर्जा स्तर, किडनी के अपशिष्ट मार्कर (क्रिएटिनिन, BUN) और आवश्यक तरल इलेक्ट्रोलाइट्स (सोडियम, पोटेशियम) की जांच करती है।",
      unclear: false,
      unclearMessage: "",
      analyzedFileName: "metabolic_chemistry.jpg",
      analyzedFileType: "image",
      language: "hi"
    }
  }
];

export function getSampleReports(lang: Language): SampleReportItem[] {
  return lang === "hi" ? SAMPLE_REPORTS_HI : SAMPLE_REPORTS_EN;
}

export const SAMPLE_REPORTS = SAMPLE_REPORTS_EN;
