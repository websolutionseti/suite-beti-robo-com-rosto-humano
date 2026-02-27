import { AccessibilityMenu } from "@/a11y/AccessibilityMenu";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageSquare, Mail, Globe, ArrowRight } from "lucide-react";
import { useEffect } from "react";

const BetiObrigado = () => {
  useEffect(() => {
    document.title = "Diagnóstico Gerado com Sucesso | BETI";
  }, []);

  const handleWhatsApp = () => {
    const phone = "5511999998888"; // Mock do zap do Guilherme
    const text = encodeURIComponent("Olá Guilherme! Acabei de gerar meu diagnóstico na Beti e quero conversar sobre minha consultoria.");
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <div className="text-center max-w-xl w-full p-12 bg-white/[0.02] backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">

        {/* Efeito de brilho no fundo */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px]" />

        {/* Icon de Sucesso */}
        <div className="mx-auto mb-8 w-20 h-20 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center justify-center">
          <CheckCircle2 className="text-emerald-500 w-10 h-10" />
        </div>

        <h1 className="text-4xl font-black mb-6 bg-gradient-to-r from-indigo-300 via-purple-200 to-white bg-clip-text text-transparent leading-tight">
          Tudo Pronto!
        </h1>

        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          Sua análise foi concluída com sucesso. Eu (<strong className="text-indigo-400">Beti</strong>) já preparei seu relatório personalizado.
        </p>

        <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/5 mb-10 text-left">
          <p className="text-slate-400 text-sm flex items-center gap-3">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            O link para download está sendo enviado agora por:
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="flex flex-col items-center gap-2 p-3 bg-white/[0.02] rounded-xl border border-white/5 grayscale hover:grayscale-0 transition-all cursor-default">
              <Globe className="text-slate-400 w-6 h-6" />
              <span className="text-[10px] text-slate-500 uppercase font-bold">Browser</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-white/[0.02] rounded-xl border border-white/5 grayscale hover:grayscale-0 transition-all cursor-default">
              <MessageSquare className="text-slate-400 w-6 h-6" />
              <span className="text-[10px] text-slate-500 uppercase font-bold">WhatsApp</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-white/[0.02] rounded-xl border border-white/5 grayscale hover:grayscale-0 transition-all cursor-default">
              <Mail className="text-slate-400 w-6 h-6" />
              <span className="text-[10px] text-slate-500 uppercase font-bold">E-mail</span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleWhatsApp}
          className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-2xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] group"
        >
          Falar com Especialista Agora
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        <p className="mt-6 text-slate-500 text-xs text-center border-t border-white/5 pt-6">
          © 2024 Web Solutions ETI - Todos os direitos reservados.
        </p>
      </div>

      <AccessibilityMenu />
    </div>
  );
};

export default BetiObrigado;
