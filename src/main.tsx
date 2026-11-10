

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Capacitor } from '@capacitor/core';
import './index.css';
import { eskiGorselYedeginiKur } from './services/nesneGorsel.ts';
import { acilisSay } from './services/sayac.ts';

eskiGorselYedeginiKur();
// Yeni kurulumda "Yanlışta kavramı olumsuzla" açık başlar (Gökhan Hoca); gizlilik onayı olan mevcut kullanıcının ayarı değişmez.
try { if (localStorage.getItem('yanlisOlumsuz_v1') === null && localStorage.getItem('privacy_consent_v1') === null) localStorage.setItem('yanlisOlumsuz_v1', 'true'); } catch { /* yok say */ }
// Kimliksiz kullanım sayacı: günde bir açılış (arka plandan dönünce yeni günse yine sayılır)
acilisSay();
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') acilisSay(); });

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
