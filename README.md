<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🚀 PRD-Gen - Enterprise Edition

Transforme suas ideias em **Product Requirements Documents (PRDs)** profissionais e extremamente completos em segundos usando Inteligência Artificial de última geração.

## ✨ Funcionalidades Principais

### 🎯 Geração Inteligente de PRDs
- **Geração em 2 fases**: Conteúdo inicial rápido + detalhes completos
- **5 templates profissionais**: Mobile, Web, API, Feature, Plataforma
- **Edição em tempo real**: Modifique e refine seus PRDs
- **Score de completude**: Avaliação automática da qualidade (0-100%)

### 💰 Análise e Estimativas
- **Estimativa de custos**: Valores em USD baseados em complexidade
- **Estimativa de horas**: Faixa mínima e máxima
- **Timeline do projeto**: Prazo em semanas
- **Breakdown detalhado**: Frontend, Backend, Design, Testing, Deployment
- **Tamanho do time**: Recomendação de pessoas necessárias

### 🔒 Análise de Segurança
- **Avaliação de risco**: Low, Medium, High
- **Identificação de vulnerabilidades**: Com severidade e mitigação
- **Recomendações de segurança**: Específicas para seu projeto
- **Compliance**: Notas sobre LGPD, GDPR, etc

### 📄 Exportação Profissional
- **PDF formatado**: Design profissional com metadados
- **Markdown**: Para documentação técnica
- **HTML**: Para integração web
- **Metadados incluídos**: Score, custos, segurança

### 📚 Outras Funcionalidades
- **Histórico de PRDs**: Salve e gerencie seus documentos
- **Versionamento**: Controle de versões automático
- **Questões em aberto**: Identificação de ambiguidades
- **Suposições**: Lista de premissas assumidas
- **Prompt VibeCoding**: Para implementação com IA

## 🚀 Como Executar

**Pré-requisitos:** Node.js 16+

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure sua API Key do Groq:**
   - Acesse: https://console.groq.com/keys
   - Crie uma conta gratuita
   - Copie sua chave
   - Edite o arquivo `.env.local`:
   ```
   GROQ_API_KEY=sua_chave_aqui
   ```
   
   📖 **Guia completo**: [docs/CONFIGURAR_GROQ.md](docs/CONFIGURAR_GROQ.md)

3. **Execute o app:**
   ```bash
   npm run dev
   ```

4. **Acesse:** http://localhost:3000

## 📖 Documentação Completa

Toda a documentação foi organizada na pasta **[docs/](docs/)**

- **[docs/INDEX.md](docs/INDEX.md)** - Índice completo da documentação
- **[docs/GUIA_RAPIDO.md](docs/GUIA_RAPIDO.md)** - Guia rápido para começar
- **[docs/CONFIGURAR_GROQ.md](docs/CONFIGURAR_GROQ.md)** - Configuração da API Groq
- **[docs/MELHORIAS_PRD_GROQ.md](docs/MELHORIAS_PRD_GROQ.md)** - Melhorias Enterprise

## 💡 Como Usar

1. **Escolha um template** (ou comece do zero)
2. **Digite suas anotações** sobre o produto/feature
3. **Clique em "Gerar PRD"**
4. **Aguarde a geração** (5-10 segundos)
5. **Visualize o resultado** com todas as análises
6. **Edite se necessário**
7. **Exporte em PDF ou Markdown**
8. **Salve no histórico**

## 🛠️ Stack Tecnológica

- **Frontend**: React 19 + TypeScript
- **Build**: Vite 6
- **Estilização**: Tailwind CSS
- **IA**: Groq (Llama 3.3 70B Versatile) - 10x mais rápido
- **Roteamento**: React Router 7
- **Markdown**: marked.js
- **PDF**: Browser Print API

### 🚀 Por que Groq?
- ⚡ **10x mais rápido** que Gemini (1.5-3s vs 13-20s)
- 📊 **Contexto maior**: 128k tokens (4x maior)
- 📝 **Saída maior**: 8k tokens (2x maior)
- 💰 **Grátis**: ~14.400 PRDs/dia
- 🎯 **Qualidade superior**: PRDs de 2.500+ palavras

## 📊 Estimativa de Custos

### MVP Atual
- **Horas**: 40-50h
- **Custo**: R$ 16.000 - R$ 30.000 BRL
- **Complexidade**: Moderate

### Produto Completo (Roadmap)
- **Horas totais**: 340-500h
- **Custo total**: R$ 136.000 - R$ 300.000 BRL
- **Timeline**: 6-9 meses
- **Time**: 3-4 pessoas

### Custos Operacionais
- **Infraestrutura**: R$ 200-800/mês
- **APIs de IA**: R$ 400-2.000/mês
- **Total**: R$ 680-3.000/mês

## 🔒 Segurança

### Implementado
- ✅ Variáveis de ambiente para API keys
- ✅ Sanitização de HTML com marked.js
- ✅ TypeScript para type safety
- ✅ Armazenamento local (sem dados sensíveis)

### Recomendações para Produção
- 🔴 Backend proxy para API calls
- 🔴 Autenticação de usuários
- 🔴 Rate limiting
- 🔴 HTTPS obrigatório

## 🎯 Roadmap

### ✅ Fase 1 - MVP (Concluída)
- Geração de PRDs com IA
- Templates profissionais
- Análise de segurança
- Estimativa de custos
- Exportação PDF profissional
- Edição de PRDs

### 🔄 Fase 2 - Backend (Próxima)
- API REST/GraphQL
- Autenticação JWT
- Banco de dados PostgreSQL
- Sincronização multi-dispositivo

### 📅 Fase 3 - Colaboração
- Compartilhamento de PRDs
- Comentários e feedback
- Integrações (Jira, Notion, Confluence)
- Webhooks

### 📅 Fase 4 - Features Avançadas
- Upload de arquivos
- Gravação de áudio
- Diagramas automáticos (Mermaid)
- Geração de slides
- Dashboard de analytics

## 📝 Licença

Este projeto foi desenvolvido como demonstração de capacidades de IA.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para abrir issues ou pull requests.

---

**Desenvolvedor**: Murillo Matos  
**Powered by**: Groq (Llama 3.3 70B) + Web Soluções Digitais  
**Versão**: 1.3.0 Enterprise Edition  
**Data**: 13/11/2024
