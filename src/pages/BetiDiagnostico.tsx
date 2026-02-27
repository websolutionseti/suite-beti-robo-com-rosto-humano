import { useEffect, useState } from "react";
import { AccessibilityMenu } from "@/a11y/AccessibilityMenu";
import { Loader2, ShieldCheck, Cpu } from "lucide-react";

const BetiDiagnostico = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    // SEO dinâmico via JS (já que não temos Helmet)
    document.title = "Processando seu Diagnóstico | BETI";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Aguarde enquanto a BETI analisa seus dados e gera seu diagnóstico de maturidade digital exclusivo.");

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 selection:bg-indigo-500/30">
      <div className="text-center max-w-md w-full p-10 bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_-12px_rgba(79,70,229,0.2)] transition-all duration-500 hover:border-white/20">

        {/* Ícone Animado */}
        <div className="relative mx-auto mb-10 w-24 h-24">
          <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping" />
          <div className="absolute inset-0 flex items-center justify-center bg-indigo-600 rounded-full shadow-lg shadow-indigo-500/40">
            <Cpu className="text-white w-12 h-12 animate-pulse" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
          Sincronizando{dots}
        </h1>

        <div className="space-y-4 mb-10">
          <p className="text-slate-400 text-base leading-relaxed">
            Eu (<strong className="text-indigo-400">Beti</strong>) estou analisando seus gargalos e preparando seu ambiente técnico premium.
          </p>
          <div className="flex items-center justify-center gap-2 text-indigo-300/60 text-xs font-medium uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Processamento Seguro</span>
          </div>
        </div>

        {/* Custom Progress Bar */}
        <div className="relative w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-white/5">
          <div className="h-full bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 bg-[length:200%_100%] animate-shimmer rounded-full transition-all duration-1000 ease-out w-[85%]" />
        </div>

        <p className="mt-4 text-[10px] text-slate-500 uppercase font-semibold tracking-tighter">
          Gerando Inteligência em Tempo Real
        </p>
      </div>

      <AccessibilityMenu />
    </div>
  );
};

export default BetiDiagnostico;
