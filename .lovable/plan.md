## Plano

Substituir os depoimentos atuais pelos 6 prints enviados, em uma galeria masonry (que se adapta à altura de cada print) com abertura em lightbox ao clicar.

### Passos

1. **Subir as 6 imagens** via `lovable-assets` a partir de `/mnt/user-uploads/`, gerando 6 arquivos `src/assets/depoimento-N.webp.asset.json`.
2. **Atualizar `src/data/summit.ts`**: substituir o array `TESTIMONIALS` pelas 6 novas URLs (importadas dos JSONs gerados). Remover as antigas.
3. **Reescrever `src/components/sections/Testimonials.tsx`**:
   - Trocar o marquee duplo por uma galeria **masonry** usando CSS columns (`columns-1 sm:columns-2 lg:columns-3`, `gap-5`), com cada item `break-inside-avoid mb-5`. Isso adapta automaticamente à altura de cada depoimento.
   - Cada card vira um `<button>` que ao clicar abre um **lightbox em tela cheia**.
   - Lightbox: overlay fixo (`fixed inset-0 bg-black/90 backdrop-blur-sm z-50`), imagem centralizada com `max-h-[95vh] max-w-[95vw] object-contain`, botão de fechar (X) no canto, fecha em ESC, clique fora ou no botão. Usar estado local `useState<string | null>(selected)`.
   - Manter a `SectionHeading` atual (eyebrow, título, subtítulo).
   - Remover imports não usados (`Marquee`).

### Detalhes técnicos
- Lightbox sem dependência externa, apenas React + Tailwind + ícone `X` do `lucide-react`.
- `loading="lazy"` nos thumbnails; imagem do lightbox sem lazy.
- Acessibilidade: `aria-label` no botão, `role="dialog"`, fechar com tecla Escape via `useEffect`.