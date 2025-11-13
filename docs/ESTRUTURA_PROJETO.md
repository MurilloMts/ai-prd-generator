# 📁 Estrutura do Projeto PRD-Gen

## 🎯 Estrutura Organizada

```
ai-prd-generator/
│
├── 📂 components/              # Componentes React
│   ├── icons/                  # Ícones SVG
│   ├── Editor.tsx              # Editor de anotações
│   ├── Header.tsx              # Cabeçalho com logo
│   ├── Preview.tsx             # Visualização do PRD
│   ├── Spinner.tsx             # Loading spinner
│   ├── TagInput.tsx            # Input de tags
│   └── TemplateSelector.tsx    # Seletor de templates
│
├── 📂 pages/                   # Páginas da aplicação
│   ├── DashboardPage.tsx       # Dashboard com métricas
│   ├── HistoryPage.tsx         # Histórico de PRDs
│   └── HomePage.tsx            # Página principal (gerador)
│
├── 📂 services/                # Serviços e lógica de negócio
│   ├── groqService.ts          # Integração com Groq (IA)
│   ├── storageService.ts       # LocalStorage management
│   └── templateService.ts      # Templates de PRD
│
├── 📂 docs/                    # 📚 Documentação completa
│   ├── INDEX.md                # Índice da documentação
│   ├── GUIA_RAPIDO.md          # Guia rápido
│   ├── CONFIGURAR_GROQ.md      # Setup do Groq
│   ├── MELHORIAS_PRD_GROQ.md   # Melhorias Enterprise
│   ├── PRD_PROFISSIONAL_COMPLETO.md  # Estrutura do PRD
│   ├── DASHBOARD_COMPLETO.md   # Documentação do Dashboard
│   ├── CALCULO_PRECOS_REALISTA.md  # Cálculo de preços
│   ├── ATUALIZACAO_MOEDA_BRL.md  # Atualização para BRL
│   ├── ESTRATEGIA_HIBRIDA.md   # Estratégia Gemini + Groq
│   ├── CHANGELOG.md            # Histórico de mudanças
│   ├── RELEASE_NOTES_v1.1.0.md # Notas da v1.1.0
│   ├── RESUMO_FINAL_v1.1.0.md  # Resumo da v1.1.0
│   ├── ROADMAP_DETALHADO.md    # Roadmap de desenvolvimento
│   ├── SECURITY.md             # Políticas de segurança
│   ├── SPRINT1_COMPLETO.md     # Sprint 1
│   ├── MELHORIAS_IMPLEMENTADAS.md  # Melhorias
│   ├── INSTRUCOES.md           # Instruções detalhadas
│   └── ESTRUTURA_PROJETO.md    # Este arquivo
│
├── 📄 App.tsx                  # Componente raiz da aplicação
├── 📄 index.tsx                # Entry point
├── 📄 types.ts                 # TypeScript types e interfaces
├── 📄 index.css                # Estilos globais
├── 📄 index.html               # HTML principal
│
├── ⚙️ vite.config.ts           # Configuração do Vite
├── ⚙️ tsconfig.json            # Configuração do TypeScript
├── ⚙️ package.json             # Dependências e scripts
├── ⚙️ .env.local               # Variáveis de ambiente (API keys)
├── ⚙️ .gitignore               # Arquivos ignorados pelo Git
│
├── 📖 README.md                # README principal
└── 📊 metadata.json            # Metadados do projeto
```

## 🎨 Organização por Responsabilidade

### 🖼️ Interface (UI)
```
components/
├── Layout Components
│   └── Header.tsx              # Navegação e logo
│
├── Input Components
│   ├── Editor.tsx              # Editor de texto
│   ├── TagInput.tsx            # Input de tags
│   └── TemplateSelector.tsx    # Seletor de templates
│
├── Display Components
│   ├── Preview.tsx             # Visualização do PRD
│   └── Spinner.tsx             # Loading indicator
│
└── Icons
    └── icons/                  # Ícones SVG customizados
```

### 📄 Páginas (Routes)
```
pages/
├── HomePage.tsx                # / - Gerador de PRD
├── DashboardPage.tsx           # /dashboard - Métricas
└── HistoryPage.tsx             # /history - Histórico
```

### 🔧 Serviços (Business Logic)
```
services/
├── groqService.ts              # IA (Groq)
│   ├── generateInitialPrd()    # Gera PRD inicial
│   └── generatePrdDetails()    # Gera análises
│
├── storageService.ts           # Persistência
│   ├── savePrd()               # Salva PRD
│   ├── getAllPrds()            # Lista PRDs
│   ├── deletePrd()             # Remove PRD
│   └── setPrdForViewing()      # Marca para visualização
│
└── templateService.ts          # Templates
    ├── getTemplates()          # Lista templates
    └── getTemplatePrompt()     # Retorna prompt do template
```

