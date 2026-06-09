"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InteractiveMap } from "./InteractiveMap";

const meta: Meta<typeof InteractiveMap> = {
  title: "Molecules/InteractiveMap",
  component: InteractiveMap,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof InteractiveMap>;

// ── Sample data: initiatives across Mexico ───────────────

const MARKERS = [
  { id: "1",  lat: 19.4326, lng: -99.1332,  title: "Del Comalli Nixtamal",    color: "#708b8d" }, // CDMX
  { id: "2",  lat: 20.6597, lng: -103.3496, title: "microTERRA",              color: "#708b8d" }, // GDL
  { id: "3",  lat: 25.6866, lng: -100.3161, title: "Red Socioambiental",      color: "#395284" }, // MTY
  { id: "4",  lat: 17.0732, lng: -96.7266,  title: "Semillas de Vida",        color: "#561427" }, // Oaxaca
  { id: "5",  lat: 20.9674, lng: -89.5926,  title: "Huertos Yucatán",         color: "#bcb884" }, // Mérida
  { id: "6",  lat: 29.0729, lng: -110.9559, title: "Cooperativa Sonora",      color: "#395284" }, // Hermosillo
  { id: "7",  lat: 19.7010, lng: -101.1844, title: "Agroecología Michoacán",  color: "#582a56" }, // Morelia
  { id: "8",  lat: 21.8818, lng: -102.2916, title: "Red Aguascalientes",      color: "#bcb884" }, // Aguascalientes
  { id: "9",  lat: 18.9242, lng: -99.2216,  title: "Huertos Cuernavaca",      color: "#708b8d" }, // Cuernavaca
  { id: "10", lat: 31.8686, lng: -116.5978, title: "Vitivinícola Ensenada",   color: "#395284" }, // Ensenada
  { id: "11", lat: 22.1565, lng: -100.9855, title: "Maíz Nativo SLP",         color: "#561427" }, // SLP
  { id: "12", lat: 16.7569, lng: -93.1292,  title: "Cafetaleros Chiapas",     color: "#bcb884" }, // Tuxtla
];

export const Default: Story = {
  args: { markers: MARKERS },
};

export const WithSelected: Story = {
  args: {
    markers: MARKERS,
    selectedId: "1",
  },
};

function InteractiveDemo() {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <InteractiveMap
        markers={MARKERS}
        selectedId={selectedId}
        onMarkerClick={(id) => setSelectedId((prev) => (prev === id ? undefined : id))}
      />
      {selectedId && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-xl px-5 py-3 shadow-lg font-sans text-sm text-[#1c1c18]">
          Seleccionada: <strong>{MARKERS.find((m) => m.id === selectedId)?.title}</strong>
        </div>
      )}
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
  decorators: [
    (Story) => (
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Story />
      </div>
    ),
  ],
};

export const FewMarkers: Story = {
  args: { markers: MARKERS.slice(0, 4) },
};
