import type { Meta, StoryObj } from "@storybook/react";
import { IndicatorsDashboardSection } from "./IndicatorsDashboardSection";

const meta: Meta<typeof IndicatorsDashboardSection> = {
  title: "Organisms/IndicatorsDashboardSection",
  component: IndicatorsDashboardSection,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", backgrounds: { default: "white" } },
};
export default meta;
type Story = StoryObj<typeof IndicatorsDashboardSection>;

export const Default: Story = {};

export const CustomData: Story = {
  args: {
    data: [
      { state: "CDMX",        value: 0.095, color: "#bcb884" },
      { state: "Jalisco",     value: 0.082, color: "#395284" },
      { state: "Nuevo León",  value: 0.071, color: "#708b8d" },
      { state: "Sonora",      value: 0.065, color: "#395284" },
      { state: "Yucatán",     value: 0.058, color: "#582a56" },
    ],
  },
};
