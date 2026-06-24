// Total deliveries counter.
// Starts at 55,000 and automatically grows by 4.16 every hour. It is anchored to
// a fixed date so the value stays consistent across page loads and keeps
// climbing over time (≈ +100/day, +4.16/hour).
const BASE = 55000;
const PER_HOUR = 4.16;
// The moment the counter equals BASE. Adjust this date to re-baseline if needed.
const ANCHOR = new Date("2026-06-16T00:00:00").getTime();

export const getDeliveries = (): number => {
  const hours = Math.floor((Date.now() - ANCHOR) / 3_600_000);
  return Math.floor(BASE + Math.max(0, hours) * PER_HOUR);
};

export const formatDeliveries = (n: number): string =>
  n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n);
