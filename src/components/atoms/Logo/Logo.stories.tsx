import type { Meta } from "@storybook/react";
import logoSrc from "@/assets/logos/logo.svg";
import { cn } from "@/lib/utils";

// Inline component for stories (Vite resolves the import as a URL)
const LogoImg = ({ color = "black", size = "sm" }: { color?: "black" | "white"; size?: "xs" | "sm" | "md" | "lg" }) => {
  const sizeMap = { xs: "h-5", sm: "h-7", md: "h-9", lg: "h-12" };
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoSrc}
      alt="Círculo Vivo"
      className={cn("w-auto object-contain", sizeMap[size], color === "white" && "brightness-0 invert")}
      draggable={false}
    />
  );
};

const meta = {
  title: "Atoms/Logo",
  parameters: { layout: "centered" },
} satisfies Meta;
export default meta;

export const Black = { render: () => <LogoImg color="black" size="md" /> };
export const White = {
  parameters: { backgrounds: { default: "dark" } },
  render: () => <LogoImg color="white" size="md" />,
};
export const Sizes = {
  render: () => (
    <div className="flex items-end gap-6">
      <LogoImg size="xs" />
      <LogoImg size="sm" />
      <LogoImg size="md" />
      <LogoImg size="lg" />
    </div>
  ),
};
