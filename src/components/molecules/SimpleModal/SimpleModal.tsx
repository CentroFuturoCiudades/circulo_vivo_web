"use client";

import { X } from "lucide-react";
import { Button } from "@/components/atoms/Button";

export interface SimpleModalProps {
  title: string;
  wide?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/** Centered overlay dialog — click backdrop or the X to close. */
export function SimpleModal({ title, wide = false, onClose, children }: SimpleModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5 print:hidden"
      style={{ background: "rgba(33,33,33,.55)" }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative bg-white rounded-2xl p-6 w-full overflow-y-auto"
        style={{ maxWidth: wide ? 560 : 400, maxHeight: "80vh", boxShadow: "0 12px 40px rgba(0,0,0,.25)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="icon"
          color="neutral"
          iconLeft={X}
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-3 right-3.5 w-8 h-8 rounded-full"
        />
        <h3 className="font-sans font-bold text-[16px] text-[#1a1c1c] mb-2.5">{title}</h3>
        <div className="font-sans text-[13.5px] text-[#71717a] leading-relaxed flex flex-col gap-2.5 [&_ul]:pl-4 [&_ul]:list-disc">
          {children}
        </div>
      </div>
    </div>
  );
}
