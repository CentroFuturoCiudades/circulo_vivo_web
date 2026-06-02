import { cn } from "@/lib/utils";
import { Avatar } from "@/components/atoms/Avatar";
import { Chip } from "@/components/atoms/Chip";

// ── Directivo variant ─────────────────────────────────────
export interface TeamMemberDirectivoProps {
  variant: "directivo";
  name: string;
  role: string;
  description?: string;
  src?: string;
  className?: string;
}

// ── Técnico variant ───────────────────────────────────────
export interface TeamMemberTecnicoProps {
  variant: "tecnico";
  name: string;
  role: string;
  /** Category tag shown as pill at bottom (e.g. "Social", "Academia") */
  tag?: string;
  src?: string;
  className?: string;
}

export type TeamMemberCardProps = TeamMemberDirectivoProps | TeamMemberTecnicoProps;

export function TeamMemberCard(props: TeamMemberCardProps) {
  if (props.variant === "directivo") {
    return <DirectivoCard {...props} />;
  }
  return <TecnicoCard {...props} />;
}

function DirectivoCard({ name, role, description, src, className }: TeamMemberDirectivoProps) {
  return (
    <div
      className={cn(
        "bg-white flex flex-col gap-6 p-12",
        className
      )}
    >
      {/* Photo */}
      <div className="w-full aspect-square overflow-hidden rounded-sm">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
            <Avatar name={name} size="xl" color="teal" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2">
        <p className="font-sans font-bold text-[11px] tracking-[0.15em] uppercase text-[#bcb884] leading-none">
          {role}
        </p>
        <h3 className="font-serif font-bold text-[20px] leading-snug text-[#1c1c18]">
          {name}
        </h3>
        {description && (
          <p className="font-sans text-[14px] text-neutral-500 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

function TecnicoCard({ name, role, tag, src, className }: TeamMemberTecnicoProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 p-6 bg-white rounded-xl text-center",
        "shadow-[0_2px_7px_#00000014]",
        className
      )}
    >
      {/* Circular photo */}
      <div className="relative w-16 h-16 flex-shrink-0">
        <div className="w-full h-full rounded-full overflow-hidden">
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={name} className="w-full h-full object-cover" />
          ) : (
            <Avatar name={name} size="lg" color="teal" className="w-full h-full" />
          )}
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-[#c4c6d0] pointer-events-none" />
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-0 w-full">
        <h4 className="font-serif font-bold italic text-[18px] leading-snug text-[#203b6b] text-center">
          {name}
        </h4>
        <p className="font-sans text-[11px] text-[#747780] leading-normal pb-2.5">
          {role}
        </p>
        {tag && (
          <Chip color="purple" selected className="pointer-events-none text-[9px] h-6 px-2">
            {tag.toUpperCase()}
          </Chip>
        )}
      </div>
    </div>
  );
}
