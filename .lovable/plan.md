## Distribuir o CTA ao longo da página

Hoje o botão dourado/verde (`CtaLink`) aparece em **Hero**, **Audience** e **Pricing**. Entre eles existem trechos longos sem chamada à ação (About → Includes, Schedule → Speakers → Testimonials, e a Faq no fim).

### O que adicionar

Inserir um `CtaLink` centralizado ao final das seções abaixo, mantendo o mesmo padrão visual usado em `Audience.tsx` (envolvido em `BlurFade`, dentro de um `flex justify-center` com leve `pt`):

1. **About** — após o conteúdo principal
2. **Schedule** — após a grade de horários
3. **Speakers** — após o grid de palestrantes
4. **Testimonials** — após o marquee/grid de depoimentos
5. **Faq** — após a lista de perguntas (fechamento da página antes do footer)

Resultado: CTA aparece em Hero → About → Audience → Schedule → Speakers → Testimonials → Pricing → Faq. Bem distribuído, sem repetir em seções vizinhas curtas (Divide, Includes ficam de fora para não ficar redundante com Audience logo abaixo).

### Padrão do snippet inserido

```tsx
import { CtaLink } from "./CtaLink";
import { EVENT, getActiveLote } from "@/data/summit";
const ACTIVE = getActiveLote();

<BlurFade>
  <div className="flex justify-center pt-4">
    <CtaLink href={EVENT.checkout} lote={ACTIVE.name} preco={`R$${ACTIVE.price}`}>
      Garantir minha vaga por R${ACTIVE.price}
    </CtaLink>
  </div>
</BlurFade>
```

### Escopo nas duas variações

`Hero` e `HeroV2` são os únicos componentes específicos da rota `/v2`. Todas as outras seções (`About`, `Schedule`, `Speakers`, `Testimonials`, `Faq`) são **compartilhadas** entre `SummitPage` (`/`) e `SummitPageV2` (`/v2`) — então editar cada arquivo uma vez já cobre as duas páginas automaticamente. Nada precisa ser duplicado.

### Arquivos alterados

- `src/components/sections/About.tsx`
- `src/components/sections/Schedule.tsx`
- `src/components/sections/Speakers.tsx`
- `src/components/sections/Testimonials.tsx`
- `src/components/sections/Faq.tsx`

Nenhuma alteração de lógica, dados ou estilo das seções existentes — apenas o bloco do CTA no final de cada uma.