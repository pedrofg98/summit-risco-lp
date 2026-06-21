import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Loader2, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { buildKiwifyUrl, loadStoredLead, maskPhoneBR, saveStoredLead, type Lead } from "@/lib/kiwify";
import { captureUtmsFromUrl, getStoredUtms } from "@/lib/utm";

interface CheckoutMeta {
  lote?: string;
  preco?: string;
}

interface CheckoutContextValue {
  openCheckout: (href: string, meta?: CheckoutMeta) => void;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function useCheckout(): CheckoutContextValue {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used inside <CheckoutProvider>");
  return ctx;
}

const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome completo")
    .max(80, "Nome muito longo"),
  email: z.string().trim().email("E-mail inválido").max(120),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10 && v.replace(/\D/g, "").length <= 11, {
      message: "Telefone inválido (com DDD)",
    }),
});

type LeadForm = z.infer<typeof leadSchema>;

async function postLead(body: Record<string, string>): Promise<void> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 2500);
  try {
    await fetch("/api/public/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: ctrl.signal,
      keepalive: true,
    });
  } catch {
    // silencioso — nunca trava o checkout
  } finally {
    clearTimeout(timer);
  }
}

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [targetHref, setTargetHref] = useState<string | null>(null);
  const metaRef = useRef<CheckoutMeta>({});
  const [submitting, setSubmitting] = useState(false);

  // captura UTMs uma vez no mount
  useEffect(() => {
    captureUtmsFromUrl();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<LeadForm>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", email: "", phone: "" },
  });

  const phoneValue = watch("phone");

  const openCheckout = useCallback(
    (href: string, meta?: CheckoutMeta) => {
      setTargetHref(href);
      metaRef.current = meta ?? {};
      const stored = loadStoredLead();
      reset({
        name: stored?.name ?? "",
        email: stored?.email ?? "",
        phone: stored?.phone ? maskPhoneBR(stored.phone) : "",
      });
      setOpen(true);
    },
    [reset],
  );

  useEffect(() => {
    if (!phoneValue) return;
    const masked = maskPhoneBR(phoneValue);
    if (masked !== phoneValue) setValue("phone", masked, { shouldValidate: false });
  }, [phoneValue, setValue]);

  const onSubmit = async (values: LeadForm) => {
    if (!targetHref) return;
    setSubmitting(true);
    const lead: Lead = {
      name: values.name,
      email: values.email,
      phone: values.phone,
    };
    saveStoredLead(lead);

    const utms = getStoredUtms();
    const meta = metaRef.current;
    await postLead({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      lote: meta.lote ?? "",
      preco: meta.preco ?? "",
      utm_source: utms.utm_source ?? "",
      utm_medium: utms.utm_medium ?? "",
      utm_campaign: utms.utm_campaign ?? "",
      url: typeof window !== "undefined" ? window.location.href : "",
    });

    const url = buildKiwifyUrl(targetHref, lead);
    window.location.href = url;
  };

  return (
    <CheckoutContext.Provider value={{ openCheckout }}>
      {children}
      <Dialog open={open} onOpenChange={(v) => (!submitting ? setOpen(v) : null)}>
        <DialogContent
          className={cn(
            "max-w-md border-white/10 bg-[#0B0B0B] p-0 sm:rounded-2xl",
            "shadow-[0_30px_120px_-20px_rgba(209,176,140,0.35)]",
          )}
        >
          {/* Glow dourado de fundo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-32 rounded-t-2xl opacity-60"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 0%, rgba(209,176,140,0.18) 0%, rgba(209,176,140,0) 70%)",
            }}
          />
          <div className="relative px-6 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-9">
            <DialogHeader className="space-y-2 text-left">
              <span className="font-display text-[0.7rem] uppercase tracking-[0.22em] text-gold">
                Pré-cadastro
              </span>
              <DialogTitle className="font-display text-2xl font-extrabold leading-tight text-white sm:text-[1.65rem]">
                Falta pouco para garantir sua vaga
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-white/60">
                Preencha seus dados e siga para o pagamento seguro. Em seguida você recebe o acesso por e-mail.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
              <Field
                label="Nome completo"
                error={errors.name?.message}
                input={
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="Seu nome completo"
                    {...register("name")}
                    className={inputCls}
                  />
                }
              />
              <Field
                label="E-mail"
                error={errors.email?.message}
                input={
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="voce@email.com"
                    {...register("email")}
                    className={inputCls}
                  />
                }
              />
              <Field
                label="Telefone (WhatsApp)"
                error={errors.phone?.message}
                input={
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(11) 99999-9999"
                    {...register("phone")}
                    className={inputCls}
                  />
                }
              />

              <button
                type="submit"
                disabled={submitting}
                className={cn(
                  "group relative isolate mt-2 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full text-gold-ink",
                  "px-6 py-3.5 text-[0.95rem] font-display font-extrabold uppercase tracking-[0.04em]",
                  "border border-white/15 shadow-[0_14px_40px_-14px_rgba(209,176,140,0.65)]",
                  "transform-gpu transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_22px_60px_-12px_rgba(209,176,140,0.85)] active:translate-y-px",
                  "disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100",
                )}
                style={{
                  background: "linear-gradient(180deg,#E7D0AE 0%,#D1B08C 45%,#BF9B71 100%)",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Redirecionando…
                    </>
                  ) : (
                    <>
                      Ir para o pagamento
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
                <span className="pointer-events-none absolute inset-y-0 -left-1/3 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-[120%] group-hover:opacity-100" />
              </button>

              <p className="flex items-center justify-center gap-1.5 pt-1 text-[0.72rem] text-white/40">
                <Lock className="h-3 w-3" />
                Pagamento processado com segurança pela Kiwify
              </p>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </CheckoutContext.Provider>
  );
}

const inputCls = cn(
  "block w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white",
  "placeholder:text-white/30 transition-colors",
  "focus:border-gold/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-gold/30",
);

function Field({
  label,
  input,
  error,
}: {
  label: string;
  input: ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-white/55">
        {label}
      </span>
      {input}
      {error ? <span className="mt-1 block text-xs text-red-400">{error}</span> : null}
    </label>
  );
}
