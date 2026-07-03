"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Briefcase, Camera, Globe, Link2, Mail, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CarouselArrow } from "@/components/atoms/CarouselArrow";
import { Chip } from "@/components/atoms/Chip";
import { Button } from "@/components/atoms/Button";
import { Eyebrow } from "@/components/atoms/Eyebrow";

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
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: "easeOut", delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

const TAG_COLORS: Record<string, string> = {
    SUELO: "#264042",
    SISTEMAS: "#203b6b",
    SOCIAL: "#7f4d7b",
    TERRITORIO: "#395284",
};

const SOCIAL_ICONS: Record<string, LucideIcon> = {
    linkedin: Briefcase,
    twitter: X,
    instagram: Camera,
    website: Globe,
};

/** Copyright-free, procedurally generated placeholder avatar (DiceBear Open Peeps, free for commercial use). */
function placeholderAvatarUrl(name: string, tagColor: string): string {
    const seed = encodeURIComponent(name.trim().toLowerCase());
    const bg = tagColor.replace("#", "");
    return `https://api.dicebear.com/9.x/open-peeps/png?seed=${seed}&backgroundColor=${bg}&size=512`;
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
    email?: string;
    socials?: MiembroTecnicoSocial[];
}

const DEFAULT_MEMBERS: MiembroTecnico[] = [
    { name: "Sofía Arreola", role: "Arquitecta Urbanista", tag: "SUELO" },
    { name: "Mateo Ruiz", role: "DevOps Engineer", tag: "SISTEMAS" },
    { name: "Lucía Méndez", role: "Antropóloga Social", tag: "SOCIAL" },
    { name: "Carlos Slim", role: "Analista GIS", tag: "TERRITORIO" },
    { name: "Valeria Luna", role: "Especialista BIM", tag: "SUELO" },
    { name: "Diego Ferré", role: "Frontend Lead", tag: "SISTEMAS" },
    { name: "Ana Paula", role: "Mediadora Com.", tag: "SOCIAL" },
    { name: "Raúl G.", role: "Ecólogo Urbano", tag: "TERRITORIO" },
    { name: "Inés Vega", role: "Ciencia de Datos", tag: "SISTEMAS" },
    { name: "Hugo Boss", role: "Legal Project Mgr", tag: "SOCIAL" },
    { name: "Marta Díaz", role: "Planificadora", tag: "SUELO" },
    { name: "Kevin M.", role: "QA Tester", tag: "SISTEMAS" },
    { name: "Julia Sol", role: "Diseño Visual", tag: "SOCIAL" },
    { name: "Esteban Q.", role: "Hidrólogo", tag: "TERRITORIO" },
];

const COLLAPSED_WIDTH = 220;
const EXPANDED_WIDTH = 380;

// ── Card ──────────────────────────────────────────────────

