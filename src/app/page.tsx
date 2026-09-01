"use client";

import { Footer } from "@/components/molecules/Footer";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ChatbotHighlightSection } from "@/components/organisms/ChatbotHighlightSection";
import { EcosystemMapSection } from "@/components/organisms/EcosystemMapSection";
import { ConversionBannerSection } from "@/components/organisms/ConversionBannerSection";

const NAV_LINKS = [
    { label: "Inicio",      href: "/",            active: true },
    { label: "Equipo",      href: "/equipo" },
    { label: "Mapa",        href: "/mapa" },
    { label: "Chatbot",     href: "/chatbot" },
];

export default function HomePage() {
    return (
        <main className="w-full bg-white">
            <HeroSection links={NAV_LINKS} />
            <ChatbotHighlightSection />
            <EcosystemMapSection />
            <ConversionBannerSection />
            <Footer />
        </main>
    );
}
