import type { Meta, StoryObj } from "@storybook/react";
import { StatCounter } from "./StatCounter";

const meta: Meta<typeof StatCounter> = {
  title: "Atoms/StatCounter",
  component: StatCounter,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof StatCounter>;

export const Light: Story = {
  parameters: { backgrounds: { default: "dark" } },
  args: { value: "+450", label: "HORAS DE ENTREVISTAS", color: "light" },
};
export const Gold: Story = {
  parameters: { backgrounds: { default: "dark" } },
  args: { value: "$2.4M", label: "FONDOS APLICADOS", color: "gold" },
};
export const Dark: Story = {
  args: { value: "100%", label: "OPEN ACCESS", color: "dark" },
};

export const StatBar: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: () => (
    <div className="flex gap-16 bg-secondary p-12">
      <StatCounter value="+450"  label="HORAS DE ENTREVISTAS" color="light" />
      <StatCounter value="12+"   label="INSTITUCIONES ALIADAS" color="light" />
      <StatCounter value="$2.4M" label="FONDOS APLICADOS" color="gold" />
      <StatCounter value="100%"  label="OPEN ACCESS" color="light" />
    </div>
  ),
};
