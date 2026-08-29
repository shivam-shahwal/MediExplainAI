import React, { useState, useEffect } from "react";
import {
  FileText,
  Calendar,
  ChevronRight,
  Trash2,
  RotateCcw,
  ArrowLeft,
  Search,
  Sparkles,
  ClipboardList,
} from "lucide-react";
import { SavedReportItem, Language, ReportAnalysisResult } from "../types";
import { TRANSLATIONS } from "../i18n/translations";
import { fetchUserReports, deleteUserReport } from "../lib/reportsService";
import { useAuth } from "../context/AuthContext";

interface HistoryViewProps {
  language: Language;
  onOpenReport: (report: ReportAnalysisResult) => void;
  onBackToUpload: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  language,
  onOpenReport,
  onBackToUpload,
}) => {
  const t = TRANSLATIONS[language];
  const { currentUser } = useAuth();

  const [reports, setReports] = useState<SavedReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadReports = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadError(null);
    try {
      const items = await fetchUserReports(currentUser.uid);
      setReports(items);
    } catch (err: any) {
      console.error("Failed to load user reports:", err);
      setLoadError(err.message || (language === "hi" ? "रिपोर्ट्स लोड करने में त्रुटि हुई।" : "Failed to load reports."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, [currentUser]);

  const handleDelete = async (reportId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) return;
    if (!window.confirm(t.confirmDeleteReport)) return;

    setDeletingId(reportId);
    try {
      await deleteUserReport(currentUser.uid, reportId);
      setReports((prev) => prev.filter((r) => r.id !== reportId));
    } catch (err) {
      console.error("Failed to delete report:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleSelectReport = (item: SavedReportItem) => {
    const analysisResult: ReportAnalysisResult = {
      id: item.id,
      reportInfo: item.reportInfo || [],
      testExplanations: item.testExplanations || [],
      simpleSummary: item.simpleSummary || "",
      unclear: false,
      unclearMessage: "",
      pageCountNote: item.pageCountNote,
      analyzedFileName: item.fileName,
      analyzedFileType: item.fileType as any,
      language: item.language,
      analyzedAt: item.analyzedAt,
    };
    onOpenReport(analysisResult);
  };

  const filteredReports = reports.filter(
    (r) =>
      r.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.simpleSummary?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(language === "hi" ? "hi-IN" : "en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return isoString;
    }
  };

  return (
    <div className={`w-full space-y-6 animate-in fade-in duration-200 ${language === "hi" ? "font-hindi" : ""}`}>
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToUpload}
            className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#1E293B] border border-[#CBD5E1] transition-colors cursor-pointer"
            title={t.backToUpload}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-[#1E293B] leading-tight">
              {t.myReportsTitle}
            </h2>
            <p className="text-xs text-[#64748B]">
              {t.myReportsSubtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadReports}
            className="px-3 py-2 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#1E293B] text-xs font-semibold border border-[#CBD5E1] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#64748B]" />
            <span>{t.refreshList}</span>
          </button>
          <button
            type="button"
            onClick={onBackToUpload}
            className="px-4 py-2 rounded-lg bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.backToUpload}</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      {reports.length > 0 && (
        <div className="relative">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.filterPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
          />
        </div>
      )}

      {/* Reports List */}
      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#E2E8F0] shadow-xs space-y-3">
          <RotateCcw className="w-8 h-8 text-[#0D9488] animate-spin mx-auto" />
          <p className="text-xs text-[#64748B]">
            {language === "hi" ? "आपकी सहेजी गई रिपोर्ट्स लोड हो रही हैं..." : "Loading your saved reports..."}
          </p>
        </div>
      ) : loadError ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-rose-200 shadow-xs space-y-3">
          <p className="text-xs sm:text-sm text-rose-600 font-medium">{loadError}</p>
          <button
            type="button"
            onClick={loadReports}
            className="px-4 py-2 rounded-lg bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.refreshList}</span>
          </button>
        </div>
      ) : reports.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 sm:p-14 text-center border border-[#E2E8F0] shadow-xs space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center mx-auto">
            <ClipboardList className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#1E293B]">
              {t.noReportsYet}
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 leading-relaxed">
              {t.noReportsDesc}
            </p>
          </div>
          <button
            type="button"
            onClick={onBackToUpload}
            className="px-5 py-2.5 rounded-lg bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-semibold shadow-xs inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.backToUpload}</span>
          </button>
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-[#E2E8F0] text-xs text-[#64748B]">
          {t.noTestsMatch}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              onClick={() => handleSelectReport(report)}
              className="bg-white rounded-xl p-4 sm:p-5 border border-[#E2E8F0] hover:border-[#0D9488] shadow-xs hover:shadow-sm transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#F0FDFA] text-[#0D9488] border border-[#99F6E4] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-[#1E293B] truncate">
                      {report.fileName}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#F1F5F9] text-[#0F766E] border border-[#CBD5E1]">
                      {report.testCount} {t.testsCount}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
                    <Calendar className="w-3.5 h-3.5 text-[#94A3B8]" />
                    <span>{formatDate(report.analyzedAt)}</span>
                  </div>

                  <p className="text-xs text-[#64748B] line-clamp-2 pt-0.5 leading-relaxed">
                    {report.simpleSummary}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F1F5F9] w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={(e) => handleDelete(report.id, e)}
                  disabled={deletingId === report.id}
                  className="p-2 rounded-lg text-[#94A3B8] hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                  title={t.deleteReportBtn}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-lg bg-[#F0FDFA] group-hover:bg-[#0D9488] text-[#0D9488] group-hover:text-white border border-[#99F6E4] group-hover:border-transparent text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <span>{t.viewReportBtn}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
