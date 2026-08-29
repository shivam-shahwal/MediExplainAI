import React, { useState } from "react";
import {
  X,
  ShieldAlert,
  Trash2,
  RotateCcw,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Send,
  Lock,
  KeyRound,
  AlertCircle,
} from "lucide-react";
import { Language } from "../types";
import { TRANSLATIONS } from "../i18n/translations";
import { useAuth } from "../context/AuthContext";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const {
    currentUser,
    appUser,
    isEmailVerified,
    sendVerificationEmailToUser,
    sendPasswordReset,
    deleteUserAccountAndData,
  } = useAuth();

  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  if (!isOpen || !currentUser) return null;

  const userEmail = currentUser.email || appUser?.email || "Logged-in User";

  const handleSendVerification = async () => {
    setVerifyLoading(true);
    setError(null);
    setInfoMessage(null);
    try {
      await sendVerificationEmailToUser();
      setInfoMessage(t.verificationResentSuccess);
    } catch (err: any) {
      if (err.code === "auth/too-many-requests") {
        setError(t.tooManyAttempts);
      } else {
        setError(t.genericAuthError);
      }
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleSendPasswordReset = async () => {
    if (!currentUser.email) return;
    setResetLoading(true);
    setError(null);
    setInfoMessage(null);
    try {
      await sendPasswordReset(currentUser.email);
      setInfoMessage(t.resetLinkSentSuccess);
    } catch (err: any) {
      if (err.code === "auth/too-many-requests") {
        setError(t.tooManyAttempts);
      } else {
        setError(t.genericAuthError);
      }
    } finally {
      setResetLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteUserAccountAndData();
      onClose();
    } catch (err: any) {
      console.error("Account deletion failed:", err);
      if (err.code === "auth/requires-recent-login") {
        setError(
          language === "hi"
            ? "सुरक्षा कारणों से, खाता हटाने से पहले कृपया पुनः लॉग इन करें।"
            : "For security, please log out and log in again before deleting your account."
        );
      } else {
        setError(
          language === "hi"
            ? "खाता हटाने में त्रुटि हुई। कृपया पुनः प्रयास करें।"
            : "Failed to delete account. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="settings-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#1E293B]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="settings-modal-dialog"
        className={`bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-xl border border-[#E2E8F0] relative animate-in fade-in zoom-in-95 duration-200 ${
          language === "hi" ? "font-hindi" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#94A3B8] hover:text-[#1E293B] rounded-lg hover:bg-[#F1F5F9] cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#F0FDFA] text-[#0D9488] border border-[#99F6E4] flex items-center justify-center font-bold">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#1E293B]">
              {t.settingsTitle}
            </h3>
            <p className="text-xs text-[#64748B]">
              {t.accountInfo}
            </p>
          </div>
        </div>

        {/* User Info Box */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] mb-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#64748B]">{t.loggedInAs}</span>
            {isEmailVerified ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {t.verifiedBadge}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-semibold">
                <AlertCircle className="w-3 h-3 text-amber-600" />
                {t.unverifiedBadge}
              </span>
            )}
          </div>
          <div className="text-sm font-bold text-[#1E293B] font-mono break-all">
            {userEmail}
          </div>

          {!isEmailVerified && (
            <div className="pt-2 border-t border-[#E2E8F0] space-y-2">
              <p className="text-xs text-amber-800 leading-relaxed">
                {t.unverifiedStatusText}
              </p>
              <button
                type="button"
                onClick={handleSendVerification}
                disabled={verifyLoading}
                className="w-full py-2 px-3 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                {verifyLoading ? (
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>{t.resendVerifyLink}</span>
              </button>
            </div>
          )}
        </div>

        {/* Password Reset Section */}
        {currentUser.email && (
          <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] mb-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E293B]">
              <KeyRound className="w-4 h-4 text-[#0D9488]" />
              <span>{t.resetPasswordTitle}</span>
            </div>
            <button
              type="button"
              onClick={handleSendPasswordReset}
              disabled={resetLoading}
              className="w-full py-2 px-3 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#1E293B] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              {resetLoading ? (
                <RotateCcw className="w-3.5 h-3.5 animate-spin text-[#0D9488]" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-[#0D9488]" />
              )}
              <span>{t.sendPasswordResetBtn}</span>
            </button>
          </div>
        )}

        {/* Messages */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {infoMessage && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{infoMessage}</span>
          </div>
        )}

        {/* Delete Account Warning & Flow */}
        <div className="pt-3 border-t border-[#E2E8F0] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-700">
            <AlertTriangle className="w-4 h-4" />
            <span>{t.deleteAccount}</span>
          </div>

          <p className="text-xs text-[#64748B] leading-relaxed">
            {t.deleteAccountWarning}
          </p>

          {!confirmingDelete ? (
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              className="w-full py-2.5 rounded-lg border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>{t.deleteAccount}</span>
            </button>
          ) : (
            <div className="space-y-2 p-3 rounded-xl bg-rose-50 border border-rose-200">
              <p className="text-xs font-semibold text-rose-900">
                {language === "hi"
                  ? "क्या आप निश्चित हैं? आपका डेटा स्थायी रूप से हटा दिया जाएगा।"
                  : "Are you absolutely sure? This will delete all reports and your login."}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={loading}
                  className="flex-1 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  {loading ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>{t.deletingAccount}</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{t.deleteAccountConfirmBtn}</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmingDelete(false)}
                  disabled={loading}
                  className="px-3 py-2 rounded-lg bg-white border border-[#CBD5E1] text-[#1E293B] text-xs font-semibold hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                >
                  {t.cancelBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
