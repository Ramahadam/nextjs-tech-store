"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FieldForm } from "@/components/forms/FieldForm";
import { AuthSideImage } from "./AuthSideImage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { Field } from "@/components/ui/field";

import { z } from "zod";
import { resetPasswordLink } from "@/lib/firebase/auth";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";

const forgotPasswordSchema = z.object({
  email: z.email(),
});

type ForgotPasswodType = z.infer<typeof forgotPasswordSchema>;

export function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswodType>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const handleForgotPassword = async (data: ForgotPasswodType) => {
    setIsLoading(true);
    try {
      const { email } = data;
      const res = await resetPasswordLink(email);

      toast.success(res.message, {
        position: "top-center",
        duration: 3000,
      });
    } catch (error: FirebaseError | unknown) {
      if (error instanceof FirebaseError)
        if (error?.code || error.message)
          toast.error("Oops Something went worng !", {
            position: "top-center",
            duration: 2000,
          });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <Card className="overflow-hidden md:p-0 pt-6">
        <CardContent className="grid p-0 md:grid-cols-2 md:min-h-180">
          <div className="flex items-center justify-center ">
            <form
              onSubmit={handleSubmit(handleForgotPassword)}
              className="md:w-[80%]"
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="md:text-2xl   font-bold">Forgot Password</h1>
                <p className="text-muted-foreground text-sm text-balance mt-2">
                  Enter your email address to receive a password reset link.
                </p>
              </div>
              <div className="p-8 md:max-w-full flex flex-col">
                <FieldForm<ForgotPasswodType>
                  name="email"
                  label="Email"
                  register={register}
                  errorMessage={errors.email?.message}
                  placeholder="m@example.com"
                />

                <Field className="mt-4">
                  <Button type="submit">
                    {isLoading ? <Spinner /> : "Send Reset Link"}
                  </Button>
                </Field>
              </div>
            </form>
          </div>
          <AuthSideImage />
        </CardContent>
      </Card>
    </div>
  );
}
