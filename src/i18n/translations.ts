import { Language, RangeStatus } from "../types";

export interface TranslationSchema {
  // Header
  appTitle: string;
  appTitleSuffix: string;
  taglineBadge: string;
  taglineSubtitle: string;
  installApp: string;
  addToHome: string;
  zeroDataStorage: string;
  loginSignUp: string;
  logOut: string;
  myReports: string;
  accountSettings: string;
  deleteAccount: string;
  unverifiedBadge: string;

  // Language Toggle
  langEn: string;
  langHi: string;
  langEnFull: string;
  langHiFull: string;

  // Upload Zone
  aiBadge: string;
  uploadHeadline: string;
  uploadSubheadline: string;
  dragAndDrop: string;
  browse: string;
  acceptedFilesInfo: string;
  supportedFormats: string;
  chooseFile: string;
  takePhoto: string;
  readyForAnalysis: string;
  changeFile: string;
  fileNotAccepted: string;
  errUnsupported: string;
  errImageTooLarge: string;
  errPdfTooLarge: string;
  errMultipleFiles: string;
  analyzeBtn: string;
  privacyTitle: string;
  privacyDescGuest: string;
  privacyDescLoggedIn: string;
  quickSampleTitle: string;
  quickSampleDesc: string;
  trySample: string;
  testsCount: string;
  saveHistoryPrompt: string;
  loginToSave: string;

  // Loading State
  loadingStage1Title: string;
  loadingStage2Title: string;
  loadingStage1Desc: string;
  loadingStage2Desc: string;
  step1Label: string;
  step2Label: string;
  loadingPrivacy: string;

  // Results View
  analysisComplete: string;
  analyzedDocFallback: string;
  printSave: string;
  analyzeAnother: string;
  simpleUnderstandingTitle: string;
  simpleUnderstandingSub: string;
  extractedDataTitle: string;
  extractedDataSub: string;
  filterPlaceholder: string;
  noTestsMatch: string;
  testName: string;
  value: string;
  referenceRange: string;
  status: string;
  notSpecified: string;
  testExplanationsTitle: string;
  testExplanationsSub: string;
  explanationCardNum: string;
  refPrefix: string;
  whatItMeasuresLabel: string;
  whatItMeasures: string;
  whyLabsMeasureLabel: string;
  whyLabsMeasure: string;
  foodSourcesTitle: string;
  foodSourcesDisclaimer: string;
  reportSavedSuccess: string;
  viewInHistory: string;

  // Disclaimer Banner
  disclaimerTitle: string;
  disclaimerP1: string;
  disclaimerP2: string;
  disclaimerSavedNotice: string;

  // Error Alert
  errUnclearTitle: string;
  errUnsupportedTitle: string;
  errFileTooLargeTitle: string;
  errRateLimitTitle: string;
  errAnalysisFailedTitle: string;
  photoTipsTitle: string;
  tip1: string;
  tip2: string;
  tip3: string;
  uploadAnotherFile: string;

  // Auth Modal & Screens
  authModalTitle: string;
  signUpTab: string;
  logInTab: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  confirmPasswordLabel: string;
  passwordPlaceholder: string;
  confirmPasswordPlaceholder: string;
  reqMin8: string;
  req1Num: string;
  invalidEmail: string;
  passwordsDoNotMatch: string;
  createAccountBtn: string;
  creatingAccount: string;
  loginBtn: string;
  loggingIn: string;
  forgotPasswordLink: string;
  orContinueWith: string;
  continueWithGoogle: string;
  emailInUse: string;
  invalidCredentials: string;
  userNotFound: string;
  tooManyAttempts: string;
  genericAuthError: string;
  emailVerificationNotice: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;

  // Email Verification
  verificationRequiredTitle: string;
  verificationRequiredDesc: string;
  verificationSentTo: string;
  checkSpamNotice: string;
  resendVerificationBtn: string;
  resendingEmail: string;
  verificationResentSuccess: string;
  refreshVerificationBtn: string;
  checkingVerification: string;
  stillNotVerified: string;
  verificationSuccessToast: string;
  verificationBannerText: string;
  verifyNowBtn: string;
  useDifferentAccount: string;

  // Forgot Password
  forgotPasswordTitle: string;
  forgotPasswordDesc: string;
  sendResetLinkBtn: string;
  sendingResetLink: string;
  resetLinkSentSuccess: string;
  backToLoginBtn: string;

