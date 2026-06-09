import type { Meta, StoryObj } from "@storybook/react";
import { EcosystemMapSection } from "./EcosystemMapSection";

const meta: Meta<typeof EcosystemMapSection> = {
  title: "Organisms/EcosystemMapSection",
  component: EcosystemMapSection,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof EcosystemMapSection>;

export const Default: Story = {};

export const CustomCopy: Story = {
  args: {
    title: "Explora el territorio",
    description: "Descubre las iniciativas de transformación alimentaria en tu región.",
    ctaLabel: "Ver el mapa",
    ctaHref: "/mapa",
  },
};
