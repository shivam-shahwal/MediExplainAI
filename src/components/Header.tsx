import React, { useState } from "react";
import {
  Activity,
  Download,
  Smartphone,
  Languages,
  User,
  LogOut,
  FolderClock,
  Settings,
  LogIn,
  ChevronDown,
  AlertCircle,
  MailCheck,
} from "lucide-react";
import { Language } from "../types";
import { TRANSLATIONS } from "../i18n/translations";
import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onShowInstallHelp?: () => void;
  canInstallPrompt?: boolean;
  onTriggerInstall?: () => void;
  onOpenAuth: (tab: "signup" | "login") => void;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onOpenVerificationModal?: () => void;
  activeView: "upload" | "results" | "history";
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  onShowInstallHelp,
  canInstallPrompt,
  onTriggerInstall,
  onOpenAuth,
  onOpenHistory,
  onOpenSettings,
  onOpenVerificationModal,
  activeView,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const { currentUser, appUser, isEmailVerified, logout } = useAuth();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const displayEmail = currentUser?.email || appUser?.email || "My Account";

  return (
    <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0D9488] to-[#0F766E] flex items-center justify-center text-white shadow-xs shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg font-bold tracking-tight text-[#1E293B] leading-none">
                {t.appTitle} <span className="text-[#0D9488]">{t.appTitleSuffix}</span>
              </h1>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#CCFBF1] text-[#0F766E] whitespace-nowrap">
                {t.taglineBadge}
              </span>
            </div>
            <p className="text-xs text-[#64748B] hidden sm:block mt-0.5 truncate">
              {t.taglineSubtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Language Switcher Toggle */}
          <div
            id="language-switcher-container"
            className="flex items-center bg-[#F1F5F9] p-0.5 rounded-lg border border-[#CBD5E1]"
            role="group"
            aria-label="Language Selector"
          >
            <div className="px-1.5 py-1 text-[#64748B] hidden xs:flex items-center">
              <Languages className="w-3.5 h-3.5" />
            </div>
            <button
              type="button"
              id="lang-toggle-en"
              onClick={() => onLanguageChange("en")}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                currentLanguage === "en"
                  ? "bg-white text-[#0D9488] shadow-xs"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
              title="English"
            >
              EN
            </button>
            <button
              type="button"
              id="lang-toggle-hi"
              onClick={() => onLanguageChange("hi")}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                currentLanguage === "hi"
                  ? "bg-[#0D9488] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
              title="हिन्दी (Hindi)"
            >
              हिं
            </button>
          </div>

          {/* User Account / My Reports / Login Options */}
          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                id="user-menu-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                  !isEmailVerified
                    ? "bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300"
                    : "bg-[#F0FDFA] hover:bg-[#CCFBF1] text-[#0F766E] border-[#99F6E4]"
                }`}
              >
                <User className={`w-3.5 h-3.5 ${!isEmailVerified ? "text-amber-600" : "text-[#0D9488]"}`} />
                <span className="text-[11px] max-w-[120px] sm:max-w-[170px] truncate">
                  {displayEmail}
                </span>
                {!isEmailVerified && (
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" title={t.unverifiedBadge} />
                )}
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {userDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-1.5 w-60 bg-white rounded-xl shadow-lg border border-[#E2E8F0] p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-[#F1F5F9] mb-1">
                      <div className="text-[11px] text-[#94A3B8]">
                        {t.loggedInAs}
                      </div>
                      <div className="text-xs font-bold text-[#1E293B] truncate">
                        {displayEmail}
                      </div>
                      {!isEmailVerified && (
                        <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          <span>{t.unverifiedBadge}</span>
                        </div>
                      )}
                    </div>

                    {!isEmailVerified && onOpenVerificationModal && (
                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onOpenVerificationModal();
                        }}
                        className="w-full px-3 py-2 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-lg flex items-center gap-2 transition-colors cursor-pointer mb-1 border border-amber-200"
                      >
                        <MailCheck className="w-4 h-4 text-amber-600" />
                        <span>{t.verifyNowBtn}</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenHistory();
                      }}
                      className={`w-full px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
                        activeView === "history"
                          ? "bg-[#F0FDFA] text-[#0D9488]"
                          : "text-[#1E293B] hover:bg-[#F8FAFC]"
                      }`}
                    >
                      <FolderClock className="w-4 h-4 text-[#0D9488]" />
                      <span>{t.myReports}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenSettings();
                      }}
                      className="w-full px-3 py-2 text-xs font-semibold text-[#1E293B] hover:bg-[#F8FAFC] rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Settings className="w-4 h-4 text-[#64748B]" />
                      <span>{t.accountSettings}</span>
                    </button>

                    <div className="my-1 border-t border-[#F1F5F9]" />

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>{t.logOut}</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              type="button"
              id="header-login-btn"
              onClick={() => onOpenAuth("login")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.loginSignUp}</span>
            </button>
          )}

          {canInstallPrompt ? (
            <button
              type="button"
              id="install-pwa-button"
              onClick={onTriggerInstall}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#1E293B] text-xs font-semibold border border-[#CBD5E1] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>{t.installApp}</span>
            </button>
          ) : (
            <button
              type="button"
              id="pwa-help-button"
              onClick={onShowInstallHelp}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#1E293B] text-xs font-medium transition-colors border border-[#E2E8F0] cursor-pointer"
              title={t.addToHome}
            >
              <Smartphone className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>{t.addToHome}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
