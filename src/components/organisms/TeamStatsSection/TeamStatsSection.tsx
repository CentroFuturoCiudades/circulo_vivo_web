"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

function parseValue(str: string) {
  const match = str.match(/^([^0-9]*)(\d+\.?\d*)([^0-9]*)$/);
  if (!match) return { prefix: "", num: 0, suffix: str, decimals: 0 };
  const numStr = match[2];
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix: match[1], num: parseFloat(numStr), suffix: match[3], decimals };
}

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { prefix, num, suffix, decimals } = parseValue(value);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * num).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, num, decimals]);

  const display = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center gap-2"
    >
      <span
        className={cn(
          "font-display font-normal italic leading-none tracking-[-0.05em]",
          "text-[42px] sm:text-[52px] md:text-[60px] text-white"
        )}
      >
        {prefix}{display}{suffix}
      </span>
      <span className="font-sans font-bold text-[10px] sm:text-[12px] tracking-[0.2em] uppercase text-white text-center">
        {label}
      </span>
    </motion.div>
  );
}

const STATS = [
  { value: "+450",  label: "HORAS DE ENTREVISTAS"  },
  { value: "12+",   label: "INSTITUCIONES ALIADAS" },
];

export function TeamStatsSection() {
  return (
    <section className="py-12 md:py-16 px-6 md:px-16 lg:px-24" style={{ backgroundColor: "#395284" }}>
      <div className="grid grid-cols-2 gap-6 md:gap-8">
        {STATS.map((s) => (
          <AnimatedStat key={s.label} value={s.value} label={s.label} />
        ))}
      </div>
    </section>
  );
}
