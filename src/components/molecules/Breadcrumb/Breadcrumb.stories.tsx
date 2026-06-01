import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Molecules/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: { items: [{ label: "Mapa", href: "/mapa" }, { label: "Oaxaca", href: "/mapa/oaxaca" }, { label: "Iniciativas" }] },
};
export const WithHome: Story = {
  args: { showHome: true, items: [{ label: "Indicadores", href: "/indicadores" }, { label: "Salud" }] },
};
export const TwoItems: Story = {
  args: { items: [{ label: "Indicadores", href: "/indicadores" }, { label: "IISE por Estado" }] },
};
export const SingleItem: Story = {
  args: { items: [{ label: "Chatbot" }] },
};
