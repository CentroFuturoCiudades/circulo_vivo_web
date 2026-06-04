"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import {
    Map,
    BarChart2,
    ArrowRight,
    PlayCircle,
    CheckCircle2,
    MoreVertical,
    Plus,
    Sparkles,
    SendHorizontal,
    MoveUpRight,
    ChartColumn,
} from "lucide-react";
import { NavBar } from "@/components/molecules/NavBar";
import { Button } from "@/components/atoms/Button";
import { Chip } from "@/components/atoms/Chip";
import { Footer } from "@/components/molecules/Footer";

// ── Nav links ─────────────────────────────────────────────────────────────────
const NAV_LINKS = [
    { label: "Inicio", href: "/", active: true },
    { label: "Equipo", href: "/equipo" },
    { label: "Mapa", href: "/mapa" },
    { label: "Chatbot", href: "/chatbot" },
    { label: "Indicadores", href: "/indicadores" },
];

// ── Scroll fade-up helper ──────────────────────────────────────────────────────
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

// ── 1. HERO ────────────────────────────────────────────────────────────────────
function HeroSection() {
    return (
        <section className="relative min-h-screen overflow-hidden flex flex-col">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/hero.jpg')" }}
            />
            {/* Gradient overlay — #3F5355 → #332C2C 50% */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to bottom left, #3F5355 0%, rgba(51,44,44,0.5) 100%)",
                }}
            />

            {/* Pattern SVG — white tinted, right-aligned, 10% opacity */}
            <div
                className="absolute inset-y-0 right-0 pointer-events-none select-none"
                style={{
                    width: "45%",
                    backgroundImage: "url('/hero-pattern.svg')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right center",
                    backgroundSize: "contain",
                    opacity: 0.1,
                    filter: "brightness(0) invert(1)",
                }}
            />

            {/* Decorative sphere rings */}
            <div
                className="absolute pointer-events-none select-none"
                style={{ right: -80, top: 0, width: 760, height: 760 }}
            >
                {[320, 390, 460, 530, 600, 670, 740].map((size, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full border border-white/[0.07]"
                        style={{
                            width: size,
                            height: size * 0.58,
                            top: "50%",
                            left: "50%",
                            transform: `translate(-50%, -50%) rotate(${i * 26}deg)`,
                        }}
                    />
                ))}
            </div>

            {/* NavBar */}
            <div className="relative z-20 px-9 pt-5">
                <NavBar
                    links={NAV_LINKS}
                    logoColor="#ffffff"
                    bgColor="#708b8d"
                    bgOpacity={50}
                    blur
                    activeLinkColor="#708b8d"
                    activeLinkOpacity={100}
                    activeLinkTextColor="#ffffff"
                    linkTextColor="#000000"
                    pillBgColor="#ffffff"
                    pillBgOpacity={90}
                />
            </div>

            {/* Hero content */}
            <div
                className="relative z-10 flex-1 mx-auto w-full max-w-[1280px] px-16 flex items-center justify-between"
                style={{ paddingTop: 80, paddingBottom: 80, gap: 80 }}
            >
                {/* Left column */}
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
                    className="flex flex-col gap-6 max-w-[540px]"
                >
                    <h1
                        className="font-sans font-semibold text-white"
                        style={{
                            fontSize: 48,
                            lineHeight: "60px",
                        }}
                    >
                        Transformando los{" "}
                        <span
                            className="font-serif italic font-medium"
                            style={{ fontWeight: 500 }}
                        >
                            Sistemas Alimentarios
                        </span>
                        <br />
                        de México
                    </h1>
                    <p
                        className="font-sans font-normal text-white/90"
                        style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 439 }}
                    >
                        Inteligencia sistémica y datos accionables para
                        regenerar el territorio. Una plataforma para mapear,
                        analizar y conectar.
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Button
                                color="gold"
                                variant="primary"
                                iconRight={MoveUpRight}
                                className="normal-case tracking-normal font-normal text-base h-auto py-4 px-8 rounded-none text-black"
                            >
                                Explorar Mapa
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Button
                                color="white"
                                variant="outline"
                                iconRight={PlayCircle}
                                className="normal-case tracking-normal font-normal text-base h-auto py-4 px-8 rounded-none"
                            >
                                Ver Demostración
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right — floating stat cards */}
                <div
                    className="relative flex-shrink-0"
                    style={{ width: 466, height: 390 }}
                >
                    {/* Card navy */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="absolute"
                        style={{ left: 124, top: 41.5, width: 320 }}
                    >
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="bg-[#395284] p-6"
                        >
                            <p
                                className="font-sans font-medium text-white/80 uppercase"
                                style={{
                                    fontSize: 12,
                                    letterSpacing: "1.2px",
                                    lineHeight: 1,
                                }}
                            >
                                Datos en Tiempo Real
                            </p>
                            <p
                                className="font-sans font-semibold text-white mt-2"
                                style={{ fontSize: 24, lineHeight: 1.3 }}
                            >
                                +1,240
                            </p>
                            <p
                                className="font-sans font-normal text-white/90 mt-1"
                                style={{ fontSize: 14, lineHeight: 1.5 }}
                            >
                                Iniciativas mapeadas en el territorio nacional.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Card gold */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                        className="absolute"
                        style={{ left: 29, top: 195.5, width: 320 }}
                    >
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{
                                duration: 3.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5,
                            }}
                            className="bg-[#bcb884] p-6"
                        >
                            <p
                                className="font-sans font-medium text-white/80 uppercase"
                                style={{
                                    fontSize: 12,
                                    letterSpacing: "1.2px",
                                    lineHeight: 1,
                                }}
                            >
                                Datos en Tiempo Real
                            </p>
                            <p
                                className="font-sans font-semibold text-white mt-2"
                                style={{ fontSize: 24, lineHeight: 1.3 }}
                            >
                                +1,240
                            </p>
                            <p
                                className="font-sans font-normal text-white/90 mt-1"
                                style={{ fontSize: 14, lineHeight: 1.5 }}
                            >
                                Iniciativas mapeadas en el territorio nacional.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ── 2. FEATURE CARDS ──────────────────────────────────────────────────────────
