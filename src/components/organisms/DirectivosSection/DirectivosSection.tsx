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

const DIRECTIVOS = [
  {
    name: "Dra. Elena Rivas",
    role: "DIRECTORA DE PROYECTO",
    description:
      "Especialista en sistemas complejos y salud comunitaria por MIT. Lidera la visión estratégica y la integración metodológica.",
  },
  {
    name: "Dr. Jorge Valdés",
    role: "LÍDER DE DATOS",
    description:
      "Analista cuantitativo con enfoque en modelos predictivos de impacto. Coordina la infraestructura tecnológica y datos urbanos.",
  },
];

export function DirectivosSection() {
  return (
    <section className="py-16 px-6 md:px-16 lg:px-24">
      <FadeUp delay={0}>
        <h2
          className="font-serif italic font-semibold text-[#395284] text-[26px] md:text-[36px]"
          style={{ letterSpacing: -0.9, lineHeight: 1.111 }}
        >
          Directivos
        </h2>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {DIRECTIVOS.map((d, i) => (
          <FadeUp key={d.name} delay={0.1 + i * 0.15}>
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Photo placeholder */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="w-full sm:w-[200px] h-[200px] sm:h-[250px] flex-shrink-0 rounded-xl overflow-hidden bg-neutral-200"
                style={{ boxShadow: "0 2px 7px rgba(0,0,0,0.08)" }}
              />

              {/* Text */}
              <div className="flex flex-col sm:pt-1.5">
                <h3
                  className="font-serif italic font-bold text-[#203b6b]"
                  style={{ fontSize: 24, lineHeight: 1.4 }}
                >
                  {d.name}
                </h3>
                <p
                  className="font-sans font-bold uppercase text-[#747780]"
                  style={{ fontSize: 12, letterSpacing: "1.2px", lineHeight: 1.2 }}
                >
                  {d.role}
                </p>
                <p
                  className="font-sans font-normal text-[#44474f] mt-1.5"
                  style={{ fontSize: 16, lineHeight: 1.375 }}
                >
                  {d.description}
                </p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
