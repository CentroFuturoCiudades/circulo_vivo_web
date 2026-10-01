"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { TooltipRenderProps } from "react-joyride";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";

/**
 * Fully custom tooltip for GuidedTour (passed as react-joyride's
 * `tooltipComponent`) — built with the project's own Button atom instead of
 * the library's default skin, so it matches the rest of the design system.
 */
export function TourTooltip({
  step,
  index,
  size,
  isLastStep,
  backProps,
  closeProps,
  primaryProps,
  skipProps,
  tooltipProps,
}: TooltipRenderProps) {
  return (
    <motion.div
      {...tooltipProps}
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative w-[calc(100vw-32px)] max-w-[340px] rounded-2xl border border-[#c4c7c7] bg-white p-5 shadow-xl"
    >
      <button
        {...closeProps}
        aria-label="Cerrar tutorial"
        className="absolute top-3 right-3 flex items-center justify-center w-7 h-7 rounded-full text-[#9a9a9a] hover:bg-neutral-100 hover:text-[#1a1c1c] transition-colors"
      >
        <X size={15} />
      </button>

      <p
        className="font-sans font-semibold uppercase text-[#708b8d]"
        style={{ fontSize: 11, letterSpacing: "0.1em" }}
      >
        Paso {index + 1} de {size}
      </p>

      {step.title && (
        <h3 className="font-serif font-bold text-[#1a1c1c] mt-1.5" style={{ fontSize: 19, lineHeight: 1.3 }}>
          {step.title}
        </h3>
      )}

      <div className="font-sans text-[#5e5e5e] mt-2" style={{ fontSize: 14, lineHeight: 1.6 }}>
        {step.content}
      </div>

      <div className="flex items-center justify-between gap-3 mt-5">
        <button
          {...skipProps}
          className={cn(
            "font-sans text-[#9a9a9a] hover:text-[#1a1c1c] transition-colors underline-offset-2 hover:underline",
          )}
          style={{ fontSize: 13 }}
        >
          Saltar tutorial
        </button>

        <div className="flex items-center gap-2 shrink-0">
          {index > 0 && (
            <Button
              {...backProps}
              variant="outline"
              color="neutral"
              radius="full"
              size="sm"
              className="normal-case tracking-normal font-normal"
            >
              Atrás
            </Button>
          )}
          <Button
            {...primaryProps}
            variant="primary"
            color="navy"
            radius="full"
            size="sm"
            className="normal-case tracking-normal font-normal"
          >
            {isLastStep ? "Entendido" : "Siguiente"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
