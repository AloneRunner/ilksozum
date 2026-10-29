import React from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import AsamaliCalisma from './AsamaliCalisma.tsx';
import { karistir, zar, type Tur } from './ozelOrtak.tsx';

// Kalın / İnce (Gökhan Hoca, 2026-10-29): yalnız kalınlık değişir; boy, renk, doku ve açı aynı.
// Mum, havuç, fırça, çivi: kalın fotoğrafın yalnız kalınlık ekseni inceltilir (tools/gorsel-envanter/kalinlik-uret.py).
// Kalem: eski çift aynen (hoca). Ağaç (aynı tepe, gövde tamamen görünür), ekmek dilimi (çapraz açıdan, dilim kalınlığı
// görünür) ve kitap kodla çizilir. Havlu çıkarıldı (hoca); ip kangal olduğu için kalınlığı ayrı değiştirilemedi.
// Sıra: Tanı → yalnız "kalın" (2 şık × 10) → yalnız "ince" (2 şık × 10) → karışık.
interface Esya { ad: string; soru: (kalin: boolean) => string; dogru: (kalin: boolean) => string; sayi: number; ciz: (i: number) => React.ReactNode }
const k = (b: boolean) => (b ? 'kalın' : 'ince');
const foto = (dosya: string) => (i: number) => <img src={`/images/ozel/kalin-ince/${dosya}-${i}.webp`} alt="" draggable={false} className="h-full w-full object-contain" />;

// 0 en ince … 3 en kalın
const AGAC_GOVDE = [7, 13, 21, 30];
const Agac: React.FC<{ i: number }> = ({ i }) => {
  const g = AGAC_GOVDE[i];
  return (
    <svg viewBox="0 0 100 120" className="h-full w-auto" role="img" aria-label="ağaç">
      <ellipse cx="50" cy="114" rx="34" ry="4" fill="#000" opacity="0.1" />
      <path d={`M${50 - g / 2} 112 L${50 - g / 2 + 2} 52 H${50 + g / 2 - 2} L${50 + g / 2} 112 Z`} fill="#8b5a2b" />
      <path d={`M${50 - g / 2 + 3} 110 L${50 - g / 2 + 4} 56`} stroke="#6b4423" strokeWidth="1.5" />
      <circle cx="50" cy="34" r="26" fill="#16a34a" /><circle cx="30" cy="44" r="16" fill="#22c55e" /><circle cx="70" cy="44" r="16" fill="#22c55e" />
      <circle cx="40" cy="24" r="12" fill="#4ade80" opacity="0.6" />
    </svg>
  );
};
const EKMEK_KAL = [4, 9, 15, 22];
const Ekmek: React.FC<{ i: number }> = ({ i }) => {
  const t = EKMEK_KAL[i]; // dilimin kalınlığı (yan yüz)
  const yuz = 'M20 40 C14 40 12 30 18 24 C24 14 40 12 50 16 C60 12 76 14 82 24 C88 30 86 40 80 40 V88 H20 Z';
  return (
    <svg viewBox="0 0 120 110" className="h-full w-auto" role="img" aria-label="ekmek dilimi">
      <ellipse cx="62" cy="102" rx="44" ry="4" fill="#000" opacity="0.1" />
      {/* yan yüz: dilimin kalınlığı (çapraz açı) */}
      <g transform={`translate(${t} ${t * 0.6})`}><path d={yuz} fill="#b45309" /></g>
      {Array.from({ length: 6 }, (_, n) => <g key={n} transform={`translate(${(t * n) / 6} ${(t * 0.6 * n) / 6})`}><path d={yuz} fill="#c2410c" /></g>)}
      <path d={yuz} fill="#c2410c" />
      <path d="M24 42 C20 40 19 32 23 27 C28 19 41 18 50 21 C59 18 72 19 77 27 C81 32 80 40 76 42 V84 H24 Z" fill="#fde8c4" />
      {[30, 44, 58, 70, 36, 52, 64].map((x, n) => <circle key={n} cx={x} cy={34 + (n % 3) * 16} r="1.6" fill="#e9c98f" />)}
    </svg>
  );
};
const KITAP_KAL = [4, 10, 18, 28];
const Kitap: React.FC<{ i: number }> = ({ i }) => {
  const t = KITAP_KAL[i];
  return (
    <svg viewBox="0 0 120 90" className="h-full w-auto" role="img" aria-label="kitap">
      <ellipse cx="60" cy={60 + t / 2 + 6} rx="50" ry="3.5" fill="#000" opacity="0.1" />
      <polygon points={`10,${60} 80,${60} 110,40 40,40`} transform={`translate(0 ${t})`} fill="#b91c1c" />
      <polygon points={`10,60 80,60 80,${60 + t} 10,${60 + t}`} fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.6" />
      {Array.from({ length: Math.floor(t / 3) }, (_, n) => <line key={n} x1="10" x2="80" y1={60 + (n + 1) * 3} y2={60 + (n + 1) * 3} stroke="#e2e8f0" strokeWidth="0.6" />)}
      <polygon points={`80,60 110,40 110,${40 + t} 80,${60 + t}`} fill="#991b1b" />
      <polygon points="10,60 80,60 110,40 40,40" fill="#dc2626" />
    </svg>
  );
};

