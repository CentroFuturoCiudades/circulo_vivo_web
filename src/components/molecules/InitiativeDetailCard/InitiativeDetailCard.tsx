import { X, ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Chip } from "@/components/atoms/Chip";
import { Button } from "@/components/atoms/Button";
import { CarouselArrow } from "@/components/atoms/CarouselArrow";

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
  /** Override VER FICHA click — if provided, profileUrl navigation is skipped */
  onProfileClick?: () => void;
  websiteUrl?: string;
  onClose?: () => void;
  /** Paginator — show when total > 1 */
  total?: number;
  current?: number;
  onPrev?: () => void;
  onNext?: () => void;
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
  onClose,
  total,
  current = 1,
  onPrev,
  onNext,
  className,
}: InitiativeDetailCardProps) {
  const showPaginator = total !== undefined && total > 1;

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-[#c4c7c7] bg-white overflow-hidden",
        className
      )}
      style={{ width: 320 }}
    >
      {/* ── Image ── */}
      <div className="relative h-40 bg-neutral-100 flex-shrink-0 overflow-hidden">
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0.6)" }}
          />
        )}

        {/* Close — 32×32 circle, white bg, black border 1px, X 8.17px */}
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
        className="flex flex-col gap-1 p-5"
        style={{ background: "linear-gradient(180deg, #ffffff 0%, #ded4b01a 100%)" }}
      >
        {/* Chips */}
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

        {/* Title */}
        <h3
          className="font-serif font-bold text-black leading-[1.5]"
          style={{ fontSize: "16px" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="font-sans font-normal text-[#a8a8a8] leading-[1.5]"
          style={{ fontSize: "16px", paddingTop: 4, paddingBottom: 12 }}
        >
          {description}
        </p>

        {/* ── Paginator ── */}
        {showPaginator && (
          <div className="flex items-center justify-between pb-3">
            <CarouselArrow direction="prev" onClick={onPrev} disabled={current <= 1} />
            <span className="font-sans text-[12px] text-neutral-500">
              {current} de {total}
            </span>
            <CarouselArrow direction="next" onClick={onNext} disabled={current >= total} />
          </div>
        )}

        {/* ── Actions — border-top, padding-top 16, gap 16 ── */}
        <div className="flex items-center gap-4 pt-4 border-t border-[#c4c7c7]">

          {/* VER FICHA — rounded-full, bg #ded4b0, padding [6,10], Poppins 16px normal black */}
          {(profileUrl || onProfileClick) && (
            <Button
              iconRight={ArrowRight}
              onClick={onProfileClick ?? (() => { if (profileUrl) window.location.href = profileUrl; })}
              className="rounded-full bg-[#ded4b0] hover:bg-[#cfc49e] text-black font-normal text-[16px] h-auto py-[6px] px-[10px] tracking-normal"
            >
              VER FICHA
            </Button>
          )}

          {/* SITIO WEB — no bg, Poppins 16px #444748, external icon 10.5px */}
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
      </div>
    </div>
  );
}
