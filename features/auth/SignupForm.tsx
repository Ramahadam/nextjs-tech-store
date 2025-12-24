"use client";

import { registerUser, singupWithGoogle } from "@/lib/firebase/auth";
import { cn, firebaseErrorMessages } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSyncUserMutation } from "../api/apiSlice";
import { FirebaseError } from "firebase/app";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [errMsg, setErrMsg] = useState("");
  const [syncUser] = useSyncUserMutation();

  async function handleSignup(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const cred = await registerUser(email, password);

      // If the user is created in firebase
      if (cred?.getIdToken) {
        const user = await syncUser(await cred?.getIdToken());

        console.log(user);
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        //Error message=> Firebase: Password should be at least 6 characters (auth/weak-password).
        setErrMsg(() => firebaseErrorMessages(err.code));
      } else {
        setErrMsg(() =>
          firebaseErrorMessages("Unexpected error occur please try again")
        );
      }
      console.log(errMsg);
    }
  }

  async function handleSignupWithGoogle() {
    const res = await singupWithGoogle();

    // If the user is created in firebase
    if (res?.token) {
      const user = await syncUser(res?.token);

      console.log(user);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div>
            <form
              className="p-6 md:p-8 md:max-w-[80%] md:mx-auto"
              action={handleSignup}
            >
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Create your account</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to create your account
                  </p>
                </div>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                  <FieldDescription>
                    We&apos;ll use this to contact you. We will not share your
                    email with anyone else.
                  </FieldDescription>
                </Field>
                <Field>
                  <Field className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Input
                        id="password"
                        type="password"
                        value="test1234"
                        required
                        name="password"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="confirm-password">
                        Confirm Password
                      </FieldLabel>
                      <Input
                        id="confirm-password"
                        type="password"
                        value="test1234"
                        required
                        name="confirm-password"
                      />
                    </Field>
                  </Field>
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                </Field>
                <Field>
                  <Button type="submit">Create Account</Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                  Or continue with
                </FieldSeparator>
                <Field className="grid grid-cols-1 gap-4">
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
                <FieldDescription className="text-center">
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
