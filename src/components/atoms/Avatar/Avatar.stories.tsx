import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size:  { control: "select", options: ["xs","sm","md","lg","xl"] },
    color: { control: "select", options: ["teal","crimson","navy","gold","neutral"] },
  },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Initials: Story = { args: { name: "Elena Rivas", size: "md", color: "teal" } };
export const CrimsonInitials: Story = { args: { name: "Jorge Valdés", size: "md", color: "crimson" } };
export const Navy: Story = { args: { name: "Sofía Aranda", size: "md", color: "navy" } };
export const Large: Story = { args: { name: "Lucía Méndez", size: "lg", color: "gold" } };
export const Small: Story = { args: { name: "Carlos Silva", size: "sm" } };

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="AB" size="xs" />
      <Avatar name="AB" size="sm" />
      <Avatar name="AB" size="md" />
      <Avatar name="AB" size="lg" />
      <Avatar name="AB" size="xl" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Elena Rivas"   color="teal" />
      <Avatar name="Jorge Valdés"  color="crimson" />
      <Avatar name="Sofía Aranda"  color="navy" />
      <Avatar name="Lucía Méndez"  color="gold" />
      <Avatar name="Carlos Silva"  color="neutral" />
    </div>
  ),
};
