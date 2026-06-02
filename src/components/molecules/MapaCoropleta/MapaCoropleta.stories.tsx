import type { Meta, StoryObj } from "@storybook/react";
import { MapaCoropleta } from "./MapaCoropleta";

const meta: Meta<typeof MapaCoropleta> = {
  title: "Molecules/MapaCoropleta",
  component: MapaCoropleta,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-[480px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof MapaCoropleta>;

export const Default: Story = {
  args: {},
};
