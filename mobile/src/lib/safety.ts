import { crisis } from "../content";

/**
 * Crisis keyword check for any free-text input (lament, notes).
 * Runs locally, before anything else; on a match the UI routes to the crisis screen.
 * Deliberately simple and over-inclusive: a false positive costs one extra screen,
 * a false negative can cost much more.
 */
export function detectCrisis(text: string): boolean {
  const t = text.toLowerCase().replace(/ё/g, "е");
  return Object.values(crisis.keywords)
    .flat()
    .some((k) => t.includes(k.toLowerCase().replace(/ё/g, "е")));
}

/**
 * Reassurance-loop guard (scrupulosity / religious OCD).
 * Re-reading a comforting verse to "make sure" works like a compulsion and can feed the anxiety.
 * If reassurance-sensitive cards are opened 4+ times within an hour, the card shows a gentle note
 * and points to ERP-trained help. Kept in memory only — never stored or sent anywhere.
 */
const WINDOW_MS = 60 * 60 * 1000;
const THRESHOLD = 4;
let opens: number[] = [];

export function recordSensitiveOpen(now = Date.now()): boolean {
  opens = opens.filter((t) => now - t < WINDOW_MS);
  opens.push(now);
  return opens.length >= THRESHOLD;
}
