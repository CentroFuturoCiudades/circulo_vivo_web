"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

const CARDS = [
  {
    title: "Problema",
    body: "Fragmentación de datos en sistemas de salud comunitaria y falta de integración en políticas de equidad social.",
  },
  {
    title: "Objetivo",
    body: "Centralizar hallazgos etnográficos y cuantitativos para informar el diseño de intervenciones sistémicas.",
  },
  {
    title: "Impacto",
    body: "Reducción del 15% en la brecha de acceso a servicios primarios en los polígonos de intervención seleccionados.",
  },
];

export function ProblematicaSection() {
  return (
    <section className="bg-white py-12 md:py-20 px-6 md:px-16 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <FadeUp delay={0}>
          <Eyebrow color="gold">PROBLEMÁTICA</Eyebrow>
          <h2
            className="font-sans font-semibold text-[#211f19] mt-4 leading-[1.2] text-[24px] md:text-[30px]"
          >
            Abordando la<br />
            fragmentación del<br />
            <em className="font-serif not-italic" style={{ color: "#BCB884" }}>conocimiento</em>.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15} className="md:self-center flex flex-col gap-4">
          <p className="font-sans text-[#747474] leading-[1.7] text-[16px] md:text-[18px]">
            Somos un equipo formado por personas con distintas áreas de estudio, experiencias y motivaciones, pero con una convicción compartida: los sistemas alimentarios necesitan cambiar para que todas las personas puedan ejercer su derecho a una alimentación sana y suficiente sin generar injusticias y sin degradar el medio ambiente.
          </p>
          <p className="font-sans text-[#747474] leading-[1.7] text-[16px] md:text-[18px]">
            A partir de esta convicción hemos buscado a las personas y proyectos que ya están implementando cambios en los procesos de producción, transformación y distribución de los sistemas de alimentación en México para conocer sus trayectorias, aprender de ellas e integrarlas en una plataforma para conocer, vincular y ampliar el alcance de estos esfuerzos.
          </p>
          <p className="font-sans text-[#747474] leading-[1.7] text-[16px] md:text-[18px]">
            Usamos herramientas de investigación cualitativa y la tecnología que nos permite sistematizarla para conocer, diagnosticar, y atender desde la academia un reto inminente para poder pensar en el futuro con esperanza.
          </p>
        </FadeUp>
      </div>

      <div className="flex flex-col md:flex-row mt-12 md:mt-16 overflow-hidden" style={{ background: "#bcb884", gap: 1 }}>
        {CARDS.map(({ title, body }, i) => (
          <FadeUp key={title} delay={0.1 + i * 0.12} className="flex-1">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white flex flex-col h-full px-6 pt-8 pb-10 md:px-12 md:pt-12 md:pb-[72px]"
              style={{ gap: 24 }}
            >
              <h3
                className="font-serif italic font-bold text-[#bcb884] text-[26px] md:text-[36px]"
                style={{ lineHeight: 1.111 }}
              >
                {title}
              </h3>
              <p
                className="font-sans font-normal text-[#4c4546]"
                style={{ fontSize: 16, lineHeight: 1.5 }}
              >
                {body}
              </p>
            </motion.div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
