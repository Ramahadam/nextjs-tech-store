"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FieldForm } from "@/components/forms/FieldForm";
import { AuthSideImage } from "./AuthSideImage";
import { Spinner } from "@/components/ui/spinner";
import { Field } from "@/components/ui/field";

import { ResetPasswodType, useResetPassword } from "./hooks/useResetPassword";

export function ResetPasswordForm() {
  const { isLoading, register, handleResetPassword, errors, handleSubmit } =
    useResetPassword();
  return (
    <div className="flex flex-col">
      <Card className="overflow-hidden md:p-0 pt-6">
        <CardContent className="grid p-0 md:grid-cols-2 md:min-h-180">
          <div className="flex items-center justify-center ">
            <form
              onSubmit={handleSubmit(handleResetPassword)}
              className=" md:w-[80%]"
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="md:text-2xl font-bold">Reset Password</h1>
                <p className="text-muted-foreground text-sm text-balance mt-2 p-1 md:p-0">
                  Enter your new password to reset your password.
                </p>
              </div>
              <div className="p-8 md:max-w-full flex flex-col">
                <FieldForm<ResetPasswodType>
                  name="password"
                  label="New Password"
                  type="password"
                  register={register}
                  errorMessage={errors.password?.message}
                  placeholder="password"
                />
                <FieldForm<ResetPasswodType>
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  register={register}
                  errorMessage={errors.confirmPassword?.message}
                  placeholder="password"
                />

                <Field className="mt-4">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Spinner /> : "ResetPassword"}
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
