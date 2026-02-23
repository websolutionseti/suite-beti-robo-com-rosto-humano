import { AccessibilityMenu } from "@/a11y/AccessibilityMenu";

const BetiObrigado = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="text-center max-w-lg w-full p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
        {/* Icon */}
        <div className="text-6xl mb-6" role="img" aria-label="Sucesso">
          ✅
        </div>

        <h1 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Diagnóstico Gerado!
        </h1>

        <p className="text-slate-300 leading-relaxed mb-4">
          Recebemos suas informações com sucesso. Eu (<strong className="text-primary">Beti</strong>) estou preparando seu relatório personalizado agora mesmo.
        </p>

        <p className="text-slate-300 leading-relaxed mb-8">
          <strong>Fique atento:</strong> O link para download chegará em instantes através dos nossos canais oficiais.
        </p>

        {/* Multi-channel */}
        <div className="flex justify-around text-xs text-slate-500 border-t border-white/5 pt-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl">🌐</span>
            <span>Browser</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl">💬</span>
            <span>WhatsApp</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl">📧</span>
            <span>E-mail</span>
          </div>
        </div>
      </div>

      {/* Menu de acessibilidade */}
      <AccessibilityMenu />
    </div>
  );
};

export default BetiObrigado;
