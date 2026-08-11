import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";

export interface ChatTopicButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  active?: boolean;
}

export function ChatTopicButton({ active = false, children, className, ...props }: ChatTopicButtonProps) {
  return (
    <Button
      variant="ghost"
      color="neutral"
      iconRight={ArrowRight}
      className={cn(
        "w-full justify-between rounded-lg py-4 px-4 h-auto",
        "normal-case tracking-normal font-normal text-base text-[#111111]",
        "bg-white/50 hover:bg-white/70",
        active ? "border border-[#708b8d]" : "border border-[#d4d4d8]",
        "[&>svg:last-child]:text-[#a1a1aa] [&>svg:last-child]:w-3.25! [&>svg:last-child]:h-3.25!",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
