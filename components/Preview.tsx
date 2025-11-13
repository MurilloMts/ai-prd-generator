import React, { useState, useRef, useEffect } from 'react';
import { PrdResponse, PartialPrdResponse, SavedPrd } from '../types';
import { savePrd } from '../services/storageService';
import { Spinner } from './Spinner';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { SaveIcon } from './icons/SaveIcon';
import TagInput from './TagInput';
declare const marked: any;

interface PreviewProps {
  prd: PartialPrdResponse | null;
  isLoading: boolean;
  isEnhancing: boolean;
  error: string | null;
  onEdit?: (markdown: string) => void;
}

type Tab = 'preview' | 'markdown' | 'html';

const Preview: React.FC<PreviewProps> = ({ prd, isLoading, isEnhancing, error, onEdit }) => {
  const [activeTab, setActiveTab] = useState<Tab>('preview');
  const [isSaved, setIsSaved] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedMarkdown, setEditedMarkdown] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);

  const isFullyLoaded = prd && !isEnhancing && !isLoading;

  useEffect(() => {
    setIsSaved(false); 
    setIsEditing(false);
    if (prd) {
      setActiveTab('preview');
      setEditedMarkdown(prd.prd_markdown);
    }
  }, [prd]);

  const [tags, setTags] = useState<string[]>([]);
  const [showTagInput, setShowTagInput] = useState(false);

  const suggestedTags = [
    'mobile', 'web', 'api', 'backend', 'frontend',
    'mvp', 'feature', 'enhancement', 'bug-fix',
    'high-priority', 'low-priority', 'urgent',
    'design', 'ux', 'ui', 'performance', 'security'
  ];

  const handleSave = () => {
    if (isFullyLoaded && prd) {
      savePrd({ ...prd, tags } as PrdResponse);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess('Copiado!');
      setTimeout(() => setCopySuccess(''), 2000);
    }, (err) => {
      console.error('Could not copy text: ', err);
      setCopySuccess('Falha ao copiar');
       setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  const downloadFile = (content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleDownloadMd = () => {
    if(prd) {
      downloadFile(prd.prd_markdown, `${prd.title.replace(/ /g, '_')}.md`, 'text/markdown;charset=utf-8');
      console.log('TELEMETRY: prd.exported_md');
    }
  };
  
  const handleDownloadPdf = () => {
    if (isFullyLoaded && prd) {
        // Professional PDF styles with better formatting
        const pdfStyles = `
            <style>
                @page { 
                    margin: 2cm;
                    size: A4;
                }
                @media print {
                    body { 
                        font-family: 'Helvetica', 'Arial', sans-serif; 
                        font-size: 11pt; 
                        color: #1a1a1a;
                        line-height: 1.7;
                        padding: 0;
                        margin: 0;
                    }
                    h1 { 
                        font-size: 28pt; 
                        font-weight: bold;
                        color: #1e40af;
                        margin-top: 0;
                        margin-bottom: 0.8em;
                        padding-bottom: 0.3em;
                        border-bottom: 3px solid #3b82f6;
                        page-break-after: avoid;
                    }
                    h2 { 
                        font-size: 20pt; 
                        font-weight: bold;
                        color: #1e40af;
                        margin-top: 1.5em;
                        margin-bottom: 0.6em;
                        padding-bottom: 0.2em;
                        border-bottom: 2px solid #e5e7eb;
                        page-break-after: avoid;
                    }
                    h3 { 
                        font-size: 16pt; 
                        font-weight: bold;
                        color: #374151;
                        margin-top: 1.2em;
                        margin-bottom: 0.5em;
                        page-break-after: avoid;
                    }
                    h4 { 
                        font-size: 14pt; 
                        font-weight: bold;
                        color: #4b5563;
                        margin-top: 1em;
                        margin-bottom: 0.4em;
                        page-break-after: avoid;
                    }
                    p { 
                        margin-bottom: 0.9em;
                        text-align: justify;
                    }
                    strong { 
                        font-weight: bold;
                        color: #111827;
                    }
                    ul, ol { 
                        padding-left: 25px; 
                        margin-bottom: 1em;
                        margin-top: 0.5em;
                    }
                    li { 
                        margin-bottom: 0.4em;
                        line-height: 1.6;
                    }
                    code { 
                        background-color: #f3f4f6; 
                        padding: 2px 6px; 
                        border-radius: 4px; 
                        font-family: 'Courier New', Courier, monospace;
                        font-size: 10pt;
                        color: #dc2626;
                    }
                    pre {
                        background-color: #f9fafb;
                        padding: 12px;
                        border-radius: 6px;
                        border-left: 4px solid #3b82f6;
                        white-space: pre-wrap;
                        word-wrap: break-word;
                        margin: 1em 0;
                        font-size: 10pt;
                        page-break-inside: avoid;
                    }
                    pre code {
                        background-color: transparent;
                        padding: 0;
                        color: #1f2937;
                    }
                    blockquote {
                        border-left: 4px solid #3b82f6;
                        padding-left: 16px;
                        margin: 1em 0;
                        color: #4b5563;
                        font-style: italic;
                    }
                    table {
                        border-collapse: collapse;
                        width: 100%;
                        margin: 1em 0;
                        page-break-inside: avoid;
                    }
                    th, td {
                        border: 1px solid #e5e7eb;
                        padding: 8px 12px;
                        text-align: left;
                    }
                    th {
                        background-color: #f3f4f6;
                        font-weight: bold;
                        color: #1f2937;
                    }
                    .metadata {
                        background-color: #f9fafb;
                        padding: 16px;
                        border-radius: 8px;
                        margin-bottom: 2em;
                        border: 1px solid #e5e7eb;
                        page-break-inside: avoid;
                    }
                    .metadata-item {
                        margin-bottom: 8px;
                        font-size: 10pt;
                    }
                    .metadata-label {
                        font-weight: bold;
                        color: #374151;
                    }
                }
            </style>
        `;

        // Add metadata section with estimates and security info
        let metadataHtml = '';
        if (prd.completeness_score || prd.project_estimate || prd.security_analysis) {
            metadataHtml = '<div class="metadata">';
            metadataHtml += '<h3 style="margin-top: 0; color: #1e40af;">📊 Resumo Executivo</h3>';
            
            if (prd.completeness_score) {
                metadataHtml += `<div class="metadata-item"><span class="metadata-label">Score de Completude:</span> ${prd.completeness_score}%</div>`;
            }
            
            if (prd.project_estimate) {
                const est = prd.project_estimate;
                metadataHtml += `
                    <div class="metadata-item"><span class="metadata-label">Complexidade:</span> ${est.complexity.replace('_', ' ')}</div>
                    <div class="metadata-item"><span class="metadata-label">Horas (Tradicional):</span> ${est.estimated_hours.min}-${est.estimated_hours.max}h</div>
                    <div class="metadata-item"><span class="metadata-label">Custo (Tradicional):</span> R$ ${est.estimated_cost.min.toLocaleString('pt-BR')}-${est.estimated_cost.max.toLocaleString('pt-BR')}</div>
                `;
                if (est.with_ai) {
                    metadataHtml += `
                        <div class="metadata-item"><span class="metadata-label">Horas (com IA):</span> ${est.with_ai.estimated_hours.min}-${est.with_ai.estimated_hours.max}h (-${est.with_ai.time_reduction_percentage}%)</div>
                        <div class="metadata-item"><span class="metadata-label">Custo (com IA):</span> R$ ${est.with_ai.estimated_cost.min.toLocaleString('pt-BR')}-${est.with_ai.estimated_cost.max.toLocaleString('pt-BR')}</div>
                    `;
                }
                metadataHtml += `
                    <div class="metadata-item"><span class="metadata-label">Timeline:</span> ${est.timeline_weeks.min}-${est.timeline_weeks.max} semanas</div>
                    <div class="metadata-item"><span class="metadata-label">Tamanho do Time:</span> ${est.team_size_recommended} pessoas</div>
                `;
            }
            
            if (prd.security_analysis) {
                const sec = prd.security_analysis;
                metadataHtml += `<div class="metadata-item"><span class="metadata-label">Risco de Segurança:</span> ${sec.overall_risk.toUpperCase()}</div>`;
            }
            
            metadataHtml += '</div>';
        }

        // Combine everything
        const htmlContent = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <title>${prd.title}</title>
                    ${pdfStyles}
                </head>
                <body>
                    ${metadataHtml}
                    ${marked.parse(prd.prd_markdown)}
                </body>
            </html>
        `;

        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(htmlContent);
            printWindow.document.close();
            
            // Wait for content to load, then print
            printWindow.onload = () => {
                setTimeout(() => {
                    printWindow.print();
                    console.log('TELEMETRY: prd.exported_pdf');
                }, 250);
            };
        } else {
            alert('Por favor, permita pop-ups para baixar o PDF');
        }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-base-200 p-6 rounded-lg shadow-lg h-full flex flex-col justify-center items-center">
        <Spinner />
        <p className="mt-4 text-content-100">Gerando seu PRD...</p>
        <p className="text-sm text-content-200">Isso pode levar um momento.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500 text-red-300 p-6 rounded-lg shadow-lg h-full flex flex-col justify-center items-center">
        <h3 className="text-xl font-bold mb-2">Ocorreu um Erro</h3>
        <p className="text-center">{error}</p>
      </div>
    );
  }

  if (!prd) {
    return (
      <div className="bg-base-200 p-6 rounded-lg shadow-lg h-full flex flex-col justify-center items-center text-center">
        <h3 className="text-xl font-bold text-content-100">Bem-vindo ao PRDGen</h3>
        <p className="mt-2 text-content-200">
          Seu Documento de Requisitos de Produto (PRD) gerado aparecerá aqui.
        </p>
      </div>
    );
  }

  const getTabClass = (tabName: Tab) =>
    `px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
      activeTab === tabName
        ? 'bg-base-300 text-brand-secondary border-b-2 border-brand-secondary'
        : 'text-content-200 hover:bg-base-300/50'
    }`;

  const handleEditSave = () => {
    if (onEdit && editedMarkdown !== prd?.prd_markdown) {
      onEdit(editedMarkdown);
    }
    setIsEditing(false);
  };

  const renderContent = () => {
    if (isEditing && activeTab === 'markdown') {
      return (
        <div className="p-4 bg-base-100 h-full flex flex-col">
          <textarea
            value={editedMarkdown}
            onChange={(e) => setEditedMarkdown(e.target.value)}
            className="flex-grow bg-base-300 text-content-200 p-3 rounded-md focus:ring-2 focus:ring-brand-secondary focus:outline-none resize-none font-mono text-sm"
          />
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleEditSave}
              className="flex-1 bg-brand-primary text-white font-bold py-2 px-4 rounded-md hover:bg-blue-800 transition-colors"
            >
              Salvar Alterações
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedMarkdown(prd?.prd_markdown || '');
              }}
              className="flex-1 bg-base-300 text-content-200 font-bold py-2 px-4 rounded-md hover:bg-base-300/70 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'preview':
        return (
            <div ref={previewRef} className="prose prose-invert max-w-none p-4 bg-base-100 text-content-200" dangerouslySetInnerHTML={{ __html: marked.parse(prd.prd_markdown) }}></div>
        );
      case 'markdown':
        return (
          <pre className="p-4 bg-base-100 text-content-200 text-sm overflow-auto">
            <code>{prd.prd_markdown}</code>
          </pre>
        );
      case 'html':
         if (prd.prd_html) {
            return (
                <pre className="p-4 bg-base-100 text-content-200 text-sm overflow-auto">
                    <code>{prd.prd_html}</code>
                </pre>
            );
        }
        return (
            <div className="p-6 flex justify-center items-center gap-2">
                <Spinner />
                <span>Gerando HTML...</span>
            </div>
        );
    }
  };

  return (
    <div className="bg-base-200 rounded-lg shadow-lg h-full flex flex-col">
      <div className="p-4 border-b border-base-300">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold text-content-100">{prd.title}</h2>
          <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowTagInput(!showTagInput)} 
                className={`px-3 py-2 text-sm rounded-md hover:bg-base-300 transition-colors ${showTagInput ? 'bg-brand-primary text-white' : ''}`}
                title="Gerenciar Tags"
              >
                🏷️ Tags
              </button>
              <button 
                onClick={() => setIsEditing(!isEditing)} 
                className={`px-3 py-2 text-sm rounded-md hover:bg-base-300 transition-colors disabled:opacity-50 ${isEditing ? 'bg-brand-primary text-white' : ''}`}
                title="Editar PRD" 
                disabled={!prd}
              >
                ✏️ Editar
              </button>
              <button onClick={handleDownloadMd} className="p-2 rounded-md hover:bg-base-300 transition-colors disabled:opacity-50" title="Baixar Markdown" disabled={!prd}><DownloadIcon/></button>
              <button onClick={handleDownloadPdf} className="p-2 rounded-md hover:bg-base-300 transition-colors disabled:opacity-50" title="Baixar PDF" disabled={!isFullyLoaded}><DownloadIcon/></button>
              <button onClick={handleSave} className={`p-2 rounded-md hover:bg-base-300 transition-colors disabled:opacity-50 ${isSaved ? 'text-green-400' : ''}`} title="Salvar PRD" disabled={!isFullyLoaded}><SaveIcon/></button>
          </div>
        </div>
        
        {showTagInput && (
          <div className="mt-3">
            <TagInput tags={tags} onTagsChange={setTags} suggestions={suggestedTags} />
          </div>
        )}
        
        {tags.length > 0 && !showTagInput && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-brand-primary/20 text-brand-secondary text-xs rounded-md">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="border-b border-base-300 px-4">
        <div className="flex -mb-px">
          <button className={getTabClass('preview')} onClick={() => setActiveTab('preview')}>Visualização</button>
          <button className={getTabClass('markdown')} onClick={() => setActiveTab('markdown')}>Markdown</button>
          <button className={getTabClass('html')} onClick={() => setActiveTab('html')} disabled={!prd.prd_html}>HTML</button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto">
        {renderContent()}
        
        {/* Informações adicionais dentro da área de scroll */}
        {prd && (
          <div className="p-4 space-y-4">
          {/* Score de Completude */}
          {prd.completeness_score !== undefined && (
            <div className="bg-base-300 p-4 rounded-md">
              <h4 className="font-semibold text-content-100 mb-2">Score de Completude</h4>
              <div className="flex items-center gap-3">
                <div className="flex-grow bg-base-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full transition-all ${
                      prd.completeness_score >= 80 ? 'bg-green-500' :
                      prd.completeness_score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${prd.completeness_score}%` }}
                  ></div>
                </div>
                <span className="text-2xl font-bold text-content-100">{prd.completeness_score}%</span>
              </div>
            </div>
          )}

          {/* Estimativa de Projeto */}
          {prd.project_estimate && (
            <div className="bg-base-300 p-4 rounded-md">
              <h4 className="font-semibold text-content-100 mb-3">💰 Estimativa do Projeto</h4>
              
              {/* Desenvolvimento Tradicional */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-content-100">👨‍💻 Desenvolvimento Tradicional</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="text-content-200">Complexidade:</span>
                    <p className="font-semibold text-content-100 capitalize">{prd.project_estimate.complexity.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <span className="text-content-200">Horas:</span>
                    <p className="font-semibold text-content-100">
                      {prd.project_estimate.estimated_hours.min}-{prd.project_estimate.estimated_hours.max}h
                    </p>
                  </div>
                  <div>
                    <span className="text-content-200">Custo:</span>
                    <p className="font-semibold text-content-100">
                      R$ {prd.project_estimate.estimated_cost.min.toLocaleString('pt-BR')}-{prd.project_estimate.estimated_cost.max.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <span className="text-content-200">Timeline:</span>
                    <p className="font-semibold text-content-100">
                      {prd.project_estimate.timeline_weeks.min}-{prd.project_estimate.timeline_weeks.max} semanas
                    </p>
                  </div>
                  <div>
                    <span className="text-content-200">Time:</span>
                    <p className="font-semibold text-content-100">
                      {prd.project_estimate.team_size_recommended} pessoas
                    </p>
                  </div>
                </div>
              </div>

              {/* Desenvolvimento com IA */}
              {prd.project_estimate.with_ai && (
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-3 rounded-md border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-purple-400">🤖 Desenvolvimento com IA (100%)</span>
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full font-semibold">
                      -{prd.project_estimate.with_ai.time_reduction_percentage}% tempo
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-content-200">Horas:</span>
                      <p className="font-semibold text-purple-400">
                        {prd.project_estimate.with_ai.estimated_hours.min}-{prd.project_estimate.with_ai.estimated_hours.max}h
                      </p>
                    </div>
                    <div>
                      <span className="text-content-200">Custo:</span>
                      <p className="font-semibold text-purple-400">
                        R$ {prd.project_estimate.with_ai.estimated_cost.min.toLocaleString('pt-BR')}-{prd.project_estimate.with_ai.estimated_cost.max.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <span className="text-content-200">Economia:</span>
                      <p className="font-semibold text-green-400">
                        R$ {(prd.project_estimate.estimated_cost.min - prd.project_estimate.with_ai.estimated_cost.min).toLocaleString('pt-BR')}+
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-base-100">
                <span className="text-xs text-content-200 block mb-2">Distribuição de Esforço:</span>
                <div className="flex gap-2 text-xs">
                  <div className="flex-1">
                    <div className="bg-blue-500 h-2 rounded" style={{width: `${prd.project_estimate.breakdown.frontend}%`}}></div>
                    <span className="text-content-200">Frontend {prd.project_estimate.breakdown.frontend}%</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-green-500 h-2 rounded" style={{width: `${prd.project_estimate.breakdown.backend}%`}}></div>
                    <span className="text-content-200">Backend {prd.project_estimate.breakdown.backend}%</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-purple-500 h-2 rounded" style={{width: `${prd.project_estimate.breakdown.design}%`}}></div>
                    <span className="text-content-200">Design {prd.project_estimate.breakdown.design}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Análise de Segurança */}
          {prd.security_analysis && (
            <div className="bg-base-300 p-4 rounded-md">
              <h4 className="font-semibold text-content-100 mb-3">🔒 Análise de Segurança</h4>
              <div className="mb-3">
                <span className="text-sm text-content-200">Risco Geral: </span>
                <span className={`font-bold ${
                  prd.security_analysis.overall_risk === 'low' ? 'text-green-400' :
                  prd.security_analysis.overall_risk === 'medium' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {prd.security_analysis.overall_risk.toUpperCase()}
                </span>
              </div>
              
              {prd.security_analysis.vulnerabilities.length > 0 && (
                <div className="mb-3">
                  <span className="text-sm font-semibold text-content-100 block mb-2">Vulnerabilidades Identificadas:</span>
                  <div className="space-y-2">
                    {prd.security_analysis.vulnerabilities.slice(0, 3).map((vuln: any, i: number) => (
                      <div key={i} className="bg-base-100 p-2 rounded text-xs">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            vuln.severity === 'critical' ? 'bg-red-500 text-white' :
                            vuln.severity === 'high' ? 'bg-orange-500 text-white' :
                            vuln.severity === 'medium' ? 'bg-yellow-500 text-black' : 'bg-blue-500 text-white'
                          }`}>
                            {vuln.severity}
                          </span>
                          <span className="font-semibold text-content-100">{vuln.category}</span>
                        </div>
                        <p className="text-content-200">{vuln.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {prd.security_analysis.recommendations.length > 0 && (
                <div>
                  <span className="text-sm font-semibold text-content-100 block mb-2">Recomendações:</span>
                  <ul className="list-disc list-inside text-xs space-y-1 text-content-200">
                    {prd.security_analysis.recommendations.slice(0, 3).map((rec: string, i: number) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-base-300 p-3 rounded-md min-h-[80px]">
                  <h4 className="font-semibold text-content-100 mb-2">Questões em Aberto</h4>
                  {prd.open_questions ? (
                    <ul className="list-disc list-inside text-sm space-y-1">
                        {prd.open_questions.map((q, i) => <li key={i}>{q}</li>)}
                    </ul>
                  ) : (<div className="flex items-center gap-2 text-sm text-content-200"><Spinner /> Carregando...</div>)}
              </div>
              <div className="bg-base-300 p-3 rounded-md min-h-[80px]">
                  <h4 className="font-semibold text-content-100 mb-2">Suposições Feitas</h4>
                  {prd.assumptions ? (
                    <ul className="list-disc list-inside text-sm space-y-1">
                        {prd.assumptions.map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                   ) : (<div className="flex items-center gap-2 text-sm text-content-200"><Spinner /> Carregando...</div>)}
              </div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-content-100 mb-2">Prompt para VibeCoding</h4>
            <div className="relative">
                {prd.vibecoding_prompt ? (
                    <>
                        <textarea readOnly value={prd.vibecoding_prompt} className="w-full bg-base-100 text-sm p-2 pr-10 rounded-md resize-none" rows={4}></textarea>
                        <button onClick={() => handleCopyToClipboard(prd.vibecoding_prompt!)} className="absolute top-2 right-2 p-1 rounded-md hover:bg-base-300" title="Copiar para a Área de Transferência"><ClipboardIcon /></button>
                        {copySuccess && <span className="absolute right-10 top-2.5 text-xs text-green-400">{copySuccess}</span>}
                    </>
                ) : (
                    <div className="w-full bg-base-100 text-sm p-2 rounded-md h-[100px] flex items-center justify-center gap-2 text-content-200">
                        <Spinner /> Carregando...
                    </div>
                )}
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Preview;