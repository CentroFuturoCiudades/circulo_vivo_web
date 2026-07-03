"use client";

import Image from "next/image";
import { Fragment, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Eyebrow } from "@/components/atoms/Eyebrow";
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
}

/** Copyright-free, procedurally generated placeholder headshot (DiceBear Open Peeps, free for commercial use). */
function placeholderPortraitUrl(name: string): string {
  const seed = encodeURIComponent(name.trim().toLowerCase());
  return `https://api.dicebear.com/9.x/open-peeps/png?seed=${seed}&backgroundColor=f0f0f0&size=256`;
}

export interface InstitutionLogo {
  name: string;
  logoUrl?: string;
}

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

// ── Collaborator pill ─────────────────────────────────────

function ColaboradorPill({ colaborador }: { colaborador: Colaborador }) {
  const photoUrl = colaborador.imageUrl?.trim() || placeholderPortraitUrl(colaborador.name);

  return (
    <div
      className="flex items-center flex-shrink-0 rounded-full bg-neutral-100 border border-white"
      style={{ padding: 8, paddingRight: 34, gap: 16, marginRight: 20 }}
    >
      <div className="relative flex-shrink-0 rounded-full overflow-hidden" style={{ width: 72, height: 72 }}>
        <Image
          src={photoUrl}
          alt=""
          fill
          sizes="72px"
          className="object-cover grayscale"
          unoptimized={!colaborador.imageUrl?.trim()}
        />
      </div>
      <div className="flex flex-col whitespace-nowrap">
        <span className="font-sans font-semibold text-[#1a1c1c]" style={{ fontSize: 17, lineHeight: 1.3 }}>
          {colaborador.name}
        </span>
        <span className="font-sans font-normal text-[#6b7280]" style={{ fontSize: 13, lineHeight: 1.4 }}>
          {colaborador.role}
        </span>
      </div>
    </div>
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
}

export function ColaboracionesSection({
  colaboradores = DEFAULT_COLABORADORES,
  instituciones = DEFAULT_INSTITUCIONES,
}: ColaboracionesSectionProps) {
  const validColaboradores = (colaboradores ?? []).filter((c) => c && c.name?.trim());
  const validInstituciones = (instituciones ?? []).filter((i) => i && i.name?.trim());

  return (
    <section className="pt-20 pb-20 md:pt-28 md:pb-28">
      {/* Header */}
      <FadeUp delay={0} className="flex flex-col gap-2 px-6 md:px-16 lg:px-24">
        <Eyebrow color="purple">COLABORACIONES</Eyebrow>
        <h2
          className="font-serif font-bold text-[#203b6b] text-[24px] md:text-[32px]"
          style={{ lineHeight: 1.25 }}
        >
          Red de Colaboración
        </h2>
      </FadeUp>

      {/* Equipo de colaboradores — auto-scrolling marquee, pauses on hover, no click */}
      {validColaboradores.length > 0 && (
        <FadeUp delay={0.1} className="flex flex-col gap-6 mt-12 md:mt-16">
          <Marquee durationSec={62}>
            {validColaboradores.map((c, i) => (
              <ColaboradorPill key={`${c.name}-a-${i}`} colaborador={c} />
            ))}
          </Marquee>
          <Marquee durationSec={56} reverse>
            {[...validColaboradores].reverse().map((c, i) => (
              <ColaboradorPill key={`${c.name}-b-${i}`} colaborador={c} />
            ))}
          </Marquee>
        </FadeUp>
      )}

      {/* Instituciones colaboradoras — minimal logo-only marquee */}
      {validInstituciones.length > 0 && (
        <FadeUp delay={0.2} className="mt-16 md:mt-24">
          <Marquee durationSec={95} repeat={6}>
            {validInstituciones.map((inst, i) => (
              <InstitutionLogoItem key={`${inst.name}-${i}`} institution={inst} />
            ))}
          </Marquee>
        </FadeUp>
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
