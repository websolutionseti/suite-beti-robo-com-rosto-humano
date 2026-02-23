import { useEffect, useState } from "react";
import { AccessibilityMenu } from "@/a11y/AccessibilityMenu";

const BetiDiagnostico = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
        {/* Loader */}
        <div className="mx-auto mb-8 w-12 h-12 border-4 border-slate-700 border-t-primary rounded-full animate-spin" />

        <h1 className="text-2xl font-bold text-white mb-3">
          Carregando seu Diagnóstico Premium{dots}
        </h1>

        <p className="text-slate-400 text-sm leading-relaxed">
          A <strong className="text-primary">Beti</strong> está preparando seu ambiente técnico.
        </p>

        {/* Progress bar visual */}
        <div className="mt-8 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-purple-400 rounded-full animate-pulse w-3/4" />
        </div>
      </div>

      {/* Menu de acessibilidade */}
      <AccessibilityMenu />
    </div>
  );
};

export default BetiDiagnostico;
