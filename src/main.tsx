import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Register Service Worker on mobile phones to cache the full website locally
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth < 1024);
  if (isMobileDevice) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          console.log('[FusionHub] Mobile Full-Website Cache Active:', reg.scope);
        })
        .catch((err) => {
          console.warn('[FusionHub] ServiceWorker registration skipped:', err);
        });
    });
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
