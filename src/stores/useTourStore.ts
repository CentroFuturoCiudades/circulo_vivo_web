"use client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TourId = "mapa" | "chatbot";

const STORAGE_KEY = "circulo-vivo:tours-seen";

function readSeenFromStorage(): Record<TourId, boolean> {
  if (typeof window === "undefined") return { mapa: false, chatbot: false };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return { mapa: Boolean(parsed.mapa), chatbot: Boolean(parsed.chatbot) };
  } catch {
    return { mapa: false, chatbot: false };
  }
}

function writeSeenToStorage(seen: Record<TourId, boolean>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seen));
  } catch {
    // ignore — worst case the tour reappears next visit
  }
}

interface TourState {
  /** True once localStorage has been read on the client — avoids flashing the tour before we know. */
  hydrated: boolean;
  seen: Record<TourId, boolean>;
  /** The tour currently requested to run (auto-start or a manual "ver tutorial de nuevo"), if any. */
  activeTour: TourId | null;
  hydrate: () => void;
  markSeen: (tour: TourId) => void;
  /** Requests a tour to start — used both for the first-visit auto-run and the manual restart button. */
  startTour: (tour: TourId) => void;
  endTour: () => void;
}

/**
 * Tracks which guided tours a visitor has already completed/skipped, so they
 * only auto-run once per tour. Persisted to localStorage (not zustand's
 * `persist` middleware, to sidestep SSR hydration timing — same manual
 * read-on-mount pattern as the rest of the app, e.g. useIsMobile).
 */
export const useTourStore = create<TourState>()(
  immer((set, get) => ({
    hydrated: false,
    seen: { mapa: false, chatbot: false },
    activeTour: null,
    hydrate: () => {
      if (get().hydrated) return;
      const seen = readSeenFromStorage();
      set((state) => {
        state.seen = seen;
        state.hydrated = true;
      });
    },
    markSeen: (tour) =>
      set((state) => {
        state.seen[tour] = true;
        writeSeenToStorage(state.seen);
      }),
    startTour: (tour) =>
      set((state) => {
        state.activeTour = tour;
      }),
    endTour: () =>
      set((state) => {
        state.activeTour = null;
      }),
  }))
);
