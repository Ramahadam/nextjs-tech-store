"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { registerUser, signupWithGoogle } from "@/lib/firebase/auth";
import { FirebaseError } from "firebase/app";
import { store } from "@/lib/store";
import { setProfile } from "../user/userSlice";
import { cn, firebaseErrorMessages } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignupInputs, signupSchema } from "./signup.schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import { FieldForm } from "@/components/forms/FieldForm";
import { Info } from "lucide-react";
import { useSyncUserMutation } from "../api/apiSlice";
import { AuthSideImage } from "./AuthSideImage";
import { useSearchParams } from "next/navigation";
import { useAuthFlow } from "./hooks/useAuthFlow";
import { useGoogleAuth } from "./hooks/useGoogleAuth";
import AuthGoogleButton from "./AuthGoogleButton";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [syncUser] = useSyncUserMutation();
  const [authError, setAuthError] = useState("");
  const params = useSearchParams();
  const redirectTo = params.get("redirectTo");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>({
    resolver: zodResolver(signupSchema),
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

      if (profile?.user) store.dispatch(setProfile(profile.user));
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

  const { isGoogleLoading, handleSignupWithGoogle } = useGoogleAuth(redirectTo);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div>
            <form
              className="p-6 md:p-8 md:max-w-[90%] md:mx-auto"
              onSubmit={handleSubmit(handleSignup)}
            >
              <FieldGroup className="gap-0">
                <div className="flex flex-col items-center gap-2 text-center md:mb-6">
                  <h1 className="text-2xl font-bold">Create your account</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to create your account
                  </p>
                </div>
                <FieldForm<SignupInputs>
                  name="fullname"
                  label="Full name"
                  register={register}
                  errorMessage={errors.fullname?.message}
                  placeholder="e.g John Doe"
                  errorClassName="h-4"
                />
                <FieldForm<SignupInputs>
                  name="email"
                  label="Email"
                  register={register}
                  errorMessage={errors.email?.message}
                  placeholder="m@example.com"
                  onFocus={() => setAuthError("")}
                  errorClassName="h-4"
                />{" "}
                <Field className="relative">
                  {authError.startsWith("Email") && (
                    <p className="text-sm text-red-400 flex items-center absolute -top-6">
                      <Info className="h-4" />
                      {authError}
                    </p>
                  )}
                </Field>
                <FieldForm<SignupInputs>
                  type="password"
                  name="password"
                  label="Password"
                  register={register}
                  errorMessage={errors.password?.message}
                  errorClassName="h-4"
                />
                <Field className="relative">
                  {authError.startsWith("Password") && (
                    <p className="text-sm text-red-400 flex items-center absolute -top-6">
                      <Info className="h-4" />
                      {authError}
                    </p>
                  )}
                </Field>
                <FieldForm<SignupInputs>
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  register={register}
                  errorMessage={errors.confirmPassword?.message}
                />
                <Field>
                  <Button type="submit">Create Account</Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card py-8">
                  Or continue with
                </FieldSeparator>
                <Field className="grid grid-cols-1  py-6">
                  <AuthGoogleButton
                    isLoading={isGoogleLoading}
                    onClick={handleSignupWithGoogle}
                  />
                </Field>
                <FieldDescription className="text-center py-4">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </FieldGroup>
            </form>
          </div>
          <AuthSideImage />
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
