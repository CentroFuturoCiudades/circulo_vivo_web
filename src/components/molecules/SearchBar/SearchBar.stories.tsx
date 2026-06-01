import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
  title: "Molecules/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = { args: { placeholder: "Buscar iniciativas..." } };
export const WithValue: Story = { args: { defaultValue: "Huertos CDMX", placeholder: "Buscar..." } };
export const Small: Story = { args: { size: "sm", placeholder: "Filtrar..." } };
export const Large: Story = { args: { size: "lg", placeholder: "Busca cualquier iniciativa o indicador..." } };
export const Disabled: Story = { args: { disabled: true, placeholder: "No disponible" } };
