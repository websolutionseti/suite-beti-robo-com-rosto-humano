import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type Language = 'pt-BR' | 'en' | 'es';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations - seguindo o briefing técnico
const translations = {
  'pt-BR': {
    'hero.title': 'Transforme Visitantes em Clientes com BETI',
    'hero.subtitle': 'Chatbot com Rosto Humano para Vendas Automatizadas',
    'problem.title': 'O Problema Real dos Negócios',
    'solution.title': 'Nossa Solução',
    'benefits.title': 'Benefícios',
    'pricing.title': 'Preços',
    'cta.title': 'Comece Agora',
    'translate.tooltip': 'Selecionar idioma',
    'a11y.tooltip': 'Opções de acessibilidade',
    'a11y.fontSize': 'Aumentar fonte para 18px',
    'a11y.contrast': 'Alto contraste',
    'a11y.darkMode': 'Modo escuro',
    'a11y.reducedMotion': 'Reduzir animações',
    'a11y.announcements': 'Anúncios de tela',
    'a11y.announcements.help': 'Ativa narração automática para usuários com deficiência visual',
    'export.email.placeholder': 'Digite seu email para exportar',
    'export.button': 'Exportar Página'
  },
  'en': {
    'hero.title': 'Turn Visitors into Customers with BETI',
    'hero.subtitle': 'Human-Faced Chatbot for Automated Sales',
    'problem.title': 'The Real Business Problem',
    'solution.title': 'Our Solution',
    'benefits.title': 'Benefits',
    'pricing.title': 'Pricing',
    'cta.title': 'Get Started',
    'translate.tooltip': 'Select language',
    'a11y.tooltip': 'Accessibility options',
    'a11y.fontSize': 'Increase font to 18px',
    'a11y.contrast': 'High contrast',
    'a11y.darkMode': 'Dark mode',
    'a11y.reducedMotion': 'Reduce animations',
    'a11y.announcements': 'Screen announcements',
    'a11y.announcements.help': 'Enables automatic narration for visually impaired users',
    'export.email.placeholder': 'Enter your email to export',
    'export.button': 'Export Page'
  },
  'es': {
    'hero.title': 'Convierte Visitantes en Clientes con BETI',
    'hero.subtitle': 'Chatbot con Rostro Humano para Ventas Automatizadas',
    'problem.title': 'El Problema Real de los Negocios',
    'solution.title': 'Nuestra Solución',
    'benefits.title': 'Beneficios',
    'pricing.title': 'Precios',
    'cta.title': 'Comenzar Ahora',
    'translate.tooltip': 'Seleccionar idioma',
    'a11y.tooltip': 'Opciones de accesibilidad',
    'a11y.fontSize': 'Aumentar fuente a 18px',
    'a11y.contrast': 'Alto contraste',
    'a11y.darkMode': 'Modo oscuro',
    'a11y.reducedMotion': 'Reducir animaciones',
    'a11y.announcements': 'Anuncios de pantalla',
    'a11y.announcements.help': 'Activa narración automática para usuarios con discapacidad visual',
    'export.email.placeholder': 'Ingresa tu email para exportar',
    'export.button': 'Exportar Página'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('pt-BR');

  const setLanguage = useCallback((lang: Language) => {
    setCurrentLanguage(lang);
    document.documentElement.lang = lang;
  }, []);

  const value = {
    currentLanguage,
    setLanguage,
    translations: translations[currentLanguage]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useTranslation = () => {
  const { translations } = useLanguage();
  
  const t = useCallback((key: string): string => {
    return translations[key] || key;
  }, [translations]);

  return { t };
};