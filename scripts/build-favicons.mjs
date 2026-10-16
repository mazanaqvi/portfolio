/**
 * Builds the favicon set from the supplied brand mark (public/img/brand-mark-src.png,
 * a black glyph on white). The glyph is cut out, recoloured lime and centred on an
 * ink rounded tile. Outputs favicon.svg (tile + embedded transparent mark),
 * favicon.png (512), favicon-32.png and apple-touch-icon.png (180).
 */
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(ROOT, "public/img/brand-mark-src.png");

const SIZE = 512;
const RADIUS = 120; // same proportion as the old 64px tile with rx 15
const INK = "#0b0b0c";
const LIME = { r: 200, g: 241, b: 53 };
const FILL = 0.8; // mark width as a fraction of the tile

// 1) black-on-white glyph -> alpha mask, trimmed to its bounds
const mask = await sharp(SRC)
  .flatten({ background: "#ffffff" })
  .grayscale()
  .negate()          // black ink becomes white = opaque
  .threshold(110)
  .trim({ threshold: 10 })
  .toBuffer();
const { width: mw, height: mh } = await sharp(mask).metadata();

// 2) scale the mask to fit the tile, keeping aspect
const targetW = Math.round(SIZE * FILL);
const scale = Math.min(targetW / mw, (SIZE * 0.64) / mh);
const w = Math.round(mw * scale);
const h = Math.round(mh * scale);
const alpha = await sharp(mask).resize(w, h, { kernel: "lanczos3" }).toBuffer();

// 3) lime mark with that alpha, on a transparent canvas the size of the tile
const limeMark = await sharp({ create: { width: w, height: h, channels: 3, background: LIME } })
  .joinChannel(alpha)
  .png()
  .toBuffer();
const markLayer = await sharp({ create: { width: SIZE, height: SIZE, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([{ input: limeMark, left: Math.round((SIZE - w) / 2), top: Math.round((SIZE - h) / 2) }])
  .png()
  .toBuffer();

// 4) ink tile with rounded corners and a hairline inner border
const tileSvg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}">
     <rect width="${SIZE}" height="${SIZE}" rx="${RADIUS}" fill="${INK}"/>
     <rect x="6" y="6" width="${SIZE - 12}" height="${SIZE - 12}" rx="${RADIUS - 6}" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="12"/>
   </svg>`
);
const icon = sharp(tileSvg).composite([{ input: markLayer }]);
const icon512 = await icon.png().toBuffer();

const targets = [
  ["public/favicon.png", 512],
  ["public/apple-touch-icon.png", 180],
  ["public/favicon-32.png", 32],
];
for (const [out, size] of targets) {
  await sharp(icon512).resize(size, size, { kernel: "lanczos3" }).png().toFile(resolve(ROOT, out));
  console.log(`✓ ${out} (${size}x${size})`);
}

// 5) SVG favicon: vector tile + the transparent lime mark embedded as PNG
const markB64 = markLayer.toString("base64");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" rx="${RADIUS}" fill="${INK}"/>
  <rect x="6" y="6" width="${SIZE - 12}" height="${SIZE - 12}" rx="${RADIUS - 6}" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="12"/>
  <image width="${SIZE}" height="${SIZE}" xlink:href="data:image/png;base64,${markB64}"/>
</svg>
`;
await writeFile(resolve(ROOT, "public/favicon.svg"), svg);
console.log(`✓ public/favicon.svg (${(svg.length / 1024).toFixed(0)} KB)`);
