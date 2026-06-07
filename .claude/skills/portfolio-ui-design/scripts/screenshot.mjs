#!/usr/bin/env node
// Full-page screenshot for the portfolio site, sliced into viewport-height images.
//
// Handles the two repo-specific gotchas:
//   1. Scroll-reveal hides sections (opacity:0) until scrolled into view — we force
//      prefers-reduced-motion:reduce so script.js reveals everything immediately.
//   2. The hero is 100vh — we keep a realistic viewport height and use
//      captureBeyondViewport, then slice, so each image reads like a real screen.
//
// Usage:
//   node screenshot.mjs --url http://localhost:8080/ --width 1440 --out /tmp/pf
// Flags: --url (required), --width (default 1440; use 390 for mobile),
//        --out (path prefix, default /tmp/pf), --port (CDP port, default 9400)
// Requires Google Chrome installed and a running local server.

import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const argv = process.argv.slice(2);
const arg = (name, def) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : def;
};

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = arg("url", "http://localhost:8080/");
const WIDTH = Number(arg("width", "1440"));
const OUT = arg("out", "/tmp/pf");
const PORT = Number(arg("port", "9400"));
const VH = WIDTH < 600 ? 760 : 860; // realistic viewport height -> hero = this, not full page

const ud = mkdtempSync(join(tmpdir(), "pf-shot-"));
const proc = spawn(
  CHROME,
  ["--headless=new", "--disable-gpu", "--hide-scrollbars",
   `--remote-debugging-port=${PORT}`, `--user-data-dir=${ud}`,
   `--window-size=${WIDTH},${VH}`, "about:blank"],
  { stdio: "ignore" }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function getWs() {
  for (let i = 0; i < 40; i++) {
    try {
      const list = await (await fetch(`http://localhost:${PORT}/json`)).json();
      const pg = list.find((t) => t.type === "page");
      if (pg?.webSocketDebuggerUrl) return pg.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error("Could not connect to Chrome DevTools — is Chrome installed?");
}

const ws = new WebSocket(await getWs());
let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
};
await new Promise((r) => (ws.onopen = r));
const cmd = (method, params = {}) =>
  new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });

await cmd("Page.enable");
await cmd("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
await cmd("Emulation.setDeviceMetricsOverride", { width: WIDTH, height: VH, deviceScaleFactor: 1, mobile: WIDTH < 600 });
await cmd("Page.navigate", { url: URL });
await sleep(2500);

const { cssContentSize } = await cmd("Page.getLayoutMetrics");
const total = Math.ceil(cssContentSize.height);
const n = Math.max(1, Math.ceil(total / VH));
for (let i = 0; i < n; i++) {
  const y = i * VH;
  const h = Math.min(VH, total - y);
  if (h <= 0) break;
  const { data } = await cmd("Page.captureScreenshot", {
    format: "png", captureBeyondViewport: true,
    clip: { x: 0, y, width: WIDTH, height: h, scale: 1 },
  });
  const out = `${OUT}${i + 1}.png`;
  writeFileSync(out, Buffer.from(data, "base64"));
  console.log("wrote", out, `${WIDTH}x${h}`, `y=${y}`);
}
console.log(`done — ${n} slice(s), full height ${total}px at width ${WIDTH}`);
ws.close();
proc.kill();
process.exit(0);
