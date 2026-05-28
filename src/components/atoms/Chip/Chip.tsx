import { cn } from "@/lib/utils";

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Chip({ label, selected, onClick, className }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-sm transition-colors",
        selected
          ? "border-green-700 bg-green-700 text-white"
          : "border-gray-300 bg-white text-gray-600 hover:border-green-600",
        className
      )}
    >
      {label}
    </button>
  );
}
