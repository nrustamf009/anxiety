#!/usr/bin/env node
// Builds the app's content bundle from content/*.json.
// 1. Downloads public-domain Bible texts (Russian Synodal 1876, BSB, KJV) into .cache/bible
//    from github.com/scrollmapper/bible_databases (MIT-licensed compilation).
// 2. Validates every card against the content rules.
// 3. Resolves every reference in BOTH versifications (Synodal / English) and fails on any miss.
// 4. Writes src/content/generated/*.json with only the verses the app needs.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(root, "content");
const cacheDir = path.join(root, ".cache", "bible");
const outDir = path.join(root, "src", "content", "generated");
const SOURCE = "https://raw.githubusercontent.com/scrollmapper/bible_databases/master/formats/json/";
const TRANSLATIONS = {
  syn: { file: "RusSynodal.json", versification: "syn", name: "Синодальный перевод (1876)", license: "public domain" },
  bsb: { file: "BSB.json", versification: "eng", name: "Berean Standard Bible", license: "public domain (since 2023)" },
  kjv: { file: "KJV.json", versification: "eng", name: "King James Version", license: "public domain (outside the UK)" },
};
const SYMPTOM_CODES = ["worry_rumination","fear_future","panic_somatic","insomnia","fear_death","health_anxiety","financial","loved_ones","social","loneliness","irritability","exhaustion","concentration","guilt_shame","anticipatory","loss_of_control"];
const ICONS = ["spiral","horizon","heart","moon","valley","leaf","bird","hands","people","lamp","stillwater","tree","dawn","path","wave"];
const TRADITIONS = ["orthodox","catholic","protestant","jewish","ecumenical"];
const EVIDENCE = ["physiological_plus_small_rct","pilot_or_mixed","indirect_secular","tradition_only"];

const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);
const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));

async function ensureSources() {
  fs.mkdirSync(cacheDir, { recursive: true });
  for (const t of Object.values(TRANSLATIONS)) {
    const dest = path.join(cacheDir, t.file);
    if (fs.existsSync(dest)) continue;
    process.stdout.write(`Downloading ${t.file}… `);
    const res = await fetch(SOURCE + t.file);
    if (!res.ok) throw new Error(`Download failed for ${t.file}: HTTP ${res.status}`);
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    console.log("ok");
  }
}

// Psalm superscriptions are folded into verse 1 in BSB; strip them so the app shows only the prayer text.
const SUPERSCRIPTION = /^((To the chief Musician|For the chief Musician|For the choirmaster|A Psalm|A psalm|A song|A Song|Of the sons|Of David|According to|A Maskil|A Miktam|A Shiggaion|A prayer|A Prayer|With stringed)[^.]*\.\s*)+/;

function indexBible(json) {
  const idx = new Map();
  for (const b of json.books) for (const c of b.chapters) for (const v of c.verses) idx.set(`${b.name}|${c.chapter}|${v.verse}`, v.text.trim());
  return idx;
}

function parseRange(ref) {
  const m = /^(\d+):(\d+)(?:-(\d+))?$/.exec(ref);
  if (!m) return null;
  const ch = +m[1], a = +m[2], z = m[3] ? +m[3] : a;
  return z >= a ? { ch, a, z } : null;
}

