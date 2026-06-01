import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = { args: { size: "md", color: "teal" } };
export const WithLabel: Story = { args: { size: "lg", color: "teal", label: "Cargando mapa..." } };
export const White: Story = {
  parameters: { backgrounds: { default: "dark" } },
  args: { size: "md", color: "white" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner color="crimson" />
      <Spinner color="teal" />
      <Spinner color="navy" />
      <Spinner color="gold" />
      <Spinner color="neutral" />
    </div>
  ),
};
