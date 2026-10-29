import React, { useMemo, useState } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { OBJECT_CATEGORIES } from '../../constants.ts';
import { kategoriOgeleri } from '../sozluk/KelimeKitabi.tsx';
import { SES_HARFLERI, YERLER, sesinYeriSoru, sesinYeriDogru, type Yer } from './ozelVeri.ts';
import { SecimOyunu, karistir, sikKur, type Tur } from './ozelOrtak.tsx';

// Sesin Yeri (Gökhan Hoca, 2026-10-22): "Elma. E sesi nerede?" → Başta / Ortada / Sonda.
// Yalnız sesin bir kez geçtiği tek sözcükler (araba'daki a gibi çok yerde geçen sözcük kafa karıştırır).
// Kısa sözcükten uzuna; kolay seviyede iki şık (doğru yer + bir başkası), sonra üç.
interface Sozcuk { kelime: string; url: string; yer: Yer; hece: number }
const TUR_SAYISI = 8;
const ENAZ = 6;
const kucuk = (h: string) => h.toLocaleLowerCase('tr-TR');
const buyukBas = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);
const heceSayisi = (w: string) => (w.match(/[aeıioöuü]/g) || []).length;

let onbellek: Map<string, Sozcuk[]> | null = null;
const sozcukler = (): Map<string, Sozcuk[]> => {
  if (onbellek) return onbellek;
  const hepsi = new Map<string, string>();
  for (const k of OBJECT_CATEGORIES) if (!k.disabled) for (const o of kategoriOgeleri(k.id)) if (/^[a-zçğıöşü]+$/.test(o.kelime)) hepsi.set(o.kelime, o.url);
  onbellek = new Map(SES_HARFLERI.map((H) => {
    const h = kucuk(H);
    const l: Sozcuk[] = [];
    for (const [kelime, url] of hepsi) {
      const i = kelime.indexOf(h);
      if (i < 0 || kelime.indexOf(h, i + 1) >= 0) continue;
      l.push({ kelime, url, yer: i === 0 ? 'bas' : i === kelime.length - 1 ? 'son' : 'orta', hece: heceSayisi(kelime) });
    }
    return [H, l];
  }));
  return onbellek;
};

// Yerler sırayla dönüşümlü (hep "ortada" çıkmasın), her yerde önce kısa sözcükler; tur sırası kısadan uzuna
const turSozcukleri = (l: Sozcuk[]): Sozcuk[] => {
  const gruplar = karistir((Object.keys(YERLER) as Yer[]).map((y) => karistir(l.filter((s) => s.yer === y)).sort((a, b) => Number(a.hece > 2) - Number(b.hece > 2))))
    .filter((g) => g.length);
  const secilen: Sozcuk[] = [];
  for (let i = 0; secilen.length < Math.min(TUR_SAYISI, l.length); i++) for (const g of gruplar) if (g[i] && secilen.length < TUR_SAYISI) secilen.push(g[i]);
  return secilen.sort((a, b) => a.hece - b.hece);
};

// Şıktaki küçük çizim: üç kutu, sesin yerindeki dolu
const YerCizimi: React.FC<{ yer: Yer }> = ({ yer }) => (
  <span className="flex gap-1.5 py-5">
    {(Object.keys(YERLER) as Yer[]).map((y) => <span key={y} className={`h-9 w-9 sm-landscape:h-7 sm-landscape:w-7 rounded-lg border-4 ${y === yer ? 'border-sky-600 bg-sky-400' : 'border-slate-300 bg-white'}`} />)}
  </span>
);

const SesinYeri: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [harf, setHarf] = useState<string | null>(null);
  const liste = useMemo(sozcukler, []);

  if (harf) return (
    <SecimOyunu key={harf} oyunId="sesinYeri" sayacAdi="Sesin Yeri" baslik={`Sesin Yeri · ${harf}`} emoji="👂" onBack={() => setHarf(null)}
      secenekSayilari={[2, 3]}
      turlariKur={(n) => turSozcukleri(liste.get(harf) || []).map((s): Tur => ({
        soru: `${buyukBas(s.kelime)}. ${sesinYeriSoru(harf)}`, gorsel: s.url, dogruId: s.yer, dogruSoz: sesinYeriDogru(s.yer),
        secenekler: sikKur<Yer>(s.yer, Object.keys(YERLER) as Yer[], n)
          .sort((a, b) => Object.keys(YERLER).indexOf(a) - Object.keys(YERLER).indexOf(b)) // şıklar hep başta → sonda sırasıyla
          .map((y) => ({ id: y, yazi: YERLER[y], icerik: <YerCizimi yer={y} /> })),
      }))} />
  );

  return (
    <OyunCercevesi baslik="Sesin Yeri" emoji="👂" onBack={onBack} yonerge="Bir ses seç.">
      <div className="absolute inset-0 flex flex-col items-center gap-3 px-3 pb-3 overflow-y-auto">
        <p className="text-center text-sm font-bold text-slate-600 max-w-md">Resmin adını dinle. Ses kelimenin başında mı, ortasında mı, sonunda mı?</p>
        <div className="grid grid-cols-5 sm:grid-cols-6 landscape:grid-cols-8 gap-2 w-full max-w-3xl">
          {SES_HARFLERI.filter((H) => (liste.get(H)?.length || 0) >= ENAZ).map((H) => (
            <button key={H} onClick={() => setHarf(H)}
              className="aspect-square rounded-2xl bg-white shadow-md text-4xl font-black text-sky-700 active:scale-95">
              {H}<span className="text-2xl text-sky-400">{kucuk(H)}</span>
            </button>
          ))}
        </div>
      </div>
    </OyunCercevesi>
  );
};

export default SesinYeri;
