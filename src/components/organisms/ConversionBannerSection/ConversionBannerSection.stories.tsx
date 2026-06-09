import type { Meta, StoryObj } from "@storybook/react";
import { ConversionBannerSection } from "./ConversionBannerSection";

const meta: Meta<typeof ConversionBannerSection> = {
  title: "Organisms/ConversionBannerSection",
  component: ConversionBannerSection,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof ConversionBannerSection>;

export const Default: Story = {};

export const CustomCopy: Story = {
  args: {
    title: "Sé parte del cambio sistémico",
    subtitle: "Conecta con actores clave en los sistemas alimentarios de México.",
    ctaLabel: "Registrarme",
    ctaHref: "/registro",
  },
};
