import type { Meta, StoryObj } from "@storybook/react";
import { NavBar } from "./NavBar";

const LINKS = [
  { label: "Inicio",      href: "/",            active: true },
  { label: "Equipo",      href: "/equipo" },
  { label: "Mapa",        href: "/mapa" },
  { label: "Chatbot",     href: "/chatbot" },
  { label: "Indicadores", href: "/indicadores" },
];

const meta: Meta<typeof NavBar> = {
  title: "Molecules/NavBar",
  component: NavBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "hero",
      values: [
        { name: "hero",    value: "linear-gradient(to bottom, #42412d, #666)" },
        { name: "teal",    value: "#466062" },
        { name: "white",   value: "#faf8f5" },
        { name: "dark",    value: "#211f19" },
        { name: "crimson", value: "#561427" },
      ],
    },
  },
  decorators: [(Story) => (
    <div className="p-5 min-h-32">
      <Story />
    </div>
  )],
  argTypes: {
    bgOpacity:           { control: { type: "range", min: 0, max: 100 } },
    activeLinkOpacity:   { control: { type: "range", min: 0, max: 100 } },
    pillBgOpacity:       { control: { type: "range", min: 0, max: 100 } },
    bgColor:             { control: "color" },
    activeLinkColor:     { control: "color" },
    activeLinkTextColor: { control: "color" },
    linkTextColor:       { control: "color" },
    pillBgColor:         { control: "color" },
    logoColor:           { control: "color" },
    blur:                { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof NavBar>;

// ── Default — pixel-perfect (matches Pencil design) ──────
export const Default: Story = {
  args: {
    links: LINKS,
    logoColor: "#ffffff",
    bgColor: "#708b8d",
    bgOpacity: 50,
    blur: true,
    activeLinkColor: "#708b8d",
    activeLinkOpacity: 100,
    activeLinkTextColor: "#ffffff",
    linkTextColor: "#000000",
    pillBgColor: "#ffffff",
    pillBgOpacity: 90,
  },
};

export const CrimsonVariant: Story = {
  parameters: { backgrounds: { default: "crimson" } },
  args: {
    links: LINKS,
    logoColor: "#ffffff",
    bgColor: "#561427",
    bgOpacity: 60,
    blur: true,
    activeLinkColor: "#561427",
    activeLinkTextColor: "#ffffff",
    linkTextColor: "#000000",
    pillBgColor: "#ffffff",
    pillBgOpacity: 95,
  },
};

export const NavyVariant: Story = {
  parameters: { backgrounds: { default: "dark" } },
  args: {
    links: LINKS,
    logoColor: "#ffffff",
    bgColor: "#395284",
    bgOpacity: 70,
    blur: true,
    activeLinkColor: "#395284",
    activeLinkTextColor: "#ffffff",
    linkTextColor: "#000000",
    pillBgColor: "#ffffff",
    pillBgOpacity: 95,
  },
};

export const LightVariant: Story = {
  parameters: { backgrounds: { default: "white" } },
  args: {
    links: LINKS,
    logoColor: "#1a1c1c",
    bgColor: "#faf8f5",
    bgOpacity: 95,
    blur: false,
    activeLinkColor: "#708b8d",
    activeLinkTextColor: "#ffffff",
    linkTextColor: "#444748",
    pillBgColor: "#f0efef",
    pillBgOpacity: 100,
  },
};

export const SolidNoBlur: Story = {
  parameters: { backgrounds: { default: "teal" } },
  args: {
    links: LINKS,
    logoColor: "#ffffff",
    bgColor: "#708b8d",
    bgOpacity: 100,
    blur: false,
    activeLinkColor: "#ffffff",
    activeLinkTextColor: "#708b8d",
    linkTextColor: "#ffffff",
    pillBgColor: "#ffffff",
    pillBgOpacity: 15,
  },
};
