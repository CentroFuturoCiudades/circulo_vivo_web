import { cn } from "@/lib/utils";

type CardPadding = "none" | "sm" | "md" | "lg";
type CardRadius  = "sm" | "md" | "lg";
type CardShadow  = "none" | "sm" | "md" | "lg";
type CardAccent  = "teal" | "crimson" | "navy" | "gold" | "none";

const paddingMap: Record<CardPadding, string> = {
  none: "",
  sm:   "p-4",
  md:   "p-6",
  lg:   "p-8",
};

const radiusMap: Record<CardRadius, string> = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
};

const shadowMap: Record<CardShadow, string> = {
  none: "",
  sm:   "shadow-card",
  md:   "shadow-card-md",
  lg:   "shadow-card-lg",
};

const accentMap: Record<CardAccent, string> = {
  none:    "",
  teal:    "border-l-4 border-l-primary",
  crimson: "border-l-4 border-l-crimson",
  navy:    "border-l-4 border-l-secondary",
  gold:    "border-l-4 border-l-[#bcb884]",
};

// ── Root ──────────────────────────────────────────────────

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  radius?: CardRadius;
  shadow?: CardShadow;
  accent?: CardAccent;
  bordered?: boolean;
}

export function Card({
  padding = "md",
  radius = "md",
  shadow = "sm",
  accent = "none",
  bordered = true,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white",
        paddingMap[padding],
        radiusMap[radius],
        shadowMap[shadow],
        bordered && accent !== "none" ? "border border-neutral-100" : bordered ? "border border-neutral-100" : "",
        accentMap[accent],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function CardHeader({ title, subtitle, action, className, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-4", className)} {...props}>
      <div>
        <h3 className="font-sans font-semibold text-[15px] text-neutral-900 leading-tight">{title}</h3>
        {subtitle && <p className="font-sans text-[12px] text-neutral-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

export type CardBodyProps = React.HTMLAttributes<HTMLDivElement>;

export function CardBody({ className, children, ...props }: CardBodyProps) {
  return (
    <div className={cn("text-neutral-700", className)} {...props}>
      {children}
    </div>
  );
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

export function CardFooter({ bordered = true, className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={cn(
        "mt-4 pt-4 flex items-center justify-between gap-2",
        bordered && "border-t border-neutral-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
