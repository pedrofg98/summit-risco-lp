import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const SHEET_ID = "1pLj3TDp1dvcNfSDVWkxP51zOmYz6ZidV4MbpGVmkmc0";
const SHEET_TAB = "Leads";
const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(8).max(40),
  lote: z.string().trim().max(80).optional().default(""),
  preco: z.string().trim().max(40).optional().default(""),
  utm_source: z.string().trim().max(120).optional().default(""),
  utm_medium: z.string().trim().max(120).optional().default(""),
  utm_campaign: z.string().trim().max(120).optional().default(""),
  utm_content: z.string().trim().max(120).optional().default(""),
  utm_term: z.string().trim().max(120).optional().default(""),
  url: z.string().trim().max(500).optional().default(""),
});

function formatDateBR(): string {
  const fmt = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return fmt.format(new Date());
}

async function appendToSheet(values: string[]): Promise<void> {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const sheetsKey = process.env.GOOGLE_SHEETS_API_KEY;
  if (!lovableKey || !sheetsKey) {
    console.error("[lead] missing gateway credentials");
    return;
  }
  const url =
    `${GATEWAY}/spreadsheets/${SHEET_ID}/values/${SHEET_TAB}!A:L:append` +
    `?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": sheetsKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [values] }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[lead] sheets append failed", res.status, body);
  }
}

export const Route = createFileRoute("/api/public/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const json = await request.json();
          const parsed = leadSchema.safeParse(json);
          if (!parsed.success) {
            return Response.json({ ok: true });
          }
          const d = parsed.data;
          const row = [
            formatDateBR(),
            d.name,
            d.email.toLowerCase(),
            d.phone,
            d.lote,
            d.preco,
            d.utm_source,
            d.utm_medium,
            d.utm_campaign,
            d.utm_content,
            d.utm_term,
            d.url,
          ];
          await appendToSheet(row);
        } catch (err) {
          console.error("[lead] handler error", err);
        }
        return Response.json({ ok: true });
      },
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: { "Access-Control-Allow-Origin": "*" },
        }),
    },
  },
});
