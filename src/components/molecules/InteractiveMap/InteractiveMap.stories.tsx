"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { InteractiveMap } from "./InteractiveMap";

const meta: Meta<typeof InteractiveMap> = {
  title: "Molecules/InteractiveMap",
  component: InteractiveMap,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof InteractiveMap>;

const STATE_NAMES = ["Ciudad de México", "Jalisco", "Nuevo León", "Oaxaca", "Guanajuato"];

export const Default: Story = {
  args: { stateNames: STATE_NAMES },
};

export const WithSelectedSede: Story = {
  args: {
    stateNames: STATE_NAMES,
    selectedStateName: "Jalisco",
  },
};

export const WithPresenceStates: Story = {
  args: {
    stateNames: STATE_NAMES,
    selectedStateName: "Ciudad de México",
    selectedPresenceStates: ["Jalisco", "Oaxaca"],
  },
};

export const Empty: Story = {
  args: {},
};
