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
          <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-gold/25 bg-card/70 gold-ring">
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {LOTES.map((l, i) => {
                const isActive = l.status === "active";
                return (
                  <div
                    key={l.name}
                    className={cn(
                      "flex flex-col items-center gap-1.5 px-4 pb-7 pt-5 text-center",
                      // divisórias
                      i % 2 === 1 && "border-l border-border",
                      "sm:border-l sm:first:border-l-0",
                      i >= 2 && "border-t border-border sm:border-t-0",
                      isActive && "bg-gold/[0.08]"
                    )}
                  >
                    <div className="flex h-5 items-center justify-center">
                      {isActive && (
                        <span className="rounded-full bg-gold px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-gold-ink">
                          Lote atual
                        </span>
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-[0.7rem] font-semibold uppercase tracking-[0.16em]",
                        isActive ? "text-gold" : "text-muted-foreground"
                      )}
                    >
                      {l.name.replace(" · Pré-lançamento", "")}
                    </span>
                    <span
                      className={cn(
                        "font-display text-3xl font-black md:text-4xl",
                        isActive ? "text-gold" : "text-white/35"
                      )}
                    >
                      R${l.price}
                    </span>
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
              É <span className="font-semibold text-white">online e ao vivo</span>.
              Garanta sua vaga no <span className="text-gold">menor valor</span> antes
              do próximo lote.
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
