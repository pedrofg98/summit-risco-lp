## Objetivo
Eliminar o atrito do formulário de pré-cadastro. Ao clicar em qualquer CTA da página, o lead é enviado direto para o checkout da Kiwify (URL do lote ativo), sem modal intermediário.

## Escopo
Aplicar em **ambas as versões** da página (`/` e `/v2`), já que as duas usam o mesmo `CtaLink`.

## Alterações

### 1. `src/components/sections/CtaLink.tsx`
Trocar o `<button>` que chama `openCheckout(...)` por um `<a href={href} target="_blank" rel="noopener">` mantendo exatamente o mesmo visual (gradiente verde, shine, ícone). No `onClick`, disparar `window.fbq?('track','InitiateCheckout')` para preservar o sinal no Pixel do navegador (mesmo evento que o modal disparava antes de redirecionar). Props `lote`/`preco` deixam de ser usadas — remover para manter o componente limpo. UTMs já vão anexadas via `href` porque `ACTIVE.link` é usado direto pelos componentes (Kiwify preserva query string quando presente na URL final; hoje o modal já não anexava UTM na URL do checkout, então nada muda nesse aspecto).

### 2. Remover uso do `CheckoutProvider`
- `src/components/SummitPage.tsx` e `src/components/SummitPageV2.tsx`: remover o wrapper `<CheckoutProvider>` em volta da árvore.
- Manter os arquivos `CheckoutProvider.tsx`, `src/lib/kiwify.ts`, `src/routes/api/public/lead.ts` e `src/routes/api/public/meta-capi.ts` **intactos no repositório** — assim voltamos rápido se o teste A/B der negativo. Apenas deixam de ser importados.

### 3. Sem outras mudanças
- Meta Pixel base (`PageView`) no `__root.tsx` continua igual.
- Preços, links de lote, seções, layout: sem alteração.
- CAPI server-side (`/api/public/meta-capi`) e gravação de leads na planilha (`/api/public/lead`) ficam ociosos, prontos para religar depois.

## Impacto esperado
- Menos etapas até o checkout → hipótese de conversão maior.
- Perdemos temporariamente a captura de e-mail/telefone dos leads que não finalizam a compra (base de remarketing por lista custom fica pausada durante o teste).
- Advanced Matching / CAPI de `Lead` deixa de ocorrer; o Pixel continua registrando `PageView` e `InitiateCheckout` no clique.

## Detalhes técnicos
- `CtaLink` passa a ser um `<a>` real (melhor para acessibilidade e para o Pixel/Kiwify tratarem como navegação normal).
- `target="_blank"` mantém o comportamento atual (o modal também abria o Kiwify em nova aba). Se preferir mesma aba, ajusto.
