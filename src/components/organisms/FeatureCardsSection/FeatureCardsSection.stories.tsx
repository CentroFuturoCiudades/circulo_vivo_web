import type { Meta, StoryObj } from "@storybook/react";
import { Map, Sparkles, BarChart2 } from "lucide-react";
import { FeatureCardsSection } from "./FeatureCardsSection";

const meta: Meta<typeof FeatureCardsSection> = {
  title: "Organisms/FeatureCardsSection",
  component: FeatureCardsSection,
  tags: ["autodocs"],
  parameters: { layout: "padded", backgrounds: { default: "white" } },
};
export default meta;
type Story = StoryObj<typeof FeatureCardsSection>;

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

export const Default: Story = {
  args: { features: FEATURES },
};

export const TwoCards: Story = {
  args: { features: FEATURES.slice(0, 2) },
};

export const SingleCard: Story = {
  args: { features: [FEATURES[0]] },
};
