import { cn } from "@/lib/utils";

export interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  helperText?: string;
  errorMessage?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  required,
  helperText,
  errorMessage,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="font-sans text-[12px] font-semibold tracking-[0.05em] text-neutral-700 select-none"
        >
          {label}
          {required && <span className="ml-1 text-crimson" aria-hidden>*</span>}
        </label>
      )}

      {children}

      {errorMessage ? (
        <p className="font-sans text-[11px] text-crimson leading-tight" role="alert">
          {errorMessage}
        </p>
      ) : helperText ? (
        <p className="font-sans text-[11px] text-neutral-500 leading-tight">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
