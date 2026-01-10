"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldSeparator } from "@/components/ui/field";
import { Message } from "@/components/Message";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { FieldForm } from "@/components/forms/FieldForm";
import { LoginInputs, loginSchema } from "./login.schema";
import { AuthSideImage } from "./AuthSideImage";
import AuthGoogleButton from "./AuthGoogleButton";
import { useAuthActions } from "./hooks/useAuthActions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    isLoading,
    isLoadingGmail,
    handleSignupWithGoogle,
    handelLoginUser,
    authError,
    setAuthError,
  } = useAuthActions();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <Card className="overflow-hidden md:p-0 pt-6">
        <CardContent className="grid p-0 md:grid-cols-2 md:min-h-[45rem]">
          <div className="flex items-center justify-center ">
            <form
              onSubmit={handleSubmit(handelLoginUser)}
              className="md:w-[80%]"
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="md:text-2xl   font-bold">
                  Login to your account
                </h1>
                <p className="text-muted-foreground text-sm text-balance mt-2">
                  Enter your email below to login to your account
                </p>
              </div>
              <div className="p-8 md:max-w-full flex flex-col">
                <FieldForm<LoginInputs>
                  name="email"
                  label="Email"
                  register={register}
                  errorMessage={errors.email?.message}
                  placeholder="m@example.com"
                  onFocus={() => setAuthError("")}
                />
                <FieldForm<LoginInputs>
                  name="password"
                  label="Password"
                  type="password"
                  register={register}
                  errorMessage={errors.password?.message}
                  placeholder="Password must be at least 6 characters"
                  onFocus={() => setAuthError("")}
                  className="even:mt-1"
                />

                <Field className="mt-4">
                  <Button type="submit">
                    {isLoading ? <Spinner /> : "Login"}
                  </Button>
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card my-2">
                    Or continue with
                  </FieldSeparator>
                  <Field className="grid grid-cols-1 gap-4">
                    <AuthGoogleButton
                      isLoading={isLoadingGmail}
                      onClick={() => handleSignupWithGoogle()}
                    />
                  </Field>
                  <FieldDescription className="text-center flex justify-between">
                    <span>
                      {" "}
                      Don&apos;t have an account?{" "}
                      <Link href="/signup">Sign up</Link>
                    </span>
                    <span>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm   underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </span>
                  </FieldDescription>
                </Field>
                <div className="relative h-16 overflow-hidden mt-4 -top-16 md:top-0">
                  {authError && (
                    <Message
                      className="bg-red-200 text-black absolute inset-0 transition-all duration-300"
                      title={`Oops could not login!`}
                      variant="default"
                    >
                      <p className=" text-black ">
                        <button
                          className="absolute right-4 top-4 cursor-pointer"
                          onClick={() => setAuthError("")}
                        >
                          <XCircle />
                        </button>
                        {authError && <span> {authError}</span>}
                      </p>
                    </Message>
                  )}
                </div>
              </div>
            </form>
          </div>
          <AuthSideImage />
        </CardContent>
      </Card>
    </div>
  );
}
