import React, { useEffect } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { gercekSesCal, GercekSesAyari } from './gercekSes.tsx';
import { karistir, konus, zar, type Secenek, type Tur } from './ozelOrtak.tsx';
import { ORGANLAR, SES_SORU, taniSoz, type Organ } from '../../data/ciftKavramlar.ts';

// Duyularımız, organ tanıma (Gökhan Hoca, 2026-11-09): göz, kulak, el, burun, dil sırayla; organı gösterme → eylem → nesne eşleştirme.
// Erken aşamada her nesne tek duyuya bağlı; ses sorularında gerçek ses çalar; etiket ve cümle cevaptan sonra.
const el = <T,>(l: T[]) => l[zar(l.length)];
const siklar = (h: Organ, n: number, havuz: Organ[] = ORGANLAR): Secenek[] =>
  karistir([h, ...karistir(havuz.filter((o) => o !== h)).slice(0, n - 1)]).map((o) => ({ id: o.ad, url: o.url, sonraYazi: o === h ? o.ad : undefined }));

const SesCal: React.FC<{ dosya: string }> = ({ dosya }) => {
  useEffect(() => { const z = setTimeout(() => void gercekSesCal(dosya), 2600); return () => clearTimeout(z); }, [dosya]); // soru bitsin, üst üste binmesin
  return <button onClick={() => void gercekSesCal(dosya)} className="flex h-[20vh] w-[20vh] items-center justify-center rounded-3xl bg-white text-7xl shadow active:scale-95" aria-label="Sesi dinle">🔊</button>;
};

const gosterTur = (h: Organ, n: number, havuz?: Organ[]): Tur => ({ soru: h.goster, dogruId: h.ad, dogruSoz: h.bu, secenekler: siklar(h, n, havuz) });
const eylemTur = (h: Organ, n: number, havuz?: Organ[]): Tur => ({ soru: h.eylem, dogruId: h.ad, dogruSoz: h.cumle, secenekler: siklar(h, n, havuz) });
const nesneTur = (h: Organ, n: number, havuz?: Organ[]): Tur => (h.sesler
  ? { soru: SES_SORU, dogruId: h.ad, dogruSoz: h.cumle, sahne: <SesCal dosya={el(h.sesler)} />, secenekler: siklar(h, n, havuz) }
  : { soru: h.nesneSoru, dogruId: h.ad, dogruSoz: h.cumle, gorsel: el(h.nesneler), secenekler: siklar(h, n, havuz) });
const herhangi = (h: Organ, n: number, havuz?: Organ[]) => [gosterTur, eylemTur, nesneTur][zar(3)](h, n, havuz);

// Bir organ: önce organı göster, sonra eylem, sonra nesne (kolaydan zora)
const organTurlari = (h: Organ) => () => [...Array.from({ length: 4 }, () => gosterTur(h, 2)), ...Array.from({ length: 3 }, () => eylemTur(h, 2)), ...Array.from({ length: 3 }, () => nesneTur(h, 2))];
const IKILI: [number, number][] = [[0, 1], [3, 4], [2, 0], [1, 3], [4, 2]];

const DuyuTani: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const dinlet = async (o: Organ) => { await konus(taniSoz(o.bu)); await konus(taniSoz(o.cumle)); };
  return (
    <OyunCercevesi baslik="Duyularımız" emoji="👁️" onBack={onBack} yonerge="Resme dokun, dinle.">
      <div className="absolute inset-0 overflow-y-auto px-3 pb-3">
        <div className="grid grid-cols-2 landscape:grid-cols-5 gap-3 w-full max-w-5xl mx-auto">
          {ORGANLAR.map((o) => (
            <button key={o.ad} onClick={() => void dinlet(o)} className="rounded-3xl bg-white p-2 shadow-lg active:scale-95">
              <img src={o.url} alt="" draggable={false} className="w-full aspect-square rounded-2xl object-cover" />
              <span className="block text-xl font-black text-slate-800">{o.ad}</span>
            </button>
          ))}
        </div>
      </div>
    </OyunCercevesi>
  );
};

export const duyuYapi = () => ({
  id: 'duyularCalis', baslik: 'Duyularımız', emoji: '👁️', taniAlt: 'Beş organ, dokun ve dinle', ust: <GercekSesAyari />,
  aciklama: 'Göz, kulak, el, burun, dil sırayla: önce organı bul, sonra ne yaptığımızı eşleştir. Sonra iki duyu birlikte, en son beşi karışık.',
  tani: (bitti: () => void) => <DuyuTani onBack={bitti} />,
  asamalar: [
    ...ORGANLAR.map((o) => ({ ad: `${o.baslik} · 2 şık`, alt: '10 soru', secenek: 2, turlar: organTurlari(o) })),
    { ad: 'İki duyu birlikte', alt: '10 soru', secenek: 2, turlar: () => Array.from({ length: 10 }, () => {
      const [a, b] = IKILI[zar(IKILI.length)]; const ikili = [ORGANLAR[a], ORGANLAR[b]];
      return herhangi(ikili[zar(2)], 2, ikili);
    }) },
    { ad: 'Beş organ · 3 şık', alt: '10 soru', secenek: 3, turlar: () => Array.from({ length: 10 }, () => herhangi(el(ORGANLAR), 3)) },
  ],
  karisik: { alt: '20 soru, beş duyu karışık', secenek: 3, turlar: () => Array.from({ length: 20 }, () => herhangi(el(ORGANLAR), 3)) }, // 4 şıkta resimler küçülüyor
});
