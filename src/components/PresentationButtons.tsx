import { Button } from "@/components/ui/button";
import { ExternalLink, MessageCircle } from "lucide-react";
import { useInteractionTracker } from "@/hooks/useInteractionTracker";

const PresentationButtons = () => {
  const { trackPricingInteraction } = useInteractionTracker();

  const presentations = [
    {
      id: "mei",
      title: "Suíte BETI MEI",
      description: "Para microempreendedores e pequenos negócios",
      link: "https://link.online.des.br/suite-mei",
      message: "Olá, gostaria de solicitar uma apresentação da Suíte BETI MEI para microempreendedores. Tenho interesse em conhecer as soluções de automação e digitalização para meu negócio.",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "pe", 
      title: "Suíte BETI PE",
      description: "Para pequenas empresas em crescimento",
      link: "https://link.online.des.br/suite-pe",
      message: "Olá, gostaria de solicitar uma apresentação da Suíte BETI PE para pequenas empresas. Busco soluções avançadas de automação e integração para otimizar meus processos.",
      color: "from-green-500 to-green-600"
    },
    {
      id: "em",
      title: "Suíte BETI EM", 
      description: "Para empresas médias consolidadas",
      link: "https://link.online.des.br/suite-em",
      message: "Olá, gostaria de solicitar uma apresentação da Suíte BETI EM para empresas médias. Preciso de uma solução escalável com IA, ML e suporte dedicado para minha organização.",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const handlePresentationClick = (presentation: typeof presentations[0]) => {
    trackPricingInteraction();
    
    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(presentation.message);
    const whatsappUrl = `https://wa.me/5512992317773?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          📋 Solicitar Apresentação Personalizada
        </h3>
        <p className="text-muted-foreground">
          Escolha a apresentação ideal para o porte da sua empresa
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {presentations.map((presentation) => (
          <div
            key={presentation.id}
            className="group relative overflow-hidden rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300"
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${presentation.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
            
            <div className="relative p-6 text-center">
              <div className="mb-4">
                <MessageCircle className="w-12 h-12 mx-auto text-primary mb-2" />
              </div>
              
              <h4 className="text-xl font-bold text-foreground mb-2">
                {presentation.title}
              </h4>
              
              <p className="text-sm text-muted-foreground mb-6">
                {presentation.description}
              </p>

              <Button
                onClick={() => handlePresentationClick(presentation)}
                variant="cta"
                size="lg"
                className="w-full group-hover:scale-105 transition-transform duration-200"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Solicitar Apresentação
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              
              <div className="mt-3 text-xs text-muted-foreground">
                Abre WhatsApp com mensagem pré-preenchida
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Signals */}
      <div className="mt-8 text-center">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-success rounded-full"></span>
            Resposta em até 2 horas
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Apresentação personalizada
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            Sem compromisso
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationButtons;