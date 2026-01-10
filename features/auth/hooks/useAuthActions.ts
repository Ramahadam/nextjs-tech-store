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
import { SignupInputs } from "../signup.schema";

export function useAuthActions() {
  const [authError, setAuthError] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const params = useSearchParams();
  const redirectTo = params.get("redirectTo");
  const { updateAuthUIAndRedirect } = useAuthFlow();
  const [syncUser] = useSyncUserMutation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  async function handleSignup(data: SignupInputs) {
    const { email, password, fullname } = data;

    try {
      const cred = await registerUser(email, password);
      const token = await cred?.getIdToken();

      if (!token) throw Error("Token is not avaible");
      //Create new profile in mongodb
      const profile = await syncUser({
        token,
        profile: { fullname },
      }).unwrap();

      //   if (profile?.user) store.dispatch(setProfile(profile.user));
      if (profile?.user) dispatch(setProfile(profile.user));
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
    }
  }

  const handelLoginUser: SubmitHandler<LoginInputs> = async (data) => {
    try {
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
    }
  };

  async function handleSignupWithGoogle() {
    try {
      setIsGoogleLoading(true);
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
      setIsGoogleLoading(false);
    }
  }

  return {
    isGoogleLoading,
    handleSignupWithGoogle,
    handelLoginUser,
    authError,
    setAuthError,
    errors,
    register,
    handleSubmit,
    handleSignup,
  };
}
