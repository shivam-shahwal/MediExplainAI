import React from "react";
import { AlertOctagon, RotateCcw, Image, HelpCircle } from "lucide-react";
import { AnalysisError, Language } from "../types";
import { TRANSLATIONS } from "../i18n/translations";

interface ErrorAlertProps {
  error: AnalysisError;
  onRetry: () => void;
  language: Language;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  error,
  onRetry,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const getIcon = () => {
    switch (error.type) {
      case "unclear_content":
        return <HelpCircle className="w-8 h-8 text-amber-600" />;
      case "file_too_large":
      case "unsupported_file":
        return <Image className="w-8 h-8 text-rose-600" />;
      default:
        return <AlertOctagon className="w-8 h-8 text-rose-600" />;
    }
  };

  const getTitle = () => {
    switch (error.type) {
      case "unclear_content":
        return t.errUnclearTitle;
      case "unsupported_file":
        return t.errUnsupportedTitle;
      case "file_too_large":
        return t.errFileTooLargeTitle;
      case "rate_limit":
        return t.errRateLimitTitle;
      default:
        return t.errAnalysisFailedTitle;
    }
  };

  const isWarning = error.type === "unclear_content";

  return (
    <div
      id="analysis-error-card"
      className={`rounded-xl p-6 sm:p-8 border my-6 text-center max-w-xl mx-auto shadow-xs ${
        language === "hi" ? "font-hindi" : ""
      } ${
        isWarning
          ? "bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]"
          : "bg-rose-50 border-rose-200 text-rose-950"
      }`}
    >
      <div
        className={`w-14 h-14 rounded-xl mx-auto flex items-center justify-center mb-4 ${
          isWarning ? "bg-amber-100 text-[#92400E]" : "bg-rose-100 text-rose-700"
        }`}
      >
        {getIcon()}
      </div>

      <h3 className="text-base sm:text-lg font-bold">{getTitle()}</h3>
      <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-md mx-auto">
        {error.message}
      </p>

      {error.type === "unclear_content" && (
        <div className="mt-4 p-3.5 bg-white/90 rounded-lg border border-[#FDE68A] text-xs text-[#64748B] text-left">
          <p className="font-semibold text-[#1E293B] mb-1">{t.photoTipsTitle}</p>
          <ul className="list-disc list-inside space-y-0.5 text-[#334155]">
            <li>{t.tip1}</li>
            <li>{t.tip2}</li>
            <li>{t.tip3}</li>
          </ul>
        </div>
      )}

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          id="error-retry-button"
          onClick={onRetry}
          className={`px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-sm text-white shadow-xs flex items-center gap-2 transition-colors cursor-pointer ${
            isWarning ? "bg-[#0D9488] hover:bg-[#0F766E]" : "bg-rose-700 hover:bg-rose-800"
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.uploadAnotherFile}</span>
        </button>
      </div>
    </div>
  );
};
