"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Briefcase, Camera, Globe, Link2, Mail, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CarouselArrow } from "@/components/atoms/CarouselArrow";
import { Button } from "@/components/atoms/Button";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { DataUnavailableMessage, type DataUnavailableVariant } from "@/components/molecules/DataUnavailableMessage";
import { cn } from "@/lib/utils";

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Data ──────────────────────────────────────────────────

export interface Colaborador {
  name: string;
  role: string;
  imageUrl?: string;
  description?: string;
  email?: string;
  socials?: { platform: "linkedin" | "twitter" | "instagram" | "website"; url: string }[];
}

/** Rotated over collaborators (they carry no `tag`) purely for visual variety on the cards. */
const CARD_COLORS = ["#264042", "#203b6b", "#7f4d7b", "#395284"];

/** Copyright-free, procedurally generated placeholder headshot (DiceBear Open Peeps, free for commercial use). */
function placeholderPortraitUrl(name: string, bgColor?: string): string {
  const seed = encodeURIComponent(name.trim().toLowerCase());
  const bg = (bgColor ?? "f0f0f0").replace("#", "");
  return `https://api.dicebear.com/9.x/open-peeps/png?seed=${seed}&backgroundColor=${bg}&size=512`;
}

export interface InstitutionLogo {
  name: string;
  logoUrl?: string;
}

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  linkedin: Briefcase,
  twitter: X,
  instagram: Camera,
  website: Globe,
};

const CARD_WIDTH = 220;

const DEFAULT_COLABORADORES: Colaborador[] = [
  { name: "Andrea Solís",   role: "Enlace ITESO" },
  { name: "Miguel Herrera", role: "Coordinador CONEVAL" },
  { name: "Renata Gómez",   role: "Consultora FAO" },
  { name: "David Chávez",   role: "Investigador Asociado" },
  { name: "Paola Reyes",    role: "Enlace INEGI" },
  { name: "Tomás Nuño",     role: "Coordinador de Vinculación" },
  { name: "Ximena Castro",  role: "Analista de Políticas" },
  { name: "Iván Barragán",  role: "Enlace MIT Media Lab" },
];

/** Only the logo — no descriptions. Drop a real `logoUrl` (SVG/PNG) per entry once assets are available; falls back to a monochrome wordmark. */
const DEFAULT_INSTITUCIONES: InstitutionLogo[] = [
  { name: "ITESO" },
  { name: "CONEVAL" },
  { name: "FAO" },
  { name: "INEGI" },
  { name: "ONU" },
  { name: "MIT Media Lab" },
];

// ── Marquee primitive ─────────────────────────────────────

