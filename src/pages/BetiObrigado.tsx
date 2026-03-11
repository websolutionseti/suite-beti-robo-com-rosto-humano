import { AccessibilityMenu } from "@/a11y/AccessibilityMenu";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, ArrowRight, Sparkles, MessageSquare, Mail, Copy, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const UPSELL_WA_PHONE = "5512992317773";
const CTO_WA_PHONE = "5512991528871";

const BetiObrigado = () => {
  const [userName, setUserName] = useState("");
  const [codigoVerificacao, setCodigoVerificacao] = useState("");
  const [analista, setAnalista] = useState<"guilherme" | "beti">("beti");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Diagnóstico Gerado com Sucesso | BETI";
    const saved = localStorage.getItem("@beti_lead");
    if (saved) {
      try {
        const lead = JSON.parse(saved);
        if (lead.nome) setUserName(lead.nome);
        if (lead.codigo_verificacao) setCodigoVerificacao(lead.codigo_verificacao);
        if (lead.analista) setAnalista(lead.analista);
      } catch {}
    }
  }, []);

  const handleCopy = () => {
    if (!codigoVerificacao) return;
    navigator.clipboard.writeText(`#${codigoVerificacao}`);
    setCopied(true);
    toast.success("Código copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGuilhermeWhatsApp = () => {
    const msg = `Olá Guilherme! Acabei de gerar meu diagnóstico. Meu código de liberação é #${codigoVerificacao}. Gostaria da análise profunda!`;
    window.open(
      `https://api.whatsapp.com/send/?phone=${CTO_WA_PHONE}&text=${encodeURIComponent(msg)}&type=phone_number&app_absent=0`,
      "_blank"
    );
  };

  const handleBetiWhatsApp = () => {
    const msg = `Olá Beti! Acabei de gerar meu diagnóstico. Meu código de liberação é #${codigoVerificacao}. Quero iniciar minha análise!`;
    window.open(
      `https://api.whatsapp.com/send/?phone=${UPSELL_WA_PHONE}&text=${encodeURIComponent(msg)}&type=phone_number&app_absent=0`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <div className="text-center max-w-xl w-full p-8 md:p-12 bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-emerald-600/10 rounded-full blur-[80px]" />

        {/* Success icon */}
        <div className="mx-auto mb-6 w-16 h-16 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center justify-center">
          <CheckCircle2 className="text-emerald-500 w-8 h-8" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black mb-3 text-white leading-tight">
          Tudo Pronto!
        </h1>

        <p className="text-slate-300 text-base leading-relaxed mb-6">
          Sua análise foi concluída com sucesso. Eu (<strong className="text-indigo-400">Beti</strong>) já preparei seu relatório em PDF com base nestas respostas.
        </p>

        {/* Código de Verificação */}
        {codigoVerificacao && (
          <div className="mb-6 mx-auto max-w-sm bg-slate-800/60 border border-slate-700 rounded-xl p-4 flex items-center justify-between gap-3">
            <div className="text-left">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Código de Verificação</p>
              <p className="text-indigo-400 font-mono font-bold text-lg">#{codigoVerificacao}</p>
            </div>
            <button
              onClick={handleCopy}
              className="flex-shrink-0 p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors"
              aria-label="Copiar código"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        )}

        {/* PDF Delivery Options */}
        <div className="mb-6 bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
          <p className="text-slate-400 text-sm mb-4 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            Onde você quer receber o PDF do seu diagnóstico base?
          </p>
          <div className="grid grid-cols-3 gap-3">
            <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-600 hover:border-indigo-500/50 hover:bg-white/[0.02] transition-all group">
              <Download className="w-6 h-6 text-slate-400 group-hover:text-indigo-400 transition-colors" />
              <span className="text-xs text-slate-400 group-hover:text-white font-medium uppercase tracking-wide transition-colors">Download</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-600 hover:border-emerald-500/50 hover:bg-white/[0.02] transition-all group">
              <MessageSquare className="w-6 h-6 text-slate-400 group-hover:text-emerald-400 transition-colors" />
              <span className="text-xs text-slate-400 group-hover:text-white font-medium uppercase tracking-wide transition-colors">WhatsApp</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-600 hover:border-purple-500/50 hover:bg-white/[0.02] transition-all group">
              <Mail className="w-6 h-6 text-slate-400 group-hover:text-purple-400 transition-colors" />
              <span className="text-xs text-slate-400 group-hover:text-white font-medium uppercase tracking-wide transition-colors">E-mail</span>
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          {/* Falar com Guilherme (Humano) */}
          <Button
            onClick={handleGuilhermeWhatsApp}
            className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base rounded-2xl shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl group"
          >
            <Sparkles className="mr-2 w-5 h-5 flex-shrink-0" />
            Falar com Guilherme (Humano)
            <ArrowRight className="ml-auto w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Falar com a Beti (IA) */}
          <Button
            onClick={handleBetiWhatsApp}
            variant="outline"
            className="w-full h-14 bg-transparent border-slate-600 text-slate-300 hover:bg-white/5 hover:text-white font-semibold text-base rounded-2xl transition-all hover:-translate-y-0.5 group"
          >
            <Sparkles className="mr-2 w-5 h-5 flex-shrink-0 text-indigo-400" />
            Falar com a Beti (IA)
            <ArrowRight className="ml-auto w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <p className="mt-8 text-slate-500 text-xs text-center border-t border-white/5 pt-6">
          © 2024 Web Solutions ETI — Todos os direitos reservados.
        </p>
      </div>

      <AccessibilityMenu />
    </div>
  );
};

export default BetiObrigado;
