import { Mic } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "./SectionHeading";
import { CtaLink } from "./CtaLink";
import { EVENT, SCHEDULE, getActiveLote } from "@/data/summit";
import { cn } from "@/lib/utils";

const ACTIVE = getActiveLote();

export function Schedule() {
  return (
    <section id="programacao" className="relative border-y border-border bg-black/40 py-20 md:py-28">
      <div className="shell flex flex-col gap-12">
        <SectionHeading
          eyebrow="Programação oficial"
          title={
            <>
              10 encontros. <span className="text-gold-gradient">08h às 18h.</span>
            </>
          }
          subtitle="Um dia inteiro de conteúdo, debates e troca de experiências para conduzir a NR1 e os riscos psicossociais com método e responsabilidade."
        />

        <div className="relative mx-auto w-full max-w-4xl">
          {/* trilho */}
          <div className="absolute left-[68px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent sm:block" />

          <div className="flex flex-col gap-3">
            {SCHEDULE.map((talk, i) => (
              <BlurFade key={i} delay={0.04 * i}>
                <div
                  className={cn(
                    "group relative grid grid-cols-1 gap-4 rounded-2xl border p-5 transition-all hover:-translate-y-0.5 sm:grid-cols-[80px_1fr] sm:items-start sm:gap-6",
                    talk.highlight
                      ? "border-gold/35 bg-gradient-to-r from-gold/[0.07] to-transparent"
                      : "border-border bg-card/50 hover:border-gold/30"
                  )}
                >
                  {/* hora */}
                  <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2">
                    <span
                      className={cn(
                        "font-display text-xl font-black",
                        talk.highlight ? "text-gold" : "text-white"
                      )}
                    >
                      {talk.time}
                    </span>
                    <span className="relative z-10 hidden h-3 w-3 rounded-full ring-4 ring-background sm:block bg-gold" />
                  </div>

                  {/* conteúdo */}
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-lg font-extrabold uppercase leading-tight text-white">
                      {talk.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {talk.desc}
                    </p>
                    <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1 text-xs font-semibold text-gold">
                      <Mic className="h-3 w-3" />
                      {talk.speaker}
                    </span>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>

        <BlurFade>
          <div className="flex justify-center pt-2">
            <CtaLink href={EVENT.checkout} lote={ACTIVE.name} preco={`R$${ACTIVE.price}`}>
              Garantir minha vaga por R${ACTIVE.price}
            </CtaLink>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
