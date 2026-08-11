import type React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InitiativesMap } from "./InitiativesMap";
import type { Initiative } from "./InitiativesMap";
import { MapFooter } from "@/components/molecules/MapFooter";

const PAGE_WRAPPER: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundImage:
    "linear-gradient(rgba(250,248,245,0.55), rgba(250,248,245,0.55)), url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  overflow: "hidden",
};

const meta: Meta<typeof InitiativesMap> = {
  title: "Organisms/InitiativesMap",
  component: InitiativesMap,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div style={PAGE_WRAPPER}>
        <Story className="flex-1 min-h-0" />
        <MapFooter />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof InitiativesMap>;

const INITIATIVES: Initiative[] = [
  {
    id: "1",
    state: "Ciudad de México",
    title: "Del Comalli Nixtamal",
    chips: [
      { label: "Ciudad de México", color: "gold"      },
      { label: "Sector privado",   color: "teal"      },
      { label: "Producción",       color: "teal"      },
      { label: "Local",            color: "secondary" },
    ],
    description:
      "Producción de tortillas y derivados de maíz criollo mediante procesos tradicionales de nixtamalización, preservando la biodiversidad local y fomentando el comercio justo.",
    whatTheyDo: [
      "Nixtamalización artesanal con cal de piedra.",
      "Rescate de variedades de maíz nativo.",
      "Capacitación a productores en técnicas sustentables.",
    ],
    websiteUrl: "https://example.com",
    imageUrl: "https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?w=640",
  },
  {
    id: "2",
    state: "Ciudad de México",
    presenceStates: ["Jalisco", "Oaxaca"],
    title: "microTERRA",
    chips: [
      { label: "Ciudad de México", color: "gold"      },
      { label: "Sociedad civil",   color: "secondary" },
      { label: "Producción",       color: "teal"      },
      { label: "Nacional",         color: "secondary" },
    ],
    description:
      "Red de huertos urbanos en zonas periféricas de la CDMX con enfoque comunitario y capacitación a familias en soberanía alimentaria.",
    websiteUrl: "https://example.com",
  },
  {
    id: "3",
    state: "Jalisco",
    title: "Red Socioambiental",
    chips: [
      { label: "Jalisco",        color: "gold"      },
      { label: "Sociedad civil", color: "secondary" },
      { label: "Consumo y acceso", color: "gold"    },
      { label: "Regional",       color: "secondary" },
    ],
    description:
      "Red de organizaciones civiles que monitorean cuencas hidrográficas y promueven la gestión comunitaria del agua en zonas rurales.",
    websiteUrl: "https://example.com",
  },
  {
    id: "4",
    state: "Oaxaca",
    title: "Semillas de Vida",
    chips: [
      { label: "Oaxaca",         color: "gold"      },
      { label: "Sociedad civil", color: "secondary" },
      { label: "Producción",     color: "teal"      },
      { label: "Local",          color: "secondary" },
    ],
    description:
      "Rescate y preservación de semillas nativas en comunidades indígenas de la Sierra Norte de Oaxaca.",
    websiteUrl: "https://example.com",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=640",
  },
  {
    id: "5",
    state: "Nuevo León",
    title: "Agroecología Norte",
    chips: [
      { label: "Nuevo León",   color: "gold"      },
      { label: "Academia",     color: "purple"    },
      { label: "Producción",   color: "teal"      },
      { label: "Estatal",      color: "secondary" },
    ],
    description:
      "Programa de transición agroecológica para pequeños productores del área metropolitana de Monterrey.",
    websiteUrl: "https://example.com",
  },
];

export const Default: Story = {
  args: { initiatives: INITIATIVES },
};

export const Empty: Story = {
  args: { initiatives: [] },
};
