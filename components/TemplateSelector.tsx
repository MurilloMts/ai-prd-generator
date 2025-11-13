import React, { useState } from 'react';
import { PrdTemplate } from '../types';
import { PRD_TEMPLATES } from '../services/templateService';

interface TemplateSelectorProps {
  onSelectTemplate: (template: PrdTemplate) => void;
  onClose: () => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'web', name: 'Web' },
    { id: 'api', name: 'API' },
    { id: 'feature', name: 'Feature' },
    { id: 'platform', name: 'Plataforma' },
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? PRD_TEMPLATES 
    : PRD_TEMPLATES.filter(t => t.category === selectedCategory);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-200 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-base-300 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-content-100">Escolha um Template</h2>
          <button
            onClick={onClose}
            className="text-content-200 hover:text-content-100 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 border-b border-base-300">
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-brand-primary text-white'
                    : 'bg-base-300 text-content-200 hover:bg-base-300/70'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map(template => (
              <div
                key={template.id}
                onClick={() => onSelectTemplate(template)}
                className="bg-base-300 p-4 rounded-lg cursor-pointer hover:bg-base-300/70 transition-colors border-2 border-transparent hover:border-brand-secondary"
              >
                <h3 className="text-lg font-semibold text-content-100 mb-2">
                  {template.name}
                </h3>
                <p className="text-sm text-content-200">{template.description}</p>
                <div className="mt-3">
                  <span className="text-xs bg-brand-primary/20 text-brand-secondary px-2 py-1 rounded">
                    {template.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
