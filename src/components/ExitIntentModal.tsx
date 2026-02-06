import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, Gift, Users } from "lucide-react";

const ExitIntentModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Increment and get visitor count
    const storedCount = localStorage.getItem('beti_visitor_count');
    const currentCount = storedCount ? parseInt(storedCount, 10) + 1 : 1;
    localStorage.setItem('beti_visitor_count', currentCount.toString());
    setVisitorCount(currentCount);

    // Track unique session
    const sessionKey = 'beti_session_' + new Date().toDateString();
    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, 'true');
    }
  }, []);

  useEffect(() => {
    // Check if modal was already shown this session
    const exitShown = sessionStorage.getItem('beti_exit_shown');
    if (exitShown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from top of viewport
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem('beti_exit_shown', 'true');
      }
    };

    // Add delay before enabling exit intent (5 seconds)
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const whatsappUrl = "https://wa.me/5512991528871?text=Ol%C3%A1%2C%20quero%20conhecer%20a%20Su%C3%ADte%20BETI%20e%20falar%20com%20o%20CCO";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md bg-gradient-to-br from-slate-900 to-slate-800 border-primary/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white flex items-center justify-center gap-2">
            <Gift className="w-6 h-6 text-success" />
            Espere! Não vá embora ainda
          </DialogTitle>
          <DialogDescription className="text-center text-white/80 pt-2">
            Você está entre os <span className="font-bold text-success">{visitorCount.toLocaleString('pt-BR')}</span> visitantes
            que descobriram a BETI!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
            <Users className="w-8 h-8 text-primary-glow" />
            <div>
              <p className="font-semibold text-white">Empresas já automatizaram</p>
              <p className="text-sm text-white/70">Mais de 150% de aumento em conversões</p>
            </div>
          </div>

          <p className="text-center text-white/90">
            Agende uma <span className="text-success font-semibold">demonstração gratuita</span> e descubra como a BETI pode transformar seu atendimento!
          </p>

          <div className="flex flex-col gap-3">
            <Button 
              variant="success" 
              size="lg" 
              className="w-full"
              asChild
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 w-5 h-5" />
                Quero Minha Demonstração Grátis
              </a>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white/60 hover:text-white hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              Talvez depois
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentModal;
