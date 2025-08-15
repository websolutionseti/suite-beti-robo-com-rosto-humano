import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Crown } from "lucide-react";
import { useInteractionTracker } from "@/hooks/useInteractionTracker";

const PricingSection = () => {
  const { trackPricingInteraction } = useInteractionTracker();
  
  const plans = [
    {
      name: "MEI",
      icon: <Star className="text-primary" size={24} />,
      price: "R$ 1.500 - R$ 5.000",
      roi: "ROI: 3-6 meses",
      description: "Ideal para microempreendedores e pequenos negócios",
      features: [
        "Site institucional responsivo",
        "Chatbot básico no WhatsApp",
        "Integração com redes sociais",
        "SEO otimizado",
        "Suporte por 3 meses"
      ],
      highlight: false
    },
    {
      name: "Pequena Empresa",
      icon: <Zap className="text-primary" size={24} />,
      price: "R$ 5.000 - R$ 15.000",
      roi: "ROI: 2-4 meses",
      description: "Perfeito para empresas em crescimento",
      features: [
        "Sistema web personalizado",
        "Automações inteligentes",
        "Bot multicanal (WhatsApp, Instagram, site)",
        "Integrações com APIs + dashboard",
        "Suporte por 6 meses",
        "Relatórios de performance"
      ],
      highlight: true
    },
    {
      name: "Empresa Média",
      icon: <Crown className="text-primary" size={24} />,
      price: "R$ 15.000 - R$ 50.000+",
      roi: "ROI: 1-3 meses",
      description: "Solução completa para empresas consolidadas",
      features: [
        "Plataforma escalável + automações complexas",
        "IA, ML e inferência de dados",
        "Monitoramento 24/7",
        "Suporte dedicado",
        "Integrações personalizadas",
        "Consultoria estratégica",
        "SLA garantido"
      ],
      highlight: false
    }
  ];

  const whatsappSDR = "https://wa.me/5512992317773?text=Ol%C3%A1%2C%20quero%20solicitar%20uma%20apresenta%C3%A7%C3%A3o%20da%20Su%C3%ADte%20BETI";

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star size={16} />
            Faixas de Investimento
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Escolha o plano ideal para{" "}
            <span className="text-gradient">seu negócio</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Investimento inteligente com retorno garantido. Todos os planos incluem tecnologia nacional e suporte especializado.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-medium ${
                plan.highlight 
                  ? 'border-primary bg-primary/5 shadow-medium scale-105' 
                  : 'border-border gradient-card hover:border-primary/30'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold">
                    ⭐ MAIS POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  {plan.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                
                <div className="mb-2">
                  <span className="text-3xl font-bold text-primary">{plan.price}</span>
                </div>
                <div className="text-sm font-medium text-success">{plan.roi}</div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <Check size={20} className="text-success flex-shrink-0" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.highlight ? "hero" : "cta"}
                size="lg" 
                className="w-full"
                asChild
              >
                <a href={whatsappSDR} target="_blank" rel="noopener noreferrer" onClick={trackPricingInteraction}>
                  Solicitar Apresentação
                </a>
              </Button>
            </div>
          ))}
        </div>

        {/* Payment options */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold text-foreground mb-6">
            💳 Formas de Pagamento
          </h3>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                ⚡
              </div>
              <span>PIX com desconto</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                💳
              </div>
              <span>Cartão até 12x</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                📊
              </div>
              <span>Parcelamento personalizado</span>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-12 p-6 gradient-card rounded-lg border border-success/20 text-center">
          <h3 className="text-lg font-bold text-success mb-2">
            🛡️ Garantia de Resultados
          </h3>
          <p className="text-muted-foreground text-sm">
            Se você não ver resultados mensuráveis em 90 dias, ajustamos a estratégia sem custo adicional.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;