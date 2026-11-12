/**
 * Turns the single-page build into real static pages.
 *
 * GitHub Pages can only answer 200 for files that exist, so before this step
 * every route except "/" was served through 404.html and search engines saw
 * HTTP 404. This script loads each route in headless Chrome, saves the
 * rendered HTML as dist/<route>/index.html, and writes sitemap.xml.
 *
 * Runs after `vite build` (see package.json). If Chrome is not available the
 * build still succeeds as a plain SPA and says so loudly.
 */
import http from "node:http";
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(ROOT, "dist");
const SITE = "https://alihumza.com";
const UA = "Mozilla/5.0 (compatible; AliHumzaPrerender/1.0; +https://alihumza.com)";

const projectIds = [...readFileSync(resolve(ROOT, "src/data/projects.ts"), "utf8").matchAll(/^ {4}id: "([a-z0-9-]+)"/gm)].map(
  (m) => m[1]
);

/** route -> include in sitemap? */
const routes = [
  ["/", true],
  ["/work/", true],
  ["/about/", true],
  ["/reviews/", true],
  ["/resume/", true],
  ["/contact/", true],
  ...projectIds.map((id) => [`/work/${id}/`, true]),
  ["/game/", false],
  ["/payment-method/", false],
  ["/payment-method/international/", false],
];

/** Old URLs that still get shared: static redirect stubs. */
const redirects = {
  "/mobile/": "/work/?filter=mobile",
  "/live-apps/": "/work/?filter=mobile",
  "/websites/": "/work/?filter=web",
  "/products/": "/work/?filter=product",
};

const CHROME = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
].find((p) => p && existsSync(p));

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain",
};

function serve(shell) {
  const server = http.createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const file = join(DIST, path);
    try {
      if (file.startsWith(DIST) && extname(file) && (await stat(file)).isFile()) {
        res.writeHead(200, { "content-type": MIME[extname(file)] ?? "application/octet-stream" });
        res.end(await readFile(file));
        return;
      }
    } catch {
      /* fall through to the app shell */
    }
    res.writeHead(200, { "content-type": MIME[".html"] });
    res.end(shell);
  });
  return new Promise((ok) => server.listen(0, "127.0.0.1", () => ok(server)));
}

function dump(url, profileDir) {
  return new Promise((ok) => {
    const args = [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      "--window-size=1280,900",
      `--user-agent=${UA}`,
      `--user-data-dir=${profileDir}`,
      "--virtual-time-budget=6000",
      "--dump-dom",
      url,
    ];
    if (process.platform === "linux") args.unshift("--no-sandbox", "--disable-dev-shm-usage");
    const child = spawn(CHROME, args, { stdio: ["ignore", "pipe", "ignore"] });
    let out = "";
    child.stdout.on("data", (d) => (out += d));
    const timer = setTimeout(() => child.kill("SIGKILL"), 60_000);
    child.on("close", () => {
      clearTimeout(timer);
      ok(out);
    });
    child.on("error", () => {
      clearTimeout(timer);
      ok("");
    });
  });
}

function clean(html, route) {
  if (!html.includes('id="root"')) return null;
  let out = html
    .replace(/^\s*<!doctype[^>]*>\s*/i, "")
    .replace(/<html[^>]*>/i, '<html lang="en">')
    .replace(/<body[^>]*>/i, "<body>")
    .replace('<div id="root">', '<div id="root" data-prerendered="">');
  // The app must have rendered and set this page's own canonical URL.
  if (!out.includes(`<link rel="canonical" href="${SITE}${route}"`)) return null;
  const rootHtml = out.slice(out.indexOf('data-prerendered=""'));
  if (rootHtml.length < 2000) return null;
  return `<!DOCTYPE html>\n${out}\n`;
}

async function writePage(route, html) {
  const file = join(DIST, route, "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

async function main() {
  const shell = await readFile(join(DIST, "index.html"), "utf8");
  const today = new Date().toISOString().slice(0, 10);

  // Sitemap and redirect stubs do not need a browser.
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    routes
      .filter(([, indexable]) => indexable)
      .map(([r]) => {
        const priority = r === "/" ? "1.0" : r.split("/").length > 3 ? "0.6" : "0.8";
        return `  <url><loc>${SITE}${r}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`;
      })
      .join("\n") +
    `\n</urlset>\n`;
  await writeFile(join(DIST, "sitemap.xml"), sitemap);

  for (const [from, to] of Object.entries(redirects)) {
    await writePage(
      from,
      `<!DOCTYPE html>\n<html lang="en"><head><meta charset="utf-8"><title>Moved — Ali Humza</title>` +
        `<meta name="robots" content="noindex, follow"><link rel="canonical" href="${SITE}${to.split("?")[0]}">` +
        `<meta http-equiv="refresh" content="0; url=${to}"></head>` +
        `<body><p>This page moved to <a href="${to}">${to}</a>.</p></body></html>\n`
    );
  }

  // Unknown URLs: the app shell, explicitly not indexable.
  await writeFile(
    join(DIST, "404.html"),
    shell.replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex, follow" />')
  );

  if (!CHROME) {
    console.warn("\n⚠ prerender: no Chrome/Chromium found. The site was built as a plain SPA;");
    console.warn("  routes other than / will not be indexable. Set CHROME_PATH to fix.\n");
    return;
  }

  const server = await serve(shell);
  const origin = `http://127.0.0.1:${server.address().port}`;
  const tmp = await mkdtemp(join(tmpdir(), "prerender-"));
  const failed = [];
  const queue = routes.map(([r]) => r);
  let n = 0;

  async function worker(id) {
    for (let route = queue.shift(); route; route = queue.shift()) {
      let html = null;
      for (let attempt = 0; attempt < 2 && !html; attempt++) {
        html = clean(await dump(origin + route, join(tmp, `p${id}-${n++}`)), route);
      }
      if (html) {
        await writePage(route, html);
        console.log(`  ✓ ${route}`);
      } else {
        // Still publish the shell at this path so the URL answers 200.
        if (route !== "/") await writePage(route, shell);
        failed.push(route);
        console.warn(`  ✗ ${route} (kept the app shell)`);
      }
    }
  }

  console.log(`Prerendering ${routes.length} routes with ${CHROME.split("/").pop()}…`);
  await Promise.all([0, 1, 2, 3].map(worker));
  server.close();
  await rm(tmp, { recursive: true, force: true });

  console.log(`✓ sitemap.xml (${routes.filter(([, i]) => i).length} URLs), ${Object.keys(redirects).length} redirect stubs, 404.html`);
  if (failed.length) console.warn(`⚠ ${failed.length} route(s) fell back to the app shell: ${failed.join(", ")}`);
}

main().catch((err) => {
  console.error("prerender failed:", err);
  // Never block a deploy on this step; the SPA build is still valid.
});
