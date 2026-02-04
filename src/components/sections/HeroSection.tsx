import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, BarChart3, FileText } from "lucide-react";
import betiHero from "@/imagem/beti-hero.webp";
const HeroSection = () => {
  const whatsappUrl = "https://wa.me/5512991528871?text=Ol%C3%A1%2C%20quero%20conhecer%20a%20Su%C3%ADte%20BETI%20e%20falar%20com%20o%20CCO";
  const briefingUrl = "https://websolutions.eti.br/briefing";
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-glow to-accent">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left text-white space-y-8 animate-slide-in-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Suíte BETI
                <span className="block animate-glow text-amber-300">
                  Atendimento Inteligente
                </span>
                <span className="block text-lg md:text-xl font-normal text-white/90">
                  com Rosto Humano
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
                Automação estratégica com empatia, tecnologia e resultados mensuráveis.
              </p>
            </div>

            {/* Metrics */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-success-glow">+150%</div>
                <div className="text-sm text-white/80">Conversões</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-success-glow">-50%</div>
                <div className="text-sm text-white/80">Custos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-success-glow">24/7</div>
                <div className="text-sm text-white/80">Disponível</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="success" size="lg" asChild className="text-lg px-8 py-4 h-auto">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2" />
                  Fale com a BETI agora
                </a>
              </Button>
              
              <Button variant="outline-white" size="lg" className="text-lg px-8 py-4 h-auto" onClick={() => document.getElementById('benefits')?.scrollIntoView({
              behavior: 'smooth'
            })}>
                Ver como funciona
                <ArrowRight className="ml-2" />
              </Button>
              
              <Button variant="outline-white" size="lg" asChild className="text-lg px-8 py-4 h-auto">
                <a href={briefingUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2" />
                  Briefing Gratuito
                </a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start text-sm text-white/70">
              <div className="flex items-center gap-1">
                <BarChart3 size={16} />
                ROI em até 3 meses
              </div>
              <div>•</div>
              <div>Tecnologia nacional</div>
              <div>•</div>
              <div>Suporte dedicado</div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-in-right">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img 
              src={betiHero} 
              alt="BETI - Chatbot inteligente com IA para automação de atendimento WhatsApp que aumenta vendas em 150% e reduz custos em 50% com empatia humana 24 horas por dia" 
              className="w-full h-auto animate-float"
              loading="eager"
              width="600"
              height="400"
            />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-success gradient-card p-4 rounded-lg shadow-success animate-float" style={{
            animationDelay: '2s'
          }}>
              <div className="text-sm font-medium text-success-foreground">
                +25% conversão
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white gradient-card p-4 rounded-lg shadow-medium animate-float" style={{
            animationDelay: '4s'
          }}>
              <div className="text-sm font-medium text-foreground">
                Atendimento humanizado
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;