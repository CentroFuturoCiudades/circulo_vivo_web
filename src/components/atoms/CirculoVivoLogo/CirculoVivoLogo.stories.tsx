import type { Meta, StoryObj } from "@storybook/react";
import { CirculoVivoLogo } from "./CirculoVivoLogo";

const meta: Meta<typeof CirculoVivoLogo> = {
  title: "Atoms/CirculoVivoLogo",
  component: CirculoVivoLogo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "surface",
      values: [
        { name: "surface", value: "#faf8f5" },
        { name: "white",   value: "#ffffff" },
        { name: "dark",    value: "#211f19" },
        { name: "crimson", value: "#561427" },
        { name: "teal",    value: "#466062" },
      ],
    },
  },
  argTypes: {
    color: { control: "color" },
  },
};
export default meta;
type Story = StoryObj<typeof CirculoVivoLogo>;

export const Default: Story = {
  args: { color: "#1a1c1c" },
};

export const OnDark: Story = {
  parameters: { backgrounds: { default: "dark" } },
  args: { color: "#ffffff" },
};

export const OnCrimson: Story = {
  parameters: { backgrounds: { default: "crimson" } },
  args: { color: "#ffffff" },
};

export const Gold: Story = {
  parameters: { backgrounds: { default: "dark" } },
  args: { color: "#bcb884" },
};

export const Teal: Story = {
  parameters: { backgrounds: { default: "dark" } },
  args: { color: "#708b8d" },
};
