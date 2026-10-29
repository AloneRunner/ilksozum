import React, { useEffect, useRef, useState } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import AsamaliCalisma from './AsamaliCalisma.tsx';
import { ILK_SON_NESNELER, isSoru, isDogru, type IlkSonNesne, type Sira } from '../../data/ilkSon.ts';
import { zar, type Tur } from './ozelOrtak.tsx';

// İlk / Son (Gökhan Hoca, 2026-10-29): tek kart; bayrak solda, aynı nesneler aynı zeminde bayrağa doğru dizili, çocuk
// sıradaki nesneye dokunur. İlk = bayrağa en yakın. Önce 3, sonra 4–5 nesne. Etiket cevaptan sonra çıkar.
export const Bayrak: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 40 100" className={className} aria-hidden="true">
    <rect x="4" y="4" width="4" height="96" fill="#334155" />
    {Array.from({ length: 4 }, (_, r) => Array.from({ length: 5 }, (_, c) => <rect key={`${r}${c}`} x={8 + c * 6} y={6 + r * 6} width="6" height="6" fill={(r + c) % 2 ? '#fff' : '#0f172a'} />))}
    <rect x="8" y="6" width="30" height="24" fill="none" stroke="#0f172a" strokeWidth="0.8" />
  </svg>
);

export const IlkSonNesneCiz: React.FC<{ n: IlkSonNesne; className?: string }> = ({ n, className }) => (
  <img src={`/images/ozel/kesik/${n}.webp`} alt="" draggable={false} className={`object-contain object-bottom ${className || ''}`} />
);

const tur = (k: Sira, sayi: number): Tur => {
  const n = ILK_SON_NESNELER[zar(ILK_SON_NESNELER.length)];
  const ids = Array.from({ length: sayi }, (_, i) => `n${i}`);
  const dogru = k === 'ilk' ? 0 : k === 'son' ? sayi - 1 : (sayi - 1) / 2;
  return {
    soru: isSoru(k), dogruId: ids[dogru], dogruSoz: isDogru(k), tekKart: true,
    solda: <Bayrak className="shrink-0 h-[min(30vh,11rem)] w-auto" />,
    secenekler: ids.map((id) => ({
      id, sonraYazi: k,
      icerik: <IlkSonNesneCiz n={n} className={`w-full ${sayi > 3 ? 'h-[min(17vh,8rem)]' : 'h-[min(24vh,12rem)]'}`} />,
    })),
  };
};
const on = (f: () => Tur) => Array.from({ length: 10 }, f);
const dortBes = () => 4 + zar(2);

