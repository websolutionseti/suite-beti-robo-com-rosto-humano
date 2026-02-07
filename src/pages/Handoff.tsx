import { 
  Users, 
  Target, 
  Layers, 
  GitBranch, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Palette, 
  Code2, 
  Database, 
  Smartphone,
  Monitor,
  Clock,
  TrendingUp,
  MessageCircle,
  Shield,
  Eye,
  Heart,
  Brain,
  Workflow,
  FileText,
  Settings
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import etiLogo from "@/assets/eti-logo.png";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 📋 HANDOFF UX/UI - SUÍTE BETI
 * Documentação Técnica de Produto | v1.1.0
 * 
 * Autor: Guilherme Puentes - Product Designer | CTA Web Solutions ETI
 * Portfolio: gscpweb.com.br
 * Atualizado: Fevereiro 2026
 * ═══════════════════════════════════════════════════════════════════════════════
 */

const Handoff = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header da Documentação */}
      <header className="bg-gradient-to-r from-primary via-primary-glow to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <img src={etiLogo} alt="ETI Logo" className="h-16 w-16" />
            <div>
              <Badge variant="secondary" className="mb-2">HandOff v1.1.0</Badge>
              <h1 className="text-4xl md:text-5xl font-bold">Suíte BETI</h1>
            </div>
          </div>
          <p className="text-xl text-white/90 max-w-3xl">
            Documentação completa de UX/UI para desenvolvimento e continuidade do projeto.
            Entregável de Product Design com foco em acessibilidade e conversão.
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-sm text-white/80">
            <span className="flex items-center gap-1">
              <Users size={16} /> PO • Gerentes de TI
            </span>
            <span className="flex items-center gap-1">
              <Code2 size={16} /> Front-end • Back-end
            </span>
            <span className="flex items-center gap-1">
              <Heart size={16} /> DHO • RH
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="journey">Jornada do Usuário</TabsTrigger>
            <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
            <TabsTrigger value="design-system">Design System</TabsTrigger>
            <TabsTrigger value="tech-specs">Specs Técnicas</TabsTrigger>
          </TabsList>

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* TAB: VISÃO GERAL */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          <TabsContent value="overview" className="space-y-8">
            {/* Executive Summary */}
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Target className="text-primary" />
                Executive Summary
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-primary">🎯 Objetivo do Projeto</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        A <strong>Suíte BETI</strong> é uma landing page de alta conversão para 
                        comercialização de um chatbot humanizado com IA. O foco é transmitir 
                        <strong> confiança, tecnologia e empatia</strong> através de um design 
                        acessível que funciona em múltiplos dispositivos.
                      </p>
                      
                      <h4 className="font-semibold mt-6 mb-2">Problema que Resolvemos:</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                          Empresas perdem vendas por atendimento lento ou robotizado
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                          Falta de disponibilidade 24/7 para atender leads
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                          Alto custo de equipe de atendimento humano
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-primary">📊 KPIs Esperados</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-success/10 dark:bg-success/20 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-success">+150%</div>
                          <div className="text-sm text-muted-foreground">Conversões</div>
                        </div>
                        <div className="bg-success/10 dark:bg-success/20 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-success">-50%</div>
                          <div className="text-sm text-muted-foreground">Custos Operacionais</div>
                        </div>
                        <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-primary">24/7</div>
                          <div className="text-sm text-muted-foreground">Disponibilidade</div>
                        </div>
                        <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-primary">90 dias</div>
                          <div className="text-sm text-muted-foreground">ROI Garantido</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Decisões de Design */}
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Brain className="text-primary" />
                Decisões Estratégicas de Design
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Heart className="h-5 w-5 text-destructive" />
                      Humanização
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      <strong>Por que usamos uma pessoa real na hero?</strong>
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Chatbots são frequentemente associados a experiências frias e frustrantes. 
                      A imagem da "BETI" com rosto humano quebra esse preconceito e estabelece 
                      uma conexão emocional imediata com o visitante.
                    </p>
                    <Badge variant="outline" className="mt-4">Storytelling Visual</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Eye className="h-5 w-5 text-primary" />
                      Acessibilidade
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      <strong>WCAG 2.1 AA + 2.2 por quê?</strong>
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Além de ser lei (LGPD/acessibilidade), ampliamos o alcance para 
                      ~20% da população com alguma deficiência. Contraste, escala de fonte 
                      e suporte a daltonismo são features, não extras.
                    </p>
                    <Badge variant="outline" className="mt-4">Inclusão Digital</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Zap className="h-5 w-5 text-success" />
                      Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      <strong>WebP, lazy loading, otimização agressiva</strong>
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Cada segundo de carregamento pode custar 7% em conversões. 
                      Usamos formatos modernos, carregamento preguiçoso e 
                      priorização de LCP (Largest Contentful Paint).
                    </p>
                    <Badge variant="outline" className="mt-4">Core Web Vitals</Badge>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Personas */}
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Users className="text-primary" />
                Personas
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-primary">
                  <CardHeader>
                    <Badge className="w-fit mb-2">MEI</Badge>
                    <CardTitle>Marcos, 38</CardTitle>
                    <CardDescription>Microempreendedor Individual</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium text-sm">Dor principal:</p>
                      <p className="text-muted-foreground text-sm">Não consegue responder clientes fora do horário comercial</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Motivação:</p>
                      <p className="text-muted-foreground text-sm">Quer vender mais sem contratar funcionários</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Objeção:</p>
                      <p className="text-muted-foreground text-sm">"Chatbot parece coisa de empresa grande"</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-accent">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Pequena Empresa</Badge>
                    <CardTitle>Carolina, 45</CardTitle>
                    <CardDescription>Gerente Comercial</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium text-sm">Dor principal:</p>
                      <p className="text-muted-foreground text-sm">Equipe não dá conta do volume de leads</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Motivação:</p>
                      <p className="text-muted-foreground text-sm">Precisa de relatórios e métricas de atendimento</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Objeção:</p>
                      <p className="text-muted-foreground text-sm">"Meus clientes vão perceber que é robô"</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-success">
                  <CardHeader>
                    <Badge variant="destructive" className="w-fit mb-2">Enterprise</Badge>
                    <CardTitle>Roberto, 52</CardTitle>
                    <CardDescription>Diretor de Operações</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium text-sm">Dor principal:</p>
                      <p className="text-muted-foreground text-sm">Alto turnover e custo de treinamento em CS</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Motivação:</p>
                      <p className="text-muted-foreground text-sm">Quer integração com CRM e escalabilidade</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Objeção:</p>
                      <p className="text-muted-foreground text-sm">"Preciso de SLA e suporte enterprise"</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* TAB: JORNADA DO USUÁRIO */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          <TabsContent value="journey" className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Workflow className="text-primary" />
                User Journey Map
              </h2>
              
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                      {/* Journey Timeline */}
                      <div className="relative">
                        {/* Linha de conexão */}
                        <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-success" />
                        
                        {/* Etapas */}
                        <div className="grid grid-cols-5 gap-4 relative">
                          {[
                            { phase: "Descoberta", action: "Acessa via Google/Social", emotion: "Curioso", touchpoint: "Hero Section" },
                            { phase: "Interesse", action: "Lê benefícios e métricas", emotion: "Interessado", touchpoint: "Benefits Section" },
                            { phase: "Consideração", action: "Compara planos de preço", emotion: "Analítico", touchpoint: "Pricing Section" },
                            { phase: "Decisão", action: "Clica em CTA", emotion: "Decidido", touchpoint: "Modal Diagnóstico" },
                            { phase: "Ação", action: "Preenche formulário", emotion: "Engajado", touchpoint: "WhatsApp/n8n" }
                          ].map((step, i) => (
                            <div key={i} className="text-center">
                              <div className="w-16 h-16 mx-auto bg-background border-4 border-primary rounded-full flex items-center justify-center text-xl font-bold relative z-10">
                                {i + 1}
                              </div>
                              <h4 className="font-bold mt-4 text-primary">{step.phase}</h4>
                              <p className="text-sm text-muted-foreground mt-2">{step.action}</p>
                              <Badge variant="outline" className="mt-2">{step.emotion}</Badge>
                              <p className="text-xs text-muted-foreground mt-2 italic">{step.touchpoint}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fluxo Detalhado */}
              <h3 className="text-2xl font-bold mb-4">Fluxo de Conversão Detalhado</h3>
              <div className="space-y-4">
                {[
                  { 
                    title: "1. Entrada (Hero)",
                    description: "Usuário chega pela busca orgânica ou tráfego pago. O hero precisa capturar atenção em 3 segundos.",
                    metrics: "Bounce rate alvo: < 40%",
                    cta: "Gerar Diagnóstico (primário) | Fale com a BETI (secundário)"
                  },
                  { 
                    title: "2. Problema → Solução",
                    description: "Seções que validam a dor do usuário e apresentam a BETI como solução. Uso de social proof e métricas.",
                    metrics: "Scroll depth alvo: > 60%",
                    cta: "Ver como funciona (ancora para benefits)"
                  },
                  { 
                    title: "3. Benefícios Comparativos",
                    description: "Tabela comparando Sem BETI vs Com BETI. Foco em ROI tangível e redução de custos.",
                    metrics: "Time on section: > 45s",
                    cta: "Calculadora de ROI (futura feature)"
                  },
                  { 
                    title: "4. Pricing Transparente",
                    description: "3 planos claros sem esconder custos. Destaque visual no plano mais popular (Pequenas Empresas).",
                    metrics: "Click-through rate: > 8%",
                    cta: "Quero Agendar → WhatsApp com mensagem pré-definida"
                  },
                  { 
                    title: "5. CTA Final + Exit Intent",
                    description: "Última seção com urgência moderada + modal de saída oferecendo demonstração grátis.",
                    metrics: "Exit intent recovery: > 5%",
                    cta: "Solicitar Demonstração | Gerar Diagnóstico"
                  }
                ].map((step, i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-1">
                          <h4 className="font-bold text-lg">{step.title}</h4>
                          <p className="text-muted-foreground mt-1">{step.description}</p>
                        </div>
                        <div className="md:text-right space-y-2">
                          <Badge variant="secondary">{step.metrics}</Badge>
                          <p className="text-sm text-muted-foreground">CTA: {step.cta}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Micro-interações */}
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Zap className="text-primary" />
                Micro-interações Chave
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Floating Menu</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p><strong>Trigger:</strong> Aparece após scroll até "Solução"</p>
                    <p><strong>Comportamento:</strong> Ícones colapsíveis (A11y, Tradução, Contatos)</p>
                    <p><strong>Decisão:</strong> Evitar distração na hero, revelar ferramentas quando relevante</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Exit Intent Modal</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p><strong>Trigger:</strong> Mouse sai do viewport (desktop) após 5s</p>
                    <p><strong>Comportamento:</strong> Modal com contador de visitantes e CTA alternativo</p>
                    <p><strong>Decisão:</strong> Recuperar leads que iam abandonar sem converter</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Diagnóstico Modal</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p><strong>Trigger:</strong> Click no CTA principal</p>
                    <p><strong>Comportamento:</strong> iFrame com formulário n8n para lead scoring</p>
                    <p><strong>Decisão:</strong> Qualificar leads antes de direcionar para vendas</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Floating WhatsApp</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p><strong>Trigger:</strong> Sempre visível após hero</p>
                    <p><strong>Comportamento:</strong> Pulse animation para chamar atenção</p>
                    <p><strong>Decisão:</strong> Canal de contato imediato para leads quentes</p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* TAB: SITEMAP */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          <TabsContent value="sitemap" className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <GitBranch className="text-primary" />
                Arquitetura de Informação
              </h2>
              
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="text-center mb-8">
                    <div className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold text-lg">
                      suite-beti-robo-com-rosto-humano.lovable.app
                    </div>
                  </div>
                  
                  {/* Árvore de páginas */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <Monitor className="h-6 w-6 text-primary" />
                      <div className="flex-1">
                        <p className="font-bold">/ (Home - Landing Page)</p>
                        <p className="text-sm text-muted-foreground">Página única com scroll vertical para todas as seções</p>
                      </div>
                      <Badge>Single Page Application</Badge>
                    </div>
                    
                    <div className="ml-8 space-y-2">
                      {[
                        { anchor: "#hero", name: "Hero Section", desc: "Proposta de valor + CTAs primários" },
                        { anchor: "#problem", name: "Problem Section", desc: "Validação da dor do usuário" },
                        { anchor: "#solution", name: "Solution Section", desc: "BETI como solução + features" },
                        { anchor: "#benefits", name: "Benefits Section", desc: "Comparativo e métricas de ROI" },
                        { anchor: "#pricing", name: "Pricing Section", desc: "3 planos + CTAs por perfil" },
                        { anchor: "#cta", name: "CTA Section", desc: "Chamada final para conversão" },
                        { anchor: "footer", name: "Footer", desc: "Navegação secundária + contatos" }
                      ].map((section, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <code className="text-xs bg-muted px-2 py-1 rounded">{section.anchor}</code>
                            <span className="font-medium ml-2">{section.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{section.desc}</span>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-6" />

                    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <FileText className="h-6 w-6 text-accent" />
                      <div className="flex-1">
                        <p className="font-bold">/handoff02026 (Esta página)</p>
                        <p className="text-sm text-muted-foreground">Documentação técnica de UX/UI</p>
                      </div>
                      <Badge variant="secondary">Documentação</Badge>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <Settings className="h-6 w-6 text-destructive" />
                      <div className="flex-1">
                        <p className="font-bold">/404 (Not Found)</p>
                        <p className="text-sm text-muted-foreground">Página de erro com redirecionamento</p>
                      </div>
                      <Badge variant="outline">Fallback</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Componentes */}
              <h3 className="text-2xl font-bold mb-4">Mapa de Componentes</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Layers className="h-5 w-5" />
                      Componentes de UI
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <code>DiagnosticoModal</code> - Modal com iFrame do formulário n8n
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <code>ExitIntentModal</code> - Modal de recuperação de leads
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <code>FloatingWhatsApp</code> - Botão flutuante de contato
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <code>FloatingMenu</code> - Menu de acessibilidade
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <code>PWAButton</code> - Instalação como app
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Layers className="h-5 w-5" />
                      Componentes de Seção
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <code>HeroSection</code> - Hero com imagem + CTAs
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <code>ProblemSection</code> - Cards de problemas
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <code>SolutionSection</code> - Features da BETI
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <code>BenefitsSection</code> - Tabela comparativa
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <code>PricingSection</code> - Cards de planos
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <code>CtaSection</code> - CTA final
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <code>Footer</code> - Rodapé com links
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* TAB: DESIGN SYSTEM */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          <TabsContent value="design-system" className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Palette className="text-primary" />
                Design Tokens
              </h2>
              
              {/* Cores */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Paleta de Cores</CardTitle>
                  <CardDescription>Tokens definidos em index.css e tailwind.config.ts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "Primary", color: "bg-primary", token: "hsl(220 90% 56%)", desc: "Azul BETI" },
                      { name: "Primary Glow", color: "bg-primary/60", token: "hsl(230 85% 60%)", desc: "Gradientes" },
                      { name: "Accent", color: "bg-accent", token: "hsl(240 80% 55%)", desc: "Destaques" },
                      { name: "Success", color: "bg-success", token: "hsl(142 76% 45%)", desc: "CTAs positivos" },
                      { name: "Success Glow", color: "bg-success/60", token: "hsl(160 90% 50%)", desc: "Gradientes verdes" },
                      { name: "Destructive", color: "bg-destructive", token: "hsl(0 84% 60%)", desc: "Alertas" },
                      { name: "Muted", color: "bg-muted", token: "hsl(215 25% 27%)", desc: "Fundos secundários" },
                      { name: "Card", color: "bg-card", token: "hsl(215 28% 17%)", desc: "Cards" }
                    ].map((c, i) => (
                      <div key={i} className="space-y-2">
                        <div className={`${c.color} h-16 rounded-lg shadow-sm`} />
                        <p className="font-medium text-sm">{c.name}</p>
                        <code className="text-xs text-muted-foreground block">{c.token}</code>
                        <p className="text-xs text-muted-foreground">{c.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tipografia */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Tipografia</CardTitle>
                  <CardDescription>Sistema de fontes responsivo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-4xl md:text-6xl font-bold">Heading 1</p>
                    <code className="text-xs text-muted-foreground">text-4xl md:text-6xl font-bold (Hero title)</code>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl md:text-5xl font-bold">Heading 2</p>
                    <code className="text-xs text-muted-foreground">text-3xl md:text-5xl font-bold (Section titles)</code>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl md:text-2xl">Body Large</p>
                    <code className="text-xs text-muted-foreground">text-xl md:text-2xl (Subtitles)</code>
                  </div>
                  <div className="space-y-2">
                    <p className="text-base">Body Regular</p>
                    <code className="text-xs text-muted-foreground">text-base (Paragraphs)</code>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Body Small / Muted</p>
                    <code className="text-xs text-muted-foreground">text-sm text-muted-foreground (Captions)</code>
                  </div>
                </CardContent>
              </Card>

              {/* Espaçamento */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Espaçamento</CardTitle>
                  <CardDescription>Grid e spacing system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 text-sm font-mono">py-20</div>
                      <div className="flex-1 h-4 bg-primary/20 rounded" />
                      <span className="text-sm text-muted-foreground">Seções principais</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 text-sm font-mono">gap-12</div>
                      <div className="flex-1 h-3 bg-primary/20 rounded" />
                      <span className="text-sm text-muted-foreground">Grid de 2 colunas</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 text-sm font-mono">gap-6</div>
                      <div className="flex-1 h-2 bg-primary/20 rounded" />
                      <span className="text-sm text-muted-foreground">Cards e listas</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 text-sm font-mono">gap-4</div>
                      <div className="flex-1 h-1.5 bg-primary/20 rounded" />
                      <span className="text-sm text-muted-foreground">Elementos internos</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 text-sm font-mono">gap-2</div>
                      <div className="flex-1 h-1 bg-primary/20 rounded" />
                      <span className="text-sm text-muted-foreground">Ícones + texto</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Componentes de botão */}
              <Card>
                <CardHeader>
                  <CardTitle>Variantes de Botão</CardTitle>
                  <CardDescription>Hierarquia visual para CTAs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <div className="space-y-2 text-center">
                      <button className="gradient-success text-white px-6 py-3 rounded-lg font-medium">
                        Gerar Diagnóstico
                      </button>
                      <p className="text-xs text-muted-foreground">variant="success"</p>
                    </div>
                    <div className="space-y-2 text-center">
                      <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium">
                        Primary Action
                      </button>
                      <p className="text-xs text-muted-foreground">variant="default"</p>
                    </div>
                    <div className="space-y-2 text-center">
                      <button className="border border-input bg-background px-6 py-3 rounded-lg font-medium">
                        Secondary
                      </button>
                      <p className="text-xs text-muted-foreground">variant="outline"</p>
                    </div>
                    <div className="space-y-2 text-center">
                      <button className="text-primary hover:underline px-6 py-3 font-medium">
                        Link Style
                      </button>
                      <p className="text-xs text-muted-foreground">variant="ghost"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Acessibilidade */}
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Eye className="text-primary" />
                Acessibilidade (A11y)
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">WCAG 2.1 AA Compliance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Contraste mínimo 4.5:1 para texto</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Focus states visíveis em todos elementos interativos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Navegação por teclado completa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Skip links para conteúdo principal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Alt text descritivo em imagens</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Features Inclusivas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Escala de fonte ajustável (14px-24px)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Suporte a daltonismo (3 tipos)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Modo escuro com tokens dedicados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Redução de movimento (prefers-reduced-motion)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Text-to-Speech via aria-live</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* TAB: SPECS TÉCNICAS */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          <TabsContent value="tech-specs" className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Code2 className="text-primary" />
                Especificações para Desenvolvimento
              </h2>
              
              {/* Stack */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Tech Stack</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-bold mb-3 flex items-center gap-2">
                        <Monitor className="h-4 w-4" /> Front-end
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• React 18.3 + TypeScript</li>
                        <li>• Vite (bundler)</li>
                        <li>• Tailwind CSS + shadcn/ui</li>
                        <li>• React Router DOM v6</li>
                        <li>• Framer Motion (animações)</li>
                        <li>• TanStack Query (state)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 flex items-center gap-2">
                        <Database className="h-4 w-4" /> Integrações
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• n8n (automação de formulários)</li>
                        <li>• WhatsApp Business API</li>
                        <li>• link.online.des.br (URL shortener)</li>
                        <li>• PWA manifest</li>
                        <li>• SEO structured data (JSON-LD)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 flex items-center gap-2">
                        <Shield className="h-4 w-4" /> Deploy
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Lovable Cloud (hosting)</li>
                        <li>• GitHub Actions (CI/CD)</li>
                        <li>• Docker support</li>
                        <li>• Netlify/Vercel ready</li>
                        <li>• NGINX config incluído</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Estrutura de pastas */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Estrutura de Pastas</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`src/
├── a11y/                 # Componentes de acessibilidade
│   ├── AccessibilityMenu.tsx
│   ├── AccessibilityProvider.tsx
│   ├── ScreenReaderOnly.tsx
│   └── SkipLink.tsx
├── assets/               # Imagens importadas via ES6
│   └── eti-logo.png
├── components/
│   ├── sections/         # Seções da landing page
│   │   ├── HeroSection.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── SolutionSection.tsx
│   │   ├── BenefitsSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── CtaSection.tsx
│   │   └── Footer.tsx
│   ├── ui/               # shadcn/ui components
│   ├── DiagnosticoModal.tsx
│   ├── ExitIntentModal.tsx
│   ├── FloatingMenu.tsx
│   ├── FloatingWhatsApp.tsx
│   └── PWAButton.tsx
├── hooks/                # Custom React hooks
│   ├── useLanguage.tsx
│   ├── useColorblindSupport.tsx
│   ├── useConditionalExport.tsx
│   └── useInteractionTracker.tsx
├── imagem/               # Imagens do projeto
├── pages/
│   ├── Index.tsx         # Landing page principal
│   ├── Handoff.tsx       # Esta documentação
│   └── NotFound.tsx
├── App.tsx
├── App.css
├── index.css             # Design tokens CSS
└── main.tsx`}
                  </pre>
                </CardContent>
              </Card>

              {/* Variáveis de ambiente */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Variáveis de Ambiente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-4">
                      O projeto não requer variáveis de ambiente obrigatórias. 
                      Todas as URLs e configurações estão hardcoded nos componentes.
                    </p>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Constante</th>
                          <th className="text-left py-2">Valor</th>
                          <th className="text-left py-2">Localização</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 font-mono text-xs">whatsappCCO</td>
                          <td className="py-2 text-xs">+55 12 99152-8871</td>
                          <td className="py-2 text-xs text-muted-foreground">HeroSection, CtaSection</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-mono text-xs">whatsappSDR</td>
                          <td className="py-2 text-xs">+55 12 99231-7773</td>
                          <td className="py-2 text-xs text-muted-foreground">PricingSection, CtaSection</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-mono text-xs">diagnosticoUrl</td>
                          <td className="py-2 text-xs">link.online.des.br/webform-beti_acelerador</td>
                          <td className="py-2 text-xs text-muted-foreground">DiagnosticoModal</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-mono text-xs">briefingUrl</td>
                          <td className="py-2 text-xs">websolutions.eti.br/briefing</td>
                          <td className="py-2 text-xs text-muted-foreground">HeroSection</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Breakpoints */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Breakpoints Responsivos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { name: "sm", size: "640px", icon: <Smartphone className="h-6 w-6" /> },
                      { name: "md", size: "768px", icon: <Smartphone className="h-7 w-7" /> },
                      { name: "lg", size: "1024px", icon: <Monitor className="h-7 w-7" /> },
                      { name: "xl", size: "1280px", icon: <Monitor className="h-8 w-8" /> },
                      { name: "2xl", size: "1536px", icon: <Monitor className="h-9 w-9" /> }
                    ].map((bp, i) => (
                      <div key={i} className="text-center p-4 bg-muted rounded-lg">
                        <div className="flex justify-center mb-2 text-muted-foreground">{bp.icon}</div>
                        <p className="font-bold">{bp.name}</p>
                        <p className="text-sm text-muted-foreground">{bp.size}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Budget</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-success" />
                      <p className="text-2xl font-bold text-success">{"<"}2.5s</p>
                      <p className="text-sm text-muted-foreground">LCP Target</p>
                    </div>
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <Zap className="h-8 w-8 mx-auto mb-2 text-success" />
                      <p className="text-2xl font-bold text-success">{"<"}100ms</p>
                      <p className="text-sm text-muted-foreground">FID Target</p>
                    </div>
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-success" />
                      <p className="text-2xl font-bold text-success">{"<"}0.1</p>
                      <p className="text-sm text-muted-foreground">CLS Target</p>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <Database className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold text-primary">{"<"}500KB</p>
                      <p className="text-sm text-muted-foreground">Bundle Size</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Checklist de Deploy */}
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-success" />
                Checklist de Deploy
              </h2>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold mb-4">Pré-deploy</h4>
                      <ul className="space-y-2">
                        {[
                          "Rodar npm run build sem erros",
                          "Verificar console sem warnings críticos",
                          "Testar navegação por teclado",
                          "Validar contraste WCAG AA",
                          "Testar em 3 breakpoints (mobile, tablet, desktop)",
                          "Verificar meta tags OG e Twitter"
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-4">Pós-deploy</h4>
                      <ul className="space-y-2">
                        {[
                          "Lighthouse score > 90 em todas categorias",
                          "Testar CTAs de WhatsApp (links corretos)",
                          "Verificar iFrame do diagnóstico carrega",
                          "Testar exit intent modal",
                          "Validar PWA instala corretamente",
                          "Configurar analytics (Clarity, GA)"
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-muted-foreground shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>
        </Tabs>

        {/* Footer da documentação */}
        <Separator className="my-12" />
        <footer className="text-center text-muted-foreground">
          <p className="mb-2">
            Documentação criada por <strong>Guilherme Puentes</strong>
          </p>
          <p className="text-sm">
            Product Designer | 14 anos de experiência | CTA Web Solutions ETI
          </p>
          <p className="text-sm mt-2">
            Portfolio: <a href="https://gscpweb.com.br" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">gscpweb.com.br</a>
          </p>
          <p className="text-xs mt-4 text-muted-foreground/60">
            Última atualização: Fevereiro 2026 | v1.1.0
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Handoff;
