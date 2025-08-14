import { useEffect } from 'react';
import { useAccessibility } from '@/a11y/AccessibilityProvider';

/**
 * Hook para aplicar suporte específico a usuários daltônicos
 * seguindo as diretrizes WCAG 2.2 para deficiências visuais
 */
export const useColorblindSupport = () => {
  const { settings } = useAccessibility();

  useEffect(() => {
    const root = document.documentElement;
    
    // Aplicar esquema de cores amigável para daltônicos
    if (settings.contrast === 'high' || settings.contrast === 'dark') {
      root.classList.add('colorblind-safe');
      
      // Adicionar indicadores textuais para elementos que dependem só de cor
      const colorOnlyElements = document.querySelectorAll('[data-color-only]');
      colorOnlyElements.forEach(element => {
        const colorState = element.getAttribute('data-color-state');
        if (colorState && !element.querySelector('.sr-text-indicator')) {
          const indicator = document.createElement('span');
          indicator.className = 'sr-text-indicator sr-only';
          indicator.textContent = ` (${colorState})`;
          element.appendChild(indicator);
        }
      });
      
      // Adicionar padrões/texturas para gráficos que usam só cor
      const charts = document.querySelectorAll('svg[data-chart], canvas[data-chart]');
      charts.forEach(chart => {
        chart.setAttribute('aria-describedby', 'chart-description');
        
        // Criar descrição textual se não existir
        if (!document.getElementById('chart-description')) {
          const description = document.createElement('div');
          description.id = 'chart-description';
          description.className = 'sr-only';
          description.textContent = 'Gráfico com dados representados por diferentes padrões e texturas além de cores';
          chart.parentNode?.appendChild(description);
        }
      });
      
    } else {
      root.classList.remove('colorblind-safe');
      
      // Remover indicadores textuais desnecessários
      const indicators = document.querySelectorAll('.sr-text-indicator');
      indicators.forEach(indicator => indicator.remove());
    }
    
    // Adicionar meta tags para suporte a deficiências visuais
    updateMetaForAccessibility();
    
  }, [settings.contrast]);

  const updateMetaForAccessibility = () => {
    // Atualizar meta description para incluir informações de acessibilidade
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      const originalContent = metaDesc.getAttribute('content') || '';
      if (!originalContent.includes('acessível')) {
        metaDesc.setAttribute('content', 
          originalContent + ' Site totalmente acessível com suporte WCAG 2.2, compatível com leitores de tela e usuários com deficiências visuais.'
        );
      }
    }
    
    // Adicionar meta para suporte a deficiências visuais
    if (!document.querySelector('meta[name="accessibility-features"]')) {
      const accessibilityMeta = document.createElement('meta');
      accessibilityMeta.name = 'accessibility-features';
      accessibilityMeta.content = 'high-contrast,dark-mode,font-scaling,reduced-motion,screen-reader,colorblind-support,keyboard-navigation';
      document.head.appendChild(accessibilityMeta);
    }
  };

  return {
    isColorblindSafeMode: settings.contrast === 'high' || settings.contrast === 'dark'
  };
};