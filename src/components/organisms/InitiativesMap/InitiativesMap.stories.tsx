import type React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InitiativesMap } from "./InitiativesMap";
import type { Initiative } from "./InitiativesMap";
import { MapFooter } from "@/components/molecules/MapFooter";

// Simulates the map page: background image + warm white overlay + MapFooter at bottom
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

// ── Sample data ───────────────────────────────────────────

const INITIATIVES: Initiative[] = [
  {
    id: "1",
    lat: 19.4326,
    lng: -99.1332,
    state: "Ciudad de México",
    title: "Del Comalli Nixtamal",
    chips: [
      { label: "CDMX",         color: "gold"    },
      { label: "Alimentación", color: "purple"  },
      { label: "Privada",      color: "teal"    },
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
    lat: 19.3000,
    lng: -99.0500,
    state: "Ciudad de México",
    title: "microTERRA",
    chips: [
      { label: "CDMX",         color: "gold"    },
      { label: "Huertos",      color: "teal"    },
      { label: "Comunitaria",  color: "secondary" },
    ],
    description:
      "Red de huertos urbanos en zonas periféricas de la CDMX con enfoque comunitario y capacitación a familias en soberanía alimentaria.",
    whatTheyDo: [
      "Instalación de huertos en azoteas y patios.",
      "Talleres de composta y lombricomposta.",
      "Distribución de alimentos en mercados locales.",
    ],
    websiteUrl: "https://example.com",
  },
  {
    id: "3",
    lat: 20.6597,
    lng: -103.3496,
    state: "Jalisco",
    title: "Red Socioambiental",
    chips: [
      { label: "Jalisco",   color: "gold"      },
      { label: "Agua",      color: "secondary" },
      { label: "Social",    color: "teal"      },
    ],
    description:
      "Red de organizaciones civiles que monitorean cuencas hidrográficas y promueven la gestión comunitaria del agua en zonas rurales.",
    whatTheyDo: [
      "Monitoreo de calidad del agua en comunidades.",
      "Talleres de gestión de cuencas.",
      "Incidencia en política pública hídrica.",
    ],
    websiteUrl: "https://example.com",
  },
  {
    id: "4",
    lat: 17.0732,
    lng: -96.7266,
    state: "Oaxaca",
    markerColor: "#bc8470",
    title: "Semillas de Vida",
    chips: [
      { label: "Oaxaca",      color: "gold"    },
      { label: "Semillas",    color: "crimson" },
      { label: "Comunitaria", color: "teal"    },
    ],
    description:
      "Rescate y preservación de semillas nativas en comunidades indígenas de la Sierra Norte de Oaxaca.",
    whatTheyDo: [
      "Banco de semillas comunitario.",
      "Intercambios de semillas entre comunidades.",
      "Documentación de saberes tradicionales agrícolas.",
    ],
    websiteUrl: "https://example.com",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=640",
  },
  {
    id: "5",
    lat: 25.6714,
    lng: -100.3090,
    state: "Nuevo León",
    title: "Agroecología Norte",
    chips: [
      { label: "NL",         color: "gold"  },
      { label: "Suelo",      color: "teal"  },
      { label: "Educación",  color: "purple" },
    ],
    description:
      "Programa de transición agroecológica para pequeños productores del área metropolitana de Monterrey.",
    whatTheyDo: [
      "Diagnósticos de suelo y fertilidad.",
      "Capacitación en agricultura regenerativa.",
      "Vinculación con mercados orgánicos.",
    ],
    websiteUrl: "https://example.com",
  },
];

// ── Stories ───────────────────────────────────────────────

export const Default: Story = {
  args: {
    initiatives: INITIATIVES,
  },
};

export const Empty: Story = {
  args: {
    initiatives: [],
  },
};
