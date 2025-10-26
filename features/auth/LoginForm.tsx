"use client";
import { cn, firebaseErrorMessages } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { User } from "firebase/auth";
import { setCredntials } from "@/features/auth/authSlice";
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
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/lib/firebase/auth";
import { useAppDispatch } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormLoginType {
  email: string;
  password: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [errMsg, setErrorMsg] = useState("");

  async function handelLoginUser(formdata: FormData) {
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;

    try {
      const user = await loginUser(email, password);
      const token = await user?.getIdToken();

      if (token) {
        dispatch(setCredntials(token));

        router.push("/");
      }
    } catch (error) {
      //Error code => auth/invalid-credential

      setErrorMsg(() => firebaseErrorMessages(error.code));
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handelLoginUser}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required name="password" />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
              <FieldDescription className="text-red-400">
                {errMsg ? <span>{errMsg}</span> : ""}
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
