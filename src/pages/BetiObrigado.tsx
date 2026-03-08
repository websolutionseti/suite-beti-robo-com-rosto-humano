import { AccessibilityMenu } from "@/a11y/AccessibilityMenu";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, ArrowRight, Bot, Sparkles } from "lucide-react";
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

const UPSELL_WA_MSG = "Olá Beti! Acabei de receber meu diagnóstico base, mas quero uma análise personalizada e profunda para minha empresa.";
const UPSELL_WA_PHONE = "5512992317773";
const CTO_WA_PHONE = "5512991528871";
const CTO_WA_MSG = "Olá, acabei de gerar meu diagnóstico BETI e gostaria de falar com o especialista sobre consultoria.";

const BetiObrigado = () => {
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isDownloadOpen, setDownloadOpen] = useState(false);

  useEffect(() => {
    document.title = "Diagnóstico Gerado com Sucesso | BETI";
    const saved = localStorage.getItem("@beti_lead");
    if (saved) {
      try {
        const lead = JSON.parse(saved);
        if (lead.nome) setUserName(lead.nome);
        if (lead.whatsapp) setUserPhone(lead.whatsapp);
      } catch {}
    }
  }, []);

  const handleUpsellWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send/?phone=${UPSELL_WA_PHONE}&text=${encodeURIComponent(UPSELL_WA_MSG)}&type=phone_number&app_absent=0`,
      "_blank"
    );
  };

  const handleCtoWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send/?phone=${CTO_WA_PHONE}&text=${encodeURIComponent(CTO_WA_MSG)}&type=phone_number&app_absent=0`,
      "_blank"
    );
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
    setUserPhone(digits);
  };

  const formatPhone = (digits: string) => {
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
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
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-emerald-600/10 rounded-full blur-[80px]" />

        {/* Success icon */}
        <div className="mx-auto mb-6 w-20 h-20 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center justify-center">
          <CheckCircle2 className="text-emerald-500 w-10 h-10" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black mb-4 bg-gradient-to-r from-indigo-300 via-purple-200 to-white bg-clip-text text-transparent leading-tight">
          Seu diagnóstico técnico base acaba de ser liberado! 🎯
        </h1>

        <p className="text-slate-300 text-base leading-relaxed mb-4">
          Nossa Inteligência Artificial gerou uma <strong className="text-indigo-400">leitura preliminar em PDF</strong> da sua operação com base nas informações recebidas.
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          Para resultados de alta performance, solicite uma <strong className="text-white">análise profunda e personalizada</strong> com a nossa IA avançada.
        </p>

        {/* CTA Buttons */}
        <div className="space-y-4">
          {/* Primary: Upsell Beti IA */}
          <Button
            onClick={handleUpsellWhatsApp}
            className="w-full h-16 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 hover:from-emerald-500 hover:via-teal-500 hover:to-indigo-600 text-white font-bold text-base sm:text-lg rounded-2xl shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/40 group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Sparkles className="mr-2 w-5 h-5 flex-shrink-0 animate-pulse" />
            Aprofunde meu Diagnóstico com a Beti (IA)
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Secondary: Download PDF */}
          <Button
            onClick={() => setDownloadOpen(true)}
            variant="outline"
            className="w-full h-14 bg-transparent border-slate-600 text-slate-300 hover:bg-white/5 hover:text-white font-semibold text-sm sm:text-base rounded-2xl transition-all hover:-translate-y-0.5 group"
          >
            <Download className="mr-2 w-5 h-5 flex-shrink-0 group-hover:text-indigo-400 transition-colors" />
            Baixar Relatório Base (PDF)
          </Button>
        </div>

        <p className="mt-8 text-slate-500 text-xs text-center border-t border-white/5 pt-6">
          © 2024 Web Solutions ETI — Todos os direitos reservados.
        </p>
      </div>

      {/* Download Modal */}
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
              <Label className="text-slate-300 text-sm font-medium">Nome</Label>
              <Input value={userName} onChange={(e) => setUserName(e.target.value)} className="bg-slate-800 border-slate-700 focus:border-indigo-500 h-12 text-white placeholder:text-slate-500" />
            </div>
            <div className="space-y-1">
              <Label className="text-slate-300 text-sm font-medium">WhatsApp</Label>
              <Input value={userPhone} onChange={(e) => setUserPhone(e.target.value)} className="bg-slate-800 border-slate-700 focus:border-indigo-500 h-12 text-white placeholder:text-slate-500" />
            </div>
            <div className="space-y-1">
              <Label className="text-slate-300 text-sm font-medium">E-mail corporativo</Label>
              <Input placeholder="Ex: joao@empresa.com.br" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="bg-slate-800 border-slate-700 focus:border-indigo-500 h-12 text-white placeholder:text-slate-500" />
            </div>
            <Button onClick={handleDownloadSubmit} className="w-full h-12 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all">
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
