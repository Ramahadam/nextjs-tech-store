"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./config";
import { useAppDispatch } from "@/app/hooks";
import { logout, setProfile } from "@/features/user/userSlice";
import { setCredntials } from "@/features/auth/authSlice";
import { useSyncUserMutation } from "@/features/api/apiSlice";

export function useOnAuthStateChanged() {
  const [syncUser] = useSyncUserMutation();
  const disptach = useAppDispatch();

  useEffect(() => {
    const unbscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        disptach(logout());
        return;
      }

      const token = await firebaseUser.getIdToken();

      if (!token) return;

      disptach(setCredntials(token));

      // 3. Sync user with backend
      const profile = await syncUser({
        token,
      }).unwrap();

      if (profile) disptach(setProfile(profile.user));
    });

    return () => unbscribe();
  }, []);
}
