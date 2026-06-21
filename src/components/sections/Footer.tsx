import { Instagram } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { LightRays } from "@/components/magicui/light-rays";
import { CtaLink } from "./CtaLink";
import { EVENT, LOTES } from "@/data/summit";

const ACTIVE = LOTES.find((l) => l.status === "active") ?? LOTES[0];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-black">
      {/* CTA final */}
      <div className="relative overflow-hidden">
        <LightRays className="opacity-60" count={6} />
        <div className="shell relative flex flex-col items-center gap-7 py-20 text-center md:py-28">
          <BlurFade>
            <span className="eyebrow mx-auto">08 de agosto · Online e ao vivo</span>
          </BlurFade>
          <BlurFade delay={0.08}>
            <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,5vw,3.6rem)] text-white">
              O futuro pertence aos{" "}
              <span className="text-gold-gradient">profissionais preparados.</span>
            </h2>
          </BlurFade>
          <BlurFade delay={0.16}>
            <p className="mx-auto max-w-xl text-balance text-muted-foreground">
              Esteja ao lado de quem está construindo o futuro da gestão dos riscos
              psicossociais no Brasil — com segurança, método e responsabilidade.
            </p>
          </BlurFade>
          <BlurFade delay={0.28}>
            <CtaLink href={EVENT.checkout} lote={ACTIVE.name} preco={`R$${ACTIVE.price}`}>Garantir minha vaga por R${ACTIVE.price}</CtaLink>
          </BlurFade>
        </div>
      </div>

      {/* rodapé */}
      <div className="border-t border-border/60">
        <div className="shell flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <div>
            <p className="font-display text-lg font-black uppercase tracking-tight text-white">
              Summit R.I.S.C.O. <span className="text-gold">2026</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Realização: Silvino Santos · Formação NR1 Sem Risco
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/silvino.sanntos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-white/80 transition-colors hover:border-gold/40 hover:text-gold"
            >
              <Instagram className="h-4 w-4" />
              {EVENT.instagram}
            </a>
          </div>
        </div>
        <div className="shell pb-8">
          <p className="text-center text-[0.7rem] text-muted-foreground/60">
            © 2026 Summit R.I.S.C.O. Todos os direitos reservados. Este site não é
            afiliado ao Instagram ou à Meta.
          </p>
        </div>
      </div>
    </footer>
  );
}
