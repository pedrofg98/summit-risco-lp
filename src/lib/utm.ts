export type Utms = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

const KEY = "summit_utms_v1";
const FIELDS: (keyof Utms)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

/** Lê UTMs da URL atual e persiste em sessionStorage (chamado uma vez no boot). */
export function captureUtmsFromUrl(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Utms = {};
    let any = false;
    for (const f of FIELDS) {
      const v = params.get(f);
      if (v) {
        found[f] = v.slice(0, 120);
        any = true;
      }
    }
    if (any) {
      const prev = getStoredUtms();
      window.sessionStorage.setItem(KEY, JSON.stringify({ ...prev, ...found }));
    }
  } catch {
    // ignore
  }
}

export function getStoredUtms(): Utms {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Utms) : {};
  } catch {
    return {};
  }
}
