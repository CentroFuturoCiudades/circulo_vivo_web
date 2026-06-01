import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  showHome?: boolean;
}

export function Breadcrumb({ items, showHome = false, className, ...props }: BreadcrumbProps) {
  const all: BreadcrumbItem[] = showHome ? [{ label: "Inicio", href: "/" }, ...items] : items;

  return (
    <nav aria-label="Ruta de navegación" className={cn("flex items-center", className)} {...props}>
      <ol className="flex items-center gap-1 flex-wrap">
        {all.map((item, i) => {
          const isLast = i === all.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {i === 0 && showHome ? (
                <Home size={13} className="text-neutral-400 flex-shrink-0" />
              ) : null}

              {isLast ? (
                <span
                  aria-current="page"
                  className="font-sans text-[12px] font-semibold text-neutral-900 truncate max-w-[180px]"
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="font-sans text-[12px] text-neutral-500 hover:text-primary transition-colors truncate max-w-[160px]"
                >
                  {item.label}
                </a>
              ) : (
                <span className="font-sans text-[12px] text-neutral-500 truncate max-w-[160px]">
                  {item.label}
                </span>
              )}

              {!isLast && (
                <ChevronRight size={12} className="text-neutral-300 flex-shrink-0" aria-hidden />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
