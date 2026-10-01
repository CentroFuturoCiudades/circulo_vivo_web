"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, ImageOff, MapPin, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Chip } from "@/components/atoms/Chip";
import { Button } from "@/components/atoms/Button";

// ── Sub-components ─────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-1 border-b border-[#c4c7c7]">
      <span
        className="font-sans font-bold text-black leading-[1.5]"
        style={{ fontSize: "11px", letterSpacing: "1.1px" }}
      >
        {children}
      </span>
    </div>
  );
}

function BulletItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span
        className="font-sans font-medium text-[#b4b4b4] leading-[1.5] flex-shrink-0"
        style={{ fontSize: "16px" }}
      >
        ·
      </span>
      <span
        className="font-sans font-normal text-[#949494] leading-[1.714]"
        style={{ fontSize: "14px" }}
      >
        {text}
      </span>
    </div>
  );
}

// ── Types ──────────────────────────────────────────────────

export interface InitiativeDrawerChip {
  label: string;
  color?: "teal" | "crimson" | "gold" | "secondary" | "neutral" | "purple";
}

export interface InitiativeDrawerProps {
  open?: boolean;
  title: string;
  chips?: InitiativeDrawerChip[];
  imageUrl?: string;
  description?: string;
  whatTheyDo?: string[];
  websiteUrl?: string;
  location?: string;
  onClose?: () => void;
  /** When provided, prev/next arrow buttons are shown over the image. */
  onPrev?: () => void;
  onNext?: () => void;
  /** Extra classes for the inner clipped panel (border/radius/background live there). */
  innerClassName?: string;
  /** Target width for the open animation. Defaults to the fixed 319px desktop panel width — pass "100%" for a full-bleed mobile sheet. */
  width?: number | string;
  className?: string;
}

// ── Component ──────────────────────────────────────────────

export function InitiativeDrawer({
  open = true,
  title,
  chips = [],
  imageUrl,
  description,
  whatTheyDo = [],
  websiteUrl,
  location,
  className,
  innerClassName,
  onClose,
  onPrev,
  onNext,
  width = 319,
}: InitiativeDrawerProps) {
  if (!open) return null;

  // Outer element animates the width and stays unclipped so the prev/next
  // arrows can sit on the card's left/right edges; the inner panel clips.
  const arrowClass =
    "absolute top-[88px] lg:top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-[#c4c7c7] text-[#1a1c1c] shadow-md hover:border-[#1a1c1c] hover:scale-105 active:scale-95 transition-transform";

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ type: "spring", damping: 32, stiffness: 320 }}
      className={cn("relative flex", className)}
      style={{ minWidth: 0 }}
    >
    {onPrev && (
      <Button
        variant="icon"
        color="neutral"
        iconLeft={ChevronLeft}
        onClick={onPrev}
        aria-label="Iniciativa anterior"
        title="Anterior (←)"
        className={cn(arrowClass, "left-2 lg:-left-3.5")}
      />
    )}
    {onNext && (
      <Button
        variant="icon"
        color="neutral"
        iconLeft={ChevronRight}
        onClick={onNext}
        aria-label="Iniciativa siguiente"
        title="Siguiente (→)"
        className={cn(arrowClass, "right-2 lg:-right-3.5")}
      />
    )}
    <div
      className={cn("flex flex-col overflow-hidden rounded-xl border border-[#c4c7c7] w-full h-full", innerClassName)}
      style={{ backgroundColor: "#fcfbf7" }}
    >
      {/* ── Image ── the whole picture is shown (contain) over a blurred copy of itself, so nothing is cropped and there are no empty bars */}
      <div
        className="relative flex-shrink-0 overflow-hidden bg-neutral-200"
        style={{ height: 176 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {imageUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl opacity-60"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={title}
                  className="relative w-full h-full object-contain"
                />
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-1.5">
                <ImageOff style={{ width: 24, height: 24, color: "#b4b2af", strokeWidth: 1.5 }} />
                <span className="font-sans text-[10px] text-[#b4b2af] uppercase tracking-[0.1em]">Sin imagen</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Close button */}
        {onClose && (
          <Button
            variant="icon"
            color="neutral"
            iconLeft={X}
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white border border-black text-[#1a1c1c] hover:bg-neutral-50"
          />
        )}
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex flex-col overflow-y-auto flex-1 px-6 pt-6">
      <AnimatePresence mode="wait">
      <motion.div
        key={title}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col gap-6 pb-6"
      >

        {/* Header: chips + title */}
        <div className="flex flex-col gap-1">
          {chips.length > 0 && (
            <div className="flex flex-wrap gap-[5px]">
              {chips.map((chip, i) => (
                <Chip
                  key={i}
                  color={chip.color ?? "neutral"}
                  selected
                  className="pointer-events-none text-[9.43px] h-[22px] px-[6.86px]"
                >
                  {chip.label}
                </Chip>
              ))}
            </div>
          )}
          <h2
            className="font-serif font-bold text-black"
            style={{ fontSize: "24px", lineHeight: "1.25" }}
          >
            {title}
          </h2>
          {location && (
            <div className="flex items-center gap-1.5" style={{ paddingTop: 4 }}>
              <MapPin style={{ width: 13, height: 13, color: "#b4b2af", flexShrink: 0, strokeWidth: 2 }} />
              <span
                className="font-sans text-[#b4b2af]"
                style={{ fontSize: "12px", letterSpacing: "0.02em" }}
              >
                {location}
              </span>
            </div>
          )}
        </div>

        {/* Visitar sitio web — before the description; kept small and quiet */}
        {websiteUrl && (
          <Button
            variant="outline"
            color="teal"
            radius="full"
            size="sm"
            iconRight={ExternalLink}
            onClick={() => { window.open(websiteUrl, "_blank", "noopener,noreferrer"); }}
            className="w-fit -mt-2 h-7 px-3 gap-1.5 text-[12px] font-normal normal-case tracking-normal"
          >
            Visitar sitio web
          </Button>
        )}

        {/* Descripción general */}
        {description && (
          <div className="flex flex-col gap-2">
            <SectionHeading>Descripción General</SectionHeading>
            <p
              className="font-sans font-normal text-[#949494]"
              style={{ fontSize: "14px", lineHeight: "1.857" }}
            >
              {description}
            </p>
          </div>
        )}

        {/* Qué hacen */}
        {whatTheyDo.length > 0 && (
          <div className="flex flex-col gap-2">
            <SectionHeading>Qué Hacen</SectionHeading>
            <div className="flex flex-col gap-2">
              {whatTheyDo.map((item, i) => (
                <BulletItem key={i} text={item} />
              ))}
            </div>
          </div>
        )}

      </motion.div>
      </AnimatePresence>
      </div>
    </div>
    </motion.div>
  );
}
