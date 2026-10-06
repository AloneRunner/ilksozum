import React from 'react';
import type { Tasarim } from './ui/tasarim.ts';

// Temalı ana menü (Orman, Deniz, Gökkuşağı, Konfeti): Sade temadan tamamen farklı kartlar ve düğmeler.
interface Kart { id: string; emoji: string; title: string; subtitle: string; grad: string }
interface Props {
  tas: Tasarim;
  kartlar: Kart[];
  onKart: (id: string) => void;
  onProgram: () => void;
  onRastgele: () => void;
  ebeveyn: Array<{ id: string; emoji: string; label: string; onClick: () => void }>;
  selam: string;
  baslik: string;
  children?: React.ReactNode;
}

const TemaliAnaMenu: React.FC<Props> = ({ tas, kartlar, onKart, onProgram, onRastgele, ebeveyn, selam, baslik, children }) => (
  <div className="relative flex flex-col items-center h-full w-full max-w-lg landscape:max-w-5xl mx-auto px-4 pt-4 pb-6 overflow-y-auto animate-fade-in">
    <div className={`text-center mb-5 ${tas.baslikKutu}`}>
      <p className={tas.baslikUst}>{selam}</p>
      <h1 className={tas.baslikAna}>{baslik}</h1>
    </div>

    <div className="w-full grid grid-cols-2 gap-4 mb-5">
      {[
        { on: onProgram, cls: tas.programDugme, emoji: '🎓', ad: 'Program Modu', alt: '10 ünite · günlük plan' },
        { on: onRastgele, cls: tas.rastgeleDugme, emoji: '🎲', ad: 'Rastgele Oyna', alt: 'Karışık etkinlikler' },
      ].map((d) => (
        <button key={d.ad} onClick={d.on} className={`flex flex-col items-center justify-center gap-1 p-4 transition active:scale-95 ${d.cls}`}>
          <span className="text-4xl" aria-hidden="true">{d.emoji}</span>
          <span className={`text-base font-black leading-tight ${tas.modYazi}`}>{d.ad}</span>
          <span className={`text-[11px] font-semibold ${tas.modAlt}`}>{d.alt}</span>
        </button>
      ))}
    </div>

    <div className="w-full grid grid-cols-2 landscape:grid-cols-4 gap-4">
      {kartlar.map((k, i) => (
        <button key={k.id} onClick={() => onKart(k.id)} className={`flex flex-col items-center text-center p-3 pt-4 min-h-[150px] transition ${tas.kart(i, k.grad)}`}>
          <span className={`w-16 h-16 flex items-center justify-center text-4xl mb-2 ${tas.kartIkon(i, k.grad)}`} aria-hidden="true">{k.emoji}</span>
          <span className={`text-sm font-black leading-tight ${tas.kartBaslik(i)}`}>{k.title}</span>
          <span className={`mt-1 text-[11px] leading-snug line-clamp-2 ${tas.kartAlt(i)}`}>{k.subtitle}</span>
        </button>
      ))}
    </div>

    <div className="w-full mt-6">
      <p className={`text-sm font-black mb-2 ${tas.bolumBaslik}`}>👨‍👩‍👧 Ebeveyn Köşesi</p>
      <div className="grid grid-cols-3 gap-3">
        {ebeveyn.map((e) => (
          <button key={e.id} onClick={e.onClick} className={`flex flex-col items-center justify-center gap-1 py-3 px-1 transition active:scale-95 ${tas.kucukDugme}`}>
            <span className="text-2xl" aria-hidden="true">{e.emoji}</span>
            <span className={`text-[11px] font-bold leading-tight ${tas.kucukYazi}`}>{e.label}</span>
          </button>
        ))}
      </div>
    </div>

    <div className="w-full mt-6">{children}</div>
  </div>
);

export default React.memo(TemaliAnaMenu);
