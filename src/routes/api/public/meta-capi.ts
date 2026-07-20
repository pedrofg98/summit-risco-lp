import { createFileRoute } from "@tanstack/react-router";
import { createHash } from "node:crypto";
import { z } from "zod";

const PIXEL_ID = "2279862262756903";
const GRAPH_URL = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`;

const capiSchema = z.object({
  eventId: z.string().trim().min(8).max(64),
  eventName: z.string().trim().max(40).optional().default("Lead"),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(8).max(40), // dígitos (55…) — o cliente já normaliza
  fbp: z.string().trim().max(200).optional().default(""),
  fbc: z.string().trim().max(400).optional().default(""),
  userAgent: z.string().trim().max(500).optional().default(""),
  url: z.string().trim().max(500).optional().default(""),
  lote: z.string().trim().max(80).optional().default(""),
  preco: z.string().trim().max(40).optional().default(""),
});

function sha256(v: string): string {
  return createHash("sha256").update(v).digest("hex");
}

function normEmail(v: string) {
  return v.trim().toLowerCase();
}
function normName(v: string) {
  return v.trim().toLowerCase();
}
function normPhone(v: string) {
  // Meta espera apenas dígitos, com código do país
  return v.replace(/\D/g, "");
}

function getClientIp(request: Request): string {
  const h = request.headers;
  const cf = h.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return h.get("x-real-ip")?.trim() ?? "";
}

function parsePriceBRL(v: string): number | undefined {
  if (!v) return undefined;
  const cleaned = v.replace(/[^\d,.-]/g, "").replace(/\.(?=\d{3}(\D|$))/g, "").replace(",", ".");
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

export const Route = createFileRoute("/api/public/meta-capi")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const token = process.env.META_CAPI_ACCESS_TOKEN;
          if (!token) {
            console.error("[meta-capi] missing META_CAPI_ACCESS_TOKEN");
            return Response.json({ ok: true });
          }

          const json = await request.json().catch(() => null);
          const parsed = capiSchema.safeParse(json);
          if (!parsed.success) {
            return Response.json({ ok: true });
          }
          const d = parsed.data;
          const { firstName, lastName } = splitName(d.name);
          const value = parsePriceBRL(d.preco);

          const userData: Record<string, unknown> = {
            em: [sha256(normEmail(d.email))],
            ph: [sha256(normPhone(d.phone))],
            fn: [sha256(normName(firstName))],
            client_user_agent: d.userAgent || request.headers.get("user-agent") || "",
            client_ip_address: getClientIp(request),
          };
          if (lastName) userData.ln = [sha256(normName(lastName))];
          if (d.fbp) userData.fbp = d.fbp;
          if (d.fbc) userData.fbc = d.fbc;

          const customData: Record<string, unknown> = {};
          if (d.lote) customData.content_name = d.lote;
          if (value !== undefined) {
            customData.value = value;
            customData.currency = "BRL";
          }

          const payload = {
            data: [
              {
                event_name: d.eventName || "Lead",
                event_time: Math.floor(Date.now() / 1000),
                event_id: d.eventId,
                action_source: "website",
                event_source_url: d.url || undefined,
                user_data: userData,
                custom_data: Object.keys(customData).length ? customData : undefined,
              },
            ],
            // test_event_code: process.env.META_CAPI_TEST_EVENT_CODE, // habilitar durante testes
          };

          const res = await fetch(`${GRAPH_URL}?access_token=${encodeURIComponent(token)}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) {
            const body = await res.text().catch(() => "");
            console.error("[meta-capi] graph error", res.status, body);
          }
        } catch (err) {
          console.error("[meta-capi] handler error", err);
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

function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}
