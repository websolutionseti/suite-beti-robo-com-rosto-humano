import { useState, useCallback, useEffect } from 'react';
import { useConditionalExport } from './useConditionalExport';

export const useInteractionTracker = () => {
  const { markInteraction } = useConditionalExport();

  // Rastrear interações nos componentes
  const trackTranslateInteraction = useCallback(() => {
    markInteraction('hasInteractedWithTranslate');
  }, [markInteraction]);

  const trackA11yInteraction = useCallback(() => {
    markInteraction('hasInteractedWithA11y');
  }, [markInteraction]);

  const trackWhatsAppInteraction = useCallback(() => {
    markInteraction('hasInteractedWithWhatsApp');
  }, [markInteraction]);

  const trackPricingInteraction = useCallback(() => {
    markInteraction('hasInteractedWithPricing');
  }, [markInteraction]);

  // Rastrear scroll até o footer
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
          markInteraction('hasScrolledToFooter');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [markInteraction]);

  return {
    trackTranslateInteraction,
    trackA11yInteraction,
    trackWhatsAppInteraction,
    trackPricingInteraction
  };
};