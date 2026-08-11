import { cn } from "@/lib/utils";

export interface ChatUserMessageProps {
  message: string;
  className?: string;
}

export function ChatUserMessage({ message, className }: ChatUserMessageProps) {
  return (
    <div className={cn("w-full flex justify-end", className)}>
      <div
        className="bg-[#c3d2d9] border border-[#e4e4e7] max-w-[665px] w-fit px-[19px] py-4 pl-4"
        style={{ borderRadius: "12px 0px 12px 12px" }}
      >
        <p className="font-sans font-normal text-base text-[#27272a] leading-[1.5]">
          {message}
        </p>
      </div>
    </div>
  );
}
