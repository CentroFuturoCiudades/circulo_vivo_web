import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toggle } from "./Toggle";
import type { ToggleProps } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Atoms/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Toggle>;

// Uppercase name → valid React component for hooks
function Controlled(args: Partial<ToggleProps>) {
  const [checked, setChecked] = useState(args.checked ?? false);
  return <Toggle {...(args as ToggleProps)} checked={checked} onChange={setChecked} />;
}

function FilterPanelDemo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [c, setC] = useState(true);
  return (
    <div className="flex flex-col gap-3 p-4 w-56">
      <Toggle checked={a} onChange={setA} label="Iniciativas activas" />
      <Toggle checked={b} onChange={setB} label="Solo con datos" />
      <Toggle checked={c} onChange={setC} label="Vista satelital" color="navy" />
    </div>
  );
}

export const Off: Story        = { render: () => <Controlled checked={false} /> };
export const On: Story         = { render: () => <Controlled checked={true} /> };
export const WithLabel: Story  = { render: () => <Controlled checked={true} label="Mostrar iniciativas" /> };
export const Small: Story      = { render: () => <Controlled checked={true} size="sm" /> };
export const Crimson: Story    = { render: () => <Controlled checked={true} color="crimson" label="Alertas activas" /> };
export const Navy: Story       = { render: () => <Controlled checked={true} color="navy" label="Modo análisis" /> };
export const Disabled: Story   = { render: () => <Controlled checked={false} disabled label="No disponible" /> };
export const FilterPanel: Story = { render: () => <FilterPanelDemo /> };
