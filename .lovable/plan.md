## Diagnóstico

Calma — **isso é local só no seu navegador**. Nenhum outro lead vê seus dados.

O que está acontecendo: quando você submeteu o formulário a primeira vez, o código salvou `{nome, email, telefone}` no `localStorage` do **seu** navegador (chave `summit_lead_v1`), em `src/lib/kiwify.ts → saveStoredLead()`. Da próxima vez que o modal abre, o `loadStoredLead()` lê dessa chave e pré-preenche os campos. `localStorage` é por dispositivo + navegador — outro visitante abre com tudo vazio.

Você pode confirmar abrindo no anônimo / outro navegador: vai estar em branco.

## O que mudar

A pergunta é: você **quer** o pré-preenchimento ou prefere sempre vazio?

**Opção A — manter pré-preenchimento (recomendado)**
Útil pra quem clica num CTA, fecha o modal sem comprar, e volta depois — não precisa redigitar. Mantém como está. Você só limpa o seu localStorage uma vez (DevTools → Application → Local Storage → apagar `summit_lead_v1`) e pronto.

**Opção B — sempre abrir vazio**
Remover o `loadStoredLead()` do `openCheckout` em `CheckoutProvider.tsx` e parar de chamar `saveStoredLead()` no submit. O modal sempre vem em branco, mesmo pra quem já preencheu antes.

**Opção C — meio termo: lembrar só na mesma sessão**
Trocar `localStorage` por `sessionStorage` em `kiwify.ts`. Persiste enquanto a aba estiver aberta; ao fechar, limpa. Bom equilíbrio entre conveniência e "começar limpo" em visitas novas.

## Pergunta

Qual opção quer? **A (manter), B (sempre vazio) ou C (só na sessão)?**
