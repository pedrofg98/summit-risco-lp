import { Check, Mountain } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { CtaLink } from "./CtaLink";
import { EVENT, LEARN, getActiveLote } from "@/data/summit";
import bgFundoDesktop from "@/assets/bg-fundo-desktop.webp.asset.json";

const ACTIVE = getActiveLote();

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* fundo dos palestrantes — topo centralizado */}
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-full lg:block">
        <img
          src={bgFundoDesktop.url}
          alt="Palestrantes do Summit R.I.S.C.O. 2026"
          className="h-full w-full object-cover object-top"
          loading="eager"
        />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ambiência */}
      <div className="absolute inset-0 bg-grid-faint opacity-30" />
      <div className="absolute -left-40 -top-20 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[130px]" />

      <div className="shell relative z-10 grid items-center gap-10 py-14 md:py-16 lg:min-h-[92vh] lg:grid-cols-2">
        <div className="flex max-w-2xl flex-col gap-7">
          {/* logo + data */}
          <BlurFade delay={0.05}>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-gold-ink">
                  <Mountain className="h-5 w-5" />
                </span>
                <div className="leading-none">
                  <p className="font-display text-lg font-black uppercase tracking-tight text-white">
                    Summit <span className="text-gold">R.I.S.C.O.</span>
                  </p>
                  <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-muted-foreground">
                    2026
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/[0.07] px-4 py-2 text-xs font-semibold text-gold sm:text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                </span>
                {EVENT.date} · {EVENT.time} · Online
              </div>
            </div>
          </BlurFade>

          {/* headline */}
          <BlurFade delay={0.12}>
            <h1 className="font-display text-[2rem] leading-[1.12] sm:text-[52px] sm:leading-[1.08] font-extrabold tracking-tight text-white">
              Pare de improvisar na NR1.{" "}
              <span className="text-gold">
                Domine o método que te dá segurança.
              </span>
            </h1>
          </BlurFade>

          {/* subtítulo */}
          <BlurFade delay={0.18}>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              Um encontro criado para reunir especialistas e profissionais que
              compreenderam que a NR1 não exige apenas cumprimento de norma. Exige
              método, critério e decisões organizacionais responsáveis.
            </p>
          </BlurFade>

          {/* bloquinhos */}
          <BlurFade delay={0.2}>
            <p className="text-base font-semibold text-white md:text-lg">
              Neste Summit, você vai aprender:
            </p>
          </BlurFade>

          <BlurFade delay={0.26}>
            <div className="grid gap-3 sm:grid-cols-2">
              {LEARN.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card/70 p-4 backdrop-blur-sm transition-colors hover:border-gold/35"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gold text-gold-ink">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <p className="text-[0.85rem] leading-snug text-white/85">{item}</p>
                </div>
              ))}
            </div>
          </BlurFade>

          {/* CTA */}
          <BlurFade delay={0.34}>
            <div className="pt-1">
              <CtaLink href={EVENT.checkout} lote={ACTIVE.name} preco={`R$${ACTIVE.price}`}>
                Garantir minha vaga por R${ACTIVE.price}
              </CtaLink>
            </div>
          </BlurFade>
        </div>

        {/* coluna direita ocupada pela foto (absoluta) */}
        <div aria-hidden className="hidden lg:block" />
      </div>
    </section>
  );
}
