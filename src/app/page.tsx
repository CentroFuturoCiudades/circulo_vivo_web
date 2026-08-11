"use client";

import {
    Map,
    BarChart2,
    Sparkles,
} from "lucide-react";
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
    { label: "Indicadores", href: "/indicadores" },
];

const FEATURES = [
    {
        icon: Map,
        title: "Mapa Interactivo",
        description:
            "Localiza iniciativas de impacto social y ambiental en tiempo real a través de nuestra red georreferenciada.",
        cta: "SABER MÁS",
        href: "/mapa",
    },
    {
        icon: Sparkles,
        title: "Asistente IA",
        description:
            "Consulta tendencias y obtén resúmenes ejecutivos sobre el ecosistema de innovación cívica local.",
        cta: "PROBAR AHORA",
        href: "/chatbot",
    },
    {
        icon: BarChart2,
        title: "Métricas de Impacto",
        description:
            "Visualiza el progreso de los Objetivos de Desarrollo Sostenible con datos duros y actualizados.",
        cta: "VER DATOS",
        href: "/indicadores",
    },
];

export default function HomePage() {
    return (
        <main className="w-full bg-white">
            <HeroSection links={NAV_LINKS} />
            <FeatureCardsSection features={FEATURES} />
            <ChatbotHighlightSection />
            <EcosystemMapSection />
            <IndicatorsDashboardSection />
            <ConversionBannerSection />
            <Footer />
        </main>
    );
}
