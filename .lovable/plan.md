## O que será feito

Substituir a foto atual do Silvino (à direita na Hero) pela imagem enviada dos palestrantes (`bg_fundo_desktop.webp`), posicionada no topo centralizado da seção.

## Arquivos alterados

### 1. Asset pointer
- Criar `src/assets/bg-fundo-desktop.webp.asset.json` a partir do upload do usuário via `lovable-assets`.

### 2. `src/components/sections/Hero.tsx`
- Substituir `src={PHOTOS[1]}` pelo novo asset.
- Alterar `className` da imagem para usar `object-top` ao invés de `object-[center_20%]`, garantindo posicionamento superior centralizado.
- Ajustar os gradientes de overlay conforme necessário para manter a legibilidade do texto sobre a nova imagem.
