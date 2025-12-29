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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [syncUser] = useSyncUserMutation();
  const [authError, setAuthError] = useState("");

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

  async function handleSignupWithGoogle() {
    const res = await signupWithGoogle();

    // If the user is created in firebase
    if (res?.token) {
      const user = await syncUser({ token: res?.token });

      console.log(user);
    }
  }

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
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => handleSignupWithGoogle()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="text-sm">Continue with Google</span>
                  </Button>
                </Field>
                <FieldDescription className="text-center py-4">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </FieldGroup>
            </form>
          </div>
          <div className="relative hidden md:block ">
            <Image
              src="/person-using-laptop.jpg"
              alt="A person using laptop"
              className=" h-full w-full object-cover  grayscale-75"
              width={800}
              height={800}
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
