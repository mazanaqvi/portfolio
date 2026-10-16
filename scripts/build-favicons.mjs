/** Renders favicon.svg to the PNG sizes browsers and iOS ask for. */
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const svg = await readFile(resolve(ROOT, "public/favicon.svg"));

const targets = [
  ["public/favicon.png", 512],
  ["public/favicon-32.png", 32],
  ["public/apple-touch-icon.png", 180],
];

for (const [out, size] of targets) {
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(resolve(ROOT, out));
  console.log(`✓ ${out} (${size}x${size})`);
}
