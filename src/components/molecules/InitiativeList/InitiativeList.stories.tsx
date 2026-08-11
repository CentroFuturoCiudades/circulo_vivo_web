import type { Meta, StoryObj } from "@storybook/react";
import { InitiativeList } from "./InitiativeList";

const meta: Meta<typeof InitiativeList> = {
  title: "Molecules/InitiativeList",
  component: InitiativeList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-[280px] h-[600px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof InitiativeList>;

const items = [
  {
    id: "1",
    title: "Del Comalli Nixtamal",
    chips: [
      { label: "CDMX",         color: "gold"   as const },
      { label: "Alimentación", color: "purple" as const },
      { label: "Privada",      color: "teal"   as const },
    ],
  },
  {
    id: "2",
    title: "microTERRA",
    chips: [
      { label: "CDMX",         color: "gold"   as const },
      { label: "Alimentación", color: "purple" as const },
      { label: "Privada",      color: "teal"   as const },
    ],
  },
  {
    id: "3",
    title: "Red Socioambiental",
    chips: [
      { label: "CDMX",         color: "gold"   as const },
      { label: "Alimentación", color: "purple" as const },
      { label: "Privada",      color: "teal"   as const },
    ],
  },
  {
    id: "4",
    title: "Semillas de Vida",
    chips: [
      { label: "CDMX",         color: "gold"   as const },
      { label: "Alimentación", color: "purple" as const },
      { label: "Privada",      color: "teal"   as const },
    ],
  },
];

export const Default: Story = {
  args: { items, label: "Iniciativas", selectedId: "1" },
};

export const ManyItems: Story = {
  args: {
    label: "Iniciativas",
    items: Array.from({ length: 8 }, (_, i) => ({
      id: String(i + 1),
      title: `Iniciativa ${i + 1}`,
      chips: [{ label: "CDMX", color: "gold" as const }],
    })),
  },
};
