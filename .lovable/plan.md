
## Objetivo
Elevar a cobertura de Correspondência Avançada (email, telefone, nome, sobrenome) de ~1% para ~90-100% dos eventos `Lead`, enviando os dados **pelo navegador** (Pixel com Advanced Matching) **e pelo servidor** (CAPI), deduplicando pelo mesmo `event_id`.

## Estado atual
- Pixel `2279862262756903` já instalado em `src/routes/__root.tsx` com `PageView`.
- Formulário de pré-cadastro em `src/components/sections/CheckoutProvider.tsx` coleta `name`, `email`, `phone` e envia para `/api/public/lead` (Google Sheets) antes de redirecionar para o Kiwify.
- Não há evento `Lead` disparado hoje, nem Advanced Matching, nem CAPI.

## O que vai mudar

### 1. Segredo
- Solicitar `META_CAPI_ACCESS_TOKEN` via `add_secret` (usuário gera em Gerenciador de Eventos → API de Conversões → Gerar token de acesso). Pixel ID fica hardcoded (já é público).
- Opcional (fase de teste): `META_CAPI_TEST_EVENT_CODE` — deixo comentado para ativação posterior.

### 2. Pixel no navegador (`CheckoutProvider.tsx`)
No `onSubmit`, antes do redirect:
- Separar `name` em `firstName` / `lastName` (primeiro token / resto).
- Normalizar telefone para E.164 (`+55` + dígitos — já temos `normalizePhone`, só prefixar `+`).
- Gerar `eventId = crypto.randomUUID()`.
- Reinit do pixel com Advanced Matching:
  ```
  fbq('init','2279862262756903',{ em, ph, fn, ln });
  fbq('track','Lead', { content_name: lote, value: precoNum, currency: 'BRL' }, { eventID: eventId });
  ```
- Ler cookies `_fbp` e `_fbc` do documento para enviar ao servidor.
- Enviar `eventId`, `fbp`, `fbc`, `userAgent` no body do `POST /api/public/lead`.

### 3. Server route CAPI (novo: `src/routes/api/public/meta-capi.ts`)
- `POST` com Zod validando `{ name, email, phone, eventId, fbp?, fbc?, userAgent?, lote?, preco?, url? }`.
- Extrair IP do request (`cf-connecting-ip` / `x-forwarded-for`).
- Hash SHA-256 (via `node:crypto`) de `em`, `ph` (só dígitos com 55), `fn`, `ln` — sempre `trim().toLowerCase()` antes.
- `POST https://graph.facebook.com/v19.0/2279862262756903/events?access_token=…` com payload `event_name:"Lead"`, `action_source:"website"`, `event_source_url`, `event_id`, `user_data:{em,ph,fn,ln,client_ip_address,client_user_agent,fbp,fbc}`.
- Sempre responder `{ ok:true }` (não travar o fluxo).
- Logar erros server-side; nunca vazar token.

### 4. Integração no fluxo existente
- `CheckoutProvider.onSubmit` faz **em paralelo** (`Promise.allSettled`): `postLead` (Sheets, já existe) + `postCapi` (novo) — mantendo o AbortController de 2.5s para não atrasar o redirect Kiwify.
- Reutilizar o mesmo `eventId` entre `fbq('track','Lead',…,{eventID})` e o payload CAPI.

### 5. Não fazer agora (usuário pediu)
- Nenhum evento de teste será disparado por mim. Só instalar. Após instalar, deixo instruções curtas de como o usuário testar em **Testar eventos** e Meta Pixel Helper.

## Arquivos afetados
- `src/components/sections/CheckoutProvider.tsx` — Advanced Matching, `fbq('track','Lead',…,{eventID})`, coleta de `_fbp`/`_fbc`/UA, POST paralelo à CAPI.
- `src/lib/kiwify.ts` — pequeno helper `splitName` e `phoneE164`.
- `src/routes/api/public/meta-capi.ts` — novo endpoint server-side.
- Segredo: `META_CAPI_ACCESS_TOKEN`.

## Fora do escopo
- Não altero `/api/public/lead` (Sheets segue igual).
- Não mexo em UI, layout, textos, ou outros eventos (`PageView` continua como está).
- Sem `PageView` server-side por ora — só o `Lead` de conversão, que é o que move a agulha.
