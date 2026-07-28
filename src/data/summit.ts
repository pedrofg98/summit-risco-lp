// Conteúdo do Summit R.I.S.C.O. 2026 — fonte única (extraído de COPY PÁGINA DE VENDAS).

export const EVENT = {
  name: "Summit R.I.S.C.O. 2026",
  date: "08 de agosto",
  weekday: "sábado",
  time: "08h às 18h",
  format: "100% Online e ao vivo",
  targetISO: "2026-08-08T08:00:00-03:00",
  instagram: "@silvino.sanntos",
  checkout: "https://pay.kiwify.com.br/q6yZ91A", // lote ativo (Lote 0)
};

export const STATS = [
  { value: 10, suffix: "", label: "palestras e painéis" },
  { value: 8, suffix: "", label: "especialistas convidados" },
  { value: 1, suffix: " dia", label: "de imersão completa" },
  { value: 100, suffix: "%", label: "online e ao vivo" },
];

export const LEARN = [
  "O que separa um diagnóstico superficial de um processo que realmente gera transformação.",
  "Por que muitas empresas podem estar tomando decisões equivocadas mesmo acreditando que estão cumprindo a NR1.",
  "Como integrar pessoas, liderança, cultura, tecnologia e estratégia em uma gestão mais madura dos riscos psicossociais.",
  "Quais são os pilares que sustentam uma atuação profissional segura diante das novas exigências do mercado.",
];

export const COMPARISON: { bad: string; good: string }[] = [
  {
    bad: "Acredita que aplicar questionários resolve o problema",
    good: "Entende que o desafio está na análise e nas decisões organizacionais",
  },
  {
    bad: 'Atua apenas para "cumprir norma"',
    good: "Atua com visão estratégica, técnica e preventiva",
  },
  {
    bad: "Faz diagnósticos superficiais, sem leitura organizacional",
    good: "Conduz mapeamentos com método, critério e sustentação técnica",
  },
  {
    bad: "Se sente inseguro diante das exigências da NR1",
    good: "Tem clareza para estruturar processos com mais segurança",
  },
  {
    bad: "Confunde coleta de dados com gestão de riscos psicossociais",
    good: "Transforma dados em decisões organizacionais inteligentes",
  },
  {
    bad: "Decide sem considerar impactos humanos, jurídicos e culturais",
    good: "Analisa riscos considerando pessoas, liderança e cultura",
  },
  {
    bad: "Depende de ferramentas sem compreender o processo",
    good: "Usa tecnologia sem abrir mão do olhar técnico",
  },
  {
    bad: "Reage às mudanças do mercado",
    good: "Se posiciona como profissional preparado para o futuro da NR1",
  },
];

export const INCLUDES = [
  "Conteúdo técnico e aplicável",
  "Especialistas que atuam com os desafios reais do mercado",
  "Casos, experiências e reflexões práticas",
  "Debates ao vivo com os palestrantes",
  "Certificado de participação",
  "Networking com profissionais de todo o Brasil",
  "Apresentação do Método R.I.S.C.O.",
  "Abertura oficial da nova turma da Formação NR1 Sem Risco",
  "Visão estratégica sobre o futuro da atuação diante da NR1",
];

export const AUDIENCE = [
  "Profissionais de RH",
  "Psicólogos Organizacionais",
  "Profissionais de SST",
  "Consultores Organizacionais",
  "Coordenadores e Gerentes de Pessoas",
  "Gestores e Lideranças",
  "Empresários",
  "Quem quer estruturar o mapeamento psicossocial com consistência",
];

export type Talk = {
  time: string;
  title: string;
  desc: string;
  speaker: string;
  highlight?: boolean;
};

export const SCHEDULE: Talk[] = [
  {
    time: "08h00",
    title: "Saúde Mental Não Se Improvisa",
    desc: "O que as empresas ainda não compreenderam sobre riscos psicossociais e seus impactos nas pessoas.",
    speaker: "Milena Mendonça",
  },
  {
    time: "09h00",
    title: "Método R.I.S.C.O.",
    desc: "O passo a passo para conduzir mapeamentos psicossociais com segurança e sem improviso.",
    speaker: "Silvino Santos",
    highlight: true,
  },
  {
    time: "10h00",
    title: "O Custo Invisível dos Diagnósticos Mal Conduzidos",
    desc: "Quando o erro não está no relatório, mas nas decisões que ele provoca.",
    speaker: "Léo Kaufmann",
  },
  {
    time: "11h00",
    title: "Diversidade, Inclusão e Riscos Psicossociais",
    desc: "O que as empresas ignoram ao tratar pessoas como grupos homogêneos.",
    speaker: "Felipe dos Anjos",
  },
  {
    time: "13h00",
    title: "NR1 Além da Conformidade",
    desc: "Os riscos jurídicos que surgem quando o mapeamento é tratado só como obrigação legal.",
    speaker: "Rapha Rezende",
  },
  {
    time: "14h00",
    title: "De Profissionais Inseguros a Profissionais Preparados",
    desc: "Painel especial: histórias reais de quem escolheu dominar a NR1 com método e clareza.",
    speaker: "Alunos da Formação NR1 Sem Risco",
  },
  {
    time: "15h00",
    title: "Tecnologia Não Substitui Critério",
    desc: "Como usar inteligência, dados e inovação sem perder a leitura organizacional.",
    speaker: "Ricardo Queiroz",
  },
  {
    time: "16h00",
    title: "Dos Fatores de Risco às Decisões Organizacionais",
    desc: "Como transformar o mapeamento psicossocial em planos de ação que geram mudança.",
    speaker: "Áurea Santos",
  },
  {
    time: "17h00",
    title: "A Liderança como Fator de Risco ou de Proteção",
    desc: "O papel dos líderes na sustentação das decisões organizacionais.",
    speaker: "Pablo Funchal",
  },
  {
    time: "18h00",
    title: "O Futuro Pertence aos Profissionais Preparados",
    desc: "Encerramento oficial + abertura da nova turma da Formação NR1 Sem Risco.",
    speaker: "Silvino Santos",
    highlight: true,
  },
];

