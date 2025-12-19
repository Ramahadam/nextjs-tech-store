"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./config";
import { setCredntials } from "@/features/auth/authSlice";
import { store } from "../store";

export function useOnAuthStateChanged() {
  useEffect(() => {
    const unbscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          store.dispatch(setCredntials(token));
        });
      } else {
        console.log("There is no logged in user ");
      }
    });

    return () => unbscribe();
  }, []);
}
