import { cn } from "@/lib/utils";

type TextareaState = "default" | "error" | "success";

const stateMap: Record<TextareaState, string> = {
  default: "border-[1.5px] border-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary/20",
  error:   "border-2 border-crimson-400 focus:border-crimson focus:ring-2 focus:ring-crimson/20",
  success: "border-[1.5px] border-green-500 focus:border-green-600 focus:ring-2 focus:ring-green-500/20",
};

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  state?: TextareaState;
  errorMessage?: string;
  resize?: boolean;
}

export function Textarea({ state = "default", errorMessage, resize = false, className, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <textarea
        className={cn(
          "w-full rounded-md px-[14px] py-3 font-sans text-[13px] bg-white text-neutral-900",
          "placeholder:text-neutral-400 transition-all focus:outline-none",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          !resize && "resize-none",
          stateMap[state],
          className
        )}
        {...props}
      />
      {errorMessage && (
        <p className="text-[11px] text-crimson font-sans">{errorMessage}</p>
      )}
    </div>
  );
}
