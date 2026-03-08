import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ClipboardCheck,
  ArrowRight,
  ArrowLeft,
  Loader2,
  HelpCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { AccessibilityMenu } from "@/a11y/AccessibilityMenu";

// ── Sanitization ──
const MAX_TEXT_LENGTH = 500;
const MAX_SHORT_LENGTH = 100;
const MAX_PHONE_LENGTH = 15;

function sanitizeText(input: string, maxLength = MAX_TEXT_LENGTH): string {
  return input.replace(/<[^>]*>/g, "").replace(/[<>]/g, "").trim().slice(0, maxLength);
}

function sanitizePhone(input: string): string {
  return input.replace(/\D/g, "").slice(0, MAX_PHONE_LENGTH);
}

/** Format phone: (11) 99999-8888 */
function formatPhone(digits: string): string {
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

let lastSubmitTime = 0;
const RATE_LIMIT_MS = 5000;

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
  };
}

function getLanding(): "beti" | "acelerador" {
  return window.location.hostname.includes("acelerador") ? "acelerador" : "beti";
}

function trackEvent(event: string, data?: Record<string, string>) {
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event, ...data });
  }
}

const WEBHOOK_URL = "https://fila.online.des.br/webhook/beti_diagnostico_modal";
const PROD_OBRIGADO = "https://beti.websolutions.eti.br/beti-obrigado";
const STAGING_OBRIGADO = "/beti-obrigado";

const EXIT_INTENT_WA = "https://api.whatsapp.com/message/ODGRXMJLE5DVA1";

// ── Tooltip helper ──
function FieldTooltip({ tip }: { tip: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className="inline-flex ml-1.5 text-slate-500 hover:text-indigo-400 transition-colors" aria-label="Ajuda">
          <HelpCircle className="w-4 h-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[240px] bg-slate-800 text-slate-200 border-slate-700 text-xs">
        {tip}
      </TooltipContent>
    </Tooltip>
  );
}

// ── Validation error ──
function FieldError({ show, message }: { show: boolean; message: string }) {
  if (!show) return null;
  return <p className="text-red-400 text-xs mt-1">{message}</p>;
}

