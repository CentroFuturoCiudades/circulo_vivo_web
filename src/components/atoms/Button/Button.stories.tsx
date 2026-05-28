import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "destructive"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: "Explorar iniciativas", variant: "primary" },
};

export const Secondary: Story = {
  args: { children: "Ver más", variant: "secondary" },
};

export const Ghost: Story = {
  args: { children: "Cancelar", variant: "ghost" },
};

export const Small: Story = {
  args: { children: "Filtrar", size: "sm" },
};

export const Large: Story = {
  args: { children: "Comenzar", size: "lg" },
};
