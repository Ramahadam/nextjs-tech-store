"use client";
import { cn, MINIMUM_CHAR, MINIMUM_PASSWORD } from "@/lib/utils";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import type { FieldError, UseFormRegister, FieldValues } from "react-hook-form";

interface FieldFormProps<TFormValues extends FieldValues> {
  name: keyof TFormValues;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<TFormValues>;
  error: FieldError | undefined;
  onFocus?: () => void;
  className?: string;
  errorClassName?: string;
}

export function FieldForm<TFormValues extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  register,
  error, //In form of e.g error.email / error.password
  onFocus,
  className,
  errorClassName,
}: FieldFormProps<TFormValues>) {
  return (
    <Field className={cn("gap-4", className)}>
      <FieldLabel>{label}</FieldLabel>
      <Input
        id={String(name)}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${String(name)}-error` : undefined}
        className={cn(
          error?.message &&
            "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/50 focus-visible:ring-[3px]",
          "placeholder:text-sm md:placeholder:text-md text-sm md:text-md"
        )}
        onFocus={onFocus}
        {...register(name as never, {
          required: `Required field`,
          minLength: {
            value: type === "password" ? MINIMUM_PASSWORD : 4,
            message:
              type === "password"
                ? `Minimum ${MINIMUM_PASSWORD} characters`
                : `Minimum ${MINIMUM_CHAR} characters`,
          },
        })}
      />
      <p
        id={`${String(name)}-error`}
        className={cn(" relative h-6", errorClassName)}
      >
        {error?.message && (
          <span className="absolute text-sm text-red-400 font-medium  -mt-2 top-0 z-50 flex items-center">
            <Info className="h-4" /> {error.message}
          </span>
        )}
      </p>
    </Field>
  );
}
