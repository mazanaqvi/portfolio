/**
 * Normalises every project image to one fixed resolution so cards never crop
 * or letterbox inconsistently.
 *
 *   Output: public/img/projects/<id>.webp  (1600 x 1000, 16:10)
 *
 * Two modes per source:
 *   - "cover":   source is already 16:10 (live screenshots) -> resize cover.
 *   - "fit":     source has another aspect ratio -> the full image is placed
 *                on top of a blurred, darkened copy of itself so nothing is
 *                cut off and the card still fills edge to edge.
 *
 * Usage: node scripts/build-project-images.mjs [manifest.json]
 */
import { mkdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

export const WIDTH = 1600;
export const HEIGHT = 1000;

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = resolve(ROOT, "public/img/projects");

async function buildOne({ id, src, mode = "fit", pad = 0.06 }) {
  const input = resolve(ROOT, src);
  if (!existsSync(input)) {
    console.warn(`  ! ${id}: missing source ${src}`);
    return;
  }
  const out = resolve(OUT_DIR, `${id}.webp`);

  if (mode === "cover") {
    await sharp(input)
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "top" })
      .webp({ quality: 84 })
      .toFile(out);
  } else {
    const innerW = Math.round(WIDTH * (1 - pad * 2));
    const innerH = Math.round(HEIGHT * (1 - pad * 2));

    const backdrop = await sharp(input)
      .resize(WIDTH, HEIGHT, { fit: "cover" })
      .blur(40)
      .modulate({ brightness: 0.55, saturation: 1.15 })
      .toBuffer();

    const fg = await sharp(input)
      .resize(innerW, innerH, { fit: "inside", withoutEnlargement: false })
      .png()
      .toBuffer();
    const fgMeta = await sharp(fg).metadata();

    // Soft shadow under the foreground for depth.
    const shadow = await sharp({
      create: {
        width: fgMeta.width + 80,
        height: fgMeta.height + 80,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([
        {
          input: await sharp({
            create: {
              width: fgMeta.width,
              height: fgMeta.height,
              channels: 4,
              background: { r: 0, g: 0, b: 0, alpha: 0.55 },
            },
          })
            .png()
            .toBuffer(),
          left: 40,
          top: 52,
        },
      ])
      .blur(28)
      .png()
      .toBuffer();

    const left = Math.round((WIDTH - fgMeta.width) / 2);
    const top = Math.round((HEIGHT - fgMeta.height) / 2);

    await sharp(backdrop)
      .composite([
        { input: shadow, left: left - 40, top: top - 40 },
        { input: fg, left, top },
      ])
      .webp({ quality: 84 })
      .toFile(out);
  }
  console.log(`  ✓ ${id}.webp  (${mode})`);
}

async function main() {
  const manifestPath = process.argv[2] ?? resolve(ROOT, "scripts/project-images.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Building ${manifest.length} project images at ${WIDTH}x${HEIGHT}…`);
  for (const entry of manifest) await buildOne(entry);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
