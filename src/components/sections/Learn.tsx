import { Check } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { SectionHeading } from "./SectionHeading";
import { CtaLink } from "./CtaLink";
import { LEARN, EVENT, LOTES } from "@/data/summit";

const ACTIVE = LOTES.find((l) => l.status === "active") ?? LOTES[0];

export function Learn() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="shell flex flex-col gap-12">
        <SectionHeading
          eyebrow="Neste Summit, você vai aprender"
          title={
            <>
              Informação todo mundo tem.{" "}
              <span className="text-gold-gradient">Decisão segura, não.</span>
            </>
          }
          subtitle="O mercado está cheio de informação sobre NR1. Os profissionais reconhecidos nos próximos anos serão os que souberem transformar informação em decisões seguras."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {LEARN.map((item, i) => (
            <BlurFade key={i} delay={0.08 * i}>
              <MagicCard className="h-full">
                <div className="flex items-start gap-4 p-6">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/12 text-gold ring-1 ring-gold/30">
                    <Check className="h-5 w-5" />
                  </span>
                  <p className="text-[0.98rem] leading-relaxed text-white/85">
                    {item}
                  </p>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>

        <BlurFade delay={0.1}>
          <div className="flex justify-center">
            <CtaLink href={EVENT.checkout} lote={ACTIVE.name} preco={`R$${ACTIVE.price}`}>Garantir minha vaga por R${ACTIVE.price}</CtaLink>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
