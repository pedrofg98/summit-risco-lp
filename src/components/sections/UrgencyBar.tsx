import { Flame } from "lucide-react";
import { LOTES } from "@/data/summit";

/** Barra fina de urgência fixa no topo — mostra o lote ativo. */
export function UrgencyBar() {
  const active = LOTES.find((l) => l.status === "active") ?? LOTES[0];

  return (
    <a
      href={active.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative z-50 block w-full overflow-hidden border-b border-gold/20 bg-gradient-to-r from-black via-[#1a140c] to-black"
    >
      <div className="shell flex items-center justify-center gap-2 py-2 text-center text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold sm:text-xs">
        <Flame className="h-3.5 w-3.5 shrink-0 animate-gold-pulse" />
        <span className="text-white/90">
          <span className="text-gold">LOTE 0 - PRÉ-LANÇAMENTO</span>
          <span className="mx-1.5 text-gold/50">|</span>
          Aproveite para garantir seu ingresso
        </span>
      </div>
      <span className="pointer-events-none absolute inset-y-0 -left-1/4 w-1/4 -skew-x-12 bg-white/10 opacity-0 transition-all duration-1000 group-hover:left-full group-hover:opacity-100" />
    </a>
  );
}
