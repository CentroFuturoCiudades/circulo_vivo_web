import type { Meta, StoryObj } from "@storybook/react";
import { GradientScale } from "./GradientScale";

const meta: Meta<typeof GradientScale> = {
  title: "Atoms/GradientScale",
  component: GradientScale,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-[480px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof GradientScale>;

export const Default: Story = {};

export const CustomGradient: Story = {
  args: {
    title: "ESCALA DE IMPACTO",
    optimalLabel: "MÁXIMO",
    gradient: "linear-gradient(to right, #e8edf5, #395284)",
    stops: [
      { range: "0–25",  label: "Bajo" },
      { range: "25–50", label: "Medio" },
      { range: "50–75", label: "Alto" },
      { range: "75–100",label: "Crítico" },
    ],
  },
};
