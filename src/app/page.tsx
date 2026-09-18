"use client";

import { useRouter } from "next/navigation";
import { Map, Bot, ChartColumn } from "lucide-react";
import { Footer } from "@/components/molecules/Footer";
import { HeroSection } from "@/components/organisms/HeroSection";
import { FeatureCardsSection } from "@/components/organisms/FeatureCardsSection";
import { ChatbotHighlightSection } from "@/components/organisms/ChatbotHighlightSection";
import { EcosystemMapSection } from "@/components/organisms/EcosystemMapSection";
import { IndicatorsDashboardSection } from "@/components/organisms/IndicatorsDashboardSection";
import { ConversionBannerSection } from "@/components/organisms/ConversionBannerSection";

const NAV_LINKS = [
    { label: "Inicio",      href: "/",            active: true },
    { label: "Equipo",      href: "/equipo" },
    { label: "Mapa",        href: "/mapa" },
    { label: "Chatbot",     href: "/chatbot" },
];

const FEATURES = [
    {
        icon: Map,
        title: "Mapa Interactivo",
        description:
            "Descubre proyectos que están replanteando la forma en que conocemos, producimos, distribuimos y consumimos alimentos hacia procesos compatibles con la salud, la vida y la justicia social.",
        cta: "SABER MÁS",
        href: "/mapa",
    },
    {
        icon: Bot,
        title: "Chatbot",
        description:
            "Puedes platicar con este Chatbot y hacerle preguntas. Sus respuestas están construidas a partir de todo lo que aprendimos en las conversaciones con quienes están replanteando positivamente los sistemas de alimentación de la región.",
        cta: "PROBAR AHORA",
        href: "/chatbot",
    },
    {
        icon: ChartColumn,
        title: "Datos para medir avances",
        description:
            "Conoce la realidad de los sistemas de alimentación en México y Centroamérica a través de datos, mapas e indicadores que muestran sus retos y oportunidades.",
        cta: "VER DATOS",
        href: "/indicadores",
    },
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
            <FeatureCardsSection features={FEATURES} />
            <ChatbotHighlightSection />
            <EcosystemMapSection />
            <IndicatorsDashboardSection />
            <ConversionBannerSection />
            <Footer />
        </main>
    );
}
