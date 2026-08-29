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
      className={`w-full bg-white rounded-xl p-8 sm:p-12 border border-[#E2E8F0] shadow-xs text-center flex flex-col items-center justify-center my-6 ${
        language === "hi" ? "font-hindi" : ""
      }`}
    >
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-xl bg-[#F0FDFA] border border-[#99F6E4] flex items-center justify-center text-[#0D9488]">
          {stage === 1 ? (
            <FileSearch className="w-10 h-10 animate-pulse text-[#0D9488]" />
          ) : (
            <Sparkles className="w-10 h-10 animate-bounce text-[#0D9488]" />
          )}
        </div>
        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md border border-[#E2E8F0]">
          <Loader2 className="w-5 h-5 text-[#0D9488] animate-spin" />
        </div>
      </div>

      <div className="max-w-md space-y-2">
        <h3 className="text-xl font-bold text-[#1E293B]">
          {stage === 1 ? t.loadingStage1Title : t.loadingStage2Title}
        </h3>
        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
          {stage === 1 ? t.loadingStage1Desc : t.loadingStage2Desc}
        </p>
      </div>

      {/* Visual Stepper */}
      <div className="mt-8 flex items-center justify-center gap-3 w-full max-w-xs">
        <div
          className={`flex-1 h-2 rounded-full transition-all duration-500 ${
            stage >= 1 ? "bg-[#0D9488]" : "bg-[#E2E8F0]"
          }`}
        />
        <div
          className={`flex-1 h-2 rounded-full transition-all duration-500 ${
            stage >= 2 ? "bg-[#0D9488]" : "bg-[#E2E8F0]"
          }`}
        />
      </div>
      <div className="flex justify-between w-full max-w-xs text-[11px] font-medium text-[#64748B] mt-2">
        <span className={stage === 1 ? "text-[#0D9488] font-semibold" : ""}>
          {t.step1Label}
        </span>
        <span className={stage === 2 ? "text-[#0D9488] font-semibold" : ""}>
          {t.step2Label}
        </span>
      </div>

      <div className="mt-8 pt-4 border-t border-[#E2E8F0] flex items-center gap-2 text-xs text-[#64748B]">
        <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
        <span>{t.loadingPrivacy}</span>
      </div>
    </div>
  );
};
