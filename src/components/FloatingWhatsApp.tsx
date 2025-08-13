import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingWhatsApp = () => {
  const whatsappUrl = "https://link.online.des.br/falecombeti";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="success"
        size="lg"
        asChild
        className="rounded-full w-16 h-16 shadow-success animate-pulse hover:animate-none hover:scale-110 transition-transform duration-300"
      >
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Conversar no WhatsApp"
        >
          <MessageCircle size={28} />
        </a>
      </Button>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-foreground text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
          Fale com a BETI
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
        </div>
      </div>
    </div>
  );
};

export default FloatingWhatsApp;