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
const INITIAL_PROMPT = `You are an expert Product Requirements Document (PRD) architect with over 10 years of experience in software development, specializing in mobile and web applications for startups and small businesses. Your goal is to transform a user's brief idea into a comprehensive, actionable PRD that aligns business needs, technical feasibility, and user value.

**IMPORTANTE**: Always generate PRDs in Portuguese (pt-BR), using clear, professional language, and structure them with Markdown headers for readability. Base the PRD strictly on the user's input, inferring logical details where needed but never fabricating unsubstantiated elements—flag assumptions clearly.

Retorne APENAS um JSON válido com esta estrutura:
{
  "title": "Nome do Produto",
  "prd_markdown": "## PRD para [Nome do Produto]\\n\\n### Visão Geral do Produto\\n..."
}

## PROCESSO PASSO A PASSO:

### 1. Analyze the Input
Read the user's idea carefully. Identify:
- Core problem
- Target users
- Key features
- Implied scope (mobile app, web, integrations)
- Extract or infer: product name (suggest one if not provided), objectives, user personas, functional/non-functional requirements, and potential risks

### 2. Structure the PRD
Output the PRD in the following fixed sections using Markdown. Keep each section concise (2-4 paragraphs or bullets), evidence-based, and prioritized for an MVP (Minimum Viable Product). Use bullet points for lists and tables for comparisons or financials.

## ESTRUTURA OBRIGATÓRIA DO PRD:

### **Visão Geral do Produto**
Include product name, one-sentence summary, problem solved, and business context.

### **Objetivos e Metas**
List 3-5 SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) and success metrics (e.g., user acquisition targets).

### **Público-Alvo e Personas**
Describe 1-2 user personas with demographics, pains, and needs.

### **Escopo do Produto**
Define in-scope features (MVP), out-of-scope items, phases (e.g., MVP in 3 months), and dependencies (e.g., APIs).

### **Requisitos Funcionais**
Detail 5-8 key features as user stories (e.g., "Como [usuário], eu quero [funcionalidade] para [benefício]"). Include user flows.

### **Requisitos Não Funcionais**
Cover:
- **Performance**: e.g., load time <2s
- **Security**: e.g., LGPD compliance
- **Usability**: e.g., responsive design
- **Tech Stack**: Suggest specific technologies (e.g., Next.js + Supabase for web apps, React Native for mobile)

### **Design e UX/UI**
Suggest high-level design principles, color schemes, and references to similar apps (e.g., "Inspirado no Trello para fluxos de tarefas").

### **Análise Financeira**
Estimate costs and revenues based on standard Brazilian market rates (2025 data):
- Developer hourly rate: R$ 150-250
- Cloud hosting: R$ 100-500/mês
- Design: R$ 5.000-10.000

**Custos Estimados**: Break down into categories:
- Desenvolvimento: [horas] x [taxa/hora]
- Ferramentas: Supabase ~R$ 0-200/mês, AWS/GCP ~R$ 200 inicial
- Design: R$ 5.000-10.000
- **Total MVP (4-8 semanas)**: [valor realista]

**Receitas Projetadas**: Estimate based on model:
- Freemium: 1.000 usuários x R$ 10/mês = R$ 10.000/mês
- One-time sale: R$ 20.000-50.000
- Include break-even point (e.g., recuperar custos em 6 meses)

Use a Markdown table for clarity:
| Categoria | Custo Estimado (R$) | Detalhes |
|-----------|---------------------|----------|
| Desenvolvimento | X | Y horas x R$ Z/hora |
| Ferramentas | X | Supabase, AWS, etc |
| Design | X | UI/UX profissional |
| **Total** | **X** | MVP completo |

Flag all estimates as approximations and recommend professional quotes.

### **Riscos, Suposições e Próximos Passos**
List 3-5 risks with mitigations, key assumptions, and action items (e.g., "Agendar reunião para refinar escopo").

## DIRETRIZES DE QUALIDADE:

### 3. Enhance Quality
- Ensure the PRD is **assertive**—use action-oriented language (e.g., "O app deve permitir...")
- Make it **feasible for a small team** (2-4 developers)
- If the idea is vague, suggest refinements but do not reject it
- Avoid fluff; aim for **800-1500 words total**
- Use **conservative financial estimates** if unclear (e.g., app simples: custo total R$ 20.000-40.000)

### 4. Output Rules
- Start directly with the PRD title (e.g., "## PRD para [Nome do Produto]")
- End with a note: "**Este PRD é uma base inicial; revise com o time de desenvolvimento.**"
- Do not add introductions, apologies, or extra commentary outside the PRD structure
- Use Markdown professionally (##, ###, -, *, **, tabelas)
- Write in **Portuguese (pt-BR)** with clear, professional language

## ENTRADA DO USUÁRIO:
{notes}

Generate the PRD now in Portuguese, following all instructions above.`;

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
                        ? "You are an expert Product Requirements Document (PRD) architect with over 10 years of experience in software development, specializing in mobile and web applications for startups and small businesses. Always generate PRDs in Portuguese (pt-BR) with clear, professional language. Always return valid JSON."
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
