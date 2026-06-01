import { cva, type VariantProps } from "class-variance-authority";
import { type LucideIcon, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full font-sans text-[13px] bg-white text-neutral-900 placeholder:text-neutral-400 transition-all focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      state: {
        default: "border-[1.5px] border-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary/20",
        error:   "border-2 border-crimson-400 focus:border-crimson focus:ring-2 focus:ring-crimson/20",
        success: "border-[1.5px] border-green-500 focus:border-green-600 focus:ring-2 focus:ring-green-500/20",
      },
      size: {
        sm: "h-9 px-3 rounded text-[12px]",
        md: "h-[44px] px-[14px] rounded-md",
        lg: "h-[52px] px-4 rounded-lg text-[15px]",
      },
    },
    defaultVariants: { state: "default", size: "md" },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  errorMessage?: string;
}

export function Input({ className, state, size, iconLeft: IconLeft, iconRight: IconRight, errorMessage, ...props }: InputProps) {
  const iconSize = size === "sm" ? 14 : size === "lg" ? 18 : 16;

  if (IconLeft || IconRight) {
    return (
      <div className="relative flex items-center">
        {IconLeft && (
          <span className="absolute left-3 text-neutral-400 pointer-events-none">
            <IconLeft size={iconSize} />
          </span>
        )}
        <input
          className={cn(
            inputVariants({ state, size }),
            IconLeft && "pl-9",
            IconRight && "pr-9",
            className
          )}
          {...props}
        />
        {IconRight && (
          <span className="absolute right-3 text-neutral-400 pointer-events-none">
            <IconRight size={iconSize} />
          </span>
        )}
        {errorMessage && <p className="mt-1 text-[11px] text-crimson font-sans">{errorMessage}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      <input className={cn(inputVariants({ state, size }), className)} {...props} />
      {errorMessage && <p className="text-[11px] text-crimson font-sans">{errorMessage}</p>}
    </div>
  );
}

// ── Chat Input ────────────────────────────────────────────
export interface ChatInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSend?: (value: string) => void;
  loading?: boolean;
}

export function ChatInput({ className, onSend, loading, ...props }: ChatInputProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey && onSend) {
      onSend((e.target as HTMLInputElement).value);
    }
  }

  return (
    <div className={cn("flex items-center gap-2 h-[52px] pl-4 pr-2 bg-white border-[1.5px] border-neutral-300 rounded-full focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all", className)}>
      <input
        className="flex-1 bg-transparent font-sans text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
        onKeyDown={handleKeyDown}
        {...props}
      />
      <button
        type="button"
        onClick={() => {/* handled via onSend */}}
        disabled={loading}
        className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-crimson hover:bg-crimson-600 text-white rounded-full transition-colors disabled:opacity-50"
      >
        <Send size={14} />
      </button>
    </div>
  );
}
