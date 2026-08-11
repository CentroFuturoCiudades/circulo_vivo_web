import type { Meta, StoryObj } from "@storybook/react";
import { ChatbotHighlightSection } from "./ChatbotHighlightSection";

const meta: Meta<typeof ChatbotHighlightSection> = {
  title: "Organisms/ChatbotHighlightSection",
  component: ChatbotHighlightSection,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", backgrounds: { default: "white" } },
};
export default meta;
type Story = StoryObj<typeof ChatbotHighlightSection>;

export const Default: Story = {
  args: { ctaHref: "/chatbot" },
};
