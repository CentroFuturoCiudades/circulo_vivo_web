"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Map } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button";

function FadeUp({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export interface EcosystemMapSectionProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function EcosystemMapSection({
  title = "Navega el ecosistema",
  description = "Visualiza la distribución geográfica de los esfuerzos ciudadanos y encuentra colaboradores potenciales cerca de ti.",
  ctaLabel = "Abrir mapa completo",
  ctaHref = "/mapa",
}: EcosystemMapSectionProps) {
  const router = useRouter();
  return (
    <section className="relative w-full overflow-hidden h-[480px] md:h-[560px] lg:h-[640px]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/navigate-eco.jpg')" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(86,20,39,0.5)", backdropFilter: "blur(0.875px)" }}
      />

      <div className="relative z-10 h-full flex items-center justify-center">
        <FadeUp>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative overflow-hidden w-[calc(100vw-48px)] lg:w-[512px] rounded-[8px]"
          >
            <div className="absolute inset-0 bg-[#561427]" />
            <div className="relative z-10 p-6 md:p-8 lg:p-12 flex flex-col items-center gap-2">
              <h2 className="font-serif font-semibold text-white text-center text-xl leading-7 lg:text-[32px] lg:leading-[40px] mb-3">
                {title}
              </h2>
              <p className="font-sans font-regular text-white text-center text-sm lg:text-base pb-8 lg:pb-10">
                {description}
              </p>
              <Button
                color="gold"
                variant="primary"
                iconLeft={Map}
                radius="sm"
                onClick={() => router.push(ctaHref)}
                className="normal-case tracking-normal font-normal text-base text-black h-auto py-4 px-8"
              >
                {ctaLabel}
              </Button>
            </div>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}
