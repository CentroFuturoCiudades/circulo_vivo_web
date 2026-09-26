"use client";
import type { Meta, StoryObj } from "@storybook/react";
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
    { label: "CDMX",         color: "gold"   as const },
    { label: "ALIMENTACIÓN", color: "purple" as const },
    { label: "PRIVADA",      color: "teal"   as const },
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
