# CI/CD Pipeline

Este diretório contém os workflows de CI/CD para o projeto web_s2mangas.

## Workflows Disponíveis

### `ci-cd.yml`

Pipeline principal que executa:

#### Continuous Integration (CI)
- **Checkout**: Baixa o código do repositório
- **Setup Node.js**: Configura o ambiente Node.js 20
- **Instalação de dependências**: Executa `npm ci` para instalar dependências
- **Verificação de formato**: Verifica se o código está formatado corretamente
- **Verificação de tipos**: Executa verificação de tipos TypeScript
- **Build**: Compila o projeto com Vite
- **Upload de artifacts**: Salva os arquivos de build para uso posterior

#### Continuous Deployment (CD)
- **Deploy para GitHub Pages**: Publica automaticamente na branch `gh-pages`
- **Apenas na branch main**: O deploy só acontece quando há push na branch principal
- **Permissões**: Configuradas para GitHub Pages

#### Notificações
- **Sucesso**: Notifica quando o pipeline é executado com sucesso
- **Falha**: Notifica quando há erros no pipeline

## Triggers

O workflow é executado quando:
- Há push nas branches `main` ou `develop`
- Há pull request para as branches `main` ou `develop`

## Configuração Necessária

### GitHub Pages
1. Vá para Settings > Pages no seu repositório
2. Configure a source como "GitHub Actions"
3. Certifique-se de que as permissões estão habilitadas

### Secrets (se necessário)
- `GITHUB_TOKEN`: Automático, não precisa configurar

## Estrutura de Branches

- `main`: Branch principal, deploy automático
- `develop`: Branch de desenvolvimento, apenas CI
- `gh-pages`: Branch gerada automaticamente pelo deploy

## Comandos Locais Úteis

```bash
# Verificar tipos TypeScript
npm run type-check

# Build local
npm run build

# Preview do build
npm run preview
```

## Troubleshooting

### Erro de permissões
Se o deploy falhar por permissões, verifique:
1. Se GitHub Pages está habilitado
2. Se as permissões do workflow estão corretas
3. Se o repositório é público ou tem GitHub Pages habilitado

### Erro de build
Se o build falhar:
1. Execute `npm run build` localmente
2. Verifique se todas as dependências estão instaladas
3. Verifique se há erros de TypeScript com `npm run type-check`
