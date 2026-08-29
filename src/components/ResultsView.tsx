import React, { useState } from "react";
import {
  RotateCcw,
  Printer,
  Search,
  BookOpen,
  ClipboardList,
  Info,
  HelpCircle,
  FileCheck,
  Apple,
  BookmarkCheck,
  LogIn,
  FolderClock,
} from "lucide-react";
import { ReportAnalysisResult, RangeStatus, Language } from "../types";
import { DisclaimerBanner } from "./DisclaimerBanner";
import { TRANSLATIONS, getRangeStatusLabel } from "../i18n/translations";
import { useAuth } from "../context/AuthContext";
import { getTestNutritionInfo } from "../data/nutritionData";

function isGenericFiller(text: string | null | undefined): boolean {
  if (!text) return true;
  const lower = text.toLowerCase();
  const fillerPatterns = [
    "no specific diet",
    "does not have a specific diet",
    "do not have a specific diet",
    "no specific dietary",
    "not directly related to diet",
    "not directly affected by diet",
    "not related to diet",
    "dietary changes are not",
    "no standard dietary",
    "विशिष्ट आहार",
    "विशेष आहार",
    "सीधा संबंध नहीं",
    "कोई सीधा आहार",
  ];
  return fillerPatterns.some((pattern) => lower.includes(pattern));
}

interface ResultsViewProps {
  result: ReportAnalysisResult;
  onReset: () => void;
  language: Language;
  onOpenAuth: (tab: "signup" | "login") => void;
  onOpenHistory: () => void;
  isSavedInHistory?: boolean;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  onReset,
  language,
  onOpenAuth,
  onOpenHistory,
  isSavedInHistory = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const t = TRANSLATIONS[language];
  const { currentUser } = useAuth();

