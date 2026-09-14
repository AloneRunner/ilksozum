

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Capacitor } from '@capacitor/core';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Çevrimdışı servis çalışanı: yalnız tarayıcıda ve yayın derlemesinde kaydedilir.
// Android uygulamasında (Capacitor) kaydedilmez. Dosya önbelleğe almaz; yalnız ağ
// tamamen kesildiğinde /offline.html gösterir. Microsoft Store PWA paketi için gerekli.
if (import.meta.env.PROD && !Capacitor.isNativePlatform() && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((error) => {
      console.warn("İlk Sözüm servis çalışanı kaydedilemedi:", error);
    });
  });
}
