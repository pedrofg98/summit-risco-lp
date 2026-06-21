## Objetivo
Atualizar preços, links e datas dos 4 lotes, e implementar troca automática de status por data — sem exibir as datas na UI. Quando o lote atual terminar e o próximo começar, o anterior recebe o badge "ESGOTADO" automaticamente.

## Lotes (datas em 2026)
| Lote | Preço | Período | Link Kiwify |
|---|---|---|---|
| 0 | R$29 | 22/06 – 06/07 | https://pay.kiwify.com.br/q6yZ91A |
| 1 | R$49 | 07/07 – 20/07 | https://pay.kiwify.com.br/U96pbFV |
| 2 | R$79 | 21/07 – 27/07 | https://pay.kiwify.com.br/sNHxiAL |
| 3 | R$99 | 28/07 – 07/08 | https://pay.kiwify.com.br/jNsOq3X |

Observação: o usuário escreveu "28/06 até 07/08" para o Lote 3 — interpretado como 28/07, dando continuidade ao fim do Lote 2 (27/07). Confirmar se quiser outro intervalo.

## Alterações

### 1. `src/data/summit.ts`
- Remover Lote 4.
- Estender `Lote` com `startISO` e `endISO` (datas internas, não renderizadas).
- Remover o campo estático `status` da fonte e exportar uma função `getLoteStatus(lote, now)` ou computar `LOTES_RUNTIME` derivado:
  - `now < startISO` → `"soon"`
  - `startISO ≤ now ≤ endISO` → `"active"`
  - `now > endISO` → `"sold"`
- Atualizar `EVENT.checkout` para o link do lote ativo (computado).

### 2. `src/components/sections/Pricing.tsx`
- Substituir o uso de `LOTES` estático por uma lista derivada que recalcula status com base em `new Date()` no client.
- Para evitar mismatch SSR/CSR, calcular o status dentro de `useState`+`useEffect` (renderizar inicialmente assumindo o lote 0 ativo, depois recalcular no client) ou usar a data fixa de build via `new Date()` no componente client. Opção escolhida: hook `useLoteStatus()` em client, com `useState` inicial baseado em `Date.now()`.
- A UI atual já trata `active`/`sold`/`soon`/`next` — nenhum ajuste visual.

### 3. `src/components/sections/UrgencyBar.tsx`
- Já consome `LOTES.find(l => l.status === "active")`. Trocar para o helper derivado.

### 4. CtaLink / popup de checkout
- O `CtaLink` já recebe `href={active.link}`. Como `active` passa a ser computado por data, o link do popup acompanha automaticamente.

## Resultado esperado
- Hoje (21/06/2026): Lote 0 ainda em `soon`? Não — usuário pediu Lote 0 ativo agora. Como hoje é 21/06 e Lote 0 inicia 22/06, vou tratar como ativo se `now ≥ startISO − 1 dia` OU simplesmente considerar que o primeiro lote esteja ativo por padrão até a data de fim. Solução: se `now < startISO[0]`, ainda assim o Lote 0 fica `active` (fallback "primeiro lote").
- Quando passar de 06/07: Lote 0 vira `sold` (com selo "ESGOTADO") e Lote 1 vira `active` automaticamente.
- Datas nunca aparecem na UI.
- Link do checkout no popup sempre corresponde ao lote ativo.