  const filteredTests = result.reportInfo.filter((item) =>
    item.testName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  const renderRangeBadge = (status: RangeStatus) => {
    const label = getRangeStatusLabel(status, language);
    switch (status) {
      case "Above Range":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFEDD5] text-[#C2410C] border border-[#FED7AA] whitespace-nowrap">
            {label}
          </span>
        );
      case "Below Range":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA] whitespace-nowrap">
            {label}
          </span>
        );
      case "Within Range":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] whitespace-nowrap">
            {label}
          </span>
        );
      case "Unable to determine":
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F1F5F9] text-[#64748B] border border-[#CBD5E1] whitespace-nowrap">
            {label}
          </span>
        );
    }
  };

  return (
    <div className={`w-full space-y-6 pb-12 animate-in fade-in duration-300 ${language === "hi" ? "font-hindi" : ""}`}>
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs print:hidden">
        <div className="flex items-center gap-2.5">
          <FileCheck className="w-5 h-5 text-[#0D9488] shrink-0" />
          <div className="min-w-0">
            <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block">
              {t.analysisComplete}
            </span>
            <span className="text-sm font-bold text-[#1E293B] truncate block">
              {result.analyzedFileName || t.analyzedDocFallback}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {currentUser && isSavedInHistory && (
            <button
              type="button"
              onClick={onOpenHistory}
              className="px-3 py-2 rounded-lg bg-[#F0FDFA] hover:bg-[#CCFBF1] text-[#0F766E] border border-[#99F6E4] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>{t.viewInHistory}</span>
            </button>
          )}

          <button
            type="button"
            id="print-report-button"
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#1E293B] text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#E2E8F0] cursor-pointer"
            title={t.printSave}
          >
            <Printer className="w-3.5 h-3.5 text-[#64748B]" />
            <span>{t.printSave}</span>
          </button>
          <button
            type="button"
            id="analyze-another-button"
            onClick={onReset}
            className="px-4 py-2 rounded-lg bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.analyzeAnother}</span>
          </button>
        </div>
      </div>

      {/* Guest Mode History Prompt Banner */}
      {!currentUser && (
        <div className="p-3.5 rounded-xl bg-[#F0FDFA] border border-[#99F6E4] text-[#0F766E] text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-xs">
          <div className="flex items-center gap-2">
            <FolderClock className="w-4 h-4 text-[#0D9488] shrink-0" />
            <span>{t.saveHistoryPrompt}</span>
          </div>
          <button
            type="button"
            onClick={() => onOpenAuth("signup")}
            className="px-3 py-1.5 rounded-lg bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-semibold shrink-0 shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{t.loginSignUp}</span>
          </button>
        </div>
      )}

      {/* Logged in Saved Indicator */}
      {currentUser && isSavedInHistory && (
        <div className="p-3 rounded-lg bg-[#F0FDFA] border border-[#99F6E4] text-[#0F766E] text-xs font-medium flex items-center gap-2">
          <BookmarkCheck className="w-4 h-4 text-[#0D9488] shrink-0" />
          <span>{t.reportSavedSuccess}</span>
        </div>
      )}

      {/* Multipage Note if present */}
      {result.pageCountNote && (
        <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] text-xs sm:text-sm flex items-center gap-2.5">
          <Info className="w-4 h-4 text-[#0D9488] shrink-0" />
          <span>{result.pageCountNote}</span>
        </div>
      )}

      {/* Persistent Disclaimer Banner */}
      <DisclaimerBanner language={language} />

      {/* 🧾 Simple Understanding Section */}
      <section
        id="simple-understanding-section"
        className="bg-white rounded-xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs space-y-3"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center font-bold">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#1E293B] leading-tight">
              {t.simpleUnderstandingTitle}
            </h2>
            <p className="text-xs text-[#64748B]">
              {t.simpleUnderstandingSub}
            </p>
          </div>
        </div>

        <div className="bg-[#F8FAFC] rounded-lg p-4 border border-[#E2E8F0] text-xs sm:text-sm text-[#334155] leading-relaxed">
          {result.simpleSummary}
        </div>
      </section>

      {/* 📄 Report Information Section (Extracted Data Table with Status) */}
      <section
        id="report-information-section"
        className="bg-white rounded-xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center">
              <ClipboardList className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#1E293B] leading-tight">
                {t.extractedDataTitle}
              </h2>
              <p className="text-xs text-[#64748B]">
                {result.reportInfo.length} {t.extractedDataSub}
              </p>
            </div>
          </div>

          {/* Quick Filter Search */}
          {result.reportInfo.length > 3 && (
            <div className="relative w-full sm:w-64 print:hidden">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                placeholder={t.filterPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] text-[#1E293B]"
              />
            </div>
          )}
        </div>

        {filteredTests.length === 0 ? (
          <div className="text-center py-6 text-xs text-[#64748B]">
            {t.noTestsMatch} &ldquo;{searchQuery}&rdquo;
          </div>
        ) : (
          <div className="bg-[#FAFBFC] p-3 sm:p-4 rounded-lg border border-[#E2E8F0] overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[540px]">
              <thead>
                <tr>
                  <th className="py-2.5 px-3 text-[11px] font-bold uppercase tracking-wider text-[#64748B] border-b border-[#E2E8F0]">
                    {t.testName}
                  </th>
                  <th className="py-2.5 px-3 text-[11px] font-bold uppercase tracking-wider text-[#64748B] border-b border-[#E2E8F0]">
                    {t.value}
                  </th>
                  <th className="py-2.5 px-3 text-[11px] font-bold uppercase tracking-wider text-[#64748B] border-b border-[#E2E8F0]">
                    {t.referenceRange}
                  </th>
                  <th className="py-2.5 px-3 text-[11px] font-bold uppercase tracking-wider text-[#64748B] border-b border-[#E2E8F0]">
                    {t.status}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTests.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[#F0FDFA] transition-colors border-b border-[#E2E8F0] last:border-b-0"
                  >
                    <td className="py-3 px-3 font-semibold text-[#1E293B]">
                      {row.testName}
                    </td>
                    <td className="py-3 px-3 font-mono font-medium text-[#1E293B]">
                      {row.value}
                    </td>
                    <td className="py-3 px-3 text-[#64748B]">
                      {row.referenceRange || t.notSpecified}
                    </td>
                    <td className="py-3 px-3">
                      {renderRangeBadge(row.rangeStatus || "Unable to determine")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 🧪 Test Explanations Section */}
      <section
        id="test-explanations-section"
        className="bg-white rounded-xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#1E293B] leading-tight">
              {t.testExplanationsTitle}
            </h2>
            <p className="text-xs text-[#64748B]">
              {t.testExplanationsSub}
            </p>
          </div>
        </div>

        <div className="space-y-3.5 pt-1">
          {result.testExplanations.map((item, idx) => {
            const correspondingData = result.reportInfo.find(
              (r) => r.testName.toLowerCase() === item.testName.toLowerCase()
            );
            const status = item.rangeStatus || correspondingData?.rangeStatus || "Unable to determine";
            const isAbnormal = status === "Above Range" || status === "Below Range";
            const structuredNutrition = isAbnormal ? getTestNutritionInfo(item.testName, status, language) : null;
            const hasMeaningfulTextFoodSource =
              isAbnormal &&
              item.foodSources &&
              item.foodSources.trim().length > 0 &&
              !isGenericFiller(item.foodSources);
            const shouldRenderFoodSources = isAbnormal && (structuredNutrition !== null || hasMeaningfulTextFoodSource);

            return (
              <div
                key={idx}
                id={`explanation-card-${idx}`}
                className="bg-[#F0FDFA] border border-[#99F6E4] rounded-lg p-4 sm:p-5 transition-all space-y-3"
              >
                {/* Header with test name badge, status & value */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-[#99F6E4]/60">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#0D9488] mb-0.5">
                      {t.explanationCardNum} #{idx + 1}
                    </div>
                    <h3 className="text-base font-bold text-[#1E293B]">
                      {item.testName}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {renderRangeBadge(status)}
                    {correspondingData && (
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="px-2.5 py-1 rounded bg-white border border-[#99F6E4] font-mono font-semibold text-[#1E293B]">
                          {correspondingData.value}
                        </span>
                        <span className="text-[#64748B] text-[11px] hidden sm:inline">
                          ({t.refPrefix}: {correspondingData.referenceRange || t.notSpecified})
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Explanation Content */}
                <div className="space-y-2 text-xs sm:text-sm">
                  <p className="text-[#1E293B] leading-relaxed">
                    <strong className="text-[#1E293B]">{t.whatItMeasures}</strong> {item.whatItMeasures}
                  </p>
                  <p className="text-[#0F766E] leading-relaxed">
                    <strong className="text-[#0F766E]">{t.whyLabsMeasure}</strong> {item.whyMeasured}
                  </p>
                </div>

                {/* 🍎 General Food Sources Subsection (shown ONLY when test is Above Range or Below Range AND meaningful dietary info exists) */}
                {shouldRenderFoodSources && (
                  <div className="mt-3 pt-3 border-t border-[#99F6E4]/60 bg-white/90 rounded-lg p-4 border border-[#99F6E4]/40 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F766E]">
                      <Apple className="w-3.5 h-3.5 text-[#C2410C] shrink-0" />
                      <span>{t.foodSourcesTitle}</span>
                    </div>

                    {structuredNutrition ? (
                      <div className="space-y-2.5">
                        {/* Relevant Nutrients */}
                        {structuredNutrition.nutrients && structuredNutrition.nutrients.length > 0 && (
                          <div className="space-y-1">
                            <div className="text-[11px] font-bold text-[#334155] uppercase tracking-wider">
                              {language === "hi" ? "प्रासंगिक पोषक तत्व / आहार संबंधी कारक:" : "Relevant nutrients / dietary factors:"}
                            </div>
                            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#334155]">
                              {structuredNutrition.nutrients.map((n, i) => (
                                <li key={i} className="leading-relaxed">
                                  <strong className="font-semibold text-[#0F766E]">{n.name}</strong> — {n.role}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Vegetables */}
                        {structuredNutrition.vegetables && structuredNutrition.vegetables.length > 0 && (
                          <div className="space-y-1 pt-1.5 border-t border-[#99F6E4]/30">
                            <div className="text-[11px] font-bold text-[#334155] uppercase tracking-wider">
                              {language === "hi" ? "🥬 सब्जियां" : "🥬 Vegetables"}
                            </div>
                            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#334155]">
                              {structuredNutrition.vegetables.map((v, i) => (
                                <li key={i} className="leading-relaxed">
                                  <strong className="font-semibold text-[#1E293B]">{v.name}</strong> — {v.nutrients}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Fruits */}
                        {structuredNutrition.fruits && structuredNutrition.fruits.length > 0 && (
                          <div className="space-y-1 pt-1.5 border-t border-[#99F6E4]/30">
                            <div className="text-[11px] font-bold text-[#334155] uppercase tracking-wider">
                              {language === "hi" ? "🍊 फल" : "🍊 Fruits"}
                            </div>
                            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#334155]">
                              {structuredNutrition.fruits.map((f, i) => (
                                <li key={i} className="leading-relaxed">
                                  <strong className="font-semibold text-[#1E293B]">{f.name}</strong> — {f.nutrients}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Other Food Sources */}
                        {structuredNutrition.otherFoods && structuredNutrition.otherFoods.length > 0 && (
                          <div className="space-y-1 pt-1.5 border-t border-[#99F6E4]/30">
                            <div className="text-[11px] font-bold text-[#334155] uppercase tracking-wider">
                              {language === "hi" ? "🥗 अन्य खाद्य स्रोत" : "🥗 Other Food Sources"}
                            </div>
                            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#334155]">
                              {structuredNutrition.otherFoods.map((o, i) => (
                                <li key={i} className="leading-relaxed">
                                  <strong className="font-semibold text-[#1E293B]">{o.name}</strong> — {o.nutrients}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                        {item.foodSources}
                      </p>
                    )}

                    <p className="text-[11px] text-[#64748B] italic pt-1 border-t border-[#99F6E4]/40">
                      {t.foodSourcesDisclaimer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Secondary Bottom Disclaimer */}
      <DisclaimerBanner language={language} />

      {/* Bottom Reset Call-to-action */}
      <div className="text-center pt-2 print:hidden">
        <button
          type="button"
          id="bottom-reset-button"
          onClick={onReset}
          className="px-6 py-2.5 rounded-lg bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold text-xs sm:text-sm shadow-xs inline-flex items-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.analyzeAnother}</span>
        </button>
      </div>
    </div>
  );
};
