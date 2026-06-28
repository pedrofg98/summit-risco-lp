import { Quote } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "./SectionHeading";
import { CtaLink } from "./CtaLink";
import { EVENT, PHOTOS, getActiveLote } from "@/data/summit";

const ACTIVE = getActiveLote();

const TOPICS = [
  "Saúde mental",
  "Liderança",
  "Cultura organizacional",
  "Aspectos jurídicos",
  "Tecnologia",
  "Diversidade",
  "Riscos psicossociais",
];

export function About() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="shell flex flex-col gap-14">
        <SectionHeading
          eyebrow="Sobre o Summit"
          title={
            <>
              De conhecimento a{" "}
              <span className="text-gold-gradient">decisões mais seguras</span>
            </>
          }
          subtitle="Um encontro online e ao vivo que reúne especialistas de diferentes áreas para discutir os desafios, impactos e caminhos para uma atuação técnica, responsável e alinhada à atualização da NR1."
        />

        <BlurFade>
          <div className="flex flex-wrap justify-center gap-2.5">
            {TOPICS.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-white/80 transition-colors hover:border-gold/40 hover:text-gold"
              >
                {t}
              </span>
            ))}
          </div>
        </BlurFade>

        {/* idealizador */}
        <div className="grid items-center gap-10 rounded-3xl border border-border bg-card/50 p-6 md:grid-cols-[0.8fr_1.2fr] md:p-10">
          <BlurFade className="relative mx-auto w-full max-w-xs">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-gold/20 gold-ring">
              <img
                src={PHOTOS[0]}
                alt="Silvino Santos"
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
            </div>
          </BlurFade>

          <BlurFade delay={0.1} className="flex flex-col gap-5">
            <span className="eyebrow">Quem idealizou</span>
            <h3 className="font-display text-3xl font-black uppercase text-white">
              Silvino Santos
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              Mestre e Doutor em Psicologia, especialista em comportamento humano,
              cultura organizacional e riscos psicossociais. Pesquisador e criador
              do <span className="text-white">Método R.I.S.C.O.</span> e da{" "}
              <span className="text-white">Formação NR1 Sem Risco</span>, tem
              ajudado profissionais e organizações a conduzir a atualização da NR1
              com mais clareza, segurança e responsabilidade.
            </p>
            <div className="relative mt-2 rounded-2xl border border-gold/20 bg-gold/[0.05] p-5">
              <Quote className="absolute -top-3 left-5 h-6 w-6 rounded-full bg-background p-1 text-gold" />
              <p className="font-display text-lg font-bold uppercase leading-snug text-white">
                Porque o problema não é a NR1.
                <br />
                <span className="text-gold">
                  O problema é conduzir um processo sem método.
                </span>
              </p>
            </div>
          </BlurFade>
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
