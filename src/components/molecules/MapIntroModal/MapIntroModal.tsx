"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MapPin, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";

export interface MapIntroModalProps {
  open: boolean;
  onClose: () => void;
  className?: string;
}

/**
 * First-visit explainer for /mapa — what the map is and how to use it. Shown
 * automatically once per visitor (localStorage flag set in MapaPageClient),
 * and reopenable at any time via the info button floating over the map.
 */
export function MapIntroModal({ open, onClose, className }: MapIntroModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="map-intro-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40"
          />
          <motion.div
            key="map-intro-card"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            className={cn(
              "fixed z-[101] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-[calc(100vw-32px)] max-w-[440px] rounded-2xl border border-[#c4c7c7] bg-white p-6 shadow-xl",
              className
            )}
          >
            <Button
              variant="icon"
              color="neutral"
              iconLeft={X}
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-black text-[#1a1c1c] hover:bg-neutral-50"
            />

            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 40, height: 40, background: "#708b8d" }}
            >
              <MapPin size={18} className="text-white" />
            </div>

            <p
              className="font-sans font-normal text-[#1a1c1c] mt-4"
              style={{ fontSize: 15, lineHeight: 1.6 }}
            >
              Ubica las iniciativas en este mapa y conoce más sobre cada una de ellas. ¿Cómo se vinculan con el territorio y entre ellas?
            </p>
            <p
              className="font-sans font-normal text-[#1a1c1c] mt-3"
              style={{ fontSize: 15, lineHeight: 1.6 }}
            >
              Explora las diferentes categorías que hemos encontrado.
            </p>

            <Button
              color="teal"
              variant="primary"
              radius="full"
              size="lg"
              onClick={onClose}
              className="w-full justify-center normal-case tracking-normal font-medium mt-6"
            >
              Entendido
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
