"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { NavBar } from "@/components/molecules/NavBar";
import heroBg from "@/assets/bg-images/hero-team.jpg";

const NAV_LINKS = [
  { label: "Inicio",      href: "/" },
  { label: "Equipo",      href: "/equipo", active: true },
  { label: "Mapa",        href: "/mapa" },
  { label: "Chatbot",     href: "/chatbot" },
];

export function TeamHeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background image */}
      <Image
        src={heroBg}
        alt=""
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark overlay gradient — top to bottom, 60% opacity */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(66,65,45,0.6) 0%, rgba(102,102,102,0.6) 100%)",
        }}
      />

      {/* Decorative blurred circle — top right */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          width: 384,
          height: 384,
          top: -160,
          right: 0,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 9999,
          filter: "blur(88px)",
        }}
      />

      {/* NavBar */}
      <div className="fixed top-0 inset-x-0 z-50 px-6 md:px-9 pt-5">
        <NavBar
          links={NAV_LINKS}
          bgColor="#BCB88499"
          bgOpacity={60}
          logoColor="#ffffff"
          pillBgColor="#ffffff"
          pillBgOpacity={50}
          activeLinkColor="#BCB884"
          activeLinkTextColor="#ffffff"
        />
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col items-center text-center gap-4 w-full max-w-4xl py-24"
        >
          {/* Eyebrow */}
          <p
            className="font-sans font-semibold uppercase text-white/50"
            style={{ fontSize: 12, letterSpacing: "0.2em" }}
          >
            PROYECTO DE INVESTIGACIÓN INSTITUCIONAL
          </p>

          {/* Heading */}
          <h1
            className="font-sans font-semibold text-white text-[28px] leading-[36px] md:text-[36px] md:leading-[46px] lg:text-[48px] lg:leading-[60px]"
          >
            Muchas miradas,
            <br />
            <span className="font-serif italic font-medium">una misma causa</span>
          </h1>

          {/* Description */}
          <p
            className="font-sans font-normal text-white/60 max-w-2xl"
            style={{ fontSize: 18, lineHeight: 1.6, paddingTop: 15 }}
          >
            Un sistema modular de conocimiento diseñado para catalizar la
            investigación orientada a desafíos complejos en salud y equidad
            social.
          </p>

          {/* Buttons */}
          {/* <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="primary"
                color="gold"
                radius="full"
                size="lg"
                className="font-normal text-base normal-case tracking-normal"
              >
                Explorar hallazgos
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                color="white"
                radius="full"
                size="lg"
                className="font-normal text-base normal-case tracking-normal"
              >
                Ver metodología
              </Button>
            </motion.div>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
