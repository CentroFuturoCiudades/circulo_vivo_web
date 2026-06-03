import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatTopicButton } from "@/components/atoms/ChatTopicButton";
import { Button } from "@/components/atoms/Button";

export interface ChatTopic {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export interface ChatSidebarProps {
  topics?: ChatTopic[];
  methodologyNote?: string;
  methodologyLink?: string;
  onMethodologyClick?: () => void;
  className?: string;
}

const DEFAULT_TOPICS: ChatTopic[] = [
  { label: "Barreras" },
  { label: "Estrategias" },
  { label: "Actor" },
];

const DEFAULT_NOTE =
  "Basado en el análisis cualitativo de XX horas de entrevistas semiestructuradas realizado mediante LLM locales y validado por investigadoras humanas.";

const DEFAULT_LINK =
  "Metodología de análisis cualitativo combinado con algoritmos de inteligencia artificial";

export function ChatSidebar({
  topics = DEFAULT_TOPICS,
  methodologyNote = DEFAULT_NOTE,
  methodologyLink = DEFAULT_LINK,
  onMethodologyClick,
  className,
}: ChatSidebarProps) {
  return (
    <div
      className={cn(
        "flex h-full w-[384px] shrink-0 flex-col justify-between rounded-2xl border-r border-[#e4e4e7] bg-white/80 p-6",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <span
          className="font-sans font-normal text-[#708b8d]"
          style={{ fontSize: "16px", letterSpacing: "1.6px", lineHeight: "1.5" }}
        >
          EXPLORAR TEMAS
        </span>

        <div className="flex flex-col gap-2">
          {topics.map((topic, i) => (
            <ChatTopicButton
              key={i}
              active={topic.active}
              onClick={topic.onClick}
            >
              {topic.label}
            </ChatTopicButton>
          ))}
        </div>
      </div>

      <div
        className="mt-auto flex flex-col gap-3 border-t border-[#e4e4e7] pt-6"
      >
        <p
          className="font-sans font-normal text-[#71717a]"
          style={{ fontSize: "16px", lineHeight: "1.625" }}
        >
          {methodologyNote}
        </p>

        <Button
          variant="link"
          color="teal"
          iconRight={ExternalLink}
          onClick={onMethodologyClick}
          className="normal-case tracking-normal font-normal text-base text-[#18181b] hover:text-primary justify-start gap-2 transition-all active:opacity-60 active:scale-95 [&>svg]:shrink-0 [&>svg]:w-[10.5px]! [&>svg]:h-[10.5px]! text-left"
        >
          {methodologyLink}
        </Button>
      </div>
    </div>
  );
}
