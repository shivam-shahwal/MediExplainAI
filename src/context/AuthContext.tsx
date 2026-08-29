import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  User,
  onAuthStateChanged,
  signOut,
  deleteUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
  reload,
} from "firebase/auth";
import { doc, getDoc, setDoc, collection, getDocs, writeBatch } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { AppUser } from "../types";

interface AuthContextType {
  currentUser: User | null;
  appUser: AppUser | null;
  loading: boolean;
  isEmailVerified: boolean;
  signUpWithEmail: (email: string, password: string) => Promise<User>;
  loginWithEmail: (email: string, password: string) => Promise<User>;
  loginWithGoogle: () => Promise<User>;
  sendVerificationEmailToUser: (targetUser?: User) => Promise<void>;
  checkEmailVerified: () => Promise<boolean>;
  sendPasswordReset: (email: string) => Promise<void>;
  updateAccountPassword: (password: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteUserAccountAndData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper to check if email is verified or Google-authenticated
  const checkUserVerifiedStatus = (user: User | null): boolean => {
    if (!user) return false;
    // Google accounts are verified by definition
    const isGoogle = user.providerData.some((p) => p.providerId === "google.com");
    if (isGoogle) return true;
    return Boolean(user.emailVerified);
  };

  const syncUserProfile = useCallback(async (user: User) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);
      const isGoogle = user.providerData.some((p) => p.providerId === "google.com");
      const isVerified = isGoogle || Boolean(user.emailVerified);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const updated: AppUser = {
          uid: user.uid,
          email: user.email || data.email || null,
          displayName: user.displayName || data.displayName || null,
          emailVerified: isVerified,
          createdAt: data.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        // Update verification status in firestore if it changed
        if (data.emailVerified !== isVerified) {
          await setDoc(userDocRef, { emailVerified: isVerified, updatedAt: new Date().toISOString() }, { merge: true });
        }
        setAppUser(updated);
      } else {
        const newUserData: AppUser = {
          uid: user.uid,
          email: user.email || null,
          displayName: user.displayName || null,
          emailVerified: isVerified,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await setDoc(userDocRef, newUserData, { merge: true });
        setAppUser(newUserData);
      }
    } catch (err) {
      console.warn("Could not sync user profile:", err);
      setAppUser({
        uid: user.uid,
        email: user.email || null,
        displayName: user.displayName || null,
        emailVerified: checkUserVerifiedStatus(user),
      });
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await syncUserProfile(user);
      } else {
        setAppUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [syncUserProfile]);

  const signUpWithEmail = async (email: string, password: string): Promise<User> => {
    const trimmedEmail = email.trim().toLowerCase();
    const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
    const user = userCredential.user;

    // Send email verification immediately
    try {
      await sendEmailVerification(user);
    } catch (err) {
      console.warn("Error sending initial email verification:", err);
    }

    // Create user profile in Firestore
    await syncUserProfile(user);
    setCurrentUser(user);
    return user;
  };

  const loginWithEmail = async (email: string, password: string): Promise<User> => {
    const trimmedEmail = email.trim().toLowerCase();
    const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, password);
    const user = userCredential.user;

    // Reload user to obtain latest emailVerified status
    try {
      await reload(user);
    } catch (e) {
      console.warn("Could not reload user after login:", e);
    }

    await syncUserProfile(user);
    setCurrentUser(user);
    return user;
  };

  const loginWithGoogle = async (): Promise<User> => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    await syncUserProfile(user);
    setCurrentUser(user);
    return user;
  };

  const sendVerificationEmailToUser = async (targetUser?: User): Promise<void> => {
    const user = targetUser || auth.currentUser;
    if (!user) {
      throw new Error("NO_ACTIVE_USER");
    }
    await sendEmailVerification(user);
  };

  const checkEmailVerified = async (): Promise<boolean> => {
    const user = auth.currentUser;
    if (!user) return false;

    await reload(user);
    setCurrentUser(user);

    const isVerified = checkUserVerifiedStatus(user);
    if (isVerified) {
      await syncUserProfile(user);
    }
    return isVerified;
  };

  const sendPasswordReset = async (email: string): Promise<void> => {
    const trimmedEmail = email.trim().toLowerCase();
    await sendPasswordResetEmail(auth, trimmedEmail);
  };

  const updateAccountPassword = async (newPassword: string): Promise<void> => {
    if (auth.currentUser) {
      await updatePassword(auth.currentUser, newPassword);
    } else {
      throw new Error("NO_ACTIVE_USER");
    }
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
    setCurrentUser(null);
    setAppUser(null);
  };

  const deleteUserAccountAndData = async (): Promise<void> => {
    const user = auth.currentUser;
    if (!user) return;

    const uid = user.uid;

    // 1. Delete all reports in users/{uid}/reports
    try {
      const reportsRef = collection(db, "users", uid, "reports");
      const snapshot = await getDocs(reportsRef);
      const batch = writeBatch(db);
      snapshot.docs.forEach((d) => {
        batch.delete(d.ref);
      });
      // Also delete the user profile doc
      const userDocRef = doc(db, "users", uid);
      batch.delete(userDocRef);
      await batch.commit();
    } catch (err) {
      console.error("Error clearing user documents in Firestore:", err);
    }

    // 2. Delete the Firebase Auth User
    await deleteUser(user);
    setCurrentUser(null);
    setAppUser(null);
  };

  const isEmailVerified = checkUserVerifiedStatus(currentUser);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        appUser,
        loading,
        isEmailVerified,
        signUpWithEmail,
        loginWithEmail,
        loginWithGoogle,
        sendVerificationEmailToUser,
        checkEmailVerified,
        sendPasswordReset,
        updateAccountPassword,
        logout,
        deleteUserAccountAndData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
