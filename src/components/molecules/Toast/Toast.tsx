"use client";
import { Toaster as Sonner } from "sonner";
import { toast } from "sonner";

export { toast };

export function Toaster() {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:       "font-sans text-[13px] rounded-md border shadow-card-md",
          title:       "font-semibold text-neutral-900",
          description: "text-neutral-500 text-[12px]",
          success:     "border-green-200 bg-green-50 text-green-800",
          error:       "border-crimson-200 bg-crimson-50 text-crimson",
          warning:     "border-yellow-200 bg-yellow-50 text-yellow-800",
          info:        "border-secondary-200 bg-secondary-50 text-secondary-800",
          actionButton:"bg-crimson text-white rounded font-bold text-[11px] px-3 py-1.5",
          cancelButton:"bg-neutral-100 text-neutral-600 rounded font-bold text-[11px] px-3 py-1.5",
        },
      }}
      richColors
      closeButton
    />
  );
}
