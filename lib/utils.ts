import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const MAX_RATINGS = 5;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format numbers  e.g 100000 => 100,000.00
export function FormatNumbers(num: number) {
  const val = num?.toLocaleString(
    undefined // leave undefined to use the visitor's browser
    // locale or a string like 'en-US' to override it.
  );

  return val;
}
