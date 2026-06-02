"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InitiativeDetailCard } from "./InitiativeDetailCard";

const meta: Meta<typeof InitiativeDetailCard> = {
  title: "Molecules/InitiativeDetailCard",
  component: InitiativeDetailCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-[320px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof InitiativeDetailCard>;

const base = {
  title: "Del Comalli Nixtamal",
  description: "Producción de tortillas y derivados de maíz criollo mediante procesos tradicionales de nixtamalización, preservando la biodiversidad local.",
  chips: [
    { label: "CDMX",         color: "gold"   },
    { label: "ALIMENTACIÓN", color: "purple" },
    { label: "PRIVADA",      color: "teal"   },
  ],
  profileUrl: "#",
  websiteUrl: "#",
};

export const Single: Story = {
  args: { ...base, onClose: () => {} },
};

export const WithImage: Story = {
  args: {
    ...base,
    imageUrl: "https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?w=640",
    onClose: () => {},
  },
};

function PaginatorDemo() {
  const initiatives = [
    { ...base, title: "Del Comalli Nixtamal" },
    { ...base, title: "microTERRA", description: "Red de huertos urbanos en zonas periféricas de la CDMX con enfoque comunitario." },
    { ...base, title: "Semillas de Vida", description: "Rescate de semillas nativas en comunidades indígenas de Oaxaca." },
  ];
  const [idx, setIdx] = useState(0);
  const item = initiatives[idx];

  return (
    <InitiativeDetailCard
      {...item}
      onClose={() => {}}
      total={initiatives.length}
      current={idx + 1}
      onPrev={() => setIdx((i) => Math.max(0, i - 1))}
      onNext={() => setIdx((i) => Math.min(initiatives.length - 1, i + 1))}
    />
  );
}

export const WithPaginator: Story = {
  render: () => <PaginatorDemo />,
};
