## O que será feito

Inserir a imagem enviada (`bg_fundo_hero_mobile.webp`) como fundo da seção Hero **apenas no mobile**, sem efeitos adicionais por cima. O fundo desktop permanece inalterado.

## Detalhe técnico

1. **Upload da imagem mobile para o CDN** via `lovable-assets`, gerando o arquivo ponteiro `src/assets/bg-fundo-hero-mobile.webp.asset.json`.
2. **Importar o asset** em `src/components/sections/Hero.tsx`.
3. **Adicionar uma nova camada de fundo** posicionada de forma absoluta, visível apenas no mobile (`lg:hidden`) e com `pointer-events-none`.
4. **Manter a camada desktop existente** (`hidden lg:block`) exatamente como está, sem alterações.
5. **Não aplicar gradiente, overlay ou fade** sobre a imagem mobile, conforme solicitado.

## O que NÃO será alterado

- A imagem de fundo do desktop (`bg-fundo-desktop-v2.webp`) continua igual.
- Layout, tipografia, cores e conteúdo do Hero permanecem os mesmos.
- Nenhum efeito visual extra será adicionado sobre a nova imagem mobile.

## Resultado esperado

No mobile, a primeira seção exibirá a imagem dos palestrantes como plano de fundo. No desktop, continuará com a imagem de fundo atual.