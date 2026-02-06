import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClipboardCheck } from "lucide-react";

interface DiagnosticoModalProps {
  triggerClassName?: string;
  variant?: "default" | "success" | "outline" | "outline-white";
}

const DiagnosticoModal = ({ 
  triggerClassName = "", 
  variant = "default" 
}: DiagnosticoModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant={variant} 
          size="lg" 
          className={`text-lg px-8 py-4 h-auto ${triggerClassName}`}
        >
          <ClipboardCheck className="mr-2" />
          Gerar Diagnóstico
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[95vw] h-[85vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-bold text-foreground">
            Diagnóstico BETI - Acelerador Web Solutions
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 p-6 pt-4 h-full">
          <iframe
            src="https://link.online.des.br/webform-beti_acelerador"
            width="100%"
            height="100%"
            className="border-0 rounded-lg min-h-[500px]"
            title="Formulário de Diagnóstico BETI"
            loading="lazy"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiagnosticoModal;
