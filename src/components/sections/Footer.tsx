import { MessageCircle, Mail, MapPin, Phone } from "lucide-react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = "https://link.online.des.br/falecombeti";
  return <footer className="bg-slate-900 dark:bg-slate-950 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Suíte BETI</h3>
            <p className="text-white/80 mb-6 max-w-md">
              A solução inteligente de atendimento que revoluciona a forma como micro, pequenas e médias empresas se conectam com seus clientes.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={16} className="text-primary-glow" />
                <span>São Paulo, SP - Brasil</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-primary-glow" />
                <span>+55 (12) 99152-8871</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-primary-glow" />
                <span>info@websolutionseti.com.br</span>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-bold mb-4">Soluções</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Chatbot WhatsApp</li>
              <li>Automação de Atendimento</li>
              <li>Integração de Sistemas</li>
              <li>Sites Responsivos</li>
              <li>Análise de Dados</li>
              <li>Consultoria Digital</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Sobre a Web Solutions ETI</li>
              <li>Guilherme Puentes</li>
              <li>Equipe Técnica</li>
              <li>Cases de Sucesso</li>
              <li>Tecnologias</li>
              <li>Parcerias</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-white/60">
              © {currentYear} Web Solutions ETI - Suíte BETI. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center gap-6">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-success hover:bg-success/90 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                <MessageCircle size={16} />
                WhatsApp
              </a>
              
              <div className="text-xs text-white/60">
                <span>LGPD | </span>
                <span>Tecnologia Nacional</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="text-center mt-8 pt-8 border-t border-white/10">
          <p className="text-lg font-medium text-emerald-400">
            "Com a BETI, você não instala um robô. Você ganha uma equipe digital."
          </p>
          <p className="text-sm text-white/60 mt-2">
            Framework BETI - Tecnologia Open Source, Sem Lock-in
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;