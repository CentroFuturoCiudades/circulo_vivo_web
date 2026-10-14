import { useSyncExternalStore } from "react";

// Reads prefers-reduced-motion without a hydration mismatch: the server
// snapshot always reports "no preference" (SSR has no window), then React
// re-checks the real client snapshot right after mount.
function subscribe(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
