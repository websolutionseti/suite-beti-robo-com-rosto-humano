# ⚙️ HandOff Back-end | Suíte BETI

> **Autor:** Guilherme Puentes - Product Designer & CTA Web Solutions ETI  
> **Portfolio:** [gscpweb.com.br](https://gscpweb.com.br)  
> **Versão:** 1.1.0  
> **Última atualização:** Fevereiro 2026

---

## 📋 Índice

1. [Arquitetura](#-arquitetura)
2. [Integrações Externas](#-integrações-externas)
3. [Endpoints e URLs](#-endpoints-e-urls)
4. [Fluxo de Dados](#-fluxo-de-dados)
5. [n8n Webhooks](#-n8n-webhooks)
6. [Analytics & Tracking](#-analytics--tracking)
7. [SEO & Meta Tags](#-seo--meta-tags)
8. [Deploy & Infraestrutura](#-deploy--infraestrutura)
9. [Variáveis de Configuração](#-variáveis-de-configuração)
10. [Monitoramento](#-monitoramento)

---

## 🏗 Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTE                                  │
│                    (Browser/PWA)                                 │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LOVABLE CLOUD                                 │
│                   (Static Hosting)                               │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  React SPA + Vite Build                                  │    │
│  │  - CSR (Client-Side Rendering)                           │    │
│  │  - Service Worker (PWA)                                  │    │
│  │  - Assets CDN                                            │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────┬───────────────────────────────────────────┘
                      │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│   n8n       │ │  WhatsApp   │ │  link.      │
│  Webhooks   │ │  Business   │ │  online.    │
│  (Forms)    │ │     API     │ │  des.br     │
└─────────────┘ └─────────────┘ └─────────────┘
```

### Características

- **Serverless:** Sem backend próprio
- **JAMstack:** JavaScript, APIs, Markup
- **Edge-first:** CDN global
- **PWA:** Instalável como app

---

## 🔗 Integrações Externas

### 1. n8n (Automação)

Plataforma de automação para processamento de leads.

| Endpoint | Propósito |
|----------|-----------|
| `/webhook/beti-diagnostico` | Recebe formulário de diagnóstico |
| `/webhook/beti-briefing` | Recebe solicitações de briefing |

**Fluxo típico n8n:**
1. Recebe dados do formulário
2. Valida e enriquece dados
3. Cria lead no CRM
4. Envia notificação WhatsApp
5. Dispara email de follow-up

### 2. WhatsApp Business API

Integração via links diretos (click-to-chat).

```
https://wa.me/{numero}?text={mensagem_encoded}
```

**Números configurados:**
- **CCO (Vendas):** +55 12 99152-8871
- **SDR (Qualificação):** +55 12 99231-7773

### 3. link.online.des.br (URL Shortener)

Serviço de encurtamento de URLs customizado.

| URL Curta | Destino |
|-----------|---------|
| `/webform-beti_acelerador` | Formulário n8n de diagnóstico |
| `/suite-mei` | WhatsApp MEI |
| `/suite-pe` | WhatsApp Pequenas Empresas |
| `/suite-em` | WhatsApp Enterprise |
| `/catalogo.pdf` | Catálogo de produtos |

---

## 🌐 Endpoints e URLs

### URLs de Produção

```yaml
Frontend:
  preview: https://id-preview--366ad5e4-319f-40f1-8072-3d80af01f580.lovable.app
  production: https://suite-beti-robo-com-rosto-humano.lovable.app

Formulário:
  diagnostico: https://link.online.des.br/webform-beti_acelerador
  briefing: https://websolutions.eti.br/briefing

WhatsApp:
  cco: https://wa.me/5512991528871
  sdr: https://wa.me/5512992317773

Recursos:
  catalogo: https://link.online.des.br/catalogo.pdf
```

### Estrutura de Rotas SPA

```
/                    → Landing page
/handoff02026        → Documentação UX/UI (interno)
/*                   → 404 Not Found
```

---

## 📊 Fluxo de Dados

### Lead Generation Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Usuário   │────▶│  CTA Click  │────▶│   Modal     │
│   Visita    │     │  (Botão)    │     │  Diagnóstico│
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                                               ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   CRM       │◀────│    n8n      │◀────│   iFrame    │
│   Update    │     │  Webhook    │     │  Form       │
└─────────────┘     └─────────────┘     └─────────────┘
                          │
                          ▼
                    ┌─────────────┐
                    │  WhatsApp   │
                    │  Notificação│
                    └─────────────┘
```

### Exit Intent Recovery

```
User Mouse Leave Viewport
         │
         ▼
    Delay 5 seconds
         │
         ▼
    Show Modal
         │
    ┌────┴────┐
    ▼         ▼
 Dismiss   Click CTA
    │         │
    ▼         ▼
  Close    WhatsApp
```

---

## 🔧 n8n Webhooks

### Estrutura do Payload (Diagnóstico)

```json
{
  "timestamp": "2026-02-06T20:00:00Z",
  "source": "suite-beti-landing",
  "data": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "company": "string",
    "segment": "string",
    "monthly_leads": "number",
    "current_solution": "string",
    "pain_points": ["string"],
    "budget_range": "string",
    "urgency": "low|medium|high"
  },
  "metadata": {
    "utm_source": "string",
    "utm_medium": "string",
    "utm_campaign": "string",
    "referrer": "string",
    "device": "mobile|desktop|tablet",
    "visitor_count": "number"
  }
}
```

### Campos do Formulário

| Campo | Tipo | Obrigatório | Validação |
|-------|------|-------------|-----------|
| name | string | ✅ | min 2 chars |
| email | string | ✅ | email format |
| phone | string | ✅ | BR format |
| company | string | ❌ | - |
| segment | select | ✅ | enum |
| monthly_leads | number | ❌ | >= 0 |

---

## 📈 Analytics & Tracking

### Eventos Customizados

```javascript
// Eventos rastreados
const events = {
  'page_view': { section: 'hero|problem|solution|benefits|pricing|cta' },
  'cta_click': { button: 'diagnostico|whatsapp|briefing|demo' },
  'modal_open': { type: 'diagnostico|exit_intent' },
  'modal_close': { type: 'diagnostico|exit_intent', completed: boolean },
  'whatsapp_click': { profile: 'mei|pe|enterprise' },
  'scroll_depth': { percentage: number },
  'time_on_page': { seconds: number },
  'pwa_install': { prompt_shown: boolean, accepted: boolean }
};
```

### Ferramentas de Analytics

| Ferramenta | Propósito |
|------------|-----------|
| Microsoft Clarity | Heatmaps, session recordings |
| Google Analytics | Tráfego, conversões |
| Meta Pixel | Remarketing Facebook/Instagram |
| LinkedIn Insight | B2B tracking |
| TikTok Pixel | Performance ads |

### localStorage Keys

```javascript
const storageKeys = {
  'beti_visitor_count': 'number',      // Contador de visitantes
  'beti_font_scale': '14|16|18|20|24', // Escala de fonte
  'beti_high_contrast': 'boolean',     // Modo alto contraste
  'beti_colorblind_mode': 'none|protanopia|deuteranopia|tritanopia',
  'beti_exit_modal_shown': 'boolean',  // Exit intent já exibido
  'beti_pwa_dismissed': 'boolean'      // PWA prompt dispensado
};
```

---

## 🔍 SEO & Meta Tags

### Meta Tags Essenciais

```html
<title>Suíte BETI - Chatbot IA com Rosto Humano | Automação de Atendimento WhatsApp</title>
<meta name="description" content="Transforme seu atendimento com automação inteligente. 
  +150% conversões, -50% custos, disponível 24/7. ROI garantido em 90 dias.">
<meta name="keywords" content="chatbot, ia, whatsapp, automação, atendimento, vendas">
```

### Open Graph

```html
<meta property="og:title" content="Suíte BETI - Atendimento Inteligente">
<meta property="og:description" content="Automação com empatia, tecnologia e resultados.">
<meta property="og:image" content="/beti-hero.webp">
<meta property="og:url" content="https://suite-beti-robo-com-rosto-humano.lovable.app">
<meta property="og:type" content="website">
```

### Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Suíte BETI",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "127"
  }
}
```

---

## 🚀 Deploy & Infraestrutura

### Ambientes

| Ambiente | URL | Propósito |
|----------|-----|-----------|
| Preview | `id-preview--*.lovable.app` | Testes internos |
| Production | `suite-beti-*.lovable.app` | Produção |
| Custom Domain | `beti.websolutionseti.com.br` | Futuro |

### CI/CD Pipeline

```yaml
# GitHub Actions workflow
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    - Checkout
    - Install dependencies
    - Lint
    - Build
    - Deploy to Lovable
```

### Docker (Self-hosting)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## ⚙️ Variáveis de Configuração

### Hardcoded no Código

O projeto não utiliza variáveis de ambiente. Todas as configurações são hardcoded:

```typescript
// src/components/sections/HeroSection.tsx
const whatsappUrl = "https://wa.me/5512991528871?text=...";
const briefingUrl = "https://websolutions.eti.br/briefing";

// src/components/DiagnosticoModal.tsx
const diagnosticoUrl = "https://link.online.des.br/webform-beti_acelerador";

// src/components/sections/PricingSection.tsx
const whatsappMEI = "https://link.online.des.br/suite-mei";
const whatsappPE = "https://link.online.des.br/suite-pe";
const whatsappEM = "https://link.online.des.br/suite-em";
```

### Para Futuras Expansões

Se necessário adicionar variáveis de ambiente:

```env
# .env.example
VITE_WHATSAPP_CCO=5512991528871
VITE_WHATSAPP_SDR=5512992317773
VITE_DIAGNOSTICO_URL=https://link.online.des.br/webform-beti_acelerador
VITE_GA_ID=G-XXXXXXXXXX
VITE_CLARITY_ID=XXXXXXXXXX
```

---

## 📡 Monitoramento

### Health Checks

| Check | Endpoint | Frequência |
|-------|----------|------------|
| Uptime | `/` | 1 min |
| n8n Webhook | `/health` (n8n) | 5 min |
| WhatsApp Link | `wa.me/...` | 1 hora |

### Alertas Recomendados

```yaml
alerts:
  - name: "Site Down"
    condition: "response_time > 5s OR status != 200"
    channel: "whatsapp_cco"
    
  - name: "Form Submission Failed"
    condition: "n8n_webhook_error"
    channel: "email_ti"
    
  - name: "High Bounce Rate"
    condition: "bounce_rate > 60%"
    channel: "slack_marketing"
```

### Logs Importantes

```javascript
// Eventos críticos para monitorar
console.log('[BETI] Form submitted:', { timestamp, data });
console.log('[BETI] WhatsApp clicked:', { profile, timestamp });
console.log('[BETI] Exit intent triggered:', { visitor_count });
console.log('[BETI] PWA installed:', { timestamp });
```

---

## 🔒 Segurança

### Headers Recomendados

```nginx
# nginx.conf
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; frame-src link.online.des.br;" always;
```

### CORS

O iFrame do diagnóstico requer que `link.online.des.br` permita embedding:

```
X-Frame-Options: ALLOW-FROM https://suite-beti-robo-com-rosto-humano.lovable.app
```

---

**Desenvolvido com 💙 por Guilherme Puentes**

*Product Designer | 14 anos de experiência | Web Solutions ETI*
