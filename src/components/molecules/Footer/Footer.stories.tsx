import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Molecules/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};

export const WithCustomColumns: Story = {
  args: {
    columns: [
      {
        heading: "Plataforma",
        links: [
          { label: "Mapa Global", href: "/mapa" },
          { label: "Indicadores", href: "/indicadores" },
          { label: "Metodología", href: "/metodologia" },
        ],
      },
      {
        heading: "Equipo",
        links: [
          { label: "Directivos", href: "/equipo#directivos" },
          { label: "Equipo Técnico", href: "/equipo#tecnico" },
          { label: "Colaboradores", href: "/equipo#colaboradores" },
        ],
      },
      {
        heading: "Contacto",
        links: [
          { label: "hola@circulovivo.org", href: "mailto:hola@circulovivo.org" },
          { label: "CDMX, México", href: "#" },
        ],
      },
    ],
  },
};
