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
      className={`rounded-2xl p-6 sm:p-8 border my-6 text-center max-w-xl mx-auto shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] ${
        language === "hi" ? "font-hindi" : ""
      } ${
        isWarning
          ? "bg-amber-50/80 border-amber-200/90 text-amber-950"
          : "bg-rose-50/80 border-rose-200/90 text-rose-950"
      }`}
    >
      <div
        className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-2xs ${
          isWarning ? "bg-amber-100 text-amber-900" : "bg-rose-100 text-rose-700"
        }`}
      >
        {getIcon()}
      </div>

      <h3 className="text-base sm:text-lg font-bold text-[#081D2E]">{getTitle()}</h3>
      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
        {error.message}
      </p>

      {error.type === "unclear_content" && (
        <div className="mt-4 p-4 bg-white/95 rounded-xl border border-amber-200 text-xs text-slate-600 text-left shadow-2xs">
          <p className="font-bold text-[#081D2E] mb-1.5">{t.photoTipsTitle}</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700">
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
          className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-xs hover:shadow-sm flex items-center gap-2 transition-all cursor-pointer ${
            isWarning ? "bg-[#008278] hover:bg-[#007068] active:bg-[#005e57]" : "bg-rose-600 hover:bg-rose-700 active:bg-rose-800"
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.uploadAnotherFile}</span>
        </button>
      </div>
    </div>
  );
};
