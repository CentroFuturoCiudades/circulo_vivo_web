import type { Meta, StoryObj } from "@storybook/react";
import { ChatWelcomePrompt } from "./ChatWelcomePrompt";

const meta: Meta<typeof ChatWelcomePrompt> = {
  title: "Molecules/ChatWelcomePrompt",
  component: ChatWelcomePrompt,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    suggestions: { control: "object" },
  },
  decorators: [
    (Story) => (
      <div className="h-[500px] flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ChatWelcomePrompt>;

export const Default: Story = {
  args: {
    suggestions: [
      { text: "¿Qué quisieras descubrir sobre las iniciativas?" },
      { text: "¿Qué estrategias implementan las iniciativas para alcanzar sus objetivos?" },
      { text: "Principales desafíos de las iniciativas que trabajan con huertos escolares en la biodiversidad" },
    ],
  },
};

export const LoadingSuggestions: Story = {
  args: {
    isLoadingSuggestions: true,
    suggestions: [],
  },
};

export const NoSuggestions: Story = {
  args: {
    suggestions: [],
  },
};
