import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Languages, Globe } from 'lucide-react';
import { useLanguage, Language, useTranslation } from '@/hooks/useLanguage';
import { useInteractionTracker } from '@/hooks/useInteractionTracker';

const TranslateIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAtProblemSection, setIsAtProblemSection] = useState(false);
  const { currentLanguage, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const { trackTranslateInteraction } = useInteractionTracker();

  // Comportamento especial: mudar cor quando chegar na seção "problema"
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

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
    trackTranslateInteraction();
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
          title={t('translate.tooltip')}
        >
          <Globe className="w-4 h-4 mr-2" />
          <Languages className="w-4 h-4" />
        </Button>

        {isOpen && (
          <Card className="absolute top-12 right-0 w-48 p-2 shadow-xl animate-fade-in">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={currentLanguage === lang.code ? "default" : "ghost"}
                className="w-full justify-start mb-1 last:mb-0"
                onClick={() => handleLanguageSelect(lang.code)}
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </Button>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
};

export default TranslateIcon;