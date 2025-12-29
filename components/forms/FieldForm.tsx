"use client";
import { cn } from "@/lib/utils";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface FieldFormProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  errorMessage: string | undefined;
  onFocus?: () => void;
  className?: string;
  errorClassName?: string;
}

export function FieldForm<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  register,
  errorMessage, //In form of e.g error.email / error.password
  onFocus,
  className,
  errorClassName,
}: FieldFormProps<T>) {
  return (
    <Field className={cn("gap-4", className)}>
      <FieldLabel>{label}</FieldLabel>
      <Input
        id={String(name)}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? `${String(name)}-error` : undefined}
        className={cn(
          errorMessage &&
            "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/50 focus-visible:ring-[3px]",
          "placeholder:text-sm md:placeholder:text-md text-sm md:text-md"
        )}
        onFocus={onFocus}
        {...register(name)}
      />
      <p
        id={`${String(name)}-error`}
        className={cn(" relative h-6", errorClassName)}
      >
        {errorMessage && (
          <span className="absolute text-sm text-red-400 font-medium  -mt-2 top-0 z-50 flex items-center">
            <Info className="h-4" /> {errorMessage}
          </span>
        )}
      </p>
    </Field>
  );
}
