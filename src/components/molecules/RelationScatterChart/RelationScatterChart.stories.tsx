import type { Meta, StoryObj } from "@storybook/react";
import { RelationScatterChart, type RelationScatterPoint } from "./RelationScatterChart";

const POINTS: RelationScatterPoint[] = Array.from({ length: 32 }, (_, i) => ({
  x: Math.round(Math.random() * 100),
  y: Math.round(Math.random() * 100),
  label: `Estado ${i + 1}`,
}));

const meta: Meta<typeof RelationScatterChart> = {
  title: "Molecules/RelationScatterChart",
  component: RelationScatterChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-[560px] bg-white p-6 rounded-2xl border border-[#d1c6cf]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof RelationScatterChart>;

export const Default: Story = {
  args: {
    points: POINTS,
    highlightLabel: "Estado 5",
    xLabel: "Volumen concesionado (percentil 0-100, 2020)",
    yLabel: "Producción agrícola (normalizada 0-100, 2020)",
    xMin: 0, xMax: 100, yMin: 0, yMax: 100,
  },
};
