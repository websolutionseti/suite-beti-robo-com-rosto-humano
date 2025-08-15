import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Accessibility, Eye, Volume2, Palette, Timer, Type } from 'lucide-react';
import { useAccessibility } from '@/a11y/AccessibilityProvider';
import { useTranslation } from '@/hooks/useLanguage';
import { useInteractionTracker } from '@/hooks/useInteractionTracker';

const ConditionalA11yIcon = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateContrast, updateFontSize, toggleReducedMotion } = useAccessibility();
  const { t } = useTranslation();
  const { trackA11yInteraction } = useInteractionTracker();

  useEffect(() => {
    const handleScroll = () => {
      const problemSection = document.querySelector('[data-section="problem"]');
      if (problemSection) {
        const rect = problemSection.getBoundingClientRect();
        const isAtSection = rect.top <= window.innerHeight / 2 && rect.bottom >= 0;
        setIsVisible(isAtSection);
        
        // Mostrar texto "A11y" quando rolar para cima da seção
        if (rect.top > window.innerHeight / 2) {
          setShowLabel(true);
        } else {
          setShowLabel(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFontSizeToggle = () => {
    const newSize = settings.fontSize === 16 ? 18 : 16;
    updateFontSize(newSize);
    trackA11yInteraction();
  };

  const handleContrastToggle = () => {
    const newContrast = settings.contrast === 'normal' ? 'high' : 'normal';
    updateContrast(newContrast);
  };

  const handleDarkModeToggle = () => {
    const newContrast = settings.contrast === 'normal' ? 'dark' : 'normal';
    updateContrast(newContrast);
  };

  const handleReducedMotionToggle = () => {
    toggleReducedMotion();
  };

  const handleAnnouncementsToggle = () => {
    // Using existing screen reader functionality
    const event = new CustomEvent('toggle-announcements');
    window.dispatchEvent(event);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-16 right-4 z-40">
      <div className="relative flex items-center">
        {showLabel && (
          <span 
            className="mr-2 text-sm font-medium text-foreground/80 animate-fade-in"
            aria-hidden="true"
          >
            A11y
          </span>
        )}
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="shadow-lg bg-background/80 backdrop-blur-sm hover:bg-accent"
              aria-label={t('a11y.tooltip')}
            >
              <Accessibility className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('a11y.tooltip')}</p>
          </TooltipContent>
        </Tooltip>

        {isOpen && (
          <Card className="absolute top-12 right-0 w-72 p-4 shadow-xl animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Type className="w-4 h-4" />
                  <span className="text-sm">{t('a11y.fontSize')}</span>
                </div>
                <Switch
                  checked={settings.fontSize === 18}
                  onCheckedChange={handleFontSizeToggle}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">{t('a11y.contrast')}</span>
                </div>
                <Switch
                  checked={settings.contrast === 'high'}
                  onCheckedChange={handleContrastToggle}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Palette className="w-4 h-4" />
                  <span className="text-sm">{t('a11y.darkMode')}</span>
                </div>
                <Switch
                  checked={settings.contrast === 'dark'}
                  onCheckedChange={handleDarkModeToggle}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Timer className="w-4 h-4" />
                  <span className="text-sm">{t('a11y.reducedMotion')}</span>
                </div>
                <Switch
                  checked={settings.reducedMotion}
                  onCheckedChange={handleReducedMotionToggle}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4" />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-sm cursor-help">{t('a11y.announcements')}</span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>{t('a11y.announcements.help')}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Switch
                  checked={false}
                  onCheckedChange={handleAnnouncementsToggle}
                />
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ConditionalA11yIcon;