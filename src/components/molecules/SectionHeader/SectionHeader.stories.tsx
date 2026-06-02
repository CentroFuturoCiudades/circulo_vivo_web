import type { Meta, StoryObj } from "@storybook/react";
import { SectionHeader } from "./SectionHeader";

const meta: Meta<typeof SectionHeader> = {
  title: "Molecules/SectionHeader",
  component: SectionHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = {
  args: {
    eyebrow: "Repositorio",
    title: "Visualiza lo invisible",
    description: "Datos territoriales, alianzas estratégicas y métricas de impacto en un solo lugar.",
  },
};

export const Centered: Story = {
  args: {
    eyebrow: "Proyecto Institucional",
    eyebrowColor: "gold",
    title: "¿Quiénes somos?",
    description: "Circulo Vivo es una plataforma de datos e inteligencia territorial para el sistema alimentario de México.",
    align: "center",
  },
};

export const NoEyebrow: Story = {
  args: {
    title: "Mapa de Iniciativas",
    description: "Explora las iniciativas de transformación alimentaria en todo el territorio nacional.",
  },
};

export const NoDescription: Story = {
  args: {
    eyebrow: "Con Alianzas Clave",
    eyebrowColor: "teal",
    title: "Colaboraciones estratégicas",
  },
};

export const OnDark: Story = {
  args: {
    eyebrow: "Forma Parte del Cambio",
    eyebrowColor: "white",
    title: "Únete a la red de transformación",
    description: "Conecta con actores clave del sistema alimentario mexicano.",
    titleColor: "#ffffff",
    descriptionColor: "#ffffff99",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};
