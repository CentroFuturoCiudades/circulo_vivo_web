import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
  title: "Molecules/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-[772px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "Iniciativas de alimentación en CDMX" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
