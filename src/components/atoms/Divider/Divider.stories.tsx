import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Atoms/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {};
export const Dark: Story = { args: { color: "dark" } };
export const WithLabel: Story = { args: { label: "O continúa con" } };
export const Vertical: Story = {
  decorators: [(Story) => <div className="h-16 flex items-stretch"><Story /></div>],
  args: { orientation: "vertical" },
};
