import Groq from 'groq-sdk';

// Interfaces
export interface InitialPrd {
    title: string;
    prd_markdown: string;
}

export interface PrdDetails {
    prd_html: string;
    open_questions: string[];
    assumptions: string[];
    vibecoding_prompt: string;
    completeness_score: number;
    security_analysis: any;
    project_estimate: any;
}

// Prompts profissionais e completos para Groq
const INITIAL_PROMPT = `Você é um Product Manager SÊNIOR com 15+ anos de experiência em empresas de tecnologia de ponta (Google, Amazon, Microsoft). 

Crie um PRD (Product Requirements Document) EXTREMAMENTE COMPLETO, DETALHADO e PROFISSIONAL de nível enterprise.

**IMPORTANTE**: Este PRD será usado por equipes de engenharia, design, QA e stakeholders executivos. Deve ter NO MÍNIMO 2.500 palavras e ser MUITO específico.

Retorne APENAS um JSON válido com esta estrutura:
{
  "title": "Título Claro e Descritivo do Produto/Feature",
  "prd_markdown": "# Título\\n\\n## 1. Resumo Executivo\\n..."
}

## ESTRUTURA OBRIGATÓRIA (15 Seções Completas):

### 1. Resumo Executivo (200-300 palavras)
- Visão geral do produto/feature
- Problema que resolve
- Proposta de valor única
- Principais benefícios mensuráveis
- Impacto esperado no negócio

### 2. Contexto e Justificativa (300-400 palavras)
- Análise do mercado atual
- Problema detalhado que estamos resolvendo
- Por que agora é o momento certo
- Dados e pesquisas que suportam a decisão
- Oportunidade de negócio (tamanho do mercado, potencial de receita)
- Análise competitiva (concorrentes diretos e indiretos)

### 3. Objetivos e Metas (SMART Goals)
- Objetivos de negócio específicos e mensuráveis
- Metas de produto (adoção, engajamento, retenção)
- KPIs primários e secundários com valores-alvo
- Timeline para atingir cada meta
- Critérios de sucesso claros

### 4. Personas e Público-Alvo (3-5 personas detalhadas)
Para cada persona, inclua:
- Nome, idade, cargo, contexto profissional
- Objetivos e motivações
- Dores e frustrações específicas
- Comportamentos e padrões de uso
- Citações representativas
- Como o produto resolve seus problemas

### 5. Jornada do Usuário (User Journey)
- Mapeamento completo da jornada end-to-end
- Pontos de contato (touchpoints)
- Momentos de verdade (moments of truth)
- Emoções em cada etapa
- Oportunidades de melhoria

### 6. Requisitos Funcionais (Detalhados)
Liste TODOS os requisitos funcionais organizados por:
- **Funcionalidades Core** (Must-have)
  - Descrição detalhada de cada funcionalidade
  - Comportamento esperado
  - Regras de negócio
  - Casos de uso específicos
  - Fluxos alternativos e exceções
- **Funcionalidades Secundárias** (Should-have)
- **Funcionalidades Futuras** (Nice-to-have)

Use formato: **RF-001**: [Descrição completa]

### 7. Requisitos Não-Funcionais
- **Performance**: Tempos de resposta, throughput, latência
- **Escalabilidade**: Capacidade de crescimento, limites
- **Segurança**: Autenticação, autorização, criptografia, compliance
- **Usabilidade**: Acessibilidade (WCAG), responsividade, i18n
- **Confiabilidade**: Uptime, recuperação de falhas, backup
- **Manutenibilidade**: Código limpo, documentação, testes
- **Compatibilidade**: Browsers, dispositivos, sistemas operacionais

### 8. Arquitetura e Stack Tecnológico
- Arquitetura de alto nível (diagrama em texto/ASCII se possível)
- Stack recomendado (frontend, backend, banco de dados, infraestrutura)
- Integrações necessárias (APIs, serviços terceiros)
- Decisões técnicas e justificativas
- Considerações de infraestrutura (cloud, on-premise)
- Estratégia de deploy e CI/CD

### 9. Design e Interface (UI/UX)
- Princípios de design a seguir
- Wireframes/mockups em descrição textual
- Fluxos de navegação principais
- Componentes de UI necessários
- Design system e guidelines
- Acessibilidade e inclusão
- Responsividade (mobile-first, desktop, tablet)

### 10. Métricas e KPIs (Mensuração de Sucesso)
- **Métricas de Adoção**: DAU, MAU, taxa de ativação
- **Métricas de Engajamento**: Tempo de uso, frequência, profundidade
- **Métricas de Negócio**: Receita, conversão, LTV, CAC
- **Métricas de Qualidade**: NPS, CSAT, taxa de erro, performance
- **Métricas Técnicas**: Uptime, latência, taxa de sucesso de API
- Dashboards e ferramentas de monitoramento

### 11. Escopo e Limitações
- **O que ESTÁ no escopo** (detalhado)
- **O que NÃO ESTÁ no escopo** (explícito)
- Dependências externas
- Restrições técnicas ou de negócio
- Premissas importantes

### 12. Riscos e Estratégias de Mitigação
Para cada risco, inclua:
- Descrição do risco
- Probabilidade (Alta/Média/Baixa)
- Impacto (Alto/Médio/Baixo)
- Estratégia de mitigação específica
- Plano de contingência
- Responsável

### 13. Cronograma e Fases (Roadmap)
- **Fase 1 - MVP** (X semanas): Funcionalidades core
- **Fase 2 - Expansão** (X semanas): Funcionalidades secundárias
- **Fase 3 - Otimização** (X semanas): Melhorias e refinamentos
- Milestones importantes
- Dependências entre fases
- Recursos necessários por fase

### 14. Stakeholders e Responsabilidades
- Product Owner: [Responsabilidades]
- Tech Lead: [Responsabilidades]
- Design Lead: [Responsabilidades]
- QA Lead: [Responsabilidades]
- Marketing: [Responsabilidades]
- Outros stakeholders relevantes
- Matriz RACI (Responsible, Accountable, Consulted, Informed)

### 15. Critérios de Aceitação e Definição de Pronto
- Critérios de aceitação para cada funcionalidade principal
- Definition of Done (DoD)
- Checklist de qualidade
- Processo de aprovação
- Critérios para go-live

### 16. Apêndices e Referências
- Links para pesquisas e dados
- Documentação técnica relacionada
- Protótipos e mockups
- Análises competitivas detalhadas
- Glossário de termos técnicos

## DIRETRIZES DE QUALIDADE:

✅ **Seja EXTREMAMENTE específico**: Evite generalidades. Use números, exemplos concretos, cenários reais.
✅ **Use dados**: Sempre que possível, cite estatísticas, pesquisas, benchmarks.
✅ **Pense em edge cases**: Considere fluxos alternativos, erros, exceções.
✅ **Seja técnico quando necessário**: Não tenha medo de entrar em detalhes técnicos.
✅ **Formatação impecável**: Use Markdown profissionalmente (##, ###, -, *, **, tabelas).
✅ **Mínimo 2.500 palavras**: Este é um documento enterprise, não um resumo.
✅ **Linguagem profissional**: Tom formal, mas acessível. Evite jargões desnecessários.

## ENTRADA DO USUÁRIO:
{notes}

Agora crie o PRD mais completo e profissional possível baseado nessas anotações.`;

