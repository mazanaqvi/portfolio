/**
 * Renders scripts/og-card.html with headless Chrome at exactly 1200x630 and
 * writes public/og.jpg (mozjpeg, well under 300 KB so WhatsApp renders it).
 * The card is HTML so it can use the site's web fonts and tokens.
 */
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const HTML = resolve(ROOT, "scripts/og-card.html");
const OUT = resolve(ROOT, "public/og.jpg");

const CHROME = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
].find(existsSync);
if (!CHROME) {
  console.error("No Chrome/Chromium found; cannot render the OG card.");
  process.exit(1);
}

const tmp = await mkdtemp(join(tmpdir(), "og-"));
const shot = join(tmp, "og.png");
execFileSync(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--window-size=1200,630",
  "--force-device-scale-factor=1",
  "--virtual-time-budget=6000",
  `--user-data-dir=${join(tmp, "profile")}`,
  `--screenshot=${shot}`,
  pathToFileURL(HTML).href,
], { stdio: "ignore" });

await sharp(shot)
  .resize(1200, 630, { fit: "cover" })
  .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: "4:4:4" })
  .toFile(OUT);
await rm(tmp, { recursive: true, force: true });

const { size } = await stat(OUT);
console.log(`✓ public/og.jpg (1200x630, ${(size / 1024).toFixed(0)} KB)`);
