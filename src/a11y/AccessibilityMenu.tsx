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
  Plus,
  Download,
  FileText,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';
import { useAccessibility } from './AccessibilityProvider';
import { cn } from '@/lib/utils';

export const AccessibilityMenu: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateFontSize, updateContrast, toggleReducedMotion, toggleAnnouncements, resetSettings, announce } = useAccessibility();

  const handleExportToText = () => {
    try {
      // Coletar todo o texto da página
      const pageTitle = document.title;
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        .map(h => `${h.tagName}: ${h.textContent?.trim()}`);
      
      const paragraphs = Array.from(document.querySelectorAll('p'))
        .map(p => p.textContent?.trim())
        .filter(text => text && text.length > 0);
      
      const lists = Array.from(document.querySelectorAll('ul, ol'))
        .map(list => {
          const items = Array.from(list.querySelectorAll('li'))
            .map(li => `• ${li.textContent?.trim()}`);
          return items.join('\n');
        });
      
      const images = Array.from(document.querySelectorAll('img'))
        .map(img => {
          const alt = img.getAttribute('alt') || 'Imagem sem descrição';
          const src = img.getAttribute('src') || '';
          return `[IMAGEM] ${alt} (${src})`;
        });
      
      const links = Array.from(document.querySelectorAll('a[href]'))
        .map(link => {
          const text = link.textContent?.trim();
          const href = link.getAttribute('href');
          return `[LINK] ${text} (${href})`;
        });
      
      // Montar o conteúdo final
      let content = `EXPORTAÇÃO DE TEXTO - ${pageTitle}\n`;
      content += `${'='.repeat(50)}\n\n`;
      
      if (headings.length > 0) {
        content += `TÍTULOS E CABEÇALHOS:\n${'-'.repeat(20)}\n`;
        content += headings.join('\n') + '\n\n';
      }
      
      if (paragraphs.length > 0) {
        content += `CONTEÚDO DE TEXTO:\n${'-'.repeat(20)}\n`;
        content += paragraphs.join('\n\n') + '\n\n';
      }
      
      if (lists.length > 0) {
        content += `LISTAS:\n${'-'.repeat(20)}\n`;
        content += lists.join('\n\n') + '\n\n';
      }
      
      if (images.length > 0) {
        content += `IMAGENS E DESCRIÇÕES ALT:\n${'-'.repeat(30)}\n`;
        content += images.join('\n') + '\n\n';
      }
      
      if (links.length > 0) {
        content += `LINKS:\n${'-'.repeat(20)}\n`;
        content += links.join('\n') + '\n\n';
      }
      
      content += `\nExportado em: ${new Date().toLocaleString('pt-BR')}\n`;
      content += `Configurações de acessibilidade ativas:\n`;
      content += `- Tamanho da fonte: ${settings.fontSize}px\n`;
      content += `- Contraste: ${settings.contrast}\n`;
      content += `- Animações reduzidas: ${settings.reducedMotion ? 'Sim' : 'Não'}\n`;
      content += `- Anúncios habilitados: ${settings.announcements ? 'Sim' : 'Não'}\n`;
      
      // Criar e baixar arquivo
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `beti-conteudo-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      announce('Conteúdo da página exportado como arquivo de texto');
    } catch (error) {
      console.error('Erro ao exportar conteúdo:', error);
      announce('Erro ao exportar conteúdo da página');
    }
  };

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

              {/* Contrast Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Contrast size={14} className="text-muted-foreground" />
                  <span className="text-xs">Alto Contraste</span>
                </div>
                <Toggle
                  pressed={settings.contrast === 'high'}
                  onPressedChange={() => updateContrast(settings.contrast === 'high' ? 'normal' : 'high')}
                  aria-label={`Alto contraste ${settings.contrast === 'high' ? 'ativado' : 'desativado'}`}
                  className="h-6 w-10 data-[state=on]:bg-primary"
                >
                  {settings.contrast === 'high' ? (
                    <ToggleRight size={12} className="text-primary-foreground" />
                  ) : (
                    <ToggleLeft size={12} className="text-muted-foreground" />
                  )}
                </Toggle>
              </div>

              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye size={14} className="text-muted-foreground" />
                  <span className="text-xs">Modo Escuro</span>
                </div>
                <Toggle
                  pressed={settings.contrast === 'dark'}
                  onPressedChange={() => updateContrast(settings.contrast === 'dark' ? 'normal' : 'dark')}
                  aria-label={`Modo escuro ${settings.contrast === 'dark' ? 'ativado' : 'desativado'}`}
                  className="h-6 w-10 data-[state=on]:bg-primary"
                >
                  {settings.contrast === 'dark' ? (
                    <ToggleRight size={12} className="text-primary-foreground" />
                  ) : (
                    <ToggleLeft size={12} className="text-muted-foreground" />
                  )}
                </Toggle>
              </div>

              {/* Reduced Motion Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye size={14} className="text-muted-foreground" />
                  <span className="text-xs">Reduzir Animações</span>
                </div>
                <Toggle
                  pressed={settings.reducedMotion}
                  onPressedChange={toggleReducedMotion}
                  aria-label={`Animações reduzidas ${settings.reducedMotion ? 'ativadas' : 'desativadas'}`}
                  className="h-6 w-10 data-[state=on]:bg-primary"
                >
                  {settings.reducedMotion ? (
                    <ToggleRight size={12} className="text-primary-foreground" />
                  ) : (
                    <ToggleLeft size={12} className="text-muted-foreground" />
                  )}
                </Toggle>
              </div>

              {/* Announcements Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 size={14} className="text-muted-foreground" />
                  <span className="text-xs">Anúncios de Tela</span>
                </div>
                <Toggle
                  pressed={settings.announcements}
                  onPressedChange={toggleAnnouncements}
                  aria-label={`Anúncios para leitores de tela ${settings.announcements ? 'ativados' : 'desativados'}`}
                  className="h-6 w-10 data-[state=on]:bg-primary"
                >
                  {settings.announcements ? (
                    <ToggleRight size={12} className="text-primary-foreground" />
                  ) : (
                    <ToggleLeft size={12} className="text-muted-foreground" />
                  )}
                </Toggle>
              </div>

              <Separator className="my-2" />

              {/* Export Content */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExportToText}
                className="w-full justify-start gap-2 h-8 text-muted-foreground hover:text-foreground"
                aria-label="Exportar conteúdo da página como texto"
              >
                <Download size={14} />
                <span className="text-xs">Exportar Texto</span>
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