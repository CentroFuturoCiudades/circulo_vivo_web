"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { ChatInputBar } from "./ChatInputBar";

const meta: Meta<typeof ChatInputBar> = {
  title: "Molecules/ChatInputBar",
  component: ChatInputBar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof ChatInputBar>;

export const Default: Story = {
  args: {
    chips: [
      { label: "Barreras Logísticas" },
      { label: "Costo de Insumos" },
      { label: "Apoyo Institucional" },
      { label: "Financiamiento" },
    ],
  },
};

export const LoadingChips: Story = {
  args: { isLoadingChips: true },
};

export const NoChips: Story = {
  args: { chips: [] },
};
