import React from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { Language } from "../types";
import { TRANSLATIONS } from "../i18n/translations";
import { useAuth } from "../context/AuthContext";

interface DisclaimerBannerProps {
  language?: Language;
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({
  language = "en",
  compact = false,
}) => {
  const t = TRANSLATIONS[language];
  const { currentUser } = useAuth();

  return (
    <div
      id="medical-disclaimer-banner"
      className={`w-full bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-4 text-[#92400E] shadow-xs space-y-2.5 ${
        language === "hi" ? "font-hindi" : ""
      }`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="p-1.5 rounded-lg bg-amber-100/90 text-[#92400E] shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div className="text-xs sm:text-sm leading-relaxed space-y-1.5 flex-1">
          <p className="font-semibold text-amber-950">
            {t.disclaimerTitle}
          </p>
          <p className="text-[#92400E]/95">
            {t.disclaimerP1}
          </p>
          {!compact && (
            <p className="text-[#92400E]/90 text-xs">
              {t.disclaimerP2}
            </p>
          )}
        </div>
      </div>

      {currentUser && (
        <div className="pt-2 border-t border-[#FDE68A]/80 flex items-center gap-1.5 text-[11px] text-[#92400E] font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
          <span>{t.disclaimerSavedNotice}</span>
        </div>
      )}
    </div>
  );
};
