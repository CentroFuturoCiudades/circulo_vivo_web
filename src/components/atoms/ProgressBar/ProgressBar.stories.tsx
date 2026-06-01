import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "Atoms/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Gold70: Story = { args: { value: 70, label: "PROGRESANDO", color: "gold" } };
export const TealComplete: Story = { args: { value: 100, label: "COMPLETADO", color: "teal" } };
export const Secondary45: Story = { args: { value: 45, label: "EN PROCESO", color: "secondary" } };
export const Crimson30: Story = { args: { value: 30, label: "INICIANDO", color: "crimson" } };
export const NoLabel: Story = { args: { value: 60, showValue: false } };

export const MultipleProgress: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <ProgressBar value={70}  label="INMERSIÓN RADICAL"    color="gold" />
      <ProgressBar value={45}  label="ANÁLISIS SISTÉMICO"   color="teal" />
      <ProgressBar value={100} label="MARCO CONCEPTUAL"     color="secondary" />
      <ProgressBar value={20}  label="VALIDACIÓN DE CAMPO"  color="crimson" />
    </div>
  ),
};
