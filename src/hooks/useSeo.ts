import { useEffect } from "react";
import { SITE_URL, type PageSeo } from "../data/seo";

function setAttr(selector: string, attr: string, value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * Keeps the document head in sync with the current page: title, description,
 * canonical URL, Open Graph / Twitter text, robots and page-level JSON-LD.
 * The prerender step saves the result, so crawlers that do not run
 * JavaScript get the same tags.
 */
export function useSeo(seo: PageSeo, jsonLd?: unknown) {
  const { title, description, path, noindex } = seo;
  const ld = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;
    setAttr('meta[name="description"]', "content", description);
    setAttr('link[rel="canonical"]', "href", url);
    setAttr('meta[property="og:title"]', "content", title);
    setAttr('meta[property="og:description"]', "content", description);
    setAttr('meta[property="og:url"]', "content", url);
    setAttr('meta[name="twitter:title"]', "content", title);
    setAttr('meta[name="twitter:description"]', "content", description);
    setAttr(
      'meta[name="robots"]',
      "content",
      noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1"
    );

    const existing = document.getElementById("ld-page");
    if (ld) {
      const script = existing ?? document.createElement("script");
      script.id = "ld-page";
      script.setAttribute("type", "application/ld+json");
      script.textContent = ld;
      if (!existing) document.head.appendChild(script);
    } else if (existing) {
      existing.remove();
    }
  }, [title, description, path, noindex, ld]);
}
