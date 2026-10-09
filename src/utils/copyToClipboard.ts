// Copies plain text only. Values come from the static data in data/payments.ts,
// nothing is read from the clipboard and nothing is rendered as HTML.
export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall through to the legacy path (e.g. permission denied).
    }
  }

  const el = document.createElement("textarea");
  el.value = text;
  el.readOnly = true;
  el.setAttribute("aria-hidden", "true");
  el.style.position = "fixed";
  el.style.top = "-9999px";
  el.style.opacity = "0";
  document.body.appendChild(el);
  try {
    el.select();
    document.execCommand("copy");
  } finally {
    document.body.removeChild(el);
  }
}
