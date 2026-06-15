import { fileURLToPath } from "url";
import path from "path";
import type { StorybookConfig } from "@storybook/react-vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: (config) => {
    config.resolve ??= {};
    config.resolve.alias = {
      ...(Array.isArray(config.resolve.alias) ? {} : (config.resolve.alias ?? {})),
      "next/navigation": path.resolve(__dirname, "../src/__mocks__/nextNavigation.ts"),
      "next/router": path.resolve(__dirname, "../src/__mocks__/nextNavigation.ts"),
    };
    // Prevent Vite from pre-bundling the real next/* packages before the alias applies
    config.optimizeDeps ??= {};
    config.optimizeDeps.exclude = [
      ...(config.optimizeDeps.exclude ?? []),
      "next/navigation",
      "next/router",
    ];
    // Polyfill process.env.NEXT_PUBLIC_* so components using Next.js env vars work in Storybook
    config.define = {
      ...config.define,
      "process.env.NEXT_PUBLIC_DEV_ENVIRONMENT": JSON.stringify(
        process.env.NEXT_PUBLIC_DEV_ENVIRONMENT ?? "dev"
      ),
    };
    return config;
  },
};

export default config;
