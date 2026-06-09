"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
  href: string;
}

export interface FeatureCardsSectionProps {
  features: Feature[];
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

export function FeatureCardsSection({ features }: FeatureCardsSectionProps) {
  const router = useRouter();
  return (
    <section className="relative w-full py-16 md:py-20 lg:py-[120px]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(222,212,176,0.12) 0%, rgba(209,198,207,0.12) 100%)",
        }}
      />
      <div className="relative px-6 md:px-9">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
          {features.map((feature, i) => (
            <FadeUp key={feature.title} delay={i * 0.12} className="flex flex-col gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-12 h-12 flex items-center justify-center border border-[#561427] rounded-[4px]"
              >
                <feature.icon size={20} className="text-[#561427]" />
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
                className="normal-case tracking-normal font-normal text-base h-auto py-1.5 px-4 w-fit"
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
