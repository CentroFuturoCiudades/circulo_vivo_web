import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertVariant = "info" | "success" | "warning" | "error";

const variantMap: Record<AlertVariant, {
  container: string;
  icon: string;
  iconComponent: React.ElementType;
}> = {
  info: {
    container: "bg-secondary-50 border-secondary-200 text-secondary-800",
    icon: "text-secondary",
    iconComponent: Info,
  },
  success: {
    container: "bg-green-50 border-green-200 text-green-800",
    icon: "text-green-600",
    iconComponent: CheckCircle2,
  },
  warning: {
    container: "bg-yellow-50 border-yellow-200 text-yellow-800",
    icon: "text-yellow-600",
    iconComponent: TriangleAlert,
  },
  error: {
    container: "bg-crimson-50 border-crimson-200 text-crimson-800",
    icon: "text-crimson",
    iconComponent: AlertCircle,
  },
};

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  onClose?: () => void;
}

export function Alert({ variant = "info", title, onClose, children, className, ...props }: AlertProps) {
  const { container, icon, iconComponent: Icon } = variantMap[variant];

  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 items-start rounded-md border px-4 py-3 font-sans text-[13px]",
        container,
        className
      )}
      {...props}
    >
      <Icon size={16} className={cn("flex-shrink-0 mt-0.5", icon)} />

      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-semibold leading-tight mb-0.5">{title}</p>
        )}
        {children && (
          <p className="leading-snug opacity-90">{children}</p>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-none"
          aria-label="Cerrar"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
