
import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { Spinner } from './Spinner';
import TemplateSelector from './TemplateSelector';
import GuidedForm, { GuidedFormData } from './GuidedForm';
import { PrdTemplate } from '../types';

interface EditorProps {
  notes: string;
  setNotes: (notes: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

type EditorMode = 'free' | 'guided';

const Editor: React.FC<EditorProps> = ({ notes, setNotes, onGenerate, isLoading }) => {
  const [showTemplates, setShowTemplates] = useState(false);
  const [mode, setMode] = useState<EditorMode>('free');
  const [guidedFormData, setGuidedFormData] = useState<GuidedFormData>({
    productName: '',
    mainIdea: '',
    targetAudience: '',
    keyFeatures: '',
    platformScope: '',
    nonFunctionalReqs: '',
    financialAspects: '',
    risksAssumptions: '',
    references: ''
  });

  const handleTemplateSelect = (template: PrdTemplate) => {
    if (template.structure) {
      setNotes(template.structure);
    }
    setShowTemplates(false);
  };

  const handleGuidedFormChange = (field: keyof GuidedFormData, value: string) => {
    setGuidedFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleModeChange = (newMode: EditorMode) => {
    setMode(newMode);
    // Limpar dados ao trocar de modo
    if (newMode === 'free') {
      setNotes('');
    } else {
      setGuidedFormData({
        productName: '',
        mainIdea: '',
        targetAudience: '',
        keyFeatures: '',
        platformScope: '',
        nonFunctionalReqs: '',
        financialAspects: '',
        risksAssumptions: '',
        references: ''
      });
    }
  };

  const handleGenerate = () => {
    if (mode === 'guided') {
      // Concatenar dados do formulário guiado em formato estruturado
      const structuredInput = `
**Nome do Produto:** ${guidedFormData.productName}

**Descrição da Ideia Principal:**
${guidedFormData.mainIdea}

**Público-Alvo:**
${guidedFormData.targetAudience}

**Funcionalidades Essenciais:**
${guidedFormData.keyFeatures}

**Plataforma e Escopo:**
${guidedFormData.platformScope}

${guidedFormData.nonFunctionalReqs ? `**Requisitos Não Funcionais:**\n${guidedFormData.nonFunctionalReqs}\n` : ''}
${guidedFormData.financialAspects ? `**Aspectos Financeiros:**\n${guidedFormData.financialAspects}\n` : ''}
${guidedFormData.risksAssumptions ? `**Riscos ou Suposições:**\n${guidedFormData.risksAssumptions}\n` : ''}
${guidedFormData.references ? `**Referências Adicionais:**\n${guidedFormData.references}` : ''}
      `.trim();
      
      setNotes(structuredInput);
      // Aguardar um tick para garantir que notes foi atualizado
      setTimeout(onGenerate, 0);
    } else {
      onGenerate();
    }
  };

  const isFormValid = mode === 'free' 
    ? notes.trim().length > 0
    : guidedFormData.productName.trim().length > 0 &&
      guidedFormData.mainIdea.trim().length > 0 &&
      guidedFormData.targetAudience.trim().length > 0 &&
      guidedFormData.keyFeatures.trim().length > 0 &&
      guidedFormData.platformScope.trim().length > 0;

  return (
    <>
      <div className="bg-base-200 p-4 rounded-lg shadow-lg h-full flex flex-col">
        {/* Header com seletor de modo */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-content-100">Criar PRD</h2>
          {mode === 'free' && (
            <button
              onClick={() => setShowTemplates(true)}
              className="text-sm bg-base-300 hover:bg-base-300/70 text-content-200 px-3 py-1.5 rounded-md transition-colors"
              disabled={isLoading}
            >
              📋 Templates
            </button>
          )}
        </div>

        {/* Seletor de Modo */}
        <div className="mb-4">
          <div className="flex gap-2 bg-base-300 p-1 rounded-lg">
            <button
              onClick={() => handleModeChange('free')}
              disabled={isLoading}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                mode === 'free'
                  ? 'bg-brand-primary text-white'
                  : 'text-content-200 hover:bg-base-200'
              }`}
            >
              📝 Modo Livre
            </button>
            <button
              onClick={() => handleModeChange('guided')}
              disabled={isLoading}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                mode === 'guided'
                  ? 'bg-brand-primary text-white'
                  : 'text-content-200 hover:bg-base-200'
              }`}
            >
              📋 Modo Guiado
            </button>
          </div>
          <p className="text-xs text-content-200 mt-2">
            {mode === 'free' 
              ? 'Escreva sua ideia livremente no campo abaixo'
              : 'Responda as perguntas para um PRD mais completo e preciso'}
          </p>
        </div>

        {/* Conteúdo baseado no modo */}
        <div className="flex-grow overflow-y-auto mb-4">
          {mode === 'free' ? (
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Precisamos de um novo recurso para nosso app. Os usuários devem poder criar um perfil, enviar uma foto e adicionar uma biografia. Deve ser simples e rápido..."
              className="w-full h-full bg-base-300 text-content-200 p-3 rounded-md focus:ring-2 focus:ring-brand-secondary focus:outline-none resize-none"
              disabled={isLoading}
            />
          ) : (
            <GuidedForm
              formData={guidedFormData}
              onChange={handleGuidedFormChange}
              disabled={isLoading}
            />
          )}
        </div>

        {/* Botão Gerar */}
        <button
          onClick={handleGenerate}
          disabled={isLoading || !isFormValid}
          className="w-full flex justify-center items-center gap-2 bg-brand-primary text-white font-bold py-3 px-4 rounded-md hover:bg-blue-800 transition-all duration-200 disabled:bg-base-300 disabled:cursor-not-allowed disabled:text-gray-500"
        >
          {isLoading ? (
            <>
              <Spinner />
              Gerando...
            </>
          ) : (
            <>
              <SparklesIcon />
              Gerar PRD
            </>
          )}
        </button>
      </div>

      {showTemplates && (
        <TemplateSelector
          onSelectTemplate={handleTemplateSelect}
          onClose={() => setShowTemplates(false)}
        />
      )}
    </>
  );
};

export default Editor;
