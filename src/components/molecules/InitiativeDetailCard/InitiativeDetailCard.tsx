"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight, ExternalLink, ChevronLeft, ChevronRight, MapPin, ImageOff } from "lucide-react";
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
  total?: number;
  current?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

function getPageRange(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const left = new Set([1, 2, 3]);
  const right = new Set([total - 1, total]);
  const mid = new Set(
    [current - 1, current, current + 1].filter((p) => p >= 1 && p <= total)
  );

  const all = [...new Set([...left, ...mid, ...right])].sort((a, b) => a - b);

  const result: (number | "...")[] = [];
  for (let i = 0; i < all.length; i++) {
    if (i > 0 && all[i] - all[i - 1] > 1) result.push("...");
    result.push(all[i]);
  }
  return result;
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
};

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
  total,
  current = 1,
  onPageChange,
  className,
}: InitiativeDetailCardProps) {
  const showPaginator = total !== undefined && total > 1;
  const [direction, setDirection] = useState(1);
  const prevCurrentRef = useRef(current);

  useEffect(() => {
    if (current !== prevCurrentRef.current) {
      setDirection(current > prevCurrentRef.current ? 1 : -1);
      prevCurrentRef.current = current;
    }
  }, [current]);

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
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="flex flex-col gap-3"
            >
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
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Actions — always visible at bottom ── */}
        <div className="flex items-center gap-4 px-5 py-4 border-t border-[#c4c7c7] shrink-0">
          {(profileUrl || onProfileClick) && (
            <Button
              iconRight={ArrowRight}
              onClick={onProfileClick ?? (() => { if (profileUrl) window.location.href = profileUrl; })}
              className="rounded-full bg-[#ded4b0] hover:bg-[#cfc49e] text-black font-normal text-[16px] h-auto py-[6px] px-[10px] tracking-normal"
            >
              VER FICHA
            </Button>
          )}
          {websiteUrl && (
            <Button
              variant="link"
              iconRight={ExternalLink}
              onClick={() => { window.open(websiteUrl, "_blank", "noopener,noreferrer"); }}
              className="text-[#444748] font-normal text-[16px] tracking-normal hover:opacity-70"
            >
              SITIO WEB
            </Button>
          )}
        </div>

        {/* ── Paginator — always visible at bottom ── */}
        {showPaginator && (
          <div
            className="flex items-center justify-center px-5 pb-4 shrink-0"
            style={{ gap: "3.35px" }}
          >
            {/* Prev */}
            <button
              onClick={() => onPageChange?.(current - 1)}
              disabled={current <= 1}
              className="flex items-center justify-center disabled:opacity-30"
              style={{
                borderRadius: "6.7px",
                border: "0.84px solid #e4e4e7",
                padding: "6.7px 10.06px",
              }}
            >
              <ChevronLeft
                style={{ width: 16, height: 16, strokeWidth: 1.6, color: "#1e1e1e" }}
              />
            </button>

            {/* Page numbers */}
            <div className="flex items-center" style={{ gap: 8 }}>
              {getPageRange(current, total!).map((page, i) =>
                page === "..." ? (
                  <span
                    key={`gap-${i}`}
                    className="flex items-center justify-center font-bold text-black"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 16,
                      lineHeight: 1,
                      borderRadius: 8,
                      padding: "8px 16px",
                    }}
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => onPageChange?.(page as number)}
                    className={cn(
                      "flex items-center justify-center",
                      page === current
                        ? "bg-[#2c2c2c] text-[#f5f5f5]"
                        : "text-[#1e1e1e] hover:bg-neutral-100"
                    )}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 16,
                      fontWeight: "normal",
                      lineHeight: 1,
                      borderRadius: 8,
                      border: "1px solid transparent",
                      padding: "8px 12px",
                    }}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            {/* Next */}
            <button
              onClick={() => onPageChange?.(current + 1)}
              disabled={current >= total!}
              className="flex items-center justify-center disabled:opacity-30"
              style={{
                borderRadius: "6.7px",
                border: "0.84px solid #e4e4e7",
                padding: "6.7px 10.06px",
                gap: "6.7px",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 16,
                  fontWeight: "normal",
                  lineHeight: 1,
                  color: "#71717a",
                }}
              >
                Sig
              </span>
              <ChevronRight
                style={{ width: 16, height: 16, strokeWidth: 1.6, color: "#1e1e1e" }}
              />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
