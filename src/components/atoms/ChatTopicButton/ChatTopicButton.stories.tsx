import type { Meta, StoryObj } from "@storybook/react";
import { ChatTopicButton } from "./ChatTopicButton";

const meta: Meta<typeof ChatTopicButton> = {
  title: "Atoms/ChatTopicButton",
  component: ChatTopicButton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof ChatTopicButton>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[336px]">
      <ChatTopicButton {...args}>Barreras Logísticas</ChatTopicButton>
    </div>
  ),
  args: { active: false },
};

export const Active: Story = {
  render: (args) => (
    <div className="w-[336px]">
      <ChatTopicButton {...args}>Barreras Logísticas</ChatTopicButton>
    </div>
  ),
  args: { active: true },
};
