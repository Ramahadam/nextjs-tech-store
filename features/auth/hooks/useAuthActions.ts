"use client";

import { useState } from "react";
import { useAuthFlow } from "./useAuthFlow";
import { useSearchParams } from "next/navigation";
import { loginUser, registerUser, signupWithGoogle } from "@/lib/firebase/auth";
import { FirebaseError } from "firebase/app";
import { firebaseErrorMessages } from "@/lib/utils";
import { LoginInputs, loginSchema } from "../login.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form";
import { useSyncUserMutation } from "@/features/api/apiSlice";
import { setProfile } from "@/features/user/userSlice";
import { useAppDispatch } from "@/app/hooks";
import { SignupInputs, signupSchema } from "../signup.schema";

export function useAuthActions() {
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGmail, setIsLoadingGmail] = useState(false);
  const params = useSearchParams();
  const redirectTo = params.get("redirectTo");
  const { updateAuthUIAndRedirect } = useAuthFlow();
  const [syncUser] = useSyncUserMutation();
  const dispatch = useAppDispatch();

  async function handleSignup(data: SignupInputs) {
    try {
      setIsLoading(false);
      const { email, password, fullname } = data;

      const cred = await registerUser(email, password);
      const token = await cred?.getIdToken();

      if (!token) throw Error("Token is not avaible");

      await updateAuthUIAndRedirect({ token, fullname, redirectTo });
    } catch (err) {
      if (err instanceof FirebaseError) {
        setAuthError(() => firebaseErrorMessages(err.code));
      } else {
        setAuthError(() =>
          firebaseErrorMessages("Unexpected error occur please try again")
        );
      }
      console.log("Complete error ", err);
      console.log("Error message only", authError);
    } finally {
      setIsLoading(false);
    }
  }

  const handelLoginUser: SubmitHandler<LoginInputs> = async (data) => {
    try {
      setIsLoading(true);
      const { email, password } = data;

      const user = await loginUser(email, password);
      const token = await user?.getIdToken();

      await updateAuthUIAndRedirect({ token, redirectTo });
    } catch (err) {
      if (err instanceof FirebaseError) {
        setAuthError(() => firebaseErrorMessages(err.code));
      } else {
        setAuthError("Unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  async function handleSignupWithGoogle() {
    try {
      setIsLoadingGmail(true);
      const res = await signupWithGoogle();
      const token = res?.token;
      if (!token) return;

      const fullname = res?.user?.displayName;
      await updateAuthUIAndRedirect({ token, redirectTo, fullname });
    } catch (err) {
      if (err instanceof FirebaseError) {
        setAuthError(() => firebaseErrorMessages(err.code));
      } else {
        setAuthError("Unexpected error occurred.");
      }
    } finally {
      setIsLoadingGmail(false);
    }
  }

  return {
    isLoading,
    isLoadingGmail,
    handleSignupWithGoogle,
    handelLoginUser,
    authError,
    setAuthError,
    handleSignup,
  };
}
