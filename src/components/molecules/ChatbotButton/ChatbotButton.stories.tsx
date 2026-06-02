import type { Meta, StoryObj } from "@storybook/react";
import { ChatbotButton } from "./ChatbotButton";

const meta: Meta<typeof ChatbotButton> = {
  title: "Molecules/ChatbotButton",
  component: ChatbotButton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-[280px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof ChatbotButton>;

export const Default: Story = {};

export const CustomText: Story = {
  args: {
    label: "Asistente IA",
    title: "Hacer una pregunta",
  },
};

export const AsLink: Story = {
  args: {
    href: "/chatbot",
    label: "IA Conversacional",
    title: "Consultar al Chatbot",
  },
};
