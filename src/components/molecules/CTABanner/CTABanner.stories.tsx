import type { Meta, StoryObj } from "@storybook/react";
import { CTABanner } from "./CTABanner";
import { Button } from "@/components/atoms/Button";

const meta: Meta<typeof CTABanner> = {
  title: "Molecules/CTABanner",
  component: CTABanner,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof CTABanner>;

export const Default: Story = {
  args: {
    title: "Únete a la red de transformación",
    subtitle: "Impulsa proyectos con impacto sistémico real.",
    action: (
      <Button color="gold" radius="none" size="lg">
        Solicitar Acceso
      </Button>
    ),
  },
};

export const Research: Story = {
  args: {
    title: "Colabora con nosotros",
    subtitle: "Conecta con investigadores y actores clave del sistema alimentario mexicano.",
    action: (
      <Button color="gold" radius="full" size="lg">
        Explorar Hallazgos
      </Button>
    ),
  },
};

export const NoSubtitle: Story = {
  args: {
    title: "¿Cuál es tu red de transformación?",
    action: (
      <Button color="gold" radius="none" size="lg">
        Solicitar Acceso
      </Button>
    ),
  },
};
