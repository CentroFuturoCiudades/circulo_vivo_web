import type { Meta, StoryObj } from "@storybook/react";
import { DataSourcesBar } from "./DataSourcesBar";

const meta: Meta<typeof DataSourcesBar> = {
  title: "Molecules/DataSourcesBar",
  component: DataSourcesBar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof DataSourcesBar>;

export const Default: Story = {};

export const CustomSources: Story = {
  args: {
    sources: "Fuentes: INEGI 2023, CONAPO 2022, Secretaría de Salud 2023.",
    links: [
      { label: "Metodología",   href: "/metodologia" },
      { label: "Descargar CSV", href: "/datos/csv" },
    ],
  },
};

export const Minimal: Story = {
  args: {
    sources: "Círculo Vivo, 2024. Metodología propia.",
    links: [{ label: "Metodología", href: "#" }],
  },
};
