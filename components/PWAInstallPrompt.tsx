import React, { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Previne o prompt automático
      e.preventDefault();
      // Guarda o evento para usar depois
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Verifica se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstall(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Mostra o prompt de instalação
    deferredPrompt.prompt();

    // Aguarda a escolha do usuário
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('✅ PWA instalado');
    } else {
      console.log('❌ Instalação cancelada');
    }

    // Limpa o prompt
    setDeferredPrompt(null);
    setShowInstall(false);
  };

  const handleDismiss = () => {
    setShowInstall(false);
    // Guarda que o usuário dispensou (pode implementar localStorage aqui)
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Não mostra se já foi dispensado
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed === 'true') {
      setShowInstall(false);
    }
  }, []);

  if (!showInstall) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-down">
      <div className="bg-base-200 border-2 border-brand-primary text-content-100 px-4 py-3 rounded-lg shadow-xl max-w-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 text-2xl">📱</div>
          <div className="flex-grow">
            <h3 className="font-bold text-sm mb-1">Instalar PRD</h3>
            <p className="text-xs text-content-200 mb-2">
              Instale o app para acesso rápido e uso offline!
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="flex-1 bg-brand-primary text-white text-xs font-semibold py-1.5 px-3 rounded-md hover:bg-blue-800 transition-colors"
              >
                Instalar
              </button>
              <button
                onClick={handleDismiss}
                className="text-xs px-3 py-1.5 text-content-200 hover:bg-base-300 rounded-md transition-colors"
              >
                Agora não
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
