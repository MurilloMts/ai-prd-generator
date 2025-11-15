import React, { useEffect, useState } from 'react';

const PWAUpdateNotification: React.FC = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    // Verifica se o navegador suporta Service Workers
    if ('serviceWorker' in navigator) {
      // Registra o Service Worker
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registrado:', registration);

          // Verifica se há uma atualização esperando
          if (registration.waiting) {
            setWaitingWorker(registration.waiting);
            setShowUpdate(true);
          }

          // Escuta por atualizações
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Nova versão disponível
                  setWaitingWorker(newWorker);
                  setShowUpdate(true);
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('❌ Erro ao registrar Service Worker:', error);
        });

      // Escuta por mudanças no Service Worker
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    }
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      // Envia mensagem para o Service Worker ativar
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      setShowUpdate(false);
    }
  };

  const handleDismiss = () => {
    setShowUpdate(false);
  };

  if (!showUpdate) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-lg shadow-2xl max-w-md mx-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 text-2xl">🎉</div>
          <div className="flex-grow">
            <h3 className="font-bold text-lg mb-1">Nova Versão Disponível!</h3>
            <p className="text-sm text-blue-100 mb-3">
              Uma atualização do PRD está pronta. Clique em atualizar para obter as últimas melhorias.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-white text-blue-600 font-semibold py-2 px-4 rounded-md hover:bg-blue-50 transition-colors"
              >
                Atualizar Agora
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 text-white hover:bg-white/20 rounded-md transition-colors"
              >
                Depois
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAUpdateNotification;
