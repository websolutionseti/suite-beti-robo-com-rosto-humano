import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Phone } from "lucide-react";

const CtaSection = () => {
  const whatsappCCO = "https://wa.me/5512991528871?text=Ol%C3%A1%2C%20quero%20conhecer%20mais%20sobre%20a%20Su%C3%ADte%20BETI%20e%20fechar%20neg%C3%B3cio%20com%20o%20CCO";
  const whatsappDemo = "https://wa.me/5512992317773?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20demonstra%C3%A7%C3%A3o%20da%20Su%C3%ADte%20BETI";

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary-glow to-accent relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Pronto para transformar seu{" "}
            <span className="text-white/90">atendimento?</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Com a BETI, você não instala um robô. Você ganha uma equipe digital.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="success" 
              size="lg"
              asChild
              className="text-lg px-8 py-4 h-auto"
            >
              <a href={whatsappCCO} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2" />
                Fale com a BETI agora
              </a>
            </Button>
            
            <Button 
              variant="outline-white" 
              size="lg"
              className="text-lg px-8 py-4 h-auto"
              asChild
            >
              <a href={whatsappDemo} target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2" />
                Solicitar Demonstração
              </a>
            </Button>
          </div>

          {/* Trust signals */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-success-glow mb-2">+300%</div>
              <div className="text-sm text-white/80">Aumento de eficiência</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-success-glow mb-2">24/7</div>
              <div className="text-sm text-white/80">Suporte dedicado</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-success-glow mb-2">ROI</div>
              <div className="text-sm text-white/80">Garantido em 90 dias</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;