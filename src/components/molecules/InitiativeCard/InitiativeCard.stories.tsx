import type { Meta, StoryObj } from "@storybook/react";
import { InitiativeCard } from "./InitiativeCard";

const meta: Meta<typeof InitiativeCard> = {
  title: "Molecules/InitiativeCard",
  component: InitiativeCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-[280px] bg-white/50 rounded-xl overflow-hidden"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof InitiativeCard>;

export const Default: Story = {
  args: {
    title: "Del Comalli Nixtamal",
    chips: [
      { label: "CDMX", color: "gold" },
      { label: "Alimentación", color: "purple" },
      { label: "Privada", color: "teal" },
    ],
  },
};

export const Selected: Story = {
  args: {
    title: "microTIERRA",
    chips: [
      { label: "Nacional", color: "gold" },
      { label: "Agua", color: "secondary" },
      { label: "Privada", color: "teal" },
    ],
    selected: true,
  },
};

export const List: Story = {
  decorators: [
    () => (
      <div className="w-[280px] bg-white/50 rounded-xl overflow-hidden border border-neutral-200">
        <InitiativeCard title="Del Comalli Nixtamal" chips={[{ label: "CDMX", color: "gold" }, { label: "Alimentación", color: "purple" }]} selected />
        <InitiativeCard title="microTIERRA" chips={[{ label: "Nacional", color: "gold" }, { label: "Agua", color: "secondary" }]} />
        <InitiativeCard title="Red Socioambiental" chips={[{ label: "Oaxaca", color: "gold" }, { label: "Semillas", color: "teal" }]} />
        <InitiativeCard title="Semillas de Vida" chips={[{ label: "CDMX", color: "gold" }, { label: "Alimentación", color: "purple" }]} />
      </div>
    ),
  ],
};
