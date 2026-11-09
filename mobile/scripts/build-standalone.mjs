#!/usr/bin/env node
// Turns the Expo web export (dist/) into ONE self-contained HTML page:
// the JS bundle and fonts are inlined, so the app opens from a single link
// (published as a claude.ai Artifact). Run after `npm run export:web`.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const out = path.join(root, "..", "docs", "app", "index.html");

const jsDir = path.join(dist, "_expo/static/js/web");
const entry = fs.readdirSync(jsDir).find((f) => f.startsWith("entry-") && f.endsWith(".js"));
let js = fs.readFileSync(path.join(jsDir, entry), "utf8");

// Inline every font the bundle references.
let fonts = 0;
js = js.replace(/"(\/assets\/[^"]+\.ttf)"/g, (_, p) => {
  const file = path.join(dist, p);
  if (!fs.existsSync(file)) return `"${p}"`;
  fonts++;
  return `"data:font/ttf;base64,${fs.readFileSync(file).toString("base64")}"`;
});
js = js.replace(/<\/script/gi, "<\\/script").replace(/<!--/g, "<\\!--");

const html = `<title>Тихие воды</title>
<style>
  :root { --bg: #F5F0E6 }
  @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --bg: #0D1419; color-scheme: dark } }
  :root[data-theme="dark"] { --bg: #0D1419; color-scheme: dark }
  html, body { height: 100%; background: var(--bg) }
  body { overflow: hidden }
  #root { display: flex; height: 100%; flex: 1 }
</style>
<div id="root"></div>
<script>
  // Expo Router reads the URL path; the app always starts on its home screen.
  try { if (location.pathname !== "/") history.replaceState(null, "", "/"); } catch (e) {}
</script>
<script>
${js}
</script>
`;
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log(`✓ ${path.relative(path.join(root, ".."), out)} — ${(html.length / 1024 / 1024).toFixed(2)} MB, ${fonts} fonts inlined`);
