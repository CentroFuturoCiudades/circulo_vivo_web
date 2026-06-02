"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FilterDropdown } from "./FilterDropdown";

const meta: Meta<typeof FilterDropdown> = {
  title: "Molecules/FilterDropdown",
  component: FilterDropdown,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof FilterDropdown>;

const actorOptions = [
  { value: "privada", label: "Privada" },
  { value: "publica", label: "Pública" },
  { value: "social", label: "Social" },
  { value: "academia", label: "Academia" },
];

const categoryOptions = [
  { value: "alimentacion", label: "Alimentación" },
  { value: "agua", label: "Agua" },
  { value: "semillas", label: "Semillas" },
  { value: "suelo", label: "Suelo" },
];

export const Default: Story = {
  args: {
    label: "Actor",
    options: actorOptions,
  },
};

export const WithSelection: Story = {
  args: {
    label: "Actor",
    options: actorOptions,
    value: "privada",
  },
};

function FilterBarDemo() {
  const [actor, setActor] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [impact, setImpact] = useState<string | undefined>();

  return (
    <div className="flex items-center gap-2">
      <FilterDropdown label="Actor" options={actorOptions} value={actor} onChange={setActor} />
      <FilterDropdown label="Impacto" options={[
        { value: "alto", label: "Alto" },
        { value: "medio", label: "Medio" },
        { value: "bajo", label: "Bajo" },
      ]} value={impact} onChange={setImpact} />
      <FilterDropdown label="Categoría" options={categoryOptions} value={category} onChange={setCategory} />
    </div>
  );
}

export const FilterBar: Story = {
  render: () => <FilterBarDemo />,
};
