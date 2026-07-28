import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CtaLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  size?: "lg" | "xl";
  /** @deprecated mantido por compatibilidade com chamadas antigas; não é mais usado. */
  lote?: string;
  /** @deprecated mantido por compatibilidade com chamadas antigas; não é mais usado. */
  preco?: string;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** CTA verde: redireciona direto para o checkout Kiwify (sem popup de pré-cadastro). */
export function CtaLink({ href, children, className, size = "xl" }: CtaLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      onClick={() => {
        try {
          window.fbq?.("track", "InitiateCheckout");
        } catch {
          // silencioso
        }
      }}
      className={cn(
        "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full text-white no-underline",
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
    </a>
  );
}
