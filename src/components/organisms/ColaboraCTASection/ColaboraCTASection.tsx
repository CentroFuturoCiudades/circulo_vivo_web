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

export function ColaboraCTASection() {
  return (
    <section className="relative overflow-hidden flex items-center" style={{ paddingTop: 88, paddingBottom: 88 }}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-images/colaborate.jpg')" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom left, #000000 0%, transparent 100%)" }}
      />

      <div className="relative z-10 w-full text-center px-6 md:px-16">
        <FadeUp delay={0.1}>
          <h2
            className="font-serif font-bold text-white mt-4 leading-[1.1]"
            style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
          >
            Con el respaldo del Fondo Semilla
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p
            className="font-sans text-white/70 mt-4 max-w-xl mx-auto leading-[1.6]"
            style={{ fontSize: "16px" }}
          >
            Este proyecto fue posible gracias al apoyo del Fondo Semilla del Tecnológico de Monterrey.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
