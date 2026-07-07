# Corrigir gravação de leads na planilha

## Problema
Todos os leads desde 22/06 caem na planilha só com o timestamp na coluna L, com nome/email/telefone/UTMs vazios. Confirmado agora: o lead das 10:03 de hoje também veio quebrado. Causa raiz é a combinação de dois pontos:

1. **`values:append` com range `Leads!A:L`** — o Sheets detecta a "tabela" pela última linha com dado; como uma linha antiga ficou torta (só L preenchida), toda append seguinte começa em L, e como só cabe 1 valor até o fim do range, só o primeiro item do array (`formatDateBR()`) é escrito. Vira loop de feedback.
2. **Cabeçalho com 10 colunas** (falta `utm_content` e `utm_term`) enquanto o código grava 12. Ajudou a "perder" a referência da tabela.

## Correções

### 1. `src/routes/api/public/lead.ts`
Trocar o range de append de `Leads!A:L:append` para `Leads!A1:append`. Com um anchor de célula única, o Sheets sempre começa a nova linha em A e distribui os 12 valores em A→L corretamente.

### 2. Cabeçalho da planilha (aba `Leads`, linha 1)
Escrever via API os 12 cabeçalhos corretos, na ordem exata gravada pelo endpoint:

```
data | nome | email | telefone | lote | preco | utm_source | utm_medium | utm_campaign | utm_content | utm_term | url
```

Isso substitui o cabeçalho atual (10 colunas, sem `utm_content` e `utm_term`).

### 3. Verificação
- Enviar um `POST /api/public/lead` de teste marcado (nome `TESTE_LOVABLE_FIX`).
- Reler as últimas linhas da planilha e confirmar que as 12 colunas foram preenchidas na ordem certa.
- Reportar no chat: ✅ ou ❌ com evidência.

## Fora de escopo (posso propor depois, se quiser)
- Limpar as ~30 linhas antigas quebradas (só têm timestamp, os leads em si são irrecuperáveis).
- Endurecer o endpoint com verificação de `Origin` para bloquear POST de fora dos seus domínios.
- Adicionar rate limit / honeypot contra bots.
