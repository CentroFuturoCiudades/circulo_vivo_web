import type { Meta, StoryObj } from "@storybook/react";
import { HeroSection } from "./HeroSection";

const meta: Meta<typeof HeroSection> = {
  title: "Organisms/HeroSection",
  component: HeroSection,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof HeroSection>;

const LINKS = [
  { label: "Inicio",      href: "/",            active: true },
  { label: "Equipo",      href: "/equipo" },
  { label: "Mapa",        href: "/mapa" },
  { label: "Chatbot",     href: "/chatbot" },
  { label: "Indicadores", href: "/indicadores" },
];

export const Default: Story = {
  args: { links: LINKS },
};

export const CustomContent: Story = {
  args: {
    links: LINKS,
    primaryCta: "Explorar Mapa",
    secondaryCta: "Ver Demostración",
    subtitle:
      "Plataforma de inteligencia territorial para transformar los sistemas alimentarios de México.",
  },
};
