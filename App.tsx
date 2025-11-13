
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import DashboardPage from './pages/DashboardPage';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
        <footer className="text-center p-6 text-sm text-gray-400 border-t border-base-300 bg-base-200">
          <div className="space-y-2">
            <p className="font-semibold text-content-100">
              Desenvolvedor: <span className="text-brand-secondary">Murillo Matos</span>
            </p>
            <p>
              Powered by:{' '}
              <a 
                href="https://www.instagram.com/web_solucoesdigitais/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-secondary hover:text-blue-400 transition-colors underline font-semibold"
              >
                Web Soluções Digitais
              </a>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Versão: v1.1.0
            </p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
