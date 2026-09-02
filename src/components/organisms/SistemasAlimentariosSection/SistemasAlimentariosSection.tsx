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

const PARAGRAPHS = [
  "La alimentación es el resultado de muchas historias que interactúan. Antes de llegar a nuestra mesa, los alimentos pasaron por las manos y las decisiones de productores, trabajadores, comunidades, empresas, comercios, gobiernos y otros consumidores. En ese recorrido se utilizó agua, suelo, energía, infraestructura y conocimiento. Esa red actúa de manera integrada, teniendo como resultado qué, cómo, cuánto y a qué precio podemos comer diferentes alimentos. A estas interacciones las conocemos como sistemas alimentarios.",
  "A lo largo del tiempo, los sistemas alimentarios han enfrentado diferentes desafíos y se han transformado para satisfacerlos.",
  "La manera en que hoy funcionan estos sistemas ha permitido producir y distribuir alimentos a una escala extraordinaria, pero también está generando resultados que necesitamos cambiar. Muchas personas todavía carecen de una alimentación suficiente y saludable; otras enfrentan enfermedades relacionadas con dietas de baja calidad. Quienes producen nuestros alimentos rara vez reciben una compensación justa y muchas prácticas productivas degradan los recursos naturales poniendo en riesgo nuestra alimentación futura y las condiciones de habitabilidad del planeta.",
  "Estos problemas están interconectados. Cuando hablamos de replantear el sistema alimentario, hablamos de reconocer el reto como un reto complejo, con muchos actores y muchos procesos simultáneos y de replantear sus dinámicas para tener un sistema que produzca mejor alimento para las personas, procesos más sostenibles para el planeta y dinámicas más justas para quienes hacen posible cada comida.\n\nImplica producir alimentos diversos y nutritivos, hacerlos accesibles, fortalecer a los productores, reducir las pérdidas y el desperdicio, regenerar los recursos naturales y fomentar que las políticas públicas estén alineadas con este propósito.",
  "En México y en otras partes del mundo ya hay comunidades, cooperativas, organizaciones, empresas y gobiernos construyendo alternativas. Sus experiencias ofrecen aprendizajes valiosos para entender lo que funciona, las barreras que impiden a este tipo de esfuerzos avanzar y las alianzas necesarias para sostener el cambio.",
];

export function SistemasAlimentariosSection() {
  return (
    <section className="relative w-full bg-white py-16 md:py-20 lg:py-[120px] px-6 md:px-9">
      <div className="mx-auto flex flex-col gap-6">
        {PARAGRAPHS.map((paragraph, i) => (
          <FadeUp key={i} delay={i * 0.08} className="flex flex-col gap-4">
            {paragraph.split("\n\n").map((block, j) => (
              <p
                key={j}
                className="font-sans text-[#5e5e5e] leading-[1.7] text-[16px] md:text-[18px]"
              >
                {block}
              </p>
            ))}
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
