import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "Atoms/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = { args: { label: "Mapa interactivo", name: "tool" } };
export const Checked: Story = { args: { label: "Mapa interactivo", name: "tool", defaultChecked: true } };
export const WithDescription: Story = {
  args: { label: "Iniciativas activas", description: "Muestra solo iniciativas con estado activo", name: "filter", defaultChecked: true },
};
export const Disabled: Story = { args: { label: "No disponible", name: "disabled", disabled: true } };
export const DisabledChecked: Story = { args: { label: "Seleccionado", name: "disabled2", disabled: true, defaultChecked: true } };
export const Crimson: Story = { args: { label: "Alerta crítica", color: "crimson", name: "color", defaultChecked: true } };
export const Navy: Story = { args: { label: "Análisis sistémico", color: "navy", name: "navy", defaultChecked: true } };

export const RadioGroup: Story = {
  render: () => (
    <fieldset className="flex flex-col gap-3">
      <legend className="font-sans font-semibold text-[11px] tracking-[0.1em] uppercase text-neutral-500 mb-2">
        Tipo de visualización
      </legend>
      <Radio label="Mapa de iniciativas"  description="Distribución geográfica por estado" name="view" defaultChecked />
      <Radio label="Gráfica de barras"    description="Comparativa entre regiones"         name="view" />
      <Radio label="Tabla de datos"       description="Vista detallada con filtros"         name="view" />
    </fieldset>
  ),
};