const DETAILS_PROMPT = `Você é um Tech Lead e Arquiteto de Software SÊNIOR com expertise em análise de requisitos, segurança e estimativas de projeto.

Analise o PRD abaixo de forma PROFUNDA e CRÍTICA, e retorne APENAS um JSON válido com análises detalhadas:

{
  "prd_html": "<h1>HTML completo do PRD...</h1>",
  "open_questions": [
    "Pergunta técnica específica 1",
    "Pergunta de negócio específica 2",
    "Pergunta de UX específica 3",
    "Pergunta de integração específica 4",
    "Pergunta de escalabilidade específica 5"
  ],
  "assumptions": [
    "Suposição técnica específica 1",
    "Suposição de negócio específica 2",
    "Suposição de infraestrutura específica 3",
    "Suposição de usuário específica 4",
    "Suposição de dados específica 5"
  ],
  "vibecoding_prompt": "Prompt DETALHADO para implementação (300-500 palavras)...",
  "completeness_score": 85,
  "security_analysis": {
    "overall_risk": "low|medium|high|critical",
    "vulnerabilities": [
      {
        "severity": "critical|high|medium|low",
        "category": "Authentication|Authorization|Data Protection|API Security|Infrastructure|etc",
        "description": "Descrição detalhada da vulnerabilidade",
        "mitigation": "Estratégia específica de mitigação"
      }
    ],
    "recommendations": [
      "Recomendação de segurança específica 1",
      "Recomendação de segurança específica 2",
      "Recomendação de segurança específica 3"
    ],
    "compliance_notes": ["LGPD", "GDPR", "PCI-DSS", "SOC2", "ISO27001"]
  },
  "project_estimate": {
    "complexity": "simple|moderate|complex|very_complex",
    "estimated_hours": {"min": 40, "max": 80},
    "estimated_cost": {"min": 3200, "max": 12000, "currency": "BRL"},
    "team_size_recommended": 2,
    "timeline_weeks": {"min": 2, "max": 4},
    "breakdown": {
      "frontend": 35,
      "backend": 30,
      "design": 15,
      "testing": 10,
      "deployment": 5,
      "documentation": 5
    },
    "with_ai": {
      "estimated_hours": {"min": 16, "max": 32},
      "estimated_cost": {"min": 1600, "max": 6400, "currency": "BRL"},
      "time_reduction_percentage": 60
    }
  }
}

## INSTRUÇÕES DETALHADAS:

### 1. prd_html
- Converta o Markdown para HTML semântico e bem formatado
- Use tags apropriadas (h1, h2, h3, p, ul, ol, strong, em, code, pre)
- Mantenha a estrutura e formatação

### 2. open_questions (5-8 questões críticas)
Identifique questões que PRECISAM ser respondidas antes da implementação:
- Questões técnicas (arquitetura, integrações, performance)
- Questões de negócio (priorização, ROI, métricas)
- Questões de UX (fluxos, edge cases, acessibilidade)
- Questões de dados (estrutura, migração, privacidade)
- Questões de infraestrutura (escalabilidade, custos, SLA)

### 3. assumptions (5-8 suposições importantes)
Liste suposições que estão sendo feitas:
- Suposições técnicas (tecnologias, capacidades, limitações)
- Suposições de negócio (orçamento, timeline, recursos)
- Suposições de usuário (comportamento, conhecimento, acesso)
- Suposições de dados (disponibilidade, qualidade, volume)
- Suposições de infraestrutura (ambiente, ferramentas, serviços)

### 4. vibecoding_prompt (300-500 palavras)
Crie um prompt EXTREMAMENTE DETALHADO para um desenvolvedor implementar este projeto:
- Contexto completo do projeto
- Stack tecnológico recomendado (específico)
- Estrutura de pastas e arquivos
- Componentes principais a criar
- Fluxos de dados e integrações
- Considerações de segurança
- Testes necessários
- Comandos para iniciar o projeto
- Seja MUITO específico e prático

### 5. completeness_score (0-100)
Avalie a completude do PRD baseado em:
- Clareza dos requisitos (0-25 pontos)
- Detalhamento técnico (0-25 pontos)
- Considerações de UX (0-20 pontos)
- Métricas e KPIs (0-15 pontos)
- Riscos e mitigações (0-15 pontos)

Seja RIGOROSO. Um PRD enterprise deve ter 85+.

### 6. security_analysis (Análise PROFUNDA)
Analise TODOS os aspectos de segurança:

**overall_risk**: Avalie o risco geral considerando:
- Tipo de dados manipulados (PII, financeiros, saúde)
- Superfície de ataque (APIs públicas, integrações)
- Complexidade da autenticação/autorização
- Compliance necessário

**vulnerabilities**: Identifique 3-8 vulnerabilidades potenciais:
- Authentication/Authorization (OAuth, JWT, sessões)
- Data Protection (criptografia, PII, LGPD)
- API Security (rate limiting, validação, CORS)
- Infrastructure (DDoS, configurações, secrets)
- Input Validation (XSS, SQL Injection, CSRF)
- Third-party Dependencies (bibliotecas, APIs externas)

**recommendations**: 3-6 recomendações específicas e acionáveis

**compliance_notes**: Liste regulamentações aplicáveis

### 7. project_estimate (Estimativa REALISTA)

**complexity**: Avalie baseado em:
- simple: CRUD básico, 1-2 telas, sem integrações complexas
- moderate: Múltiplas telas, algumas integrações, lógica de negócio média
- complex: Sistema completo, múltiplas integrações, lógica complexa
- very_complex: Plataforma enterprise, microserviços, alta escalabilidade

**estimated_hours**: Seja REALISTA. Considere:
- Desenvolvimento (frontend + backend)
- Design e prototipação
- Testes (unitários, integração, E2E)
- Code review e refatoração
- Documentação
- Deploy e configuração
- Buffer para imprevistos (20-30%)

**estimated_cost**: Use taxas realistas do mercado brasileiro:
- Júnior: R$ 50-80/hora
- Pleno: R$ 80-120/hora
- Sênior: R$ 120-200/hora
- Média ponderada: R$ 80-150/hora

**team_size_recommended**: Baseado na complexidade e timeline

**timeline_weeks**: Considerando a equipe recomendada

**breakdown**: Distribuição percentual realista do esforço

**with_ai**: Estimativa usando ferramentas de IA (Cursor, Copilot, ChatGPT):
- Redução típica: 50-70% do tempo
- Maior impacto em: código boilerplate, testes, documentação
- Menor impacto em: arquitetura, design, decisões de negócio

## PRD PARA ANÁLISE:
{markdown}

Agora faça uma análise PROFUNDA, CRÍTICA e PROFISSIONAL deste PRD.`;

