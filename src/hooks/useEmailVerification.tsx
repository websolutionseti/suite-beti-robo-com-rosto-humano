import { useState, useCallback } from 'react';

interface EmailVerificationState {
  email: string;
  verificationCode: string;
  isVerified: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useEmailVerification = () => {
  const [state, setState] = useState<EmailVerificationState>({
    email: '',
    verificationCode: '',
    isVerified: false,
    isLoading: false,
    error: null,
  });

  const generateCode = useCallback((email: string): string => {
    // Extrair partes do e-mail
    const [localPart, domain] = email.split('@');
    
    // Primeiras 4 letras do local (lowercase)
    const first4 = localPart.slice(0, 4).toLowerCase();
    
    // Data atual no formato ddmmaa
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    const dateStr = `${day}${month}${year}`;
    
    // Sufixo do domínio
    const domainParts = domain.split('.');
    let domainSuffix: string;
    
    if (domainParts.length >= 2) {
      // Usar os 2 últimos labels
      domainSuffix = domainParts.slice(-2).join('.');
    } else {
      // Usar o único label
      domainSuffix = domainParts[0];
    }
    
    return `${first4}${dateStr}.${domainSuffix}`;
  }, []);

  const verifyEmail = useCallback((email: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    // Validação básica de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'E-mail inválido. Verifique o formato.',
      }));
      return;
    }

    try {
      const code = generateCode(email);
      
      // Simular um pequeno delay para UX
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          email,
          verificationCode: code,
          isVerified: true,
          isLoading: false,
          error: null,
        }));
        
        // Salvar no localStorage para persistência
        localStorage.setItem('accessibility_verification', JSON.stringify({
          email,
          code,
          timestamp: Date.now(),
        }));
      }, 1000);
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Erro ao gerar código. Tente novamente.',
      }));
    }
  }, [generateCode]);

  const resetVerification = useCallback(() => {
    setState({
      email: '',
      verificationCode: '',
      isVerified: false,
      isLoading: false,
      error: null,
    });
    localStorage.removeItem('accessibility_verification');
  }, []);

  return {
    ...state,
    verifyEmail,
    resetVerification,
  };
};