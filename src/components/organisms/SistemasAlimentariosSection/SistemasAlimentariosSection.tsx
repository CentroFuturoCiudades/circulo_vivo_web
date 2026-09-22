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

export interface SistemasAlimentariosSectionProps {
  eyebrow?: string;
  lead?: string;
  body?: string;
}

export function SistemasAlimentariosSection({
  eyebrow = "Nuestro objetivo",
  lead = "Contribuir a la transformación de los sistemas de alimentación",
  body = "en México y Centroamérica. En esta página encontrarás historias y datos sobre iniciativas que ya están actuando para lograr esa transformación.",
}: SistemasAlimentariosSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#395284] py-20 md:py-28 lg:py-[140px] px-6 md:px-9">
      {/* Decorative sphere rings — echoes the Hero's motif for visual continuity */}
      <div
        className="absolute pointer-events-none select-none hidden md:block"
        style={{ right: -120, top: "50%", width: 560, height: 560, transform: "translateY(-50%)" }}
      >
        {[220, 300, 380, 460, 540].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/[0.08]"
            style={{
              width: size,
              height: size * 0.58,
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${i * 22}deg)`,
            }}
          />
        ))}
      </div>

      {/* Soft blurred accent glow */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          width: 420,
          height: 420,
          left: -160,
          bottom: -180,
          background: "rgba(188,184,132,0.18)",
          borderRadius: 9999,
          filter: "blur(110px)",
        }}
      />

      <div className="relative z-10 max-w-[860px] mx-auto flex flex-col gap-6">
        <FadeUp delay={0}>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#bcb884]" />
            <p
              className="font-sans font-semibold uppercase text-[#bcb884]"
              style={{ fontSize: 12, letterSpacing: "0.2em" }}
            >
              {eyebrow}
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="font-serif italic font-medium text-white text-[26px] leading-[34px] md:text-[34px] md:leading-[44px] lg:text-[42px] lg:leading-[52px]">
            {lead}
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p
            className="font-sans font-normal text-white/70 max-w-[620px]"
            style={{ fontSize: 16, lineHeight: 1.7 }}
          >
            {body}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
