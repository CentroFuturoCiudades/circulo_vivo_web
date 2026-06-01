import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Label: Story = { args: { variant: "label", children: "DATOS EN TIEMPO REAL" } };
export const Live: Story = { args: { variant: "live", dot: true, children: "EN LÍNEA" } };
export const Success: Story = { args: { variant: "success", children: "ACTIVO" } };
export const Warning: Story = { args: { variant: "warning", children: "PENDIENTE" } };
export const Neutral: Story = { args: { variant: "neutral", children: "INACTIVO" } };
export const Count: Story = { args: { variant: "count", count: 3 } };
export const File: Story = { args: { variant: "file", children: "4.2MB" } };
export const FileNavy: Story = { args: { variant: "file-navy", children: "PDF" } };
export const FileGold: Story = { args: { variant: "file-gold", children: "XLSX" } };
