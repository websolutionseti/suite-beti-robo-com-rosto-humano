import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { ClipboardCheck, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

// ── Input sanitization helpers ──
const MAX_TEXT_LENGTH = 500;
const MAX_SHORT_LENGTH = 100;
const MAX_PHONE_LENGTH = 15;

/** Strip HTML tags and trim to prevent XSS via text fields */
function sanitizeText(input: string, maxLength = MAX_TEXT_LENGTH): string {
  return input
    .replace(/<[^>]*>/g, "")       // strip HTML tags
    .replace(/[<>]/g, "")          // strip remaining angle brackets
    .trim()
    .slice(0, maxLength);
}

/** Enforce digits-only for phone numbers */
function sanitizePhone(input: string): string {
  return input.replace(/\D/g, "").slice(0, MAX_PHONE_LENGTH);
}

/** Simple client-side rate limiter – blocks rapid re-submissions */
let lastSubmitTime = 0;
const RATE_LIMIT_MS = 5000; // 5 seconds between submissions

interface DiagnosticoModalProps {
  triggerClassName?: string;
  variant?: "default" | "success" | "outline" | "outline-white";
}

// Reads UTM params from the current URL
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

// Determines which landing the user is on
function getLanding(): "beti" | "acelerador" {
  return window.location.hostname.includes("acelerador") ? "acelerador" : "beti";
}

// Analytics helper (dataLayer / GA4)
function trackEvent(event: string, data?: Record<string, string>) {
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event, ...data });
  }
}

const WEBHOOK_URL = "https://fila.online.des.br/webhook/beti_diagnostico_modal";
const PROD_DIAGNOSTICO = "https://beti.websolutions.eti.br/beti-diagnostico";
const STAGING_DIAGNOSTICO = "/beti-diagnostico";

/** Generate verification code: "beti" + YYMMDD + first 6 alphanumeric chars from phone */
function generateCodigoVerificacao(phone: string): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const dateStr = `${yy}${mm}${dd}`;
  const alphaNum = phone.replace(/[^a-z0-9]/gi, "").toLowerCase().slice(0, 6);
  return `beti${dateStr}${alphaNum}`;
}

