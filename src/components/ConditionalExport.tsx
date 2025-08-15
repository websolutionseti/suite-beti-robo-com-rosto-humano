import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Download, Mail, CheckCircle } from 'lucide-react';
import { useConditionalExport } from '@/hooks/useConditionalExport';
import { useTranslation } from '@/hooks/useLanguage';

const ConditionalExport = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  
  const {
    allInteractionsComplete,
    email,
    setEmail,
    exportPageContent,
    generateExportCode
  } = useConditionalExport();

  const { t } = useTranslation();

  const handleExportClick = () => {
    if (!allInteractionsComplete) return;
    setShowEmailForm(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !allInteractionsComplete) return;

    setIsExporting(true);
    
    try {
      const result = await exportPageContent(email);
      if (result?.downloadCompleted) {
        setExportComplete(true);
        setShowEmailForm(false);
        
        // Reset após 3 segundos
        setTimeout(() => {
          setExportComplete(false);
          setEmail('');
        }, 3000);
      }
    } catch (error) {
      console.error('Erro ao exportar:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (exportComplete) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="p-4 bg-success/10 border-success animate-fade-in">
          <div className="flex items-center space-x-2 text-success">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Exportação concluída!</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Código: {generateExportCode(email)}
          </p>
        </Card>
      </div>
    );
  }

  if (showEmailForm) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="p-4 w-80 shadow-xl animate-fade-in">
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <div className="flex items-center space-x-2 mb-3">
              <Mail className="w-4 h-4 text-primary" />
              <span className="font-medium text-sm">Exportar Página</span>
            </div>
            
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('export.email.placeholder')}
              required
              className="w-full"
            />
            
            <div className="flex space-x-2">
              <Button
                type="submit"
                disabled={!email || isExporting}
                className="flex-1"
                size="sm"
              >
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Exportando...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    {t('export.button')}
                  </>
                )}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowEmailForm(false)}
                size="sm"
              >
                Cancelar
              </Button>
            </div>
            
            {email && (
              <p className="text-xs text-muted-foreground">
                Código: {generateExportCode(email)}
              </p>
            )}
          </form>
        </Card>
      </div>
    );
  }

  if (!allInteractionsComplete) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleExportClick}
        className="shadow-lg bg-accent hover:bg-accent/90"
        size="sm"
      >
        <Download className="w-4 h-4 mr-2" />
        {t('export.button')}
      </Button>
    </div>
  );
};

export default ConditionalExport;