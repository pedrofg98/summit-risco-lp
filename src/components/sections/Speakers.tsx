import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { SectionHeading } from "./SectionHeading";
import { SPEAKERS } from "@/data/summit";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function Speakers() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="shell flex flex-col gap-12">
        <SectionHeading
          eyebrow="Time de palestrantes"
          title={
            <>
              As vozes que estão construindo o{" "}
              <span className="text-gold-gradient">futuro da NR1</span>
            </>
          }
          subtitle="Especialistas que atuam diretamente com os desafios reais do mercado — RH, jurídico, tecnologia, liderança, diversidade e saúde mental."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SPEAKERS.map((s, i) => {
            const isSilvino = s.name === "Silvino Santos";
            return (
              <BlurFade key={s.name} delay={0.05 * i}>
                <MagicCard className="h-full">
                  <div className="flex h-full flex-col gap-4 p-5">
                    {/* avatar */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-gold/15">
                      {s.photo ? (
                        <img
                          src={s.photo}
                          alt={s.name}
                          className="h-full w-full object-cover object-top"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#15110b] to-[#0c0c0c]">
                          <span className="font-display text-4xl font-black text-gold/70">
                            {initials(s.name)}
                          </span>
                        </div>
                      )}
                      {isSilvino && (
                        <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wide text-gold-ink">
                          Idealizador
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-display text-base font-extrabold uppercase leading-tight text-white">
                        {s.name}
                      </h3>
                      <p className="text-xs font-semibold text-gold">{s.role}</p>
                      <p className="mt-1 text-[0.8rem] leading-relaxed text-muted-foreground">
                        {s.bio}
                      </p>
                    </div>
                  </div>
                </MagicCard>
              </BlurFade>
            );
          })}
        </div>

      </div>
    </section>
  );
}
