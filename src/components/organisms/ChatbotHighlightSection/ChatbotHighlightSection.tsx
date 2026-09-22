"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  MoreVertical,
  Plus,
  SendHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { Chip } from "@/components/atoms/Chip";

// ── Looping demo conversation ───────────────────────────────
// Cycles through the same topics offered as chips, typing the question into
// the input, "sending" it, showing a thinking state, then the answer — so a
// visitor scrolling past understands what the real chatbot does without
// having to click into it.

const DEMO_QA = [
  {
    chip: "Barreras",
    question: "¿Qué barreras enfrentan las iniciativas para crecer y sostenerse?",
    answer:
      "Sobre todo falta de financiamiento, acceso limitado a mercados y poca infraestructura para distribuir sus productos.",
  },
  {
    chip: "Estrategias",
    question: "¿Qué estrategias han diseñado para lograr sus cambios?",
    answer:
      "Construyen redes de colaboración, diversifican sus canales de venta y fortalecen las capacidades técnicas de su equipo.",
  },
  {
    chip: "Facilitadores",
    question: "¿Qué las ayuda a mantenerse y crecer?",
    answer:
      "El respaldo de redes comunitarias, alianzas institucionales y el acceso a nuevas tecnologías.",
  },
  {
    chip: "Motivaciones",
    question: "¿Qué las motiva a hacer este trabajo?",
    answer:
      "La convicción de construir sistemas alimentarios más justos, saludables y sostenibles para sus comunidades.",
  },
] as const;

type Phase = "typing" | "sent" | "thinking" | "answered" | "clearing";

const TYPING_MS_PER_CHAR = 32;
const HOLD_BEFORE_SEND_MS = 500;
const HOLD_BEFORE_THINK_MS = 550;
const THINKING_MS = 1300;
const HOLD_ANSWER_MS = 3200;
const CLEAR_MS = 450;

// Reads prefers-reduced-motion without a hydration mismatch: the server
// snapshot always reports "no preference" (SSR has no window), then React
// re-checks the real client snapshot right after mount — same pattern as
// the mapa page's useIsMobile/introSeen reads.
function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}
function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, getReducedMotionServerSnapshot);
}