const ESYALAR: Esya[] = [
  ...(['mum', 'havuç', 'fırça', 'çivi'] as const).map((ad, n): Esya => ({
    ad, sayi: 4, ciz: foto(['mum', 'havuc', 'firca', 'civi'][n]), soru: (b) => `Hangi ${ad} ${k(b)}?`, dogru: (b) => `Evet! Bu ${ad} ${k(b)}.`,
  })),
  { ad: 'kalem', sayi: 2, ciz: (i) => <img src={i ? '/images/2001.webp' : '/images/2002.webp'} alt="" draggable={false} className="h-full w-full object-contain" />,
    soru: (b) => `Hangi kalem ${k(b)}?`, dogru: (b) => `Evet! Bu kalem ${k(b)}.` },
  { ad: 'ağaç', sayi: 4, ciz: (i) => <Agac i={i} />, soru: (b) => `Hangi ağacın gövdesi ${k(b)}?`, dogru: (b) => `Evet! Bu ağacın gövdesi ${k(b)}.` },
  { ad: 'ekmek', sayi: 4, ciz: (i) => <Ekmek i={i} />, soru: (b) => `Hangi ekmek dilimi ${k(b)}?`, dogru: (b) => `Evet! Bu ekmek dilimi ${k(b)}.` },
  { ad: 'kitap', sayi: 4, ciz: (i) => <Kitap i={i} />, soru: (b) => `Hangi kitap ${k(b)}?`, dogru: (b) => `Evet! Bu kitap ${k(b)}.` },
];

const BELIRGIN = [[0, 3], [0, 2], [1, 3]];
const YAKIN = [[0, 1], [1, 2], [2, 3], [0, 2], [1, 3]];
const Sik: React.FC<{ e: Esya; i: number }> = ({ e, i }) => (
  <span className="relative block w-full aspect-square bg-white"><span className="absolute inset-3 flex items-center justify-center">{e.ciz(i)}</span></span>
);
const tur = (kalin: boolean, ciftler: number[][]): Tur => {
  const e = ESYALAR[zar(ESYALAR.length)];
  const [a, b] = e.sayi === 2 ? [0, 1] : ciftler[zar(ciftler.length)];
  return {
    soru: e.soru(kalin), dogruId: String(kalin ? b : a), dogruSoz: e.dogru(kalin),
    secenekler: karistir([a, b]).map((i) => ({ id: String(i), icerik: <Sik e={e} i={i} /> })),
  };
};
const on = (f: () => Tur) => Array.from({ length: 10 }, f);

const Tani: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <OyunCercevesi baslik="Kalın / İnce" emoji="📚" onBack={onBack} yonerge="Resme dokun, dinle.">
    <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
      <div className="grid grid-cols-1 landscape:grid-cols-2 gap-3 w-full max-w-4xl mx-auto">
        {ESYALAR.map((e) => {
          const [ince, kalin] = e.sayi === 2 ? [0, 1] : [0, 3];
          return (
            <div key={e.ad} className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-lg">
              {([[true, kalin], [false, ince]] as const).map(([b, i]) => (
                <button key={String(b)} onClick={() => speak(e.dogru(b).replace(/^Evet! /, ''))} className="rounded-2xl active:scale-95">
                  <span className="flex h-36 items-center justify-center">{e.ciz(i)}</span>
                  <span className="block text-lg font-black text-slate-800">{k(b)} {e.ad === 'ekmek' ? 'dilim' : e.ad}</span>
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  </OyunCercevesi>
);

const KalinInceCalis: React.FC<{ onBack: () => void; onSorular: () => void }> = ({ onBack, onSorular }) => (
  <AsamaliCalisma id="kalinInceCalis" baslik="Kalın / İnce" emoji="📚" onBack={onBack} onSorular={onSorular}
    aciklama="Aynı eşya, yalnız kalınlığı farklı; boyu, rengi ve açısı aynı. Önce yalnız “kalın”, sonra yalnız “ince”; en son karışık."
    tani={(bitti) => <Tani onBack={bitti} />} taniAlt="Kalın ve ince eşyalar, dokun ve dinle"
    asamalar={[
      { ad: 'Kalın · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur(true, BELIRGIN)) },
      { ad: 'İnce · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur(false, BELIRGIN)) },
    ]}
    karisik={{ alt: '30 soru, kalın ve ince karışık; kalınlıklar birbirine yakın', secenek: 2,
      turlar: () => Array.from({ length: 30 }, () => tur(zar(2) === 0, YAKIN)) }} />
);

export default KalinInceCalis;
