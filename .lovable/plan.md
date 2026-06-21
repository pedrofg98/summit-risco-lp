## Objetivo
Reverter a disponibilidade dos lotes para que o **Lote 0 seja o liberado** e os demais (Lote 1–4) fiquem **bloqueados**.

## Alterações

### 1. Dados dos lotes — `src/data/summit.ts`
- **Lote 0**: `status: "active"`, preço `27`, link ativo do checkout.
- **Lote 1**: `status: "next"`, preço `37`.
- **Lote 2**: `status: "soon"`, preço `47`.
- **Lote 3**: `status: "soon"`, preço `57`.
- **Lote 4**: `status: "soon"`, preço `67`.

### 2. Checkout padrão — `src/data/summit.ts`
- Atualizar `EVENT.checkout` para o link do Lote 0 (`https://pay.kiwify.com.br/q6yZ91A`).

### 3. UI da barra de lotes — `src/components/sections/Pricing.tsx`
- Os status `"next"` e `"soon"` já renderizam os lotes com baixa opacidade (`text-white/35`), o que os deixa visualmente "bloqueados".
- O lote `"active"` continua em verde-limão (`--color-lime-active`) sem badge.
- Nenhuma mudança estrutural necessária — a lógica existente já suporta a inversão de status.

### 4. Barra de urgência — `src/components/sections/UrgencyBar.tsx`
- Já pega o lote ativo dinamicamente via `LOTES.find(l => l.status === "active")`. Nenhuma alteração necessária.

## Resultado esperado
- Lote 0 em destaque verde com preço R$27.
- Lotes 1–4 aparecem apagados (bloqueados).
- Barra de urgência reflete "LOTE 0" como o lote atual.