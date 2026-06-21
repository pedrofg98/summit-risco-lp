## O que será feito

Remover o gradiente preto que cobre as fotos dos palestrantes na seção "Time de palestrantes".

## Detalhe técnico

Em `src/components/sections/Speakers.tsx`, a linha:

```tsx
<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
```

Cria um overlay escuro de 70% de opacidade vindo de baixo para cima sobre cada foto. Essa camada será removida, deixando as fotos limpas sem o filtro preto.

## O que NÃO será alterado

- Layout, bordas arredondadas e bordas douradas das fotos permanecem.
- A tag "Idealizador" no Silvino Santos permanece.
- Todo o restante do card (nome, cargo, bio) permanece igual.
