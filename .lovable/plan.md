## O que será feito

Adicionar os campos `utm_content` e `utm_term` ao fluxo completo de captura, armazenamento e envio de UTMs para a planilha Google Sheets de leads.

## Arquivos alterados

### 1. `src/lib/utm.ts`
- Adicionar `utm_content?: string` e `utm_term?: string` ao tipo `Utms`.
- Incluir os dois novos campos no array `FIELDS`, para que também sejam capturados da URL e persistidos no `sessionStorage`.

### 2. `src/routes/api/public/lead.ts`
- Adicionar `utm_content` e `utm_term` ao schema Zod (`leadSchema`).
- Incluir os dois campos na row enviada para a planilha.
- Expandir o range da planilha de `A:J` para `A:L` (2 colunas a mais).

### 3. `src/components/sections/CheckoutProvider.tsx`
- Adicionar `utm_content` e `utm_term` ao payload do `postLead`, lendo de `getStoredUtms()`.

## Nota
É necessário adicionar manualmente os cabeçalhos das novas colunas (`utm_content`, `utm_term`) na planilha Google Sheets, na mesma ordem em que aparecem na row.