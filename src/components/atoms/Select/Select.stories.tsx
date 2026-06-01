import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const INDICATOR_OPTIONS = [
  { value: "diabetes", label: "Mortalidad Diabetes" },
  { value: "obesity",  label: "Obesidad" },
  { value: "anemia",   label: "Anemia" },
  { value: "malnut",   label: "Desnutrición" },
];

const YEAR_OPTIONS = [
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
];

const meta: Meta<typeof Select> = {
  title: "Atoms/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-64"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: { placeholder: "Seleccionar indicador", options: INDICATOR_OPTIONS },
};
export const WithValue: Story = {
  args: { options: INDICATOR_OPTIONS, defaultValue: "diabetes" },
};
export const Error: Story = {
  args: { state: "error", placeholder: "Requerido", options: INDICATOR_OPTIONS, errorMessage: "Selecciona una opción" },
};
export const Disabled: Story = {
  args: { disabled: true, placeholder: "No disponible", options: INDICATOR_OPTIONS },
};
export const Small: Story = {
  args: { size: "sm", placeholder: "Año", options: YEAR_OPTIONS },
};
export const Large: Story = {
  args: { size: "lg", placeholder: "Seleccionar indicador", options: INDICATOR_OPTIONS },
};
