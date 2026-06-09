"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChartColumn } from "lucide-react";
import { useRouter } from "next/navigation";
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

export interface ChartDataItem {
  state: string;
  value: number;
  color?: string;
}

export interface IndicatorsDashboardSectionProps {
  data?: ChartDataItem[];
  ctaHref?: string;
}

const DEFAULT_DATA: ChartDataItem[] = [
  { state: "Chiapas",          value: 0.09,  color: "#bcb884" },
  { state: "Hidalgo",          value: 0.081, color: "#395284" },
  { state: "Veracruz",         value: 0.062, color: "#708b8d" },
  { state: "Puebla",           value: 0.061, color: "#395284" },
  { state: "San Luis Potosí",  value: 0.06,  color: "#708b8d" },
  { state: "Oaxaca",           value: 0.06,  color: "#708b8d" },
  { state: "Tabasco",          value: 0.048, color: "#582a56" },
  { state: "Guerrero",         value: 0.035, color: "#582a56" },
];

export function IndicatorsDashboardSection({
  data = DEFAULT_DATA,
  ctaHref = "/indicadores",
}: IndicatorsDashboardSectionProps) {
  const router = useRouter();
  const maxVal = Math.max(...data.map((d) => d.value));

  return (
    <section className="w-full py-16 md:py-20 lg:py-[120px]">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 px-6 md:px-9">
        {/* Left — text */}
        <FadeUp
          delay={0}
          className="flex flex-col gap-5 w-full lg:shrink-0 lg:w-[379px]"
        >
          <h2
            className="font-sans font-semibold text-[#1a1c1c] text-2xl lg:text-[32px] lg:leading-[40px]"
            style={{ letterSpacing: "-0.32px" }}
          >
            Visualiza lo{" "}
            <em className="font-serif not-italic text-[#bcb884] font-medium" style={{ fontStyle: "italic" }}>
              invisible
            </em>
          </h2>
          <p
            className="font-sans font-normal text-[#5f5e5e]"
            style={{ fontSize: 16, lineHeight: 1.6, maxWidth: 373 }}
          >
            Dashboards diseñados para la toma de decisiones. KPIs de resiliencia, salud del suelo e impacto social
            integrados en una sola vista.
          </p>
          <Button
            color="gold"
            variant="outline"
            iconRight={ChartColumn}
            onClick={() => router.push(ctaHref)}
            className="normal-case tracking-normal font-normal text-base h-auto py-3 px-8 w-fit text-[#bcb884] hover:text-white [&>svg]:text-[#bcb884] hover:[&>svg]:text-white"
          >
            Ver Indicadores
          </Button>
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
            {/* Chart header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <p className="font-sans font-semibold text-[#1a1c1c]" style={{ fontSize: 14 }}>
                  Top 8 Ganadores de Impacto
                </p>
                <p className="font-sans text-[#71717a]" style={{ fontSize: 11 }}>
                  Estados con mayor ganancia en índice IISE
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full" style={{ background: "#bcb884" }} />
                <span className="font-sans text-[#71717a]" style={{ fontSize: 11 }}>
                  Delta IISE
                </span>
              </div>
            </div>

            {/* Bars */}
            <div className="flex flex-col gap-2.5">
              {data.map((item) => (
                <div key={item.state} className="flex items-center gap-3">
                  <span
                    className="font-sans text-[#71717a] text-right shrink-0"
                    style={{ fontSize: 11, width: 100 }}
                  >
                    {item.state}
                  </span>
                  <div className="flex-1 h-5 bg-[#f4f4f5] rounded-sm overflow-hidden">
                    <motion.div
                      className="h-full rounded-sm"
                      style={{ backgroundColor: item.color ?? "#708b8d" }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.value / maxVal) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                    />
                  </div>
                  <span
                    className="font-sans font-semibold text-[#1a1c1c] shrink-0"
                    style={{ fontSize: 11, width: 48, textAlign: "right" }}
                  >
                    +{item.value.toFixed(3)}
                  </span>
                </div>
              ))}
            </div>

            {/* X-axis ticks */}
            <div className="flex items-center" style={{ paddingLeft: 112, paddingRight: 60 }}>
              {[0, 0.025, 0.05, 0.075, 0.1].map((tick) => (
                <span
                  key={tick}
                  className="font-sans text-[#a1a1aa] flex-1 text-center"
                  style={{ fontSize: 10 }}
                >
                  {tick === 0 ? "0" : tick.toFixed(3)}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
