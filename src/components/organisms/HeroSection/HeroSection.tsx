"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MoveUpRight } from "lucide-react";
import { NavBar, type NavLink } from "@/components/molecules/NavBar";
import { resolveSignedVideoUrl, resolveSignedImageUrl } from "@/lib/azure/paths";
import heroBg from "@/assets/bg-images/hero.jpg";
import circuloVivoLogoWhite from "@/assets/logos/logo-white.png";

const HERO_VIDEO_PATH = "home/hero-bg.mp4";
// First frame of the video, shown while it buffers — avoids flashing the old
// static photo before the video takes over.
const HERO_VIDEO_POSTER_PATH = "home/hero-bg-poster.jpg";

export interface HeroSectionProps {
  links?: NavLink[];
  title?: React.ReactNode;
  subtitle?: string;
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
  subtitle = "Presentamos historias y datos de quienes ya están replanteando cómo producimos, distribuimos y consumimos alimentos. Aprendamos en colectivo.",
}: HeroSectionProps) {
  const router = useRouter();
  const videoUrl = resolveSignedVideoUrl(HERO_VIDEO_PATH);
  const posterUrl = resolveSignedImageUrl(HERO_VIDEO_POSTER_PATH);

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col">
      {videoUrl ? (
        <video
          src={videoUrl}
          poster={posterUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      ) : (
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
      )}
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
          <Image
            src={circuloVivoLogoWhite}
            alt="Círculo Vivo"
            className="h-20 md:h-24 w-auto self-start select-none"
            priority
          />
          {title ?? (
            <h1 className="font-sans font-semibold text-white text-[28px] leading-[36px] md:text-[36px] md:leading-[46px] lg:text-[48px] lg:leading-[60px]">
              Sistemas alimentarios que sostienen{" "}
              <span className="font-serif italic font-medium" style={{ fontWeight: 500 }}>
                la vida
              </span>
            </h1>
          )}
          <p
            className="font-sans font-normal text-white/90"
            style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 800 }}
          >
            {subtitle}
          </p>
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
              role="link"
              tabIndex={0}
              onClick={() => router.push("/chatbot")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push("/chatbot");
                }
              }}
              className="bg-[#395284] p-6 rounded-xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <div className="flex items-start justify-between gap-2">
                <p
                  className="font-sans font-medium text-white/80 uppercase"
                  style={{ fontSize: 12, letterSpacing: "1.2px", lineHeight: 1 }}
                >
                  Levantamiento de información en territorio
                </p>
                <MoveUpRight className="text-white/70 shrink-0" size={16} aria-hidden="true" />
              </div>
              <p className="font-sans font-semibold text-white mt-2" style={{ fontSize: 24, lineHeight: 1.3 }}>
                +60
              </p>
              <p className="font-sans font-normal text-white/90 mt-1" style={{ fontSize: 14, lineHeight: 1.5 }}>
                Historias documentadas
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
              role="link"
              tabIndex={0}
              onClick={() => router.push("/mapa")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push("/mapa");
                }
              }}
              className="bg-[#bcb884] p-6 rounded-xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <div className="flex items-start justify-between gap-2">
                <p
                  className="font-sans font-medium text-white/80 uppercase"
                  style={{ fontSize: 12, letterSpacing: "1.2px", lineHeight: 1 }}
                >
                  Aprende de sus trayectorias.
                </p>
                <MoveUpRight className="text-white/70 shrink-0" size={16} aria-hidden="true" />
              </div>
              <p className="font-sans font-semibold text-white mt-2" style={{ fontSize: 24, lineHeight: 1.3 }}>
                12 territorios
              </p>
              <p className="font-sans font-normal text-white/90 mt-1" style={{ fontSize: 14, lineHeight: 1.5 }}>
                Ubica y conoce las iniciativas en México y Centroamérica. Explora el mapa.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