/** Drives the looping typing → send → thinking → answered → clearing state machine. */
function useChatDemo() {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [typedLength, setTypedLength] = useState(0);
  const current = DEMO_QA[index];

  // Character-by-character reveal while typing
  useEffect(() => {
    if (reducedMotion || phase !== "typing") return;
    if (typedLength >= current.question.length) {
      const t = setTimeout(() => setPhase("sent"), HOLD_BEFORE_SEND_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTypedLength((l) => l + 1), TYPING_MS_PER_CHAR);
    return () => clearTimeout(t);
  }, [phase, typedLength, current.question.length, reducedMotion]);

  // Remaining phase transitions
  useEffect(() => {
    if (reducedMotion) return;
    if (phase === "sent") {
      const t = setTimeout(() => setPhase("thinking"), HOLD_BEFORE_THINK_MS);
      return () => clearTimeout(t);
    }
    if (phase === "thinking") {
      const t = setTimeout(() => setPhase("answered"), THINKING_MS);
      return () => clearTimeout(t);
    }
    if (phase === "answered") {
      const t = setTimeout(() => setPhase("clearing"), HOLD_ANSWER_MS);
      return () => clearTimeout(t);
    }
    if (phase === "clearing") {
      const t = setTimeout(() => {
        setIndex((i) => (i + 1) % DEMO_QA.length);
        setTypedLength(0);
        setPhase("typing");
      }, CLEAR_MS);
      return () => clearTimeout(t);
    }
  }, [phase, reducedMotion]);

  if (reducedMotion) {
    // Static, non-animated frame — respects prefers-reduced-motion.
    return { current: DEMO_QA[0], phase: "answered" as Phase, typedText: "", reducedMotion };
  }

  return {
    current,
    phase,
    typedText: phase === "typing" ? current.question.slice(0, typedLength) : "",
    reducedMotion,
  };
}

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

function ChatbotMock() {
  const { current, phase, typedText } = useChatDemo();
  const showUserBubble = phase !== "typing";
  const showThinking = phase === "thinking";
  const showAnswer = phase === "answered" || phase === "clearing";
  const isClearing = phase === "clearing";

  return (
    <div
      className="relative overflow-hidden bg-white"
      style={{ width: 572, height: 653, borderRadius: 16 }}
      aria-hidden="true"
    >
      {/* Header */}
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
            <img src="/logo.svg" alt="" className="w-full h-full object-contain" />
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
            <p className="font-sans font-semibold text-[#1a1c1c]" style={{ fontSize: 14, lineHeight: 1.3 }}>
              Círculo Vivo
            </p>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#bcb884ff]" />
              <p className="font-sans text-[#466062b2]" style={{ fontSize: 11 }}>
                EN LÍNEA
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center" style={{ width: 40, height: 40, borderRadius: 9999 }}>
          <MoreVertical size={16} className="text-[#414848]" />
        </div>
      </div>

      {/* Chat canvas */}
      <div className="flex flex-col overflow-hidden" style={{ padding: "88px 16px 148px 16px" }}>
        <div
          style={{
            background: "#fef4ce",
            borderRadius: "0 12px 12px 12px",
            padding: "16px 20px",
            border: "1px solid rgba(193,200,200,0.2)",
          }}
        >
          <p className="font-sans text-[#201c05]" style={{ fontSize: 15, lineHeight: 1.5 }}>
            ¿Qué quieres saber sobre las personas y proyectos que están cambiando nuestra forma de producir, distribuir y consumir alimentos?
          </p>
        </div>

        <p
          className="font-sans italic text-[#414848]"
          style={{ fontSize: 14, lineHeight: 1.43, marginTop: 12, padding: "0 12px" }}
        >
          Selecciona un tema o escribe una pregunta para analizar nuestra base de datos cualitativa.
        </p>

        <div className="flex" style={{ gap: 12, marginTop: 28, padding: "0 12px" }}>
          {DEMO_QA.map((qa) => {
            const active = qa.chip === current.chip;
            return (
              <Chip
                key={qa.chip}
                as="span"
                color={active ? "gold" : "secondary"}
                selected={active}
                className={active ? "text-white" : "text-[#455E90]"}
              >
                {qa.chip}
              </Chip>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {showUserBubble && (
            <motion.div
              key={`user-${current.question}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex justify-end"
              style={{ marginTop: 28 }}
            >
              <div
                style={{
                  background: "#395284",
                  borderRadius: "12px 0 12px 12px",
                  padding: "16px 20px",
                  maxWidth: 328,
                }}
              >
                <p className="font-sans text-white" style={{ fontSize: 14, lineHeight: 1.5 }}>
                  {current.question}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showThinking && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
              style={{ gap: 4, marginTop: 20, padding: "12px 24px", opacity: 0.5 }}
            >
              {[0, 150, 300].map((d) => (
                <motion.span
                  key={d}
                  style={{ width: 6, height: 6, borderRadius: 9999, background: "#466062", display: "block" }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: d / 1000 }}
                />
              ))}
            </motion.div>
          )}
          {showAnswer && (
            <motion.div
              key={`answer-${current.answer}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isClearing ? 0 : 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                marginTop: 16,
                background: "#fef4ce",
                borderRadius: "0 12px 12px 12px",
                padding: "16px 20px",
                border: "1px solid rgba(193,200,200,0.2)",
                maxWidth: 400,
              }}
            >
              <p className="font-sans text-[#201c05]" style={{ fontSize: 14, lineHeight: 1.5 }}>
                {current.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer input bar */}
      <div
        className="absolute left-0 right-0 flex flex-col justify-center"
        style={{
          top: 541,
          height: 110,
          padding: "12px 16px",
          background: "rgba(255,249,237,0.90)",
          backdropFilter: "blur(10.5px)",
        }}
      >
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
          <div className="flex-1" style={{ padding: "9px 12px 10px 12px" }}>
            {typedText ? (
              <p className="font-sans text-[#211f19]" style={{ fontSize: 14 }}>
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                  className="inline-block ml-0.5 align-middle"
                  style={{ width: 1.5, height: 14, background: "#211f19" }}
                />
              </p>
            ) : (
              <p className="font-sans text-[#a1a1aa]" style={{ fontSize: 14 }}>
                Escribe tu pregunta aquí...
              </p>
            )}
          </div>
          <div style={{ paddingLeft: 12 }}>
            <motion.div
              className="flex items-center justify-center rounded-full"
              style={{ width: 40, height: 40, background: "#708b8d" }}
              animate={phase === "sent" ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <SendHorizontal size={16} className="text-white" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface ChatbotHighlightSectionProps {
  ctaHref?: string;
}

export function ChatbotHighlightSection({ ctaHref = "/chatbot" }: ChatbotHighlightSectionProps) {
  const router = useRouter();
  return (
    <section className="relative w-full overflow-hidden" style={{ padding: "0" }}>
      <div className="absolute inset-0 bg-white" />
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

      <div className="relative px-6 md:px-9 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 py-16 md:py-20 lg:py-[120px]">
        {/* Left — mock */}
        <FadeUp delay={0} className="hidden md:flex items-center justify-center lg:shrink-0">
          <div className="md:block lg:hidden" style={{ width: 383, height: 437, overflow: "hidden" }}>
            <div style={{ transform: "scale(0.67)", transformOrigin: "top left", width: 572, height: 653 }}>
              <ChatbotMock />
            </div>
          </div>
          <div className="hidden lg:block">
            <ChatbotMock />
          </div>
        </FadeUp>

        {/* Right — text */}
        <div className="flex flex-col w-full lg:w-auto" style={{ gap: 24 }}>
          <FadeUp delay={0.1}>
            <h2 className="font-sans font-semibold text-[#BCB884] text-[24px] leading-[32px] md:text-[32px] md:leading-[42px] lg:text-[38.67px] lg:leading-[50.27px] lg:max-w-[552px]">
              Conoce las historias de las iniciativas que ya están promoviendo cambios
              <br />
              <span className="font-serif font-medium italic text-[#395284] text-[24px] leading-[32px] md:text-[32px] md:leading-[42px] lg:text-[38.67px] lg:leading-[50.27px]">
                en los sistemas de alimentación en la región.
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="flex flex-col gap-3" style={{ maxWidth: 480 }}>
              <p className="font-sans font-normal text-[#5e5e5e]" style={{ fontSize: 16, lineHeight: 1.5 }}>
                El Chatbot te permite conocer de manera interactiva datos sobre las historias que presentamos.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.3}>
            <ul className="flex flex-col gap-3" style={{ maxWidth: 413 }}>
              {[
                "Análisis comparativo por regiones",
                "Información integrada, procesada y sistematizada de forma ética, respetando las voces, experiencias y aprendizajes de quienes participaron.",
                "Reportes automáticos descargables",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#395284] flex-shrink-0 mt-0.5" />
                  <span className="font-sans font-normal text-[#395284]" style={{ fontSize: 16, lineHeight: 1.5 }}>
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
              radius="full"
              iconRight={ArrowRight}
              onClick={() => router.push(ctaHref)}
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