async function main() {
  await ensureSources();
  const books = readJson(path.join(contentDir, "books.json"));
  const bibles = Object.fromEntries(Object.entries(TRANSLATIONS).map(([k, t]) => [k, indexBible(readJson(path.join(cacheDir, t.file)))]));
  const out = Object.fromEntries(Object.keys(TRANSLATIONS).map((k) => [k, {}]));

  function resolve(where, ref) {
    const book = books[ref.book];
    if (!book) return fail(where, `unknown book ${ref.book}`);
    for (const [key, t] of Object.entries(TRANSLATIONS)) {
      const r = parseRange(ref[t.versification]);
      if (!r) { fail(where, `bad ${t.versification} range "${ref[t.versification]}"`); continue; }
      for (let v = r.a; v <= r.z; v++) {
        let text = bibles[key].get(`${book.dataset}|${r.ch}|${v}`);
        if (!text) { fail(where, `${key}: ${ref.book} ${r.ch}:${v} not found`); continue; }
        if (ref.book === "Ps" && v === 1 && key !== "syn") text = text.replace(SUPERSCRIPTION, "");
        out[key][`${ref.book}.${r.ch}.${v}`] = text;
      }
    }
  }

  const cardFiles = fs.readdirSync(path.join(contentDir, "cards")).filter((f) => f.endsWith(".json")).sort();
  const cards = [];
  const ids = new Set();
  for (const f of cardFiles) {
    const c = readJson(path.join(contentDir, "cards", f));
    const w = `cards/${f}`;
    for (const k of ["id","version","symptom","permission","passages","commentary","practice","prayer","professional_help","review"]) if (c[k] === undefined) fail(w, `missing ${k}`);
    if (ids.has(c.id)) fail(w, `duplicate id ${c.id}`); ids.add(c.id);
    if (!SYMPTOM_CODES.includes(c.symptom?.code)) fail(w, `bad symptom.code ${c.symptom?.code}`);
    if (!ICONS.includes(c.symptom?.icon)) fail(w, `bad icon ${c.symptom?.icon}`);
    if (!c.passages?.length) fail(w, "no passages");
    for (const p of c.passages ?? []) {
      resolve(`${w} ${p.book} ${p.syn}`, p);
      if (!p.why_fits) fail(w, `passage ${p.book} ${p.syn} has no why_fits`);
      if (p.context) {
        const cr = parseRange(p.context);
        if (!cr) fail(w, `bad context range ${p.context}`);
      }
    }
    for (const cm of c.commentary ?? []) {
      if (!TRADITIONS.includes(cm.tradition)) fail(w, `bad tradition ${cm.tradition}`);
      if (cm.summary?.length > 400) fail(w, `commentary summary longer than 400 chars`);
      if (!cm.source?.url) fail(w, `commentary without source url`);
    }
    const pr = c.practice ?? {};
    if (!(pr.duration_sec >= 60 && pr.duration_sec <= 300)) fail(w, `practice duration must be 60–300s`);
    if (!EVIDENCE.includes(pr.evidence_level)) fail(w, `bad evidence_level ${pr.evidence_level}`);
    if (!pr.steps?.length) fail(w, "practice has no steps");
    if (!c.professional_help?.triggers?.length) fail(w, "professional_help has no triggers");
    // Theology/safety guard: forbidden phrasing in user-facing text.
    // misuse_warning texts legitimately negate these phrases ("не гарантирует"), so they are skipped.
    const blob = JSON.stringify(c, (k, v) => (k === "misuse_warning" ? undefined : v)).toLowerCase();
    for (const bad of ["лечит тревог", "вылечит", "исцелит тревог", "гарантир", "клинически доказ"]) if (blob.includes(bad)) fail(w, `forbidden phrase "${bad}"`);
    cards.push(c);
  }

  const flows = readJson(path.join(contentDir, "flows.json"));
  for (const p of flows.welcome.passages) resolve("flows.welcome", p);
  resolve("flows.sos", flows.sos.passage);
  resolve("flows.lament.template", flows.lament.template);
  for (const s of flows.lament.steps) resolve(`flows.lament.${s.key}`, s.verse);
  resolve("flows.lament.cant_trust", flows.lament.cant_trust.passage);

  const crisis = readJson(path.join(contentDir, "crisis.json"));

  if (errors.length) {
    console.error(`\n✗ Content check failed (${errors.length}):\n  - ` + errors.join("\n  - "));
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });
  const meta = Object.fromEntries(Object.entries(TRANSLATIONS).map(([k, t]) => [k, { name: t.name, license: t.license, versification: t.versification }]));
  fs.writeFileSync(path.join(outDir, "bible.json"), JSON.stringify({ meta, verses: out }));
  fs.writeFileSync(path.join(outDir, "cards.json"), JSON.stringify(cards));
  fs.writeFileSync(path.join(outDir, "flows.json"), JSON.stringify(flows));
  fs.writeFileSync(path.join(outDir, "crisis.json"), JSON.stringify(crisis));
  fs.writeFileSync(path.join(outDir, "books.json"), JSON.stringify(books));
  const n = Object.keys(out.syn).length;
  console.log(`✓ ${cards.length} cards, ${n} verses × ${Object.keys(TRANSLATIONS).length} translations → src/content/generated/`);
}

main().catch((e) => { console.error(e); process.exit(1); });
