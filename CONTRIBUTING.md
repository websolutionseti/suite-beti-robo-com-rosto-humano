# 🤝 Guia de Contribuição - Suíte BETI

Obrigado por considerar contribuir para a Suíte BETI! Este documento contém diretrizes para contribuições ao projeto.

## 📋 Sumário
- [Como Contribuir](#como-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Padrões de Código](#padrões-de-código)
- [Processo de Desenvolvimento](#processo-de-desenvolvimento)
- [Padrões de Commit](#padrões-de-commit)
- [Pull Requests](#pull-requests)
- [Relatório de Bugs](#relatório-de-bugs)
- [Solicitação de Features](#solicitação-de-features)

## 🚀 Como Contribuir

### 1. Fork do Repositório
```bash
git clone https://github.com/seu-usuario/suite-beti-chatbot-ai.git
cd suite-beti-chatbot-ai
```

### 2. Configuração do Ambiente
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Executar testes
npm run test

# Executar linting
npm run lint
```

### 3. Criar uma Branch
```bash
git checkout -b feature/nova-funcionalidade
# ou
git checkout -b fix/correcao-bug
```

## ⚙️ Configuração do Ambiente

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Docker (opcional)

### Variáveis de Ambiente
Crie um arquivo `.env.local` baseado no `.env.example`:
```bash
cp .env.example .env.local
```

### Docker (Opcional)
```bash
# Desenvolvimento
docker-compose up beti-dev

# Produção
docker-compose up beti-prod
```

## 📏 Padrões de Código

### TypeScript
- Use TypeScript para todos os novos arquivos
- Defina tipos explícitos sempre que possível
- Evite `any`, prefira `unknown` quando necessário

### React
- Use componentes funcionais com hooks
- Implemente prop-types ou TypeScript interfaces
- Mantenha componentes pequenos e focados
- Use memo() para otimização quando apropriado

### Tailwind CSS
- Use classes utilitárias do Tailwind
- Siga o design system definido em `index.css`
- Use tokens semânticos (ex: `text-primary` ao invés de `text-blue-500`)
- Mantenha responsividade (mobile-first)

### Acessibilidade
- Siga diretrizes WCAG 2.1 AA
- Use elementos semânticos HTML
- Implemente navegação por teclado
- Adicione ARIA labels quando necessário
- Teste com leitores de tela

## 🔄 Processo de Desenvolvimento

### 1. Desenvolvimento
```bash
# Executar em desenvolvimento
npm run dev

# Executar testes durante desenvolvimento
npm run test:watch
```

### 2. Antes do Commit
```bash
# Executar todos os testes
npm run test

# Verificar linting
npm run lint

# Verificar tipos TypeScript
npm run type-check

# Executar build
npm run build
```

### 3. Testes
- Escreva testes para novas funcionalidades
- Mantenha cobertura de testes acima de 80%
- Teste componentes isoladamente
- Teste integração quando apropriado

## 📝 Padrões de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/) em português:

### Tipos de Commit
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação, espaços em branco
- `refactor`: Refatoração sem mudança funcional
- `test`: Adição ou correção de testes
- `chore`: Tarefas de manutenção

### Exemplos
```bash
feat: adiciona menu de acessibilidade flutuante
fix: corrige navegação por teclado no menu principal
docs: atualiza documentação de deploy
style: ajusta responsividade dos cards de preço
refactor: reorganiza componentes de seção
test: adiciona testes para AccessibilityMenu
chore: atualiza dependências do projeto
```

### Formato Completo
```
tipo(escopo): descrição

[corpo opcional]

[rodapé opcional]
```

## 🔀 Pull Requests

### Antes de Abrir um PR
- [ ] Certifique-se que os testes passam
- [ ] Verifique se o linting passa
- [ ] Atualize a documentação se necessário
- [ ] Teste em diferentes navegadores
- [ ] Verifique acessibilidade
- [ ] Teste responsividade

### Template do PR
Use o template padrão que inclui:
- Descrição das mudanças
- Tipo de mudança
- Como foi testado
- Screenshots (se aplicável)
- Checklist de verificação

### Processo de Review
1. Pelo menos 1 aprovação necessária
2. Todos os checks CI/CD devem passar
3. Não deve haver conflitos com a branch main
4. Código deve seguir os padrões estabelecidos

## 🐛 Relatório de Bugs

### Antes de Reportar
- Verifique se o bug já não foi reportado
- Teste em diferentes navegadores
- Reproduza o bug consistentemente

### Informações Necessárias
- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots/vídeos quando aplicável
- Informações do sistema/navegador
- Logs de console

## ✨ Solicitação de Features

### Processo
1. Abra uma issue de feature request
2. Descreva o problema que a feature resolve
3. Proponha uma solução
4. Considere alternativas
5. Aguarde feedback da comunidade

### Critérios de Avaliação
- Alinhamento com objetivos do projeto
- Impacto nos usuários
- Complexidade de implementação
- Manutenibilidade
- Performance

## 🎯 Áreas de Contribuição

### Frontend
- Componentes React
- Estilos e animações
- Otimizações de performance
- Acessibilidade
- Responsividade

### Infraestrutura
- Configurações Docker
- CI/CD pipelines
- Monitoramento
- Segurança

### Documentação
- README e guias
- Comentários de código
- Tutoriais
- Exemplos

### Testes
- Testes unitários
- Testes de integração
- Testes de acessibilidade
- Testes de performance

## 🆘 Suporte

### Onde Buscar Ajuda
- Issues do GitHub para problemas técnicos
- Discussions para perguntas gerais
- Email: contato@websolutions.eti.br

### Canais de Comunicação
- GitHub Issues: Bugs e features
- GitHub Discussions: Perguntas e ideias
- WhatsApp: Suporte comercial

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença MIT do projeto.

---

**Obrigado por contribuir para a Suíte BETI! 🚀**