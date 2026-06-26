import { createFileRoute } from "@tanstack/react-router";
import SummitPageV2 from "@/components/SummitPageV2";

export const Route = createFileRoute("/v2")({
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
  }),
  component: SummitPageV2,
});
