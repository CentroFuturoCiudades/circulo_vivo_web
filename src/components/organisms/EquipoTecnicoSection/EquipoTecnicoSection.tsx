"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CarouselArrow } from "@/components/atoms/CarouselArrow";

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

const TAG_COLORS: Record<string, string> = {
  SUELO:     "#264042",
  SISTEMAS:  "#203b6b",
  SOCIAL:    "#7f4d7b",
  TERRITORIO:"#395284",
};

const MEMBERS = [
  { name: "Sofía Arreola", role: "Arquitecta Urbanista", tag: "SUELO"      },
  { name: "Mateo Ruiz",    role: "DevOps Engineer",      tag: "SISTEMAS"   },
  { name: "Lucía Méndez",  role: "Antropóloga Social",   tag: "SOCIAL"     },
  { name: "Carlos Slim",   role: "Analista GIS",          tag: "TERRITORIO" },
  { name: "Valeria Luna",  role: "Especialista BIM",      tag: "SUELO"      },
  { name: "Diego Ferré",   role: "Frontend Lead",         tag: "SISTEMAS"   },
  { name: "Ana Paula",     role: "Mediadora Com.",         tag: "SOCIAL"     },
  { name: "Raúl G.",       role: "Ecólogo Urbano",        tag: "TERRITORIO" },
  { name: "Inés Vega",     role: "Ciencia de Datos",      tag: "SISTEMAS"   },
  { name: "Hugo Boss",     role: "Legal Project Mgr",     tag: "SOCIAL"     },
  { name: "Marta Díaz",    role: "Planificadora",         tag: "SUELO"      },
  { name: "Kevin M.",      role: "QA Tester",             tag: "SISTEMAS"   },
  { name: "Julia Sol",     role: "Diseño Visual",         tag: "SOCIAL"     },
  { name: "Esteban Q.",    role: "Hidrólogo",             tag: "TERRITORIO" },
];

export function EquipoTecnicoSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 224 : -224, behavior: "smooth" });
  }

  return (
    <section className="py-12" style={{ backgroundColor: "#f6f9ff" }}>
      {/* Header */}
      <FadeUp delay={0} className="flex flex-wrap items-center justify-between gap-4 px-6 md:px-16 lg:px-24">
        <div>
          <h2
            className="font-serif font-bold text-[#203b6b] text-[20px] md:text-[24px]"
            style={{ lineHeight: 1.4 }}
          >
            Equipo Técnico
          </h2>
          <p
            className="font-sans font-normal text-[#44474f] mt-0.5 text-[14px] md:text-[16px]"
            style={{ lineHeight: 1.5 }}
          >
            Especialistas operativos distribuidos en 4 ejes.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <CarouselArrow direction="prev" onClick={() => scroll("left")} />
          <CarouselArrow direction="next" onClick={() => scroll("right")} />
        </div>
      </FadeUp>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex mt-8 pb-2 overflow-x-auto px-6 md:px-16 lg:px-24"
        style={{ scrollbarWidth: "none", gap: 16, overflowY: "hidden" }}
      >
        {MEMBERS.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: Math.min(i * 0.06, 0.5) }}
            whileHover={{ boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
            className="flex-shrink-0 flex flex-col items-center bg-white rounded-xl"
            style={{
              width: "clamp(160px, 45vw, 200px)",
              padding: 20,
              gap: 16,
              boxShadow: "0 2px 7px rgba(0,0,0,0.08)",
            }}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0" style={{ width: 56, height: 56 }}>
              <div className="w-full h-full rounded-full bg-neutral-200 overflow-hidden" />
              <div
                className="absolute inset-0 rounded-full"
                style={{ border: "2px solid #c4c6d0" }}
              />
            </div>

            {/* Info */}
            <div className="flex flex-col items-center w-full">
              <p
                className="font-serif italic font-bold text-[#203b6b] text-center"
                style={{ fontSize: 16, lineHeight: 1.5 }}
              >
                {m.name}
              </p>
              <p
                className="font-sans font-normal text-[#747780] text-center"
                style={{ fontSize: 11, lineHeight: 1.5, paddingBottom: 11 }}
              >
                {m.role}
              </p>
              <span
                className="font-sans font-normal text-white rounded-full text-center"
                style={{
                  fontSize: 9,
                  padding: "2px 8px",
                  backgroundColor: TAG_COLORS[m.tag] ?? "#203b6b",
                  letterSpacing: -0.225,
                  lineHeight: 1.5,
                }}
              >
                {m.tag}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
