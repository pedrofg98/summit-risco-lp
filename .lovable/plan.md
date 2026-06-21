# Importar `summit-risco-lp` para este projeto Lovable

Como o Lovable não suporta importação direta de repositórios, vou trazer manualmente o conteúdo do repo `https://github.com/pedrofg98/summit-risco-lp.git` para dentro deste projeto, sem criar um novo repo no GitHub.

## Passos

1. **Baixar o repo** em diretório temporário (`git clone` ou tarball via `curl` da branch principal do GitHub).
2. **Inspecionar a stack** do repo (package.json, estrutura de pastas, framework usado).
3. **Adaptar para a stack deste projeto** (TanStack Start + React 19 + Tailwind v4):
   - Páginas/componentes do repo viram rotas em `src/routes/` e componentes em `src/components/`.
   - Substituir `src/routes/index.tsx` (placeholder) pela landing page real.
   - Copiar assets (imagens, fontes) para `src/assets/`.
   - Migrar estilos para o design system em `src/styles.css` (tokens semânticos, sem cores hardcoded).
   - Se o repo usar Vite + React Router, converter rotas para file-based routing do TanStack.
   - Se usar Next.js, adaptar `app/` ou `pages/` para `src/routes/`.
4. **Instalar dependências** que o repo usar e que ainda não existem aqui (`bun add ...`).
5. **Validar build** e ajustar erros de tipo/imports.

## Pontos de atenção

- Não vou conectar este projeto ao repo do GitHub — só puxar os arquivos uma vez.
- Se o repo for grande, posso priorizar a landing principal primeiro e migrar o resto em seguida.
- Cores, fontes e tokens vão para `src/styles.css` como variáveis semânticas (regra do design system).

Confirma que posso clonar e adaptar tudo de uma vez, ou prefere que eu liste primeiro o conteúdo do repo para você escolher o que trazer?