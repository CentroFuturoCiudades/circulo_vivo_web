import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/atoms/Badge";

export interface NavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  badge?: number | string;
  collapsed?: boolean;
}

export function NavItem({
  label,
  icon: Icon,
  active = false,
  badge,
  collapsed = false,
  className,
  ...props
}: NavItemProps) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      title={collapsed ? label : undefined}
      className={cn(
        "group flex items-center gap-3 w-full rounded-md transition-all",
        "font-sans text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        collapsed ? "justify-center p-2.5" : "px-3 py-2.5",
        active
          ? "bg-primary/10 text-primary font-semibold"
          : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
        className
      )}
      {...props}
    >
      {Icon && (
        <Icon
          size={18}
          className={cn(
            "flex-shrink-0 transition-colors",
            active ? "text-primary" : "text-neutral-400 group-hover:text-neutral-600"
          )}
        />
      )}

      {!collapsed && (
        <>
          <span className="flex-1 text-left truncate">{label}</span>
          {badge !== undefined && (
            <Badge
              variant="count"
              count={Number(badge)}
              className={cn(
                "ml-auto",
                !active && "bg-neutral-200 text-neutral-600"
              )}
            />
          )}
        </>
      )}
    </button>
  );
}