const DiagnosticoInline = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    nome_completo: "",
    whatsapp: "",
    site_ou_instagram: "",
    ramo_atuacao: "",
    ramo_detalhe: "",
    tamanho_equipe: "",
    processo_atual: "",
    dor_principal: "",
    prejuizo_estimado: "",
    meta_6_meses: "",
    ferramentas_atuais: "",
    impacto_futuro: "",
    prioridade: "",
    beneficio_esperado: "",
    urgencia: "",
    compromisso_guilherme: "",
  });

  // SEO
  useEffect(() => {
    document.title = "Diagnóstico Gratuito de Maturidade Digital | BETI";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Preencha o formulário e receba um diagnóstico estratégico personalizado da BETI para escalar seu negócio.");
  }, []);

  // ── Exit intent ──
  useEffect(() => {
    const shown = sessionStorage.getItem("beti_exit_inline");
    if (shown) return;

    const handleLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        sessionStorage.setItem("beti_exit_inline", "true");
        toast(
          <div className="flex flex-col gap-2">
            <p className="font-bold text-sm">Ainda com dúvidas?</p>
            <p className="text-xs text-slate-300">Fale direto com nossa equipe antes de sair!</p>
            <a
              href={EXIT_INTENT_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Falar no WhatsApp
            </a>
          </div>,
          { duration: 8000 }
        );
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Phone handler - digits only with mask
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = sanitizePhone(e.target.value);
    updateField("whatsapp", digits);
  };

  const validations: Record<string, { valid: boolean; message: string }> = {
    nome_completo: {
      valid: formData.nome_completo.trim().split(" ").length >= 2,
      message: "Informe nome e sobrenome.",
    },
    whatsapp: {
      valid: formData.whatsapp.replace(/\D/g, "").length >= 10,
      message: "Informe um número com DDD (mínimo 10 dígitos).",
    },
    site_ou_instagram: {
      valid: formData.site_ou_instagram.trim().length > 3,
      message: "Informe seu site ou @ do Instagram.",
    },
    ramo_atuacao: { valid: !!formData.ramo_atuacao, message: "Selecione um ramo." },
    ramo_detalhe: { valid: formData.ramo_detalhe.trim().length > 2, message: "Detalhe seu ramo de atuação." },
    tamanho_equipe: { valid: !!formData.tamanho_equipe, message: "Selecione o tamanho da equipe." },
    processo_atual: { valid: formData.processo_atual.trim().length > 5, message: "Descreva seu processo (mín. 6 caracteres)." },
    dor_principal: { valid: formData.dor_principal.trim().length > 5, message: "Descreva sua dor principal (mín. 6 caracteres)." },
    prejuizo_estimado: { valid: !!formData.prejuizo_estimado, message: "Selecione uma estimativa." },
    meta_6_meses: { valid: formData.meta_6_meses.trim().length > 5, message: "Descreva sua meta (mín. 6 caracteres)." },
    ferramentas_atuais: { valid: formData.ferramentas_atuais.trim().length > 2, message: "Liste suas ferramentas." },
    impacto_futuro: { valid: formData.impacto_futuro.trim().length > 5, message: "Descreva o impacto (mín. 6 caracteres)." },
    prioridade: { valid: !!formData.prioridade, message: "Selecione sua prioridade." },
    beneficio_esperado: { valid: !!formData.beneficio_esperado, message: "Selecione o benefício." },
    urgencia: { valid: !!formData.urgencia, message: "Selecione a urgência." },
    compromisso_guilherme: { valid: !!formData.compromisso_guilherme, message: "Selecione uma opção." },
  };

  const stepFields: Record<number, string[]> = {
    1: ["nome_completo", "whatsapp", "site_ou_instagram"],
    2: ["ramo_atuacao", "ramo_detalhe", "tamanho_equipe"],
    3: ["processo_atual", "dor_principal", "prejuizo_estimado"],
    4: ["meta_6_meses", "ferramentas_atuais", "impacto_futuro"],
    5: ["prioridade", "beneficio_esperado", "urgencia", "compromisso_guilherme"],
  };

  const isStepValid = () => stepFields[step]?.every((f) => validations[f]?.valid) ?? false;

  const handleNext = () => {
    // Mark all current step fields as touched
    stepFields[step]?.forEach(markTouched);
    if (isStepValid()) setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    stepFields[step]?.forEach(markTouched);
    if (!isStepValid()) return;

    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      toast.error("Aguarde alguns segundos antes de enviar novamente.");
      return;
    }
    lastSubmitTime = now;

    setLoading(true);
    const utms = getUtmParams();
    const landing = getLanding();

    const payload = {
      nome_completo: sanitizeText(formData.nome_completo, MAX_SHORT_LENGTH),
      whatsapp: sanitizePhone(formData.whatsapp),
      site_ou_instagram: sanitizeText(formData.site_ou_instagram, MAX_SHORT_LENGTH),
      ramo_atuacao: sanitizeText(formData.ramo_atuacao, MAX_SHORT_LENGTH),
      ramo_detalhe: sanitizeText(formData.ramo_detalhe, MAX_SHORT_LENGTH),
      tamanho_equipe: sanitizeText(formData.tamanho_equipe, MAX_SHORT_LENGTH),
      processo_atual: sanitizeText(formData.processo_atual),
      dor_principal: sanitizeText(formData.dor_principal),
      prejuizo_estimado: sanitizeText(formData.prejuizo_estimado, MAX_SHORT_LENGTH),
      meta_6_meses: sanitizeText(formData.meta_6_meses),
      ferramentas_atuais: sanitizeText(formData.ferramentas_atuais, MAX_SHORT_LENGTH),
      impacto_futuro: sanitizeText(formData.impacto_futuro),
      prioridade: sanitizeText(formData.prioridade, MAX_SHORT_LENGTH),
      beneficio_esperado: sanitizeText(formData.beneficio_esperado, MAX_SHORT_LENGTH),
      urgencia: sanitizeText(formData.urgencia, MAX_SHORT_LENGTH),
      compromisso_guilherme: sanitizeText(formData.compromisso_guilherme, MAX_SHORT_LENGTH),
      origem: {
        landing,
        hostname: sanitizeText(window.location.hostname, MAX_SHORT_LENGTH),
        path: sanitizeText(window.location.pathname, MAX_SHORT_LENGTH),
        ...utms,
      },
    };

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        trackEvent("beti_inline_submit_ok", { landing });
        localStorage.setItem("@beti_lead", JSON.stringify({
          nome: payload.nome_completo,
          whatsapp: payload.whatsapp,
        }));

        const isProd = window.location.hostname.includes("websolutions.eti.br");
        if (isProd) {
          window.location.href = PROD_OBRIGADO;
        } else {
          navigate(STAGING_OBRIGADO);
        }
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch {
      trackEvent("beti_inline_submit_erro", { landing });
      toast.error("Não conseguimos enviar agora. Tente novamente em instantes.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (field: string) =>
    `bg-slate-800 border-slate-700 focus:border-indigo-500 h-12 text-white placeholder:text-slate-500 transition-colors ${
      touched[field] && !validations[field]?.valid ? "border-red-500 focus:border-red-400" : ""
    }`;
  const textareaCls = (field: string) =>
    `bg-slate-800 border-slate-700 focus:border-indigo-500 text-white placeholder:text-slate-500 min-h-[110px] transition-colors ${
      touched[field] && !validations[field]?.valid ? "border-red-500 focus:border-red-400" : ""
    }`;
  const labelCls = "text-slate-300 text-sm font-medium flex items-center";

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-indigo-500/30">
      {/* Header */}
      <header className="border-b border-white/5 bg-white/[0.01] backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-sm">Diagnóstico BETI</h2>
            <p className="text-slate-500 text-xs">Análise gratuita de maturidade digital</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 pb-24">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
            Diagnóstico Premium
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
            Preencha as etapas abaixo e receba um diagnóstico estratégico personalizado para o seu negócio.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8 space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Etapa {step} de {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <Progress value={(step / totalSteps) * 100} className="h-2 bg-slate-800" />
          <div className="flex justify-between text-[10px] text-slate-600">
            {["Identificação", "Negócio", "Dores", "Metas", "Expectativas"].map((label, i) => (
              <span key={label} className={i + 1 <= step ? "text-indigo-400 font-medium" : ""}>{label}</span>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-5 sm:p-8 shadow-2xl">
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-bold text-indigo-400">Identificação</h3>

              <div className="space-y-1">
                <Label className={labelCls}>
                  Nome Completo *
                  <FieldTooltip tip="Informe nome e sobrenome como constam em documentos." />
                </Label>
                <Input
                  placeholder="Ex: Maria Silva"
                  value={formData.nome_completo}
                  onChange={(e) => updateField("nome_completo", e.target.value)}
                  onBlur={() => markTouched("nome_completo")}
                  className={inputCls("nome_completo")}
                  maxLength={MAX_SHORT_LENGTH}
                />
                <FieldError show={!!touched.nome_completo && !validations.nome_completo.valid} message={validations.nome_completo.message} />
              </div>

              <div className="space-y-1">
                <Label className={labelCls}>
                  WhatsApp (com DDD) *
                  <FieldTooltip tip="Insira seu WhatsApp com DDD. Apenas números serão aceitos." />
                </Label>
                <Input
                  placeholder="(11) 99999-8888"
                  value={formatPhone(formData.whatsapp)}
                  onChange={handlePhoneChange}
                  onKeyDown={(e) => {
                    const allowed = ['Backspace','Delete','Tab','ArrowLeft','ArrowRight','Home','End'];
                    if (allowed.includes(e.key)) return;
                    if (!/\d/.test(e.key)) e.preventDefault();
                  }}
                  onBlur={() => markTouched("whatsapp")}
                  className={inputCls("whatsapp")}
                  maxLength={16}
                  inputMode="numeric"
                  type="tel"
                />
                <FieldError show={!!touched.whatsapp && !validations.whatsapp.valid} message={validations.whatsapp.message} />
              </div>

              <div className="space-y-1">
                <Label className={labelCls}>
                  Site ou Instagram *
                  <FieldTooltip tip="Informe o site da sua empresa ou seu @ do Instagram." />
                </Label>
                <Input
                  placeholder="@empresa ou https://empresa.com.br"
                  value={formData.site_ou_instagram}
                  onChange={(e) => updateField("site_ou_instagram", e.target.value)}
                  onBlur={() => markTouched("site_ou_instagram")}
                  className={inputCls("site_ou_instagram")}
                  maxLength={MAX_SHORT_LENGTH}
                />
                <FieldError show={!!touched.site_ou_instagram && !validations.site_ou_instagram.valid} message={validations.site_ou_instagram.message} />
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-bold text-indigo-400">Sobre o Negócio</h3>

              <div className="space-y-1">
                <Label className={labelCls}>Ramo de Atuação *</Label>
                <Select value={formData.ramo_atuacao} onValueChange={(v) => { updateField("ramo_atuacao", v); markTouched("ramo_atuacao"); }}>
                  <SelectTrigger className={inputCls("ramo_atuacao")}><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="Serviços">Serviços</SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                    <SelectItem value="Infoproduto">Infoproduto</SelectItem>
                    <SelectItem value="Saúde">Saúde</SelectItem>
                    <SelectItem value="Educação">Educação</SelectItem>
                    <SelectItem value="Indústria">Indústria</SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError show={!!touched.ramo_atuacao && !validations.ramo_atuacao.valid} message={validations.ramo_atuacao.message} />
              </div>

              <div className="space-y-1">
                <Label className={labelCls}>Especifique seu ramo *</Label>
                <Input
                  placeholder="Ex: Clínica Odontológica, Agência de Marketing..."
                  value={formData.ramo_detalhe}
                  onChange={(e) => updateField("ramo_detalhe", e.target.value)}
                  onBlur={() => markTouched("ramo_detalhe")}
                  className={inputCls("ramo_detalhe")}
                  maxLength={MAX_SHORT_LENGTH}
                />
                <FieldError show={!!touched.ramo_detalhe && !validations.ramo_detalhe.valid} message={validations.ramo_detalhe.message} />
              </div>

              <div className="space-y-1">
                <Label className={labelCls}>Tamanho da Equipe *</Label>
                <Select value={formData.tamanho_equipe} onValueChange={(v) => { updateField("tamanho_equipe", v); markTouched("tamanho_equipe"); }}>
                  <SelectTrigger className={inputCls("tamanho_equipe")}><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="Somente eu">Somente eu</SelectItem>
                    <SelectItem value="2-5 pessoas">2-5 pessoas</SelectItem>
                    <SelectItem value="6-15 pessoas">6-15 pessoas</SelectItem>
                    <SelectItem value="16-50 pessoas">16-50 pessoas</SelectItem>
                    <SelectItem value="+50 pessoas">+50 pessoas</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError show={!!touched.tamanho_equipe && !validations.tamanho_equipe.valid} message={validations.tamanho_equipe.message} />
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-bold text-indigo-400">Situação Atual</h3>

              <div className="space-y-1">
                <Label className={labelCls}>
                  Como funciona seu atendimento hoje? *
                  <FieldTooltip tip="Descreva brevemente como sua equipe atende os clientes." />
                </Label>
                <Textarea
                  placeholder="Descreva seu processo atual..."
                  value={formData.processo_atual}
                  onChange={(e) => updateField("processo_atual", e.target.value)}
                  onBlur={() => markTouched("processo_atual")}
                  className={textareaCls("processo_atual")}
                  maxLength={MAX_TEXT_LENGTH}
                />
                <FieldError show={!!touched.processo_atual && !validations.processo_atual.valid} message={validations.processo_atual.message} />
              </div>

              <div className="space-y-1">
                <Label className={labelCls}>Maior dor/gargalo no atendimento *</Label>
                <Textarea
                  placeholder="O que mais te impede de escalar?"
                  value={formData.dor_principal}
                  onChange={(e) => updateField("dor_principal", e.target.value)}
                  onBlur={() => markTouched("dor_principal")}
                  className={textareaCls("dor_principal")}
                  maxLength={MAX_TEXT_LENGTH}
                />
                <FieldError show={!!touched.dor_principal && !validations.dor_principal.valid} message={validations.dor_principal.message} />
              </div>

              <div className="space-y-1">
                <Label className={labelCls}>Estimativa de prejuízo mensal *</Label>
                <Select value={formData.prejuizo_estimado} onValueChange={(v) => { updateField("prejuizo_estimado", v); markTouched("prejuizo_estimado"); }}>
                  <SelectTrigger className={inputCls("prejuizo_estimado")}><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="Até R$ 1.000">Até R$ 1.000</SelectItem>
                    <SelectItem value="R$ 1k a R$ 5k">R$ 1k a R$ 5k</SelectItem>
                    <SelectItem value="R$ 5k a R$ 10k">R$ 5k a R$ 10k</SelectItem>
                    <SelectItem value="Mais de R$ 10k">Mais de R$ 10k</SelectItem>
                    <SelectItem value="Não sei calcular">Não sei calcular</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError show={!!touched.prejuizo_estimado && !validations.prejuizo_estimado.valid} message={validations.prejuizo_estimado.message} />
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-bold text-indigo-400">Visão de Futuro</h3>

              <div className="space-y-1">
                <Label className={labelCls}>Meta para os próximos 6 meses *</Label>
                <Textarea
                  placeholder="Ex: Automatizar 80% do atendimento e dobrar conversões..."
                  value={formData.meta_6_meses}
                  onChange={(e) => updateField("meta_6_meses", e.target.value)}
                  onBlur={() => markTouched("meta_6_meses")}
                  className={textareaCls("meta_6_meses")}
                  maxLength={MAX_TEXT_LENGTH}
                />
                <FieldError show={!!touched.meta_6_meses && !validations.meta_6_meses.valid} message={validations.meta_6_meses.message} />
              </div>

              <div className="space-y-1">
                <Label className={labelCls}>Ferramentas que usa hoje *</Label>
                <Input
                  placeholder="Ex: WhatsApp, Planilhas, CRM..."
                  value={formData.ferramentas_atuais}
                  onChange={(e) => updateField("ferramentas_atuais", e.target.value)}
                  onBlur={() => markTouched("ferramentas_atuais")}
                  className={inputCls("ferramentas_atuais")}
                  maxLength={MAX_SHORT_LENGTH}
                />
                <FieldError show={!!touched.ferramentas_atuais && !validations.ferramentas_atuais.valid} message={validations.ferramentas_atuais.message} />
              </div>

              <div className="space-y-1">
                <Label className={labelCls}>Impacto se resolver isso *</Label>
                <Textarea
                  placeholder="O que muda no seu negócio se esse problema for resolvido?"
                  value={formData.impacto_futuro}
                  onChange={(e) => updateField("impacto_futuro", e.target.value)}
                  onBlur={() => markTouched("impacto_futuro")}
                  className={textareaCls("impacto_futuro")}
                  maxLength={MAX_TEXT_LENGTH}
                />
                <FieldError show={!!touched.impacto_futuro && !validations.impacto_futuro.valid} message={validations.impacto_futuro.message} />
              </div>
            </div>
          )}

          {/* Step 5 */}
          {step === 5 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-bold text-indigo-400">Expectativas</h3>

              <div className="space-y-1">
                <Label className={labelCls}>Sua prioridade agora *</Label>
                <Select value={formData.prioridade} onValueChange={(v) => { updateField("prioridade", v); markTouched("prioridade"); }}>
                  <SelectTrigger className={inputCls("prioridade")}><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="Reduzir custo operacional">Reduzir custo operacional</SelectItem>
                    <SelectItem value="Aumentar vendas">Aumentar vendas</SelectItem>
                    <SelectItem value="Melhorar atendimento">Melhorar atendimento</SelectItem>
                    <SelectItem value="Automatizar processos">Automatizar processos</SelectItem>
                    <SelectItem value="Escalar sem contratar">Escalar sem contratar</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError show={!!touched.prioridade && !validations.prioridade.valid} message={validations.prioridade.message} />
              </div>

              <div className="space-y-1">
                <Label className={labelCls}>Principal benefício esperado *</Label>
                <Select value={formData.beneficio_esperado} onValueChange={(v) => { updateField("beneficio_esperado", v); markTouched("beneficio_esperado"); }}>
                  <SelectTrigger className={inputCls("beneficio_esperado")}><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="Mais tempo livre">Mais tempo livre</SelectItem>
                    <SelectItem value="Mais receita">Mais receita</SelectItem>
                    <SelectItem value="Menos erros operacionais">Menos erros operacionais</SelectItem>
                    <SelectItem value="Clientes mais satisfeitos">Clientes mais satisfeitos</SelectItem>
                    <SelectItem value="Competitividade">Competitividade</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError show={!!touched.beneficio_esperado && !validations.beneficio_esperado.valid} message={validations.beneficio_esperado.message} />
              </div>

              <div className="space-y-1">
                <Label className={labelCls}>Urgência para resolver *</Label>
                <Select value={formData.urgencia} onValueChange={(v) => { updateField("urgencia", v); markTouched("urgencia"); }}>
                  <SelectTrigger className={inputCls("urgencia")}><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="Urgente (este mês)">Urgente (este mês)</SelectItem>
                    <SelectItem value="Em breve (trimestre)">Em breve (trimestre)</SelectItem>
                    <SelectItem value="Sem prazo definido">Sem prazo definido</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError show={!!touched.urgencia && !validations.urgencia.valid} message={validations.urgencia.message} />
              </div>

              <div className="space-y-1 bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
                <Label className="text-indigo-300 text-sm font-medium">Aceita consultoria de 15min com Guilherme (CTO)? *</Label>
                <Select value={formData.compromisso_guilherme} onValueChange={(v) => { updateField("compromisso_guilherme", v); markTouched("compromisso_guilherme"); }}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 h-12 mt-2"><SelectValue placeholder="Escolha..." /></SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="Sim! Quero falar com Guilherme">Sim! Quero falar com Guilherme</SelectItem>
                    <SelectItem value="Prefiro apenas o diagnóstico da Beti">Prefiro apenas o diagnóstico da Beti</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError show={!!touched.compromisso_guilherme && !validations.compromisso_guilherme.valid} message={validations.compromisso_guilherme.message} />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep((s) => s - 1)}
                className="sm:flex-1 bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 h-12 rounded-xl order-2 sm:order-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
              </Button>
            )}
            <Button
              onClick={step === totalSteps ? handleSubmit : handleNext}
              disabled={loading}
              className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-95 order-1 sm:order-2"
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : step === totalSteps ? (
                <>
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  Gerar Diagnóstico
                </>
              ) : (
                <>Próximo <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-slate-500 text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Seus dados são protegidos e usados apenas para o diagnóstico.</span>
          </div>
        </div>

        {/* Resumo salvo */}
        {step > 1 && (
          <div className="mt-6 bg-white/[0.02] rounded-xl border border-white/5 p-4">
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">Dados informados</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {formData.nome_completo && (
                <div><span className="text-slate-600">Nome:</span> <span className="text-slate-300">{formData.nome_completo}</span></div>
              )}
              {formData.whatsapp && (
                <div><span className="text-slate-600">WhatsApp:</span> <span className="text-slate-300">{formatPhone(formData.whatsapp)}</span></div>
              )}
              {formData.ramo_atuacao && (
                <div><span className="text-slate-600">Ramo:</span> <span className="text-slate-300">{formData.ramo_atuacao}</span></div>
              )}
              {formData.tamanho_equipe && (
                <div><span className="text-slate-600">Equipe:</span> <span className="text-slate-300">{formData.tamanho_equipe}</span></div>
              )}
            </div>
          </div>
        )}
      </main>

      <AccessibilityMenu />
    </div>
  );
};

export default DiagnosticoInline;
