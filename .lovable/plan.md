## O que será feito

Substituir a imagem de fundo da seção Hero no **desktop** pela nova versão enviada (`bg_fundo_desktop_v2.webp`), sem alterar nada no mobile.

## Arquivos alterados

### 1. Novo asset pointer
- Criar `src/assets/bg-fundo-desktop-v2.webp.asset.json` a partir do upload da imagem enviada via `lovable-assets`.

### 2. `src/components/sections/Hero.tsx`
- Importar o novo asset `bgFundoDesktopV2`.
- No bloco de imagem de fundo desktop (`hidden lg:block`), trocar `src={bgFundoDesktop.url}` por `src={bgFundoDesktopV2.url}`.
- Manter o posicionamento `object-top` e o gradiente inferior existentes.
- **Não alterar** nenhum estilo ou conteúdo relacionado ao mobile.

## O que NÃO será alterado
- Layout mobile da Hero.
- Qualquer outra seção da página.
- O asset antigo (`bg-fundo-desktop.webp.asset.json`) pode ser mantido ou removido — a decisão fica a critério do usuário após aprovação.
