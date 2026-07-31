# Otimização de velocidade (PageSpeed 69 → alvo 90+)

O relatório mostra três gargalos reais: a imagem de fundo da hero demora a aparecer (LCP 5,5s),
o CSS e as fontes bloqueiam a renderização (~990ms) e o Meta Pixel carrega cedo demais (~228 KiB).

## O que será feito

### 1. Acelerar a imagem principal (maior ganho)
- Adicionar `fetchpriority="high"` na imagem de fundo da hero (mobile e desktop) nas duas variações da página.
- Adicionar `<link rel="preload" as="image">` da imagem correta no `head()` da rota, com `media` para não baixar as duas versões.
- Remover a animação de entrada (BlurFade) dos elementos acima da dobra da hero, que hoje adia a pintura em ~1,9s ("element render delay").

### 2. Reduzir o bloqueio de renderização das fontes
- Trocar o `<link rel="stylesheet">` do Google Fonts por carregamento não bloqueante (`media="print"` + `onload`), com `<noscript>` de fallback.
- Reduzir os pesos das fontes carregados apenas aos usados (hoje são 15 variações), diminuindo os dois arquivos woff2 de ~83 KiB.

### 3. Adiar o Meta Pixel
- Manter o Pixel, mas iniciar o carregamento do `fbevents.js` após a interação do usuário ou após o `load` da página (fallback por timeout curto).
- O `PageView` continua sendo disparado normalmente — só sai do caminho crítico do carregamento.

### 4. Corrigir CLS potencial nas imagens
- Definir `width`/`height` explícitos nas imagens de depoimentos (a galeria masonry mantém o layout, mas o navegador reserva o espaço), evitando saltos de layout.

## Detalhes técnicos
- Arquivos: `src/routes/index.tsx`, `src/routes/v2.tsx`, `src/routes/__root.tsx`, `src/components/sections/Hero.tsx`, `HeroV2.tsx`, `Testimonials.tsx`.
- Nenhuma mudança visual: mesma arte, mesmas cores, mesmo layout. A única diferença perceptível é a hero aparecer sem fade inicial.
- O preload por `media` evita baixar as duas imagens de fundo no mesmo dispositivo.