// İpucu (Gökhan Hoca): nesneler bayrağa doğru yürür; "ilk"te bayrağa ilk varan, "son"da en arkadaki parlar
export const BayrakIpucu: React.FC<{ soyle: (k: string) => void; ilkYazi?: string; sonYazi?: string; dugme?: string }> = ({ soyle, ilkYazi = 'ilk', sonYazi = 'son', dugme = '' }) => {
  const [yurudu, setYurudu] = useState(false);
  const [parla, setParla] = useState<number | null>(null);
  const z = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(z.current), []);
  const goster = (ilk: boolean) => {
    clearTimeout(z.current); setParla(null); setYurudu(false);
    z.current = setTimeout(() => {
      setYurudu(true);
      z.current = setTimeout(() => { setParla(ilk ? 0 : 2); soyle(ilk ? 'ilk' : 'son'); }, 1700);
    }, 120);
  };
  return (
    <div className="w-full text-center">
      <div className="h-32 flex items-end justify-center gap-1 overflow-hidden border-b-4 border-slate-300">
        <Bayrak className="h-28 w-auto shrink-0" />
        <div className="flex items-end gap-2" style={{ transform: `translateX(${yurudu ? 0 : 5}rem)`, transition: yurudu ? 'transform 1.6s ease-out' : 'none' }}>
          {[0, 1, 2].map((i) => (
            <div key={i} className={`rounded-xl transition-shadow ${parla === i ? 'ring-4 ring-amber-300 bg-amber-100 animate-pulse' : ''}`}>
              <IlkSonNesneCiz n="sira-araba" className="w-16 h-12" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-8 mt-2">
        <button onClick={() => goster(true)} className={`${dugme} bg-slate-500 text-sm px-4`}>{ilkYazi}</button>
        <button onClick={() => goster(false)} className={`${dugme} bg-slate-500 text-sm px-4`}>{sonYazi}</button>
      </div>
    </div>
  );
};

const Tani: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <OyunCercevesi baslik="İlk / Son" emoji="🏁" onBack={onBack} yonerge="Resme dokun, dinle.">
    <div className="absolute inset-0 flex flex-col gap-4 px-3 pb-3 overflow-y-auto items-center">
      {ILK_SON_NESNELER.map((n) => (
        <div key={n} className="w-full max-w-3xl flex items-end gap-1 rounded-3xl bg-white shadow-lg px-3 pt-7 border-b-[10px] border-slate-300">
          <Bayrak className="shrink-0 h-28 w-auto" />
          {[0, 1, 2].map((i) => (
            <button key={i} disabled={i === 1} onClick={() => speak(isDogru(i === 0 ? 'ilk' : 'son').replace(/^Evet! /, ''))} className="relative flex-1 min-w-0 flex flex-col items-center active:scale-95">
              {i !== 1 && <span className="absolute -top-6 text-lg font-black text-slate-800">{i === 0 ? 'ilk' : 'son'}</span>}
              <IlkSonNesneCiz n={n} className="w-full h-24" />
            </button>
          ))}
        </div>
      ))}
    </div>
  </OyunCercevesi>
);

const IlkSonCalis: React.FC<{ onBack: () => void; onSorular: () => void }> = ({ onBack, onSorular }) => (
  <AsamaliCalisma id="ilkSonCalis" baslik="İlk / Son" emoji="🏁" onBack={onBack} onSorular={onSorular}
    aciklama="Aynı nesneler bayrağa doğru dizili; bayrağa en yakın olan ilk, en arkadaki son. Önce 3 nesne, sonra 4–5. Önce “ilk”, sonra “son”; en son karışık. Karışık tamamlanınca ileri aşama: “ortada”. İki resimli sorular Hızlı Sorular'da."
    tani={(bitti) => <Tani onBack={bitti} />} taniAlt="İlk ve son, dokun ve dinle"
    asamalar={[
      { ad: 'İlk · 3 nesne', alt: '10 soru', secenek: 3, turlar: () => on(() => tur('ilk', 3)) },
      { ad: 'Son · 3 nesne', alt: '10 soru', secenek: 3, turlar: () => on(() => tur('son', 3)) },
      { ad: 'İlk · 4–5 nesne', alt: '10 soru', secenek: 4, turlar: () => on(() => tur('ilk', dortBes())) },
      { ad: 'Son · 4–5 nesne', alt: '10 soru', secenek: 4, turlar: () => on(() => tur('son', dortBes())) },
    ]}
    karisik={{ alt: '20 soru, ilk ve son karışık, 3–5 nesne', secenek: 4, turlar: () => Array.from({ length: 20 }, () => tur(zar(2) === 0 ? 'ilk' : 'son', 3 + zar(3))) }}
    ileri={[
      { ad: 'Ortada', alt: '10 soru, 3 ya da 5 nesne', secenek: 3, turlar: () => on(() => tur('ortada', zar(2) ? 5 : 3)) },
      { ad: 'İlk, son, ortada', alt: '20 soru, karışık', secenek: 3, turlar: () => Array.from({ length: 20 }, () => tur((['ilk', 'son', 'ortada'] as const)[zar(3)], zar(2) ? 5 : 3)) },
    ]} />
);

export default IlkSonCalis;
