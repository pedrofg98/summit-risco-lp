
## Objetivo

Criar um modal de pré-cadastro que abre ao clicar em qualquer CTA da página. Após preencher **nome, email e telefone**, o usuário é redirecionado para o checkout Kiwify do lote ativo, com os dados já preenchidos no formulário Kiwify.

## Como funciona o prefill no Kiwify

O Kiwify aceita prefill via **query string** na URL do checkout. Os parâmetros padrão são:

```
?name=Pedro%20Fernandes&email=pedro@x.com&phone=11999999999
```

Os IDs que você listou (`fullname`, `email`, `phone`) são os IDs **dos inputs no DOM do checkout**. O Kiwify lê os parâmetros `name`, `email` e `phone` da URL e popula esses campos automaticamente — esse é o comportamento documentado e funciona em todos os links `pay.kiwify.com.br`. Não precisa que o ID do form bata com o nome do parâmetro.

⚠️ Se ao testar você ver que o checkout **não** preenche, a causa quase sempre é uma destas duas:
1. O produto na Kiwify está com "campos personalizados" sobrepondo os padrão → ajustar no painel Kiwify.
2. O nome do parâmetro mudou (ex.: `full_name` em vez de `name`). Nesse caso eu ajusto o builder da URL — me avise e troco.

Vou implementar com `name`, `email`, `phone` (padrão atual). Telefone enviado como dígitos só (sem máscara), com DDI 55 prependado se ausente — formato que o Kiwify aceita melhor.

## Escopo da implementação

### 1. Novo componente `LeadModal`
`src/components/sections/LeadModal.tsx`
- Baseado em `@/components/ui/dialog` (já existe no projeto).
- Visual alinhado à identidade: fundo escuro com sutil glow dourado, borda `border-white/10`, tipografia `font-display`, botão de submit usando o mesmo gradiente dourado do `CtaLink` (sheen no hover).
- Campos: Nome completo, Email, Telefone (com máscara BR `(99) 99999-9999`).
- Validação com **zod** (`name` ≥ 2, email válido, telefone com 10–11 dígitos), mensagens de erro abaixo de cada input.
- Microcopy: título "Falta pouco para garantir sua vaga", subtítulo curto, badge do lote ativo + preço.
- Estado de loading no botão; após submit válido, redireciona via `window.location.href` para a URL Kiwify com prefill.

### 2. Provider/contexto global de checkout
`src/components/sections/CheckoutProvider.tsx`
- Context com `openCheckout(href: string)` e `closeCheckout()`.
- Renderiza um único `<LeadModal />` no topo da árvore (montado em `SummitPage`).
- Guarda o `href` do lote clicado para usar no submit.

### 3. Substituir os CTAs existentes
Hoje todo CTA é `<CtaLink href="...">` (anchor que abre Kiwify direto). Vou:
- Criar `CtaButton` (mesma aparência visual do `CtaLink`, mas `<button>`) que chama `openCheckout(href)`.
- Trocar **todos os usos** de `CtaLink` por `CtaButton` nas seções: `Hero`, `Pricing` (4 lotes), `Schedule`, `Speakers`, `Testimonials`, `About`, `Includes`, `Audience`, `Faq`, `UrgencyBar`, `Footer` — onde houver.
- Manter o componente `CtaLink` no repo caso queira reverter; só não será mais usado.

### 4. Construção da URL com prefill
Helper `src/lib/kiwify.ts`:

```ts
export function buildKiwifyUrl(base: string, lead: { name: string; email: string; phone: string }) {
  const url = new URL(base);
  url.searchParams.set("name", lead.name.trim());
  url.searchParams.set("email", lead.email.trim().toLowerCase());
  url.searchParams.set("phone", normalizePhone(lead.phone)); // só dígitos, com 55 na frente
  return url.toString();
}
```

### 5. Persistência leve
- Salvar `{name, email, phone}` em `localStorage` após submit, para pré-preencher o modal se o usuário voltar e clicar em outro CTA (UX melhor; não pula o modal — só facilita).

## Fora do escopo (confirmar se quer)

- **Captura do lead num backend** (Lovable Cloud / planilha / CRM / webhook). Hoje o lead só vai para o Kiwify junto com a URL. Se quiser armazenar para remarketing antes do pagamento, precisa ativar Lovable Cloud + uma tabela `leads` ou um webhook (ex.: Make/Zapier). Posso adicionar num segundo passo.
- Pixel/analytics no submit (Meta Pixel, GA4 event). Avise se quer disparar evento `Lead` antes do redirect.

## Detalhes técnicos

- Stack: shadcn `Dialog`, `react-hook-form` + `zod` (já no `package.json`? confirmo no build; se não tiver, instalo `react-hook-form` `@hookform/resolvers` `zod`).
- Acessibilidade: foco vai para o primeiro input ao abrir; `Esc` fecha; labels associados.
- Mobile: modal full-width com padding generoso, scroll interno se necessário.

## Pergunta antes de implementar

Quer que eu **também** salve o lead em algum lugar antes de mandar para o Kiwify (Lovable Cloud, webhook, planilha)? Ou por enquanto só passar adiante via URL e seguimos só com isso?
