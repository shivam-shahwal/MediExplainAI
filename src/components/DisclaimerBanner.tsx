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
      className={`w-full bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 sm:p-5 text-amber-900 shadow-2xs space-y-2.5 ${
        language === "hi" ? "font-hindi" : ""
      }`}
      role="alert"
    >
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-amber-100 text-amber-900 shrink-0 mt-0.5 shadow-2xs">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div className="text-xs sm:text-sm leading-relaxed space-y-1.5 flex-1">
          <p className="font-bold text-amber-950">
            {t.disclaimerTitle}
          </p>
          <p className="text-amber-900/90 leading-relaxed">
            {t.disclaimerP1}
          </p>
          {!compact && (
            <p className="text-amber-800/80 text-xs leading-relaxed">
              {t.disclaimerP2}
            </p>
          )}
        </div>
      </div>

      {currentUser && (
        <div className="pt-2.5 border-t border-amber-200/70 flex items-center gap-1.5 text-[11px] text-amber-900 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#008278] shrink-0" />
          <span>{t.disclaimerSavedNotice}</span>
        </div>
      )}
    </div>
  );
};
