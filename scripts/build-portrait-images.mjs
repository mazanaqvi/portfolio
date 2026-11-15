/**
 * Web-sized versions of the portrait (public/img/hero.png):
 *   public/img/hero.webp    380 x 532, the hero and About photo
 *   public/img/avatar.webp  96 x 96 face crop, the 30px navbar mark at 3x
 * hero.png stays as the master and as the image in the JSON-LD Person record.
 */
import sharp from "sharp";
import { stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(ROOT, "public/img/hero.png");
const out = (f) => resolve(ROOT, "public/img", f);

await sharp(SRC).webp({ quality: 84 }).toFile(out("hero.webp"));
await sharp(SRC)
  .extract({ left: 40, top: 20, width: 300, height: 300 })
  .resize(96, 96)
  .webp({ quality: 86 })
  .toFile(out("avatar.webp"));

for (const f of ["hero.png", "hero.webp", "avatar.webp"]) {
  console.log(`✓ public/img/${f} ${((await stat(out(f))).size / 1024).toFixed(0)} KB`);
}
