import React, { useEffect, useState } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';

// Şekilleri Tanıyalım (Kaan, 2026-10-15): Sayaç verisi — "Şekiller" %54 doğru (iki seçenekte yazı-tura): çocuklar şekil adlarını
// henüz bilmiyor. Soru sormadan önce her şekil büyük gösterilir ve adı söylenir. Soru yok, süre yok; "Geç" ile atlanır.
interface Sekil { ad: string; sira: number } // sira: 7201 + sira (+7 × renk)
const SEKILLER: Sekil[] = [
  { ad: 'daire', sira: 0 }, { ad: 'kare', sira: 3 }, { ad: 'üçgen', sira: 5 }, { ad: 'yıldız', sira: 6 },
  { ad: 'kalp', sira: 2 }, { ad: 'dikdörtgen', sira: 1 }, { ad: 'oval', sira: 4 },
];
const buyuk = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);

const SekilOgren: React.FC<{ onBitti: () => void; onBack: () => void }> = ({ onBitti, onBack }) => {
  const [i, setI] = useState(0);
  const s = SEKILLER[i];
  const id = 7201 + s.sira + 7 * (i % 4);
  const soyle = () => speak(`Bu ${s.ad}. ${buyuk(s.ad)}.`);

  useEffect(() => { const z = setTimeout(soyle, 300); return () => clearTimeout(z); }, [i]); // eslint-disable-line react-hooks/exhaustive-deps

  const ileri = () => {
    if (i + 1 >= SEKILLER.length) { speak('Şimdi sen bul!'); setTimeout(onBitti, 1100); }
    else setI(i + 1);
  };

  return (
    <OyunCercevesi baslik="Şekiller" emoji="🔷" onBack={onBack} adim={i + 1} toplamAdim={SEKILLER.length} yonerge={`Bu ${s.ad}.`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6">
        <button onClick={soyle} className="bg-white rounded-[2rem] shadow-xl p-6 active:scale-95 transition-transform" aria-label={s.ad} key={i}
          style={{ animation: 'ok-yildiz .5s ease-out both' }}>
          <img src={`/images/${id}.webp`} alt={s.ad} className="w-56 h-56 object-contain" draggable={false} />
        </button>
        <span className="text-4xl font-black text-slate-800">{buyuk(s.ad)}</span>
        <div className="flex gap-3">
          <button onClick={onBitti} className="px-5 py-3 rounded-2xl bg-white text-slate-500 text-lg font-bold shadow active:scale-95">Geç ⏭</button>
          <button onClick={ileri} className="px-8 py-3 rounded-2xl bg-emerald-500 text-white text-2xl font-black shadow-lg active:scale-95">Sonraki ▶</button>
        </div>
      </div>
    </OyunCercevesi>
  );
};

export default SekilOgren;
