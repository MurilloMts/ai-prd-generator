import { PrdTemplate } from '../types';

export const PRD_TEMPLATES: PrdTemplate[] = [
  {
    id: 'mobile-app',
    name: 'Aplicativo Mobile',
    description: 'Template para desenvolvimento de aplicativos iOS/Android',
    category: 'mobile',
    structure: `# [Nome do App]

## 1. Visão Geral
- Plataformas: iOS / Android / Ambas
- Público-alvo:
- Problema a resolver:

## 2. Funcionalidades Principais
- Feature 1:
- Feature 2:
- Feature 3:

## 3. Fluxo do Usuário
- Onboarding:
- Navegação principal:
- Ações principais:

## 4. Requisitos Técnicos
- Autenticação:
- Armazenamento de dados:
- APIs necessárias:
- Notificações push:
- Offline mode:

## 5. Design e UX
- Estilo visual:
- Componentes principais:
- Acessibilidade:

## 6. Métricas de Sucesso
- KPIs:
- Metas:`,
  },
  {
    id: 'web-app',
    name: 'Aplicação Web',
    description: 'Template para aplicações web (SaaS, dashboards, etc)',
    category: 'web',
    structure: `# [Nome da Aplicação Web]

## 1. Introdução
- Propósito:
- Usuários-alvo:
- Problema a resolver:

## 2. Funcionalidades
### Core Features
- Feature 1:
- Feature 2:

### Features Secundárias
- Feature A:
- Feature B:

## 3. Arquitetura
- Frontend:
- Backend:
- Banco de dados:
- Infraestrutura:

## 4. Autenticação e Permissões
- Tipos de usuário:
- Níveis de acesso:

## 5. Integrações
- APIs externas:
- Webhooks:
- Serviços de terceiros:

## 6. Performance e Escalabilidade
- Requisitos de performance:
- Estratégia de cache:
- Escalabilidade:

## 7. Segurança
- Proteção de dados:
- Compliance:
- Backup:`,
  },
  {
    id: 'api',
    name: 'API / Backend',
    description: 'Template para desenvolvimento de APIs e serviços backend',
    category: 'api',
    structure: `# [Nome da API]

## 1. Visão Geral
- Propósito da API:
- Consumidores:
- Protocolo: REST / GraphQL / gRPC

## 2. Endpoints
### Autenticação
- POST /auth/login
- POST /auth/register

### Recursos Principais
- GET /resource
- POST /resource
- PUT /resource/:id
- DELETE /resource/:id

## 3. Modelos de Dados
### Entidade 1
- Campo 1: tipo
- Campo 2: tipo

## 4. Autenticação e Autorização
- Método: JWT / OAuth2 / API Key
- Scopes/Permissões:

## 5. Rate Limiting e Quotas
- Limites por usuário:
- Throttling:

## 6. Documentação
- Formato: OpenAPI / Swagger
- Exemplos de uso:

## 7. Monitoramento
- Logs:
- Métricas:
- Alertas:`,
  },
  {
    id: 'feature',
    name: 'Nova Feature',
    description: 'Template para adicionar uma nova funcionalidade a um produto existente',
    category: 'feature',
    structure: `# [Nome da Feature]

## 1. Contexto
- Produto atual:
- Por que essa feature?
- Problema do usuário:

## 2. Solução Proposta
- Descrição da feature:
- Como funciona:

## 3. User Stories
- Como [tipo de usuário], eu quero [ação] para [benefício]
- Como [tipo de usuário], eu quero [ação] para [benefício]

## 4. Requisitos Funcionais
- RF1:
- RF2:

## 5. Requisitos Não-Funcionais
- Performance:
- Segurança:
- Usabilidade:

## 6. Fora do Escopo
- O que NÃO será incluído:

## 7. Impacto
- Usuários afetados:
- Sistemas impactados:
- Dependências:

## 8. Critérios de Aceitação
- [ ] Critério 1
- [ ] Critério 2

## 9. Métricas
- Como medir sucesso:`,
  },
  {
    id: 'platform',
    name: 'Plataforma Completa',
    description: 'Template para plataformas complexas com múltiplos módulos',
    category: 'platform',
    structure: `# [Nome da Plataforma]

## 1. Visão Executiva
- Missão:
- Visão:
- Objetivos estratégicos:

## 2. Análise de Mercado
- Público-alvo:
- Concorrentes:
- Diferencial:

## 3. Arquitetura da Plataforma
### Módulos
- Módulo 1:
- Módulo 2:
- Módulo 3:

### Integrações
- Sistema A:
- Sistema B:

## 4. Personas
### Persona 1
- Nome:
- Papel:
- Necessidades:
- Pain points:

## 5. Jornada do Usuário
- Descoberta:
- Onboarding:
- Uso regular:
- Retenção:

## 6. Roadmap
### Fase 1 (MVP)
- Features essenciais:

### Fase 2
- Expansão:

### Fase 3
- Otimização:

## 7. Stack Tecnológica
- Frontend:
- Backend:
- Infraestrutura:
- DevOps:

## 8. Modelo de Negócio
- Monetização:
- Pricing:

## 9. Riscos e Mitigação
- Risco 1: Mitigação
- Risco 2: Mitigação

## 10. Métricas de Sucesso
- North Star Metric:
- KPIs secundários:`,
  },
  {
    id: 'custom',
    name: 'Personalizado',
    description: 'Comece do zero sem template pré-definido',
    category: 'custom',
    structure: '',
  },
];

export const getTemplateById = (id: string): PrdTemplate | undefined => {
  return PRD_TEMPLATES.find(t => t.id === id);
};

export const getTemplatesByCategory = (category: string): PrdTemplate[] => {
  return PRD_TEMPLATES.filter(t => t.category === category);
};
