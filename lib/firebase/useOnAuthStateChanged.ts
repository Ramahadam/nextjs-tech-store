"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./config";
import { setCredntials } from "@/features/auth/authSlice";
import { setProfile } from "@/features/user/userSlice";
import { store } from "../store";
import { useSyncUserMutation } from "@/features/api/apiSlice";

export function useOnAuthStateChanged() {
  // const [syncUser] = useSyncUserMutation();

  useEffect(() => {
    const unbscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged in successfuly");
        // const token = await user.getIdToken();

        // store.dispatch(setCredntials(token));

        // const profile = (await syncUser(token)).data?.user[0];

        // store.dispatch(setProfile(profile));
      } else {
        console.log("There is no logged in user ");
      }
    });

    return () => unbscribe();
  }, []);
}
