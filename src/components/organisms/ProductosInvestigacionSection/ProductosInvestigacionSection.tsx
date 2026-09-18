"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
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

const PRODUCTS = [
  { title: "Reporte Anual de Impacto 2025", subtitle: "ANÁLISIS CUANTITATIVO", size: "4.2MB" },
  { title: "Protocolo de Ética Comunitaria", subtitle: "MARCO LEGAL",           size: "1.1MB" },
  { title: "Dataset: Indicadores de Salud",  subtitle: "DATOS CRUDOS",          size: "12MB"  },
];

export function ProductosInvestigacionSection() {
  return (
    <section
      className="px-6 md:px-16 lg:px-24 py-12 md:py-20"
      style={{ backgroundColor: "#f4f8ff" }}
    >
      {/* Header — centered */}
      <FadeUp delay={0} className="flex flex-col items-center gap-4 text-center">
        <Eyebrow color="secondary">REPOSITORIO</Eyebrow>
        <h2
          className="font-serif italic font-bold text-[#395284] text-[26px] md:text-[36px]"
          style={{ letterSpacing: -0.9, lineHeight: 1.111 }}
        >
          Productos de Investigación
        </h2>
      </FadeUp>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-16">
        {PRODUCTS.map((p, i) => (
          <FadeUp key={p.title} delay={0.1 + i * 0.12}>
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.2 }}
              className="flex flex-col bg-white rounded-2xl h-full p-6 md:p-10"
              style={{
                border: "1px solid #f4f4f5",
                gap: 8,
              }}
            >
              {/* Top row: icon + size */}
              <div className="flex items-center justify-between">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                  style={{ width: 48, height: 48, backgroundColor: "#395284" }}
                >
                  <FileText size={20} color="white" />
                </motion.div>
                <span
                  className="font-mono text-[#1a1c1c] rounded-lg"
                  style={{
                    fontSize: 10,
                    lineHeight: 1.5,
                    backgroundColor: "#f4f4f5",
                    padding: "4px 8px",
                  }}
                >
                  {p.size}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-serif italic font-bold text-[#1a1c1c] pt-6 md:pt-10"
                style={{ fontSize: 18, lineHeight: 1.556 }}
              >
                {p.title}
              </h3>

              {/* Subtitle */}
              <p
                className="font-sans font-bold text-[#a1a1aa] pb-4 md:pb-6"
                style={{ fontSize: 12, letterSpacing: "0.6px", lineHeight: 1.333 }}
              >
                {p.subtitle}
              </p>

              {/* Download row */}
              <motion.div
                whileHover={{ gap: 8 }}
                className="flex items-center gap-2 pt-6"
                style={{ borderTop: "1px solid #fafafa" }}
              >
                <span
                  className="font-sans font-black text-[#1a1c1c] uppercase"
                  style={{ fontSize: 12, letterSpacing: "1.2px", lineHeight: 1.333 }}
                >
                  DESCARGAR
                </span>
                <ArrowRight size={10} color="#1a1c1c" />
              </motion.div>
            </motion.div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
