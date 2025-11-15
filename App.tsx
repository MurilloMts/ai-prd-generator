
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import DashboardPage from './pages/DashboardPage';
import Header from './components/Header';
import PWAUpdateNotification from './components/PWAUpdateNotification';
import PWAInstallPrompt from './components/PWAInstallPrompt';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PWAUpdateNotification />
      <PWAInstallPrompt />
      <div className="h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto p-4 md:p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
        <footer className="text-center p-4 md:p-6 text-sm text-gray-400 border-t border-base-300 bg-base-200 flex-shrink-0">
          <div className="space-y-2">
            <p className="font-semibold text-content-100">
              Desenvolvedor: <span className="text-brand-secondary">Murillo Matos</span>
            </p>
            <p>
              Powered by:{' '}
              <a 
                href="https://webdigital.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-secondary hover:text-blue-400 transition-colors underline font-semibold"
              >
                Web Digital
              </a>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Versão: v1.3.0
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
