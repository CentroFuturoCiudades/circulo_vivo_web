import type { Meta, StoryObj } from "@storybook/react";
import { ChatUserMessage } from "./ChatUserMessage";

const meta: Meta<typeof ChatUserMessage> = {
  title: "Molecules/ChatUserMessage",
  component: ChatUserMessage,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof ChatUserMessage>;

export const Default: Story = {
  args: {
    message:
      "¿Qué estrategias implementan las iniciativas para alcanzar sus objetivos de distribución?",
  },
};
