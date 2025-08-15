# 🚀 Guia de Commits Profissionais - BETI Suite v1.1.0

## 📋 Passo a Passo

### 1. **Preparação Inicial**
```bash
# Verificar status atual
git status
git branch -a

# Garantir que está na branch develop
git checkout develop
git pull origin develop
```

### 2. **Feature 1: Brand Identity Update**
```bash
# Criar branch
git checkout -b feature/brand-identity-update

# Commits específicos
git add public/favicon.ico public/pwa-beti-icon.png public/pwa-icon.png
git commit -m "feat(brand): update favicon and PWA icons to BETI branding

- Replace default favicon with BETI robot icon
- Update PWA icons with new brand identity
- Optimize icons for multiple resolutions
- Ensure cross-browser compatibility"

git add src/components/sections/CtaSection.tsx
git commit -m "feat(cta): add responsive BETI logo to CTA section

- Position logo on right for desktop (md+ screens)
- Display logo above text on mobile devices
- Add proper alt text for accessibility
- Implement responsive design patterns"

# Push feature
git push origin feature/brand-identity-update
```

### 3. **Feature 2: Accessibility Enhancements**
```bash
# Voltar para develop e criar nova branch
git checkout develop
git checkout -b feature/accessibility-enhancements

# Commits de acessibilidade
git add src/a11y/AccessibilityProvider.tsx
git commit -m "feat(a11y): implement global font scaling system

- Add font size adjustment from 14px to 24px
- Apply changes to document.documentElement
- Ensure consistent scaling across all components
- Remove hardcoded text size classes"

git add src/components/FloatingMenu.tsx
git commit -m "feat(a11y): add persistent font size with localStorage

- Save user preferences across browser sessions
- Implement graceful fallback to 16px default
- Add error handling for storage failures
- Provide visual feedback for font changes"

git add src/a11y/AccessibilityMenu.tsx
git commit -m "feat(a11y): improve screen reader announcements

- Add live regions for font size changes
- Enhance ARIA labels and descriptions
- Implement proper focus management
- Optimize accessibility menu performance"

# Push feature
git push origin feature/accessibility-enhancements
```

### 4. **Feature 3: Theme System Refactor**
```bash
# Nova branch para tema
git checkout develop
git checkout -b feature/theme-system-refactor

git add src/index.css tailwind.config.ts
git commit -m "refactor(theme): standardize dark mode implementation

- Consolidate theme switching logic across components
- Remove duplicate CSS variables and conflicts
- Ensure consistent color application
- Improve contrast ratios for accessibility compliance"

git add src/components/sections/
git commit -m "feat(theme): enhance theme consistency across components

- Update all sections for proper theme support
- Optimize spacing and typography scaling
- Add smooth transitions for theme changes
- Refine color palette for better visual harmony"

# Push feature
git push origin feature/theme-system-refactor
```

### 5. **Feature 4: Floating Menu Enhancement**
```bash
# Nova branch para menu
git checkout develop
git checkout -b feature/floating-menu-enhancement

git add src/components/FloatingMenu.tsx
git commit -m "feat(ui): redesign floating menu with enhanced UX

- Implement cleaner, more intuitive layout
- Add real-time stats display (font size, language)
- Improve mobile interaction patterns
- Add proper visual hierarchy and touch targets"

git add src/components/FloatingMenu.tsx
git commit -m "feat(ui): enhance contact modal with highlighted CTA

- Improve WhatsApp button prominence
- Add better visual separation in contact list
- Optimize layout for conversion
- Implement responsive design patterns"

# Push feature
git push origin feature/floating-menu-enhancement
```

### 6. **Merge Features para Develop**
```bash
# Voltar para develop
git checkout develop

# Merge sequencial das features
git merge feature/brand-identity-update
git merge feature/accessibility-enhancements
git merge feature/theme-system-refactor
git merge feature/floating-menu-enhancement

# Push develop atualizado
git push origin develop
```

### 7. **Criar Release Branch**
```bash
# Criar release branch
git checkout -b release/1.1.0

# Commit de preparação da release
git commit --allow-empty -m "chore(release): prepare version 1.1.0

- Complete brand identity update with BETI icons
- Enhanced accessibility with persistent font scaling
- Improved theme system with consistent dark mode
- Redesigned floating menu with better UX
- All features tested and ready for production"

# Push release branch
git push origin release/1.1.0
```

### 8. **Merge Final para Main**
```bash
# Merge para main
git checkout main
git pull origin main
git merge release/1.1.0

# Criar tag de versão
git tag -a v1.1.0 -m "Release BETI Suite v1.1.0

🎨 Brand Identity Update
- New BETI favicon and PWA icons
- Responsive logo in CTA section

♿ Accessibility Enhancements  
- Global font scaling (14px-24px)
- Persistent user preferences
- Enhanced screen reader support

🌙 Theme System Refactor
- Consistent dark mode implementation
- Improved contrast ratios
- Resolved CSS conflicts

🔄 Floating Menu Enhancement
- Redesigned UX with real-time stats
- Better mobile responsiveness
- Enhanced contact integration

📊 Quality Metrics
- WCAG 2.1 AA compliant
- Lighthouse 95+ performance maintained
- SEO optimized with new brand identity"

# Push tudo para GitHub
git push origin main
git push origin --tags
git push origin develop

# Limpeza das feature branches (opcional)
git branch -d feature/brand-identity-update
git branch -d feature/accessibility-enhancements
git branch -d feature/theme-system-refactor
git branch -d feature/floating-menu-enhancement
```

### 9. **Verificação Final**
```bash
# Verificar que tudo foi enviado
git log --oneline -10
git tag -l
git remote show origin
```

## 🎯 **Dicas Importantes**

1. **Commits Atômicos**: Cada commit deve representar uma mudança lógica específica
2. **Mensagens Descritivas**: Use o formato `type(scope): description` com body detalhado
3. **Teste Local**: Verifique que tudo funciona antes de cada push
4. **Branch Limpa**: Mantenha apenas as branches necessárias
5. **Tags Semânticas**: Use versionamento semântico (v1.1.0)

## 📝 **Checklist Final**
- [ ] Todas as features commitadas separadamente
- [ ] Mensagens de commit seguem padrão conventional
- [ ] Release branch criada e mergeada
- [ ] Tag de versão aplicada
- [ ] Código pushado para GitHub
- [ ] Deploy automático ativado

---
*Processo GitFlow profissional para BETI Suite - Documentação v1.1.0*