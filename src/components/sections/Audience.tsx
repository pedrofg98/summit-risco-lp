import { UserCheck } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "./SectionHeading";
import { CtaLink } from "./CtaLink";
import { AUDIENCE, EVENT, LOTES } from "@/data/summit";

const ACTIVE = LOTES.find((l) => l.status === "active") ?? LOTES[0];

export function Audience() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="shell flex flex-col gap-12">
        <SectionHeading
          eyebrow="Para quem é este evento"
          title={
            <>
              Feito para quem quer atuar com{" "}
              <span className="text-gold-gradient">mais segurança</span>
            </>
          }
          subtitle="Se você sente que o mercado está cheio de informação, mas faltam direcionamento e estrutura para transformar isso em decisões seguras, este evento foi pensado para você."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCE.map((item, i) => (
            <BlurFade key={i} delay={0.05 * i}>
              <div className="group flex h-full items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-4 transition-all hover:-translate-y-0.5 hover:border-gold/40">
                <UserCheck className="h-4 w-4 shrink-0 text-gold" />
                <span className="text-sm font-medium text-white/85">{item}</span>
              </div>
            </BlurFade>
          ))}
        </div>

        <BlurFade>
          <div className="flex justify-center">
            <CtaLink href={EVENT.checkout} lote={ACTIVE.name} preco={`R$${ACTIVE.price}`}>Garantir minha vaga por R${ACTIVE.price}</CtaLink>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
