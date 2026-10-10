import React, { useEffect, useState } from "react";
import { Loader2, FileSearch, Sparkles, ShieldCheck } from "lucide-react";
import { Language } from "../types";
import { TRANSLATIONS } from "../i18n/translations";

interface LoadingStateProps {
  language?: Language;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ language = "en" }) => {
  const [stage, setStage] = useState<1 | 2>(1);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    // Switch from stage 1 to stage 2 after 3.5 seconds
    const timer = setTimeout(() => {
      setStage(2);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="analysis-loading-container"
      className={`w-full bg-white rounded-2xl p-8 sm:p-14 border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] text-center flex flex-col items-center justify-center my-6 ${
        language === "hi" ? "font-hindi" : ""
      }`}
    >
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#008278] shadow-2xs">
          {stage === 1 ? (
            <FileSearch className="w-10 h-10 animate-pulse text-[#008278]" />
          ) : (
            <Sparkles className="w-10 h-10 animate-bounce text-[#008278]" />
          )}
        </div>
        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md border border-slate-200">
          <Loader2 className="w-5 h-5 text-[#008278] animate-spin" />
        </div>
      </div>

      <div className="max-w-md space-y-2">
        <h3 className="text-xl font-bold text-[#081D2E]">
          {stage === 1 ? t.loadingStage1Title : t.loadingStage2Title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          {stage === 1 ? t.loadingStage1Desc : t.loadingStage2Desc}
        </p>
      </div>

      {/* Visual Stepper */}
      <div className="mt-8 flex items-center justify-center gap-3 w-full max-w-xs">
        <div
          className={`flex-1 h-2 rounded-full transition-all duration-500 ${
            stage >= 1 ? "bg-[#008278]" : "bg-slate-200"
          }`}
        />
        <div
          className={`flex-1 h-2 rounded-full transition-all duration-500 ${
            stage >= 2 ? "bg-[#008278]" : "bg-slate-200"
          }`}
        />
      </div>
      <div className="flex justify-between w-full max-w-xs text-[11px] font-bold text-slate-400 mt-2">
        <span className={stage === 1 ? "text-[#008278]" : ""}>
          {t.step1Label}
        </span>
        <span className={stage === 2 ? "text-[#008278]" : ""}>
          {t.step2Label}
        </span>
      </div>

      <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-[#008278]" />
        <span>{t.loadingPrivacy}</span>
      </div>
    </div>
  );
};
