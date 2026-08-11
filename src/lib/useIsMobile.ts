import { useSyncExternalStore } from "react";

const QUERY = "(max-width: 1023.98px)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/** Tracks whether we're below the `lg` breakpoint (matches Tailwind's `lg: 1024px`), without hydration mismatches. */
export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
