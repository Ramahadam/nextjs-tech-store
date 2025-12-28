import { z } from "zod";

export const signupSchema = z
  .object({
    fullname: z.string().min(4),
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupInputs = z.infer<typeof signupSchema>;
