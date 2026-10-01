"use client";
import { motion } from "framer-motion";
import { X, ArrowRight, ExternalLink, MapPin, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Chip } from "@/components/atoms/Chip";
import { Button } from "@/components/atoms/Button";

export interface InitiativeDetailChip {
  label: string;
  color?: "teal" | "crimson" | "gold" | "secondary" | "neutral" | "purple";
}

export interface InitiativeDetailCardProps {
  title: string;
  description: string;
  chips?: InitiativeDetailChip[];
  imageUrl?: string;
  profileUrl?: string;
  onProfileClick?: () => void;
  websiteUrl?: string;
  /** Pre-formatted location string, e.g. "Amealco, Querétaro" */
  location?: string;
  onClose?: () => void;
  className?: string;
}

export function InitiativeDetailCard({
  title,
  description,
  chips = [],
  imageUrl,
  profileUrl,
  onProfileClick,
  websiteUrl,
  location,
  onClose,
  className,
}: InitiativeDetailCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ type: "spring", damping: 28, stiffness: 320 }}
      className={cn(
        "flex flex-col rounded-xl border border-[#c4c7c7] bg-white overflow-hidden",
        "max-h-[calc(100%-3rem)] w-[320px]",
        className
      )}
    >
      {/* ── Image ── */}
      <div className="relative h-40 bg-neutral-100 shrink-0 overflow-hidden">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0.6)" }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1.5">
            <ImageOff style={{ width: 22, height: 22, color: "#c4c7c7", strokeWidth: 1.5 }} />
            <span className="font-sans text-[10px] text-[#c4c7c7] uppercase tracking-[0.1em]">Sin imagen</span>
          </div>
        )}
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

      {/* ── Content ── */}
      <div
        className="flex flex-col flex-1 min-h-0 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #ffffff 0%, #ded4b01a 100%)" }}
      >
        {/* Scrollable area — chips + title + description */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 pt-5 pb-2">
          <div className="flex flex-col gap-3">
            <>
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
              <div className="flex flex-col gap-1">
                {location && (
                  <div className="flex items-center gap-[5px]">
                    <MapPin style={{ width: 11, height: 11, color: "#b4b2af", flexShrink: 0, strokeWidth: 2 }} />
                    <span
                      className="font-sans text-[#b4b2af] leading-none truncate"
                      style={{ fontSize: "11px", letterSpacing: "0.03em" }}
                    >
                      {location}
                    </span>
                  </div>
                )}
                <h3
                  className="font-serif font-bold text-black leading-[1.3]"
                  style={{ fontSize: "16px" }}
                >
                  {title}
                </h3>
              </div>
              <p
                className="font-sans font-normal text-[#a8a8a8] leading-[1.5]"
                style={{ fontSize: "14px", paddingBottom: 4 }}
              >
                {description}
              </p>
            </>
          </div>
        </div>

        {/* ── Actions — always visible at bottom ── */}
        <div className="flex items-center gap-4 px-5 py-4 border-t border-[#c4c7c7] shrink-0">
          {(profileUrl || onProfileClick) && (
            <Button
              iconRight={ArrowRight}
              onClick={onProfileClick ?? (() => { if (profileUrl) window.location.href = profileUrl; })}
              className="rounded-full bg-[#ded4b0] hover:bg-[#cfc49e] text-black font-normal text-[16px] h-auto py-[6px] px-[10px] normal-case tracking-normal"
            >
              Ver ficha
            </Button>
          )}
          {websiteUrl && (
            <Button
              variant="link"
              iconRight={ExternalLink}
              onClick={() => { window.open(websiteUrl, "_blank", "noopener,noreferrer"); }}
              className="text-[#444748] font-normal text-[16px] normal-case tracking-normal hover:opacity-70"
            >
              Sitio web
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
