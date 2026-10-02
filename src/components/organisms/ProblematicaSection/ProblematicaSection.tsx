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

export function ProblematicaSection() {
  return (
    <section className="bg-white py-12 md:py-20 px-6 md:px-16 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <FadeUp delay={0}>
          <h2
            className="font-sans font-semibold text-[#211f19] leading-[1.2] text-[24px] md:text-[29px]"
          >
            Nuestra motivación
          </h2>
        </FadeUp>
        <FadeUp delay={0.15} className="md:self-center flex flex-col gap-4">
          <p className="font-sans text-[#747474] leading-[1.7] text-[18px] md:text-[20px]">
            Los sistemas alimentarios significan una red compleja de procesos y actores que, en su interacción, determinan las opciones de alimentación que tienen las comunidades. Hoy estas opciones significan riesgos para la salud de las personas y para la sostenibilidad del planeta.
          </p>
          <p className="font-sans text-[#747474] leading-[1.7] text-[18px] md:text-[20px]">
            Nuestro equipo comparte la convicción de que tenemos que replantear estos sistemas alimentarios y que podemos hacerlo si analizamos su complejidad con la riqueza que ofrecen distintas disciplinas y metodologías. Con trayectorias en Salud Pública, Nutrición, Antropología, Demografía, Economía y Ciencias Computacionales hemos construido un sistema de análisis que también integra distintas metodologías y herramientas.
          </p>
          <p className="font-sans text-[#747474] leading-[1.7] text-[18px] md:text-[20px]">
            A partir de esta convicción hemos buscado a las personas y proyectos que ya están implementando cambios en los procesos de producción, transformación y distribución de los sistemas de alimentación en México para conocer sus trayectorias, aprender de ellas e integrarlas en una plataforma para conocer, vincular y ampliar el alcance de estos esfuerzos. Usamos herramientas de investigación cualitativa y la tecnología que nos permite sistematizarla para conocer, diagnosticar, y atender desde la academia un reto inminente para poder pensar en el futuro con esperanza.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
