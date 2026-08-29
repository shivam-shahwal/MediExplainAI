import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  RefreshCw,
  Send,
  Sparkles,
} from "lucide-react";
import { Language } from "../types";
import { TRANSLATIONS } from "../i18n/translations";
import { useAuth } from "../context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialTab?: "signup" | "login";
  onSuccess?: () => void;
}

type AuthMode = "login" | "signup" | "forgot_password" | "verification_pending";

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  language,
  initialTab = "login",
  onSuccess,
}) => {
  const t = TRANSLATIONS[language];
  const {
    currentUser,
    isEmailVerified,
    signUpWithEmail,
    loginWithEmail,
    loginWithGoogle,
    sendVerificationEmailToUser,
    checkEmailVerified,
    sendPasswordReset,
    logout,
  } = useAuth();

  const [mode, setMode] = useState<AuthMode>(initialTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [checkingVerification, setCheckingVerification] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Sync mode with initialTab prop when modal opens
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSuccessNotice(null);
      if (currentUser && !isEmailVerified) {
        setMode("verification_pending");
      } else {
        setMode(initialTab);
      }
    }
  }, [isOpen, initialTab, currentUser, isEmailVerified]);

  // Resend cooldown timer countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  if (!isOpen) return null;

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const hasMin8 = password.length >= 8;
  const has1Num = /\d/.test(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const handleAuthError = (err: any) => {
    console.error("Auth error:", err);
    const code = err.code || "";
    if (code === "auth/email-already-in-use") {
      setError(t.emailInUse);
    } else if (
      code === "auth/invalid-credential" ||
      code === "auth/wrong-password" ||
      code === "auth/user-not-found"
    ) {
      setError(t.invalidCredentials);
    } else if (code === "auth/too-many-requests") {
      setError(t.tooManyAttempts);
    } else if (code === "auth/invalid-email") {
      setError(t.invalidEmail);
    } else if (code === "auth/popup-closed-by-user") {
      setError(null);
    } else {
      setError(err.message || t.genericAuthError);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessNotice(null);

    if (!validateEmail(email)) {
      setError(t.invalidEmail);
      return;
    }
    if (!hasMin8 || !has1Num) {
      setError(language === "hi" ? "कृपया पासवर्ड की सभी आवश्यकताएं पूरी करें।" : "Please meet all password requirements.");
      return;
    }
    if (password !== confirmPassword) {
      setError(t.passwordsDoNotMatch);
      return;
    }

    setLoading(true);
    try {
      await signUpWithEmail(email, password);
      // Move to verification pending screen
      setMode("verification_pending");
      setResendCooldown(45);
      setSuccessNotice(t.verificationResentSuccess);
    } catch (err: any) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessNotice(null);

    if (!validateEmail(email)) {
      setError(t.invalidEmail);
      return;
    }
    if (!password) {
      setError(language === "hi" ? "कृपया पासवर्ड दर्ज करें।" : "Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      const user = await loginWithEmail(email, password);
      if (!user.emailVerified) {
        setMode("verification_pending");
      } else {
        onSuccess?.();
        onClose();
      }
    } catch (err: any) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccessNotice(null);
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      onSuccess?.();
      onClose();
    } catch (err: any) {
      handleAuthError(err);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (resendCooldown > 0) return;
    setError(null);
    setSuccessNotice(null);
    setResendingEmail(true);
    try {
      await sendVerificationEmailToUser();
      setSuccessNotice(t.verificationResentSuccess);
      setResendCooldown(60);
    } catch (err: any) {
      if (err.code === "auth/too-many-requests") {
        setError(t.tooManyAttempts);
      } else {
        setError(t.genericAuthError);
      }
    } finally {
      setResendingEmail(false);
    }
  };

  const handleCheckVerification = async () => {
    setError(null);
    setSuccessNotice(null);
    setCheckingVerification(true);
    try {
      const verified = await checkEmailVerified();
      if (verified) {
        setSuccessNotice(t.verificationSuccessToast);
        setTimeout(() => {
          onSuccess?.();
          onClose();
        }, 800);
      } else {
        setError(t.stillNotVerified);
      }
    } catch (err: any) {
      setError(t.genericAuthError);
    } finally {
      setCheckingVerification(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessNotice(null);

    if (!validateEmail(email)) {
      setError(t.invalidEmail);
      return;
    }

    setLoading(true);
    try {
      await sendPasswordReset(email);
      setSuccessNotice(t.resetLinkSentSuccess);
    } catch (err: any) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const currentDisplayEmail = currentUser?.email || email;

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#1E293B]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="auth-modal-dialog"
        className={`bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-xl border border-[#E2E8F0] relative animate-in fade-in zoom-in-95 duration-200 ${
          language === "hi" ? "font-hindi" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#94A3B8] hover:text-[#1E293B] rounded-lg hover:bg-[#F1F5F9] cursor-pointer transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0D9488] to-[#0F766E] flex items-center justify-center text-white shadow-xs shrink-0">
            {mode === "verification_pending" ? (
              <Mail className="w-5 h-5" />
            ) : mode === "forgot_password" ? (
              <Lock className="w-5 h-5" />
            ) : (
              <ShieldCheck className="w-5 h-5" />
            )}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#1E293B] leading-tight">
              {mode === "verification_pending"
                ? t.verificationRequiredTitle
                : mode === "forgot_password"
                ? t.forgotPasswordTitle
                : t.authModalTitle}
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              {mode === "verification_pending"
                ? t.checkSpamNotice
                : mode === "forgot_password"
                ? t.forgotPasswordDesc
                : t.emailVerificationNotice}
            </p>
          </div>
        </div>

        {/* Mode Tabs (only in login/signup mode) */}
        {(mode === "login" || mode === "signup") && (
          <div className="flex items-center bg-[#F1F5F9] p-1 rounded-xl mb-5 border border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError(null);
                setSuccessNotice(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === "login"
                  ? "bg-white text-[#0D9488] shadow-xs"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              {t.logInTab}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError(null);
                setSuccessNotice(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === "signup"
                  ? "bg-white text-[#0D9488] shadow-xs"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              {t.signUpTab}
            </button>
          </div>
        )}

        {/* Global Error Notice */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Global Success Notice */}
        {successNotice && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 animate-in fade-in duration-150">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{successNotice}</span>
          </div>
        )}

        {/* SCREEN 1: LOGIN */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1E293B] mb-1.5">
                {t.emailLabel}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  required
                  autoFocus
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#1E293B]">
                  {t.passwordLabel}
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setSuccessNotice(null);
                    setMode("forgot_password");
                  }}
                  className="text-xs text-[#0D9488] hover:text-[#0F766E] font-semibold hover:underline cursor-pointer"
                >
                  {t.forgotPasswordLink}
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#1E293B] cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  <span>{t.loggingIn}</span>
                </>
              ) : (
                <span>{t.loginBtn}</span>
              )}
            </button>

            {/* Google Sign In Divider */}
            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E2E8F0]" />
              </div>
              <span className="relative px-3 bg-white text-[11px] font-semibold text-[#94A3B8] uppercase">
                {t.orContinueWith}
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading || googleLoading}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#1E293B] text-xs sm:text-sm font-semibold border border-[#CBD5E1] shadow-xs flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-50"
            >
              {googleLoading ? (
                <RotateCcw className="w-4 h-4 animate-spin text-[#0D9488]" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              )}
              <span>{t.continueWithGoogle}</span>
            </button>

            <div className="pt-2 text-center">
              <span className="text-xs text-[#64748B]">
                {t.dontHaveAccount}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setError(null);
                    setSuccessNotice(null);
                  }}
                  className="text-xs text-[#0D9488] hover:text-[#0F766E] font-bold hover:underline cursor-pointer"
                >
                  {t.signUpTab}
                </button>
              </span>
            </div>
          </form>
        )}

        {/* SCREEN 2: SIGN UP */}
        {mode === "signup" && (
          <form onSubmit={handleSignUp} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#1E293B] mb-1.5">
                {t.emailLabel}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  required
                  autoFocus
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E293B] mb-1.5">
                {t.passwordLabel}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#1E293B] cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E293B] mb-1.5">
                {t.confirmPasswordLabel}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t.confirmPasswordPlaceholder}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#1E293B] cursor-pointer"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Password Validation Checklist */}
            <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1.5 text-xs">
              <div
                className={`flex items-center gap-2 ${
                  hasMin8 ? "text-emerald-700 font-semibold" : "text-[#64748B]"
                }`}
              >
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${hasMin8 ? "text-emerald-600" : "text-[#CBD5E1]"}`}
                />
                <span>{t.reqMin8}</span>
              </div>
              <div
                className={`flex items-center gap-2 ${
                  has1Num ? "text-emerald-700 font-semibold" : "text-[#64748B]"
                }`}
              >
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${has1Num ? "text-emerald-600" : "text-[#CBD5E1]"}`}
                />
                <span>{t.req1Num}</span>
              </div>
              {confirmPassword.length > 0 && (
                <div
                  className={`flex items-center gap-2 ${
                    passwordsMatch ? "text-emerald-700 font-semibold" : "text-rose-600 font-semibold"
                  }`}
                >
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${
                      passwordsMatch ? "text-emerald-600" : "text-rose-400"
                    }`}
                  />
                  <span>
                    {passwordsMatch
                      ? language === "hi"
                        ? "पासवर्ड मेल खाते हैं"
                        : "Passwords match"
                      : t.passwordsDoNotMatch}
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading || !hasMin8 || !has1Num || !passwordsMatch}
              className="w-full py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  <span>{t.creatingAccount}</span>
                </>
              ) : (
                <span>{t.createAccountBtn}</span>
              )}
            </button>

            {/* Google Sign In Divider */}
            <div className="relative my-3 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E2E8F0]" />
              </div>
              <span className="relative px-3 bg-white text-[11px] font-semibold text-[#94A3B8] uppercase">
                {t.orContinueWith}
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading || googleLoading}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#1E293B] text-xs sm:text-sm font-semibold border border-[#CBD5E1] shadow-xs flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-50"
            >
              {googleLoading ? (
                <RotateCcw className="w-4 h-4 animate-spin text-[#0D9488]" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              )}
              <span>{t.continueWithGoogle}</span>
            </button>

            <div className="pt-1 text-center">
              <span className="text-xs text-[#64748B]">
                {t.alreadyHaveAccount}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError(null);
                    setSuccessNotice(null);
                  }}
                  className="text-xs text-[#0D9488] hover:text-[#0F766E] font-bold hover:underline cursor-pointer"
                >
                  {t.logInTab}
                </button>
              </span>
            </div>
          </form>
        )}

        {/* SCREEN 3: VERIFICATION PENDING */}
        {mode === "verification_pending" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#F0FDFA] border border-[#99F6E4] space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#0F766E] font-semibold">
                <Mail className="w-4 h-4 text-[#0D9488]" />
                <span>{t.verificationSentTo}</span>
              </div>
              <div className="text-sm font-bold text-[#1E293B] font-mono break-all">
                {currentDisplayEmail}
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed pt-1">
                {t.verificationRequiredDesc}
              </p>
            </div>

            {/* Check Status Button */}
            <button
              type="button"
              onClick={handleCheckVerification}
              disabled={checkingVerification || resendingEmail}
              className="w-full py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {checkingVerification ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{t.checkingVerification}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.refreshVerificationBtn}</span>
                </>
              )}
            </button>

            {/* Resend Verification Button */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={resendingEmail || resendCooldown > 0}
                className="flex-1 py-2 px-3 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#1E293B] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                {resendingEmail ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 animate-spin text-[#0D9488]" />
                    <span>{t.resendingEmail}</span>
                  </>
                ) : resendCooldown > 0 ? (
                  <span>
                    {language === "hi"
                      ? `पुनः भेजें (${resendCooldown}s)`
                      : `Resend in (${resendCooldown}s)`}
                  </span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-[#0D9488]" />
                    <span>{t.resendVerificationBtn}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={async () => {
                  await logout();
                  setMode("login");
                  setError(null);
                  setSuccessNotice(null);
                }}
                className="py-2 px-3 rounded-lg border border-transparent hover:border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
              >
                {t.useDifferentAccount}
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 4: FORGOT PASSWORD */}
        {mode === "forgot_password" && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1E293B] mb-1.5">
                {t.emailLabel}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  required
                  autoFocus
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  <span>{t.sendingResetLink}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{t.sendResetLinkBtn}</span>
                </>
              )}
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                  setSuccessNotice(null);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-[#0D9488] hover:text-[#0F766E] font-bold hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.backToLoginBtn}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
