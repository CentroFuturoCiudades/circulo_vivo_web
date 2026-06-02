import type { Meta, StoryObj } from "@storybook/react";
import { FeatureCard } from "./FeatureCard";
import { MapPin, MessageCircle, BarChart2 } from "lucide-react";

const meta: Meta<typeof FeatureCard> = {
  title: "Molecules/FeatureCard",
  component: FeatureCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-[330px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof FeatureCard>;

export const MapaInteractivo: Story = {
  args: {
    icon: MapPin,
    title: "Mapa Interactivo",
    description: "Localiza iniciativas de impacto social y ambiental en tiempo real a través de nuestra red georreferenciada.",
    ctaLabel: "Saber más",
    accent: "crimson",
  },
};

export const AsistenteIA: Story = {
  args: {
    icon: MessageCircle,
    title: "Asistente IA",
    description: "Consulta tendencias y obtén resúmenes ejecutivos sobre el ecosistema de innovación cívica local.",
    ctaLabel: "Probar ahora",
    accent: "crimson",
  },
};

export const MetricasImpacto: Story = {
  args: {
    icon: BarChart2,
    title: "Métricas de Impacto",
    description: "Visualiza el progreso de los Objetivos de Desarrollo Sostenible con datos duros y actualizados.",
    ctaLabel: "Ver datos",
    accent: "purple",
  },
};

export const FeatureGrid: Story = {
  decorators: [
    () => (
      <div
        className="grid gap-0 px-16 py-12"
        style={{
          gridTemplateColumns: "repeat(3, 330px)",
          background: "linear-gradient(135deg, #ffffffff 0%, rgba(222,212,176,0.3) 50%, rgba(209,198,207,0.3) 100%)",
        }}
      >
        <FeatureCard icon={MapPin}       title="Mapa Interactivo"   description="Localiza iniciativas de impacto social y ambiental en tiempo real a través de nuestra red georreferenciada."  ctaLabel="Saber más"    accent="crimson" />
        <FeatureCard icon={MessageCircle} title="Asistente IA"       description="Consulta tendencias y obtén resúmenes ejecutivos sobre el ecosistema de innovación cívica local."              ctaLabel="Probar ahora" accent="crimson" />
        <FeatureCard icon={BarChart2}     title="Métricas de Impacto" description="Visualiza el progreso de los Objetivos de Desarrollo Sostenible con datos duros y actualizados."              ctaLabel="Ver datos"    accent="purple" />
      </div>
    ),
  ],
};
