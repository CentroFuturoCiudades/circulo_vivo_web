"use client";

import { Map, BarChart2 } from "lucide-react";
import { Footer } from "@/components/molecules/Footer";
import { HeroSection } from "@/components/organisms/HeroSection";
import { SistemasAlimentariosSection } from "@/components/organisms/SistemasAlimentariosSection";
import { FeatureCardsSection, type Feature } from "@/components/organisms/FeatureCardsSection";
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

// Solo 2 tarjetas — la de "Asistente IA" se ocultó a pedido del cliente, y los
// botones de CTA se ocultaron (sin `cta`) porque el guion de copy los marcó como "Nada".
const FEATURES: Feature[] = [
    {
        icon: Map,
        title: "Mapa Interactivo",
        description:
            "Descubre proyectos que están replanteando la forma en que conocemos, producimos, distribuimos y consumimos alimentos hacia procesos compatibles con la salud, la vida y la justicia social.",
    },
    {
        icon: BarChart2,
        title: "Métricas de Impacto",
        description:
            "Conoce la realidad de los sistemas de alimentación en México y Centroamérica a través de datos, mapas e indicadores que muestran sus retos y oportunidades.",
    },
];

export default function HomePage() {
    return (
        <main className="w-full bg-white">
            <HeroSection
                links={NAV_LINKS}
            />
            <SistemasAlimentariosSection />
            <FeatureCardsSection features={FEATURES} />
            <ChatbotHighlightSection />
            <EcosystemMapSection />
            <IndicatorsDashboardSection />
            <ConversionBannerSection />
            <Footer />
        </main>
    );
}
