/** Builds the 1200x630 Open Graph card from the master preview artwork. */
import sharp from "sharp";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

await sharp(resolve(ROOT, "public/img/preview.png"))
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .png({ compressionLevel: 9 })
  .toFile(resolve(ROOT, "public/og.png"));

console.log("✓ public/og.png (1200x630)");
