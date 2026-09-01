"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MoveUpRight, PlayCircle } from "lucide-react";
import { NavBar, type NavLink } from "@/components/molecules/NavBar";
import { Button } from "@/components/atoms/Button";
import heroBg from "@/assets/bg-images/hero.jpg";

export interface HeroSectionProps {
  links?: NavLink[];
  title?: React.ReactNode;
  subtitle?: string;
  primaryCta?: string;
  secondaryCta?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: "Inicio", href: "/", active: true },
  { label: "Equipo", href: "/equipo" },
  { label: "Mapa", href: "/mapa" },
  { label: "Chatbot", href: "/chatbot" },
];

export function HeroSection({
  links = DEFAULT_LINKS,
  title,
  subtitle = "Una plataforma para mapear, analizar y conectar iniciativas, proyectos y movimientos que impulsan la transformación de los sistemas alimentarios hacia modelos más saludables, justos y sostenibles.",
  primaryCta = "Explorar Mapa",
  secondaryCta = "Ver Demostración",
  onPrimaryClick,
  onSecondaryClick,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col">
      <Image
        src={heroBg}
        alt=""
        fill
        priority
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom left, #3F5355 0%, rgba(51,44,44,0.5) 100%)",
        }}
      />

      {/* Pattern SVG */}
      <div
        className="absolute inset-y-0 right-0 pointer-events-none select-none"
        style={{
          width: "45%",
          backgroundImage: "url('/hero-pattern.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          backgroundSize: "contain",
          opacity: 0.1,
          filter: "brightness(0) invert(1)",
        }}
      />

      {/* Decorative sphere rings */}
      <div
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{ right: -80, top: 0, width: 760, height: 760 }}
      >
        {[320, 390, 460, 530, 600, 670, 740].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/[0.07]"
            style={{
              width: size,
              height: size * 0.58,
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${i * 26}deg)`,
            }}
          />
        ))}
      </div>

      {/* NavBar */}
      <div className="fixed top-0 inset-x-0 z-50 px-6 md:px-9 pt-5">
        <NavBar
          links={links}
          logoColor="#ffffff"
          bgColor="#708b8d"
          bgOpacity={50}
          blur
          activeLinkColor="#708b8d"
          activeLinkOpacity={100}
          activeLinkTextColor="#ffffff"
          linkTextColor="#000000"
          pillBgColor="#ffffff"
          pillBgOpacity={50}
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex-1 w-full px-6 md:px-9 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 lg:gap-20 py-16 lg:py-[80px]">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col gap-6 w-full"
        >
          {title ?? (
            <h1 className="font-sans font-semibold text-white text-[28px] leading-[36px] md:text-[36px] md:leading-[46px] lg:text-[48px] lg:leading-[60px]">
              Contribuyendo a replantear cómo producimos, distribuimos y
              consumimos alimentos a través de la integración del{" "}
              <span className="font-serif italic font-medium" style={{ fontWeight: 500 }}>
                aprendizaje colectivo
              </span>
              .
            </h1>
          )}
          <p
            className="font-sans font-normal text-white/90"
            style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 800 }}
          >
            {subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                color="gold"
                variant="primary"
                radius="full"
                iconRight={MoveUpRight}
                onClick={onPrimaryClick}
                className="normal-case tracking-normal font-normal text-base h-auto py-4 px-8 text-black"
              >
                {primaryCta}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                color="white"
                variant="outline"
                radius="full"
                iconRight={PlayCircle}
                onClick={onSecondaryClick}
                className="normal-case tracking-normal font-normal text-base h-auto py-4 px-8"
              >
                {secondaryCta}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Right — floating stat cards */}
        <div
          className="relative flex-shrink-0 hidden lg:block"
          style={{ width: 466, height: 460 }}
        >
          {/* Card navy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="absolute"
            style={{ left: 124, top: 41.5, width: 320 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-[#395284] p-6 rounded-xl"
            >
              <p
                className="font-sans font-medium text-white/80 uppercase"
                style={{ fontSize: 12, letterSpacing: "1.2px", lineHeight: 1 }}
              >
                Levantamiento de información en territorio
              </p>
              <p className="font-sans font-semibold text-white mt-2" style={{ fontSize: 24, lineHeight: 1.3 }}>
                +60
              </p>
              <p className="font-sans font-normal text-white/90 mt-1" style={{ fontSize: 14, lineHeight: 1.5 }}>
                Iniciativas entrevistadas y documentadas
              </p>
            </motion.div>
          </motion.div>

          {/* Card gold */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="absolute"
            style={{ left: 29, top: 260, width: 320 }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="bg-[#bcb884] p-6 rounded-xl"
            >
              <p
                className="font-sans font-medium text-white/80 uppercase"
                style={{ fontSize: 12, letterSpacing: "1.2px", lineHeight: 1 }}
              >
                +60 historias
              </p>
              <p className="font-sans font-semibold text-white mt-2" style={{ fontSize: 24, lineHeight: 1.3 }}>
                +12 territorios
              </p>
              <p className="font-sans font-normal text-white/90 mt-1" style={{ fontSize: 14, lineHeight: 1.5 }}>
                Iniciativas mapeadas en el territorio nacional.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
