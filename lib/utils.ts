import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const MAX_RATINGS = 5;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format numbers  e.g 100000 => 100,000.00
export function formatNumbers(num: number) {
  const val = num?.toLocaleString(
    undefined // leave undefined to use the visitor's browser
    // locale or a string like 'en-US' to override it.
  );

  return val;
}

export const firebaseErrorMessages = (code: string) => {
  const errorMsg: { [key: string]: string } = {
    "auth/invalid-credential": "Invalid username or password",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/email-already-in-use": "Email is already registered.",
    "auth/invalid-email": "Email is not valid.",
    "auth/user-not-found": "No user found with this email.",
    "auth/wrong-password": "Incorrect password.",
  };

  return errorMsg[code] ?? "Authenitcation failed. Please try again.";
};
