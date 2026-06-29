"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

export function ColaboraCTASection() {
  return (
    <section className="relative overflow-hidden flex items-center" style={{ paddingTop: 128, paddingBottom: 128 }}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-images/colaborate.jpg')" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom left, #000000 0%, transparent 100%)" }}
      />

      <div className="relative z-10 w-full text-center py-20 px-6 md:px-16">
        <FadeUp delay={0}>
          <p className="font-sans text-white/50 uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>
            FORMA PARTE DEL CAMBIO
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2
            className="font-serif font-bold text-white mt-4 leading-[1.1]"
            style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
          >
            Colabora con nosotros
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p
            className="font-sans text-white/70 mt-4 max-w-xl mx-auto leading-[1.6]"
            style={{ fontSize: "16px" }}
          >
            Buscamos investigadores, instituciones y socios estratégicos interesados en escalar modelos de impacto social basados en evidencia.
          </p>
        </FadeUp>
        <FadeUp delay={0.3} className="inline-block mt-8">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="primary"
              color="gold"
              radius="full"
              size="lg"
            >
              ENVIAR UNA PROPUESTA
            </Button>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}
