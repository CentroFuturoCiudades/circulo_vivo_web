import type { Meta, StoryObj } from "@storybook/react";
import { DataCard } from "./DataCard";

const meta: Meta<typeof DataCard> = {
  title: "Molecules/DataCard",
  component: DataCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-[460px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof DataCard>;

export const Default: Story = {
  args: {
    title: "Dispersión: Indicador × IISE",
    subtitle: "Correlación por variable de indicador",
    badge: "Mortalidad Diabetes",
    badgeColor: "purple",
    miniStats: [
      { label: "Correlación", value: "0.84", color: "gold" },
      { label: "Desv. Est.",  value: "14.8", color: "blue" },
      { label: "Mínimo",     value: "15.1", color: "rose" },
      { label: "Máximo",     value: "95.2", color: "teal" },
    ],
  },
};

export const WithContent: Story = {
  args: {
    title: "Ganancia HSE por Estado",
    subtitle: "Distribución histórica de variaciones anuales",
    children: (
      <div className="h-40 bg-neutral-50 rounded-lg flex items-center justify-center text-neutral-400 text-sm font-sans">
        Área de gráfica
      </div>
    ),
  },
};

export const NoStats: Story = {
  args: {
    title: "Top 8 Ganadores de Impacto",
    subtitle: "Selección de estados con mayor HSE 2023",
    badge: "1 año HSE",
    badgeColor: "teal",
    children: (
      <div className="h-48 bg-neutral-50 rounded-lg flex items-center justify-center text-neutral-400 text-sm font-sans">
        Área de gráfica
      </div>
    ),
  },
};
