import React, { useMemo, useState } from 'react';
import { OBJECT_CATEGORIES } from '../../constants.ts';
import { kategoriOgeleri } from '../sozluk/KelimeKitabi.tsx';
import { speak } from '../../services/speechService.ts';
import { SAYI_ADLARI, TOPLAMA_SORU, toplamaDogru } from './ozelVeri.ts';
import { SecimOyunu, karistir, zar, sikKur, type Tur } from './ozelOrtak.tsx';

// Nesneyle toplama (MEB programı, 2026-10-29): iki grup nesne, "Hepsi kaç tane?".
// Nesnelere dokununca sırayla sayılır (bir, iki, üç…); kolayda toplam en çok 5, sonra 7 ve 10.
const NESNELER = ['elma', 'muz', 'çilek', 'portakal', 'armut', 'top', 'araba', 'balon', 'kalem', 'ördek'];
const TUR_SAYISI = 8;
const ENCOK: Record<number, number> = { 2: 5, 3: 7, 4: 10 };

const Gruplar: React.FC<{ url: string; a: number; b: number }> = ({ url, a, b }) => {
  const [sayilan, setSayilan] = useState<number[]>([]);
  const say = (k: number) => {
    if (sayilan.includes(k)) return;
    const y = [...sayilan, k];
    setSayilan(y);
    void speak(SAYI_ADLARI[y.length].replace(/^./, (c) => c.toLocaleUpperCase('tr-TR')));
  };
  const nesne = (k: number) => {
    const sira = sayilan.indexOf(k);
    return (
      <button key={k} onClick={() => say(k)} className={`relative h-[min(13vh,17vw)] w-[min(13vh,17vw)] sm-landscape:h-[17vh] sm-landscape:w-[17vh] rounded-2xl bg-white shadow overflow-hidden active:scale-95 ${sira >= 0 ? 'ring-4 ring-emerald-400' : ''}`}>
        <img src={url} alt="" draggable={false} className="h-full w-full object-cover" />
        {sira >= 0 && <span className="absolute right-0.5 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-sm font-black text-white">{sira + 1}</span>}
      </button>
    );
  };
  const grup = (bas: number, n: number) => (
    <div className="flex max-w-[40%] flex-wrap justify-center gap-1.5 rounded-3xl bg-sky-50 p-2">{Array.from({ length: n }, (_, k) => nesne(bas + k))}</div>
  );
  return (
    <div className="flex w-full items-center justify-center gap-3">
      {grup(0, a)}
      <span className="text-5xl font-black text-slate-500">+</span>
      {grup(a, b)}
    </div>
  );
};

const Toplama: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const resimler = useMemo(() => {
    const m = new Map<string, string>();
    for (const k of OBJECT_CATEGORIES) if (!k.disabled) for (const o of kategoriOgeleri(k.id)) if (NESNELER.includes(o.kelime) && !m.has(o.kelime)) m.set(o.kelime, o.url);
    return [...m.values()];
  }, []);
  return (
    <SecimOyunu oyunId="toplama" sayacAdi="Toplama" baslik="Toplama" emoji="➕" onBack={onBack}
      secenekSayilari={[2, 3, 4]}
      turlariKur={(n) => Array.from({ length: TUR_SAYISI }, (): Tur => {
        const t = 2 + zar(ENCOK[n] - 1), a = 1 + zar(t - 1), b = t - a;
        const url = karistir(resimler)[0];
        const yakin = Array.from({ length: 10 }, (_, k) => k + 1).filter((x) => Math.abs(x - t) <= 2);
        return {
          soru: TOPLAMA_SORU, dogruId: String(t), dogruSoz: toplamaDogru(t),
          sahne: <Gruplar url={url} a={a} b={b} />,
          secenekler: sikKur(t, yakin, n).sort((x, y) => x - y)
            .map((x) => ({ id: String(x), icerik: <span className="py-4 sm-landscape:py-2 text-6xl sm-landscape:text-5xl font-black text-sky-700">{x}</span> })),
        };
      })} />
  );
};

export default Toplama;
