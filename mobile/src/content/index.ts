// Typed access to the generated content bundle (see scripts/build-content.mjs).
import bibleJson from "./generated/bible.json";
import cardsJson from "./generated/cards.json";
import flowsJson from "./generated/flows.json";
import crisisJson from "./generated/crisis.json";
import booksJson from "./generated/books.json";

export type TranslationCode = "syn" | "bsb" | "kjv";
export type Tradition = "orthodox" | "catholic" | "protestant" | "jewish" | "ecumenical";

export interface Ref {
  book: string;
  syn: string;
  eng: string;
}

export interface Passage extends Ref {
  kind: "explicit" | "implicit_narrative" | "lament" | "promise";
  context?: string;
  why_fits: string;
  misuse_warning?: string;
}

export interface Card {
  id: string;
  version: string;
  symptom: {
    code: string;
    title: string;
    user_label: string;
    icon: string;
    crisis_adjacent: boolean;
    ocd_reassurance_sensitive: boolean;
  };
  permission: string;
  passages: Passage[];
  commentary: {
    tradition: Tradition;
    author: string;
    summary: string;
    source: { title: string; url: string };
    verified_quote: boolean;
  }[];
  practice: {
    name: string;
    duration_sec: number;
    technique_pair: string;
    evidence_level: "physiological_plus_small_rct" | "pilot_or_mixed" | "indirect_secular" | "tradition_only";
    steps: string[];
    breath?: { inhale_sec: number; exhale_sec: number; phrase_in: string; phrase_out: string };
  };
  prayer: { tradition: Tradition; origin: string; text: string }[];
  professional_help: { triggers: string[]; message: string };
  review: { status: string; open_issues: string[] };
}

export interface CrisisLine {
  label: string;
  phone: string;
  display?: string;
  note?: string;
}
export interface CrisisRegion {
  code: string;
  name: string;
  lines: CrisisLine[];
}

const bible = bibleJson as {
  meta: Record<TranslationCode, { name: string; license: string; versification: "syn" | "eng" }>;
  verses: Record<TranslationCode, Record<string, string>>;
};
const books = booksJson as Record<string, { ru: string; en: string }>;

export const cards = cardsJson as Card[];
export const flows = flowsJson as any;
export const crisis = crisisJson as {
  verified: boolean;
  updated: string;
  message: string;
  regions: CrisisRegion[];
  keywords: Record<string, string[]>;
};
export const translations = bible.meta;

export function getCard(id: string) {
  return cards.find((c) => c.id === id);
}

function parse(range: string) {
  const [ch, vs] = range.split(":");
  const [a, z] = vs.split("-").map(Number);
  return { ch: Number(ch), a, z: z || a };
}

/** Verses of a reference in the chosen translation, honouring its versification. */
export function getVerses(ref: Ref, t: TranslationCode) {
  const meta = bible.meta[t];
  const r = parse(meta.versification === "syn" ? ref.syn : ref.eng);
  const out: { n: number; text: string }[] = [];
  for (let v = r.a; v <= r.z; v++) {
    const text = bible.verses[t][`${ref.book}.${r.ch}.${v}`];
    if (text) out.push({ n: v, text });
  }
  return out;
}

const dash = (s: string) => s.replace("-", "–");

/** "Пс 45:2–4", or "Пс 45:2–4 · Ps 46:1–3" when the numbering differs. */
export function formatRef(ref: Ref, opts: { both?: boolean } = {}) {
  const b = books[ref.book];
  const ru = `${b.ru} ${dash(ref.syn)}`;
  if (!opts.both || ref.syn === ref.eng) return ru;
  return `${ru} · ${b.en} ${dash(ref.eng)}`;
}

export function formatRange(book: string, range: string) {
  return `${books[book].ru} ${dash(range)}`;
}
