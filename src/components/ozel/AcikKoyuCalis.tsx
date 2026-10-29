import React from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import AsamaliCalisma from './AsamaliCalisma.tsx';
import { karistir, zar, type Tur } from './ozelOrtak.tsx';

// Açık / Koyu (Gökhan Hoca, 2026-10-29): kırmızı tonları (pembe/bordo) yok; mavi, yeşil, kahverengi aileleri.
// Görseller aynı fotoğrafın 4 tonu (tools/gorsel-envanter/ton-uret.py): 0 çok açık … 3 çok koyu; boyut ve hiza aynı.
// Sıra: önce yalnız "koyu", sonra yalnız "açık" (2 şık → 3 şık), en son karışık. İlk aşamalarda tonlar arası fark büyük,
// yakın tonlar yalnız karışıkta.
const NESNE: [string, string][] = [
  ['araba', 'araba'], ['balon', 'balon'], ['çanta', 'canta'], ['çizme', 'cizme'], ['elbise', 'elbise'], ['çöp kovası', 'cop-kovasi'],
  ['kupa', 'kupa'], ['şemsiye', 'semsiye'], ['şişe', 'sise'], ['tişört', 'tisort'], ['top', 'top'],
];
const AILE = ['mavi', 'yesil', 'kahve'];
const url = (dosya: string, aile: string, ton: number) => `/images/ozel/acik-koyu/${dosya}-${aile}-${ton}.webp`;
type Kavram = 'koyu' | 'açık';

// Ton kümeleri: [açıklar → koyular]. 2 şık: en az 2 basamak fark; 3 şık: doğru şıkla en yakını arasında 2 basamak
const IKILI = [[0, 3], [0, 2], [1, 3]];
const UCLU: Record<Kavram, number[][]> = { koyu: [[0, 1, 3]], 'açık': [[0, 2, 3]] };
const YAKIN = [[0, 1, 2], [1, 2, 3], [0, 1, 3], [0, 2, 3]]; // karışık: bitişik tonlar da gelir

const tur = (k: Kavram, tonlar: number[]): Tur => {
  const [ad, dosya] = NESNE[zar(NESNE.length)];
  const aile = AILE[zar(AILE.length)];
  const dogru = k === 'koyu' ? Math.max(...tonlar) : Math.min(...tonlar);
  return {
    soru: `Hangi ${ad} ${k} renk?`, dogruId: String(dogru), dogruSoz: `Evet! Bu ${ad} ${k} renk.`,
    secenekler: karistir(tonlar).map((t) => ({ id: String(t), url: url(dosya, aile, t) })),
  };
};
const on = (f: () => Tur) => Array.from({ length: 10 }, f);

const Tani: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const ornek = NESNE.slice(0, 6).map(([ad, dosya], i) => ({ ad, dosya, aile: AILE[i % 3] }));
  return (
    <OyunCercevesi baslik="Açık / Koyu" emoji="🌗" onBack={onBack} yonerge="Resme dokun, dinle.">
      <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
        <div className="grid grid-cols-1 landscape:grid-cols-2 gap-3 w-full max-w-4xl mx-auto">
          {ornek.map((o) => (
            <div key={o.dosya} className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-lg">
              {([['açık', 0], ['koyu', 3]] as const).map(([k, t]) => (
                <button key={k} onClick={() => speak(`Bu ${o.ad} ${k} renk.`)} className="rounded-2xl active:scale-95">
                  <img src={url(o.dosya, o.aile, t)} alt="" draggable={false} className="w-full aspect-square object-contain" />
                  <span className="block text-xl font-black text-slate-800">{k}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 text-center max-w-md mx-auto">Gerçek hayatta da gösterin: açık mavi ve lacivert iki kalem, iki tişört…</p>
      </div>
    </OyunCercevesi>
  );
};

const AcikKoyuCalis: React.FC<{ onBack: () => void; onSorular: () => void }> = ({ onBack, onSorular }) => (
  <AsamaliCalisma id="acikKoyuCalis" baslik="Açık / Koyu" emoji="🌗" onBack={onBack} onSorular={onSorular}
    aciklama="Aynı eşyanın açık ve koyu tonları. Önce yalnız “koyu”, sonra yalnız “açık” sorulur; en son karışık."
    tani={(bitti) => <Tani onBack={bitti} />} taniAlt="Açık ve koyu eşyalar, dokun ve dinle"
    asamalar={[
      { ad: 'Koyu · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur('koyu', IKILI[zar(IKILI.length)])) },
      { ad: 'Koyu · 3 şık', alt: '10 soru', secenek: 3, turlar: () => on(() => tur('koyu', UCLU.koyu[0])) },
      { ad: 'Açık · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur('açık', IKILI[zar(IKILI.length)])) },
      { ad: 'Açık · 3 şık', alt: '10 soru', secenek: 3, turlar: () => on(() => tur('açık', UCLU['açık'][0])) },
    ]}
    karisik={{ alt: '30 soru, açık ve koyu karışık; yakın tonlar da var', secenek: 3,
      turlar: () => Array.from({ length: 30 }, () => tur(zar(2) ? 'koyu' : 'açık', YAKIN[zar(YAKIN.length)])) }} />
);

export default AcikKoyuCalis;
