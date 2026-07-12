import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = fileURLToPath(new URL("../public/img", import.meta.url));
const MAX_WIDTH = 1000;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

function formatKB(bytes) {
  return `${(bytes / 1024).toFixed(1)}KB`;
}

async function optimize(file) {
  const ext = extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) return null;

  const original = await readFile(file);
  const pipeline = sharp(original).resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
  });

  let output;
  if (ext === ".png") {
    output = await pipeline
      .png({ quality: 80, compressionLevel: 9, palette: true })
      .toBuffer();
  } else {
    output = await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  }

  if (output.length < original.length) {
    await writeFile(file, output);
    return { file, before: original.length, after: output.length, saved: true };
  }
  return { file, before: original.length, after: output.length, saved: false };
}

async function main() {
  const files = await walk(ROOT);
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const result = await optimize(file);
    if (!result) continue;
    totalBefore += result.before;
    totalAfter += result.saved ? result.after : result.before;
    const rel = file.replace(`${ROOT}/`, "");
    if (result.saved) {
      console.log(
        `  ${rel}: ${formatKB(result.before)} -> ${formatKB(result.after)}`
      );
    } else {
      console.log(`  ${rel}: skipped (already optimal ${formatKB(result.before)})`);
    }
  }

  console.log(
    `\nTotal: ${formatKB(totalBefore)} -> ${formatKB(totalAfter)} ` +
      `(saved ${formatKB(totalBefore - totalAfter)})`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
