import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "lucide-react";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Atoms/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: { color: { control: "select", options: ["teal","crimson","gold","secondary","neutral"] } },
};
export default meta;
type Story = StoryObj<typeof Chip>;

export const Teal: Story = { args: { color: "teal", children: "Estrategias" } };
export const TealSelected: Story = { args: { color: "teal", selected: true, children: "Estrategias" } };
export const Crimson: Story = { args: { color: "crimson", children: "Barreras" } };
export const Gold: Story = { args: { color: "gold", children: "Actores" } };
export const Secondary: Story = { args: { color: "secondary", children: "Huertos Escolares" } };
export const Neutral: Story = { args: { color: "neutral", children: "Neutral" } };
export const WithIcon: Story = { args: { color: "teal", icon: Tag, children: "Categoría" } };

export const FilterGroup: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Chip color="teal" selected>Estrategias</Chip>
      <Chip color="crimson">Barreras</Chip>
      <Chip color="gold">Actores</Chip>
      <Chip color="secondary">Huertos Escolares</Chip>
      <Chip color="neutral">Todos</Chip>
    </div>
  ),
};
