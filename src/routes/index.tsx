import { createFileRoute } from "@tanstack/react-router";
import SummitPageV2 from "@/components/SummitPageV2";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Summit R.I.S.C.O. 2026 — Silvino Santos | 08 de agosto, online e ao vivo" },
      {
        name: "description",
        content:
          "Um dia inteiro com especialistas sobre NR1 e riscos psicossociais. Método, critério e decisões organizacionais responsáveis. 08/08/2026, 08h às 18h, online e ao vivo.",
      },
      { property: "og:title", content: "Summit R.I.S.C.O. 2026 — Silvino Santos" },
      {
        property: "og:description",
        content: "O futuro pertence aos profissionais preparados. 08 de agosto · 08h às 18h · Online e ao vivo.",
      },
      { property: "og:type", content: "website" },
      { name: "theme-color", content: "#0A0A0A" },
    ],
    links: [
      { rel: "preload", as: "image", href: "/__l5e/assets-v1/abe6bde4-fa0a-4e76-aa63-4db63d8eabec/bg-fundo-mobile-v2.webp", fetchPriority: "high", media: "(max-width: 1023px)" },
      { rel: "preload", as: "image", href: "/__l5e/assets-v1/377adc8d-49dc-4153-91df-ccd2c632ec44/bg-fundo-desktop-v2.webp", fetchPriority: "high", media: "(min-width: 1024px)" },
    ],
  }),
  component: SummitPageV2,
});
