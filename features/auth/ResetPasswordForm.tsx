"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FieldForm } from "@/components/forms/FieldForm";
import { AuthSideImage } from "./AuthSideImage";
import { Spinner } from "@/components/ui/spinner";
import { Field } from "@/components/ui/field";

import { ResetPasswodType, useResetPassword } from "./hooks/useResetPassword";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCustom } from "@/components/SkeletonCustom";

export function ResetPasswordForm() {
  const router = useRouter();
  const {
    isLoading,
    register,
    handleResetPassword,
    errors,
    handleSubmit,
    actionCode,
  } = useResetPassword();

  useEffect(() => {
    if (!actionCode) {
      toast.info("Redirecting to forgot password page", {
        position: "top-center",
        duration: 2000,
      });

      setTimeout(() => {
        router.replace("/forgot-password");
      }, 3000);
    }
  }, [actionCode, router]);

  if (!actionCode)
    return (
      <div className=" flex items-center justify-center">
        <Skeleton className="w-full  min-h-18 md:min-h-180 bg-white" />
        <Skeleton className="w-full  min-h-18 md:min-h-180 bg-green-50 " />
      </div>
    );
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
