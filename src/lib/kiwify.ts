export type Lead = { name: string; email: string; phone: string };

/** Normaliza telefone para somente dígitos, com 55 (BR) prependado se ausente. */
export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("55")) return digits;
  return `55${digits}`;
}

/** Aplica máscara BR: (99) 99999-9999 ou (99) 9999-9999. */
export function maskPhoneBR(input: string): string {
  const d = input.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Constrói a URL do checkout Kiwify com prefill via query string. */
export function buildKiwifyUrl(base: string, lead: Lead): string {
  const url = new URL(base);
  url.searchParams.set("name", lead.name.trim());
  url.searchParams.set("email", lead.email.trim().toLowerCase());
  url.searchParams.set("phone", normalizePhone(lead.phone));
  return url.toString();
}

const STORAGE_KEY = "summit_lead_v1";

export function loadStoredLead(): Partial<Lead> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<Lead>) : null;
  } catch {
    return null;
  }
}

export function saveStoredLead(lead: Lead): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lead));
  } catch {
    // ignore
  }
}
