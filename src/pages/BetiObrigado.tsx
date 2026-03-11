import { AccessibilityMenu } from "@/a11y/AccessibilityMenu";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageSquare, Mail, Download, ArrowRight, Bot, User, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const BetiObrigado = () => {
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCode, setUserCode] = useState("");
  const [analystType, setAnalystType] = useState<"guilherme" | "beti">("beti");
  const [isDownloadOpen, setDownloadOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Diagnóstico Gerado com Sucesso | BETI";

    const saved = localStorage.getItem("@beti_lead");
    if (saved) {
      try {
        const lead = JSON.parse(saved);
        if (lead.nome) setUserName(lead.nome);
        if (lead.whatsapp) setUserPhone(lead.whatsapp);
        if (lead.codigo_verificacao) setUserCode(lead.codigo_verificacao);
        if (lead.analista) setAnalystType(lead.analista);
      } catch (e) { }
    }
  }, []);

  const handleCopyCode = () => {
    if (userCode) {
      navigator.clipboard.writeText(userCode);
      setCopied(true);
      toast.success("Código copiado!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = (target: "beti" | "guilherme") => {
    const text = target === "beti"
      ? `Olá Beti! Acabei de gerar meu diagnóstico. Meu código de liberação é #${userCode}. Quero iniciar minha análise!`
      : `Olá Guilherme! Acabei de gerar meu diagnóstico. Meu código de liberação é #${userCode}. Gostaria da análise profunda!`;
    const phone = target === "beti" ? "5512992317773" : "5512991528871";
    window.open(`https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`, "_blank");
  };

  const handleDownloadSubmit = () => {
    if (!userEmail) {
      toast.error("Por favor, informe seu e-mail.");
      return;
    }
    toast.success("O link do seu PDF será enviado para " + userEmail + "!");
    setDownloadOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <div className="text-center max-w-xl w-full p-8 md:p-12 bg-white/[0.02] backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">

        {/* Efeito de brilho no fundo */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px]" />

        {/* Icon de Sucesso */}
        <div className="mx-auto mb-8 w-20 h-20 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center justify-center">
          <CheckCircle2 className="text-emerald-500 w-10 h-10" />
        </div>

        <h1 className="text-4xl font-black mb-6 bg-gradient-to-r from-indigo-300 via-purple-200 to-white bg-clip-text text-transparent leading-tight">
          Tudo Pronto!
        </h1>

        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          Sua análise foi concluída com sucesso. Eu (<strong className="text-indigo-400">Beti</strong>) já preparei seu relatório em PDF com base nestas respostas.
        </p>

        {userCode && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 my-6 mx-auto max-w-sm flex flex-col items-center justify-center gap-2 transform transition-all hover:scale-105">
            <p className="text-sm text-indigo-300/80 font-medium uppercase tracking-wider">Código de Verificação Inteligente:</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-mono font-bold text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                #{userCode}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-indigo-300 hover:text-white hover:bg-white/10 rounded-full"
                onClick={handleCopyCode}
                title="Copiar código"
              >
                {copied ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5" />}
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2">Guarde este código. Nossa IA pedirá ele para puxar seu histórico completo caso não inicie pelo botão abaixo.</p>
          </div>
        )}

        <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/5 mb-10 text-left">
          <p className="text-slate-400 text-sm flex items-center gap-3">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            Onde você quer receber o PDF do seu diagnóstico base?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <button
              onClick={() => setDownloadOpen(true)}
              className="flex flex-row md:flex-col items-center justify-center gap-3 md:gap-2 p-4 md:p-3 bg-white/[0.02] rounded-xl border border-white/5 text-slate-400 hover:text-white hover:bg-white/5 hover:scale-105 hover:border-indigo-500/50 transition-all cursor-pointer group"
            >
              <Download className="w-6 h-6 group-hover:text-indigo-400 transition-colors" />
              <span className="text-xs md:text-[10px] uppercase font-bold tracking-wider">Download</span>
            </button>
            <button
              onClick={() => handleWhatsApp('beti')}
              className="flex flex-row md:flex-col items-center justify-center gap-3 md:gap-2 p-4 md:p-3 bg-white/[0.02] rounded-xl border border-white/5 text-slate-400 hover:text-white hover:bg-emerald-500/10 hover:scale-105 hover:border-emerald-500/50 transition-all cursor-pointer group"
            >
              <MessageSquare className="w-6 h-6 group-hover:text-emerald-400 transition-colors" />
              <span className="text-xs md:text-[10px] uppercase font-bold tracking-wider">WhatsApp</span>
            </button>
            <button
              onClick={() => setDownloadOpen(true)}
              className="flex flex-row md:flex-col items-center justify-center gap-3 md:gap-2 p-4 md:p-3 bg-white/[0.02] rounded-xl border border-white/5 text-slate-400 hover:text-white hover:bg-purple-500/10 hover:scale-105 hover:border-purple-500/50 transition-all cursor-pointer group"
            >
              <Mail className="w-6 h-6 group-hover:text-purple-400 transition-colors" />
              <span className="text-xs md:text-[10px] uppercase font-bold tracking-wider">E-mail</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => handleWhatsApp('guilherme')}
            className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-2xl shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1 group"
          >
            <User className="mr-2 w-5 h-5 flex-shrink-0" />
            Falar com Guilherme (Humano)
            <ArrowRight className="ml-auto w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            onClick={() => handleWhatsApp('beti')}
            variant="outline"
            className="w-full h-16 bg-transparent border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 hover:text-indigo-200 font-bold text-lg rounded-2xl transition-all hover:-translate-y-1 group"
          >
            <Bot className="mr-2 w-5 h-5 flex-shrink-0" />
            Falar com a Beti (IA)
            <ArrowRight className="ml-auto w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <p className="mt-8 text-slate-500 text-xs text-center border-t border-white/5 pt-6">
          © 2024 Web Solutions ETI — Todos os direitos reservados.
        </p>
      </div>

      {/* Modal de Download (Email/Telefone) */}
      <Dialog open={isDownloadOpen} onOpenChange={setDownloadOpen}>
        <DialogContent aria-describedby={undefined} className="max-w-md w-[95vw] bg-slate-900 border-slate-800 text-white p-6 rounded-3xl shadow-2xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Receber Diagnóstico
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-slate-400">
              Confirme seus dados para receber o link seguro de download do seu relatório.
            </p>
            <div className="space-y-1">
              <Label className="text-slate-300 text-sm font-medium">Nome (Identificado)</Label>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-slate-800 border-slate-700 focus:border-indigo-500 h-12 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-slate-300 text-sm font-medium">WhatsApp</Label>
              <Input
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                inputMode="numeric"
                type="tel"
                onKeyDown={(e) => {
                  const allowed = ['Backspace','Delete','Tab','ArrowLeft','ArrowRight','Home','End'];
                  if (allowed.includes(e.key)) return;
                  if (!/\d/.test(e.key)) e.preventDefault();
                }}
                className="bg-slate-800 border-slate-700 focus:border-indigo-500 h-12 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-slate-300 text-sm font-medium">E-mail corporativo</Label>
              <Input
                placeholder="Ex: joao@empresa.com.br"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="bg-slate-800 border-slate-700 focus:border-indigo-500 h-12 text-white placeholder:text-slate-500"
              />
            </div>

            <Button
              onClick={handleDownloadSubmit}
              className="w-full h-12 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all"
            >
              Confirmar e Receber PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AccessibilityMenu />
    </div>
  );
};

export default BetiObrigado;