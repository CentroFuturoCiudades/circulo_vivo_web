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

export const TealAccent: Story = {
  args: {
    accent: "teal",
    label: "Promedio Nacional IISE",
    value: "0.542",
    change: "+15%",
    subtext: "Meta 2030: 0.750",
  },
};

export const NavyWithProgress: Story = {
  args: {
    accent: "navy",
    label: "Estados Resilientes",
    value: "08 de 32",
    change: "+2",
    progress: 26,
  },
};

export const GoldAccent: Story = {
  args: {
    accent: "gold",
    label: "Impacto Programático",
    value: "84%",
    changeSuffix: "Cobertura",
    subtext: "Población beneficiada: 14.3M",
  },
};

export const Row: Story = {
  decorators: [
    () => (
      <div className="grid grid-cols-3 gap-4 w-[1216px]">
        <KPICard accent="teal"  label="Promedio Nacional IISE" value="0.542" change="+15%" subtext="Meta 2030: 0.750" />
        <KPICard accent="navy"  label="Estados Resilientes" value="08 de 32" change="+2" progress={26} />
        <KPICard accent="gold"  label="Impacto Programático" value="84%" changeSuffix="Cobertura" subtext="Población beneficiada: 14.3M" />
      </div>
    ),
  ],
};