function Marquee({
  children,
  durationSec,
  reverse = false,
  /** How many times `children` is repeated per half. Bump this for short lists so the
   *  duplicated content is always wider than the viewport — otherwise the loop shows a
   *  gap of empty space on wide screens before it seamlessly wraps. */
  repeat = 2,
  className,
}: {
  children: React.ReactNode;
  durationSec: number;
  reverse?: boolean;
  repeat?: number;
  className?: string;
}) {
  const half = (
    <>
      {Array.from({ length: repeat }).map((_, i) => (
        <Fragment key={i}>{children}</Fragment>
      ))}
    </>
  );

  return (
    <div className={cn("group overflow-hidden", className)} style={{ maskImage: "linear-gradient(90deg, transparent 0, black 48px, black calc(100% - 48px), transparent 100%)" }}>
      <div
        className="flex w-max animate-marquee"
        style={{
          animationDuration: `${durationSec}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {half}
        {half}
      </div>
    </div>
  );
}

// ── Collaborator card — expands on hover, opens a detail modal on click ───

function ColaboradorCard({
  colaborador,
  color,
  hovered,
  priority = false,
  onHover,
  onLeave,
  onOpen,
}: {
  colaborador: Colaborador;
  color: string;
  hovered: boolean;
  /** Set on the first visible card only — it's the Largest Contentful Paint candidate, so it should load eagerly instead of lazily. */
  priority?: boolean;
  onHover: () => void;
  onLeave: () => void;
  onOpen: () => void;
}) {
  const isPlaceholder = !colaborador.imageUrl?.trim();
  const photoUrl = colaborador.imageUrl?.trim() || placeholderPortraitUrl(colaborador.name, color);

  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      onClick={onOpen}
      className="relative flex-shrink-0 overflow-hidden rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      style={{ width: CARD_WIDTH, height: 260, backgroundColor: color, marginRight: 12 }}
      aria-label={`Ver perfil de ${colaborador.name}`}
    >
      {isPlaceholder ? (
        <div className="absolute inset-x-0 bottom-0" style={{ height: "82%" }}>
          <Image
            src={photoUrl}
            alt={colaborador.name}
            fill
            sizes="300px"
            className="object-contain object-bottom"
            unoptimized
            priority={priority}
          />
        </div>
      ) : (
        <Image src={photoUrl} alt={colaborador.name} fill sizes="300px" className="object-cover" priority={priority} />
      )}

      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ height: "60%", background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.75) 100%)" }}
      />

      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1.5 p-4"
      >
        <p className="font-serif italic font-bold text-white" style={{ fontSize: 16, lineHeight: 1.3 }}>
          {colaborador.name}
        </p>
        {colaborador.role?.trim() && (
          <p className="font-sans font-normal text-white/85" style={{ fontSize: 11, lineHeight: 1.4 }}>
            {colaborador.role.trim()}
          </p>
        )}
      </motion.div>
    </button>
  );
}

function ColaboradorModal({ colaborador, color, onClose }: { colaborador: Colaborador; color: string; onClose: () => void }) {
  const photoUrl = colaborador.imageUrl?.trim() || placeholderPortraitUrl(colaborador.name, color);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: "rgba(15,20,20,0.6)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative flex flex-col w-full overflow-hidden bg-white rounded-2xl shadow-xl"
        style={{ maxWidth: 400, maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full flex-shrink-0" style={{ aspectRatio: "1 / 1", backgroundColor: color }}>
          <Image
            src={photoUrl}
            alt={colaborador.name}
            fill
            sizes="400px"
            className="object-contain"
            unoptimized={!colaborador.imageUrl?.trim()}
          />
          <Button
            variant="icon"
            color="neutral"
            iconLeft={X}
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white border border-black/10 text-[#1a1c1c] hover:bg-neutral-50"
          />
        </div>

        <div className="flex flex-col gap-4 p-6 md:p-8 overflow-y-auto" style={{ minHeight: 0 }}>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-serif italic font-bold text-[#203b6b]" style={{ fontSize: 26, lineHeight: 1.3 }}>
              {colaborador.name}
            </h3>
            {colaborador.role?.trim() && (
              <p className="font-sans font-normal text-[#747780]" style={{ fontSize: 13 }}>
                {colaborador.role.trim()}
              </p>
            )}
          </div>

          {colaborador.description?.trim() && (
            <>
              <div className="h-px bg-neutral-200" />
              <p className="font-sans font-normal text-[#44474f]" style={{ fontSize: 14, lineHeight: 1.7 }}>
                {colaborador.description.trim()}
              </p>
            </>
          )}

          {colaborador.socials && colaborador.socials.length > 0 && (
            <div className="flex items-center gap-2">
              {colaborador.socials.map((social, i) => {
                const SocialIcon = SOCIAL_ICONS[social.platform] ?? Link2;
                return (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-300 text-neutral-600 hover:border-secondary hover:text-secondary transition-colors"
                  >
                    <SocialIcon size={16} />
                  </a>
                );
              })}
            </div>
          )}

          {colaborador.email?.trim() && (
            <Button
              color="navy"
              radius="full"
              iconRight={Mail}
              onClick={() => {
                window.location.href = `mailto:${colaborador.email}`;
              }}
              className="w-full justify-center normal-case tracking-normal font-normal text-sm mt-1"
            >
              Contactar
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Institution logo ──────────────────────────────────────

function InstitutionLogoItem({ institution }: { institution: InstitutionLogo }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasLogo = Boolean(institution.logoUrl?.trim()) && !imageFailed;

  return (
    <div
      className="flex items-center justify-center flex-shrink-0 grayscale opacity-60 hover:opacity-100 transition-opacity"
      style={{ height: 40, marginRight: 64 }}
    >
      {hasLogo ? (
        <div className="relative" style={{ width: 120, height: 40 }}>
          <Image
            src={institution.logoUrl!.trim()}
            alt={institution.name}
            fill
            sizes="120px"
            className="object-contain"
            onError={() => setImageFailed(true)}
          />
        </div>
      ) : (
        <span
          className="font-serif italic font-bold text-[#1a1c1c] whitespace-nowrap"
          style={{ fontSize: 22, lineHeight: 1 }}
        >
          {institution.name}
        </span>
      )}
    </div>
  );
}

// ── Section ───────────────────────────────────────────────

export interface ColaboracionesSectionProps {
  colaboradores?: Colaborador[];
  instituciones?: InstitutionLogo[];
  /** When set, renders a DataUnavailableMessage in place of the colaboradores marquees instead of the `colaboradores` prop. */
  colaboradoresState?: DataUnavailableVariant;
  /** When set, renders a DataUnavailableMessage in place of the instituciones marquee instead of the `instituciones` prop. */
  institucionesState?: DataUnavailableVariant;
}

export function ColaboracionesSection({
  colaboradores = DEFAULT_COLABORADORES,
  instituciones = DEFAULT_INSTITUCIONES,
  colaboradoresState,
  institucionesState,
}: ColaboracionesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const validColaboradores = (colaboradores ?? []).filter((c) => c && c.name?.trim());
  const validInstituciones = (instituciones ?? []).filter((i) => i && i.name?.trim());
  const openColaborador = openIndex !== null ? validColaboradores[openIndex] : null;

  function scrollColaboradores(dir: "left" | "right") {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  }

  return (
    <section className="pt-20 pb-20 md:pt-28 md:pb-28">
      {/* Header */}
      <FadeUp
        delay={0}
        className="flex flex-wrap items-center justify-between gap-4 px-6 md:px-16 lg:px-24"
      >
        <div>
          <Eyebrow color="purple">COLABORACIONES</Eyebrow>
          <h2
            className="font-serif font-bold text-[#203b6b] text-[24px] md:text-[32px]"
            style={{ lineHeight: 1.25 }}
          >
            Red de Colaboración
          </h2>
        </div>
        {!colaboradoresState && validColaboradores.length > 0 && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <CarouselArrow direction="prev" onClick={() => scrollColaboradores("left")} />
            <CarouselArrow direction="next" onClick={() => scrollColaboradores("right")} />
          </div>
        )}
      </FadeUp>

      {/* Equipo de colaboradores — card carousel, click opens a detail modal */}
      {colaboradoresState ? (
        <FadeUp delay={0.1} className="mt-12 md:mt-16">
          <DataUnavailableMessage variant={colaboradoresState} title="Equipo de colaboradores no disponible" />
        </FadeUp>
      ) : (
        validColaboradores.length > 0 && (
          <div
            ref={scrollRef}
            className="flex mt-8 pb-2 overflow-x-auto px-6 md:px-16 lg:px-24"
            style={{ scrollbarWidth: "none", gap: 12, overflowY: "hidden" }}
          >
            {validColaboradores.map((c, i) => (
              <FadeUp key={c.name ?? i} delay={Math.min(i * 0.04, 0.4)} className="flex-shrink-0">
                <ColaboradorCard
                  colaborador={c}
                  color={CARD_COLORS[i % CARD_COLORS.length]}
                  hovered={hoveredIndex === i}
                  priority={i === 0}
                  onHover={() => setHoveredIndex(i)}
                  onLeave={() => setHoveredIndex((prev) => (prev === i ? null : prev))}
                  onOpen={() => setOpenIndex(i)}
                />
              </FadeUp>
            ))}
          </div>
        )
      )}

      {/* Modal */}
      <AnimatePresence>
        {openColaborador && openIndex !== null && (
          <ColaboradorModal
            colaborador={openColaborador}
            color={CARD_COLORS[openIndex % CARD_COLORS.length]}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>

      {/* Instituciones colaboradoras — minimal logo-only marquee */}
      {institucionesState ? (
        <FadeUp delay={0.2} className="mt-16 md:mt-24">
          <DataUnavailableMessage variant={institucionesState} title="Instituciones colaboradoras no disponibles" />
        </FadeUp>
      ) : (
        validInstituciones.length > 0 && (
          <FadeUp delay={0.2} className="mt-16 md:mt-24">
            <Marquee durationSec={95} repeat={6}>
              {validInstituciones.map((inst, i) => (
                <InstitutionLogoItem key={`${inst.name}-${i}`} institution={inst} />
              ))}
            </Marquee>
          </FadeUp>
        )
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// LEGACY DESIGN — kept for easy rollback, not rendered.
// To restore: replace the `ColaboracionesSection` export above with this one.
// ─────────────────────────────────────────────────────────────────────────

const LEGACY_PARTNERS = [
  {
    name: "ITESO",
    description: "Prototipado de soluciones locales y transferencia tecnológica con el DPTI.",
    tags: ["UDG", "SSJ"],
  },
  {
    name: "CONEVAL",
    description: "Asesoría técnica en medición de pobreza y análisis de indicadores sociales.",
    tags: ["INEGI"],
  },
  {
    name: "FAO",
    description: "Seguridad alimentaria urbana y sistemas resilientes ante crisis climáticas.",
    tags: ["ONU"],
  },
];

export function LegacyColaboracionesSection() {
  return (
    <section className="px-6 md:px-16 lg:px-24 pt-12 pb-12 md:pt-16 md:pb-16">
      {/* Header */}
      <FadeUp delay={0} className="flex flex-col gap-2">
        <Eyebrow color="purple">COLABORACIONES</Eyebrow>
        <h2
          className="font-serif font-bold text-[#203b6b] text-[24px] md:text-[32px]"
          style={{ lineHeight: 1.25 }}
        >
          Red de Colaboración
        </h2>
      </FadeUp>

      {/* Cards */}
      <div className="flex flex-col gap-6 mt-8 md:mt-10">
        {/* Top 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {LEGACY_PARTNERS.map((p, i) => (
            <FadeUp key={p.name} delay={0.1 + i * 0.1}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                transition={{ duration: 0.2 }}
                className="flex flex-col justify-between rounded-xl bg-white h-full"
                style={{
                  padding: "23px 24px 24px 24px",
                  boxShadow: "0 2px 7px rgba(0,0,0,0.08)",
                  border: "1px solid #c4c6d0",
                }}
              >
                <div className="flex flex-col" style={{ gap: 10.9 }}>
                  <h3
                    className="font-serif italic font-bold text-[#203b6b]"
                    style={{ fontSize: 24, lineHeight: 1.4 }}
                  >
                    {p.name}
                  </h3>
                  <p
                    className="font-sans font-normal text-[#44474f]"
                    style={{ fontSize: 14, lineHeight: 1.625 }}
                  >
                    {p.description}
                  </p>
                </div>

                <div
                  className="flex items-center gap-4 mt-4 pt-3"
                  style={{ borderTop: "1px solid #e5e7eb", opacity: 0.5 }}
                >
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-sans font-normal text-[#1a1b21]"
                      style={{ fontSize: 10, lineHeight: 1.5 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {/* MIT Media Lab card — full width, navy */}
        <FadeUp delay={0.4}>
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}
            transition={{ duration: 0.2 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between rounded-xl"
            style={{
              backgroundColor: "#395284",
              padding: 24,
              gap: 24,
              boxShadow: "0 2px 7px rgba(0,0,0,0.08)",
            }}
          >
            <div className="flex flex-col" style={{ gap: 10.9, maxWidth: 672 }}>
              <h3
                className="font-serif italic font-bold text-[#d8e2ff]"
                style={{ fontSize: 24, lineHeight: 1.4 }}
              >
                MIT Media Lab
              </h3>
              <p
                className="font-sans font-normal text-[#aec6ff]"
                style={{ fontSize: 16, lineHeight: 1.625 }}
              >
                Visualización de datos complejos para gobernanza participativa y gemelos digitales urbanos.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 flex-shrink-0 mt-2 md:mt-0">
              {["CITY SCIENCE", "RESILIENT CITIES"].map((tag) => (
                <span
                  key={tag}
                  className="font-sans font-normal text-[#aec6ff]"
                  style={{ fontSize: 10, lineHeight: 1.5 }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}
