Plan: atualizar Lote 3 para R$ 89 e garantir que os CTAs apontem para o checkout correto.

1. Alterar `src/data/summit.ts`
   - No último lote (`Lote 3`), mudar `price` de `"99"` para `"89"`.
   - O `link` já está como `https://pay.kiwify.com.br/jNsOq3X`; confirmar que será mantido.

2. Verificar CTAs
   - Todos os botões de CTA (`Hero`, `HeroV2`, `About`, `Audience`, `Schedule`, `Speakers`, `Testimonials`, `Faq`, `Footer`, `Learn`) já consomem `getActiveLote()` e usam `ACTIVE.link`.
   - Por isso, quando o Lote 3 estiver ativo, os CTAs automaticamente redirecionam para `https://pay.kiwify.com.br/jNsOq3X` com o preço `R$89`.

3. Verificar renderização da seção de lotes
   - `Pricing.tsx` já consome `getLotesWithStatus()`, então o valor do Lote 3 na barra de lotes será atualizado para R$ 89 sem alterações extras.

Não são necessárias mudanças em links hardcoded adicionais — a fonte única dos lotes (`LOTES`) controla preço e checkout em todos os pontos da página.