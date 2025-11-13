
import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { Spinner } from './Spinner';
import TemplateSelector from './TemplateSelector';
import { PrdTemplate } from '../types';

interface EditorProps {
  notes: string;
  setNotes: (notes: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const Editor: React.FC<EditorProps> = ({ notes, setNotes, onGenerate, isLoading }) => {
  const [showTemplates, setShowTemplates] = useState(false);

  const handleTemplateSelect = (template: PrdTemplate) => {
    if (template.structure) {
      setNotes(template.structure);
    }
    setShowTemplates(false);
  };

  return (
    <>
      <div className="bg-base-200 p-4 rounded-lg shadow-lg h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-content-100">Suas Anotações</h2>
          <button
            onClick={() => setShowTemplates(true)}
            className="text-sm bg-base-300 hover:bg-base-300/70 text-content-200 px-3 py-1.5 rounded-md transition-colors"
            disabled={isLoading}
          >
            📋 Templates
          </button>
        </div>
        <p className="text-sm text-content-200 mb-4">
          Insira suas anotações, ideias ou transcrições de reuniões abaixo. Quanto mais detalhes, melhor o PRD.
        </p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ex: Precisamos de um novo recurso para nosso app. Os usuários devem poder criar um perfil, enviar uma foto e adicionar uma biografia. Deve ser simples e rápido..."
          className="w-full flex-grow bg-base-300 text-content-200 p-3 rounded-md focus:ring-2 focus:ring-brand-secondary focus:outline-none resize-none"
          rows={15}
          disabled={isLoading}
        />
        <button
          onClick={onGenerate}
          disabled={isLoading || !notes.trim()}
          className="mt-4 w-full flex justify-center items-center gap-2 bg-brand-primary text-white font-bold py-3 px-4 rounded-md hover:bg-blue-800 transition-all duration-200 disabled:bg-base-300 disabled:cursor-not-allowed disabled:text-gray-500"
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
