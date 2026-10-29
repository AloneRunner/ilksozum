import React, { useMemo } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import { OBJECT_CATEGORIES } from '../../constants.ts';
import { kategoriOgeleri } from '../sozluk/KelimeKitabi.tsx';
import { BK_NESNELER, bkSoru, bkDogru } from '../../data/buyukKucuk.ts';
import AsamaliCalisma from './AsamaliCalisma.tsx';
import { karistir, zar, type Tur } from './ozelOrtak.tsx';

// Büyük / Küçük (Gökhan Hoca, 2026-10-29): ilk aşamada fark belirgin, gittikçe azalır; resimler büyük.
// Aynı fotoğraf farklı ölçekte gösterilir (alt kenara oturur): yalnız boyut değişir.
// Sıra: önce "büyük" (2 → 3 şık), sonra "küçük" (2 → 3 şık), en son karışık (yakın boyutlar).
interface Nesne { kelime: string; url: string }

/** Kutunun içinde ölçekli resim; ölçek 1 = kutuyu dolduran */
const Olcekli: React.FC<{ url: string; olcek: number; className?: string }> = ({ url, olcek, className }) => (
  <span className={`flex items-end justify-center overflow-hidden bg-white ${className || ''}`}>
    <img src={url} alt="" draggable={false} className="w-full h-full object-contain" style={{ transform: `scale(${olcek})`, transformOrigin: '50% 92%', mixBlendMode: 'multiply' }} /* kırık beyaz zemin küçülünce kare gibi görünmesin */ />
  </span>
);

// Aşamalara göre boyut kümeleri (büyüğe oran); fark gittikçe azalır
const BUYUK_IKI = [[1, 0.4]], BUYUK_UC = [[1, 0.62, 0.38]];
const KUCUK_IKI = [[1, 0.5]], KUCUK_UC = [[1, 0.72, 0.48]];
const KARISIK = [[1, 0.75], [1, 0.8], [1, 0.82, 0.64], [1, 0.7]];

const BuyukKucukCalis: React.FC<{ onBack: () => void; onSorular: () => void }> = ({ onBack, onSorular }) => {
  const havuz = useMemo<Nesne[]>(() => {
    const resim = new Map<string, string>();
    for (const k of OBJECT_CATEGORIES) if (!k.disabled) for (const o of kategoriOgeleri(k.id)) if (!resim.has(o.kelime)) resim.set(o.kelime, o.url);
    return BK_NESNELER.map(([kelime, url]) => ({ kelime, url: url || resim.get(kelime) || '' })).filter((n) => n.url);
  }, []);

  // 10 soru, havuzdan her seferinde yeniden seçilir (ezber olmasın)
  const turlar = (buyuk: boolean, kumeler: number[][], adet = 10): Tur[] =>
    karistir(havuz).concat(karistir(havuz)).slice(0, adet).map((n) => {
      const olcekler = kumeler[zar(kumeler.length)];
      const dogru = buyuk ? Math.max(...olcekler) : Math.min(...olcekler);
      return {
        soru: bkSoru(n.kelime, buyuk), dogruId: String(dogru), dogruSoz: bkDogru(n.kelime, buyuk),
        secenekler: karistir(olcekler).map((o) => ({ id: String(o), icerik: <Olcekli url={n.url} olcek={o} className="w-full aspect-square" /> })),
      };
    });

  const Tani: React.FC<{ onBack: () => void }> = ({ onBack: geri }) => (
    <OyunCercevesi baslik="Büyük / Küçük" emoji="🐘" onBack={geri} yonerge="Resme dokun, dinle.">
      <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
        <div className="grid grid-cols-1 landscape:grid-cols-2 gap-3 w-full max-w-4xl mx-auto">
          {havuz.slice(0, 8).map((n) => (
            <div key={n.kelime} className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-lg">
              {([['büyük', 1], ['küçük', 0.45]] as const).map(([k, o]) => (
                <button key={k} onClick={() => speak(`Bu ${n.kelime} ${k}.`)} className="rounded-2xl active:scale-95">
                  <Olcekli url={n.url} olcek={o} className="w-full aspect-square rounded-2xl" />
                  <span className="block text-xl font-black text-slate-800">{k}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </OyunCercevesi>
  );

  return (
    <AsamaliCalisma id="buyukKucukCalis" baslik="Büyük / Küçük" emoji="🐘" onBack={onBack} onSorular={onSorular}
      aciklama="Aynı eşya, yalnız boyutu farklı. Önce fark çok belirgin, sonra azalır. Önce “büyük”, sonra “küçük”; en son karışık."
      tani={(bitti) => <Tani onBack={bitti} />} taniAlt="Büyük ve küçük eşyalar, dokun ve dinle"
      asamalar={[
        { ad: 'Büyük · 2 şık', alt: '10 soru, fark çok belirgin', secenek: 2, turlar: () => turlar(true, BUYUK_IKI) },
        { ad: 'Büyük · 3 şık', alt: '10 soru', secenek: 3, turlar: () => turlar(true, BUYUK_UC) },
        { ad: 'Küçük · 2 şık', alt: '10 soru', secenek: 2, turlar: () => turlar(false, KUCUK_IKI) },
        { ad: 'Küçük · 3 şık', alt: '10 soru', secenek: 3, turlar: () => turlar(false, KUCUK_UC) },
      ]}
      karisik={{ alt: '30 soru, büyük ve küçük karışık; boyutlar birbirine yakın', secenek: 3,
        turlar: () => Array.from({ length: 3 }, () => [...turlar(true, KARISIK, 5), ...turlar(false, KARISIK, 5)]).flat().sort(() => Math.random() - 0.5) }} />
  );
};

export default BuyukKucukCalis;
