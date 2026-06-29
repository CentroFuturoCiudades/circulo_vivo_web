"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Eyebrow } from "@/components/atoms/Eyebrow";

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

const PARTNERS = [
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

export function ColaboracionesSection() {
  return (
    <section className="px-6 md:px-16 lg:px-24 pt-12 pb-12 md:pt-16 md:pb-16">
      {/* Header */}
      <FadeUp delay={0} className="flex flex-col gap-2">
        <Eyebrow color="purple">COLABORACIONES</Eyebrow>
        <h2
          className="font-serif font-bold text-[#203b6b] text-[24px] md:text-[32px]"
          style={{ lineHeight: 1.25 }}
        >
          Red Global de Conocimiento
        </h2>
      </FadeUp>

      {/* Cards */}
      <div className="flex flex-col gap-6 mt-8 md:mt-10">
        {/* Top 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {PARTNERS.map((p, i) => (
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
