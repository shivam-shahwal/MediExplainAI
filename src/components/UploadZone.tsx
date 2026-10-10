import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import {
  UploadCloud,
  FileText,
  Camera,
  X,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  AlertCircle,
  File,
  CheckCircle2,
  FolderClock,
  LogIn,
} from "lucide-react";
import { getSampleReports } from "../data/sampleReports";
import { ReportAnalysisResult, Language } from "../types";
import { TRANSLATIONS } from "../i18n/translations";
import { useAuth } from "../context/AuthContext";

interface UploadZoneProps {
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
  onClearFile: () => void;
  onAnalyze: () => void;
  onSelectSample: (sample: ReportAnalysisResult) => void;
  isAnalyzing: boolean;
  inlineError: string | null;
  setInlineError: (error: string | null) => void;
  language: Language;
  onOpenAuth: (tab: "signup" | "login") => void;
}

const REJECTED_EXTENSIONS = [
  ".doc", ".docx", ".txt", ".rtf", ".heic", ".heif", ".tiff",
  ".gif", ".bmp", ".csv", ".xlsx", ".mp4", ".mov", ".avi", ".mp3", ".wav"
];

export const UploadZone: React.FC<UploadZoneProps> = ({
  selectedFile,
  onFileSelect,
  onClearFile,
  onAnalyze,
  onSelectSample,
  isAnalyzing,
  inlineError,
  setInlineError,
  language,
  onOpenAuth,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const t = TRANSLATIONS[language];
  const { currentUser } = useAuth();
  const sampleReports = getSampleReports(language);

  // Validate file client-side
  const validateAndProcessFile = (file: File): boolean => {
    setInlineError(null);
    const fileName = file.name.toLowerCase();
    const extension = "." + (fileName.split(".").pop() || "");

    // Check rejected extensions
    if (REJECTED_EXTENSIONS.includes(extension)) {
      setInlineError(t.errUnsupported);
      return false;
    }

    const isImageExt = [".jpg", ".jpeg", ".png", ".webp"].includes(extension);
    const isPdfExt = extension === ".pdf";

    if (!isImageExt && !isPdfExt) {
      setInlineError(t.errUnsupported);
      return false;
    }

    // Check size limit: 10MB for images, 15MB for PDF
    if (isImageExt && file.size > 10 * 1024 * 1024) {
      setInlineError(t.errImageTooLarge);
      return false;
    }

    if (isPdfExt && file.size > 15 * 1024 * 1024) {
      setInlineError(t.errPdfTooLarge);
      return false;
    }

    // Generate local preview for images
    if (isImageExt) {
      const url = URL.createObjectURL(file);
      setImagePreviewUrl(url);
    } else {
      setImagePreviewUrl(null);
    }

    onFileSelect(file);
    return true;
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (isAnalyzing) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (e.dataTransfer.files.length > 1) {
        setInlineError(t.errMultipleFiles);
        return;
      }
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isAnalyzing) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
      e.target.value = ""; // Reset input so same file can be re-selected if removed
    }
  };

  const handleRemove = () => {
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
    setInlineError(null);
    onClearFile();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className={`w-full space-y-6 ${language === "hi" ? "font-hindi" : ""}`}>
      {/* Primary Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#008278] border border-teal-200/80 text-xs font-semibold mb-3.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#008278] animate-pulse shrink-0" />
              <Sparkles className="w-3.5 h-3.5 text-[#008278]" />
              <span>{t.aiBadge}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#081D2E] leading-snug">
              {t.uploadHeadline}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.uploadSubheadline}
            </p>
          </div>

          {/* Upload Box Container */}
          <div className="mt-6 sm:mt-7">
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-input-control"
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
              id="camera-input-control"
            />

            {!selectedFile ? (
              <div
                id="upload-dropzone"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer group ${
                  isDragging
                    ? "border-[#008278] bg-teal-50/70 scale-[0.99] shadow-inner"
                    : "border-slate-300 hover:border-[#008278] bg-slate-50/60 hover:bg-teal-50/30"
                }`}
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-50 text-[#008278] border border-teal-100 flex items-center justify-center mb-3.5 shadow-2xs group-hover:scale-105 group-hover:bg-teal-100/70 transition-all">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-[#081D2E]">
                  {t.dragAndDrop}{" "}
                  <span className="text-[#008278] underline underline-offset-4 decoration-[#008278]/40 hover:decoration-[#008278]">{t.browse}</span>
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 font-medium">
                  {t.acceptedFilesInfo}
                </p>

                {/* Action Buttons inside Dropzone */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    id="choose-file-btn"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4.5 py-2.5 rounded-xl bg-[#008278] hover:bg-[#007068] active:bg-[#005e57] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-sm flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <File className="w-4 h-4" />
                    <span>{t.chooseFile}</span>
                  </button>
                  <button
                    type="button"
                    id="take-photo-btn"
                    onClick={() => cameraInputRef.current?.click()}
                    className="px-4.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#081D2E] border border-slate-300 text-xs sm:text-sm font-semibold shadow-xs hover:shadow-sm flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-[#008278]" />
                    <span>{t.takePhoto}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Selected File Preview Box */
              <div className="border border-teal-200 bg-teal-50/50 rounded-2xl p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    {imagePreviewUrl ? (
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0 shadow-2xs">
                        <img
                          src={imagePreviewUrl}
                          alt="Report preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-[#008278] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <FileText className="w-7 h-7" />
                      </div>
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-[#081D2E] truncate max-w-[200px] sm:max-w-xs">
                          {selectedFile.name}
                        </p>
                        <CheckCircle2 className="w-4 h-4 text-[#008278] shrink-0" />
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {formatFileSize(selectedFile.size)} • {t.readyForAnalysis}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={handleRemove}
                      id="remove-file-button"
                      className="px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-[#081D2E] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>{t.changeFile}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Inline Error Message */}
            {inlineError && (
              <div
                id="upload-inline-error"
                className="mt-3.5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-rose-900">{t.fileNotAccepted}</p>
                  <p className="mt-0.5">{inlineError}</p>
                </div>
              </div>
            )}

            {/* Primary Action Analyze Button */}
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                id="analyze-report-button"
                disabled={!selectedFile || isAnalyzing}
                onClick={onAnalyze}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all ${
                  selectedFile && !isAnalyzing
                    ? "bg-[#008278] hover:bg-[#007068] active:bg-[#005e57] text-white cursor-pointer active:scale-[0.99]"
                    : "bg-slate-300 text-slate-500 cursor-not-allowed"
                }`}
              >
                <span>{t.analyzeBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Note strip */}
        <div className="text-xs text-slate-500 p-4 bg-slate-50/80 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#008278] shrink-0" />
            <span>
              <strong className="text-slate-700">{t.privacyTitle}:</strong>{" "}
              {currentUser ? t.privacyDescLoggedIn : t.privacyDescGuest}
            </span>
          </div>

          {!currentUser && (
            <button
              type="button"
              onClick={() => onOpenAuth("login")}
              className="inline-flex items-center gap-1 text-[#008278] font-bold hover:underline cursor-pointer shrink-0"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.loginToSave}</span>
            </button>
          )}
        </div>
      </div>

      {/* Preset Sample Reports Section for Fast Testing */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#008278]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t.quickSampleTitle}
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          {t.quickSampleDesc}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sampleReports.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              id={`sample-report-btn-${idx}`}
              onClick={() => onSelectSample(sample.data)}
              className="text-left p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-[#008278] hover:bg-teal-50/30 hover:shadow-xs transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-[#081D2E] group-hover:text-[#008278] transition-colors">
                  {sample.label}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/80">
                  {t.trySample}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                {sample.description} ({sample.data.reportInfo.length} {t.testsCount})
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
