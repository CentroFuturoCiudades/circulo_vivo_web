import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import type { Components } from "react-markdown";

export interface ChatMarkdownContentProps {
  content: string;
  className?: string;
}

const components: Components = {
  // Headings
  h1: ({ children }) => (
    <h1 className="font-serif font-bold text-[#1a1c1c] text-xl leading-snug mt-4 mb-2 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-serif font-bold text-[#1a1c1c] text-lg leading-snug mt-4 mb-2 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-sans font-semibold text-[#1a1c1c] text-base leading-snug mt-3 mb-1 first:mt-0">
      {children}
    </h3>
  ),

  // Paragraphs
  p: ({ children }) => (
    <p className="font-sans font-normal text-[#1a1c1c] text-sm leading-relaxed mb-3 last:mb-0">
      {children}
    </p>
  ),

  // Bold / Italic
  strong: ({ children }) => (
    <strong className="font-semibold text-[#1a1c1c]">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-[#6b7280]">{children}</em>
  ),

  // Ordered list — CSS counter for 01, 02... numbering via Tailwind arbitrary
  ol: ({ children }) => (
    <ol className="flex flex-col gap-3 mb-3 last:mb-0 pl-0 list-none [counter-reset:chat-ol]">
      {children}
    </ol>
  ),

  // Unordered list
  ul: ({ children }) => (
    <ul className="flex flex-col gap-2 mb-3 last:mb-0 pl-0 list-none">
      {children}
    </ul>
  ),

  // List items — both ordered and unordered use same component.
  // Teal dot bullet works for both; LLM text already contains the number when ordered.
  li: ({ children }) => (
    <li className="flex gap-3 items-start">
      <span className="font-sans font-bold text-primary text-sm shrink-0 mt-0.5 select-none">
        ·
      </span>
      <span className="font-sans text-sm text-[#1a1c1c] leading-relaxed min-w-0">
        {children}
      </span>
    </li>
  ),

  // Blockquote — highlighted aside
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-primary pl-4 my-3 text-[#6b7280] italic font-sans text-sm leading-relaxed">
      {children}
    </blockquote>
  ),

  // Inline code
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <pre className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 overflow-x-auto my-3">
          <code className="font-mono text-xs text-[#1a1c1c] leading-relaxed">{children}</code>
        </pre>
      );
    }
    return (
      <code className="font-mono text-xs bg-neutral-100 text-[#561427] px-1.5 py-0.5 rounded">
        {children}
      </code>
    );
  },

  // Horizontal rule
  hr: () => <hr className="border-t border-[#f3f4f6] my-4" />,

  // Links
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
    >
      {children}
    </a>
  ),

  // Table (GFM)
  table: ({ children }) => (
    <div className="overflow-x-auto my-3">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-[#e4e4e7]">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="text-left font-sans font-semibold text-[#1a1c1c] py-2 pr-4 text-xs uppercase tracking-wide">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="font-sans text-[#1a1c1c] py-2 pr-4 border-b border-[#f3f4f6] text-sm">
      {children}
    </td>
  ),
};

export function ChatMarkdownContent({ content, className }: ChatMarkdownContentProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