### 📚 Documentação
```
docs/
├── 🚀 Início Rápido
│   ├── INDEX.md                # Índice geral
│   ├── GUIA_RAPIDO.md          # Quick start
│   └── CONFIGURAR_GROQ.md      # Setup
│
├── 🎯 Funcionalidades
│   ├── MELHORIAS_PRD_GROQ.md   # Melhorias Enterprise
│   ├── PRD_PROFISSIONAL_COMPLETO.md  # Estrutura PRD
│   └── DASHBOARD_COMPLETO.md   # Dashboard
│
├── 💰 Estimativas
│   ├── CALCULO_PRECOS_REALISTA.md  # Cálculos
│   └── ATUALIZACAO_MOEDA_BRL.md  # Moeda BRL
│
├── 🔄 Estratégias
│   └── ESTRATEGIA_HIBRIDA.md   # Gemini + Groq
│
├── 📋 Releases
│   ├── CHANGELOG.md            # Histórico
│   ├── RELEASE_NOTES_v1.1.0.md # v1.1.0
│   ├── RESUMO_FINAL_v1.1.0.md  # Resumo
│   └── ROADMAP_DETALHADO.md    # Roadmap
│
├── 🛠️ Desenvolvimento
│   ├── SPRINT1_COMPLETO.md     # Sprint 1
│   ├── MELHORIAS_IMPLEMENTADAS.md  # Melhorias
│   └── INSTRUCOES.md           # Instruções
│
└── 🔒 Segurança
    └── SECURITY.md             # Políticas
```

## 📊 Fluxo de Dados

```
┌─────────────────────────────────────────────────────┐
│                    HomePage.tsx                      │
│  (Orquestra todo o fluxo)                           │
└─────────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  Editor.tsx  │ │ Preview.tsx  │ │TemplateSelector│
│              │ │              │ │              │
│ - Input      │ │ - Display    │ │ - Templates  │
│ - Templates  │ │ - Edit       │ │              │
│ - Generate   │ │ - Export     │ │              │
└──────────────┘ └──────────────┘ └──────────────┘
        │               │               │
        └───────────────┼───────────────┘
                        ▼
        ┌───────────────────────────────┐
        │     groqService.ts            │
        │  (Geração de PRD com IA)      │
        └───────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Initial PRD  │ │   Details    │ │   Analysis   │
│              │ │              │ │              │
│ - Title      │ │ - Questions  │ │ - Security   │
│ - Markdown   │ │ - Assumptions│ │ - Estimates  │
│              │ │ - VibeCoding │ │ - Score      │
└──────────────┘ └──────────────┘ └──────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │   storageService.ts           │
        │  (Persistência LocalStorage)  │
        └───────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│HistoryPage   │ │DashboardPage │ │  Export      │
│              │ │              │ │              │
│ - List PRDs  │ │ - Metrics    │ │ - PDF        │
│ - Search     │ │ - Charts     │ │ - Markdown   │
│ - Filter     │ │ - Insights   │ │ - HTML       │
└──────────────┘ └──────────────┘ └──────────────┘
```

## 🎯 Convenções de Código

### Nomenclatura
- **Componentes**: PascalCase (ex: `HomePage.tsx`)
- **Services**: camelCase com sufixo `Service` (ex: `groqService.ts`)
- **Types**: PascalCase (ex: `PrdResponse`)
- **Funções**: camelCase (ex: `generateInitialPrd`)

### Estrutura de Arquivos
- **Componentes**: Um componente por arquivo
- **Services**: Funções relacionadas agrupadas
- **Types**: Centralizados em `types.ts`
- **Estilos**: Tailwind CSS inline

### Imports
```typescript
// 1. React e bibliotecas externas
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// 2. Types
import { PrdResponse } from '../types';

// 3. Components
import Editor from '../components/Editor';

// 4. Services
import { generateInitialPrd } from '../services/groqService';
```

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento

# Build
npm run build            # Compila para produção
npm run preview          # Preview da build

# Linting
npm run lint             # Verifica código
```

## 📦 Dependências Principais

### Produção
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Roteamento
- `groq-sdk` - Cliente Groq
- `@google/genai` - Cliente Gemini (backup)
- `marked` - Markdown parser

### Desenvolvimento
- `vite` - Build tool
- `typescript` - Type safety
- `@vitejs/plugin-react` - React plugin

## 🔐 Variáveis de Ambiente

```bash
# .env.local
GROQ_API_KEY=gsk_...           # API Key do Groq (principal)
GEMINI_API_KEY=AIza...         # API Key do Gemini (backup)
```

## 📝 Notas Importantes

### ✅ Boas Práticas Implementadas
- Separação clara de responsabilidades
- Componentes reutilizáveis
- Services isolados
- Types centralizados
- Documentação organizada
- Código limpo e legível

### 🎯 Próximos Passos
- Backend API (Node.js + Express)
- Banco de dados (PostgreSQL)
- Autenticação (JWT)
- Testes automatizados
- CI/CD pipeline

---

**Versão**: 1.3.0 Enterprise Edition  
**Última atualização**: 13/11/2024
