export type Language = 'en' | 'hi';

export type RangeStatus =
  | 'Above Range'
  | 'Below Range'
  | 'Within Range'
  | 'Unable to determine';

export interface ReportTestInfo {
  testName: string;
  value: string;
  referenceRange: string;
  rangeStatus: RangeStatus;
}

export interface TestExplanation {
  testName: string;
  whatItMeasures: string;
  whyMeasured: string;
  rangeStatus: RangeStatus;
  foodSources: string | null;
}

export interface ReportAnalysisResult {
  id?: string;
  reportInfo: ReportTestInfo[];
  testExplanations: TestExplanation[];
  simpleSummary: string;
  unclear: boolean;
  unclearMessage: string;
  pageCountNote?: string;
  analyzedFileName?: string;
  analyzedFileType?: 'image' | 'pdf';
  language?: Language;
  analyzedAt?: string;
}

export interface SavedReportItem {
  id: string;
  userId: string;
  fileName: string;
  fileType: 'image' | 'pdf' | string;
  analyzedAt: string;
  testCount: number;
  language: Language;
  simpleSummary: string;
  reportInfo: ReportTestInfo[];
  testExplanations: TestExplanation[];
  pageCountNote?: string;
}

export type ErrorType =
  | 'unsupported_file'
  | 'file_too_large'
  | 'unclear_content'
  | 'rate_limit'
  | 'server_error'
  | 'invalid_request';

export interface AnalysisError {
  type: ErrorType;
  message: string;
}

export interface AppUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
