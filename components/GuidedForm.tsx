import React from 'react';

export interface GuidedFormData {
  productName: string;
  mainIdea: string;
  targetAudience: string;
  keyFeatures: string;
  platformScope: string;
  nonFunctionalReqs: string;
  financialAspects: string;
  risksAssumptions: string;
  references: string;
}

interface GuidedFormProps {
  formData: GuidedFormData;
  onChange: (field: keyof GuidedFormData, value: string) => void;
  disabled?: boolean;
}

const GuidedForm: React.FC<GuidedFormProps> = ({ formData, onChange, disabled }) => {
  const handleChange = (field: keyof GuidedFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(field, e.target.value);
  };

  return (
    <div className="space-y-4">
      {/* Nome do Produto */}
      <div>
        <label className="block text-sm font-semibold text-content-100 mb-2">
          1. Nome ou Título do Produto <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={formData.productName}
          onChange={handleChange('productName')}
          placeholder="Ex: TaskFlow - App de Gerenciamento de Tarefas"
          className="w-full bg-base-300 text-content-200 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-secondary focus:outline-none"
          disabled={disabled}
          maxLength={100}
        />
      </div>

      {/* Descrição da Ideia */}
      <div>
        <label className="block text-sm font-semibold text-content-100 mb-2">
          2. Descrição da Ideia Principal <span className="text-red-400">*</span>
        </label>
        <textarea
          value={formData.mainIdea}
          onChange={handleChange('mainIdea')}
          placeholder="Ex: Profissionais perdem tempo organizando tarefas em planilhas. Queremos criar um app móvel para gerenciamento colaborativo de tarefas com interface intuitiva."
          className="w-full bg-base-300 text-content-200 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-secondary focus:outline-none resize-none"
          rows={3}
          disabled={disabled}
          maxLength={300}
        />
        <p className="text-xs text-content-200 mt-1">{formData.mainIdea.length}/300</p>
      </div>

      {/* Público-Alvo */}
      <div>
        <label className="block text-sm font-semibold text-content-100 mb-2">
          3. Público-Alvo <span className="text-red-400">*</span>
        </label>
        <textarea
          value={formData.targetAudience}
          onChange={handleChange('targetAudience')}
          placeholder="Ex: Gerentes de projetos e equipes de 25-45 anos, principalmente em São Paulo e Rio de Janeiro, que trabalham em empresas de médio porte."
          className="w-full bg-base-300 text-content-200 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-secondary focus:outline-none resize-none"
          rows={2}
          disabled={disabled}
          maxLength={250}
        />
        <p className="text-xs text-content-200 mt-1">{formData.targetAudience.length}/250</p>
      </div>

      {/* Funcionalidades Essenciais */}
      <div>
        <label className="block text-sm font-semibold text-content-100 mb-2">
          4. Funcionalidades Essenciais (3-5 features) <span className="text-red-400">*</span>
        </label>
        <textarea
          value={formData.keyFeatures}
          onChange={handleChange('keyFeatures')}
          placeholder="Ex: Login com Google/Apple, Criação e edição de tarefas, Atribuição de tarefas a membros, Notificações push, Dashboard com progresso"
          className="w-full bg-base-300 text-content-200 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-secondary focus:outline-none resize-none"
          rows={3}
          disabled={disabled}
          maxLength={300}
        />
        <p className="text-xs text-content-200 mt-1">{formData.keyFeatures.length}/300</p>
      </div>

      {/* Plataforma e Escopo */}
      <div>
        <label className="block text-sm font-semibold text-content-100 mb-2">
          5. Plataforma e Escopo <span className="text-red-400">*</span>
        </label>
        <textarea
          value={formData.platformScope}
          onChange={handleChange('platformScope')}
          placeholder="Ex: App móvel para iOS e Android, MVP em 3 meses, integração com Google Calendar e Slack"
          className="w-full bg-base-300 text-content-200 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-secondary focus:outline-none resize-none"
          rows={2}
          disabled={disabled}
          maxLength={250}
        />
        <p className="text-xs text-content-200 mt-1">{formData.platformScope.length}/250</p>
      </div>

      {/* Requisitos Não Funcionais */}
      <div>
        <label className="block text-sm font-semibold text-content-100 mb-2">
          6. Requisitos Não Funcionais
        </label>
        <textarea
          value={formData.nonFunctionalReqs}
          onChange={handleChange('nonFunctionalReqs')}
          placeholder="Ex: Carregamento de telas em menos de 2 segundos, compatível com LGPD, design responsivo, suporte offline básico"
          className="w-full bg-base-300 text-content-200 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-secondary focus:outline-none resize-none"
          rows={2}
          disabled={disabled}
          maxLength={250}
        />
        <p className="text-xs text-content-200 mt-1">{formData.nonFunctionalReqs.length}/250</p>
      </div>

      {/* Aspectos Financeiros */}
      <div>
        <label className="block text-sm font-semibold text-content-100 mb-2">
          7. Aspectos Financeiros
        </label>
        <textarea
          value={formData.financialAspects}
          onChange={handleChange('financialAspects')}
          placeholder="Ex: Orçamento de R$ 30.000, modelo freemium com plano premium a R$ 15/mês, usar Supabase (R$ 100/mês) e React Native"
          className="w-full bg-base-300 text-content-200 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-secondary focus:outline-none resize-none"
          rows={2}
          disabled={disabled}
          maxLength={250}
        />
        <p className="text-xs text-content-200 mt-1">{formData.financialAspects.length}/250</p>
      </div>

      {/* Riscos ou Suposições */}
      <div>
        <label className="block text-sm font-semibold text-content-100 mb-2">
          8. Riscos ou Suposições
        </label>
        <textarea
          value={formData.risksAssumptions}
          onChange={handleChange('risksAssumptions')}
          placeholder="Ex: Risco de atraso na integração com APIs externas, assumir 1.000 usuários nos primeiros 3 meses"
          className="w-full bg-base-300 text-content-200 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-secondary focus:outline-none resize-none"
          rows={2}
          disabled={disabled}
          maxLength={250}
        />
        <p className="text-xs text-content-200 mt-1">{formData.risksAssumptions.length}/250</p>
      </div>

      {/* Referências Adicionais */}
      <div>
        <label className="block text-sm font-semibold text-content-100 mb-2">
          9. Referências Adicionais
        </label>
        <textarea
          value={formData.references}
          onChange={handleChange('references')}
          placeholder="Ex: Inspirado no Trello para organização de tarefas e no Asana para colaboração em equipe"
          className="w-full bg-base-300 text-content-200 px-3 py-2 rounded-md focus:ring-2 focus:ring-brand-secondary focus:outline-none resize-none"
          rows={2}
          disabled={disabled}
          maxLength={200}
        />
        <p className="text-xs text-content-200 mt-1">{formData.references.length}/200</p>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3 text-sm text-content-200">
        <p className="font-semibold text-blue-400 mb-1">💡 Dica:</p>
        <p>Campos marcados com <span className="text-red-400">*</span> são obrigatórios. Quanto mais detalhes você fornecer, melhor será o PRD gerado!</p>
      </div>
    </div>
  );
};

export default GuidedForm;
