"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

function AnimatedProgressBar({ value }: { value: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div
      ref={ref}
      className="rounded-full overflow-hidden"
      style={{ backgroundColor: "rgba(255,255,255,0.1)", height: 6 }}
    >
      <motion.div
        className="rounded-full h-full"
        style={{ backgroundColor: "#bcb884" }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      />
    </div>
  );
}

const MODULES = [
  {
    label: "Módulo S-1: Salud",
    bullets: ["Rediseño de clínicas populares", "Seguimiento nutricional modular"],
  },
  {
    label: "Módulo E-2: Justicia",
    bullets: ["Acceso a trámites digitales", "Mapas de riesgo de equidad"],
  },
];

export function IniciativasEnCursoSection() {
  return (
    <section className="bg-white px-6 md:px-16 lg:px-24 pt-12 md:pt-24 pb-10 md:pb-16">
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">

        {/* Left — title + modules */}
        <div className="flex flex-col gap-10 md:gap-12 lg:flex-[0_0_57%]">
          <FadeUp delay={0}>
            <h2
              className="font-serif italic font-semibold text-[#1a1c1c] text-[26px] md:text-[36px]"
              style={{ letterSpacing: -0.9, lineHeight: 1.111 }}
            >
              Iniciativas en curso
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
            {MODULES.map((m, i) => (
              <FadeUp key={m.label} delay={0.1 + i * 0.12}>
                <div className="flex flex-col gap-4">
                  <div className="pb-4" style={{ borderBottom: "1px solid #f4f4f5" }}>
                    <h3
                      className="font-sans font-bold text-[#bcb884]"
                      style={{ fontSize: 18, lineHeight: 1.556 }}
                    >
                      {m.label}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-4">
                    {m.bullets.map((b, j) => (
                      <motion.div
                        key={b}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 + j * 0.08 }}
                        className="flex items-center gap-3"
                      >
                        <span
                          className="shrink-0 rounded-full bg-black"
                          style={{ width: 6, height: 6 }}
                        />
                        <span
                          className="font-sans font-medium text-[#4c4546]"
                          style={{ fontSize: 16, lineHeight: 1.5 }}
                        >
                          {b}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Right — Inmersión Radical card */}
        <FadeUp delay={0.2} className="w-full lg:flex-1">
          <div
            className="flex flex-col justify-center rounded-2xl p-6 sm:p-8 md:p-12"
            style={{ backgroundColor: "rgba(255,253,244,0.8)" }}
          >
            <h3
              className="font-sans font-bold text-[#bcb884] text-[20px] md:text-[24px]"
              style={{ lineHeight: 1.333 }}
            >
              Inmersión Radical
            </h3>
            <p
              className="font-sans font-normal mt-6 mb-10"
              style={{ fontSize: 16, lineHeight: 1.625, color: "rgba(0,0,0,0.6)" }}
            >
              Metodología diseñada para recolectar insights cualitativos profundos que las
              encuestas tradicionales omiten a través de procesos etnográficos intensivos.
            </p>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span
                  className="font-sans font-bold"
                  style={{ fontSize: 12, letterSpacing: "1.2px", color: "rgba(0,0,0,0.4)" }}
                >
                  PROCESAMIENTO
                </span>
                <span
                  className="font-sans font-bold"
                  style={{ fontSize: 12, letterSpacing: "1.2px", color: "rgba(0,0,0,0.4)" }}
                >
                  75%
                </span>
              </div>
              <AnimatedProgressBar value={75} />
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
