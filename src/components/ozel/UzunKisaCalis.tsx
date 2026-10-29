import React from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import AsamaliCalisma from './AsamaliCalisma.tsx';
import { karistir, zar, type Tur } from './ozelOrtak.tsx';

// Uzun / Kısa (Gökhan Hoca, 2026-10-29): yalnız uzunluk değişir; kalınlık, yükseklik, ölçek aynı.
// Yatay eşyalar alt alta, sol uçları aynı çizgide (tools/gorsel-envanter/uzunluk-uret.py: aynı fotoğrafın ortası uzar/kısalır;
// tren: aynı lokomotif + 1-4 vagon). Dikey eşyalar yan yana, üst kenar hizalı: çorap (aynı çorap, bacak kısalır),
// saç (aynı kız, kodla çizilir; yalnız saç boyu), pantolon/şort (hoca: "örnek aynen kalsın").
// Sıra: Tanı → yalnız "uzun" (2 şık × 10) → yalnız "kısa" (2 şık × 10) → karışık (yakın uzunluklar da).
type Yon = 'yatay' | 'dikey';
interface Esya { ad: string; soruAd: string; yon: Yon; sayi: number; ciz: (i: number) => React.ReactNode }
// Yatay resimler aynı boyda tuvallerde: yükseklik sınırı ikisine de aynı ölçek verir, sol uçlar hizalı kalır
const resim = (yol: string, yon: Yon) => <img src={yol} alt="" draggable={false} className={yon === 'yatay' ? 'w-auto max-w-full max-h-[24vh]' : 'h-full w-auto mx-auto'} />;
const uk = (dosya: string, yon: Yon) => (i: number) => resim(`/images/ozel/uzun-kisa/${dosya}-${i}.webp`, yon);