  // History & Reports
  myReportsTitle: string;
  myReportsSubtitle: string;
  noReportsYet: string;
  noReportsDesc: string;
  analyzedOn: string;
  viewReportBtn: string;
  deleteReportBtn: string;
  confirmDeleteReport: string;
  backToUpload: string;
  refreshList: string;

  // Settings & Account Deletion
  settingsTitle: string;
  accountInfo: string;
  loggedInAs: string;
  verifiedStatusLabel: string;
  verifiedBadge: string;
  unverifiedStatusText: string;
  resendVerifyLink: string;
  resetPasswordTitle: string;
  sendPasswordResetBtn: string;
  deleteAccountWarning: string;
  deleteAccountConfirmBtn: string;
  deletingAccount: string;
  cancelBtn: string;

  // PWA Modal
  pwaModalTitle: string;
  pwaModalSubtitle: string;
  pwaModalDesc: string;
  pwaInstallBtn: string;
  pwaIosTitle: string;
  pwaIosStep1: string;
  pwaIosStep2: string;
  pwaIosStep3: string;
  pwaAndroidTitle: string;
  pwaAndroidStep1: string;
  pwaAndroidStep2: string;
  pwaAndroidStep3: string;
  pwaGotIt: string;

  // Footer
  footerBrand: string;
}

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  en: {
    // Header
    appTitle: "MediExplain",
    appTitleSuffix: "AI",
    taglineBadge: "Educational Tool Only",
    taglineSubtitle: "Demystifying medical terminology & lab measurements",
    installApp: "Install App",
    addToHome: "Add to Home",
    zeroDataStorage: "Zero Data Storage",
    loginSignUp: "Log In / Sign Up",
    logOut: "Log Out",
    myReports: "My Reports",
    accountSettings: "Account & Settings",
    deleteAccount: "Delete My Account",
    unverifiedBadge: "Unverified",

    // Language Toggle
    langEn: "EN",
    langHi: "हिं",
    langEnFull: "English",
    langHiFull: "हिन्दी",

    // Upload Zone
    aiBadge: "AI-Assisted Educational Translation",
    uploadHeadline: "Analyze Report & Demystify Medical Terminology",
    uploadSubheadline:
      "Upload your medical lab report for a clear terminology explanation. MediExplain AI extracts test names, measured values, and reference ranges into plain, educational language.",
    dragAndDrop: "Drag & drop or",
    browse: "browse",
    acceptedFilesInfo: "Accepted files: JPG, PNG, WEBP (up to 10MB) or PDF (up to 15MB)",
    supportedFormats: "Accepted files: JPG, PNG, WEBP (up to 10MB) or PDF (up to 15MB)",
    chooseFile: "Choose File",
    takePhoto: "Take Photo",
    readyForAnalysis: "Ready for analysis",
    changeFile: "Change File",
    fileNotAccepted: "File cannot be accepted",
    errUnsupported: "This file type isn't supported. Please upload a JPG, PNG, WEBP, or PDF.",
    errImageTooLarge: "This image is too large. Please upload an image under 10MB.",
    errPdfTooLarge: "This PDF is too large. Please upload a PDF under 15MB.",
    errMultipleFiles: "Please upload only one report file at a time.",
    analyzeBtn: "Analyze Report",
    privacyTitle: "Privacy & Storage",
    privacyDescGuest: "Guest mode: Your files are processed in-memory and discarded immediately. No data is stored.",
    privacyDescLoggedIn:
      "When logged in with a verified email, your analyzed reports are securely saved to your private account for future review. You can delete reports or your entire account anytime.",
    quickSampleTitle: "Quick Test: Try a Realistic Sample Report",
    quickSampleDesc: "Don't have a lab report on hand? Select a sample below to see extracted test data and explanations:",
    trySample: "Try Sample",
    testsCount: "test measurements",
    saveHistoryPrompt: "Want to save this report to your history?",
    loginToSave: "Log in or sign up to keep this report in your history.",

    // Loading State
    loadingStage1Title: "Reading your report file...",
    loadingStage2Title: "Analyzing test terminology...",
    loadingStage1Desc:
      "Extracting visible test names, measured numerical values, and reference ranges exactly as shown...",
    loadingStage2Desc:
      "Generating neutral educational explanations of each biomarker without personal health evaluation...",
    step1Label: "1. File Extraction",
    step2Label: "2. Educational Analysis",
    loadingPrivacy: "Memory-only processing • Securely isolated",

    // Results View
    analysisComplete: "Analysis Complete",
    analyzedDocFallback: "Uploaded Medical Report",
    printSave: "Print / Save",
    analyzeAnother: "Analyze Another Report",
    simpleUnderstandingTitle: "🧾 Simple Understanding",
    simpleUnderstandingSub: "Overview of panels and measurements present in this report",
    extractedDataTitle: "📄 Extracted Report Data",
    extractedDataSub: "test measurements detected with printed reference comparison",
    filterPlaceholder: "Search extracted tests...",
    noTestsMatch: "No test measurements match your search.",
    testName: "Test Name",
    value: "Value",
    referenceRange: "Reference Range",
    status: "Status",
    notSpecified: "Not specified",
    testExplanationsTitle: "🧪 Test Explanations",
    testExplanationsSub:
      "General biology explanations of what each test measures, why labs test it, and general nutrition information",
    explanationCardNum: "Test Explanation",
    refPrefix: "Ref",
    whatItMeasuresLabel: "What it measures:",
    whatItMeasures: "What it measures:",
    whyLabsMeasureLabel: "Why labs measure it:",
    whyLabsMeasure: "Why labs measure it:",
    foodSourcesTitle: "🍎 General Food Sources",
    foodSourcesDisclaimer:
      "This is general nutrition information, not a treatment recommendation. Please consult a healthcare professional to discuss this result.",
    reportSavedSuccess: "Saved to your report history",
    viewInHistory: "View in My Reports",

    // Disclaimer Banner
    disclaimerTitle: "⚠️ Disclaimer: Educational Tool Only — Not Medical Advice",
    disclaimerP1:
      "This tool translates complex medical terms and lab measurements into plain educational concepts. It does not evaluate personal health, diagnose conditions, or prescribe treatments.",
    disclaimerP2:
      "Highlighted values only show whether a result falls outside the range printed on your report. This is not a diagnosis. Food information shown is general education, not a personalized recommendation. Please consult a healthcare professional for interpretation and guidance.",
    disclaimerSavedNotice:
      "When logged in, your analyzed reports are saved to your account so you can view them later. You can delete your account and all saved data anytime from Settings.",

    // Error Alert
    errUnclearTitle: "Report Content Was Unclear or Illegible",
    errUnsupportedTitle: "Unsupported File Format",
    errFileTooLargeTitle: "File Size Exceeds Limit",
    errRateLimitTitle: "Hourly Limit Reached",
    errAnalysisFailedTitle: "Unable to Complete Analysis",
    photoTipsTitle: "Tips for a better photo:",
    tip1: "Ensure even lighting without heavy shadows or screen glare",
    tip2: "Capture the full lab page flat from directly above",
    tip3: "Make sure test names and numbers are in sharp focus",
    uploadAnotherFile: "Upload Another File",

    // Auth Modal & Screens
    authModalTitle: "MediExplain Account",
    signUpTab: "Sign Up",
    logInTab: "Log In",
    emailLabel: "Email Address",
    emailPlaceholder: "you@example.com",
    passwordLabel: "Password",
    confirmPasswordLabel: "Confirm Password",
    passwordPlaceholder: "At least 8 characters with 1 number",
    confirmPasswordPlaceholder: "Re-enter your password",
    reqMin8: "At least 8 characters",
    req1Num: "At least 1 number",
    invalidEmail: "Please enter a valid email address.",
    passwordsDoNotMatch: "Passwords do not match.",
    createAccountBtn: "Create Account",
    creatingAccount: "Creating Account...",
    loginBtn: "Log In",
    loggingIn: "Logging In...",
    forgotPasswordLink: "Forgot Password?",
    orContinueWith: "or continue with",
    continueWithGoogle: "Continue with Google",
    emailInUse: "An account already exists with this email. Please log in instead.",
    invalidCredentials: "Incorrect email or password. Please check and try again.",
    userNotFound: "No account found with this email. Please sign up first.",
    tooManyAttempts: "Too many failed attempts. Please try again in a few minutes.",
    genericAuthError: "Authentication failed. Please check your details and try again.",
    emailVerificationNotice: "Your account is protected by email verification.",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",

    // Email Verification
    verificationRequiredTitle: "Verify Your Email Address",
    verificationRequiredDesc:
      "Account created! Please check your email and click the verification link to activate your account and access saved reports.",
    verificationSentTo: "Verification email sent to:",
    checkSpamNotice: "Didn't receive the email? Check your Spam or Promotions folder.",
    resendVerificationBtn: "Resend Verification Email",
    resendingEmail: "Sending...",
    verificationResentSuccess: "A new verification link has been sent to your email.",
    refreshVerificationBtn: "I've Verified My Email / Refresh Status",
    checkingVerification: "Checking Status...",
    stillNotVerified: "Your email is not verified yet. Please click the link in your email and try again.",
    verificationSuccessToast: "Email verified successfully! Welcome to MediExplain AI.",
    verificationBannerText: "Please verify your email address to enable saving and reviewing report history.",
    verifyNowBtn: "Verify Email",
    useDifferentAccount: "Log Out & Use Another Email",

    // Forgot Password
    forgotPasswordTitle: "Reset Your Password",
    forgotPasswordDesc: "Enter your registered email address to receive a secure password reset link.",
    sendResetLinkBtn: "Send Password Reset Link",
    sendingResetLink: "Sending Link...",
    resetLinkSentSuccess: "Password reset link sent! Please check your email inbox.",
    backToLoginBtn: "Back to Log In",

    // History & Reports
    myReportsTitle: "My Saved Reports",
    myReportsSubtitle: "View and review all your previously analyzed lab tests",
    noReportsYet: "No reports saved yet",
    noReportsDesc: "When you analyze lab reports while logged in with a verified account, they will be archived here for instant review.",
    analyzedOn: "Analyzed on",
    viewReportBtn: "Open Full Report",
    deleteReportBtn: "Delete",
    confirmDeleteReport: "Are you sure you want to delete this saved report? This cannot be undone.",
    backToUpload: "Analyze New Report",
    refreshList: "Refresh List",

    // Settings & Account Deletion
    settingsTitle: "Account & Privacy Settings",
    accountInfo: "Account Information",
    loggedInAs: "Logged in as:",
    verifiedStatusLabel: "Email Status:",
    verifiedBadge: "Verified",
    unverifiedStatusText: "Unverified — Please verify your email to unlock all features.",
    resendVerifyLink: "Send verification email",
    resetPasswordTitle: "Password & Security",
    sendPasswordResetBtn: "Send Password Reset Link",
    deleteAccountWarning:
      "Deleting your account will permanently remove your user login and all saved lab report history from Firestore. This action is irreversible.",
    deleteAccountConfirmBtn: "Permanently Delete Account & All Data",
    deletingAccount: "Deleting account and data...",
    cancelBtn: "Cancel",

    // PWA Modal
    pwaModalTitle: "Install MediExplain AI",
    pwaModalSubtitle: "Fast access right from your Home Screen",
    pwaModalDesc: "Install MediExplain AI to launch it instantly like a native app on your device, with offline app-shell caching.",
    pwaInstallBtn: "Install to Home Screen",
    pwaIosTitle: "📱 On iOS (Safari):",
    pwaIosStep1: "1. Tap the Share button at the bottom of Safari.",
    pwaIosStep2: "2. Scroll and select Add to Home Screen.",
    pwaIosStep3: "3. Tap \"Add\" in the top right corner.",
    pwaAndroidTitle: "🤖 On Android (Chrome / Edge):",
    pwaAndroidStep1: "1. Tap the three vertical dots (menu) in top right.",
    pwaAndroidStep2: "2. Select \"Install app\" or \"Add to Home screen\".",
    pwaAndroidStep3: "3. Confirm to install.",
    pwaGotIt: "Got it",

    // Footer
    footerBrand: "MediExplain AI • Educational Tool",
  },
  hi: {
    // Header
    appTitle: "MediExplain",
    appTitleSuffix: "AI",
    taglineBadge: "केवल शैक्षणिक उद्देश्य",
    taglineSubtitle: "मेडिकल शब्दावली और लैब जांच को समझना हुआ आसान",
    installApp: "ऐप इंस्टॉल करें",
    addToHome: "होम स्क्रीन पर जोड़ें",
    zeroDataStorage: "डेटा सुरक्षा व गोपनीयता",
    loginSignUp: "लॉग इन / साइन अप",
    logOut: "लॉग आउट",
    myReports: "मेरी रिपोर्ट्स",
    accountSettings: "खाता और सेटिंग्स",
    deleteAccount: "मेरा खाता हटाएं",
    unverifiedBadge: "असत्यापित",

    // Language Toggle
    langEn: "EN",
    langHi: "हिं",
    langEnFull: "English",
    langHiFull: "हिन्दी",

    // Upload Zone
    aiBadge: "एआई-सहायक शैक्षणिक अनुवाद",
    uploadHeadline: "रिपोर्ट का विश्लेषण करें और मेडिकल शब्दों को समझें",
    uploadSubheadline:
      "सरल शब्दों में व्याख्या पाने के लिए अपनी मेडिकल लैब रिपोर्ट अपलोड करें। MediExplain AI टेस्ट के नाम, मापे गए मान और सामान्य सीमाओं को आसान भाषा में समझाता है।",
    dragAndDrop: "फ़ाइल को यहाँ खींचें या",
    browse: "चुनें",
    acceptedFilesInfo: "स्वीकृत फ़ाइलें: JPG, PNG, WEBP (10MB तक) या PDF (15MB तक)",
    supportedFormats: "स्वीकृत फ़ाइलें: JPG, PNG, WEBP (10MB तक) या PDF (15MB तक)",
    chooseFile: "फ़ाइल चुनें",
    takePhoto: "फ़ोटो लें",
    readyForAnalysis: "विश्लेषण के लिए तैयार",
    changeFile: "फ़ाइल बदलें",
    fileNotAccepted: "फ़ाइल स्वीकार नहीं की जा सकती",
    errUnsupported: "यह फ़ाइल प्रकार समर्थित नहीं है। कृपया JPG, PNG, WEBP या PDF अपलोड करें।",
    errImageTooLarge: "यह इमेज बहुत बड़ी है। कृपया 10MB से कम की इमेज अपलोड करें।",
    errPdfTooLarge: "यह PDF बहुत बड़ा है। कृपया 15MB से कम का PDF अपलोड करें।",
    errMultipleFiles: "कृपया एक बार में केवल एक ही रिपोर्ट फ़ाइल अपलोड करें।",
    analyzeBtn: "रिपोर्ट का विश्लेषण करें",
    privacyTitle: "गोपनीयता और डेटा संग्रहण",
    privacyDescGuest: "गेस्ट मोड: आपकी फ़ाइलें केवल मेमोरी में प्रोसेस होती हैं और तुरंत हटा दी जाती हैं। कोई डेटा स्टोर नहीं होता।",
    privacyDescLoggedIn:
      "सत्यापित ईमेल के साथ लॉग इन रहने पर, आपकी जाँची गई रिपोर्ट आपके निजी खाते में सुरक्षित रखी जाती हैं ताकि आप उन्हें बाद में देख सकें। आप किसी भी समय अपनी रिपोर्ट या पूरा खाता हटा सकते हैं।",
    quickSampleTitle: "त्वरित परीक्षण: नमूना रिपोर्ट आज़माएं",
    quickSampleDesc: "क्या आपके पास अभी लैब रिपोर्ट नहीं है? टेस्ट डेटा और व्याख्या देखने के लिए नीचे दिए गए नमूने चुनें:",
    trySample: "नमूना देखें",
    testsCount: "टेस्ट माप",
    saveHistoryPrompt: "क्या आप इस रिपोर्ट को अपने इतिहास में सहेजना चाहते हैं?",
    loginToSave: "इस रिपोर्ट को सहेजने के लिए लॉग इन या साइन अप करें।",

    // Loading State
    loadingStage1Title: "आपकी रिपोर्ट फ़ाइल पढ़ी जा रही है...",
    loadingStage2Title: "जांच के परिणामों का विश्लेषण किया जा रहा है...",
    loadingStage1Desc:
      "रिपोर्ट से टेस्ट के नाम, संख्यात्मक मान और सामान्य सीमाएं निकाली जा रही हैं...",
    loadingStage2Desc:
      "बिना किसी स्वास्थ्य मूल्यांकन के प्रत्येक बायोमार्कर की सरल शैक्षणिक व्याख्या तैयार की जा रही है...",
    step1Label: "1. फ़ाइल निष्कर्षण",
    step2Label: "2. शैक्षणिक विश्लेषण",
    loadingPrivacy: "केवल मेमोरी में सुरक्षित प्रोसेसिंग",

    // Results View
    analysisComplete: "विश्लेषण पूर्ण",
    analyzedDocFallback: "अपलोड की गई मेडिकल रिपोर्ट",
    printSave: "प्रिंट / सुरक्षित करें",
    analyzeAnother: "दूसरी रिपोर्ट का विश्लेषण करें",
    simpleUnderstandingTitle: "🧾 सरल समझ",
    simpleUnderstandingSub: "इस रिपोर्ट में मौजूद पैनल और परीक्षणों का संक्षिप्त विवरण",
    extractedDataTitle: "📄 रिपोर्ट की जानकारी (निकाला गया डेटा)",
    extractedDataSub: "सामान्य सीमा की तुलना के साथ जांच माप मिले",
    filterPlaceholder: "टेस्ट खोजें...",
    noTestsMatch: "आपकी खोज से कोई टेस्ट मेल नहीं खाता।",
    testName: "जांच का नाम",
    value: "मान",
    referenceRange: "सामान्य सीमा",
    status: "स्थिति",
    notSpecified: "उल्लेखित नहीं",
    testExplanationsTitle: "🧪 जांच की व्याख्या",
    testExplanationsSub:
      "प्रत्येक टेस्ट क्या मापता है, लैब इसे क्यों जांचते हैं और सामान्य पोषण संबंधी जानकारी",
    explanationCardNum: "जांच व्याख्या",
    refPrefix: "संदर्भ",
    whatItMeasuresLabel: "यह क्या मापता है:",
    whatItMeasures: "यह क्या मापता है:",
    whyLabsMeasureLabel: "प्रयोगशालाएं इसे क्यों मापती हैं:",
    whyLabsMeasure: "प्रयोगशालाएं इसे क्यों मापती हैं:",
    foodSourcesTitle: "🍎 सामान्य खाद्य स्रोत",
    foodSourcesDisclaimer:
      "यह सामान्य पोषण संबंधी जानकारी है, कोई उपचार की सलाह नहीं। इस परिणाम पर चर्चा करने के लिए कृपया डॉक्टर से परामर्श लें।",
    reportSavedSuccess: "आपकी रिपोर्ट इतिहास में सुरक्षित कर ली गई है",
    viewInHistory: "मेरी रिपोर्ट्स में देखें",

    // Disclaimer Banner
    disclaimerTitle: "⚠️ अस्वीकरण: केवल शैक्षणिक उपकरण — यह चिकित्सीय सलाह नहीं है",
    disclaimerP1:
      "यह उपकरण जटिल मेडिकल शब्दों और लैब जांच के मापों को आसान शैक्षणिक भाषा में समझाता है। यह व्यक्तिगत स्वास्थ्य का मूल्यांकन, बीमारियों का निदान या उपचार की सिफारिश नहीं करता है।",
    disclaimerP2:
      "चिह्नित मान केवल यह दर्शाते हैं कि कोई परिणाम आपकी रिपोर्ट पर छपी सामान्य सीमा से बाहर है या नहीं। यह कोई बीमारी का निदान नहीं है। दिखाई गई खाद्य सामग्री की जानकारी सामान्य शिक्षा के लिए है, व्यक्तिगत सलाह नहीं। मार्गदर्शन और सही व्याख्या के लिए कृपया किसी स्वास्थ्य विशेषज्ञ (डॉक्टर) से परामर्श लें।",
    disclaimerSavedNotice:
      "लॉग इन रहने पर, आपकी विश्लेषित रिपोर्ट्स आपके खाते में सहेजी जाती हैं ताकि आप उन्हें बाद में देख सकें। आप सेटिंग्स से कभी भी अपना खाता और सारा सहेजा गया डेटा हटा सकते हैं।",

    // Error Alert
    errUnclearTitle: "रिपोर्ट की सामग्री अस्पष्ट या पढ़ने योग्य नहीं थी",
    errUnsupportedTitle: "असमर्थित फ़ाइल प्रारूप",
    errFileTooLargeTitle: "फ़ाइल का आकार सीमा से अधिक है",
    errRateLimitTitle: "प्रति घंटा सीमा समाप्त हो गई है",
    errAnalysisFailedTitle: "विश्लेषण पूरा करने में असमर्थ",
    photoTipsTitle: "बेहतर फ़ोटो के लिए सुझाव:",
    tip1: "समान रोशनी सुनिश्चित करें, भारी छाया या स्क्रीन की चमक से बचें",
    tip2: "पूरे पेज की सीधी ऊपर से समतल फ़ोटो लें",
    tip3: "सुनिश्चित करें कि टेस्ट के नाम और संख्याएं पूरी तरह साफ़ दिखाई दे रही हों",
    uploadAnotherFile: "दूसरी फ़ाइल अपलोड करें",

    // Auth Modal & Screens
    authModalTitle: "MediExplain खाता",
    signUpTab: "साइन अप",
    logInTab: "लॉग इन",
    emailLabel: "ईमेल पता",
    emailPlaceholder: "you@example.com",
    passwordLabel: "पासवर्ड",
    confirmPasswordLabel: "पासवर्ड की पुष्टि करें",
    passwordPlaceholder: "कम से कम 8 अक्षर और 1 संख्या",
    confirmPasswordPlaceholder: "पासवर्ड दोबारा दर्ज करें",
    reqMin8: "कम से कम 8 अक्षर",
    req1Num: "कम से कम 1 संख्या",
    invalidEmail: "कृपया एक मान्य ईमेल पता दर्ज करें।",
    passwordsDoNotMatch: "पासवर्ड मेल नहीं खाते।",
    createAccountBtn: "खाता बनाएं",
    creatingAccount: "खाता बनाया जा रहा है...",
    loginBtn: "लॉग इन करें",
    loggingIn: "लॉग इन हो रहा है...",
    forgotPasswordLink: "पासवर्ड भूल गए?",
    orContinueWith: "या इसके साथ जारी रखें",
    continueWithGoogle: "Google से जारी रखें",
    emailInUse: "इस ईमेल पते से पहले से ही एक खाता मौजूद है। कृपया लॉग इन करें।",
    invalidCredentials: "गलत ईमेल या पासवर्ड। कृपया जांचें और पुनः प्रयास करें।",
    userNotFound: "इस ईमेल पते से कोई खाता नहीं मिला। कृपया पहले साइन अप करें।",
    tooManyAttempts: "बहुत अधिक असफल प्रयास। कृपया कुछ मिनट बाद पुनः प्रयास करें।",
    genericAuthError: "प्रमाणीकरण विफल रहा। कृपया अपने विवरण की जाँच करें और पुन: प्रयास करें।",
    emailVerificationNotice: "आपका खाता ईमेल सत्यापन द्वारा सुरक्षित है।",
    alreadyHaveAccount: "क्या आपके पास पहले से खाता है?",
    dontHaveAccount: "क्या आपके पास खाता नहीं है?",

    // Email Verification
    verificationRequiredTitle: "अपना ईमेल पता सत्यापित करें",
    verificationRequiredDesc:
      "खाता बन गया है! कृपया अपना ईमेल देखें और अपने खाते को सक्रिय करने तथा सहेजी गई रिपोर्ट्स देखने के लिए सत्यापन लिंक पर क्लिक करें।",
    verificationSentTo: "सत्यापन ईमेल भेजा गया:",
    checkSpamNotice: "ईमेल नहीं मिला? कृपया अपना स्पैम या प्रमोशन्स फ़ोल्डर जांचें।",
    resendVerificationBtn: "सत्यापन ईमेल पुनः भेजें",
    resendingEmail: "भेजा जा रहा है...",
    verificationResentSuccess: "आपके ईमेल पर एक नया सत्यापन लिंक भेज दिया गया है।",
    refreshVerificationBtn: "मैंने ईमेल सत्यापित कर लिया है / स्थिति ताज़ा करें",
    checkingVerification: "जांच की जा रही है...",
    stillNotVerified: "आपका ईमेल अभी सत्यापित नहीं हुआ है। कृपया अपने ईमेल में दिए गए लिंक पर क्लिक करें और पुनः प्रयास करें।",
    verificationSuccessToast: "ईमेल सफलतापूर्वक सत्यापित हुआ! MediExplain AI में आपका स्वागत है।",
    verificationBannerText: "रिपोर्ट इतिहास सहेजने और समीक्षा करने के लिए कृपया अपना ईमेल पता सत्यापित करें।",
    verifyNowBtn: "ईमेल सत्यापित करें",
    useDifferentAccount: "लॉग आउट करें और दूसरा ईमेल उपयोग करें",

    // Forgot Password
    forgotPasswordTitle: "अपना पासवर्ड रीसेट करें",
    forgotPasswordDesc: "सुरक्षित पासवर्ड रीसेट लिंक प्राप्त करने के लिए अपना पंजीकृत ईमेल पता दर्ज करें।",
    sendResetLinkBtn: "पासवर्ड रीसेट लिंक भेजें",
    sendingResetLink: "लिंक भेजा जा रहा है...",
    resetLinkSentSuccess: "पासवर्ड रीसेट लिंक भेज दिया गया है! कृपया अपना इनबॉक्स देखें।",
    backToLoginBtn: "लॉग इन पर वापस जाएं",

    // History & Reports
    myReportsTitle: "मेरी सहेजी गई रिपोर्ट्स",
    myReportsSubtitle: "अपनी पिछली सभी विश्लेषित लैब रिपोर्ट्स देखें और समीक्षा करें",
    noReportsYet: "अभी तक कोई रिपोर्ट सहेजी नहीं गई है",
    noReportsDesc: "जब आप सत्यापित खाते के साथ लॉग इन रहते हुए लैब रिपोर्ट का विश्लेषण करेंगे, तो वे तुरंत समीक्षा के लिए यहां दिखाई देंगी।",
    analyzedOn: "विश्लेषण की तिथि",
    viewReportBtn: "पूरी रिपोर्ट खोलें",
    deleteReportBtn: "हटाएं",
    confirmDeleteReport: "क्या आप वाकई इस सहेजी गई रिपोर्ट को हटाना चाहते हैं? इसे वापस नहीं लाया जा सकता।",
    backToUpload: "नई रिपोर्ट का विश्लेषण करें",
    refreshList: "सूची ताज़ा करें",

    // Settings & Account Deletion
    settingsTitle: "खाता एवं गोपनीयता सेटिंग्स",
    accountInfo: "खाता विवरण",
    loggedInAs: "लॉग इन ईमेल:",
    verifiedStatusLabel: "ईमेल स्थिति:",
    verifiedBadge: "सत्यापित",
    unverifiedStatusText: "असत्यापित — सभी सुविधाओं को अनलॉक करने के लिए कृपया अपना ईमेल सत्यापित करें।",
    resendVerifyLink: "सत्यापन ईमेल भेजें",
    resetPasswordTitle: "पासवर्ड और सुरक्षा",
    sendPasswordResetBtn: "पासवर्ड रीसेट लिंक भेजें",
    deleteAccountWarning: "अपना खाता हटाने से आपका लॉगिन और Firestore से आपकी सभी सहेजी गई रिपोर्ट स्थायी रूप से मिट जाएंगी। यह क्रिया अपरिवर्तनीय है।",
    deleteAccountConfirmBtn: "खाता और सारा डेटा स्थायी रूप से हटाएं",
    deletingAccount: "खाता और डेटा हटाया जा रहा है...",
    cancelBtn: "रद्द करें",

    // PWA Modal
    pwaModalTitle: "MediExplain AI इंस्टॉल करें",
    pwaModalSubtitle: "अपनी होम स्क्रीन से त्वरित उपयोग करें",
    pwaModalDesc: "ऑफ़लाइन ऐप-शेल कैशिंग के साथ अपने डिवाइस पर नेटिव ऐप की तरह चलाने के लिए MediExplain AI इंस्टॉल करें।",
    pwaInstallBtn: "होम स्क्रीन पर जोड़ें",
    pwaIosTitle: "📱 iOS (Safari) पर:",
    pwaIosStep1: "1. Safari में नीचे शेयर बटन दबाएं।",
    pwaIosStep2: "2. नीचे स्क्रॉल करें और 'होम स्क्रीन में जोड़ें' चुनें।",
    pwaIosStep3: "3. ऊपर दाईं ओर 'जोड़ें' (Add) पर टैप करें।",
    pwaAndroidTitle: "🤖 Android (Chrome / Edge) पर:",
    pwaAndroidStep1: "1. ऊपर दाईं ओर तीन वर्टिकल बिंदुओं (मेनू) पर टैप करें।",
    pwaAndroidStep2: "2. 'ऐप इंस्टॉल करें' या 'होम स्क्रीन में जोड़ें' चुनें।",
    pwaAndroidStep3: "3. इंस्टॉल करने की पुष्टि करें।",
    pwaGotIt: "समझ गया",

    // Footer
    footerBrand: "MediExplain AI • शैक्षणिक उपकरण",
  },
};

export function getRangeStatusLabel(status: RangeStatus, lang: Language): string {
  if (lang === "hi") {
    switch (status) {
      case "Above Range":
        return "सीमा से अधिक";
      case "Below Range":
        return "सीमा से कम";
      case "Within Range":
        return "सामान्य सीमा में";
      case "Unable to determine":
      default:
        return "निर्धारित नहीं किया जा सका";
    }
  }

  return status;
}

export function maskEmail(email: string | null | undefined): string {
  if (!email) return "";
  const parts = email.split("@");
  if (parts.length !== 2) return email;
  const [name, domain] = parts;
  if (name.length <= 2) {
    return `${name[0]}*@${domain}`;
  }
  const maskedName = name[0] + "*".repeat(Math.min(name.length - 2, 4)) + name[name.length - 1];
  return `${maskedName}@${domain}`;
}