const FEATURES = [
    {
        icon: Map,
        title: "Mapa Interactivo",
        description:
            "Localiza iniciativas de impacto social y ambiental en tiempo real a través de nuestra red georreferenciada.",
        cta: "SABER MÁS",
        href: "/mapa",
    },
    {
        icon: Sparkles,
        title: "Asistente IA",
        description:
            "Consulta tendencias y obtén resúmenes ejecutivos sobre el ecosistema de innovación cívica local.",
        cta: "PROBAR AHORA",
        href: "/chatbot",
    },
    {
        icon: BarChart2,
        title: "Métricas de Impacto",
        description:
            "Visualiza el progreso de los Objetivos de Desarrollo Sostenible con datos duros y actualizados.",
        cta: "VER DATOS",
        href: "/indicadores",
    },
];

function FeatureCardsSection() {
    const router = useRouter();
    return (
        <section className="relative w-full" style={{ padding: "120px 64px" }}>
            {/* Subtle bg gradient */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(222,212,176,0.12) 0%, rgba(209,198,207,0.12) 100%)",
                }}
            />
            <div className="relative mx-auto max-w-[1280px]">
                <div className="grid grid-cols-3 gap-16">
                    {FEATURES.map((feature, i) => (
                        <FadeUp
                            key={feature.title}
                            delay={i * 0.12}
                            className="flex flex-col gap-3"
                        >
                            {/* Icon container */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="w-12 h-12 flex items-center justify-center border border-[#561427] rounded-[4px]"
                            >
                                <feature.icon
                                    size={20}
                                    className="text-[#561427]"
                                />
                            </motion.div>

                            <h3
                                className="font-serif font-bold text-[#1a1c1c] mt-1"
                                style={{ fontSize: 24, lineHeight: 1.3 }}
                            >
                                {feature.title}
                            </h3>

                            <p
                                className="font-sans font-normal text-[#5e5e5e]"
                                style={{ fontSize: 16, lineHeight: 1.5 }}
                            >
                                {feature.description}
                            </p>

                            <Button
                                color="crimson"
                                variant="primary"
                                iconRight={ArrowRight}
                                onClick={() => router.push(feature.href)}
                                className="normal-case tracking-normal font-normal text-base h-auto py-1.5 px-2"
                            >
                                {feature.cta}
                            </Button>
                        </FadeUp>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ── 3. CHATBOT HIGHLIGHT ──────────────────────────────────────────────────────
function ChatbotMock() {
    return (
        <div
            className="relative overflow-hidden bg-white"
            style={{ width: 572, height: 653, borderRadius: 16 }}
        >
            {/* ── Header (absolute overlay, 64px) ── */}
            <div
                className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between"
                style={{
                    height: 64,
                    padding: "12px 24px",
                    background: "rgba(255,249,237,0.70)",
                    backdropFilter: "blur(17.5px)",
                    boxShadow: "0 1px 1.75px rgba(0,0,0,0.05)",
                }}
            >
                <div className="flex items-center gap-3">
                    {/* Avatar with gold online badge */}
                    <div
                        className="relative shrink-0 flex items-center justify-center overflow-hidden"
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 9999,
                            background: "#f8eec9",
                            border: "1px solid rgba(193,200,200,0.3)",
                        }}
                    >
                        <img
                            src="/logo.svg"
                            alt=""
                            className="w-full h-full object-contain"
                        />
                        <div
                            className="absolute"
                            style={{
                                width: 12,
                                height: 12,
                                borderRadius: 9999,
                                background: "#bcb884",
                                border: "2px solid #fff9ed",
                                right: 0,
                                bottom: 0,
                            }}
                        />
                    </div>
                    <div>
                        <p
                            className="font-sans font-semibold text-[#1a1c1c]"
                            style={{ fontSize: 14, lineHeight: 1.3 }}
                        >
                            Círculo Vivo
                        </p>
                        <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#bcb884ff]" />
                            <p
                                className="font-sans text-[#466062b2]"
                                style={{ fontSize: 11 }}
                            >
                                EN LÍNEA
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="flex items-center justify-center"
                    style={{ width: 40, height: 40, borderRadius: 9999 }}
                >
                    <MoreVertical size={16} className="text-[#414848]" />
                </div>
            </div>

            {/* ── Chat canvas (padding-top 96 clears header, sides from card padding 16) ── */}
            <div
                className="flex flex-col overflow-hidden"
                style={{ padding: "96px 16px 148px 16px" }}
            >
                {/* Bot welcome message */}
                <div
                    style={{
                        background: "#fef4ce",
                        borderRadius: "0 12px 12px 12px",
                        padding: 24,
                        border: "1px solid rgba(193,200,200,0.2)",
                    }}
                >
                    <p
                        className="font-sans text-[#201c05]"
                        style={{ fontSize: 16, lineHeight: 1.5 }}
                    >
                        ¿Qué quieres saber sobre las iniciativas que están
                        transformando los sistemas alimentarios?
                    </p>
                </div>

                {/* Subtitle italic */}
                <p
                    className="font-sans italic text-[#414848]"
                    style={{
                        fontSize: 14,
                        lineHeight: 1.43,
                        marginTop: 12,
                        padding: "0 12px",
                    }}
                >
                    Selecciona un tema o escribe una pregunta para analizar
                    nuestra base de datos cualitativa.
                </p>

                {/* Chips — una sola línea, componente Chip */}
                <div
                    className="flex"
                    style={{ gap: 12, marginTop: 48, padding: "0 12px" }}
                >
                    {["Barreras", "Estrategias", "Actores"].map((chip) => (
                        <Chip
                            key={chip}
                            color="secondary"
                            className="text-[#455E90]"
                        >
                            {chip}
                        </Chip>
                    ))}
                    <Chip color="gold" selected className="text-white">
                        Huertos Escolares
                    </Chip>
                </div>

                {/* User message — right aligned, border-radius 12 0 12 12 */}
                <div className="flex justify-end" style={{ marginTop: 48 }}>
                    <div
                        style={{
                            background: "#395284",
                            borderRadius: "12px 0 12px 12px",
                            padding: 24,
                            width: 328,
                        }}
                    >
                        <p
                            className="font-sans text-white"
                            style={{ fontSize: 14, lineHeight: 1.5 }}
                        >
                            Explícame sobre los huertos escolares.
                        </p>
                    </div>
                </div>

                {/* Typing dots — marginTop 48, color #466062, opacity 0.5 */}
                <div
                    className="flex items-center"
                    style={{
                        gap: 4,
                        marginTop: 48,
                        padding: "12px 24px",
                        opacity: 0.5,
                    }}
                >
                    {[0, 150, 300].map((d) => (
                        <motion.span
                            key={d}
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: 9999,
                                background: "#466062",
                                display: "block",
                            }}
                            animate={{ y: [0, -3, 0] }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: d / 1000,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* ── Footer (absolute overlay, y:541, 110px) ── */}
            <div
                className="absolute left-0 right-0 flex flex-col"
                style={{
                    top: 541,
                    height: 110,
                    padding: "12px 16px 8px 16px",
                    background: "rgba(255,249,237,0.90)",
                    backdropFilter: "blur(10.5px)",
                }}
            >
                {/* Footnote — centered */}
                <div style={{ paddingBottom: 12 }}>
                    <p
                        className="font-sans font-semibold text-center"
                        style={{
                            fontSize: 12,
                            lineHeight: 1.25,
                            color: "#727879",
                            letterSpacing: 0.6,
                        }}
                    >
                        Basado en el análisis cualitativo de XX horas de
                        entrevistas semiestructuradas con sistemas alimentarios
                        locales.
                    </p>
                </div>
                {/* Input bar — pill shape, border #c1c8c8, send teal #708b8d */}
                <div
                    className="flex items-center bg-white"
                    style={{
                        borderRadius: 9999,
                        border: "1px solid #c1c8c8",
                        padding: "4px 24px",
                        boxShadow: "0 1px 1.75px rgba(0,0,0,0.05)",
                    }}
                >
                    <div className="shrink-0" style={{ paddingRight: 12 }}>
                        <Plus size={20} className="text-[#708b8d]" />
                    </div>
                    <div
                        className="flex-1"
                        style={{ padding: "9px 12px 10px 12px" }}
                    >
                        <p
                            className="font-sans text-[#a1a1aa]"
                            style={{ fontSize: 14 }}
                        >
                            Escribe tu pregunta aquí...
                        </p>
                    </div>
                    <div style={{ paddingLeft: 12 }}>
                        <div
                            className="flex items-center justify-center rounded-full"
                            style={{
                                width: 40,
                                height: 40,
                                background: "#708b8d",
                            }}
                        >
                            <SendHorizontal size={16} className="text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ChatbotHighlightSection() {
    const router = useRouter();
    return (
        <section
            className="relative w-full overflow-hidden"
            style={{ padding: "0" }}
        >
            <div className="absolute inset-0 bg-white" />
            {/* Pattern SVG — left-aligned, low opacity */}
            <div
                className="absolute inset-y-0 left-0 pointer-events-none select-none"
                style={{
                    width: "60%",
                    backgroundImage: "url('/pattern.svg')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left center",
                    backgroundSize: "contain",
                    opacity: 0.08,
                }}
            />

            <div
                className="relative mx-auto max-w-[1280px] flex items-start gap-0"
                style={{ minHeight: 813 }}
            >
                {/* Left — chatbot preview */}
                <FadeUp
                    delay={0}
                    className="flex items-center justify-center px-8 py-20 flex-shrink-0"
                >
                    <ChatbotMock />
                </FadeUp>

                {/* Right — text content */}
                <div
                    className="flex flex-col justify-center px-8 py-20"
                    style={{ gap: 24 }}
                >
                    <FadeUp delay={0.1}>
                        <h2
                            className="font-sans font-semibold text-[#395284]"
                            style={{
                                fontSize: 38.67,
                                maxWidth: 552,
                                color: "#BCB884",
                                lineHeight: "50.27px",
                            }}
                        >
                            La información que necesitas, al
                            <br />
                            <span
                                className="font-serif font-medium italic"
                                style={{
                                    fontSize: 38.67,
                                    color: "#395284",
                                    lineHeight: "50.27px",
                                }}
                            >
                                alcance de una pregunta.
                            </span>
                        </h2>
                    </FadeUp>

                    <FadeUp delay={0.2}>
                        <p
                            className="font-sans font-normal text-[#5e5e5e]"
                            style={{
                                fontSize: 16,
                                lineHeight: 1.5,
                                maxWidth: 413,
                            }}
                        >
                            Nuestra plataforma utiliza procesamiento de lenguaje
                            natural para navegar entre miles de puntos de datos,
                            permitiéndote obtener insights estratégicos en
                            segundos sin necesidad de ser un experto en datos.
                        </p>
                    </FadeUp>

                    <FadeUp delay={0.3}>
                        <ul className="flex flex-col gap-3">
                            {[
                                "Análisis comparativo por regiones",
                                "Detección de brechas de innovación",
                                "Reportes automáticos descargables",
                            ].map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle2
                                        size={18}
                                        className="text-[#395284] flex-shrink-0"
                                    />
                                    <span
                                        className="font-sans font-normal text-[#395284]"
                                        style={{
                                            fontSize: 16,
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </FadeUp>

                    <FadeUp delay={0.4}>
                        <Button
                            color="navy"
                            variant="primary"
                            iconRight={ArrowRight}
                            onClick={() => router.push("/chatbot")}
                            className="normal-case tracking-normal font-normal text-base h-auto py-1.5 px-2"
                        >
                            EMPIEZA AHORA
                        </Button>
                    </FadeUp>
                </div>
            </div>
        </section>
    );
}

// ── 4. NAVEGA EL ECOSISTEMA ───────────────────────────────────────────────────
function EcosystemMapSection() {
    const router = useRouter();
    return (
        <section
            className="relative w-full overflow-hidden"
            style={{ height: 640 }}
        >
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/navigate-eco.jpg')" }}
            />
            {/* Crimson overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: "rgba(86,20,39,0.5)",
                    backdropFilter: "blur(0.875px)",
                }}
            />

            {/* Center card */}
            <div className="relative z-10 h-full flex items-center justify-center">
                <FadeUp>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="relative overflow-hidden"
                        style={{ width: 512, borderRadius: 8 }}
                    >
                        {/* Crimson bg */}
                        <div className="absolute inset-0 bg-[#561427]" />
                        {/* Content */}
                        <div className="relative z-10 p-12 flex flex-col items-center gap-2">
                            <h2
                                className="font-serif font-semibold text-white text-center"
                                style={{
                                    fontSize: 32,
                                    lineHeight: "40px",
                                    marginBottom: 12,
                                }}
                            >
                                Navega el ecosistema
                            </h2>
                            <p
                                className="font-sans font-regular text-white text-center"
                                style={{
                                    fontSize: 16,
                                    lineHeight: "24px",
                                    paddingBottom: 40,
                                }}
                            >
                                Visualiza la distribución geográfica de los
                                esfuerzos ciudadanos y encuentra colaboradores
                                potenciales cerca de ti.
                            </p>
                            <Button
                                color="gold"
                                variant="primary"
                                iconLeft={Map}
                                radius="sm"
                                onClick={() => router.push("/mapa")}
                                className="normal-case tracking-normal font-normal text-base text-black h-auto py-4 px-8"
                            >
                                Abrir mapa completo
                            </Button>
                        </div>
                    </motion.div>
                </FadeUp>
            </div>
        </section>
    );
}

// ── 5. INDICATORS DASHBOARD ───────────────────────────────────────────────────
const CHART_DATA = [
    { state: "Chiapas", value: 0.09 },
    { state: "Hidalgo", value: 0.081 },
    { state: "Veracruz", value: 0.062 },
    { state: "Puebla", value: 0.061 },
    { state: "San Luis Potosí", value: 0.06 },
    { state: "Oaxaca", value: 0.06 },
    { state: "Tabasco", value: 0.048 },
    { state: "Guerrero", value: 0.035 },
];

const BAR_COLORS: Record<string, string> = {
    Chiapas: "#bcb884",
    Hidalgo: "#395284",
    Veracruz: "#708b8d",
    Puebla: "#395284",
    "San Luis Potosí": "#708b8d",
    Oaxaca: "#708b8d",
    Tabasco: "#582a56",
    Guerrero: "#582a56",
};

function IndicatorsDashboardSection() {
    const router = useRouter();
    const maxVal = Math.max(...CHART_DATA.map((d) => d.value));
    return (
        <section className="w-full" style={{ padding: "120px 0" }}>
            <div
                className="mx-auto flex items-center justify-center gap-20"
                style={{ maxWidth: 1280, padding: "0 32px" }}
            >
                {/* Left — text */}
                <FadeUp
                    delay={0}
                    className="flex flex-col gap-5 shrink-0 w-[379px]"
                >
                    <h2
                        className="font-sans font-semibold text-[#1a1c1c]"
                        style={{
                            fontSize: 32,
                            letterSpacing: "-0.32px",
                            lineHeight: "40px",
                        }}
                    >
                        Visualiza lo{" "}
                        <em
                            className="font-serif not-italic text-[#bcb884] font-medium"
                            style={{ fontStyle: "italic" }}
                        >
                            invisible
                        </em>
                    </h2>
                    <p
                        className="font-sans font-normal text-[#5f5e5e]"
                        style={{ fontSize: 16, lineHeight: 1.6, maxWidth: 373 }}
                    >
                        Dashboards diseñados para la toma de decisiones. KPIs de
                        resiliencia, salud del suelo e impacto social integrados
                        en una sola vista.
                    </p>
                    <Button
                        color="gold"
                        variant="outline"
                        iconRight={ChartColumn}
                        onClick={() => router.push("/indicadores")}
                        className="normal-case tracking-normal font-normal text-base h-auto py-3 px-8 w-fit text-[#bcb884] hover:text-white [&>svg]:text-[#bcb884] hover:[&>svg]:text-white"
                    >
                        Ver Indicadores
                    </Button>
                </FadeUp>

                {/* Right — chart card */}
                <FadeUp delay={0.15}>
                    <div
                        className="bg-white"
                        style={{
                            width: 565,
                            borderRadius: 16,
                            border: "1px solid #d1c6cf",
                            boxShadow:
                                "0 1px 2.625px rgba(0,0,0,0.04), 0 2px 10.5px rgba(57,82,132,0.07)",
                            padding: "25px 25px 20px 25px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 20,
                        }}
                    >
                        {/* Chart header */}
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex flex-col gap-0.5">
                                <p
                                    className="font-sans font-semibold text-[#1a1c1c]"
                                    style={{ fontSize: 14 }}
                                >
                                    Top 8 Ganadores de Impacto
                                </p>
                                <p
                                    className="font-sans text-[#71717a]"
                                    style={{ fontSize: 11 }}
                                >
                                    Estados con mayor ganancia en índice IISE
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: "#bcb884" }}
                                />
                                <span
                                    className="font-sans text-[#71717a]"
                                    style={{ fontSize: 11 }}
                                >
                                    Delta IISE
                                </span>
                            </div>
                        </div>
                        {/* Bars */}
                        <div className="flex flex-col gap-2.5">
                            {CHART_DATA.map((item) => (
                                <div
                                    key={item.state}
                                    className="flex items-center gap-3"
                                >
                                    <span
                                        className="font-sans text-[#71717a] text-right shrink-0"
                                        style={{ fontSize: 11, width: 100 }}
                                    >
                                        {item.state}
                                    </span>
                                    <div className="flex-1 h-5 bg-[#f4f4f5] rounded-sm overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-sm"
                                            style={{
                                                backgroundColor:
                                                    BAR_COLORS[item.state] ??
                                                    "#708b8d",
                                            }}
                                            initial={{ width: 0 }}
                                            whileInView={{
                                                width: `${(item.value / maxVal) * 100}%`,
                                            }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.7,
                                                ease: "easeOut",
                                                delay: 0.1,
                                            }}
                                        />
                                    </div>
                                    <span
                                        className="font-sans font-semibold text-[#1a1c1c] shrink-0"
                                        style={{
                                            fontSize: 11,
                                            width: 48,
                                            textAlign: "right",
                                        }}
                                    >
                                        +{item.value.toFixed(3)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        {/* X-axis ticks */}
                        <div
                            className="flex items-center"
                            style={{ paddingLeft: 112, paddingRight: 60 }}
                        >
                            {[0, 0.025, 0.05, 0.075, 0.1].map((tick) => (
                                <span
                                    key={tick}
                                    className="font-sans text-[#a1a1aa] flex-1 text-center"
                                    style={{ fontSize: 10 }}
                                >
                                    {tick === 0 ? "0" : tick.toFixed(3)}
                                </span>
                            ))}
                        </div>
                    </div>
                </FadeUp>
            </div>
        </section>
    );
}

// ── 6. CONVERSION BANNER ──────────────────────────────────────────────────────
function ConversionBannerSection() {
    const router = useRouter();
    return (
        <section
            className="relative overflow-hidden"
            style={{ margin: "0 36px", padding: "60px 0" }}
        >
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/join-transformation.jpg')" }}
            />
            {/* Dark overlay */}
            <div
                className="absolute inset-0"
                style={{ background: "rgba(0,0,0,0.5)" }}
            />

            <div
                className="relative z-10 mx-auto flex items-center justify-between"
                style={{ maxWidth: 1216, padding: 80, gap: 329 }}
            >
                <FadeUp delay={0} className="flex flex-col gap-2">
                    <h2
                        className="font-sans font-semibold text-white"
                        style={{
                            fontSize: 32,
                            letterSpacing: "-0.32px",
                            lineHeight: 1.2,
                            maxWidth: 544,
                        }}
                    >
                        Únete a la red de transformación
                    </h2>
                    <p
                        className="font-sans font-normal text-white"
                        style={{ fontSize: 18, lineHeight: 1.6 }}
                    >
                        Impulsa proyectos con impacto sistémico real.
                    </p>
                </FadeUp>

                <FadeUp delay={0.2} className="shrink-0">
                    <Button
                        color="gold"
                        variant="primary"
                        onClick={() => router.push("#")}
                        className="normal-case tracking-normal font-normal text-black hover:text-white h-auto py-5 px-12 bg-[#DED4B0] hover:bg-[#c9bc95]"
                        style={{ fontSize: 18 }}
                    >
                        Solicitar Acceso
                    </Button>
                </FadeUp>
            </div>
        </section>
    );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
    return (
        <main className="w-full">
            <HeroSection />
            <FeatureCardsSection />
            <ChatbotHighlightSection />
            <EcosystemMapSection />
            <IndicatorsDashboardSection />
            <ConversionBannerSection />
            <Footer />
        </main>
    );
}
