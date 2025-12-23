"use client";
import { cn } from "@/lib/utils";

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
            "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/50 focus-visible:ring-[3px]"
        )}
        onFocus={onFocus}
        {...register(name as never, { required: `${label} is required!` })}
      />
      <p id={`${String(name)}-error`} className=" relative h-6">
        {error?.message && (
          <span className="absolute text-xs text-red-400 font-medium  -mt-2 top-0 z-50 flex ">
            <Info className="h-4" /> {error.message}
          </span>
        )}
      </p>
    </Field>
  );
}
