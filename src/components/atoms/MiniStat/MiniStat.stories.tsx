import type { Meta, StoryObj } from "@storybook/react";
import { MiniStat } from "./MiniStat";

const meta: Meta<typeof MiniStat> = {
  title: "Atoms/MiniStat",
  component: MiniStat,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof MiniStat>;

export const Gold: Story = { args: { label: "CORRELACIÓN", value: "0.84", color: "gold" } };
export const Blue: Story = { args: { label: "DESV. EST.", value: "14.8", color: "blue" } };
export const Rose: Story = { args: { label: "MÍNIMO", value: "15.1", color: "rose" } };
export const Neutral: Story = { args: { label: "MÁXIMO", value: "95.2", color: "neutral" } };
export const Teal: Story = { args: { label: "PROMEDIO", value: "0.62", color: "teal" } };

export const StatRow: Story = {
  render: () => (
    <div className="flex gap-3">
      <MiniStat label="CORRELACIÓN" value="0.84" color="gold" />
      <MiniStat label="DESV. EST."  value="14.8" color="blue" />
      <MiniStat label="MÍNIMO"      value="15.1" color="rose" />
      <MiniStat label="MÁXIMO"      value="95.2" color="neutral" />
    </div>
  ),
};
