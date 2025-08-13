import { Brain, Clock, Target, BarChart, Zap, Heart } from "lucide-react";

const SolutionSection = () => {
  const features = [
    {
      icon: <Clock size={24} />,
      title: "Atende 24/7",
      description: "Disponibilidade total com empatia e contexto personalizado"
    },
    {
      icon: <Target size={24} />,
      title: "SPIN Selling",
      description: "Metodologia estratégica para qualificar leads efetivamente"
    },
    {
      icon: <Brain size={24} />,
      title: "Scripts Adaptativos",
      description: "Personalização automática baseada no perfil do cliente"
    },
    {
      icon: <Zap size={24} />,
      title: "Integração Total",
      description: "CRM, e-commerce, redes sociais e landing pages conectados"
    },
    {
      icon: <BarChart size={24} />,
      title: "Dados Inteligentes",
      description: "Transforma interações em insights e decisões estratégicas"
    },
    {
      icon: <Heart size={24} />,
      title: "Empatia Digital",
      description: "Tecnologia com toque humano e linguagem natural"
    }
  ];

  return (
    <section id="solution" className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Brain size={16} />
            A Solução Inteligente
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            A BETI é uma{" "}
            <span className="text-gradient">agente digital estratégica</span>
            {" "}que revoluciona seu atendimento
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mais que um chatbot: uma solução completa que combina inteligência artificial 
            com estratégias comerciais comprovadas para maximizar seus resultados.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="gradient-card p-6 rounded-lg shadow-soft border border-border/50 hover:shadow-medium transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Process Flow */}
        <div className="relative">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Como a BETI transforma seu negócio
            </h3>
            <p className="text-muted-foreground">
              Um processo estratégico em 4 etapas para resultados garantidos
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary-glow to-success transform translate-y-6"></div>
            
            {[
              { step: "01", title: "Análise", desc: "Mapeamos seu negócio e clientes" },
              { step: "02", title: "Configuração", desc: "Personalizamos scripts e fluxos" },
              { step: "03", title: "Integração", desc: "Conectamos todos os sistemas" },
              { step: "04", title: "Otimização", desc: "Ajustamos com base em dados reais" }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary gradient-hero rounded-full flex items-center justify-center text-white font-bold text-lg shadow-glow relative z-10">
                  {item.step}
                </div>
                <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;