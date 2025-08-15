import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Settings, Plus, Minus, Sun, Moon, Zap, ZapOff, Volume2, VolumeX, Accessibility, Mail, CheckCircle } from 'lucide-react';
import { useAccessibility } from './AccessibilityProvider';
import { useInteractionTracking } from '@/hooks/useInteractionTracking';
import { useEmailVerification } from '@/hooks/useEmailVerification';
import { toast } from '@/hooks/use-toast';

export const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const {
    settings,
    updateFontSize,
    updateContrast,
    toggleReducedMotion,
    toggleAnnouncements,
    resetSettings,
    announce
  } = useAccessibility();
  
  const { interactions, markInteraction, allInteracted, resetInteractions } = useInteractionTracking();
  const { email, verificationCode, isVerified, isLoading, error, verifyEmail, resetVerification } = useEmailVerification();

  const handleExportToText = () => {
    if (!isVerified) {
      toast({
        title: "Verificação necessária",
        description: "Complete a verificação por e-mail para exportar o conteúdo.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Collect all text content from the page
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        .map(el => `${el.tagName}: ${el.textContent?.trim()}`)
        .filter(text => text.length > 3);

      const paragraphs = Array.from(document.querySelectorAll('p'))
        .map(el => el.textContent?.trim())
        .filter(text => text && text.length > 10);

      const lists = Array.from(document.querySelectorAll('li'))
        .map(el => `• ${el.textContent?.trim()}`)
        .filter(text => text.length > 3);

      const images = Array.from(document.querySelectorAll('img'))
        .map(img => `Imagem: ${img.alt || 'Sem descrição alternativa'}`)
        .filter(text => text.length > 8);

      const links = Array.from(document.querySelectorAll('a'))
        .map(link => `Link: ${link.textContent?.trim()} (${link.href})`)
        .filter(text => text.length > 8);

      // Include verification info
      const verificationInfo = [
        '\n=== INFORMAÇÕES DE VERIFICAÇÃO ===',
        `E-mail verificado: ${email}`,
        `Código de verificação: ${verificationCode}`,
        `Data de exportação: ${new Date().toLocaleString('pt-BR')}`
      ];

      // Combine all content
      const content = [
        '=== CONTEÚDO DA PÁGINA ===\n',
        ...headings,
        '\n=== PARÁGRAFOS ===\n',
        ...paragraphs,
        '\n=== LISTAS ===\n',
        ...lists,
        '\n=== IMAGENS ===\n',
        ...images,
        '\n=== LINKS ===\n',
        ...links,
        ...verificationInfo
      ].join('\n');

      // Create and download file
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `conteudo-pagina-${verificationCode}-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      announce('Arquivo de texto exportado com sucesso com verificação');
      toast({
        title: "Exportação concluída",
        description: "Arquivo baixado com sucesso!",
      });
    } catch (error) {
      console.error('Erro ao exportar conteúdo:', error);
      announce('Erro ao exportar arquivo');
      toast({
        title: "Erro na exportação",
        description: "Não foi possível exportar o arquivo.",
        variant: "destructive"
      });
    }
  };

  const handleFontSizeChange = (increase: boolean) => {
    const newSize = increase ? settings.fontSize + 2 : settings.fontSize - 2;
    const clampedSize = Math.max(16, Math.min(24, newSize));
    updateFontSize(clampedSize);
    markInteraction('fontSize');
    
    const description = increase 
      ? `Fonte aumentada para ${clampedSize}px para melhor legibilidade` 
      : `Fonte reduzida para ${clampedSize}px`;
    announce(description);
    
    toast({
      title: "Tamanho da fonte alterado",
      description,
    });
  };

  const handleContrastChange = () => {
    const modes = ['normal', 'high', 'dark'] as const;
    const currentIndex = modes.indexOf(settings.contrast);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    updateContrast(nextMode);
    markInteraction('contrast');
    
    const modeLabels = {
      normal: 'Contraste normal restaurado',
      high: 'Alto contraste ativado para melhor visibilidade',
      dark: 'Modo escuro ativado para reduzir fadiga visual'
    };
    
    announce(modeLabels[nextMode]);
    toast({
      title: "Contraste alterado",
      description: modeLabels[nextMode],
    });
  };

  const handleReducedMotionToggle = () => {
    const newState = !settings.reducedMotion;
    toggleReducedMotion();
    markInteraction('reducedMotion');
    
    const description = newState 
      ? 'Animações reduzidas para evitar desconforto visual'
      : 'Animações normais reativadas';
    announce(description);
    
    toast({
      title: "Animações " + (newState ? "reduzidas" : "normais"),
      description,
    });
  };

  const handleAnnouncementsToggle = () => {
    const newState = !settings.announcements;
    toggleAnnouncements();
    markInteraction('announcements');
    
    const description = newState 
      ? 'Anúncios de tela ativados para feedback auditivo'
      : 'Anúncios de tela desativados';
    announce(description);
    
    toast({
      title: "Anúncios " + (newState ? "ativados" : "desativados"),
      description,
    });
  };

  const handleReset = () => {
    resetSettings();
    resetInteractions();
    resetVerification();
    setShowEmailForm(false);
    announce('Todas as configurações de acessibilidade foram resetadas');
    toast({
      title: "Configurações resetadas",
      description: "Todas as preferências foram restauradas ao padrão.",
    });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      verifyEmail(emailInput.trim());
    }
  };

  const toggleEmailForm = () => {
    if (!allInteracted) {
      toast({
        title: "Interação necessária",
        description: "Clique em todas as opções de acessibilidade antes de exportar.",
        variant: "destructive"
      });
      return;
    }
    setShowEmailForm(!showEmailForm);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Ícone sempre visível */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg transition-all duration-300 group"
          aria-label="Abrir painel de acessibilidade"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(true);
            }
          }}
        >
          <Accessibility className="h-6 w-6 text-primary-foreground" />
          <span className="sr-only">Acessibilidade</span>
        </Button>
      )}

      {/* Painel expandido */}
      {isOpen && (
        <Card className="bg-background border shadow-2xl max-w-sm animate-scale-in border-border/20">
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <Accessibility className="h-6 w-6 text-primary" />
                <h3 className="font-semibold text-lg">Acessibilidade</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar painel de acessibilidade"
                className="h-8 w-8 p-0"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setIsOpen(false);
                  }
                }}
              >
                ✕
              </Button>
            </div>

            <div className="space-y-5">
              {/* Controle de Fonte com melhor acessibilidade */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium" htmlFor="font-size-control">
                    Tamanho da fonte
                    <span className="sr-only">
                      Ajusta o tamanho da fonte para melhor legibilidade. Atual: {settings.fontSize}px
                    </span>
                  </Label>
                  <div className="flex items-center gap-2" role="group" aria-labelledby="font-size-control">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFontSizeChange(false)}
                      aria-label={`Diminuir fonte para ${Math.max(16, settings.fontSize - 2)}px`}
                      className="h-9 w-9 p-0"
                      disabled={settings.fontSize <= 16}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleFontSizeChange(false);
                        }
                      }}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-sm px-3 py-1 bg-muted rounded-md min-w-[4rem] text-center font-medium">
                      {settings.fontSize}px
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFontSizeChange(true)}
                      aria-label={`Aumentar fonte para ${Math.min(24, settings.fontSize + 2)}px`}
                      className="h-9 w-9 p-0"
                      disabled={settings.fontSize >= 24}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleFontSizeChange(true);
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {interactions.fontSize && (
                  <p className="text-xs text-muted-foreground">✓ Interagido</p>
                )}
              </div>

              {/* Controle de Contraste */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    Contraste e tema
                    <span className="sr-only">
                      Altera entre modo normal, alto contraste e modo escuro para melhor visibilidade
                    </span>
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleContrastChange}
                    className="flex items-center gap-2 h-9"
                    aria-label={`Alterar contraste (atual: ${settings.contrast})`}
                    role="switch"
                    aria-checked={settings.contrast !== 'normal'}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleContrastChange();
                      }
                    }}
                  >
                    {settings.contrast === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    <span className="text-sm capitalize font-medium">
                      {settings.contrast === 'normal' ? 'Normal' : 
                       settings.contrast === 'high' ? 'Alto' : 'Escuro'}
                    </span>
                  </Button>
                </div>
                {interactions.contrast && (
                  <p className="text-xs text-muted-foreground">✓ Interagido</p>
                )}
              </div>

              {/* Controle de Animações */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    Reduzir animações
                    <span className="sr-only">
                      Reduz ou remove animações para evitar desconforto visual e melhorar performance
                    </span>
                  </Label>
                  <Button
                    variant={settings.reducedMotion ? "default" : "outline"}
                    size="sm"
                    onClick={handleReducedMotionToggle}
                    aria-label={`${settings.reducedMotion ? 'Desativar' : 'Ativar'} redução de animações`}
                    role="switch"
                    aria-checked={settings.reducedMotion}
                    className="flex items-center gap-2 h-9"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleReducedMotionToggle();
                      }
                    }}
                  >
                    {settings.reducedMotion ? <ZapOff className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
                    <span className="text-sm font-medium">{settings.reducedMotion ? 'Ativo' : 'Inativo'}</span>
                  </Button>
                </div>
                {interactions.reducedMotion && (
                  <p className="text-xs text-muted-foreground">✓ Interagido</p>
                )}
              </div>

              {/* Controle de Anúncios */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    Ouvir texto
                    <span className="sr-only">
                      Clique para ouvir o conteúdo da página
                    </span>
                  </Label>
                  <Button
                    variant={settings.announcements ? "default" : "outline"}
                    size="sm"
                    onClick={handleAnnouncementsToggle}
                    aria-label={`${settings.announcements ? 'Desativar' : 'Ativar'} ouvir texto`}
                    role="switch"
                    aria-checked={settings.announcements}
                    className="flex items-center gap-2 h-9"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleAnnouncementsToggle();
                      }
                    }}
                  >
                    {settings.announcements ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    <span className="text-sm font-medium">{settings.announcements ? 'Ativo' : 'Inativo'}</span>
                  </Button>
                </div>
                {interactions.announcements && (
                  <p className="text-xs text-muted-foreground">✓ Interagido</p>
                )}
              </div>

              {/* Progresso das interações */}
              {!allInteracted && (
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">
                    Para exportar, interaja com todas as opções:
                  </p>
                  <div className="text-xs space-y-1">
                    <div className={interactions.fontSize ? "text-green-600" : "text-muted-foreground"}>
                      {interactions.fontSize ? "✓" : "○"} Tamanho da fonte
                    </div>
                    <div className={interactions.contrast ? "text-green-600" : "text-muted-foreground"}>
                      {interactions.contrast ? "✓" : "○"} Contraste
                    </div>
                    <div className={interactions.reducedMotion ? "text-green-600" : "text-muted-foreground"}>
                      {interactions.reducedMotion ? "✓" : "○"} Animações
                    </div>
                    <div className={interactions.announcements ? "text-green-600" : "text-muted-foreground"}>
                      {interactions.announcements ? "✓" : "○"} Anúncios
                    </div>
                  </div>
                </div>
              )}

              {/* Formulário de E-mail (apenas após todas interações) */}
              {allInteracted && !isVerified && (
                <div className="space-y-3 p-3 bg-primary/5 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Verificação para exportar</span>
                  </div>
                  <form onSubmit={handleEmailSubmit} className="space-y-3">
                    <div>
                      <Label htmlFor="email-verification" className="text-xs">
                        Digite seu e-mail para gerar código de verificação:
                      </Label>
                      <Input
                        id="email-verification"
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="seu@email.com"
                        required
                        disabled={isLoading}
                        className="mt-1"
                        aria-describedby="email-help"
                      />
                      <p id="email-help" className="text-xs text-muted-foreground mt-1">
                        Usado apenas para gerar código único de verificação
                      </p>
                    </div>
                    <Button 
                      type="submit" 
                      size="sm" 
                      disabled={isLoading || !emailInput.trim()}
                      className="w-full"
                    >
                      {isLoading ? "Gerando..." : "Gerar código"}
                    </Button>
                  </form>
                  {error && (
                    <p className="text-xs text-destructive" role="alert">
                      {error}
                    </p>
                  )}
                </div>
              )}

              {/* Código de verificação gerado */}
              {isVerified && (
                <div className="space-y-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Verificação concluída</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <p><strong>E-mail:</strong> {email}</p>
                    <p><strong>Código:</strong> <code className="bg-background px-1 rounded">{verificationCode}</code></p>
                  </div>
                </div>
              )}

              {/* Botões de ação */}
              <div className="flex gap-2 pt-3 border-t">
                <Button
                  variant={isVerified ? "default" : "outline"}
                  size="sm"
                  onClick={isVerified ? handleExportToText : toggleEmailForm}
                  className="flex items-center gap-2 flex-1"
                  aria-label={isVerified ? "Exportar conteúdo da página para texto" : "Iniciar processo de verificação para exportar"}
                  disabled={!allInteracted}
                >
                  <Download className="h-4 w-4" />
                  {isVerified ? "Exportar" : "Exportar"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="flex-1"
                  aria-label="Resetar todas as configurações de acessibilidade"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};