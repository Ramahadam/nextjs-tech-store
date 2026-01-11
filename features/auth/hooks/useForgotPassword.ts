"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { resetPasswordLink } from "@/lib/firebase/auth";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";

const forgotPasswordSchema = z.object({
  email: z.email(),
});

export type ForgotPasswodType = z.infer<typeof forgotPasswordSchema>;

export function useForgotPassword() {
  //TODO create custom and hook useForgotPasswor or useResetPassword
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

  return { isLoading, register, handleForgotPassword, errors, handleSubmit };
}
