import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SelectState = "default" | "error";
type SelectSize  = "sm" | "md" | "lg";

const stateMap: Record<SelectState, string> = {
  default: "border-[1.5px] border-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary/20",
  error:   "border-2 border-crimson-400 focus:border-crimson focus:ring-2 focus:ring-crimson/20",
};

const sizeMap: Record<SelectSize, string> = {
  sm: "h-9 pl-3 pr-8 text-[12px] rounded",
  md: "h-[44px] pl-[14px] pr-10 text-[13px] rounded-md",
  lg: "h-[52px] pl-4 pr-10 text-[15px] rounded-lg",
};

const chevronSize: Record<SelectSize, string> = {
  sm: "right-2 w-3.5 h-3.5",
  md: "right-3 w-4 h-4",
  lg: "right-3 w-5 h-5",
};

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  state?: SelectState;
  size?: SelectSize;
  placeholder?: string;
  errorMessage?: string;
  options: { value: string; label: string }[];
}

export function Select({ state = "default", size = "md", placeholder, errorMessage, options, className, ...props }: SelectProps) {
  return (
    <div className="relative flex flex-col gap-1 w-full">
      <select
        className={cn(
          "w-full appearance-none font-sans bg-white text-neutral-900 cursor-pointer",
          "transition-all focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed",
          "text-neutral-400 [&:not(:invalid)]:text-neutral-900",
          stateMap[state],
          sizeMap[size],
          className
        )}
        defaultValue=""
        {...props}
      >
        {placeholder && (
          <option value="" disabled>{placeholder}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <ChevronDown
        className={cn("absolute top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none", chevronSize[size])}
      />
      {errorMessage && (
        <p className="text-[11px] text-crimson font-sans">{errorMessage}</p>
      )}
    </div>
  );
}
