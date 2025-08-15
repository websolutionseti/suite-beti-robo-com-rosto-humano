import { useState, useCallback } from 'react';

interface ConditionalExportState {
  hasInteractedWithTranslate: boolean;
  hasInteractedWithA11y: boolean;
  hasInteractedWithWhatsApp: boolean;
  hasInteractedWithPricing: boolean;
  hasScrolledToFooter: boolean;
}

export const useConditionalExport = () => {
  const [interactions, setInteractions] = useState<ConditionalExportState>({
    hasInteractedWithTranslate: false,
    hasInteractedWithA11y: false,
    hasInteractedWithWhatsApp: false,
    hasInteractedWithPricing: false,
    hasScrolledToFooter: false,
  });

  const [email, setEmail] = useState('');

  const markInteraction = useCallback((type: keyof ConditionalExportState) => {
    setInteractions(prev => ({
      ...prev,
      [type]: true
    }));
  }, []);

  const allInteractionsComplete = Object.values(interactions).every(Boolean);

  const generateExportCode = useCallback((email: string): string => {
    const emailParts = email.split('@');
    if (emailParts.length !== 2) return '';

    const username = emailParts[0];
    const domain = emailParts[1];
    
    // Extrair primeiras 4 letras do username
    const firstFourLetters = username.substring(0, 4);
    
    // Extrair domínio principal (remover subdomínios)
    const domainParts = domain.split('.');
    const mainDomain = domainParts.length > 2 
      ? domainParts.slice(-2).join('.')  // pegar últimos 2 (ex: eti.br)
      : domain;                           // ou o domínio inteiro
    
    // Gerar data no formato DDMMAA
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    const dateString = `${day}${month}${year}`;
    
    return `${firstFourLetters}${dateString}.${mainDomain}`;
  }, []);

  const exportPageContent = useCallback(async (userEmail: string) => {
    if (!allInteractionsComplete || !userEmail) return null;

    const exportCode = generateExportCode(userEmail);
    
    // Coletar conteúdo da página
    const pageContent = {
      title: document.title,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      userEmail,
      exportCode,
      sections: {
        hero: document.querySelector('[data-section="hero"]')?.textContent || '',
        problem: document.querySelector('[data-section="problem"]')?.textContent || '',
        solution: document.querySelector('[data-section="solution"]')?.textContent || '',
        benefits: document.querySelector('[data-section="benefits"]')?.textContent || '',
        pricing: document.querySelector('[data-section="pricing"]')?.textContent || '',
        cta: document.querySelector('[data-section="cta"]')?.textContent || '',
      },
      interactions: {
        completedAt: new Date().toISOString(),
        details: interactions
      }
    };

    // Gerar arquivo de texto para download
    const content = `
BETI - Exportação de Página
===========================

Código de Exportação: ${exportCode}
Email: ${userEmail}
Data/Hora: ${new Date().toLocaleString('pt-BR')}
URL: ${window.location.href}

CONTEÚDO DA PÁGINA:
-------------------

${Object.entries(pageContent.sections)
  .map(([section, content]) => `${section.toUpperCase()}:\n${content}\n`)
  .join('\n')
}

INTERAÇÕES COMPLETAS:
--------------------
- Tradução: ${interactions.hasInteractedWithTranslate ? 'Sim' : 'Não'}
- Acessibilidade: ${interactions.hasInteractedWithA11y ? 'Sim' : 'Não'}
- WhatsApp: ${interactions.hasInteractedWithWhatsApp ? 'Sim' : 'Não'}
- Preços: ${interactions.hasInteractedWithPricing ? 'Sim' : 'Não'}
- Rodapé: ${interactions.hasScrolledToFooter ? 'Sim' : 'Não'}

Arquivo gerado automaticamente pelo sistema BETI
    `.trim();

    // Download do arquivo
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `beti-export-${exportCode}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return {
      exportCode,
      content: pageContent,
      downloadCompleted: true
    };
  }, [allInteractionsComplete, generateExportCode, interactions]);

  return {
    interactions,
    markInteraction,
    allInteractionsComplete,
    email,
    setEmail,
    exportPageContent,
    generateExportCode
  };
};