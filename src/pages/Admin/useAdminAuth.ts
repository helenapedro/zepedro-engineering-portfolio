import { useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "../../config/firebase";

const allowedAdminEmails = (process.env.REACT_APP_ADMIN_EMAILS || "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export const useAdminAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser: User | null) => {
      setUser(nextUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const isAllowedAdmin = useMemo(() => {
    if (!user?.email) return false;
    if (!allowedAdminEmails.length) return true;
    return allowedAdminEmails.includes(user.email.toLowerCase());
  }, [user]);

  const signIn = async (email: string, password: string) => {
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setAuthError(error instanceof Error ? error : new Error(String(error)));
    }
  };

  const signOutAdmin = async () => {
    setAuthError(null);
    await signOut(auth);
  };

  return {
    user,
    loading,
    authError,
    isAllowedAdmin,
    signIn,
    signOutAdmin,
    hasAllowList: allowedAdminEmails.length > 0,
  };
};
