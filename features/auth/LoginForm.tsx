"use client";
import { cn, firebaseErrorMessages } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { FirebaseError } from "firebase/app";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginUser, singupWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Message } from "@/components/Message";
import { Info, LockKeyholeIcon, Mail, XCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSyncUserMutation } from "../api/apiSlice";
import { FieldForm } from "@/components/forms/FieldForm";

export interface LoginInputs {
  email: string;
  password: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [authError, setAuthError] = useState("");
  const [syncUser] = useSyncUserMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInputs>();

  const handelLoginUser: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const { email, password } = data;

      const user = await loginUser(email, password);
      const token = await user?.getIdToken();

      if (token) {
        await fetch("/api/session", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        router.push("/");
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        setAuthError(() => firebaseErrorMessages(err.code));
      } else {
        setAuthError("Unexpected error occurred.");
      }
    }
  };

  async function handleSignupWithGoogle() {
    const res = await singupWithGoogle();

    // If the user is created in firebase
    if (res?.token) {
      const user = await syncUser(res?.token);

      console.log(user);
    }
  }

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
              <div className="p-8 md:max-w-[100%] flex flex-col">
                <FieldForm<LoginInputs>
                  name="email"
                  label="Email"
                  register={register}
                  error={errors.email}
                  placeholder="m@example.com"
                  onFocus={() => setAuthError("")}
                />
                <FieldForm<LoginInputs>
                  name="password"
                  label="Password"
                  type="password"
                  register={register}
                  error={errors.password}
                  placeholder="Password must be at least 6 characters"
                  onFocus={() => setAuthError("")}
                  className="even:mt-1"
                />

                <Field className="mt-4">
                  <Button type="submit">Login</Button>
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card my-2">
                    Or continue with
                  </FieldSeparator>
                  <Field className="grid grid-cols-1 gap-4">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => handleSignupWithGoogle()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="text-sm">Continue with Google</span>
                    </Button>
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
          <div className="relative hidden md:block ">
            <Image
              src="/person-using-laptop.jpg"
              alt="A person using laptop"
              className=" h-full w-full object-cover  grayscale-75"
              width={500}
              height={500}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
