"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

export interface ConversionBannerSectionProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function ConversionBannerSection({
  title = "Únete a la red de transformación",
  subtitle = "Impulsa proyectos con impacto sistémico real.",
  ctaLabel = "Solicitar Acceso",
  ctaHref = "#",
}: ConversionBannerSectionProps) {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden py-[60px] mx-6 md:mx-9 mb-12">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/join-transformation.jpg')" }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-0 px-6 md:px-9 py-10 md:py-16 lg:py-[80px]">
        <FadeUp delay={0} className="flex flex-col gap-2">
          <h2
            className="font-sans font-semibold text-white text-2xl lg:text-[32px] max-w-full lg:max-w-[544px]"
            style={{ letterSpacing: "-0.32px", lineHeight: 1.2 }}
          >
            {title}
          </h2>
          <p className="font-sans font-normal text-white" style={{ fontSize: 18, lineHeight: 1.6 }}>
            {subtitle}
          </p>
        </FadeUp>

        <FadeUp delay={0.2} className="shrink-0">
          <Button
            color="gold"
            variant="primary"
            onClick={() => router.push(ctaHref)}
            className="normal-case tracking-normal font-normal text-black hover:text-white h-auto py-5 px-12 bg-[#DED4B0] hover:bg-[#c9bc95]"
            style={{ fontSize: 18 }}
          >
            {ctaLabel}
          </Button>
        </FadeUp>
      </div>
    </section>
  );
}