// Aynı kız, yalnız saç boyu (0 kısa … 3 çok uzun)
const SAC_BOY = [60, 82, 104, 124];
const Kiz: React.FC<{ boy: number }> = ({ boy }) => {
  const y = SAC_BOY[boy];
  return (
    <svg viewBox="0 0 100 130" className="h-full w-auto mx-auto" role="img" aria-label="kız">
      <path d={`M21 42 C19 12 81 12 79 42 V${y} Q50 ${y + 7} 21 ${y} Z`} fill="#6b3f1f" />
      <path d="M20 130 C20 104 34 94 50 94 C66 94 80 104 80 130 Z" fill="#f472b6" />
      <rect x="44" y="70" width="12" height="16" fill="#f3c9a5" />
      <ellipse cx="50" cy="50" rx="21" ry="24" fill="#f6d3b3" />
      {y > 70 && <><path d={`M22 44 C22 60 24 ${y - 6} 27 ${y}`} stroke="#6b3f1f" strokeWidth="9" fill="none" strokeLinecap="round" /><path d={`M78 44 C78 60 76 ${y - 6} 73 ${y}`} stroke="#6b3f1f" strokeWidth="9" fill="none" strokeLinecap="round" /></>}
      <path d="M28 38 C30 22 70 22 72 38 C64 30 40 30 28 38 Z" fill="#6b3f1f" />
      <circle cx="42" cy="50" r="3" fill="#1f2937" /><circle cx="58" cy="50" r="3" fill="#1f2937" />
      <circle cx="37" cy="58" r="3.5" fill="#fda4af" opacity="0.6" /><circle cx="63" cy="58" r="3.5" fill="#fda4af" opacity="0.6" />
      <path d="M43 62 Q50 68 57 62" stroke="#9f1239" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
};

const ESYALAR: Esya[] = [
  { ad: 'tren', soruAd: 'tren', yon: 'yatay', sayi: 4, ciz: uk('tren', 'yatay') },
  { ad: 'kalem', soruAd: 'kalem', yon: 'yatay', sayi: 4, ciz: uk('kalem', 'yatay') },
  { ad: 'bank', soruAd: 'bank', yon: 'yatay', sayi: 4, ciz: uk('bank', 'yatay') },
  { ad: 'atkı', soruAd: 'atkı', yon: 'yatay', sayi: 4, ciz: uk('atki', 'yatay') },
  { ad: 'kurdele', soruAd: 'kurdele', yon: 'yatay', sayi: 4, ciz: uk('kurdele', 'yatay') },
  { ad: 'yılan', soruAd: 'yılan', yon: 'yatay', sayi: 4, ciz: uk('yilan', 'yatay') },
  { ad: 'çorap', soruAd: 'çorap', yon: 'dikey', sayi: 4, ciz: uk('corap', 'dikey') },
  { ad: 'saç', soruAd: 'saç', yon: 'dikey', sayi: 4, ciz: (i) => <Kiz boy={i} /> },
  { ad: 'pantolon', soruAd: 'pantolon', yon: 'dikey', sayi: 2, ciz: (i) => resim(i ? '/images/2412.webp' : '/images/2411.webp', 'dikey') },
];
const soru = (e: Esya, uzun: boolean) => e.ad === 'saç' ? `Hangi kızın saçı ${uzun ? 'uzun' : 'kısa'}?` : `Hangi ${e.soruAd} ${uzun ? 'uzun' : 'kısa'}?`;
const dogru = (e: Esya, uzun: boolean) => `Evet! Bu ${e.soruAd} ${uzun ? 'uzun' : 'kısa'}.`;

// Uzunluk çiftleri: ilk aşamalarda fark büyük, karışıkta yakın
const BELIRGIN = [[0, 3], [0, 2], [1, 3]];
const YAKIN = [[0, 1], [1, 2], [2, 3], [0, 2], [1, 3]];

const Sik: React.FC<{ e: Esya; i: number }> = ({ e, i }) => (
  <span className={`flex w-full bg-white ${e.yon === 'yatay' ? 'items-center px-2 py-3' : 'h-[min(46vh,60vw)] items-start justify-center p-2'}`}>{e.ciz(i)}</span>
);

const tur = (uzun: boolean, ciftler: number[][]): Tur => {
  const e = ESYALAR[zar(ESYALAR.length)];
  const [a, b] = e.sayi === 2 ? [0, 1] : ciftler[zar(ciftler.length)];
  const dogruI = uzun ? b : a;
  return {
    soru: soru(e, uzun), dogruId: String(dogruI), dogruSoz: dogru(e, uzun), altAlta: e.yon === 'yatay',
    secenekler: karistir([a, b]).map((i) => ({ id: String(i), icerik: <Sik e={e} i={i} /> })),
  };
};
const on = (f: () => Tur) => Array.from({ length: 10 }, f);

const Tani: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <OyunCercevesi baslik="Uzun / Kısa" emoji="📏" onBack={onBack} yonerge="Resme dokun, dinle.">
    <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
      {ESYALAR.map((e) => {
        const [k, u] = e.sayi === 2 ? [0, 1] : [0, 3];
        return (
          <div key={e.ad} className={`w-full max-w-3xl mx-auto rounded-3xl bg-white p-2 shadow-lg ${e.yon === 'yatay' ? 'flex flex-col gap-1' : 'grid grid-cols-2 gap-2'}`}>
            {([['kısa', k], ['uzun', u]] as const).map(([ad, i]) => (
              <button key={ad} onClick={() => speak(`Bu ${e.soruAd} ${ad}.`)} className={`rounded-2xl active:scale-95 ${e.yon === 'yatay' ? 'flex items-center gap-2 text-left' : ''}`}>
                <span className={e.yon === 'yatay' ? 'flex-1' : 'block h-48'}>{e.ciz(i)}</span>
                <span className="block shrink-0 w-24 text-xl font-black text-slate-800 text-center">{ad} {e.ad}</span>
              </button>
            ))}
          </div>
        );
      })}
    </div>
  </OyunCercevesi>
);

const UzunKisaCalis: React.FC<{ onBack: () => void; onSorular: () => void }> = ({ onBack, onSorular }) => (
  <AsamaliCalisma id="uzunKisaCalis" baslik="Uzun / Kısa" emoji="📏" onBack={onBack} onSorular={onSorular}
    aciklama="Aynı eşya, yalnız uzunluğu farklı. Yatay eşyalar alt alta, sol uçları aynı hizada. Önce yalnız “uzun”, sonra yalnız “kısa”; en son karışık."
    tani={(bitti) => <Tani onBack={bitti} />} taniAlt="Uzun ve kısa eşyalar, dokun ve dinle"
    asamalar={[
      { ad: 'Uzun · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur(true, BELIRGIN)) },
      { ad: 'Kısa · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur(false, BELIRGIN)) },
    ]}
    karisik={{ alt: '30 soru, uzun ve kısa karışık; uzunluklar birbirine yakın', secenek: 2,
      turlar: () => Array.from({ length: 30 }, () => tur(zar(2) === 0, YAKIN)) }} />
);

export default UzunKisaCalis;
