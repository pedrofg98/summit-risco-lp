## Objetivo
Criar uma rota `/v2` duplicando a página principal, com uma variante do Hero que usa `bg_fundo_mobile_v2.webp` como fundo mobile e move o padding de baixo para cima (para a imagem dos palestrantes aparecer primeiro, empurrando o conteúdo do hero para baixo).

## Alterações

### 1. Upload do asset
- `lovable-assets create --file /mnt/user-uploads/bg_fundo_mobile_v2.webp` → grava `src/assets/bg-fundo-mobile-v2.webp.asset.json`.

### 2. Novo Hero variante: `src/components/sections/HeroV2.tsx`
Cópia de `Hero.tsx` com duas diferenças:
- Importa `bg-fundo-mobile-v2.webp.asset.json` em vez de `bg-fundo-hero-mobile.webp.asset.json`.
- No `shell`: trocar `py-14 pb-[360px] md:py-16 ... lg:pb-14` por `pt-[360px] pb-14 md:py-16 ... lg:pt-14`. No mobile, o `pt-[360px]` empurra o conteúdo para baixo (revelando a imagem com os palestrantes no topo); no desktop volta ao padrão.

### 3. Nova página: `src/components/SummitPageV2.tsx`
Cópia de `SummitPage.tsx` trocando apenas `Hero` por `HeroV2`. Mantém todas as outras seções idênticas.

### 4. Nova rota: `src/routes/v2.tsx`
```tsx
import { createFileRoute } from "@tanstack/react-router";
import SummitPageV2 from "@/components/SummitPageV2";

export const Route = createFileRoute("/v2")({
  head: () => ({ meta: [ /* mesmo conteúdo do index */ ] }),
  component: SummitPageV2,
});
```
O plugin do TanStack regenera `routeTree.gen.ts` automaticamente.

## Resultado
- `/` continua igual (imagem mobile atual, padding em baixo).
- `/v2` usa a nova imagem mobile e o conteúdo do hero aparece abaixo da imagem dos palestrantes.
- Desktop em ambas as rotas permanece inalterado.