import { InitiativesMap } from "@/components/organisms/InitiativesMap";
import type { Initiative } from "@/components/organisms/InitiativesMap";
import { MapFooter } from "@/components/molecules/MapFooter";

// Temporary seed data — replace with API fetch when the endpoint is ready
const INITIATIVES: Initiative[] = [
  {
    id: "1",
    lat: 19.4326,
    lng: -99.1332,
    title: "Del Comalli Nixtamal",
    chips: [
      { label: "CDMX",         color: "gold"   },
      { label: "Alimentación", color: "purple" },
      { label: "Privada",      color: "teal"   },
    ],
    description:
      "Producción de tortillas y derivados de maíz criollo mediante procesos tradicionales de nixtamalización, preservando la biodiversidad local y fomentando el comercio justo.",
    whatTheyDo: [
      "Nixtamalización artesanal con cal de piedra.",
      "Rescate de variedades de maíz nativo.",
      "Capacitación a productores en técnicas sustentables.",
    ],
    websiteUrl: "https://example.com",
  },
  {
    id: "2",
    lat: 20.6597,
    lng: -103.3496,
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
];

export default function MapaPage() {
  return (
    <main className="flex flex-col h-screen w-full">
      <h1 className="sr-only">Mapa de iniciativas</h1>
      <InitiativesMap initiatives={INITIATIVES} className="w-full flex-1 min-h-0" />
      <MapFooter />
    </main>
  );
}
