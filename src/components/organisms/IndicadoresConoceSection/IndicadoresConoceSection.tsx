"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import heroImage from "@/assets/bg-images/hero.jpg";
import siembraImage from "@/assets/bg-images/join-transformation.jpg";
import transporteImage from "@/assets/bg-images/colaborate.jpg";
import accesoImage from "@/assets/bg-images/navigate-eco.jpg";
import saludImage from "@/assets/bg-images/hero copy.jpg";
import { Button } from "@/components/atoms/Button";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { ImageCaptionTile } from "@/components/molecules/ImageCaptionTile";
import { DomainStepper, type DomainStepperItem } from "@/components/molecules/DomainStepper";
import { TopGanadoresChart } from "@/components/molecules/TopGanadoresChart";
import { ActionStepsBanner } from "@/components/organisms/ActionStepsBanner";
import { DOMAIN_KEYS, DOMAIN_LABELS } from "@/lib/azure/indicadores";
import { DOMAIN_INFO } from "@/components/organisms/IndicadoresDashboard/content";

const CHAIN_TILES = [
  { image: siembraImage, caption: "Quién la siembra o cría" },
  { image: transporteImage, caption: "Cómo se transporta y vende" },
  { image: accesoImage, caption: "Qué tan fácil la consigues" },
  { image: saludImage, caption: "Cómo impacta tu salud y al ambiente" },
];

const DOMAIN_STEPS: DomainStepperItem[] = DOMAIN_KEYS.map((key) => ({
  key,
  title: DOMAIN_LABELS[key],
  description: DOMAIN_INFO[key],
}));

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
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export interface IndicadoresConoceSectionProps {
  onExplorar?: () => void;
  className?: string;
}

/** "Conoce" tab of /indicadores — explains what food systems are and how the dashboard measures them. */
export function IndicadoresConoceSection({ onExplorar, className }: IndicadoresConoceSectionProps) {
  return (
    <div className={className}>
      {/* ── Intro ── */}
      <FadeUp>
        <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-6 lg:py-10 max-w-5xl mx-auto">
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <Eyebrow color="gold" className="justify-center lg:justify-start">
              Sistemas alimentarios
            </Eyebrow>
            <h2
              className="font-serif font-bold text-[#1a1c1c] leading-[1.25]"
              style={{ fontSize: "clamp(26px, 3vw, 34px)" }}
            >
              Todo lo que interviene para que la comida llegue a tu mesa
            </h2>
            <p className="font-sans text-[#5f5e5e] text-[15px] leading-relaxed max-w-md mx-auto lg:mx-0">
              Desde quién la siembra hasta cómo llega a tu plato — un vistazo a las piezas
              que forman el sistema alimentario mexicano.
            </p>
          </div>
          <div className="relative w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-full overflow-hidden shrink-0 shadow-card-lg ring-4 ring-white">
            <Image src={heroImage} alt="" fill sizes="260px" className="object-cover" />
          </div>
        </section>
      </FadeUp>

      {/* ── Es toda la cadena ── */}
      <FadeUp delay={0.05}>
        <section className="py-12 md:py-16">
          <SectionHeader
            title="Es toda la cadena, de la tierra a tu plato"
            align="center"
            className="mb-10"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {CHAIN_TILES.map((tile) => (
              <ImageCaptionTile
                key={tile.caption}
                image={tile.image}
                caption={tile.caption}
                className="rounded-xl shadow-card-md transition-transform duration-300 hover:-translate-y-1"
              />
            ))}
          </div>
        </section>
      </FadeUp>

      {/* ── Domain stepper ── */}
      <FadeUp delay={0.1}>
        <section className="py-4 md:py-8">
          <p className="text-center font-sans text-[13px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-5">
            Los 5 dominios que medimos
          </p>
          <DomainStepper items={DOMAIN_STEPS} />
        </section>
      </FadeUp>

      {/* ── De los datos... ── */}
      <FadeUp delay={0.1}>
        <section className="py-16 md:py-20">
          <div
            className="rounded-3xl max-w-4xl mx-auto p-8 md:p-12"
            style={{
              background:
                "linear-gradient(135deg, rgba(222,212,176,0.16) 0%, rgba(209,198,207,0.16) 100%)",
            }}
          >
            <SectionHeader title="De los datos..." align="center" className="mb-10 items-center" />
            <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-10 lg:gap-12">
              <div className="flex flex-col gap-4 w-full lg:flex-1 lg:min-w-0">
                <TopGanadoresChart className="shadow-card-lg" />
                <p className="font-sans text-[#5f5e5e] text-[14px] leading-relaxed text-center lg:text-left">
                  Mediante indicadores clave podemos evaluar el impacto de los sistemas alimentarios
                  en cada estado del país.
                </p>
              </div>
              <div className="flex flex-col items-center lg:items-start justify-center gap-4 w-full lg:w-auto lg:shrink-0">
                <Button
                  type="button"
                  color="crimson"
                  variant="primary"
                  radius="full"
                  size="lg"
                  onClick={onExplorar}
                  className="tracking-[0.08em] whitespace-nowrap"
                >
                  Explora la información
                </Button>
                <span className="font-sans text-[12px] text-neutral-500 max-w-[220px] text-center lg:text-left">
                  Consulta el semáforo completo por estado en la pestaña Explora
                </span>
              </div>
            </div>
          </div>
        </section>
      </FadeUp>

      {/* ── A la acción ── */}
      <FadeUp delay={0.15}>
        <ActionStepsBanner
          title="A la acción."
          steps={[
            { text: "Saber dónde y cómo intervenir" },
            { text: "Dar seguimiento" },
            { text: "Para exigir mejoras e involucrarse" },
          ]}
          className="rounded-3xl mb-12"
        />
      </FadeUp>
    </div>
  );
}
