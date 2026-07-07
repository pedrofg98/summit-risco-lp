# Trocar `/v2` ↔ `/` (página principal)

Objetivo: a atual `/v2` (com `SummitPageV2`) vira a home `/`, e a atual `/` (com `SummitPage`) passa a viver em `/v2`.

## Mudanças

Apenas o componente que cada rota renderiza troca — os arquivos de rota, metadados e componentes existentes ficam.

1. `src/routes/index.tsx` — trocar o import/component:
   - `import SummitPage` → `import SummitPageV2 from "@/components/SummitPageV2"`
   - `component: SummitPage` → `component: SummitPageV2`
2. `src/routes/v2.tsx` — inverso:
   - `import SummitPageV2` → `import SummitPage from "@/components/SummitPage"`
   - `component: SummitPageV2` → `component: SummitPage`

## Verificação
- Abrir `/` no preview → confere que aparece o conteúdo que hoje está em `/v2` (com o fundo novo).
- Abrir `/v2` → confere que aparece o conteúdo antigo da home.

## Fora de escopo
- Não vou mexer nos metadados (title, description, og) — já são idênticos nas duas rotas.
- Não vou renomear os componentes `SummitPage` / `SummitPageV2` para evitar mudar código não pedido.
- Não vou criar redirect de `/v2` → `/`; a `/v2` continua acessível com o conteúdo antigo, conforme o pedido.
