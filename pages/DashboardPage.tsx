import React, { useState, useEffect, useMemo } from 'react';
import { SavedPrd } from '../types';
import { getPrds } from '../services/storageService';

interface DashboardStats {
  totalPrds: number;
  avgScore: number;
  avgHours: number;
  totalCost: number;
  approvedCount: number;
  pendingCount: number;
  rejectedCount: number;
  byComplexity: Record<string, number>;
  byRisk: Record<string, number>;
  byTag: Record<string, number>;
  scoreDistribution: { range: string; count: number }[];
  recentActivity: { date: string; count: number }[];
}

const DashboardPage: React.FC = () => {
  const [prds, setPrds] = useState<SavedPrd[]>([]);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('month');

  useEffect(() => {
    setPrds(getPrds());
  }, []);

  const filteredPrds = useMemo(() => {
    if (timeRange === 'all') return prds;
    
    const now = new Date();
    const filterDate = new Date();
    
    if (timeRange === 'week') {
      filterDate.setDate(now.getDate() - 7);
    } else {
      filterDate.setMonth(now.getMonth() - 1);
    }
    
    return prds.filter(prd => new Date(prd.createdAt) >= filterDate);
  }, [prds, timeRange]);

  const stats: DashboardStats = useMemo(() => {
    const totalPrds = filteredPrds.length;
    
    // Score médio
    const scores = filteredPrds.filter(p => p.completeness_score).map(p => p.completeness_score!);
    const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    
    // Horas e custos médios
    const estimates = filteredPrds.filter(p => p.project_estimate);
    const avgHours = estimates.length > 0
      ? Math.round(estimates.reduce((sum, p) => sum + ((p.project_estimate!.estimated_hours.min + p.project_estimate!.estimated_hours.max) / 2), 0) / estimates.length)
      : 0;
    
    const totalCost = estimates.reduce((sum, p) => {
      const avg = (p.project_estimate!.estimated_cost.min + p.project_estimate!.estimated_cost.max) / 2;
      return sum + avg;
    }, 0);
    
    // Status de aprovação (baseado no score)
    const approvedCount = filteredPrds.filter(p => (p.completeness_score || 0) >= 80).length;
    const pendingCount = filteredPrds.filter(p => (p.completeness_score || 0) >= 60 && (p.completeness_score || 0) < 80).length;
    const rejectedCount = filteredPrds.filter(p => (p.completeness_score || 0) < 60).length;
    
    // Por complexidade
    const byComplexity: Record<string, number> = {};
    filteredPrds.forEach(p => {
      if (p.project_estimate) {
        const complexity = p.project_estimate.complexity;
        byComplexity[complexity] = (byComplexity[complexity] || 0) + 1;
      }
    });
    
    // Por risco
    const byRisk: Record<string, number> = {};
    filteredPrds.forEach(p => {
      if (p.security_analysis) {
        const risk = p.security_analysis.overall_risk;
        byRisk[risk] = (byRisk[risk] || 0) + 1;
      }
    });
    
    // Por tag
    const byTag: Record<string, number> = {};
    filteredPrds.forEach(p => {
      p.tags?.forEach(tag => {
        byTag[tag] = (byTag[tag] || 0) + 1;
      });
    });
    
    // Distribuição de scores
    const scoreDistribution = [
      { range: '0-20', count: filteredPrds.filter(p => (p.completeness_score || 0) < 20).length },
      { range: '20-40', count: filteredPrds.filter(p => (p.completeness_score || 0) >= 20 && (p.completeness_score || 0) < 40).length },
      { range: '40-60', count: filteredPrds.filter(p => (p.completeness_score || 0) >= 40 && (p.completeness_score || 0) < 60).length },
      { range: '60-80', count: filteredPrds.filter(p => (p.completeness_score || 0) >= 60 && (p.completeness_score || 0) < 80).length },
      { range: '80-100', count: filteredPrds.filter(p => (p.completeness_score || 0) >= 80).length },
    ];
    
    // Atividade recente (últimos 7 dias)
    const recentActivity: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      const count = filteredPrds.filter(p => {
        const prdDate = new Date(p.createdAt);
        return prdDate.toDateString() === date.toDateString();
      }).length;
      recentActivity.push({ date: dateStr, count });
    }
    
    return {
      totalPrds,
      avgScore,
      avgHours,
      totalCost,
      approvedCount,
      pendingCount,
      rejectedCount,
      byComplexity,
      byRisk,
      byTag,
      scoreDistribution,
      recentActivity,
    };
  }, [filteredPrds]);

  const topTags = useMemo(() => {
    return Object.entries(stats.byTag)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  }, [stats.byTag]);

  const approvalRate = stats.totalPrds > 0 
    ? Math.round((stats.approvedCount / stats.totalPrds) * 100) 
    : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-content-100">📊 Dashboard</h1>
          <p className="text-content-200 mt-1">Análise completa dos seus PRDs</p>
        </div>
        
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as any)}
          className="bg-base-200 text-content-200 px-4 py-2 rounded-md border border-base-300 focus:ring-2 focus:ring-brand-secondary focus:outline-none"
        >
          <option value="week">Última semana</option>
          <option value="month">Último mês</option>
          <option value="all">Todos os períodos</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total PRDs */}
        <div className="bg-base-200 p-6 rounded-lg shadow-md border-l-4 border-brand-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-content-200 text-sm">Total de PRDs</p>
              <p className="text-3xl font-bold text-content-100 mt-1">{stats.totalPrds}</p>
            </div>
            <div className="text-4xl">📝</div>
          </div>
        </div>

        {/* Score Médio */}
        <div className="bg-base-200 p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-content-200 text-sm">Score Médio</p>
              <p className="text-3xl font-bold text-content-100 mt-1">{stats.avgScore}%</p>
            </div>
            <div className="text-4xl">⭐</div>
          </div>
        </div>

        {/* Taxa de Aprovação */}
        <div className="bg-base-200 p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-content-200 text-sm">Taxa de Aprovação</p>
              <p className="text-3xl font-bold text-content-100 mt-1">{approvalRate}%</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>

        {/* Custo Total */}
        <div className="bg-base-200 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-content-200 text-sm">Custo Estimado</p>
              <p className="text-3xl font-bold text-content-100 mt-1">
                R$ {Math.round(stats.totalCost / 1000)}k
              </p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>
      </div>

      {/* Status de Aprovação */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-base-200 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-content-100">✅ Aprovados</h3>
            <span className="text-2xl font-bold text-green-400">{stats.approvedCount}</span>
          </div>
          <div className="w-full bg-base-300 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all"
              style={{ width: `${stats.totalPrds > 0 ? (stats.approvedCount / stats.totalPrds) * 100 : 0}%` }}
            ></div>
          </div>
          <p className="text-xs text-content-200 mt-2">Score ≥ 80%</p>
        </div>

        <div className="bg-base-200 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-content-100">⏳ Pendentes</h3>
            <span className="text-2xl font-bold text-yellow-400">{stats.pendingCount}</span>
          </div>
          <div className="w-full bg-base-300 rounded-full h-3">
            <div 
              className="bg-yellow-500 h-3 rounded-full transition-all"
              style={{ width: `${stats.totalPrds > 0 ? (stats.pendingCount / stats.totalPrds) * 100 : 0}%` }}
            ></div>
          </div>
          <p className="text-xs text-content-200 mt-2">Score 60-79%</p>
        </div>

        <div className="bg-base-200 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-content-100">❌ Rejeitados</h3>
            <span className="text-2xl font-bold text-red-400">{stats.rejectedCount}</span>
          </div>
          <div className="w-full bg-base-300 rounded-full h-3">
            <div 
              className="bg-red-500 h-3 rounded-full transition-all"
              style={{ width: `${stats.totalPrds > 0 ? (stats.rejectedCount / stats.totalPrds) * 100 : 0}%` }}
            ></div>
          </div>
          <p className="text-xs text-content-200 mt-2">Score &lt; 60%</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição de Scores */}
        <div className="bg-base-200 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-content-100 mb-4">📊 Distribuição de Scores</h3>
          <div className="space-y-3">
            {stats.scoreDistribution.map((item) => {
              const percentage = stats.totalPrds > 0 ? (item.count / stats.totalPrds) * 100 : 0;
              return (
                <div key={item.range}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-content-200">{item.range}%</span>
                    <span className="text-content-100 font-semibold">{item.count} PRDs</span>
                  </div>
                  <div className="w-full bg-base-300 rounded-full h-2">
                    <div 
                      className="bg-brand-secondary h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Atividade Recente */}
        <div className="bg-base-200 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-content-100 mb-4">📈 Atividade (Últimos 7 dias)</h3>
          <div className="flex items-end justify-between h-40 gap-2">
            {stats.recentActivity.map((day, index) => {
              const maxCount = Math.max(...stats.recentActivity.map(d => d.count), 1);
              const height = (day.count / maxCount) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex items-end justify-center h-32">
                    <div 
                      className="w-full bg-brand-primary rounded-t hover:bg-brand-secondary transition-all cursor-pointer"
                      style={{ height: `${height}%` }}
                      title={`${day.count} PRDs`}
                    ></div>
                  </div>
                  <span className="text-xs text-content-200 mt-2">{day.date}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Por Complexidade */}
        <div className="bg-base-200 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-content-100 mb-4">🎯 Por Complexidade</h3>
          <div className="space-y-3">
            {Object.entries(stats.byComplexity).map(([complexity, count]) => (
              <div key={complexity} className="flex justify-between items-center">
                <span className="text-content-200 capitalize">{complexity.replace('_', ' ')}</span>
                <span className="px-3 py-1 bg-base-300 text-content-100 rounded-full text-sm font-semibold">
                  {count}
                </span>
              </div>
            ))}
            {Object.keys(stats.byComplexity).length === 0 && (
              <p className="text-content-200 text-sm text-center py-4">Nenhum dado disponível</p>
            )}
          </div>
        </div>

        {/* Por Risco */}
        <div className="bg-base-200 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-content-100 mb-4">🔒 Por Risco de Segurança</h3>
          <div className="space-y-3">
            {Object.entries(stats.byRisk).map(([risk, count]) => {
              const color = risk === 'low' ? 'text-green-400' : risk === 'medium' ? 'text-yellow-400' : 'text-red-400';
              return (
                <div key={risk} className="flex justify-between items-center">
                  <span className={`capitalize font-semibold ${color}`}>{risk}</span>
                  <span className="px-3 py-1 bg-base-300 text-content-100 rounded-full text-sm font-semibold">
                    {count}
                  </span>
                </div>
              );
            })}
            {Object.keys(stats.byRisk).length === 0 && (
              <p className="text-content-200 text-sm text-center py-4">Nenhum dado disponível</p>
            )}
          </div>
        </div>

        {/* Top Tags */}
        <div className="bg-base-200 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-content-100 mb-4">🏷️ Tags Mais Usadas</h3>
          <div className="space-y-3">
            {topTags.map(([tag, count]) => (
              <div key={tag} className="flex justify-between items-center">
                <span className="text-content-200">{tag}</span>
                <span className="px-3 py-1 bg-brand-primary/20 text-brand-secondary rounded-full text-sm font-semibold">
                  {count}
                </span>
              </div>
            ))}
            {topTags.length === 0 && (
              <p className="text-content-200 text-sm text-center py-4">Nenhuma tag ainda</p>
            )}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 p-6 rounded-lg border border-brand-primary/20">
        <h3 className="text-lg font-semibold text-content-100 mb-4">💡 Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📈</span>
            <div>
              <p className="text-content-100 font-semibold">Qualidade Média</p>
              <p className="text-content-200 text-sm">
                {stats.avgScore >= 80 ? 'Excelente! Seus PRDs estão muito bem estruturados.' :
                 stats.avgScore >= 60 ? 'Bom trabalho! Há espaço para melhorias.' :
                 'Considere adicionar mais detalhes aos seus PRDs.'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="text-2xl">⏱️</span>
            <div>
              <p className="text-content-100 font-semibold">Estimativa Média</p>
              <p className="text-content-200 text-sm">
                {stats.avgHours > 0 ? `Seus projetos levam em média ${stats.avgHours} horas.` : 'Gere PRDs para ver estimativas.'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="text-content-100 font-semibold">Taxa de Aprovação</p>
              <p className="text-content-200 text-sm">
                {approvalRate >= 70 ? 'Ótima taxa de aprovação!' :
                 approvalRate >= 50 ? 'Considere revisar PRDs antes de finalizar.' :
                 'Foque em aumentar a completude dos PRDs.'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚀</span>
            <div>
              <p className="text-content-100 font-semibold">Produtividade</p>
              <p className="text-content-200 text-sm">
                {stats.totalPrds > 10 ? 'Você está muito produtivo!' :
                 stats.totalPrds > 5 ? 'Continue criando PRDs!' :
                 'Comece a documentar seus projetos!'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {stats.totalPrds === 0 && (
        <div className="bg-base-200 p-12 rounded-lg text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-bold text-content-100 mb-2">Nenhum PRD ainda</h3>
          <p className="text-content-200 mb-6">
            Crie seu primeiro PRD para ver análises e métricas aqui!
          </p>
          <a
            href="#/"
            className="inline-block bg-brand-primary hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-md transition-colors"
          >
            Criar Primeiro PRD
          </a>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
