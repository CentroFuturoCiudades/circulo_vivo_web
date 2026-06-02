import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatbotButtonProps {
  label?: string;
  title?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function ChatbotButton({
  label = "IA Conversacional",
  title = "Consultar al Chatbot",
  href,
  onClick,
  className,
}: ChatbotButtonProps) {
  const content = (
    <>
      {/* Left — fixed 222px, padding-right 66px matches design */}
      <div
        className="flex flex-col gap-1 flex-shrink-0"
        style={{ width: 222, paddingRight: 66 }}
      >
        <span
          className="font-sans font-normal text-white/70 leading-[1.5] uppercase"
          style={{ fontSize: "10px", letterSpacing: "2px" }}
        >
          {label}
        </span>
        <span
          className="font-serif font-bold italic text-white leading-[1.2] text-left"
          style={{ fontSize: "20px" }}
        >
          {title}
        </span>
      </div>

      {/* Right — arrow icon */}
      <ArrowUpRight size={15} className="text-white flex-shrink-0" />
    </>
  );

  const cls = cn(
    "flex items-center justify-between w-full rounded-xl",
    "bg-[#708b8d] hover:bg-[#5f7c7e] active:bg-[#536d6f] transition-colors",
    "px-6 py-4 cursor-pointer",
    className
  );

  if (href) {
    return <a href={href} className={cls}>{content}</a>;
  }

  return (
    <button type="button" onClick={onClick} className={cls}>
      {content}
    </button>
  );
}