const DiagnosticoModal = ({
  triggerClassName = "",
  variant = "default",
}: DiagnosticoModalProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    // Step 1 - Identificação
    nome_completo: "",
    whatsapp: "",
    site_ou_instagram: "",
    // Step 2 - Negócio
    ramo_atuacao: "",
    ramo_detalhe: "",
    tamanho_equipe: "",
    // Step 3 - Dores
    processo_atual: "",
    dor_principal: "",
    prejuizo_estimado: "",
    // Step 4 - Metas
    meta_6_meses: "",
    ferramentas_atuais: "",
    impacto_futuro: "",
    // Step 5 - Expectativas
    prioridade: "",
    beneficio_esperado: "",
    urgencia: "",
    compromisso_guilherme: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = (): boolean => {
    switch (step) {
      case 1:
        return (
          formData.nome_completo.trim().split(" ").length >= 2 &&
          formData.whatsapp.replace(/\D/g, "").length >= 10 &&
          formData.site_ou_instagram.trim().length > 3
        );
      case 2:
        return !!formData.ramo_atuacao && formData.ramo_detalhe.trim().length > 2 && !!formData.tamanho_equipe;
      case 3:
        return formData.processo_atual.trim().length > 5 && formData.dor_principal.trim().length > 5 && !!formData.prejuizo_estimado;
      case 4:
        return formData.meta_6_meses.trim().length > 5 && formData.ferramentas_atuais.trim().length > 2 && formData.impacto_futuro.trim().length > 5;
      case 5:
        return !!formData.prioridade && !!formData.beneficio_esperado && !!formData.urgencia && !!formData.compromisso_guilherme;
      default:
        return false;
    }
  };

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setStep(1);
      trackEvent("beti_modal_open", { landing: getLanding() });
    }
  };

  const handleSubmit = async () => {
    // Rate limiting
    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      toast.error("Aguarde alguns segundos antes de enviar novamente.");
      return;
    }
    lastSubmitTime = now;

    setLoading(true);
    const utms = getUtmParams();
    const landing = getLanding();

    // Sanitize all inputs before sending to webhook
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

    const codigo_verificacao = generateCodigoVerificacao(payload.whatsapp);
    const origem_detectada = "beti_modal_v3";
    const analista = formData.compromisso_guilherme.toLowerCase().includes("guilherme") ? "guilherme" : "beti";

    const fullPayload = {
      ...payload,
      codigo_verificacao,
      origem_detectada,
    };

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullPayload),
      });

      if (res.ok) {
        trackEvent("beti_modal_submit_ok", { landing });
        setOpen(false);

        localStorage.setItem("@beti_lead", JSON.stringify({
          nome: payload.nome_completo,
          whatsapp: payload.whatsapp,
          codigo_verificacao,
          analista,
        }));

        toast.success("Diagnóstico enviado com sucesso!");
        setTimeout(() => {
          const isProd = window.location.hostname.includes("websolutions.eti.br");
          if (isProd) {
            window.location.href = PROD_DIAGNOSTICO;
          } else {
            navigate(STAGING_DIAGNOSTICO);
          }
        }, 1500);
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      trackEvent("beti_modal_submit_erro", { landing, error: String(err) });
      toast.error("Não conseguimos enviar agora. Tente novamente em instantes.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "bg-slate-800 border-slate-700 focus:border-indigo-500 h-12 text-white placeholder:text-slate-500";
  const textareaCls = "bg-slate-800 border-slate-700 focus:border-indigo-500 text-white placeholder:text-slate-500 min-h-[110px]";
  const labelCls = "text-slate-300 text-sm font-medium";

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size="lg"
          className={`text-lg px-8 py-4 h-auto shadow-lg transition-all hover:scale-105 ${triggerClassName}`}
        >
          <ClipboardCheck className="mr-2" />
          Gerar Diagnóstico
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby={undefined} className="max-w-xl w-[95vw] bg-slate-900 border-slate-800 text-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh] box-border">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Diagnóstico Premium BETI
          </DialogTitle>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Etapa {step} de {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <Progress value={(step / totalSteps) * 100} className="h-1.5 bg-slate-800" />
          </div>
        </DialogHeader>

        {/* ── Step 1: Identificação ── */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-xl font-bold text-indigo-400">Identificação</h3>
            <div className="space-y-1">
              <Label className={labelCls}>Nome Completo *</Label>
              <Input placeholder="Ex: Maria Silva" value={formData.nome_completo} onChange={(e) => updateField("nome_completo", e.target.value)} className={inputCls} maxLength={MAX_SHORT_LENGTH} />
            </div>
            <div className="space-y-1">
              <Label className={labelCls}>WhatsApp (com DDD) *</Label>
              <Input placeholder="11999998888" value={formData.whatsapp} onChange={(e) => updateField("whatsapp", e.target.value)} className={inputCls} maxLength={MAX_PHONE_LENGTH} />
            </div>
            <div className="space-y-1">
              <Label className={labelCls}>Site ou Instagram *</Label>
              <Input placeholder="@empresa ou https://empresa.com.br" value={formData.site_ou_instagram} onChange={(e) => updateField("site_ou_instagram", e.target.value)} className={inputCls} maxLength={MAX_SHORT_LENGTH} />
            </div>
          </div>
        )}

        {/* ── Step 2: Negócio ── */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-xl font-bold text-indigo-400">Sobre o Negócio</h3>
            <div className="space-y-1">
              <Label className={labelCls}>Ramo de Atuação *</Label>
              <Select value={formData.ramo_atuacao} onValueChange={(v) => updateField("ramo_atuacao", v)}>
                <SelectTrigger className="bg-slate-800 border-slate-700 h-12"><SelectValue placeholder="Selecione..." /></SelectTrigger>
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
            </div>
            <div className="space-y-1">
              <Label className={labelCls}>Especifique seu ramo *</Label>
              <Input placeholder="Ex: Clínica Odontológica, Agência de Marketing..." value={formData.ramo_detalhe} onChange={(e) => updateField("ramo_detalhe", e.target.value)} className={inputCls} maxLength={MAX_SHORT_LENGTH} />
            </div>
            <div className="space-y-1">
              <Label className={labelCls}>Tamanho da Equipe *</Label>
              <Select value={formData.tamanho_equipe} onValueChange={(v) => updateField("tamanho_equipe", v)}>
                <SelectTrigger className="bg-slate-800 border-slate-700 h-12"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="Somente eu">Somente eu</SelectItem>
                  <SelectItem value="2-5 pessoas">2-5 pessoas</SelectItem>
                  <SelectItem value="6-15 pessoas">6-15 pessoas</SelectItem>
                  <SelectItem value="16-50 pessoas">16-50 pessoas</SelectItem>
                  <SelectItem value="+50 pessoas">+50 pessoas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* ── Step 3: Dores ── */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-xl font-bold text-indigo-400">Situação Atual</h3>
            <div className="space-y-1">
              <Label className={labelCls}>Como funciona seu atendimento hoje? *</Label>
              <Textarea placeholder="Descreva seu processo atual..." value={formData.processo_atual} onChange={(e) => updateField("processo_atual", e.target.value)} className={textareaCls} maxLength={MAX_TEXT_LENGTH} />
            </div>
            <div className="space-y-1">
              <Label className={labelCls}>Maior dor/gargalo no atendimento *</Label>
              <Textarea placeholder="O que mais te impede de escalar?" value={formData.dor_principal} onChange={(e) => updateField("dor_principal", e.target.value)} className={textareaCls} maxLength={MAX_TEXT_LENGTH} />
            </div>
            <div className="space-y-1">
              <Label className={labelCls}>Estimativa de prejuízo mensal *</Label>
              <Select value={formData.prejuizo_estimado} onValueChange={(v) => updateField("prejuizo_estimado", v)}>
                <SelectTrigger className="bg-slate-800 border-slate-700 h-12"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="Até R$ 1.000">Até R$ 1.000</SelectItem>
                  <SelectItem value="R$ 1k a R$ 5k">R$ 1k a R$ 5k</SelectItem>
                  <SelectItem value="R$ 5k a R$ 10k">R$ 5k a R$ 10k</SelectItem>
                  <SelectItem value="Mais de R$ 10k">Mais de R$ 10k</SelectItem>
                  <SelectItem value="Não sei calcular">Não sei calcular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* ── Step 4: Metas ── */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-xl font-bold text-indigo-400">Visão de Futuro</h3>
            <div className="space-y-1">
              <Label className={labelCls}>Meta para os próximos 6 meses *</Label>
              <Textarea placeholder="Ex: Automatizar 80% do atendimento e dobrar conversões..." value={formData.meta_6_meses} onChange={(e) => updateField("meta_6_meses", e.target.value)} className={textareaCls} maxLength={MAX_TEXT_LENGTH} />
            </div>
            <div className="space-y-1">
              <Label className={labelCls}>Ferramentas que usa hoje *</Label>
              <Input placeholder="Ex: WhatsApp, Planilhas, CRM..." value={formData.ferramentas_atuais} onChange={(e) => updateField("ferramentas_atuais", e.target.value)} className={inputCls} maxLength={MAX_SHORT_LENGTH} />
            </div>
            <div className="space-y-1">
              <Label className={labelCls}>Impacto se resolver isso *</Label>
              <Textarea placeholder="O que muda no seu negócio se esse problema for resolvido?" value={formData.impacto_futuro} onChange={(e) => updateField("impacto_futuro", e.target.value)} className={textareaCls} maxLength={MAX_TEXT_LENGTH} />
            </div>
          </div>
        )}

        {/* ── Step 5: Expectativas ── */}
        {step === 5 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-xl font-bold text-indigo-400">Expectativas</h3>
            <div className="space-y-1">
              <Label className={labelCls}>Sua prioridade agora *</Label>
              <Select value={formData.prioridade} onValueChange={(v) => updateField("prioridade", v)}>
                <SelectTrigger className="bg-slate-800 border-slate-700 h-12"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="Reduzir custo operacional">Reduzir custo operacional</SelectItem>
                  <SelectItem value="Aumentar vendas">Aumentar vendas</SelectItem>
                  <SelectItem value="Melhorar atendimento">Melhorar atendimento</SelectItem>
                  <SelectItem value="Automatizar processos">Automatizar processos</SelectItem>
                  <SelectItem value="Escalar sem contratar">Escalar sem contratar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className={labelCls}>Principal benefício esperado *</Label>
              <Select value={formData.beneficio_esperado} onValueChange={(v) => updateField("beneficio_esperado", v)}>
                <SelectTrigger className="bg-slate-800 border-slate-700 h-12"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="Mais tempo livre">Mais tempo livre</SelectItem>
                  <SelectItem value="Mais receita">Mais receita</SelectItem>
                  <SelectItem value="Menos erros operacionais">Menos erros operacionais</SelectItem>
                  <SelectItem value="Clientes mais satisfeitos">Clientes mais satisfeitos</SelectItem>
                  <SelectItem value="Competitividade">Competitividade</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className={labelCls}>Urgência para resolver *</Label>
              <Select value={formData.urgencia} onValueChange={(v) => updateField("urgencia", v)}>
                <SelectTrigger className="bg-slate-800 border-slate-700 h-12"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="Urgente (este mês)">Urgente (este mês)</SelectItem>
                  <SelectItem value="Em breve (trimestre)">Em breve (trimestre)</SelectItem>
                  <SelectItem value="Sem prazo definido">Sem prazo definido</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1 bg-indigo-500/10 p-3 sm:p-4 rounded-xl border border-indigo-500/20">
              <Label className="text-indigo-300 text-xs sm:text-sm font-medium">Aceita consultoria de 15min com Guilherme (CTO)? *</Label>
              <Select value={formData.compromisso_guilherme} onValueChange={(v) => updateField("compromisso_guilherme", v)}>
                <SelectTrigger className="bg-slate-800 border-slate-700 h-12 mt-2"><SelectValue placeholder="Escolha..." /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="Sim! Quero falar com Guilherme">Sim! Quero falar com Guilherme</SelectItem>
                  <SelectItem value="Prefiro apenas o diagnóstico da Beti">Prefiro apenas o diagnóstico da Beti</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep((s) => s - 1)}
              className="sm:flex-1 bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 h-11 sm:h-12 rounded-xl order-2 sm:order-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
            </Button>
          )}
          <Button
            onClick={step === totalSteps ? handleSubmit : () => setStep((s) => s + 1)}
            disabled={!isStepValid() || loading}
            className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11 sm:h-12 rounded-xl shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-95 text-sm sm:text-base order-1 sm:order-2"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : step === totalSteps ? (
              "Gerar Diagnóstico"
            ) : (
              <>Próximo <ArrowRight className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </div>

        <p className="mt-3 text-center text-[10px] text-slate-500">
          Seus dados são protegidos e usados apenas para o diagnóstico.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default DiagnosticoModal;
