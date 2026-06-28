import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "./SectionHeading";
import { CtaLink } from "./CtaLink";
import { EVENT, FAQ, getActiveLote } from "@/data/summit";

const ACTIVE = getActiveLote();

export function Faq() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="shell flex max-w-3xl flex-col gap-10">
        <SectionHeading
          eyebrow="Perguntas frequentes"
          title={<>Ainda com alguma dúvida?</>}
        />
        <BlurFade>
          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="font-display text-base uppercase tracking-tight text-white hover:text-gold">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </BlurFade>

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
