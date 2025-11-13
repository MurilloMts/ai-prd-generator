
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SavedPrd } from '../types';
import { getPrds, setPrdForViewing } from '../services/storageService';

type SortOption = 'recent' | 'oldest' | 'score-high' | 'score-low' | 'title';
type FilterPeriod = 'all' | 'today' | 'week' | 'month';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<SavedPrd[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>('all');
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getPrds());
  }, []);

  // Extract all unique tags from history
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    history.forEach(prd => {
      prd.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [history]);

  // Filter and sort PRDs
  const filteredHistory = useMemo(() => {
    let filtered = [...history];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(prd =>
        prd.title.toLowerCase().includes(query) ||
        prd.prd_markdown.toLowerCase().includes(query) ||
        prd.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(prd =>
        selectedTags.every(tag => prd.tags?.includes(tag))
      );
    }

    // Period filter
    if (filterPeriod !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filterPeriod) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }

      filtered = filtered.filter(prd => 
        new Date(prd.createdAt) >= filterDate
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'score-high':
          return (b.completeness_score || 0) - (a.completeness_score || 0);
        case 'score-low':
          return (a.completeness_score || 0) - (b.completeness_score || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [history, searchQuery, selectedTags, sortBy, filterPeriod]);

  const handleView = (id: string) => {
    setPrdForViewing(id);
    navigate('/');
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-content-100 mb-6">Histórico de PRDs</h1>

      {/* Search and Filters */}
      <div className="bg-base-200 p-4 rounded-lg shadow-md mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Buscar PRDs por título, conteúdo ou tags..."
            className="w-full bg-base-300 text-content-200 px-4 py-3 rounded-md focus:ring-2 focus:ring-brand-secondary focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-content-200 hover:text-content-100"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Period Filter */}
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value as FilterPeriod)}
            className="bg-base-300 text-content-200 px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-brand-secondary focus:outline-none"
          >
            <option value="all">Todos os períodos</option>
            <option value="today">Hoje</option>
            <option value="week">Última semana</option>
            <option value="month">Último mês</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-base-300 text-content-200 px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-brand-secondary focus:outline-none"
          >
            <option value="recent">Mais recentes</option>
            <option value="oldest">Mais antigos</option>
            <option value="score-high">Maior score</option>
            <option value="score-low">Menor score</option>
            <option value="title">Título (A-Z)</option>
          </select>

          {/* Results count */}
          <span className="text-sm text-content-200 ml-auto">
            {filteredHistory.length} {filteredHistory.length === 1 ? 'resultado' : 'resultados'}
          </span>
        </div>

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div>
            <p className="text-sm text-content-200 mb-2">Filtrar por tags:</p>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-brand-primary text-white'
                      : 'bg-base-300 text-content-200 hover:bg-base-300/70'
                  }`}
                >
                  {tag}
                </button>
              ))}
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="px-3 py-1 text-xs rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {filteredHistory.length === 0 ? (
        <div className="text-center text-content-200 p-8 bg-base-200 rounded-lg">
          {history.length === 0 ? (
            <p>Você ainda não salvou nenhum PRD.</p>
          ) : (
            <p>Nenhum PRD encontrado com os filtros selecionados.</p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((prd) => (
            <div
              key={prd.id}
              className="bg-base-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold text-content-100">{prd.title}</h2>
                    {prd.completeness_score !== undefined && (
                      <span className={`px-2 py-1 text-xs rounded-md font-semibold ${
                        prd.completeness_score >= 80 ? 'bg-green-500/20 text-green-400' :
                        prd.completeness_score >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {prd.completeness_score}%
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 text-sm text-gray-400 mb-2">
                    <span>📅 {new Date(prd.createdAt).toLocaleDateString('pt-BR')}</span>
                    {prd.updatedAt && prd.updatedAt !== prd.createdAt && (
                      <span>✏️ Editado em {new Date(prd.updatedAt).toLocaleDateString('pt-BR')}</span>
                    )}
                    {prd.version > 1 && (
                      <span>🔄 v{prd.version}</span>
                    )}
                  </div>

                  {prd.tags && prd.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {prd.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-brand-primary/20 text-brand-secondary text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleView(prd.id)}
                  className="bg-brand-secondary hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors duration-200 whitespace-nowrap"
                >
                  Visualizar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
