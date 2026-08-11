"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Briefcase, Camera, GraduationCap, Globe, Link2, Mail, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Chip } from "@/components/atoms/Chip";
import { Button } from "@/components/atoms/Button";
import { DataUnavailableMessage, type DataUnavailableVariant } from "@/components/molecules/DataUnavailableMessage";

const SOCIAL_ICONS: Record<string, LucideIcon> = {
    linkedin: Briefcase,
    twitter: X,
    instagram: Camera,
    website: Globe,
};

function FadeUp({
    children,
    delay = 0,
    className,
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export interface MiembroTecnicoSocial {
    platform: "linkedin" | "twitter" | "instagram" | "website";
    url: string;
}

export interface MiembroTecnico {
    name: string;
    role: string;
    tag: string;
    imageUrl?: string;
    description?: string;
    /** Where the member earned their doctorate, e.g. "Ph.D. en Urbanismo, UNAM". */
    doctorado?: string;
    email?: string;
    socials?: MiembroTecnicoSocial[];
}

const DEFAULT_MEMBERS: MiembroTecnico[] = [
    {
        name: "Sofía Arreola",
        role: "Arquitecta Urbanista",
        tag: "SUELO",
        description:
            "Especialista en planeación territorial con más de 10 años diseñando estrategias de uso de suelo para ciudades intermedias en México.",
        doctorado: "Ph.D. en Urbanismo, UNAM",
        email: "sofia.arreola@circulovivo.org",
        socials: [
            { platform: "linkedin", url: "https://linkedin.com" },
            { platform: "website", url: "https://circulovivo.org" },
        ],
    },
    {
        name: "Mateo Ruiz",
        role: "DevOps Engineer",
        tag: "SISTEMAS",
        description:
            "Responsable de la infraestructura de datos geoespaciales del proyecto, automatizando pipelines de ingesta y despliegue.",
        doctorado: "Ph.D. en Ciencias de la Computación, ITESM",
        email: "mateo.ruiz@circulovivo.org",
        socials: [{ platform: "linkedin", url: "https://linkedin.com" }],
    },
    {
        name: "Lucía Méndez",
        role: "Antropóloga Social",
        tag: "SOCIAL",
        description:
            "Investiga las dinámicas comunitarias y de gobernanza local en torno a sistemas alimentarios alternativos.",
        doctorado: "Ph.D. en Antropología Social, El Colegio de México",
        email: "lucia.mendez@circulovivo.org",
        socials: [
            { platform: "instagram", url: "https://instagram.com" },
            { platform: "twitter", url: "https://twitter.com" },
        ],
    },
    {
        name: "Carlos Slim",
        role: "Analista GIS",
        tag: "TERRITORIO",
        description: "Procesa y visualiza datos geoespaciales para mapear iniciativas y patrones de transformación del territorio.",
        doctorado: "Ph.D. en Geografía, UNAM",
        email: "carlos.slim@circulovivo.org",
        socials: [{ platform: "website", url: "https://circulovivo.org" }],
    },
    {
        name: "Valeria Luna",
        role: "Especialista BIM",
        tag: "SUELO",
        description: "Modela infraestructura urbana en BIM para evaluar el impacto de intervenciones en el territorio.",
        doctorado: "Ph.D. en Ingeniería Civil, Universidad de Guadalajara",
        email: "valeria.luna@circulovivo.org",
        socials: [{ platform: "linkedin", url: "https://linkedin.com" }],
    },
    {
        name: "Diego Ferré",
        role: "Frontend Lead",
        tag: "SISTEMAS",
        description: "Lidera el desarrollo de las plataformas digitales del proyecto, priorizando accesibilidad y desempeño.",
        doctorado: "Ph.D. en Ciencias de la Computación, CINVESTAV",
        email: "diego.ferre@circulovivo.org",
        socials: [
            { platform: "linkedin", url: "https://linkedin.com" },
            { platform: "website", url: "https://circulovivo.org" },
        ],
    },
    {
        name: "Ana Paula",
        role: "Mediadora Com.",
        tag: "SOCIAL",
        description: "Facilita procesos de vinculación entre comunidades, gobierno e iniciativa privada.",
        doctorado: "Ph.D. en Estudios Urbanos, ITESO",
        email: "ana.paula@circulovivo.org",
        socials: [{ platform: "instagram", url: "https://instagram.com" }],
    },
    {
        name: "Raúl G.",
        role: "Ecólogo Urbano",
        tag: "TERRITORIO",
        description: "Estudia la interacción entre ecosistemas urbanos y transformación del territorio.",
        doctorado: "Ph.D. en Ecología, UNAM",
        email: "raul.g@circulovivo.org",
        socials: [{ platform: "linkedin", url: "https://linkedin.com" }],
    },
];

/**
 * Project-leadership label for specific members — not part of the tecnico.csv
 * schema, so it's kept as a small hardcoded lookup here rather than a data
 * field. Keyed by exact `name` as it appears in the CSV.
 */
const PROJECT_ROLE_OVERRIDES: Record<string, string> = {
    "Dra. Abril Campos Rivera": "Investigadora principal",
    "Dra. Alejandra González Moreno": "Coordinadora de proyecto",
};

function getProjectRole(name: string): string | undefined {
    return PROJECT_ROLE_OVERRIDES[name.trim()];
}

/** Copyright-free, procedurally generated placeholder headshot (DiceBear Open Peeps, free for commercial use). */
function placeholderPortraitUrl(name: string): string {
    const seed = encodeURIComponent(name.trim().toLowerCase());
    return `https://api.dicebear.com/9.x/open-peeps/png?seed=${seed}&backgroundColor=e5e9f0&size=256`;
}

// ── Member tile ───────────────────────────────────────────

function MemberTile({ member, onOpen }: { member: MiembroTecnico; onOpen: () => void }) {
    const photoUrl = member.imageUrl?.trim() || placeholderPortraitUrl(member.name);
    const projectRole = getProjectRole(member.name);

    return (
        <button
            type="button"
            onClick={onOpen}
            className="group flex flex-col items-center gap-3 w-full h-full text-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            aria-label={`Ver perfil de ${member.name}`}
        >
            {/* Fixed square — width comes from the grid column, not from leftover
                flex space, so every card's photo is exactly the same size
                regardless of how much text the name/role below it takes up. */}
            <div className="relative w-full shrink-0 overflow-hidden rounded-xl bg-neutral-100 transition-transform duration-300 group-hover:scale-[1.02]" style={{ aspectRatio: "1 / 1" }}>
                <Image
                    src={photoUrl}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 31vw, 46vw"
                    className="object-cover object-center"
                    unoptimized={!member.imageUrl?.trim()}
                />
            </div>
            <div className="flex flex-col items-center justify-start gap-0.5 w-full" style={{ minHeight: 56 }}>
                {projectRole && (
                    <p
                        className="font-sans font-bold uppercase text-crimson-400"
                        style={{ fontSize: 11, letterSpacing: 0.8, lineHeight: 1.3 }}
                    >
                        {projectRole}
                    </p>
                )}
                <p className="font-sans font-bold text-[#203b6b]" style={{ fontSize: 20, lineHeight: 1.3 }}>
                    {member.name}
                </p>
                {member.role?.trim() && (
                    <p
                        className="font-sans font-normal text-[#3d5a8a] line-clamp-2"
                        style={{ fontSize: 15, lineHeight: 1.4 }}
                    >
                        {member.role.trim()}
                    </p>
                )}
            </div>
        </button>
    );
}

// ── Modal — split panel (photo left, navy detail panel right); deliberately
// distinct from the ColaboracionesSection carousel modal (white stacked card). ─

function MemberDetailModal({
    member,
    onClose,
}: {
    member: MiembroTecnico;
    onClose: () => void;
}) {
    const photoUrl = member.imageUrl?.trim() || placeholderPortraitUrl(member.name);
    const tag = member.tag?.trim().toUpperCase() ?? "";
    const projectRole = getProjectRole(member.name);

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ backgroundColor: "rgba(15,20,20,0.6)" }}
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
                className="relative flex flex-col md:flex-row w-full overflow-hidden rounded-2xl shadow-xl bg-white"
                style={{ maxWidth: 820, maxHeight: "90vh" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Photo */}
                <div className="relative w-full md:w-[42%] flex-shrink-0" style={{ aspectRatio: "4 / 3" }}>
                    <Image
                        src={photoUrl}
                        alt={member.name}
                        fill
                        sizes="400px"
                        className="object-cover"
                        unoptimized={!member.imageUrl?.trim()}
                    />
                </div>

                {/* Detail panel — white, editorial layout with icon-labeled fields */}
                <div
                    className="flex flex-col gap-5 p-6 md:p-8 overflow-y-auto flex-1"
                    style={{ minHeight: 0 }}
                >
                    <div className="flex flex-col gap-1.5">
                        {projectRole && (
                            <p
                                className="font-sans font-bold uppercase text-crimson-400"
                                style={{ fontSize: 12, letterSpacing: 1, lineHeight: 1.3 }}
                            >
                                {projectRole}
                            </p>
                        )}
                        {tag && (
                            <Chip
                                color="purple"
                                selected
                                className="pointer-events-none w-fit text-[9px] h-6 px-2"
                            >
                                {tag}
                            </Chip>
                        )}
                        <h3
                            className="font-serif italic font-bold text-[#203b6b]"
                            style={{ fontSize: 26, lineHeight: 1.3 }}
                        >
                            {member.name}
                        </h3>
                    </div>

                    {(member.role?.trim() || member.doctorado?.trim()) && (
                        <div className="flex flex-col gap-3">
                            {member.role?.trim() && (
                                <div className="flex items-start gap-2.5">
                                    <Briefcase size={16} className="text-secondary flex-shrink-0 mt-0.5" />
                                    <div className="flex flex-col gap-0.5">
                                        <span
                                            className="font-sans font-semibold uppercase text-neutral-400"
                                            style={{ fontSize: 10, letterSpacing: 0.4 }}
                                        >
                                            Puesto actual
                                        </span>
                                        <p className="font-sans font-normal text-[#1a1c1c]" style={{ fontSize: 14 }}>
                                            {member.role.trim()}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {member.doctorado?.trim() && (
                                <div className="flex items-start gap-2.5">
                                    <GraduationCap size={16} className="text-secondary flex-shrink-0 mt-0.5" />
                                    <div className="flex flex-col gap-0.5">
                                        <span
                                            className="font-sans font-semibold uppercase text-neutral-400"
                                            style={{ fontSize: 10, letterSpacing: 0.4 }}
                                        >
                                            Doctorado
                                        </span>
                                        <p className="font-sans font-normal text-[#1a1c1c]" style={{ fontSize: 14 }}>
                                            {member.doctorado.trim()}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {member.description?.trim() && (
                        <>
                            <div className="h-px bg-neutral-200" />
                            <div className="flex flex-col gap-1.5">
                                <span
                                    className="font-sans font-semibold uppercase text-neutral-400"
                                    style={{ fontSize: 10, letterSpacing: 0.4 }}
                                >
                                    Semblanza
                                </span>
                                <p className="font-sans font-normal text-[#44474f]" style={{ fontSize: 14, lineHeight: 1.7 }}>
                                    {member.description.trim()}
                                </p>
                            </div>
                        </>
                    )}

                    <div className="flex items-center justify-between gap-4 mt-auto pt-1">
                        {member.socials && member.socials.length > 0 && (
                            <div className="flex items-center gap-2">
                                {member.socials.map((social, i) => {
                                    const SocialIcon = SOCIAL_ICONS[social.platform] ?? Link2;
                                    const label = social.platform.charAt(0).toUpperCase() + social.platform.slice(1);
                                    return (
                                        <div key={i} className="group/tooltip relative">
                                            <a
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={label}
                                                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-300 text-neutral-600 hover:border-secondary hover:text-secondary transition-colors"
                                            >
                                                <SocialIcon size={16} />
                                            </a>
                                            <span
                                                role="tooltip"
                                                className="pointer-events-none absolute left-1/2 bottom-full mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#1a1c1c] px-2 py-1 text-white opacity-0 transition-opacity duration-150 group-hover/tooltip:opacity-100"
                                                style={{ fontSize: 11 }}
                                            >
                                                {label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {member.email?.trim() && (
                            <Button
                                color="navy"
                                radius="full"
                                iconRight={Mail}
                                onClick={() => {
                                    window.location.href = `mailto:${member.email}`;
                                }}
                                className="justify-center normal-case tracking-normal font-normal text-sm flex-1"
                            >
                                Contactar
                            </Button>
                        )}
                    </div>
                </div>

                <Button
                    variant="icon"
                    color="neutral"
                    iconLeft={X}
                    onClick={onClose}
                    aria-label="Cerrar"
                    className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white border border-black/10 text-[#1a1c1c] hover:bg-neutral-50"
                />
            </motion.div>
        </motion.div>
    );
}

// ── Section ───────────────────────────────────────────────

export interface EquipoTecnicoSectionProps {
    members?: MiembroTecnico[];
    /** When set, renders a DataUnavailableMessage in place of the grid instead of `members`. */
    state?: DataUnavailableVariant;
}

export function EquipoTecnicoSection({
    members = DEFAULT_MEMBERS,
    state,
}: EquipoTecnicoSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const validMembers = (members ?? []).filter((m) => m && m.name?.trim());

    if (!state && validMembers.length === 0) return null;

    const openMember = openIndex !== null ? validMembers[openIndex] : null;

    return (
        <section className="py-20 md:py-28" style={{ backgroundColor: "#f6f9ff" }}>
            {/* Header */}
            <FadeUp delay={0} className="flex flex-col gap-2 px-6 md:px-16 lg:px-24">
                <Eyebrow color="secondary">Especialistas operativos</Eyebrow>
                <h2
                    className="font-serif font-bold text-[#203b6b] text-[24px] md:text-[32px]"
                    style={{ lineHeight: 1.25 }}
                >
                    Equipo de Investigación
                </h2>
            </FadeUp>

            {state ? (
                <FadeUp delay={0.1} className="mt-12 px-6 md:px-16 lg:px-24">
                    <DataUnavailableMessage variant={state} title="Equipo técnico no disponible" />
                </FadeUp>
            ) : (
                <div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 mt-12 px-6 md:px-16 lg:px-24"
                >
                    {validMembers.map((m, i) => (
                        <FadeUp key={m.name ?? i} delay={Math.min(i * 0.04, 0.4)}>
                            <MemberTile member={m} onOpen={() => setOpenIndex(i)} />
                        </FadeUp>
                    ))}
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {openMember && (
                    <MemberDetailModal
                        member={openMember}
                        onClose={() => setOpenIndex(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
