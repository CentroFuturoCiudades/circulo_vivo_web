"use client";

import { useRouter } from "next/navigation";
import { Footer } from "@/components/molecules/Footer";
import { HeroSection } from "@/components/organisms/HeroSection";
import { SistemasAlimentariosSection } from "@/components/organisms/SistemasAlimentariosSection";
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
    const router = useRouter();

    return (
        <main className="w-full bg-white">
            <HeroSection
                links={NAV_LINKS}
                onPrimaryClick={() => router.push("/mapa")}
                onSecondaryClick={() => router.push("/chatbot")}
            />
            <SistemasAlimentariosSection />
            <ChatbotHighlightSection />
            <EcosystemMapSection />
            <ConversionBannerSection />
            <Footer />
        </main>
    );
}
