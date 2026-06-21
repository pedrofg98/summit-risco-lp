Remover a exibição das datas (período) dos lotes na seção de ingressos.

## O que será feito

- `src/components/sections/Pricing.tsx` — remover o `<span>` que renderiza `{l.period}` em cada card de lote.
- `src/data/summit.ts` — manter o campo `period` no tipo/dados por enquanto (não é referenciado em nenhum outro componente), apenas deixa de ser exibido. Se preferir limpeza total, posso remover o campo também.

## Resultado esperado

Cada card de lote continua mostrando o badge "Lote atual", o nome ("LOTE 0", "LOTE 1", ...) e o preço, sem nenhuma data abaixo.