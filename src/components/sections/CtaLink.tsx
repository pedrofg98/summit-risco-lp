import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCheckout } from "./CheckoutProvider";

interface CtaLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  size?: "lg" | "xl";
  lote?: string;
  preco?: string;
}

/** CTA dourado: abre o modal de pré-cadastro e em seguida redireciona ao checkout Kiwify com prefill. */
export function CtaLink({ href, children, className, size = "xl", lote, preco }: CtaLinkProps) {
  const { openCheckout } = useCheckout();
  return (
    <button
      type="button"
      onClick={() => openCheckout(href, { lote, preco })}
      className={cn(
        "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full text-white",
        "font-display font-extrabold uppercase tracking-[0.04em]",
        "border border-white/10 shadow-[0_14px_40px_-14px_rgba(34,197,94,0.7)]",
        "transform-gpu transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_22px_60px_-12px_rgba(34,197,94,0.9)] active:translate-y-px",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cta-green)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        size === "xl" ? "px-8 py-4 text-[0.95rem]" : "px-6 py-3 text-sm",
        className,
      )}
      style={{
        background: "linear-gradient(180deg,#4ade80 0%,#22c55e 45%,#16a34a 100%)",
      }}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
      <span className="pointer-events-none absolute inset-y-0 -left-1/3 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-[120%] group-hover:opacity-100" />
    </button>
  );
}
