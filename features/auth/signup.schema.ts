import { z } from "zod";

export const signupSchema = z
  .object({
    fullname: z.string().min(4, "Full name must be at least 4 characters"),
    email: z.email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupInputs = z.infer<typeof signupSchema>;
