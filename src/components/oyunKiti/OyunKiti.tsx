import React, { useEffect, useMemo, useState } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';
import KonusanAgiz from '../agiz/KonusanAgiz.tsx';
import { speak, playEffect } from '../../services/speechService.ts';

// Ortak oyun kiti (Kaan, 2026-10-08: "mini oyunları baştan, çok daha kaliteli, çocuklara yönelik").
// Kurallar: puan, süre, can yok; başarısızlık ekranı yok; yazı okumadan oynanır (yönerge sesli);
// zorluk menüsü yok, oyun kolay başlar ve çocuk başardıkça kendiliğinden zorlaşır.

const STIL = `
@keyframes ok-konfeti { 0% { transform: translate(0,0) rotate(0); opacity: 1 } 100% { transform: translate(var(--dx), var(--dy)) rotate(var(--r)); opacity: 0 } }
@keyframes ok-yildiz { 0% { transform: scale(0) rotate(-30deg) } 60% { transform: scale(1.25) rotate(8deg) } 100% { transform: scale(1) rotate(0) } }
@keyframes ok-sallan { 0%,100% { transform: translateX(0) } 25% { transform: translateX(-8px) } 75% { transform: translateX(8px) } }
@keyframes ok-zipla { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
.ok-sallan { animation: ok-sallan .35s ease-in-out 2 }
.ok-zipla { animation: ok-zipla .9s ease-in-out infinite }
`;

/** Bütün oyunlarda aynı çerçeve: geri, başlık, ilerleme noktaları, Gökçe ve yönerge balonu. */
export const OyunCercevesi: React.FC<{
  baslik: string; emoji: string; onBack: () => void;
  adim?: number; toplamAdim?: number;
  yonerge?: string; // Gökçe'nin balonu; yüze dokununca tekrar söylenir
  children: React.ReactNode;
}> = ({ baslik, emoji, onBack, adim, toplamAdim, yonerge, children }) => (
  <div className="relative flex flex-col h-full w-full overflow-hidden bg-gradient-to-b from-sky-100 via-white to-emerald-50">
    <style>{STIL}</style>
    <header className="flex items-center gap-2 px-3 pt-3 pb-1 shrink-0 z-10">
      <button onClick={onBack} className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center active:scale-95" aria-label="Geri dön">
        <ArrowLeftIcon className="w-7 h-7 text-slate-700" />
      </button>
      <h1 className="flex-1 text-xl font-black text-slate-800 truncate">{emoji} {baslik}</h1>
      {toplamAdim ? (
        <div className="flex gap-1.5" aria-label={`${adim} / ${toplamAdim}`}>
          {Array.from({ length: toplamAdim }, (_, i) => (
            <span key={i} className={`w-3 h-3 rounded-full ${i < (adim ?? 0) ? 'bg-amber-400' : 'bg-slate-200'}`} />
          ))}
        </div>
      ) : null}
    </header>
    {yonerge && (
      <button onClick={() => speak(yonerge)} className="mx-3 mb-1 flex items-center gap-2 text-left shrink-0 z-10" aria-label="Yönergeyi tekrar dinle">
        <KonusanAgiz className="w-14 h-14 shrink-0 drop-shadow" />
        <span className="relative bg-white rounded-2xl px-3 py-2 shadow text-base font-bold text-slate-700 leading-snug">{yonerge}</span>
      </button>
    )}
    <main className="relative flex-1 min-h-0">{children}</main>
  </div>
);

/** Başarı kutlaması: konfeti + büyük yıldız; süre dolunca onBitti. */
export const Kutlama: React.FC<{ acik: boolean; yazi?: string; onBitti?: () => void; sure?: number; alt?: boolean }> = ({ acik, yazi = 'Aferin!', onBitti, sure = 1700, alt }) => {
  const parcalar = useMemo(() => Array.from({ length: 34 }, (_, i) => ({
    renk: ['#f43f5e', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'][i % 6],
    dx: `${(Math.random() - 0.5) * 520}px`, dy: `${-120 - Math.random() * 360}px`, r: `${Math.random() * 720 - 360}deg`,
    gecikme: Math.random() * 0.15, boy: 8 + Math.random() * 8,
  })), [acik]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!acik) return;
    playEffect('correct');
    const z = setTimeout(() => onBitti?.(), sure);
    return () => clearTimeout(z);
  }, [acik]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!acik) return null;
  return (
    <div className={`absolute inset-0 z-40 flex justify-center pointer-events-none ${alt ? 'items-end pb-[12%]' : 'items-center'}`}>
      <div className="absolute left-1/2 top-1/2">
        {parcalar.map((p, i) => (
          <span key={i} className="absolute rounded-sm" style={{
            width: p.boy, height: p.boy * 0.6, background: p.renk,
            ['--dx' as string]: p.dx, ['--dy' as string]: p.dy, ['--r' as string]: p.r,
            animation: `ok-konfeti 1.3s ${p.gecikme}s cubic-bezier(.2,.7,.4,1) forwards`,
          } as React.CSSProperties} />
        ))}
      </div>
      <div className="flex flex-col items-center" style={{ animation: 'ok-yildiz .55s ease-out both' }}>
        <span className="text-8xl drop-shadow-lg">⭐</span>
        <span className="mt-1 px-5 py-2 rounded-full bg-white/95 shadow-lg text-3xl font-black text-amber-500">{yazi}</span>
      </div>
    </div>
  );
};

/** Oturum sonu: büyük kutlama + "Tekrar" / "Bitti". */
export const OyunSonu: React.FC<{ onTekrar: () => void; onBack: () => void }> = ({ onTekrar, onBack }) => {
  useEffect(() => { speak('Tebrikler, oyunu bitirdin!'); }, []);
  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 bg-white/80 backdrop-blur-sm">
      <span className="text-8xl ok-zipla">🏆</span>
      <span className="text-3xl font-black text-slate-800">Harika oynadın!</span>
      <div className="flex gap-3">
        <button onClick={onTekrar} className="px-6 py-4 rounded-3xl bg-emerald-500 text-white text-2xl font-black shadow-lg active:scale-95">🔁 Tekrar</button>
        <button onClick={onBack} className="px-6 py-4 rounded-3xl bg-white text-slate-700 text-2xl font-black shadow-lg active:scale-95">🏠 Çık</button>
      </div>
    </div>
  );
};

/**
 * Kendiliğinden ayarlanan zorluk: 2 başarı üst üste → bir seviye zor; zorlanınca (yardım gerekince) bir seviye kolay.
 * Profil başına saklanır; çocuk ertesi gün kaldığı yerden başlar.
 */
export const useSeviye = (oyun: string, maks: number) => {
  const profil = (() => { try { return JSON.parse(localStorage.getItem('activeProfileId_v1') || 'null') || 'misafir'; } catch { return 'misafir'; } })();
  const anahtar = `oyun_seviye_${oyun}_${profil}`;
  const [seviye, setSeviye] = useState<number>(() => { try { return Math.min(maks, Number(localStorage.getItem(anahtar)) || 0); } catch { return 0; } });
  const [seri, setSeri] = useState(0);
  const kaydet = (s: number) => { setSeviye(s); try { localStorage.setItem(anahtar, String(s)); } catch { /* yok say */ } };
  const basari = () => { const y = seri + 1; if (y >= 2 && seviye < maks) { kaydet(seviye + 1); setSeri(0); } else setSeri(y); };
  const zorlandi = () => { setSeri(0); if (seviye > 0) kaydet(seviye - 1); };
  return { seviye, basari, zorlandi };
};
