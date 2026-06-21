import { Lock } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Meteors } from "@/components/magicui/meteors";
import { SectionHeading } from "./SectionHeading";
import { CtaLink } from "./CtaLink";
import { LOTES } from "@/data/summit";
import { cn } from "@/lib/utils";

export function Pricing() {
  const active = LOTES.find((l) => l.status === "active") ?? LOTES[0];

  return (
    <section
      id="ingressos"
      className="relative overflow-hidden border-y border-border bg-black/50 py-20 md:py-28"
    >
      <Meteors number={12} />
      <div className="shell relative flex flex-col gap-12">
        <SectionHeading
          eyebrow="Garanta seu ingresso"
          title={
            <>
              Quanto antes você entrar,{" "}
              <span className="text-gold-gradient">menos você paga</span>
            </>
          }
          subtitle="Os lotes sobem por data. O valor de hoje é o menor que este ingresso terá."
        />

        {/* barra de lotes lado a lado */}
        <BlurFade>
          <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-gold/25 bg-card/70 gold-ring">
            <div className="grid grid-cols-5">
              {LOTES.map((l, i) => {
                const isActive = l.status === "active";
                const isSold = l.status === "sold";
                return (
                  <div
                    key={l.name}
                    className={cn(
                      "flex flex-col items-center gap-2 px-3 py-6 text-center",
                      i > 0 && "border-l border-border",
                    )}
                  >
                    <span
                      className={cn(
                        "text-[0.75rem] font-semibold uppercase tracking-[0.16em] md:text-sm",
                        isActive
                          ? "text-white"
                          : isSold
                          ? "text-white"
                          : "text-white/35",
                      )}
                    >
                      {l.name}
                    </span>
                    <div className="relative">
                      <span
                        className={cn(
                          "font-display text-2xl font-black md:text-4xl",
                          isActive
                            ? "text-[var(--color-lime-active)]"
                            : isSold
                            ? "text-white/40 line-through decoration-2"
                            : "text-white/35",
                        )}
                      >
                        R${l.price}
                      </span>
                      {isSold && (
                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-6 rounded-sm bg-red-600 px-3 py-0.5 text-[0.6rem] font-extrabold uppercase tracking-widest text-white shadow-md md:text-xs">
                          Esgotado
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </BlurFade>

        {/* tagline + card de compra centralizado */}
        <BlurFade delay={0.1}>
          <div className="mx-auto flex max-w-md flex-col items-center gap-5 text-center">
            <p className="text-balance text-sm text-muted-foreground">
              Não tem gravação. Ou você entra ao vivo, ou perde.
            </p>
            <CtaLink href={active.link} size="lg" lote={active.name} preco={`R$${active.price}`}>
              Garantir minha vaga por R${active.price}
            </CtaLink>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" /> Pagamento seguro via Kiwify · Cartão e PIX ·
              pagamento único
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
