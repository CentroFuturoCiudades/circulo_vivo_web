import type React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MapFooter } from "./MapFooter";

const meta: Meta<typeof MapFooter> = {
  title: "Molecules/MapFooter",
  component: MapFooter,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100vw",
          backgroundImage:
            "linear-gradient(rgba(250,248,245,0.55), rgba(250,248,245,0.55)), url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          minHeight: 200,
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof MapFooter>;

export const Default: Story = {};

export const CustomLabels: Story = {
  args: {
    versionLabel: "CÍRCULO VIVO V4.0 // SISTEMA DE EXPLORACIÓN TERRITORIAL",
    copyrightLabel: "2025 © CÍRCULO VIVO",
  },
};
