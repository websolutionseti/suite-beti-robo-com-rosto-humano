import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClipboardCheck, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DiagnosticoModalProps {
  triggerClassName?: string;
  variant?: "default" | "success" | "outline" | "outline-white";
}

const DiagnosticoModal = ({
  triggerClassName = "",
  variant = "default"
}: DiagnosticoModalProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    site: "",
    ramo: "",
    ramo_detalhe: "",
    problema: "",
    prejuizo: "",
    meta: "",
    compromisso: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    const WEBHOOK_URL = "https://n8n.online.des.br/webhook/0efca1ca-d98f-42d3-b61e-22f97628e19f";

    const payload = {
      "Nome Completo": formData.nome,
      "WhatsApp": formData.whatsapp,
      "Site ou Instagram": formData.site,
      "Ramo de Atuação": formData.ramo,
      "Especifique seu ramo": formData.ramo_detalhe,
      "Qual a maior dor/gargalo?": formData.problema,
      "Hoje qual sua estimativa de Prejuízo": formData.prejuizo,
      "Meta para 6 meses": formData.meta,
      "Aceita conversar com Guilherme ou quer continuar com a betié um Compromisso": formData.compromisso,
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setOpen(false);
        navigate("/beti-diagnostico");
      } else {
        throw new Error("Falha no envio");
      }
    } catch (err) {
      toast.error("Erro ao enviar diagnóstico. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    if (step === 1) return formData.nome.length > 2 && formData.whatsapp.length >= 8;
    if (step === 2) return formData.ramo !== "";
    if (step === 3) return formData.problema.length > 5;
    if (step === 4) return formData.meta.length > 5;
    if (step === 5) return formData.compromisso !== "";
    return true;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size="lg"
          className={`text-lg px-8 py-4 h-auto shadow-lg transition-all hover:scale-105 ${triggerClassName}`}
        >
          <ClipboardCheck className="mr-2" />
          Gerar Diagnóstico
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl w-[95vw] bg-slate-900 border-slate-800 text-white p-6 rounded-3xl overflow-hidden shadow-2xl">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Diagnóstico Premium BETI
          </DialogTitle>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Passo {step} de {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <Progress value={(step / totalSteps) * 100} className="h-1.5 bg-slate-800" />
          </div>
        </DialogHeader>

        <div className="space-y-6 min-h-[350px] flex flex-col justify-center">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-bold text-indigo-400">Primeiro, quem é você?</h3>
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-slate-300">Nome Completo</Label>
                <Input
                  id="nome"
                  placeholder="Seu nome"
                  value={formData.nome}
                  onChange={(e) => updateField("nome", e.target.value)}
                  className="bg-slate-800 border-slate-700 focus:border-indigo-500 h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-slate-300">WhatsApp (com DDD)</Label>
                <Input
                  id="whatsapp"
                  placeholder="Ex: 11999998888"
                  value={formData.whatsapp}
                  onChange={(e) => updateField("whatsapp", e.target.value)}
                  className="bg-slate-800 border-slate-700 focus:border-indigo-500 h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site" className="text-slate-300">Site ou Instagram</Label>
                <Input
                  id="site"
                  placeholder="Link do seu negócio"
                  value={formData.site}
                  onChange={(e) => updateField("site", e.target.value)}
                  className="bg-slate-800 border-slate-700 focus:border-indigo-500 h-12"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-bold text-indigo-400">Sobre o seu negócio</h3>
              <div className="space-y-2">
                <Label className="text-slate-300">Ramo de Atuação</Label>
                <Select value={formData.ramo} onValueChange={(v) => updateField("ramo", v)}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 h-12">
                    <SelectValue placeholder="Selecione o ramo..." />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="Serviços">Serviços</SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                    <SelectItem value="Infoproduto">Infoproduto</SelectItem>
                    <SelectItem value="Indústria">Indústria</SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ramo_detalhe" className="text-slate-300">Especifique melhor</Label>
                <Input
                  id="ramo_detalhe"
                  placeholder="Ex: Clínica Odontológica, Agência de Marketing..."
                  value={formData.ramo_detalhe}
                  onChange={(e) => updateField("ramo_detalhe", e.target.value)}
                  className="bg-slate-800 border-slate-700 focus:border-indigo-500 h-12"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-bold text-indigo-400">Qual o maior desafio?</h3>
              <div className="space-y-2">
                <Label htmlFor="problema" className="text-slate-300">Gargalo principal no atendimento</Label>
                <Textarea
                  id="problema"
                  placeholder="O que está impedindo você de escalar hoje?"
                  value={formData.problema}
                  onChange={(e) => updateField("problema", e.target.value)}
                  className="bg-slate-800 border-slate-700 focus:border-indigo-500 min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Estimativa de Prejuízo (Mensal)</Label>
                <Select value={formData.prejuizo} onValueChange={(v) => updateField("prejuizo", v)}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 h-12">
                    <SelectValue placeholder="Selecione uma faixa..." />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="Até R$ 1.000">Até R$ 1.000</SelectItem>
                    <SelectItem value="R$ 1k a R$ 5k">R$ 1k a R$ 5k</SelectItem>
                    <SelectItem value="Mais de R$ 10k">Mais de R$ 10k</SelectItem>
                    <SelectItem value="Não sei calcular">Não sei calcular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-bold text-indigo-400">Visão de Futuro</h3>
              <div className="space-y-2">
                <Label htmlFor="meta" className="text-slate-300">Onde você quer estar daqui a 6 meses?</Label>
                <Textarea
                  id="meta"
                  placeholder="Descreva sua meta de faturamento ou automação..."
                  value={formData.meta}
                  onChange={(e) => updateField("meta", e.target.value)}
                  className="bg-slate-800 border-slate-700 focus:border-indigo-500 min-h-[150px]"
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-bold text-indigo-400">Compromisso Final</h3>
              <p className="text-sm text-slate-400 leading-relaxed bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
                15 minutos com um especialista podem economizar 6 meses de erros. Você aceita uma consultoria com nosso CTO Guilherme ou prefere apenas o PDF da Beti?
              </p>
              <div className="space-y-2">
                <Select value={formData.compromisso} onValueChange={(v) => updateField("compromisso", v)}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 h-12">
                    <SelectValue placeholder="Qual sua preferência?" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="Quero falar com Guilherme">Sim! Quero falar com Guilherme</SelectItem>
                    <SelectItem value="Continuar com a Beti">Prefiro continuar apenas com a Beti</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-between gap-4">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={prevStep}
              className="flex-1 bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 h-12 rounded-xl"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
            </Button>
          )}

          <Button
            onClick={step === totalSteps ? handleSubmit : nextStep}
            disabled={!isStepValid() || loading}
            className={`flex-1 ${step === 1 ? 'w-full' : ''} bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-95`}
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : step === totalSteps ? (
              "Gerar Diagnóstico Premium"
            ) : (
              <>Próximo <ArrowRight className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiagnosticoModal;
