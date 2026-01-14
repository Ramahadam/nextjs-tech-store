"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { resetPassword } from "@/lib/firebase/auth";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";
import { useSearchParams, useRouter } from "next/navigation";
import { firebaseErrorMessages } from "@/lib/utils";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ResetPasswodType = z.infer<typeof resetPasswordSchema>;

export function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const mode = searchParams.get("mode");
  const actionCode = searchParams.get("oobCode");
  const continueUrl = searchParams.get("continueUrl");

  // RHF - Form integrated with zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswodType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // Handler - password reset

  const handleResetPassword = async (data: ResetPasswodType) => {
    setIsLoading(true);
    try {
      const { password: newPassword } = data;

      await resetPassword(newPassword, actionCode);

      // Show success confirmation using toast
      toast.success(
        "Successfully reset the password, you will be redirect to login page",
        {
          position: "top-center",
          duration: 2000,
        }
      );

      setTimeout(() => {
        router.replace("/login?reset=success");
      }, 3000);
    } catch (error: FirebaseError | unknown) {
      if (error instanceof FirebaseError)
        if (error?.code || error.message) {
          const errMsg = firebaseErrorMessages(error.code);
          toast.error(errMsg, {
            position: "top-center",
            duration: 3000,
          });
        }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    register,
    handleResetPassword,
    errors,
    actionCode,
    handleSubmit,
  };
}
