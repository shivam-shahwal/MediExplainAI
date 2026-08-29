import React from "react";
import { X, Share2, PlusSquare, Smartphone, Check, Download } from "lucide-react";
import { Language } from "../types";
import { TRANSLATIONS } from "../i18n/translations";

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  canInstallPrompt: boolean;
  onTriggerInstall: () => void;
  language?: Language;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  canInstallPrompt,
  onTriggerInstall,
  language = "en",
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language];

  return (
    <div
      id="pwa-install-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#1E293B]/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        id="pwa-install-modal-dialog"
        className={`bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-[#E2E8F0] relative animate-in fade-in zoom-in-95 duration-200 ${
          language === "hi" ? "font-hindi" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#94A3B8] hover:text-[#1E293B] rounded-lg hover:bg-[#F1F5F9] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center font-bold">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1E293B]">
              {t.installApp}
            </h3>
            <p className="text-xs text-[#64748B]">
              {t.addToHome}
            </p>
          </div>
        </div>

        {canInstallPrompt ? (
          <div className="space-y-4">
            <p className="text-xs text-[#64748B] leading-relaxed">
              {t.pwaModalDesc}
            </p>
            <button
              onClick={() => {
                onTriggerInstall();
                onClose();
              }}
              className="w-full py-2.5 rounded-lg bg-[#0D9488] hover:bg-[#0F766E] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t.pwaInstallBtn}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
              <p className="text-xs font-bold text-[#1E293B] flex items-center gap-1.5">
                <span>{t.pwaIosTitle}</span>
              </p>
              <ol className="text-xs text-[#64748B] space-y-1.5 list-decimal list-inside">
                <li className="flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                  <span>{t.pwaIosStep1}</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <PlusSquare className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                  <span>{t.pwaIosStep2}</span>
                </li>
                <li>{t.pwaIosStep3}</li>
              </ol>
            </div>

            <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
              <p className="text-xs font-bold text-[#1E293B] flex items-center gap-1.5">
                <span>{t.pwaAndroidTitle}</span>
              </p>
              <ol className="text-xs text-[#64748B] space-y-1 list-decimal list-inside">
                <li>{t.pwaAndroidStep1}</li>
                <li>{t.pwaAndroidStep2}</li>
                <li>{t.pwaAndroidStep3}</li>
              </ol>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#1E293B] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#E2E8F0] cursor-pointer"
            >
              <Check className="w-4 h-4 text-[#0D9488]" />
              <span>{t.pwaGotIt}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
