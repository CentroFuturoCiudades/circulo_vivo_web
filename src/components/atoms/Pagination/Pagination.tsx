import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblings?: number;
}

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function buildPages(page: number, total: number, siblings: number): (number | "…")[] {
  const boundary = 1;
  const left  = Math.max(2, page - siblings);
  const right = Math.min(total - 1, page + siblings);

  const showLeftDot  = left  > boundary + 1;
  const showRightDot = right < total - boundary;

  const pages: (number | "…")[] = [1];
  if (showLeftDot)  pages.push("…");
  pages.push(...range(left, right));
  if (showRightDot) pages.push("…");
  if (total > 1)    pages.push(total);
  return pages;
}

export function Pagination({ page, totalPages, onPageChange, siblings = 1, className, ...props }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPages(page, totalPages, siblings);

  const btnBase = "inline-flex items-center justify-center w-8 h-8 rounded font-sans text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  return (
    <nav aria-label="Paginación" className={cn("flex items-center gap-1", className)} {...props}>
      {/* Prev */}
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Página anterior"
        className={cn(btnBase, "text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none")}
      >
        <ChevronLeft size={14} />
      </button>

      {/* Pages */}
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`dot-${i}`} className="w-8 flex items-center justify-center text-neutral-400">
            <MoreHorizontal size={14} />
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p as number)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              btnBase,
              p === page
                ? "bg-crimson text-white"
                : "text-neutral-600 hover:bg-neutral-100"
            )}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Página siguiente"
        className={cn(btnBase, "text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none")}
      >
        <ChevronRight size={14} />
      </button>
    </nav>
  );
}
