import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const MAX_RATINGS = 5;
export const MINIMUM_PASSWORD = 8;
export const MINIMUM_CHAR = 4;

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
    "auth/invalid-credential": "Invalid username or password.",
    "auth/weak-password": "Password should be at least 8 characters.",
    "auth/email-already-in-use": "Email is already registered.",
    "auth/invalid-email": "Email is not valid.",
    "auth/user-not-found": "No user found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-action-code":
      "Invalid action code. Please request a new password reset.",
    "auth/expired-action-code":
      "This password reset link has expired. Please request a new one.",
    "auth/user-disabled":
      "This account has been disabled. Please contact support.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed":
      "Network error. Please check your connection and try again.",
    "auth/operation-not-allowed":
      "This operation is not allowed. Please contact support.",
    "auth/requires-recent-login": "Please log in again to perform this action.",
    "auth/invalid-verification-code":
      "Invalid verification code. Please try again.",
    "auth/invalid-verification-id":
      "Invalid verification ID. Please retry the operation.",
  };

  return errorMsg[code] ?? "Authenitcation failed. Please try again.";
};
