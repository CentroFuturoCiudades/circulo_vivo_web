import type { Meta, StoryObj } from "@storybook/react";
import { ChatSidebar } from "./ChatSidebar";

const meta: Meta<typeof ChatSidebar> = {
  title: "Organisms/ChatSidebar",
  component: ChatSidebar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="h-[600px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof ChatSidebar>;

const topics = [
  { label: "Barreras Logísticas" },
  { label: "Costo de Insumos" },
  { label: "Apoyo Institucional" },
  { label: "Financiamiento" },
  { label: "Estrategias de Comercialización" },
];

export const Default: Story = {
  args: { topics },
};

export const WithActive: Story = {
  args: {
    topics: topics.map((t, i) => ({ ...t, active: i === 0 })),
  },
};

