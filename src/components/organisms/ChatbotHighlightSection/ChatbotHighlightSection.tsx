"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  MoreVertical,
  Plus,
  SendHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { Chip } from "@/components/atoms/Chip";

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

function ChatbotMock() {
  return (
    <div
      className="relative overflow-hidden bg-white"
      style={{ width: 572, height: 653, borderRadius: 16 }}
    >
      {/* Header */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between"
        style={{
          height: 64,
          padding: "12px 24px",
          background: "rgba(255,249,237,0.70)",
          backdropFilter: "blur(17.5px)",
          boxShadow: "0 1px 1.75px rgba(0,0,0,0.05)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="relative shrink-0 flex items-center justify-center overflow-hidden"
            style={{
              width: 40,
              height: 40,
              borderRadius: 9999,
              background: "#f8eec9",
              border: "1px solid rgba(193,200,200,0.3)",
            }}
          >
            <img src="/logo.svg" alt="" className="w-full h-full object-contain" />
            <div
              className="absolute"
              style={{
                width: 12,
                height: 12,
                borderRadius: 9999,
                background: "#bcb884",
                border: "2px solid #fff9ed",
                right: 0,
                bottom: 0,
              }}
            />
          </div>
          <div>
            <p className="font-sans font-semibold text-[#1a1c1c]" style={{ fontSize: 14, lineHeight: 1.3 }}>
              Círculo Vivo
            </p>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#bcb884ff]" />
              <p className="font-sans text-[#466062b2]" style={{ fontSize: 11 }}>
                EN LÍNEA
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center" style={{ width: 40, height: 40, borderRadius: 9999 }}>
          <MoreVertical size={16} className="text-[#414848]" />
        </div>
      </div>

      {/* Chat canvas */}
      <div className="flex flex-col overflow-hidden" style={{ padding: "96px 16px 148px 16px" }}>
        <div
          style={{
            background: "#fef4ce",
            borderRadius: "0 12px 12px 12px",
            padding: 24,
            border: "1px solid rgba(193,200,200,0.2)",
          }}
        >
          <p className="font-sans text-[#201c05]" style={{ fontSize: 16, lineHeight: 1.5 }}>
            ¿Qué quieres saber sobre las iniciativas que están transformando los sistemas alimentarios?
          </p>
        </div>

        <p
          className="font-sans italic text-[#414848]"
          style={{ fontSize: 14, lineHeight: 1.43, marginTop: 12, padding: "0 12px" }}
        >
          Selecciona un tema o escribe una pregunta para analizar nuestra base de datos cualitativa.
        </p>

        <div className="flex" style={{ gap: 12, marginTop: 48, padding: "0 12px" }}>
          {["Barreras", "Estrategias", "Actores"].map((chip) => (
            <Chip key={chip} color="secondary" className="text-[#455E90]">
              {chip}
            </Chip>
          ))}
          <Chip color="gold" selected className="text-white">
            Huertos Escolares
          </Chip>
        </div>

        <div className="flex justify-end" style={{ marginTop: 48 }}>
          <div
            style={{
              background: "#395284",
              borderRadius: "12px 0 12px 12px",
              padding: 24,
              width: 328,
            }}
          >
            <p className="font-sans text-white" style={{ fontSize: 14, lineHeight: 1.5 }}>
              Explícame sobre los huertos escolares.
            </p>
          </div>
        </div>

        {/* Typing dots */}
        <div className="flex items-center" style={{ gap: 4, marginTop: 48, padding: "12px 24px", opacity: 0.5 }}>
          {[0, 150, 300].map((d) => (
            <motion.span
              key={d}
              style={{ width: 6, height: 6, borderRadius: 9999, background: "#466062", display: "block" }}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: d / 1000 }}
            />
          ))}
        </div>
      </div>

      {/* Footer input bar */}
      <div
        className="absolute left-0 right-0 flex flex-col"
        style={{
          top: 541,
          height: 110,
          padding: "12px 16px 8px 16px",
          background: "rgba(255,249,237,0.90)",
          backdropFilter: "blur(10.5px)",
        }}
      >
        <div style={{ paddingBottom: 12 }}>
          <p
            className="font-sans font-semibold text-center"
            style={{ fontSize: 12, lineHeight: 1.25, color: "#727879", letterSpacing: 0.6 }}
          >
            Basado en el análisis cualitativo de XX horas de entrevistas semiestructuradas con sistemas alimentarios locales.
          </p>
        </div>
        <div
          className="flex items-center bg-white"
          style={{
            borderRadius: 9999,
            border: "1px solid #c1c8c8",
            padding: "4px 24px",
            boxShadow: "0 1px 1.75px rgba(0,0,0,0.05)",
          }}
        >
          <div className="shrink-0" style={{ paddingRight: 12 }}>
            <Plus size={20} className="text-[#708b8d]" />
          </div>
          <div className="flex-1" style={{ padding: "9px 12px 10px 12px" }}>
            <p className="font-sans text-[#a1a1aa]" style={{ fontSize: 14 }}>
              Escribe tu pregunta aquí...
            </p>
          </div>
          <div style={{ paddingLeft: 12 }}>
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 40, height: 40, background: "#708b8d" }}
            >
              <SendHorizontal size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface ChatbotHighlightSectionProps {
  ctaHref?: string;
}

export function ChatbotHighlightSection({ ctaHref = "/chatbot" }: ChatbotHighlightSectionProps) {
  const router = useRouter();
  return (
    <section className="relative w-full overflow-hidden" style={{ padding: "0" }}>
      <div className="absolute inset-0 bg-white" />
      <div
        className="absolute inset-y-0 left-0 pointer-events-none select-none"
        style={{
          width: "60%",
          backgroundImage: "url('/pattern.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left center",
          backgroundSize: "contain",
          opacity: 0.08,
        }}
      />

      <div className="relative px-6 md:px-9 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 py-16 md:py-20 lg:py-[120px]">
        {/* Left — mock */}
        <FadeUp delay={0} className="hidden md:flex items-center justify-center lg:shrink-0">
          <div className="md:block lg:hidden" style={{ width: 383, height: 437, overflow: "hidden" }}>
            <div style={{ transform: "scale(0.67)", transformOrigin: "top left", width: 572, height: 653 }}>
              <ChatbotMock />
            </div>
          </div>
          <div className="hidden lg:block">
            <ChatbotMock />
          </div>
        </FadeUp>

        {/* Right — text */}
        <div className="flex flex-col w-full lg:w-auto" style={{ gap: 24 }}>
          <FadeUp delay={0.1}>
            <h2 className="font-sans font-semibold text-[#BCB884] text-[24px] leading-[32px] md:text-[32px] md:leading-[42px] lg:text-[38.67px] lg:leading-[50.27px] lg:max-w-[552px]">
              La información que necesitas, al
              <br />
              <span className="font-serif font-medium italic text-[#395284] text-[24px] leading-[32px] md:text-[32px] md:leading-[42px] lg:text-[38.67px] lg:leading-[50.27px]">
                alcance de una pregunta.
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p
              className="font-sans font-normal text-[#5e5e5e]"
              style={{ fontSize: 16, lineHeight: 1.5, maxWidth: 413 }}
            >
              Nuestra plataforma utiliza procesamiento de lenguaje natural para navegar entre miles de puntos de datos,
              permitiéndote obtener insights estratégicos en segundos sin necesidad de ser un experto en datos.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <ul className="flex flex-col gap-3">
              {[
                "Análisis comparativo por regiones",
                "Detección de brechas de innovación",
                "Reportes automáticos descargables",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#395284] flex-shrink-0" />
                  <span className="font-sans font-normal text-[#395284]" style={{ fontSize: 16, lineHeight: 1.5 }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.4}>
            <Button
              color="navy"
              variant="primary"
              iconRight={ArrowRight}
              onClick={() => router.push(ctaHref)}
              className="normal-case tracking-normal font-normal text-base h-auto py-1.5 px-2"
            >
              EMPIEZA AHORA
            </Button>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
