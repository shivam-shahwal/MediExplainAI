import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { DisclaimerBanner } from "./components/DisclaimerBanner";
import { UploadZone } from "./components/UploadZone";
import { LoadingState } from "./components/LoadingState";
import { ResultsView } from "./components/ResultsView";
import { ErrorAlert } from "./components/ErrorAlert";
import { HistoryView } from "./components/HistoryView";
import { AuthModal } from "./components/AuthModal";
import { SettingsModal } from "./components/SettingsModal";
import { PWAInstallModal } from "./components/PWAInstallModal";
import { ReportAnalysisResult, AnalysisError, Language } from "./types";
import { ShieldCheck, HeartHandshake, AlertCircle, Mail, Sparkles, LogIn } from "lucide-react";
import { TRANSLATIONS } from "./i18n/translations";
import { SAMPLE_REPORTS_EN, SAMPLE_REPORTS_HI } from "./data/sampleReports";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { saveReportToHistory } from "./lib/reportsService";

function MainAppContent() {
  const { currentUser, isEmailVerified } = useAuth();

  // Initialize language from browser preference if Hindi, otherwise default to English
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("hi")) {
      return "hi";
    }
    return "en";
  });

  const [activeView, setActiveView] = useState<"upload" | "results" | "history">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ReportAnalysisResult | null>(null);
  const [error, setError] = useState<AnalysisError | null>(null);
  const [inlineError, setInlineError] = useState<string | null>(null);
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);
  const [isSavedInHistory, setIsSavedInHistory] = useState(false);

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"signup" | "login">("signup");
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallHelp, setShowInstallHelp] = useState(false);

  const t = TRANSLATIONS[language];

  // Keep html lang attribute in sync
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    // If a sample report is currently displayed, switch its data to the matching language
    if (activeSampleId) {
      const sampleList = newLang === "hi" ? SAMPLE_REPORTS_HI : SAMPLE_REPORTS_EN;
      const matched = sampleList.find((s) => s.id === activeSampleId);
      if (matched) {
        setAnalysisResult(matched.data);
      }
    }
  };

  const handleTriggerInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } else {
      setShowInstallHelp(true);
    }
  };

  const handleOpenAuth = (tab: "signup" | "login") => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const handleOpenVerification = () => {
    setAuthModalTab("login");
    setAuthModalOpen(true);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setActiveSampleId(null);
    setError(null);
    setInlineError(null);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setInlineError(null);
  };

  const handleSelectSample = (sample: ReportAnalysisResult) => {
    setError(null);
    setInlineError(null);
    // Identify sample ID for seamless language switching
    const isCbc = sample.reportInfo.some((r) => r.testName.toLowerCase().includes("hemoglobin"));
    setActiveSampleId(isCbc ? "cbc_lipid" : "bmp_chemistry");
    setAnalysisResult(sample);
    setIsSavedInHistory(false);
    setActiveView("results");
  };

  const handleReset = () => {
    setSelectedFile(null);
    setAnalysisResult(null);
    setActiveSampleId(null);
    setError(null);
    setInlineError(null);
    setIsSavedInHistory(false);
    setActiveView("upload");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenReportFromHistory = (report: ReportAnalysisResult) => {
    setError(null);
    setInlineError(null);
    setActiveSampleId(null);
    setAnalysisResult(report);
    setIsSavedInHistory(true);
    setActiveView("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenHistoryView = () => {
    if (!currentUser) {
      handleOpenAuth("login");
      return;
    }
    setActiveView("history");
  };

  // Auto-save unsaved active result when user logs in
  useEffect(() => {
    if (currentUser && analysisResult && !isSavedInHistory && !activeSampleId && activeView === "results") {
      saveReportToHistory(currentUser.uid, analysisResult, language)
        .then((id) => {
          analysisResult.id = id;
          setIsSavedInHistory(true);
        })
        .catch((err) => console.warn("Failed to auto-save result on auth change:", err));
    }
  }, [currentUser, analysisResult, isSavedInHistory, activeSampleId, activeView, language]);

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError(null);
    setInlineError(null);
    setActiveSampleId(null);
    setIsSavedInHistory(false);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("language", language);

      const response = await fetch("/api/analyze-report", {
        method: "POST",
        body: formData,
      });

      let data: any = null;
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch (jsonErr) {
          console.error("Failed to parse JSON response:", jsonErr);
          data = null;
        }
      } else {
        const textResponse = await response.text();
        console.error("Non-JSON API response received:", response.status, textResponse);
      }

      if (!response.ok) {
        const errorMsg =
          data?.message ||
          (response.status === 404
            ? (language === "hi"
                ? "API एंडपॉइंट नहीं मिला (404)। कृपया सर्वर कॉन्फ़िगरेशन जांचें।"
                : "API endpoint not found (404). Please verify the server route configuration.")
            : response.status === 413
            ? (language === "hi"
                ? "फ़ाइल का आकार बहुत बड़ा है।"
                : "File is too large for the server.")
            : (language === "hi"
                ? `सर्वर त्रुटि (${response.status})। कृपया पुन: प्रयास करें।`
                : `Server error (${response.status}). Please try again.`));

        setError({
          type: (data as any)?.type || "server_error",
          message: errorMsg,
        });
        setIsAnalyzing(false);
        return;
      }

      if (!data) {
        throw new Error("Invalid response format received from server.");
      }

      const result = data as ReportAnalysisResult;

      if (result.unclear) {
        setError({
          type: "unclear_content",
          message:
            result.unclearMessage ||
            (language === "hi"
              ? "दस्तावेज़ की फ़ोटो धुंधली या अस्पष्ट थी। कृपया अधिक स्पष्ट फ़ोटो या PDF अपलोड करें।"
              : "The document was blurry, cut off, or not a recognizable lab report. Please upload a clearer photo or PDF."),
        });
        setIsAnalyzing(false);
        return;
      }

      // Populate file metadata
      result.analyzedFileName = selectedFile.name;
      result.analyzedFileType = selectedFile.type.includes("pdf") || selectedFile.name.toLowerCase().endsWith(".pdf") ? "pdf" : "image";
      result.analyzedAt = new Date().toISOString();
      result.language = language;

      setAnalysisResult(result);
      setActiveView("results");

      // If user is logged in, automatically save the completed report to Firestore history
      if (currentUser) {
        try {
          const reportId = await saveReportToHistory(currentUser.uid, result, language);
          result.id = reportId;
          setIsSavedInHistory(true);
        } catch (err) {
          console.error("Failed to persist report to history:", err);
          setIsSavedInHistory(false);
        }
      }
    } catch (err: any) {
      console.error("Analysis request failed:", err);
      setError({
        type: "server_error",
        message:
          err?.message && !err.message.includes("fetch") && !err.message.includes("JSON")
            ? err.message
            : (language === "hi"
                ? "नेटवर्क कनेक्शन समस्या या सर्वर त्रुटि। कृपया अपना इंटरनेट जांचें और पुन: प्रयास करें।"
                : "Network connection issue or server failure. Please check your connection and try again."),
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#F0F7F9] flex flex-col font-sans text-[#1E293B] ${language === "hi" ? "font-hindi" : ""}`}>
      {/* Top Application Header */}
      <Header
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
        onShowInstallHelp={() => setShowInstallHelp(true)}
        canInstallPrompt={!!deferredPrompt}
        onTriggerInstall={handleTriggerInstall}
        onOpenAuth={handleOpenAuth}
        onOpenHistory={handleOpenHistoryView}
        onOpenSettings={() => setSettingsModalOpen(true)}
        onOpenVerificationModal={handleOpenVerification}
        activeView={activeView}
      />

      {/* Unverified Email Warning Banner */}
      {currentUser && !isEmailVerified && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-amber-900 font-medium">
              <Mail className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{t.verificationBannerText}</span>
            </div>
            <button
              type="button"
              onClick={handleOpenVerification}
              className="px-3 py-1 rounded-md bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-2xs shrink-0"
            >
              {t.verifyNowBtn}
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Render Views Based on Active State */}
        {activeView === "history" ? (
          <HistoryView
            language={language}
            onOpenReport={handleOpenReportFromHistory}
            onBackToUpload={handleReset}
          />
        ) : activeView === "results" && analysisResult ? (
          <ResultsView
            result={analysisResult}
            onReset={handleReset}
            language={language}
            onOpenAuth={handleOpenAuth}
            onOpenHistory={handleOpenHistoryView}
            isSavedInHistory={isSavedInHistory}
          />
        ) : isAnalyzing ? (
          <LoadingState language={language} />
        ) : error ? (
          <div className="space-y-6">
            <DisclaimerBanner language={language} />
            <ErrorAlert
              error={error}
              onRetry={handleReset}
              language={language}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <DisclaimerBanner language={language} />
            <UploadZone
              selectedFile={selectedFile}
              onFileSelect={handleFileSelect}
              onClearFile={handleClearFile}
              onAnalyze={handleAnalyze}
              onSelectSample={handleSelectSample}
              isAnalyzing={isAnalyzing}
              inlineError={inlineError}
              setInlineError={setInlineError}
              language={language}
              onOpenAuth={handleOpenAuth}
            />
          </div>
        )}
      </main>

      {/* Auth Modal (Email + Password + Verification + Google + Reset) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        language={language}
        initialTab={authModalTab}
        onSuccess={() => {
          // If we currently have an unsaved result on screen, save it now that user is logged in
          if (analysisResult && !isSavedInHistory && currentUser) {
            saveReportToHistory(currentUser.uid, analysisResult, language)
              .then((id) => {
                analysisResult.id = id;
                setIsSavedInHistory(true);
              })
              .catch((e) => console.warn("Failed to save report on login:", e));
          }
        }}
      />

      {/* Settings & Account Deletion Modal */}
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        language={language}
      />

      {/* PWA Install Modal Guide */}
      <PWAInstallModal
        isOpen={showInstallHelp}
        onClose={() => setShowInstallHelp(false)}
        canInstallPrompt={!!deferredPrompt}
        onTriggerInstall={handleTriggerInstall}
        language={language}
      />

      {/* Persistent Clinical & Privacy Footer */}
      <footer className="bg-white border-t border-[#E2E8F0] py-5 px-4 text-xs text-[#64748B] mt-auto print:hidden">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 text-[#64748B]">
            <ShieldCheck className="w-4 h-4 text-[#0D9488] shrink-0" />
            <span>
              <strong>{t.zeroDataStorage}:</strong>{" "}
              {currentUser ? t.privacyDescLoggedIn : t.privacyDescGuest}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[#94A3B8]">
            <HeartHandshake className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span>{t.footerBrand}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
