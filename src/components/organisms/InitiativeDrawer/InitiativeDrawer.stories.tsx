"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InitiativeDrawer } from "./InitiativeDrawer";
import { InitiativeDetailCard } from "@/components/molecules/InitiativeDetailCard";
import { InitiativeList } from "@/components/molecules/InitiativeList";

const meta: Meta<typeof InitiativeDrawer> = {
  title: "Organisms/InitiativeDrawer",
  component: InitiativeDrawer,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof InitiativeDrawer>;

// ── Data ─────────────────────────────────────────────────

const initiatives = [
  {
    id: "1",
    title: "Del Comalli Nixtamal",
    chips: [
      { label: "CDMX",         color: "gold"   as const },
      { label: "Alimentación", color: "purple" as const },
      { label: "Privada",      color: "teal"   as const },
    ],
    description: "Producción de tortillas y derivados de maíz criollo mediante procesos tradicionales de nixtamalización, preservando la biodiversidad local y fomentando el comercio justo con productores locales.",
    whatTheyDo: [
      "Nixtamalización artesanal con cal de piedra.",
      "Rescate de variedades de maíz nativo.",
      "Capacitación a productores en técnicas sustentables.",
    ],
    websiteUrl: "https://example.com",
  },
  {
    id: "2",
    title: "microTERRA",
    chips: [
      { label: "CDMX",         color: "gold"   as const },
      { label: "Alimentación", color: "purple" as const },
      { label: "Privada",      color: "teal"   as const },
    ],
    description: "Red de huertos urbanos en zonas periféricas de la CDMX con enfoque comunitario y capacitación a familias en soberanía alimentaria.",
    whatTheyDo: [
      "Instalación de huertos en azoteas y patios.",
      "Talleres de composta y lombricomposta.",
      "Distribución de alimentos en mercados locales.",
    ],
    websiteUrl: "https://example.com",
  },
  {
    id: "3",
    title: "Red Socioambiental",
    chips: [
      { label: "Nacional",     color: "gold"   as const },
      { label: "Agua",         color: "secondary" as const },
      { label: "Social",       color: "teal"   as const },
    ],
    description: "Red de organizaciones civiles que monitorean cuencas hidrográficas y promueven la gestión comunitaria del agua en zonas rurales.",
    whatTheyDo: [
      "Monitoreo de calidad del agua en comunidades.",
      "Talleres de gestión de cuencas.",
      "Incidencia en política pública hídrica.",
    ],
    websiteUrl: "https://example.com",
  },
  {
    id: "4",
    title: "Semillas de Vida",
    chips: [
      { label: "Oaxaca",       color: "gold"   as const },
      { label: "Semillas",     color: "crimson" as const },
      { label: "Comunitaria",  color: "teal"   as const },
    ],
    description: "Rescate y preservación de semillas nativas en comunidades indígenas de la Sierra Norte de Oaxaca.",
    whatTheyDo: [
      "Banco de semillas comunitario.",
      "Intercambios de semillas entre comunidades.",
      "Documentación de saberes tradicionales agrícolas.",
    ],
    websiteUrl: "https://example.com",
  },
];

// ── Isolated stories ──────────────────────────────────────

export const Default: Story = {
  args: { ...initiatives[0], open: true },
};

export const WithImage: Story = {
  args: {
    ...initiatives[0],
    open: true,
    imageUrl: "https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?w=640",
  },
};

// ── Full flow: List → Card → Drawer ──────────────────────

function FullFlowDemo() {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [drawerOpen, setDrawerOpen]  = useState(false);

  const selected = initiatives.find((i) => i.id === selectedId);

  function handleSelect(id: string) {
    setSelectedId(id);
    setDrawerOpen(false); // reset drawer when switching initiative
  }

  function handleCloseCard() {
    setSelectedId(undefined);
    setDrawerOpen(false);
  }

  return (
    <div className="flex items-start h-[700px] bg-neutral-100 rounded-xl overflow-hidden">

      {/* ── Left: InitiativeList ── */}
      <InitiativeList
        items={initiatives}
        selectedId={selectedId}
        onSelect={handleSelect}
        className="h-full flex-shrink-0 rounded-none"
        style={{ width: 280 } as React.CSSProperties}
      />

      {/* ── Center: map + floating card ── */}
      <div className="flex-1 h-full flex items-center justify-center text-neutral-400 font-sans text-sm relative select-none bg-neutral-200">
        <span>[ Mapa interactivo ]</span>

        {/* InitiativeDetailCard — visible when an initiative is selected */}
        {selected && (
          <div className="absolute top-6 right-6" style={{ zIndex: 10 }}>
            <InitiativeDetailCard
              title={selected.title}
              description={selected.description}
              chips={selected.chips}
              websiteUrl={selected.websiteUrl}
              onClose={handleCloseCard}
              onProfileClick={() => setDrawerOpen(true)}
            />
          </div>
        )}
      </div>

      {/* ── Right: InitiativeDrawer — opens on VER FICHA ── */}
      {selected && drawerOpen && (
        <InitiativeDrawer
          {...selected}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          className="h-full flex-shrink-0"
        />
      )}

    </div>
  );
}

export const FullFlow: Story = {
  parameters: { layout: "fullscreen" },
  render: () => <FullFlowDemo />,
};