import silvinoPhoto from "@/assets/speakers/silvino.webp.asset.json";
import milenaPhoto from "@/assets/speakers/milena.webp.asset.json";
import leoPhoto from "@/assets/speakers/leo.webp.asset.json";
import felipePhoto from "@/assets/speakers/felipe.webp.asset.json";
import raphaelPhoto from "@/assets/speakers/raphael.webp.asset.json";
import ricardoPhoto from "@/assets/speakers/ricardo.webp.asset.json";
import aureaPhoto from "@/assets/speakers/aurea.webp.asset.json";
import pabloPhoto from "@/assets/speakers/pablo.webp.asset.json";

export type Speaker = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
};

export const SPEAKERS: Speaker[] = [
  {
    name: "Silvino Santos",
    role: "Idealizador · Criador do Método R.I.S.C.O.",
    bio: "Mestre e Doutor em Psicologia, especialista em comportamento humano, cultura organizacional e riscos psicossociais. Criador da Formação NR1 Sem Risco.",
    photo: silvinoPhoto.url,
  },
  {
    name: "Milena Mendonça",
    role: "Fundadora da AliaRH · LinkedIn Top Voice",
    bio: "Psicóloga Organizacional e do Trabalho com 20+ anos. Consultora e mentora de líderes e profissionais de RH.",
    photo: milenaPhoto.url,
  },
  {
    name: "Léo Kaufmann",
    role: "Diretor de Conteúdo e Curador do RH Summit",
    bio: "Uma das vozes mais provocadoras do RH brasileiro. Conecta liderança, cultura e resultados sem romantização.",
    photo: leoPhoto.url,
  },
  {
    name: "Felipe dos Anjos",
    role: "Head de DEI & Employer Branding na Numen",
    bio: "Empreendedor e uma das vozes mais influentes do LinkedIn Brasil. Referência em inclusão e cultura organizacional.",
    photo: felipePhoto.url,
  },
  {
    name: "Rapha Rezende",
    role: "Advogado trabalhista · LinkedIn Top Voice 2024",
    bio: "Executivo de RH e palestrante sobre Saúde Mental, Bem-estar e NR-1. 3x Top 100 Influenciadores de RH.",
    photo: raphaelPhoto.url,
  },
  {
    name: "Ricardo Queiroz",
    role: "CEO da Flora Insights",
    bio: "Pioneiro em diagnóstico de riscos psicossociais, com 4.000+ diagnósticos e metodologia validada pela IAUPE.",
    photo: ricardoPhoto.url,
  },
  {
    name: "Áurea Santos",
    role: "Fundadora da Escola de RHs e Consultoria Luminy",
    bio: "30+ anos em desenvolvimento humano. Passagens por Coca-Cola, PepsiCo e Peugeot. Mentora de RH do Ano 2026.",
    photo: aureaPhoto.url,
  },
  {
    name: "Pablo Funchal",
    role: "CEO da Fluxus",
    bio: "Especialista em desenvolvimento de lideranças. Engenheiro e mestre pela UFSCar, professor convidado em MBAs da UFSCar e USP.",
    photo: pabloPhoto.url,
  },
];

export type LoteStatus = "active" | "next" | "soon" | "sold";

export type Lote = {
  name: string;
  price: string;
  /** Datas internas (não renderizadas) — usadas para troca automática de lote. */
  startISO: string;
  endISO: string;
  link: string;
};

