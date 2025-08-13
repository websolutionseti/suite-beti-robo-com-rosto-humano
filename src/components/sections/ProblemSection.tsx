import { AlertTriangle, Bot, UserX, CheckCircle } from "lucide-react";

const ProblemSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-6">
            <AlertTriangle size={16} />
            O problema real dos negócios
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Muitos negócios perdem vendas e clientes por falta de{" "}
            <span className="text-gradient">atendimento rápido e humanizado</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            No mundo acelerado de hoje, cada segundo de demora no atendimento é uma oportunidade perdida.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Robô frio */}
          <div className="text-center p-8 rounded-lg border-2 border-destructive/20 bg-destructive/5">
            <div className="w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
              <Bot size={32} className="text-destructive" />
            </div>
            <h3 className="text-xl font-bold text-destructive mb-3">Robô Frio ❌</h3>
            <p className="text-muted-foreground text-sm">
              Respostas robóticas e sem contexto que frustram clientes e geram mais problemas.
            </p>
          </div>

          {/* Humano sobrecarregado */}
          <div className="text-center p-8 rounded-lg border-2 border-destructive/20 bg-destructive/5">
            <div className="w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
              <UserX size={32} className="text-destructive" />
            </div>
            <h3 className="text-xl font-bold text-destructive mb-3">Humano Sobrecarregado ❌</h3>
            <p className="text-muted-foreground text-sm">
              Equipe limitada, alta rotatividade e inconsistência no atendimento.
            </p>
          </div>

          {/* BETI Solution */}
          <div className="text-center p-8 rounded-lg border-2 border-success/30 bg-success/5 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-bold">
                SOLUÇÃO
              </span>
            </div>
            <div className="w-16 h-16 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
              <CheckCircle size={32} className="text-success" />
            </div>
            <h3 className="text-xl font-bold text-success mb-3">BETI ✓</h3>
            <p className="text-muted-foreground text-sm">
              Inteligência artificial com empatia humana, disponível 24/7 com resultados mensuráveis.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-8">
            Dados do mercado brasileiro de atendimento digital:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-destructive">70%</div>
              <div className="text-sm text-muted-foreground">dos clientes abandonam por demora</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-destructive">85%</div>
              <div className="text-sm text-muted-foreground">preferem atendimento instantâneo</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-destructive">40%</div>
              <div className="text-sm text-muted-foreground">das vendas perdidas por má comunicação</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-success">3x</div>
              <div className="text-sm text-muted-foreground">mais conversões com IA estratégica</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;