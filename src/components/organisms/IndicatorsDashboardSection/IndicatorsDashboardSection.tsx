"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChartColumn } from "lucide-react";
import { Button } from "@/components/atoms/Button";

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

// Alturas de barra puramente ilustrativas — un mockup de panel, no datos reales.
// La sección de indicadores todavía no está conectada a datos en vivo.
const PLACEHOLDER_BARS = [0.9, 0.65, 0.8, 0.45, 0.7, 0.3, 0.55, 0.4];

export function IndicatorsDashboardSection() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <section className="w-full py-16 md:py-20 lg:py-[120px]">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 px-6 md:px-9">
        {/* Left — text */}
        <FadeUp
          delay={0}
          className="flex flex-col gap-5 w-full lg:shrink-0 lg:w-[379px]"
        >
          <h2
            className="font-sans font-semibold text-[#1a1c1c] text-2xl lg:text-[29px] lg:leading-[34px]"
            style={{ letterSpacing: "-0.32px" }}
          >
            Conocimiento para conectar
          </h2>
          <p
            className="font-sans font-normal text-[#5f5e5e]"
            style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 373 }}
          >
            Un espacio para explorar indicadores sobre producción, acceso y consumo de alimentos que permiten
            comprender la realidad alimentaria de la región. Explora los indicadores....
          </p>
          <div
            className="relative w-fit"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Button
              color="gold"
              variant="outline"
              radius="full"
              iconRight={ChartColumn}
              disabled
              className="normal-case tracking-normal font-normal text-lg h-auto py-3 px-8 w-fit text-[#bcb884] cursor-not-allowed [&>svg]:text-[#bcb884]"
            >
              Explorar datos
            </Button>
            <motion.div
              initial={false}
              animate={{ opacity: showTooltip ? 1 : 0, y: showTooltip ? 0 : 6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-max max-w-[240px] -translate-x-1/2 rounded-lg bg-[#1a1c1c] px-3.5 py-2 text-center font-sans text-white shadow-lg"
              style={{ fontSize: 14, lineHeight: 1.4 }}
            >
              Próximamente podrás explorar estos datos
              <div className="absolute left-1/2 bottom-full -translate-x-1/2 border-4 border-transparent border-b-[#1a1c1c]" />
            </motion.div>
          </div>
        </FadeUp>

        {/* Right — chart card */}
        <FadeUp delay={0.15}>
          <div
            className="bg-white w-full lg:w-[565px] flex flex-col gap-5 rounded-2xl border border-[#d1c6cf] p-5 lg:p-[25px]"
            style={{
              boxShadow:
                "0 1px 2.625px rgba(0,0,0,0.04), 0 2px 10.5px rgba(57,82,132,0.07)",
            }}
          >
            {/* Header — generic, no invented titles/metrics */}
            <div className="flex items-center gap-2">
              <ChartColumn size={16} className="text-[#bcb884]" />
              <p className="font-sans font-semibold text-[#1a1c1c]" style={{ fontSize: 15 }}>
                Panel de indicadores
              </p>
            </div>

            {/* Placeholder bars — illustrative shapes only, no labels or values */}
            <div className="flex items-end gap-2.5" style={{ height: 240 }}>
              {PLACEHOLDER_BARS.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-sm bg-[#e3e1d4]"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
                />
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
