import type { Meta, StoryObj } from "@storybook/react";
import { LegendItem } from "./LegendItem";

const meta: Meta<typeof LegendItem> = {
  title: "Atoms/LegendItem",
  component: LegendItem,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof LegendItem>;

export const Crimson: Story = { args: { value: 12, label: "Críticos",    color: "crimson" } };
export const Navy:   Story = { args: { value:  8, label: "Vulnerables", color: "navy" } };
export const Teal:   Story = { args: { value:  7, label: "Transición",  color: "teal" } };
export const Gold:   Story = { args: { value:  5, label: "Resilientes", color: "gold" } };

export const MapLegend: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <LegendItem value={12} label="Críticos"    color="crimson" />
      <LegendItem value={8}  label="Vulnerables" color="navy" />
      <LegendItem value={7}  label="Transición"  color="teal" />
      <LegendItem value={5}  label="Resilientes" color="gold" />
    </div>
  ),
};
