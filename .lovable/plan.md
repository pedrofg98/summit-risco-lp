## O que será feito

Substituir as 6 imagens de depoimentos atuais pelas 6 novas enviadas, mantendo a mesma estrutura de exibição (grid masonry com modal de zoom).

## Arquivos alterados

### 1. Novos asset pointers (via `lovable-assets`)
Subir as 6 imagens enviadas para o CDN e gerar os pointers em `src/assets/`:
- `depoimento-1.webp.asset.json` ← `Group_21x.webp` (Carla — pontos focais)
- `depoimento-2.webp.asset.json` ← `Group_31x.webp` (Ana Franco / Jader)
- `depoimento-3.webp.asset.json` ← `Group_41x.webp` (AnaCarolina — GPT)
- `depoimento-4.webp.asset.json` ← `Group_51x.webp` (Raquel Lima)
- `depoimento-5.webp.asset.json` ← `Group_61x.webp` (Carla — grupo focal)
- `depoimento-6.webp.asset.json` ← `WhatsApp_Image_2026-06-15_at_23.29.22_1_11x-2.webp` (Milena)

Os arquivos `.asset.json` existentes serão sobrescritos (`--overwrite`), mantendo os mesmos imports em `src/data/summit.ts` — nenhuma mudança de código necessária.

## O que NÃO será alterado
- `src/data/summit.ts` (imports continuam iguais).
- `src/components/sections/Testimonials.tsx`.
- Qualquer outra seção da página.
