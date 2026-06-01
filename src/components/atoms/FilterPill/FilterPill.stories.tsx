import type { Meta, StoryObj } from "@storybook/react";
import { FilterPill } from "./FilterPill";

const meta: Meta<typeof FilterPill> = {
  title: "Atoms/FilterPill",
  component: FilterPill,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof FilterPill>;

export const Active: Story = { args: { variant: "active", children: "MORTALIDAD DIABETES" } };
export const Default: Story = { args: { variant: "default", children: "OBESIDAD" } };
export const Teal: Story = { args: { variant: "teal", children: "ANEMIA" } };
export const Purple: Story = { args: { variant: "purple", children: "DESNUTRICIÓN" } };

export const FilterGroup: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap items-center">
      <FilterPill variant="active">MORTALIDAD DIABETES</FilterPill>
      <FilterPill variant="default">OBESIDAD</FilterPill>
      <FilterPill variant="default">ANEMIA</FilterPill>
      <FilterPill variant="default">DESNUTRICIÓN</FilterPill>
    </div>
  ),
};
