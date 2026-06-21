## Objetivo

Antes de redirecionar pro Kiwify, gravar cada lead numa planilha Google Sheets sua, com nome, e-mail, telefone, lote clicado, UTMs e data/hora.

## Como vai funcionar

```text
[Modal] → POST /api/public/lead → Google Sheets (gateway Lovable) → ✓ → redirect Kiwify
```

A página chama um endpoint do próprio backend (`/api/public/lead`). Esse endpoint usa o **conector Google Sheets** do Lovable (que autentica com a SUA conta Google) pra fazer `append` numa aba da planilha. Se a gravação falhar por qualquer motivo, **o redirect pro Kiwify acontece mesmo assim** — a venda nunca trava por causa do Sheets.

## Passos da implementação

### 1. Conectar Google Sheets
Vou disparar o fluxo de conexão (`standard_connectors--connect` com `google_sheets`). Você faz o OAuth com a conta Google que vai ser dona da planilha. Isso linka a conexão ao projeto e injeta as credenciais como variáveis de ambiente no backend.

### 2. Você cria a planilha e me passa o ID
- Crie uma planilha no Drive da conta conectada (qualquer nome, ex: "Summit do Risco — Leads").
- Na aba `Página1` (ou outro nome de sua escolha), coloque a linha de cabeçalho:
  ```
  data | nome | email | telefone | lote | preco | utm_source | utm_medium | utm_campaign | url
  ```
- Me envia o **ID da planilha** (parte da URL entre `/d/` e `/edit`) e o **nome da aba**.

### 3. Captura de UTM no front
Adicionar `src/lib/utm.ts` que lê `utm_source`, `utm_medium`, `utm_campaign` da URL no primeiro carregamento e persiste em `sessionStorage` (sobrevive a navegação interna, expira ao fechar a aba).

### 4. Modal manda o lote junto
Atualizar `CheckoutProvider.openCheckout(href, meta)` pra aceitar `{ lote: string, preco: string }`. Cada `CtaLink` passa esses dados (ex: `{ lote: "Lote 2", preco: "R$ 1.997" }`). Hoje o `CtaLink` só tem `href` — vou adicionar props opcionais `lote` e `preco`.

### 5. Server route `src/routes/api/public/lead.ts`
- Método `POST`, valida body com Zod (`name`, `email`, `phone`, `lote?`, `preco?`, `utm_*?`, `url?`).
- Lê `LOVABLE_API_KEY` e `GOOGLE_SHEETS_API_KEY` do `process.env`.
- Lê `SHEET_ID` e `SHEET_TAB` de `process.env` (vou pedir você adicionar como secrets depois que me passar os valores — assim a planilha não fica hardcoded no repo).
- Faz `POST` pro gateway:
  ```
  https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/{SHEET_ID}/values/{SHEET_TAB}!A:J:append?valueInputOption=USER_ENTERED
  ```
  com `{ values: [[data, nome, email, telefone, lote, preco, utm_source, utm_medium, utm_campaign, url]] }`.
- Sempre retorna `{ ok: true }` com status 200, mesmo se o append falhar (loga o erro server-side). Isso garante que o front nunca segura o usuário.
- Anti-spam básico: rejeita se `email` ou `phone` estiverem vazios/inválidos (já validado, mas reforço no servidor); honeypot opcional (campo invisível no form).

### 6. Front dispara antes do redirect
Em `CheckoutProvider.onSubmit`:
1. `await fetch('/api/public/lead', { method: 'POST', body: JSON.stringify({...lead, lote, preco, ...utms, url}) })` com timeout de 3s (usando `AbortController`).
2. Independente do resultado (sucesso, erro, timeout), salva localStorage e faz `window.location.href = buildKiwifyUrl(...)`.

## Detalhes técnicos

- Endpoint público (`/api/public/*`) bypassa a auth do Lovable na URL publicada, certo pra um form anônimo. Não retorna PII; só `{ ok: true }`.
- Gateway `google_sheets` usa OAuth da sua conta — token é refreshed automaticamente pelo Lovable. Você nunca precisa renovar nada.
- `valueInputOption=USER_ENTERED` faz o Sheets parsear datas/números como se você tivesse digitado (útil pra coluna de data ficar clicável).
- Telefone vai pra planilha **com máscara** (`(11) 99999-9999`) pra leitura humana; o que vai pro Kiwify continua só dígitos com 55 prependado.
- Data salva em ISO no fuso `America/Sao_Paulo` (formatada antes de mandar).

## Fora do escopo (avise se quiser)

- Deduplicação por e-mail (hoje cada submit vira uma linha nova — bom pra acompanhar tentativas).
- Notificação por e-mail/WhatsApp pra você quando um lead entra.
- Integração paralela com CRM (HubSpot, RD Station).
- Pixel Meta/GA4 disparando evento `Lead` antes do redirect.

## O que preciso de você antes de começar

1. Confirmar que posso disparar o fluxo de conexão do Google Sheets agora.
2. Depois da conexão, criar a planilha com o cabeçalho acima e me passar o **ID da planilha** + **nome da aba**.
