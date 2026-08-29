import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import { ReportAnalysisResult, SavedReportItem, Language } from "../types";

/**
 * Saves a completed report analysis to the authenticated user's Firestore subcollection
 * Path: users/{userId}/reports/{reportId}
 */
export async function saveReportToHistory(
  userId: string,
  result: ReportAnalysisResult,
  language: Language
): Promise<string> {
  if (!userId) {
    throw new Error("Cannot save report: userId is required.");
  }

  const reportsCollection = collection(db, "users", userId, "reports");
  const reportDocRef = doc(reportsCollection);

  // Deep sanitize to prevent any `undefined` values that Firestore rejects
  const sanitizedReportInfo = (result.reportInfo || []).map((item) => ({
    testName: String(item.testName || "").trim(),
    value: String(item.value || "").trim(),
    referenceRange: String(item.referenceRange || "").trim(),
    rangeStatus: item.rangeStatus || "Unable to determine",
  }));

  const sanitizedTestExplanations = (result.testExplanations || []).map((item) => ({
    testName: String(item.testName || "").trim(),
    whatItMeasures: String(item.whatItMeasures || "").trim(),
    whyMeasured: String(item.whyMeasured || "").trim(),
    rangeStatus: item.rangeStatus || "Unable to determine",
    foodSources: item.foodSources ? String(item.foodSources).trim() : null,
  }));

  const reportData: Record<string, any> = {
    id: reportDocRef.id,
    userId: String(userId),
    fileName: String(result.analyzedFileName || "Medical Report"),
    fileType: String(result.analyzedFileType || "image"),
    analyzedAt: String(result.analyzedAt || new Date().toISOString()),
    createdAt: new Date().toISOString(),
    testCount: sanitizedReportInfo.length,
    language: result.language || language || "en",
    simpleSummary: String(result.simpleSummary || ""),
    reportInfo: sanitizedReportInfo,
    testExplanations: sanitizedTestExplanations,
    pageCountNote: result.pageCountNote ? String(result.pageCountNote) : null,
  };

  await setDoc(reportDocRef, reportData);
  return reportDocRef.id;
}

/**
 * Fetches all reports belonging to the specified user from Firestore
 * Sorted newest first by analyzedAt / createdAt
 */
export async function fetchUserReports(userId: string): Promise<SavedReportItem[]> {
  if (!userId) return [];

  const reportsCollection = collection(db, "users", userId, "reports");

  try {
    const q = query(reportsCollection, orderBy("analyzedAt", "desc"));
    const snapshot = await getDocs(q);

    const items: SavedReportItem[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      items.push({
        id: docSnap.id,
        userId: data.userId || userId,
        fileName: data.fileName || "Medical Report",
        fileType: data.fileType || "image",
        analyzedAt: data.analyzedAt || data.createdAt || new Date().toISOString(),
        testCount: typeof data.testCount === "number" ? data.testCount : (data.reportInfo?.length || 0),
        language: data.language || "en",
        simpleSummary: data.simpleSummary || "",
        reportInfo: data.reportInfo || [],
        testExplanations: data.testExplanations || [],
        pageCountNote: data.pageCountNote || undefined,
      });
    });

    return items;
  } catch (err) {
    console.warn("Ordered query notice, falling back to direct collection fetch with local sort:", err);
    const snapshot = await getDocs(reportsCollection);
    const items: SavedReportItem[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      items.push({
        id: docSnap.id,
        userId: data.userId || userId,
        fileName: data.fileName || "Medical Report",
        fileType: data.fileType || "image",
        analyzedAt: data.analyzedAt || data.createdAt || new Date().toISOString(),
        testCount: typeof data.testCount === "number" ? data.testCount : (data.reportInfo?.length || 0),
        language: data.language || "en",
        simpleSummary: data.simpleSummary || "",
        reportInfo: data.reportInfo || [],
        testExplanations: data.testExplanations || [],
        pageCountNote: data.pageCountNote || undefined,
      });
    });

    return items.sort((a, b) => {
      const timeA = new Date(a.analyzedAt).getTime() || 0;
      const timeB = new Date(b.analyzedAt).getTime() || 0;
      return timeB - timeA;
    });
  }
}

/**
 * Deletes a specific report document from the user's subcollection
 */
export async function deleteUserReport(userId: string, reportId: string): Promise<void> {
  if (!userId || !reportId) return;
  const reportDocRef = doc(db, "users", userId, "reports", reportId);
  await deleteDoc(reportDocRef);
}
