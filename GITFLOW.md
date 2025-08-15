# 🌊 GitFlow Strategy - BETI Suite

## Overview
Este projeto segue a estratégia GitFlow para organização de branches e releases, garantindo um fluxo de desenvolvimento profissional e organizado.

## 📋 Branch Structure

### Main Branches
- **`main`** - Código de produção estável
- **`develop`** - Branch de integração para desenvolvimento

### Supporting Branches
- **`feature/*`** - Novas funcionalidades
- **`release/*`** - Preparação de releases
- **`hotfix/*`** - Correções urgentes em produção
- **`bugfix/*`** - Correções de bugs

## 🔀 Branch Workflow

### Feature Development
```bash
# Criar nova feature
git checkout develop
git pull origin develop
git checkout -b feature/nova-funcionalidade

# Desenvolver e commitar
git add .
git commit -m "feat(component): add new accessibility feature"

# Finalizar feature
git checkout develop
git merge feature/nova-funcionalidade
git branch -d feature/nova-funcionalidade
git push origin develop
```

### Release Process
```bash
# Criar release branch
git checkout develop
git checkout -b release/1.2.0

# Preparar release (bump version, changelog, etc.)
git commit -m "chore(release): prepare version 1.2.0"

# Merge para main
git checkout main
git merge release/1.2.0
git tag -a v1.2.0 -m "Release version 1.2.0"

# Merge de volta para develop
git checkout develop
git merge release/1.2.0
git branch -d release/1.2.0

# Push tudo
git push origin main develop --tags
```

### Hotfix Process
```bash
# Criar hotfix
git checkout main
git checkout -b hotfix/fix-critical-bug

# Corrigir e commitar
git commit -m "fix(auth): resolve critical login issue"

# Merge para main
git checkout main
git merge hotfix/fix-critical-bug
git tag -a v1.2.1 -m "Hotfix version 1.2.1"

# Merge para develop
git checkout develop
git merge hotfix/fix-critical-bug
git branch -d hotfix/fix-critical-bug

# Push
git push origin main develop --tags
```

## 📝 Conventional Commits

Todos os commits devem seguir o padrão [Conventional Commits](https://www.conventionalcommits.org/):

### Format
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types
- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Documentação
- **style**: Formatação (sem mudança funcional)
- **refactor**: Refatoração de código
- **perf**: Melhoria de performance
- **test**: Testes
- **build**: Sistema de build
- **ci**: Integração contínua
- **chore**: Manutenção geral
- **revert**: Reversão de commit

### Examples
```bash
feat(auth): add OAuth2 authentication
fix(ui): resolve button spacing issue
docs(readme): update installation instructions
style(components): format code according to eslint
refactor(hooks): optimize useAccessibility hook
perf(images): implement lazy loading
test(utils): add unit tests for validation helpers
build(docker): update Node.js version
ci(github): add automated security scanning
chore(deps): update dependencies
```

## 🏷️ Versioning Strategy

Seguimos [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Mudanças incompatíveis na API
- **MINOR** (0.1.0): Novas funcionalidades compatíveis
- **PATCH** (0.0.1): Correções de bugs

### Release Types
- **Alpha** (`1.0.0-alpha.1`): Desenvolvimento inicial
- **Beta** (`1.0.0-beta.1`): Funcionalidades completas, testes
- **RC** (`1.0.0-rc.1`): Release candidate
- **Stable** (`1.0.0`): Produção

## 🤖 Automation

### GitHub Actions
- **Commit Lint**: Valida formato dos commits
- **GitFlow Validation**: Verifica estratégia de branches
- **Auto-merge**: Merge automático de dependências
- **Release Notes**: Geração automática de changelog

### Protected Branches
- `main`: Requer PR review + CI passing
- `develop`: Requer CI passing

## 📊 Workflow Examples

### Daily Development
```bash
# Manhã - sincronizar
git checkout develop
git pull origin develop

# Criar feature
git checkout -b feature/menu-acessibilidade

# Trabalhar e commitar frequentemente
git commit -m "feat(a11y): add accessibility menu structure"
git commit -m "style(a11y): improve menu responsiveness"
git commit -m "test(a11y): add menu interaction tests"

# Finalizar feature
git push origin feature/menu-acessibilidade
# Criar PR via GitHub
```

### Emergency Hotfix
```bash
# Hotfix crítico
git checkout main
git pull origin main
git checkout -b hotfix/security-patch

# Corrigir
git commit -m "fix(security): patch XSS vulnerability"

# Deploy imediato
git push origin hotfix/security-patch
# Criar PR urgente via GitHub
```

## 🎯 Best Practices

### Branch Naming
- Use kebab-case: `feature/user-authentication`
- Seja descritivo: `bugfix/login-form-validation`
- Inclua issue number quando aplicável: `feature/123-dark-mode`

### Commit Messages
- Use presente imperativo: "add" não "added"
- Seja conciso mas descritivo
- Referencie issues: `fixes #123`
- Use body para contexto adicional

### Pull Requests
- Título claro e descritivo
- Descrição detalhada das mudanças
- Screenshots para mudanças visuais
- Link para issues relacionadas
- Request review de pelo menos 1 pessoa

## 🔍 Validation

O projeto inclui validação automática via GitHub Actions:

1. **Conventional Commits**: Verifica formato de commits
2. **GitFlow Rules**: Valida estratégia de branches
3. **Code Quality**: ESLint, TypeScript, testes
4. **Security**: Scanning de vulnerabilidades

## 📚 Resources

- [GitFlow Original](https://nvie.com/posts/a-successful-git-branching-model/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [GitHub Flow vs GitFlow](https://lucamezzalira.com/2014/03/10/git-flow-vs-github-flow/)

---

**Lembre-se**: A consistência é fundamental para um projeto profissional! 🚀