/** Fonte única dos lotes. Status é computado em runtime via getLotesWithStatus(). */
export const LOTES: Lote[] = [
  {
    name: "Lote 0",
    price: "29",
    startISO: "2026-06-22T00:00:00-03:00",
    endISO: "2026-07-06T23:59:59-03:00",
    link: "https://pay.kiwify.com.br/q6yZ91A",
  },
  {
    name: "Lote 1",
    price: "49",
    startISO: "2026-07-07T00:00:00-03:00",
    endISO: "2026-07-20T23:59:59-03:00",
    link: "https://pay.kiwify.com.br/U96pbFV",
  },
  {
    name: "Lote 2",
    price: "79",
    startISO: "2026-07-21T00:00:00-03:00",
    endISO: "2026-07-27T23:59:59-03:00",
    link: "https://pay.kiwify.com.br/sNHxiAL",
  },
  {
    name: "Lote 3",
    price: "89",
    startISO: "2026-07-28T00:00:00-03:00",
    endISO: "2026-08-07T23:59:59-03:00",
    link: "https://pay.kiwify.com.br/jNsOq3X",
  },
];

export type LoteWithStatus = Lote & { status: LoteStatus };

/**
 * Calcula o status de cada lote em função da data atual:
 * - antes de qualquer lote começar: o primeiro lote fica `active` (fallback).
 * - lote cuja janela contém `now`: `active`.
 * - lotes anteriores ao ativo: `sold`.
 * - lotes posteriores: `soon` (o próximo da fila).
 * - depois do último terminar: todos `sold` e o último marcado também como `sold`.
 */
export function getLotesWithStatus(now: Date = new Date()): LoteWithStatus[] {
  const t = now.getTime();
  const ends = LOTES.map((l) => new Date(l.endISO).getTime());
  const starts = LOTES.map((l) => new Date(l.startISO).getTime());

  // Antes de tudo começar → primeiro lote ativo
  if (t < starts[0]) {
    return LOTES.map((l, i) => ({ ...l, status: i === 0 ? "active" : "soon" }));
  }
  // Encontra primeiro lote ainda não esgotado
  const activeIdx = ends.findIndex((end) => t <= end);
  if (activeIdx === -1) {
    // Todos terminaram
    return LOTES.map((l) => ({ ...l, status: "sold" as LoteStatus }));
  }
  return LOTES.map((l, i) => ({
    ...l,
    status: i < activeIdx ? "sold" : i === activeIdx ? "active" : "soon",
  }));
}

/** Retorna o lote ativo no momento (fallback: primeiro lote). */
export function getActiveLote(now: Date = new Date()): LoteWithStatus {
  const list = getLotesWithStatus(now);
  return list.find((l) => l.status === "active") ?? list[0];
}

export const FAQ = [
  {
    q: "O Summit R.I.S.C.O. 2026 é para iniciantes?",
    a: "Sim. Foi estruturado tanto para quem busca clareza sobre a atualização da NR1 quanto para quem já atua e quer aprofundar a visão técnica sobre riscos psicossociais, liderança, saúde mental e tomada de decisão.",
  },
  {
    q: "O evento será ao vivo ou gravado?",
    a: "Acontecerá totalmente online e ao vivo, com interação direta com os especialistas, debates e troca de experiências durante as apresentações.",
  },
  {
    q: "Se eu não puder participar ao vivo, perco o conteúdo?",
    a: "Não. No momento da compra você poderá garantir a opção com acesso à gravação do Summit, para assistir depois no seu ritmo.",
  },
  {
    q: "O que é o Método R.I.S.C.O.?",
    a: "Uma metodologia criada para conduzir o mapeamento dos riscos psicossociais com mais clareza, organização, sustentação técnica e segurança nas decisões organizacionais.",
  },
  {
    q: "Quais as formas de pagamento?",
    a: "Cartão de crédito, PIX e outras modalidades de pagamento seguras.",
  },
  {
    q: "O pagamento é recorrente ou único?",
    a: "Não é mensalidade. O pagamento do ingresso é único.",
  },
  {
    q: "Como recebo o acesso ao Summit?",
    a: "Após o pagamento, você recebe um e-mail com acesso à plataforma Kiwify e ao Grupo Exclusivo de Alunos no WhatsApp, onde enviaremos o link do Summit.",
  },
];

// Fotos do Silvino disponíveis em /public/fotos
export const PHOTOS = [
  "/fotos/_MG_2030-Editar.webp",
  "/fotos/_MG_2035-Editar.webp",
  "/fotos/_MG_2058-Editar.webp",
  "/fotos/_MG_2075-Editar-2.webp",
  "/fotos/_MG_2079-Editar.webp",
  "/fotos/_MG_2084-Editar.webp",
  "/fotos/_MG_2119-Editar.webp",
  "/fotos/_MG_2149-Editar.webp",
];

import depoimento1 from "@/assets/depoimento-1.webp.asset.json";
import depoimento2 from "@/assets/depoimento-2.webp.asset.json";
import depoimento3 from "@/assets/depoimento-3.webp.asset.json";
import depoimento4 from "@/assets/depoimento-4.webp.asset.json";
import depoimento5 from "@/assets/depoimento-5.webp.asset.json";
import depoimento6 from "@/assets/depoimento-6.webp.asset.json";

export const TESTIMONIALS = [
  depoimento1.url,
  depoimento6.url,
  depoimento3.url,
  depoimento4.url,
  depoimento5.url,
  depoimento2.url,
];
