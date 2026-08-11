import type { Meta, StoryObj } from "@storybook/react";
import { KPICard } from "./KPICard";

const meta: Meta<typeof KPICard> = {
  title: "Molecules/KPICard",
  component: KPICard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-[389px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof KPICard>;

export const Teal: Story = {
  args: {
    accent: "teal",
    label: "Promedio Nacional IISE",
    value: "0.542",
    change: "+15%",
    target: "Meta 2030: 0.750",
    sourcesLabel: "Fuentes de Información",
    sources: "Fuentes: ENSANUT 2022, CONEVAL 2023, INEGI Censo de Población 2020.",
  },
};

export const Navy: Story = {
  args: {
    accent: "navy",
    label: "Estados Resilientes",
    value: "08 de 32",
    change: "+2",
    target: "Meta 2030: 20 de 32",
    sourcesLabel: "Fuentes de Información",
    sources: "Fuentes: CONEVAL 2023, INEGI 2022.",
  },
};

export const Gold: Story = {
  args: {
    accent: "gold",
    label: "Impacto Programático",
    value: "84%",
    change: "+6%",
    target: "Meta 2030: 95%",
    sourcesLabel: "Fuentes de Información",
    sources: "Fuentes: Evaluación de impacto SHCP 2023.",
  },
};

export const ValueOnly: Story = {
  args: {
    accent: "teal",
    label: "Promedio Nacional IISE",
    value: "0.542",
    change: "+15%",
  },
};

export const WithTarget: Story = {
  args: {
    accent: "navy",
    label: "Cobertura Alimentaria",
    value: "67%",
    change: "+3%",
    target: "Meta 2030: 90%",
  },
};

export const Row: Story = {
  decorators: [
    () => (
      <div className="grid grid-cols-3 gap-4 w-[1216px]">
        <KPICard
          accent="teal"
          label="Promedio Nacional IISE"
          value="0.542"
          change="+15%"
          target="Meta 2030: 0.750"
          sourcesLabel="Fuentes de Información"
          sources="Fuentes: ENSANUT 2022, CONEVAL 2023, INEGI Censo de Población 2020."
        />
        <KPICard
          accent="navy"
          label="Estados Resilientes"
          value="08 de 32"
          change="+2"
          target="Meta 2030: 20 de 32"
          sourcesLabel="Fuentes de Información"
          sources="Fuentes: CONEVAL 2023, INEGI 2022."
        />
        <KPICard
          accent="gold"
          label="Impacto Programático"
          value="84%"
          change="+6%"
          target="Meta 2030: 95%"
          sourcesLabel="Fuentes de Información"
          sources="Fuentes: Evaluación de impacto SHCP 2023."
        />
      </div>
    ),
  ],
};
