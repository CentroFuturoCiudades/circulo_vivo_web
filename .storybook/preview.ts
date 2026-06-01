import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "surface",
      values: [
        { name: "surface", value: "#faf8f5" },
        { name: "white", value: "#ffffff" },
        { name: "dark", value: "#211f19" },
        { name: "crimson", value: "#561427" },
      ],
    },
  },
};

export default preview;