const callGroq = async (prompt: string, isInitial: boolean): Promise<any> => {
    if (!process.env.GROQ_API_KEY) {
        throw new Error("Configure GROQ_API_KEY no arquivo .env.local");
    }

    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY,
        dangerouslyAllowBrowser: true // Permite uso no browser
    });

    try {
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile", // Modelo atualizado e mais capaz
            messages: [
                {
                    role: "system",
                    content: isInitial 
                        ? "Você é um Product Manager SÊNIOR com 15+ anos de experiência. Crie PRDs extremamente completos, detalhados e profissionais de nível enterprise. Sempre retorne JSON válido."
                        : "Você é um Tech Lead e Arquiteto de Software SÊNIOR. Faça análises profundas, críticas e profissionais. Sempre retorne JSON válido."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: isInitial ? 0.4 : 0.6, // Aumentado para mais criatividade
            max_tokens: isInitial ? 8000 : 6000, // Aumentado para aproveitar capacidade do Groq (8k max)
            response_format: { type: "json_object" }
        });

        const text = completion.choices[0]?.message?.content;
        if (!text) {
            throw new Error("Groq retornou resposta vazia");
        }

        console.log(`✅ Groq respondeu com ${text.length} caracteres`);
        return JSON.parse(text);

    } catch (error) {
        console.error('Erro no Groq:', error);
        if (error instanceof SyntaxError) {
            throw new Error("Groq retornou JSON inválido. Tente novamente.");
        }
        throw error;
    }
};

export const generateInitialPrd = async (notes: string): Promise<InitialPrd> => {
    const prompt = INITIAL_PROMPT.replace('{notes}', notes);
    const result = await callGroq(prompt, true);
    console.log('TELEMETRY: prd.generated (Groq)');
    return result;
};

export const generatePrdDetails = async (notes: string, markdown: string): Promise<PrdDetails> => {
    const prompt = DETAILS_PROMPT.replace('{markdown}', markdown);
    return callGroq(prompt, false);
};
