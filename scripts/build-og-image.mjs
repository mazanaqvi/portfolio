/**
 * Builds the 1200x630 Open Graph card from the master preview artwork.
 * JPEG, kept well under 300 KB so WhatsApp and other crawlers reliably
 * render it (large PNGs are silently dropped by some clients).
 */
import sharp from "sharp";
import { stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(ROOT, "public/og.jpg");

await sharp(resolve(ROOT, "public/img/preview.png"))
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: "4:4:4" })
  .toFile(out);

const { size } = await stat(out);
console.log(`✓ public/og.jpg (1200x630, ${(size / 1024).toFixed(0)} KB)`);
