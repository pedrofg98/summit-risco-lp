import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "./SectionHeading";
import { CtaLink } from "./CtaLink";
import { EVENT, TESTIMONIALS, getActiveLote } from "@/data/summit";

const ACTIVE = getActiveLote();

export function Testimonials() {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="shell flex flex-col gap-12">
        <SectionHeading
          eyebrow="Quem já vive o Método R.I.S.C.O."
          title={
            <>
              O que os alunos falam sobre o{" "}
              <span className="text-gold-gradient">Método R.I.S.C.O.</span>
            </>
          }
          subtitle="Profissionais que decidiram sair da insegurança e passaram a atuar com método, clareza e segurança diante da NR1."
        />

        <BlurFade>
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {TESTIMONIALS.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(src)}
                className="mb-5 block w-full overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-gold/50 hover:shadow-lg break-inside-avoid"
                aria-label="Abrir depoimento em tela cheia"
              >
                <img
                  src={src}
                  alt="Depoimento de aluno do Método R.I.S.C.O."
                  className="h-auto w-full"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </BlurFade>
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in"
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label="Fechar"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X size={24} />
          </button>
          <img
            src={selected}
            alt="Depoimento ampliado"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[95vh] max-w-[95vw] rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
