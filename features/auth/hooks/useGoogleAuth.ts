"use client";
import { signupWithGoogle } from "@/lib/firebase/auth";
import { useState } from "react";
import { useAuthFlow } from "./useAuthFlow";
import { toast } from "sonner";

export function useGoogleAuth(redirectTo: string | null) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { updateAuthUIAndRedirect } = useAuthFlow();

  async function handleSignupWithGoogle() {
    try {
      setIsGoogleLoading(true);
      const res = await signupWithGoogle();
      const token = res?.token;
      if (!token) return;

      const fullname = res?.user?.displayName;
      await updateAuthUIAndRedirect({ token, redirectTo, fullname });
    } catch (error: unknown) {
      toast.error("Error");
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return { isGoogleLoading, handleSignupWithGoogle };
}
