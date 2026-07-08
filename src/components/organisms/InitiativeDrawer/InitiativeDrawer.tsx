"use client";
import { motion } from "framer-motion";
import { ExternalLink, ImageOff, MapPin, X } from "lucide-react";
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
  onClose,
  width = 319,
}: InitiativeDrawerProps) {
  if (!open) return null;

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ type: "spring", damping: 32, stiffness: 320 }}
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-[#c4c7c7]",
        className
      )}
      style={{ minWidth: 0, backgroundColor: "#fcfbf7" }}
    >
      {/* ── Image ── */}
      <div
        className="relative flex-shrink-0 overflow-hidden bg-neutral-200"
        style={{ height: 160 }}
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0)" }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1.5">
            <ImageOff style={{ width: 24, height: 24, color: "#b4b2af", strokeWidth: 1.5 }} />
            <span className="font-sans text-[10px] text-[#b4b2af] uppercase tracking-[0.1em]">Sin imagen</span>
          </div>
        )}
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 50%, #fcfbf7 100%)" }}
        />

        {/* Close button — same style as InitiativeDetailCard */}
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
      <div className="flex flex-col gap-6 overflow-y-auto flex-1 px-6 pt-6">

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

        {/* Actions */}
        <div className="pb-6">
          {websiteUrl && (
            <Button
              color="teal"
              radius="full"
              size="lg"
              iconRight={ExternalLink}
              onClick={() => { window.open(websiteUrl, "_blank", "noopener,noreferrer"); }}
              className="w-full justify-center font-medium tracking-normal"
            >
              Visitar sitio web
            </Button>
          )}
        </div>

      </div>
    </motion.div>
  );
}
