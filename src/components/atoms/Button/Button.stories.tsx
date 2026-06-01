import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight, MapPin, Send, Download, Search, Plus } from "lucide-react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","ghost","outline","link","icon"] },
    color:   { control: "select", options: ["crimson","teal","gold","navy","neutral","white"] },
    radius:  { control: "select", options: ["none","sm","md","full"] },
    size:    { control: "select", options: ["sm","md","lg","xl"] },
    loading: { control: "boolean" },
    disabled:{ control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

// ── Playground ────────────────────────────────────────────
export const Playground: Story = {
  args: { variant: "primary", color: "crimson", radius: "none", size: "md", children: "EXPLORAR MAPA" },
};

// ── Variants ──────────────────────────────────────────────
export const Primary: Story = {
  args: { variant: "primary", children: "EXPLORAR MAPA", iconRight: ArrowRight },
};
export const Secondary: Story = {
  args: { variant: "secondary", children: "VER DEMOSTRACIÓN" },
};
export const Ghost: Story = {
  args: { variant: "ghost", children: "CANCELAR" },
};
export const Outline: Story = {
  args: { variant: "outline", children: "VER METODOLOGÍA" },
};
export const Link: Story = {
  args: { variant: "link", children: "SABER MÁS", iconRight: ArrowRight },
};

// ── Icon Button ───────────────────────────────────────────
export const IconButtonSquare: Story = {
  name: "Icon · Square",
  args: { variant: "icon", iconLeft: Plus, radius: "none", size: "md" },
};
export const IconButtonRound: Story = {
  name: "Icon · Round",
  args: { variant: "icon", iconLeft: Send, radius: "full", size: "md" },
};
export const IconButtonGhost: Story = {
  name: "Icon · Ghost/Neutral",
  args: { variant: "icon", iconLeft: Search, radius: "md", size: "md", color: "neutral" },
};

// ── With Icons ────────────────────────────────────────────
export const WithIconRight: Story = {
  args: { variant: "primary", children: "SABER MÁS", iconRight: ArrowRight },
};
export const WithIconLeft: Story = {
  args: { variant: "primary", children: "VER EN MAPA", iconLeft: MapPin },
};
export const WithBothIcons: Story = {
  args: { variant: "secondary", children: "DESCARGAR", iconLeft: Download, iconRight: ArrowRight },
};

// ── States ────────────────────────────────────────────────
export const Loading: Story = {
  args: { variant: "primary", children: "CARGANDO...", loading: true },
};
export const Disabled: Story = {
  args: { variant: "primary", children: "DESHABILITADO", disabled: true },
};
export const DisabledSecondary: Story = {
  args: { variant: "secondary", children: "NO DISPONIBLE", disabled: true },
};

// ── Colors ────────────────────────────────────────────────
export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary" color="crimson">CRIMSON</Button>
      <Button variant="primary" color="teal">TEAL</Button>
      <Button variant="primary" color="gold">GOLD</Button>
      <Button variant="primary" color="navy">NAVY</Button>
      <Button variant="primary" color="neutral">NEUTRAL</Button>
      <div className="bg-neutral-800 p-2 rounded">
        <Button variant="primary" color="white">WHITE</Button>
      </div>
    </div>
  ),
};

// ── Radius ────────────────────────────────────────────────
export const Radii: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary" radius="none">SQUARE</Button>
      <Button variant="primary" radius="sm">SLIGHT</Button>
      <Button variant="primary" radius="md">MEDIUM</Button>
      <Button variant="primary" radius="full" color="gold" size="lg">PILL</Button>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-end">
      <Button variant="primary" size="sm" iconRight={ArrowRight}>SABER MÁS</Button>
      <Button variant="primary" size="md" iconRight={ArrowRight}>EXPLORAR MAPA</Button>
      <Button variant="primary" size="lg" iconRight={ArrowRight}>EMPIEZA AHORA</Button>
      <Button variant="primary" size="xl" color="gold" radius="full">ENVIAR PROPUESTA</Button>
    </div>
  ),
};

