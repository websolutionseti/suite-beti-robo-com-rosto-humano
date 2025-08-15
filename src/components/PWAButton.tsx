import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Smartphone } from 'lucide-react';
import { useTranslation } from '@/hooks/useLanguage';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Verificar se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsVisible(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    
    setDeferredPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button
        onClick={handleInstallClick}
        className="shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
        size="sm"
      >
        <div className="flex items-center space-x-2">
          <img 
            src="/pwa-icon.png" 
            alt="BETI" 
            className="w-5 h-5 rounded"
            onError={(e) => {
              // Fallback para ícone lucide se a imagem não carregar
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextSibling as HTMLElement;
              if (fallback) fallback.style.display = 'inline';
            }}
          />
          <Smartphone className="w-4 h-4" style={{ display: 'none' }} />
          <span className="text-sm">Instalar App</span>
          <Download className="w-4 h-4" />
        </div>
      </Button>
    </div>
  );
};

export default PWAButton;