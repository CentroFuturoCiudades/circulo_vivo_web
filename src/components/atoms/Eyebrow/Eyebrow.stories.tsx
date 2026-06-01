import type { Meta, StoryObj } from "@storybook/react";
import { Eyebrow } from "./Eyebrow";

const meta: Meta<typeof Eyebrow> = {
  title: "Atoms/Eyebrow",
  component: Eyebrow,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Eyebrow>;

export const Secondary: Story = { args: { color: "secondary", children: "REPOSITORIO" } };
export const Teal: Story = { args: { color: "teal", children: "CON ALIANZAS CLAVE" } };
export const Gold: Story = { args: { color: "gold", children: "PROYECTO INSTITUCIONAL" } };
export const White: Story = {
  parameters: { backgrounds: { default: "dark" } },
  args: { color: "white", children: "FORMA PARTE DEL CAMBIO" },
};
export const NoDot: Story = { args: { color: "secondary", dot: false, children: "PROBLEMÁTICA" } };
