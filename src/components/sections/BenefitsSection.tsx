import { TrendingUp, DollarSign, Users, Heart, BarChart3, Zap } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <TrendingUp className="text-success" size={24} />,
      benefit: "Aumento de produtividade",
      impact: "Atendimentos simultâneos sem sobrecarga",
      metric: "+300% eficiência"
    },
    {
      icon: <DollarSign className="text-success" size={24} />,
      benefit: "Redução de custos",
      impact: "Menos retrabalho e equipe enxuta",
      metric: "-60% custos operacionais"
    },
    {
      icon: <Users className="text-success" size={24} />,
      benefit: "Mais conversões",
      impact: "Atendimento guiado, sem perder o timing",
      metric: "+150% taxa de conversão"
    },
    {
      icon: <Heart className="text-success" size={24} />,
      benefit: "Atendimento humanizado",
      impact: "Linguagem clara e UX Writing estratégico",
      metric: "95% satisfação"
    },
    {
      icon: <BarChart3 className="text-success" size={24} />,
      benefit: "Controle e melhoria contínua",
      impact: "Dados para evoluir fluxos e estratégias",
      metric: "100% rastreabilidade"
    },
    {
      icon: <Zap className="text-success" size={24} />,
      benefit: "Resposta instantânea",
      impact: "Zero tempo de espera para seus clientes",
      metric: "<2s tempo resposta"
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp size={16} />
            Resultados Comprovados
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Benefícios que transformam{" "}
            <span className="text-gradient">seu negócio</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada funcionalidade da BETI foi pensada para gerar impacto real e mensurável no seu negócio.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="grid gap-6">
              {/* Header */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-primary/5 rounded-lg border border-primary/20">
                <div className="md:col-span-1">
                  <h3 className="font-bold text-primary text-lg">Benefício</h3>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-bold text-primary text-lg">Impacto Real</h3>
                </div>
                <div className="md:col-span-1">
                  <h3 className="font-bold text-primary text-lg">Métrica</h3>
                </div>
              </div>

              {/* Benefits rows */}
              {benefits.map((item, index) => (
                <div 
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 gradient-card rounded-lg border border-border/50 hover:shadow-medium transition-all duration-300"
                >
                  <div className="md:col-span-1 flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="font-medium text-foreground">{item.benefit}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-muted-foreground">{item.impact}</span>
                  </div>
                  <div className="md:col-span-1">
                    <span className="font-bold text-success text-lg">{item.metric}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="mt-16 p-8 gradient-card rounded-lg border border-success/20 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            💰 Calculadora de ROI
          </h3>
          <p className="text-muted-foreground mb-6">
            Em média, nossos clientes recuperam o investimento em:
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">MEI</div>
              <div className="text-sm text-muted-foreground">3-6 meses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">Pequena</div>
              <div className="text-sm text-muted-foreground">2-4 meses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">Média</div>
              <div className="text-sm text-muted-foreground">1-3 meses</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;