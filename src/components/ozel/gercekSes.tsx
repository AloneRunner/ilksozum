import React, { useState } from 'react';
import { getMutedState } from '../../services/speechService.ts';

// Gürültülü/Sessiz'in gerçek sesleri (Gökhan Hoca, 2026-11-09: "gerçek ses çalsın, ses seviyesi ve kapatma ayarı olsun").
// Sese hassas çocuklar için varsayılan seviye "Az"; aile kapatabilir. Ayar cihazda, bütün profillerde ortak.
const ANAHTAR = 'gercekSes_v1';
const SEVIYELER: [string, number][] = [['Az', 0.3], ['Orta', 0.6], ['Çok', 1]];
interface Ayar { acik: boolean; seviye: number }
const oku = (): Ayar => { try { return { acik: true, seviye: 0, ...JSON.parse(localStorage.getItem(ANAHTAR) || '{}') }; } catch { return { acik: true, seviye: 0 }; } };

export const gercekSesCal = (dosya: string, kisik = false): Promise<void> => new Promise((bitti) => {
  const a = oku();
  if (!a.acik || getMutedState()) { bitti(); return; }
  const ses = new Audio(`/audio/gercek/${dosya}.mp3`);
  ses.volume = SEVIYELER[a.seviye][1] * (kisik ? 0.5 : 1);
  const z = setTimeout(bitti, 4500);
  ses.onended = ses.onerror = () => { clearTimeout(z); bitti(); };
  ses.play().catch(() => { clearTimeout(z); bitti(); });
});

export const GercekSesAyari: React.FC = () => {
  const [a, setA] = useState(oku);
  const degistir = (y: Ayar) => { setA(y); try { localStorage.setItem(ANAHTAR, JSON.stringify(y)); } catch { /* yok say */ } };
  return (
    <div className="flex items-center justify-center gap-2 shrink-0">
      <button onClick={() => degistir({ ...a, acik: !a.acik })} className={`rounded-full px-4 py-1.5 text-sm font-black shadow-sm active:scale-95 ${a.acik ? 'bg-sky-500 text-white' : 'bg-slate-300 text-slate-700'}`}>
        {a.acik ? '🔊 Gerçek ses açık' : '🔇 Gerçek ses kapalı'}
      </button>
      {a.acik && SEVIYELER.map(([ad], i) => (
        <button key={ad} onClick={() => degistir({ ...a, seviye: i })} className={`rounded-full px-3 py-1.5 text-sm font-black shadow-sm active:scale-95 ${a.seviye === i ? 'bg-amber-400 text-amber-950' : 'bg-white text-slate-600'}`}>{ad}</button>
      ))}
    </div>
  );
};
