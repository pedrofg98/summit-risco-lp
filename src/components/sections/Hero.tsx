import { CtaLink } from "./CtaLink";
import { getActiveLote } from "@/data/summit";
import bgFundoDesktop from "@/assets/bg-fundo-desktop-v2.webp.asset.json";
import bgFundoMobile from "@/assets/bg-fundo-hero-mobile.webp.asset.json";

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
          fetchPriority="high"
        />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* fundo mobile */}
      <div className="pointer-events-none absolute inset-0 lg:hidden">
        <img
          src={bgFundoMobile.url}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-bottom"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* ambiência */}
      <div className="absolute inset-0 bg-grid-faint opacity-30" />
      <div className="absolute -left-40 -top-20 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[130px]" />

      <div className="shell relative z-10 grid items-center gap-10 py-14 pb-[360px] md:py-16 lg:min-h-[92vh] lg:grid-cols-2 lg:pb-14">
        <div className="flex max-w-2xl flex-col gap-7">
          <h1 className="font-display text-[2rem] leading-[1.12] sm:text-[52px] sm:leading-[1.08] font-extrabold tracking-tight text-white">
            O mercado dos riscos psicossociais mudou.
          </h1>

          <p className="font-display text-xl font-semibold text-white sm:text-2xl">
            A pergunta é: você estará entre os profissionais preparados?
          </p>

          <div className="flex flex-col gap-4">
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              Milhares de empresas precisarão de profissionais capazes de
              conduzir o mapeamento dos riscos psicossociais com método,
              segurança e responsabilidade.
            </p>

            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              O Summit R.I.S.C.O. foi criado para quem decidiu liderar esse
              movimento.
            </p>

            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              1 evento de um sábado inteiro comigo e mais 7 profissionais
              renomados do mercado pra te ajudar a dar o próximo passo
            </p>
          </div>

          <div className="pt-1">
            <CtaLink href={ACTIVE.link}>
              Garantir minha vaga por R${ACTIVE.price}
            </CtaLink>
          </div>
        </div>

        {/* coluna direita ocupada pela foto (absoluta) */}
        <div aria-hidden className="hidden lg:block" />
      </div>
    </section>
  );
}
