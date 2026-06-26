## Objetivo
Instalar o Meta Pixel (ID `2279862262756903`) em todo o site, disparando `PageView` no carregamento inicial.

## Alterações

**`src/routes/__root.tsx`** — adicionar o pixel ao `head()` da rota raiz para que carregue em todas as páginas:

1. Em `meta`, adicionar o script inline do Pixel:
   ```ts
   {
     children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','2279862262756903');fbq('track','PageView');`
   }
   ```
   (Usando `scripts` no head do TanStack Start.)

2. O `<noscript><img/></noscript>` fallback **não** vai no `<head>` (regra do TanStack: `<noscript>` com `<img>` no head quebra o parser). Em vez disso, renderizá-lo dentro do `<body>` no `RootShell`, logo após `{children}`.

## Resultado
- Pixel carrega em todas as rotas (root head é global).
- `PageView` dispara no load inicial conforme solicitado (sem hook adicional para mudanças de rota SPA).
- Fallback `<noscript>` posicionado corretamente no body.