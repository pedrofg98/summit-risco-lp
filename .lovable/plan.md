# Verificação end-to-end do formulário → Google Sheets

## Objetivo
Confirmar que um envio real do formulário de pré-cadastro chega corretamente na planilha do Google Sheets, com todos os campos preenchidos nas colunas certas.

## Passos

1. **Ler o código do endpoint e do formulário**
   - `src/routes/api/public/lead.ts` (endpoint que grava na planilha)
   - Componente do formulário de checkout (`CtaLink` / modal de pré-cadastro)
   - Identificar: Sheet ID, aba usada, ordem esperada das colunas e schema Zod.

2. **Ler o estado atual da planilha via conector Google Sheets**
   - Usar `standard_connectors--call_gateway_connection` para ler as últimas linhas da aba usada pelo endpoint.
   - Registrar a última linha atual (baseline) e cabeçalhos.

3. **Enviar um lead de teste real**
   - Usar `stack_modern--invoke-server-function` com `POST /api/public/lead` e um payload marcado (ex.: `nome: "TESTE_LOVABLE_<timestamp>"`, email/telefone fictícios, UTMs de teste).
   - Confirmar `200 { ok: true }`.

4. **Reler a planilha e comparar**
   - Buscar a linha nova pelo marcador do nome.
   - Validar coluna a coluna: nome, email, telefone, lote, preço, UTMs, timestamp.
   - Reportar qualquer campo faltante, deslocado ou mal formatado.

5. **Testar caminho de erro (validação)**
   - Enviar um payload inválido (ex.: email vazio) e confirmar que o endpoint retorna erro e **não** grava linha na planilha.

## Entregável
Relatório curto no chat com:
- Status do envio válido (OK / falhou) + linha resultante.
- Status do envio inválido (rejeitado como esperado?).
- Qualquer discrepância entre o que o formulário envia e o que aparece na planilha, com sugestão de correção se necessário.

## Observação
Esta verificação é **somente leitura + 1 envio de teste**. Nenhum código do app será alterado nesta etapa. Se algum problema for encontrado, proponho as correções em um plano separado antes de mexer em código.
