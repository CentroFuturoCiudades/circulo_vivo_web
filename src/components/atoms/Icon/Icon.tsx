import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-6 w-6" };

export function Icon({ icon: LIcon, size = "md", className }: IconProps) {
  return <LIcon className={cn(sizes[size], className)} />;
}
