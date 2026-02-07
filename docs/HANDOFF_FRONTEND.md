# 🎨 HandOff Front-end | Suíte BETI

> **Autor:** Guilherme Puentes - Product Designer & CTA Web Solutions ETI  
> **Portfolio:** [gscpweb.com.br](https://gscpweb.com.br)  
> **Versão:** 1.1.0  
> **Última atualização:** Fevereiro 2026

---

## 📋 Índice

1. [Stack Tecnológica](#-stack-tecnológica)
2. [Estrutura de Pastas](#-estrutura-de-pastas)
3. [Design System](#-design-system)
4. [Componentes](#-componentes)
5. [Hooks Customizados](#-hooks-customizados)
6. [Acessibilidade (A11y)](#-acessibilidade-a11y)
7. [PWA & Performance](#-pwa--performance)
8. [Rotas](#-rotas)
9. [Scripts](#-scripts)
10. [Convenções de Código](#-convenções-de-código)

---

## 🛠 Stack Tecnológica

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| React | 18.3+ | Framework principal |
| TypeScript | 5.x | Tipagem estática |
| Vite | 5.x | Bundler e dev server |
| Tailwind CSS | 3.x | Estilização utility-first |
| shadcn/ui | latest | Componentes base |
| React Router | 6.x | Roteamento SPA |
| TanStack Query | 5.x | State management assíncrono |
| Lucide React | latest | Ícones SVG |

---

## 📁 Estrutura de Pastas

```
src/
├── a11y/                     # 🦮 Acessibilidade
│   ├── AccessibilityMenu.tsx # Menu flutuante de a11y
│   ├── AccessibilityProvider.tsx
│   ├── ScreenReaderOnly.tsx  # Componente sr-only
│   ├── SkipLink.tsx          # Skip to main content
│   └── index.ts              # Barrel export
│
├── assets/                   # 📦 Assets importados via ES6
│   └── eti-logo.png
│
├── components/
│   ├── sections/             # 📄 Seções da landing page
│   │   ├── HeroSection.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── SolutionSection.tsx
│   │   ├── BenefitsSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── CtaSection.tsx
│   │   └── Footer.tsx
│   │
│   ├── ui/                   # 🎨 shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   │
│   ├── DiagnosticoModal.tsx  # Modal com iFrame n8n
│   ├── ExitIntentModal.tsx   # Modal de saída
│   ├── FloatingMenu.tsx      # Menu flutuante
│   ├── FloatingWhatsApp.tsx  # Botão WhatsApp
│   └── PWAButton.tsx         # Instalação PWA
│
├── hooks/                    # 🪝 React Hooks customizados
│   ├── useLanguage.tsx
│   ├── useColorblindSupport.tsx
│   ├── useConditionalExport.tsx
│   ├── useInteractionTracker.tsx
│   └── use-mobile.tsx
│
├── imagem/                   # 🖼 Imagens do projeto
│   ├── beti-hero.webp
│   ├── favicon.png
│   └── logo-beti.png
│
├── pages/                    # 📱 Páginas da aplicação
│   ├── Index.tsx             # Landing page
│   ├── Handoff.tsx           # Documentação UX/UI
│   └── NotFound.tsx          # 404
│
├── App.tsx                   # Root component
├── App.css                   # Estilos legados
├── index.css                 # 🎨 Design tokens
└── main.tsx                  # Entry point
```

---

## 🎨 Design System

### Tokens de Cor (index.css)

```css
:root {
  --primary: 220 90% 56%;        /* Azul BETI */
  --primary-glow: 230 85% 60%;   /* Gradientes */
  --accent: 240 80% 55%;         /* Destaques */
  --success: 142 76% 45%;        /* CTAs verdes */
  --success-glow: 160 90% 50%;   /* Gradiente verde */
  --destructive: 0 84% 60%;      /* Alertas */
  --muted: 215 25% 27%;          /* Backgrounds */
  --card: 215 28% 17%;           /* Cards */
}
```

### Classes de Gradiente

```css
.gradient-hero     /* from-primary via-primary-glow to-accent */
.gradient-success  /* from-success via-success-glow to-emerald-400 */
.gradient-card     /* Background sutil para cards */
```

### Variantes de Botão (button.tsx)

| Variant | Uso |
|---------|-----|
| `success` | CTA primário (Gerar Diagnóstico) |
| `default` | Ações principais |
| `outline` | Ações secundárias |
| `outline-white` | Sobre fundos escuros |
| `ghost` | Links de navegação |
| `hero` | Hero section específico |

---

## 🧩 Componentes

### DiagnosticoModal

Modal que embute o formulário n8n via iFrame.

```tsx
import DiagnosticoModal from "@/components/DiagnosticoModal";

// Uso
<DiagnosticoModal variant="success" />
```

**Props:**
- `variant`: `"success" | "default"` - Estilo do botão trigger

### ExitIntentModal

Modal disparado quando o mouse sai do viewport.

**Comportamento:**
- Delay de 5 segundos antes de ativar
- Dispara apenas uma vez por sessão
- Exibe contador de visitantes (localStorage)

### FloatingWhatsApp

Botão flutuante para contato via WhatsApp.

**Comportamento:**
- Posição fixa bottom-right
- Animação de pulse
- Link pré-configurado com mensagem

### FloatingMenu

Menu de acessibilidade e utilidades.

**Recursos:**
- Ajuste de fonte (+/-)
- Modo alto contraste
- Suporte a daltonismo
- Tradução (futuro)

---

## 🪝 Hooks Customizados

### useLanguage

```tsx
const { language, setLanguage, t } = useLanguage();
```

Gerencia i18n do projeto.

### useColorblindSupport

```tsx
useColorblindSupport();
```

Aplica filtros CSS para daltonismo:
- Protanopia
- Deuteranopia
- Tritanopia

### useConditionalExport

```tsx
const { markInteraction, exportPreferences } = useConditionalExport();
```

Rastreia interações e exporta preferências A11y.

### useInteractionTracker

```tsx
const { trackWhatsAppInteraction, trackPricingInteraction } = useInteractionTracker();
```

Analytics de interações para otimização.

---

## ♿ Acessibilidade (A11y)

### WCAG 2.1 AA Compliance

- [x] Contraste mínimo 4.5:1
- [x] Focus states visíveis
- [x] Navegação por teclado
- [x] Skip links
- [x] Alt text em imagens
- [x] ARIA labels

### Features Inclusivas

```tsx
// Provider global
<AccessibilityProvider>
  <App />
</AccessibilityProvider>

// Skip link no topo
<SkipLink />
```

**Recursos:**
- Escala de fonte 14px-24px
- Modo alto contraste
- Suporte a 3 tipos de daltonismo
- Redução de movimento
- Text-to-Speech (aria-live)

---

## 📱 PWA & Performance

### manifest.json

```json
{
  "name": "BETI - Chatbot com Rosto Humano",
  "short_name": "BETI",
  "display": "standalone",
  "theme_color": "#000000"
}
```

### Performance Budget

| Métrica | Target |
|---------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Bundle | < 500KB |

### Otimizações

- Imagens em WebP
- Lazy loading
- Font subsetting
- Tree shaking
- Code splitting por rota

---

## 🛣 Rotas

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | `Index.tsx` | Landing page principal |
| `/handoff02026` | `Handoff.tsx` | Documentação UX/UI |
| `*` | `NotFound.tsx` | Página 404 |

---

## 📜 Scripts

```bash
# Desenvolvimento
npm run dev

# Build produção
npm run build

# Preview build
npm run preview

# Lint
npm run lint
```

---

## 📏 Convenções de Código

### Commits (Conventional Commits)

```
feat(hero): add diagnostic modal CTA
fix(a11y): improve color contrast in dark mode
docs(handoff): create frontend documentation
refactor(hooks): extract interaction tracking
```

### Nomenclatura

- **Componentes:** PascalCase (`HeroSection.tsx`)
- **Hooks:** camelCase com `use` prefix (`useLanguage.tsx`)
- **Utilitários:** camelCase (`formatDate.ts`)
- **Constantes:** UPPER_SNAKE_CASE (`API_BASE_URL`)

### Estrutura de Componente

```tsx
// Imports externos
import React from 'react';

// Imports internos
import { Button } from '@/components/ui/button';

// Types/Interfaces
interface Props {
  variant: 'primary' | 'secondary';
}

// Component
const MyComponent = ({ variant }: Props) => {
  return <div>...</div>;
};

export default MyComponent;
```

---

## 🚀 Deploy Checklist

### Pré-deploy

- [ ] `npm run build` sem erros
- [ ] Console sem warnings críticos
- [ ] Navegação por teclado testada
- [ ] Contraste WCAG AA validado
- [ ] Mobile, tablet, desktop testados
- [ ] Meta tags OG verificadas

### Pós-deploy

- [ ] Lighthouse > 90
- [ ] CTAs WhatsApp funcionando
- [ ] iFrame diagnóstico carregando
- [ ] Exit intent modal ativo
- [ ] PWA instalável
- [ ] Analytics configurado

---

**Desenvolvido com 💙 por Guilherme Puentes**

*Product Designer | 14 anos de experiência | Web Solutions ETI*
