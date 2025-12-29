"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./config";

export function useOnAuthStateChanged() {
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
