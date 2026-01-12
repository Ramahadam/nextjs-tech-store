"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { resetPasswordLink } from "@/lib/firebase/auth";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";

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
  //TODO create custom and hook useForgotPasswor or useResetPassword
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswodType>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const handleResetPassword = async (data: ResetPasswodType) => {
    setIsLoading(true);
    try {
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

  return { isLoading, register, handleResetPassword, errors, handleSubmit };
}
