# 🚀 Guia de Deploy - Suíte BETI

Este documento contém instruções detalhadas para deploy da Suíte BETI em diferentes ambientes.

## 📋 Sumário
- [Deploy com Docker](#deploy-com-docker)
- [Deploy na Vercel](#deploy-na-vercel)
- [Deploy na Netlify](#deploy-na-netlify)
- [Deploy na AWS](#deploy-na-aws)
- [Deploy no Google Cloud](#deploy-no-google-cloud)
- [Configurações de Produção](#configurações-de-produção)
- [Monitoramento](#monitoramento)

## 🐳 Deploy com Docker

### Docker Hub
A imagem está disponível no Docker Hub:
```bash
docker pull websolutions-eti/suite-beti:latest
```

### Execução Rápida
```bash
# Executar container
docker run -d \
  --name suite-beti \
  -p 80:80 \
  websolutions-eti/suite-beti:latest
```

### Docker Compose (Recomendado)
```bash
# Clone o repositório
git clone https://github.com/websolutions-eti/suite-beti-chatbot-ai.git
cd suite-beti-chatbot-ai

# Executar em produção
docker-compose up -d beti-prod

# Verificar status
docker-compose ps
```

### Build Local
```bash
# Build da imagem
docker build -t suite-beti:local .

# Executar
docker run -d -p 80:80 suite-beti:local
```

## ☁️ Deploy na Vercel

### Deploy Automático via GitHub
1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push na branch `main`

### Deploy via CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Configuração (`vercel.json`)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## 🌐 Deploy na Netlify

### Deploy via Git
1. Conecte repositório ao Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Deploy via CLI
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

### Configuração (`netlify.toml`)
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

## ☁️ Deploy na AWS

### AWS S3 + CloudFront
```bash
# Build do projeto
npm run build

# Sync com S3
aws s3 sync dist/ s3://seu-bucket-name --delete

# Invalidar cache do CloudFront
aws cloudfront create-invalidation \
  --distribution-id SEU_DISTRIBUTION_ID \
  --paths "/*"
```

### AWS ECS com Docker
```yaml
# ecs-task-definition.json
{
  "family": "suite-beti",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::ACCOUNT:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "suite-beti",
      "image": "websolutions-eti/suite-beti:latest",
      "portMappings": [
        {
          "containerPort": 80,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/suite-beti",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

## 🌍 Deploy no Google Cloud

### Cloud Run
```bash
# Build e push da imagem
gcloud builds submit --tag gcr.io/SEU_PROJECT_ID/suite-beti

# Deploy no Cloud Run
gcloud run deploy suite-beti \
  --image gcr.io/SEU_PROJECT_ID/suite-beti \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### App Engine
```yaml
# app.yaml
runtime: nodejs18

env_variables:
  NODE_ENV: production

handlers:
  - url: /.*
    static_files: dist/index.html
    upload: dist/index.html

  - url: /(.*)
    static_files: dist/\1
    upload: dist/(.*)
```

## ⚙️ Configurações de Produção

### Variáveis de Ambiente
```bash
# .env.production
NODE_ENV=production
VITE_APP_ENV=production
VITE_API_URL=https://api.seudominio.com
VITE_ANALYTICS_ID=seu_analytics_id
```

### Otimizações de Build
```typescript
// vite.config.ts (produção)
export default defineConfig({
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-accordion']
        }
      }
    }
  }
})
```

### Headers de Segurança
```nginx
# nginx.conf
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;" always;
```

## 📊 Monitoramento

### Health Check
```bash
# Verificar se a aplicação está funcionando
curl -f http://localhost/health || exit 1
```

### Logs
```bash
# Docker logs
docker logs suite-beti --follow

# Docker Compose logs
docker-compose logs -f beti-prod
```

### Métricas
- **Performance**: Lighthouse CI integrado
- **Uptime**: Pingdom ou UptimeRobot
- **Erros**: Sentry para tracking de erros
- **Analytics**: Google Analytics integrado

## 🔧 Troubleshooting

### Problemas Comuns

#### Build Falha
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Docker não Inicia
```bash
# Verificar logs
docker logs suite-beti

# Verificar porta
netstat -tulpn | grep :80
```

#### Performance Lenta
- Verificar otimizações de bundle
- Implementar lazy loading
- Configurar cache headers
- Otimizar imagens

### Comandos Úteis
```bash
# Verificar tamanho do bundle
npm run build -- --analyze

# Testar build localmente
npm run preview

# Verificar vulnerabilidades
npm audit

# Atualizar dependências
npm update
```

## 🚀 CI/CD Pipeline

O projeto inclui pipeline automatizado que:
- ✅ Executa testes e linting
- 🏗️ Faz build da aplicação
- 🐳 Constrói imagem Docker
- 📤 Faz push para Docker Hub
- 🚀 Deploy automático para produção
- 📊 Executa auditoria Lighthouse
- 🔒 Faz scanning de segurança

### Secrets Necessários
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

---

**Deploy realizado com sucesso! 🎉**

Para suporte: contato@websolutions.eti.br