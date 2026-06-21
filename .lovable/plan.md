### Objetivo
Remover a contagem regressiva "FALTAM Xd Xh" da **UrgencyBar** no topo da página.

### Arquivo
- `src/components/sections/UrgencyBar.tsx`

### Mudanças
1. Remover o texto/cápsula que exibe `faltam {left}`.
2. Remover o `useState`, `useEffect` e lógica de timer associada, já que não haverá mais contagem.
3. Manter o restante da barra intacta (texto do lote, link, animação de brilho).