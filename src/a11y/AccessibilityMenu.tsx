import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  AccessibilityIcon, 
  Eye, 
  Type, 
  Contrast, 
  Volume2, 
  RotateCcw,
  ChevronUp,
  ChevronDown,
  Minus,
  Plus
} from 'lucide-react';
import { useAccessibility } from './AccessibilityProvider';
import { cn } from '@/lib/utils';

export const AccessibilityMenu: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateFontSize, updateContrast, toggleReducedMotion, toggleAnnouncements, resetSettings, announce } = useAccessibility();

  useEffect(() => {
    const handleScroll = () => {
      const solutionSection = document.getElementById('solution');
      if (solutionSection) {
        const rect = solutionSection.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsVisible(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    announce(isOpen ? 'Menu de acessibilidade fechado' : 'Menu de acessibilidade aberto');
  };

  const handleFontSizeChange = (increment: boolean) => {
    const newSize = settings.fontSize + (increment ? 2 : -2);
    updateFontSize(newSize);
    announce(`Tamanho da fonte: ${newSize}px`);
  };

  const handleContrastChange = () => {
    const contrasts: Array<typeof settings.contrast> = ['normal', 'high', 'dark'];
    const currentIndex = contrasts.indexOf(settings.contrast);
    const nextContrast = contrasts[(currentIndex + 1) % contrasts.length];
    updateContrast(nextContrast);
    
    const contrastLabels = {
      normal: 'Normal',
      high: 'Alto contraste',
      dark: 'Modo escuro'
    };
    announce(`Contraste alterado para: ${contrastLabels[nextContrast]}`);
  };

  const handleReducedMotionToggle = () => {
    toggleReducedMotion();
    announce(settings.reducedMotion ? 'Animações habilitadas' : 'Animações reduzidas');
  };

  const handleAnnouncementsToggle = () => {
    toggleAnnouncements();
    announce(settings.announcements ? 'Anúncios desabilitados' : 'Anúncios habilitados');
  };

  const handleReset = () => {
    resetSettings();
    announce('Configurações de acessibilidade restauradas');
  };

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "fixed top-4 right-4 z-50 transition-all duration-300",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}
      role="complementary"
      aria-label="Menu de acessibilidade"
    >
      <Card className="bg-background/95 backdrop-blur-sm border shadow-lg">
        <div className="p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggle}
            aria-expanded={isOpen}
            aria-controls="accessibility-controls"
            className="w-full justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <AccessibilityIcon size={16} className="text-primary" />
              <span className="text-sm font-medium">Acessibilidade</span>
            </div>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>

          {isOpen && (
            <div 
              id="accessibility-controls"
              className="mt-2 space-y-2 border-t pt-2"
              role="group"
              aria-label="Controles de acessibilidade"
            >
              {/* Font Size */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Type size={14} className="text-muted-foreground" />
                  <span className="text-xs">Fonte</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFontSizeChange(false)}
                    disabled={settings.fontSize <= 12}
                    aria-label="Diminuir fonte"
                    className="h-6 w-6 p-0"
                  >
                    <Minus size={12} />
                  </Button>
                  <span className="text-xs w-8 text-center">{settings.fontSize}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFontSizeChange(true)}
                    disabled={settings.fontSize >= 24}
                    aria-label="Aumentar fonte"
                    className="h-6 w-6 p-0"
                  >
                    <Plus size={12} />
                  </Button>
                </div>
              </div>

              {/* Contrast */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleContrastChange}
                className="w-full justify-start gap-2 h-8"
                aria-label={`Contraste atual: ${settings.contrast}`}
              >
                <Contrast size={14} className="text-muted-foreground" />
                <span className="text-xs">Contraste</span>
              </Button>

              {/* Reduced Motion */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReducedMotionToggle}
                className="w-full justify-start gap-2 h-8"
                aria-pressed={settings.reducedMotion}
              >
                <Eye size={14} className="text-muted-foreground" />
                <span className="text-xs">
                  {settings.reducedMotion ? 'Habilitar' : 'Reduzir'} animações
                </span>
              </Button>

              {/* Announcements */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAnnouncementsToggle}
                className="w-full justify-start gap-2 h-8"
                aria-pressed={settings.announcements}
              >
                <Volume2 size={14} className="text-muted-foreground" />
                <span className="text-xs">
                  {settings.announcements ? 'Desabilitar' : 'Habilitar'} anúncios
                </span>
              </Button>

              {/* Reset */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="w-full justify-start gap-2 h-8 text-muted-foreground hover:text-foreground"
              >
                <RotateCcw size={14} />
                <span className="text-xs">Restaurar</span>
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};