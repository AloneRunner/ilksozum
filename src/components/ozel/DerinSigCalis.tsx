import React from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import AsamaliCalisma from './AsamaliCalisma.tsx';
import { karistir, zar, type Tur } from './ozelOrtak.tsx';

// Derin / Sığ (Gökhan Hoca, 2026-10-29): yalnız derinlik değişir; model, renk, çap ve açı aynı; kaplar çapraz yukarıdan,
// içleri görünür. Derin kabın fotoğrafında ağız ve taban aynı kalır, yalnız yan duvar kısalır (tools/gorsel-envanter/derinlik-uret.py).
// Tabak, tencere, leğen, kase, kova, kutu, fırın kabı (aynı model). Sepet ve çukur çıkarıldı; havuz (çocuklu foto) alınmadı.
// Tanı'da animasyon: aynı top derin kapta kaybolur, sığ kapta görünür. Sığ tabağın adı "düz tabak".
// Sıra: Tanı → yalnız "derin" (2 şık × 10) → yalnız "sığ" (2 şık × 10) → karışık.
const NESNE: [string, string][] = [['tabak', 'tabak'], ['tencere', 'tencere'], ['leğen', 'legen'], ['fırın kabı', 'firin-kabi'], ['kase', 'kase'], ['kova', 'kova'], ['kutu', 'kutu']];
const foto = (dosya: string, i: number) => <img src={`/images/ozel/derin-sig/${dosya}-${i}.webp`} alt="" draggable={false} className="h-full w-full object-contain" />;
const sigAd = (ad: string) => (ad === 'tabak' ? 'düz tabak' : `sığ ${ad}`);

const BELIRGIN = [[0, 3], [0, 2], [1, 3]];
const YAKIN = [[0, 1], [1, 2], [2, 3], [0, 2], [1, 3]];
const tur = (derin: boolean, ciftler: number[][]): Tur => {
  const [ad, dosya] = NESNE[zar(NESNE.length)];
  const [a, b] = ciftler[zar(ciftler.length)];
  const k = derin ? 'derin' : 'sığ';
  return {
    soru: `Hangi ${ad} ${k}?`, dogruId: String(derin ? b : a), dogruSoz: `Evet! Bu ${ad} ${k}.`,
    secenekler: karistir([a, b]).map((i) => ({ id: String(i), icerik: <span className="relative block w-full aspect-square bg-white"><span className="absolute inset-2">{foto(dosya, i)}</span></span> })),
  };
};
const on = (f: () => Tur) => Array.from({ length: 10 }, f);

// Yandan kesit: arka kenar, top, ön duvar. Top düşer: derin kapta ön duvarın arkasında kaybolur, sığ kapta görünür kalır.
const TopAnimasyon: React.FC<{ derin: boolean }> = ({ derin }) => {
  const ust = derin ? 40 : 97; // kabın ağzı (y); sığda duvar topun yarısından alçak
  return (
    <svg viewBox="0 0 100 130" className="w-full h-auto" role="img" aria-label={derin ? 'top derin kapta kaybolur' : 'top sığ kapta görünür'}>
      <rect width="100" height="130" rx="8" fill="#f1f5f9" />
      <ellipse cx="50" cy={ust} rx="36" ry="7" fill="#1e3a8a" />
      <circle cx="50" r="12" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5">
        <animate attributeName="cy" values="10;10;92;88;92;92" keyTimes="0;0.15;0.5;0.58;0.66;1" dur="3s" repeatCount="indefinite" />
      </circle>
      <path d={`M14 ${ust} C14 ${ust + 4} 86 ${ust + 4} 86 ${ust} L80 106 C80 112 20 112 20 106 Z`} fill="#3b82f6" />
      <path d={`M14 ${ust} C14 ${ust + 7} 86 ${ust + 7} 86 ${ust}`} stroke="#93c5fd" strokeWidth="2" fill="none" />
      <text x="50" y="125" textAnchor="middle" fontSize="8" fontWeight="800" fill={derin ? '#1e3a8a' : '#b45309'}>{derin ? 'top kayboldu' : 'top görünüyor'}</text>
    </svg>
  );
};

const Tani: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <OyunCercevesi baslik="Derin / Sığ" emoji="🥣" onBack={onBack} yonerge="Resme dokun, dinle.">
    <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
      <button onClick={() => speak('Top derin kapta kayboldu. Sığ kapta görünüyor.')} className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto rounded-3xl bg-white p-3 shadow-lg active:scale-[.99]">
        <span><TopAnimasyon derin /><span className="block text-xl font-black text-slate-800">derin kap</span></span>
        <span><TopAnimasyon derin={false} /><span className="block text-xl font-black text-slate-800">sığ kap</span></span>
      </button>
      <div className="grid grid-cols-1 landscape:grid-cols-2 gap-3 w-full max-w-4xl mx-auto">
        {NESNE.map(([ad, dosya]) => (
          <div key={dosya} className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-lg">
            {([['derin', 3], ['sığ', 0]] as const).map(([k, i]) => (
              <button key={k} onClick={() => speak(`Bu ${ad} ${k}.`)} className="rounded-2xl active:scale-95">
                <span className="block aspect-square p-1">{foto(dosya, i)}</span>
                <span className="block text-lg font-black text-slate-800">{k === 'derin' ? `derin ${ad}` : sigAd(ad)}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  </OyunCercevesi>
);

const DerinSigCalis: React.FC<{ onBack: () => void; onSorular: () => void }> = ({ onBack, onSorular }) => (
  <AsamaliCalisma id="derinSigCalis" baslik="Derin / Sığ" emoji="🥣" onBack={onBack} onSorular={onSorular}
    aciklama="Aynı kap, yalnız derinliği farklı; içi görünür. Önce yalnız “derin”, sonra yalnız “sığ”; en son karışık."
    tani={(bitti) => <Tani onBack={bitti} />} taniAlt="Top derin kapta kaybolur, sığ kapta görünür; derin ve sığ kaplar"
    asamalar={[
      { ad: 'Derin · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur(true, BELIRGIN)) },
      { ad: 'Sığ · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur(false, BELIRGIN)) },
    ]}
    karisik={{ alt: '30 soru, derin ve sığ karışık; derinlikler birbirine yakın', secenek: 2,
      turlar: () => Array.from({ length: 30 }, () => tur(zar(2) === 0, YAKIN)) }} />
);

export default DerinSigCalis;
