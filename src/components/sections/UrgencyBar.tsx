/** Barra fina de urgência fixa no topo — mostra as informações do evento. */
export function UrgencyBar() {
  return (
    <div className="group relative z-50 block w-full overflow-hidden border-b border-[var(--color-cta-green)]/25 bg-gradient-to-r from-black via-[#0c1f12] to-black">
      <div className="shell flex items-center justify-center py-2 text-center text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/90 sm:text-xs">
        SUMMIT RISCO 2026 | 08 DE AGOSTO | 08H ÀS 18H | ONLINE
      </div>
      <span className="pointer-events-none absolute inset-y-0 -left-1/4 w-1/4 -skew-x-12 bg-white/10 opacity-0 transition-all duration-1000 group-hover:left-full group-hover:opacity-100" />
    </div>
  );
}