function MemberCard({
    member,
    hovered,
    onHover,
    onLeave,
    onOpen,
}: {
    member: MiembroTecnico;
    hovered: boolean;
    onHover: () => void;
    onLeave: () => void;
    onOpen: () => void;
}) {
    const tag = member.tag?.trim().toUpperCase() ?? "";
    const tagColor = TAG_COLORS[tag] ?? "#203b6b";
    const isPlaceholder = !member.imageUrl?.trim();
    const photoUrl = member.imageUrl?.trim() || placeholderAvatarUrl(member.name, tagColor);

    return (
        <motion.button
            type="button"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            onFocus={onHover}
            onBlur={onLeave}
            onClick={onOpen}
            animate={{ width: hovered ? EXPANDED_WIDTH : COLLAPSED_WIDTH }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="relative flex-shrink-0 overflow-hidden rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            style={{ height: 380, backgroundColor: tagColor }}
            aria-label={`Ver perfil de ${member.name}`}
        >
            {/* Photo — real photos fill the card; generated placeholder avatars are contained (they're square headshots and crop badly on this tall aspect) */}
            {isPlaceholder ? (
                <div className="absolute inset-x-0 bottom-0" style={{ height: "82%" }}>
                    <Image
                        src={photoUrl}
                        alt={member.name}
                        fill
                        sizes="300px"
                        className="object-contain object-bottom"
                        unoptimized
                    />
                </div>
            ) : (
                <Image
                    src={photoUrl}
                    alt={member.name}
                    fill
                    sizes="300px"
                    className="object-cover"
                />
            )}

            {/* Gradient overlay */}
            <div
                className="absolute inset-x-0 bottom-0 pointer-events-none"
                style={{
                    height: "60%",
                    background:
                        "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.75) 100%)",
                }}
            />

            {/* Info — fades/slides in on hover */}
            <motion.div
                initial={false}
                animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1.5 p-4"
            >
                <p
                    className="font-serif italic font-bold text-white whitespace-nowrap"
                    style={{ fontSize: 16, lineHeight: 1.3 }}
                >
                    {member.name}
                </p>
                {member.role?.trim() && (
                    <p
                        className="font-sans font-normal text-white/85 whitespace-nowrap"
                        style={{ fontSize: 11, lineHeight: 1.4 }}
                    >
                        {member.role.trim()}
                    </p>
                )}
                {tag && (
                    <span
                        className="font-sans font-normal text-white rounded-full text-center whitespace-nowrap"
                        style={{
                            fontSize: 9,
                            padding: "2px 8px",
                            backgroundColor: "rgba(255,255,255,0.22)",
                            letterSpacing: -0.225,
                            lineHeight: 1.5,
                        }}
                    >
                        {tag}
                    </span>
                )}
            </motion.div>
        </motion.button>
    );
}

// ── Modal ─────────────────────────────────────────────────

function MemberModal({
    member,
    onClose,
}: {
    member: MiembroTecnico;
    onClose: () => void;
}) {
    const tag = member.tag?.trim().toUpperCase() ?? "";
    const tagColor = TAG_COLORS[tag] ?? "#203b6b";
    const photoUrl =
        member.imageUrl?.trim() || placeholderAvatarUrl(member.name, tagColor);

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
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
                className="relative flex flex-col w-full overflow-hidden bg-white rounded-2xl shadow-xl"
                style={{ maxWidth: 400, maxHeight: "90vh" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Photo */}
                <div
                    className="relative w-full flex-shrink-0"
                    style={{ aspectRatio: "4 / 3" }}
                >
                    <Image
                        src={photoUrl}
                        alt={member.name}
                        fill
                        sizes="400px"
                        className="object-cover"
                        unoptimized={!member.imageUrl?.trim()}
                        style={{ backgroundColor: tagColor }}
                    />
                    <Button
                        variant="icon"
                        color="neutral"
                        iconLeft={X}
                        onClick={onClose}
                        aria-label="Cerrar"
                        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white border border-black/10 text-[#1a1c1c] hover:bg-neutral-50"
                    />
                </div>

                {/* Details */}
                <div
                    className="flex flex-col gap-4 p-6 md:p-8 overflow-y-auto"
                    style={{ minHeight: 0 }}
                >
                    <div className="flex flex-col gap-1.5">
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
                        {member.role?.trim() && (
                            <p
                                className="font-sans font-normal text-[#747780]"
                                style={{ fontSize: 13 }}
                            >
                                {member.role.trim()}
                            </p>
                        )}
                    </div>

                    {member.description?.trim() && (
                        <>
                            <div className="h-px bg-neutral-200" />
                            <p
                                className="font-sans font-normal text-[#44474f]"
                                style={{ fontSize: 14, lineHeight: 1.7 }}
                            >
                                {member.description.trim()}
                            </p>
                        </>
                    )}

                    {member.socials && member.socials.length > 0 && (
                        <div className="flex items-center gap-2">
                            {member.socials.map((social, i) => {
                                const SocialIcon =
                                    SOCIAL_ICONS[social.platform] ?? Link2;
                                return (
                                    <a
                                        key={i}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.platform}
                                        className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-300 text-neutral-600 hover:border-secondary hover:text-secondary transition-colors"
                                    >
                                        <SocialIcon size={16} />
                                    </a>
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
                            className="w-full justify-center normal-case tracking-normal font-normal text-sm mt-1"
                        >
                            Contactar
                        </Button>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

// ── Section ───────────────────────────────────────────────

export interface EquipoTecnicoSectionProps {
    members?: MiembroTecnico[];
}

export function EquipoTecnicoSection({
    members = DEFAULT_MEMBERS,
}: EquipoTecnicoSectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const validMembers = (members ?? []).filter((m) => m && m.name?.trim());

    function scroll(dir: "left" | "right") {
        scrollRef.current?.scrollBy({
            left: dir === "right" ? 320 : -320,
            behavior: "smooth",
        });
    }

    if (validMembers.length === 0) return null;

    const openMember = openIndex !== null ? validMembers[openIndex] : null;

    return (
        <section className="py-20 md:py-28" style={{ backgroundColor: "#f6f9ff" }}>
            {/* Header */}
            <FadeUp
                delay={0}
                className="flex flex-wrap items-center justify-between gap-4 px-6 md:px-16 lg:px-24"
            >
                <div>
                    <Eyebrow color="secondary">Especialistas operativos</Eyebrow>
                    <h2
                        className="font-serif font-bold text-[#203b6b] text-[24px] md:text-[32px]"
                        style={{ lineHeight: 1.25 }}
                    >
                        Equipo de Investigación
                    </h2>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <CarouselArrow
                        direction="prev"
                        onClick={() => scroll("left")}
                    />
                    <CarouselArrow
                        direction="next"
                        onClick={() => scroll("right")}
                    />
                </div>
            </FadeUp>

            {/* Slider */}
            <div
                ref={scrollRef}
                className="flex mt-8 pb-2 overflow-x-auto px-6 md:px-16 lg:px-24"
                style={{ scrollbarWidth: "none", gap: 12, overflowY: "hidden" }}
            >
                {validMembers.map((m, i) => (
                    <FadeUp
                        key={m.name ?? i}
                        delay={Math.min(i * 0.04, 0.4)}
                        className="flex-shrink-0"
                    >
                        <MemberCard
                            member={m}
                            hovered={hoveredIndex === i}
                            onHover={() => setHoveredIndex(i)}
                            onLeave={() =>
                                setHoveredIndex((prev) =>
                                    prev === i ? null : prev,
                                )
                            }
                            onOpen={() => setOpenIndex(i)}
                        />
                    </FadeUp>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {openMember && (
                    <MemberModal
                        member={openMember}
                        onClose={() => setOpenIndex(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
