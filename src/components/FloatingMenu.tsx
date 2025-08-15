import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Accessibility, 
  Globe, 
  Languages, 
  User, 
  ExternalLink,
  Plus,
  Minus,
  Volume2,
  VolumeX,
  Eye,
  Palette,
  Timer,
  Type,
  Linkedin,
  MessageSquare,
  Facebook,
  Instagram,
  Server,
  Link2
} from 'lucide-react';
import { useAccessibility } from '@/a11y/AccessibilityProvider';
import { useLanguage, Language, useTranslation } from '@/hooks/useLanguage';
import { useInteractionTracker } from '@/hooks/useInteractionTracker';

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'main' | 'accessibility' | 'translate' | 'contacts'>('main');
  const [isAtProblemSection, setIsAtProblemSection] = useState(false);
  
  const { settings, updateFontSize, updateContrast, toggleReducedMotion, toggleAnnouncements, announce } = useAccessibility();
  const { currentLanguage, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const { trackA11yInteraction, trackTranslateInteraction } = useInteractionTracker();

  useEffect(() => {
    const handleScroll = () => {
      const problemSection = document.querySelector('[data-section="problem"]');
      if (problemSection) {
        const rect = problemSection.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight / 2 && rect.bottom >= 0;
        setIsAtProblemSection(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  const contacts = [
    {
      title: 'LinkedIn Pessoal',
      description: '/in/guilhermepuentes',
      icon: Linkedin,
      url: 'https://linkedin.com/in/guilhermepuentes',
    },
    {
      title: 'Site da Empresa',
      description: 'websolutions.eti.br',
      icon: Link2,
      url: 'https://websolutions.eti.br',
    },
    {
      title: 'WhatsApp',
      description: 'Chamar no WhatsApp',
      icon: MessageSquare,
      url: 'https://wa.me/5512992317773',
    },
    {
      title: 'LinkedIn Empresa',
      description: '/company/websolutionseti',
      icon: Linkedin,
      url: 'https://linkedin.com/company/websolutionseti',
    },
    {
      title: 'Facebook',
      description: '@websolutionseti',
      icon: Facebook,
      url: 'https://facebook.com/websolutionseti',
    },
    {
      title: 'Instagram',
      description: '@websolutionseti',
      icon: Instagram,
      url: 'https://instagram.com/websolutionseti',
    },
    {
      title: 'VPS Hostinger',
      description: 'Hospedagem Premium',
      icon: Server,
      url: 'https://hostinger.com.br',
    },
    {
      title: 'Acelerador Web Solutions',
      description: 'Plataforma de aceleração',
      icon: Link2,
      url: 'https://acelerador.websolutions.eti.br/',
      highlight: true,
    },
  ];

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    trackTranslateInteraction();
    setActiveMenu('main');
  };

  const [currentFontSize, setCurrentFontSize] = useState(18);

  const handleFontSizeChange = (increase: boolean) => {
    const savedSize = parseInt(localStorage.getItem('preferredFontSize') || '18');
    const newSize = increase ? Math.min(24, savedSize + 2) : Math.max(16, savedSize - 2);
    
    // Apply to document root for global effect
    document.documentElement.style.fontSize = `${newSize}px`;
    localStorage.setItem('preferredFontSize', newSize.toString());
    setCurrentFontSize(newSize);
    
    trackA11yInteraction();
    announce(increase ? `Fonte aumentada para ${newSize}px` : `Fonte diminuída para ${newSize}px`);
  };

  const handleAnnouncementsToggle = () => {
    const newState = !settings.announcements;
    toggleAnnouncements();
    trackA11yInteraction();
    
    const description = newState 
      ? 'Ouvir texto ativado para feedback auditivo'
      : 'Ouvir texto desativado';
    announce(description);
  };

  // Load saved font size on mount
  useEffect(() => {
    const savedSize = localStorage.getItem('preferredFontSize');
    if (savedSize) {
      document.documentElement.style.fontSize = `${savedSize}px`;
      setCurrentFontSize(parseInt(savedSize));
    }
  }, []);

  const renderMainMenu = () => (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">Menu de Recursos</h3>
      <div className="grid grid-cols-3 gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveMenu('accessibility')}
              className="h-12 flex-col gap-1 hover:bg-accent"
            >
              <Accessibility className="w-4 h-4" />
              <span className="text-xs">A11y</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Acessibilidade</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveMenu('translate')}
              className="h-12 flex-col gap-1 hover:bg-accent"
            >
              <Languages className="w-4 h-4" />
              <span className="text-xs">Idioma</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Traduzir</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveMenu('contacts')}
              className="h-12 flex-col gap-1 hover:bg-accent"
            >
              <User className="w-4 h-4" />
              <span className="text-xs">Contato</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Contatos</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );

  const renderAccessibilityMenu = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Acessibilidade</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActiveMenu('main')}
          className="h-6 w-6 p-0"
        >
          ←
        </Button>
      </div>

      {/* Font Size Controls */}
      <div className="space-y-2">
        <Label className="text-xs font-medium">Tamanho da fonte (conteúdo)</Label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFontSizeChange(false)}
            className="h-8 w-8 p-0"
          >
            <Minus className="w-3 h-3" />
          </Button>
          <span className="text-xs px-2 min-w-10 text-center font-mono">{currentFontSize}px</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFontSizeChange(true)}
            className="h-8 w-8 p-0"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Contrast Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Eye className="w-3 h-3" />
          <span className="text-xs">Alto contraste</span>
        </div>
        <Switch
          checked={settings.contrast === 'high'}
          onCheckedChange={() => {
            const newContrast = settings.contrast === 'high' ? 'normal' : 'high';
            updateContrast(newContrast);
            trackA11yInteraction();
          }}
        />
      </div>

      {/* Dark Mode */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Palette className="w-3 h-3" />
          <span className="text-xs">Modo escuro</span>
        </div>
        <Switch
          checked={settings.contrast === 'dark'}
          onCheckedChange={() => {
            const newContrast = settings.contrast === 'dark' ? 'normal' : 'dark';
            updateContrast(newContrast);
            trackA11yInteraction();
          }}
        />
      </div>

      {/* Reduced Motion */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Timer className="w-3 h-3" />
          <span className="text-xs">Reduzir animações</span>
        </div>
        <Switch
          checked={settings.reducedMotion}
          onCheckedChange={() => {
            toggleReducedMotion();
            trackA11yInteraction();
          }}
        />
      </div>

      {/* Text-to-Speech */}
      <div className="flex items-center justify-between">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-2 cursor-help">
              <Volume2 className="w-3 h-3" />
              <span className="text-xs">Ouvir texto</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Clique para ouvir o conteúdo da página</p>
          </TooltipContent>
        </Tooltip>
        <Switch
          checked={settings.announcements}
          onCheckedChange={handleAnnouncementsToggle}
        />
      </div>
    </div>
  );

  const renderTranslateMenu = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Idiomas</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActiveMenu('main')}
          className="h-6 w-6 p-0"
        >
          ←
        </Button>
      </div>

      <div className="space-y-2">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={currentLanguage === lang.code ? "default" : "ghost"}
            className="w-full justify-start text-xs h-8"
            onClick={() => handleLanguageSelect(lang.code)}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </Button>
        ))}
      </div>
    </div>
  );

  const renderContactsMenu = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Contatos</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActiveMenu('main')}
          className="h-6 w-6 p-0"
        >
          ←
        </Button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {contacts.map((contact, index) => (
          <Button
            key={index}
            variant="ghost"
            className={`w-full justify-start text-left h-auto p-2 hover:bg-secondary/50 ${
              contact.highlight ? 'ring-1 ring-primary/20 bg-primary/5' : ''
            }`}
            asChild
          >
            <a
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <contact.icon className="w-4 h-4 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate">{contact.title}</div>
                <div className="text-xs text-muted-foreground truncate">{contact.description}</div>
              </div>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          </Button>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'accessibility':
        return renderAccessibilityMenu();
      case 'translate':
        return renderTranslateMenu();
      case 'contacts':
        return renderContactsMenu();
      default:
        return renderMainMenu();
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            transition-all duration-300 shadow-lg
            ${isAtProblemSection 
              ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90' 
              : 'bg-background/80 backdrop-blur-sm hover:bg-accent'
            }
          `}
          title="Menu de recursos"
        >
          <Globe className="w-4 h-4 mr-1" />
          <Accessibility className="w-4 h-4 mr-1" />
          <User className="w-4 h-4" />
        </Button>

        {isOpen && (
          <Card className="absolute top-12 right-0 w-64 p-4 shadow-xl animate-fade-in bg-background border z-10">
            {renderContent()}
          </Card>
        )}
      </div>
    </div>
  );
};

export default FloatingMenu;