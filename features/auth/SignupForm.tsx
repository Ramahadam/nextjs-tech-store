"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";
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
import { AuthSideImage } from "./AuthSideImage";
import AuthGoogleButton from "./AuthGoogleButton";
import { useAuthActions } from "./hooks/useAuthActions";
import { Spinner } from "@/components/ui/spinner";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    isLoading,
    isLoadingGmail,
    handleSignupWithGoogle,
    handleSignup,
    setAuthError,
    authError,
  } = useAuthActions();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>({
    resolver: zodResolver(signupSchema),
  });

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
                  {authError?.startsWith("Email") && (
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
                  {authError?.startsWith("Password") && (
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
                  <Button type="submit" role="button">
                    {isLoading ? (
                      <Spinner aria-label="loading" />
                    ) : (
                      "Create new account"
                    )}
                  </Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card py-8">
                  Or continue with
                </FieldSeparator>
                <Field className="grid grid-cols-1  py-6">
                  <AuthGoogleButton
                    role="button"
                    disabled={isLoading || isLoadingGmail}
                    isLoading={isLoadingGmail}
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
