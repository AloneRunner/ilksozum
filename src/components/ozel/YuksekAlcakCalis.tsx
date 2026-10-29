import React, { useEffect, useRef, useState } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import AsamaliCalisma from './AsamaliCalisma.tsx';
import { YK_NESNELER, ykSoru, ykDogru, type YuksekTur } from '../../data/yuksekAlcak.ts';
import { karistir, zar, type Tur } from './ozelOrtak.tsx';

// Yüksek / Alçak (Gökhan Hoca, 2026-10-29): kodla çizilir; iki şıkta en, renk ve model aynı, yalnız yükseklik (kat, raf,
// blok, sıra sayısı ya da ayak boyu) değişir; hepsi aynı taban çizgisinde. Sıra: Tanı → yüksek → alçak → karışık.
const ZEMIN = 206;
const BLOK = ['#ef4444', '#facc15', '#3b82f6', '#22c55e'];

const Cizim: React.FC<{ tur: YuksekTur; yuksek: boolean }> = ({ tur, yuksek }) => {
  if (tur === 'kule') {
    const n = yuksek ? 8 : 3, b = 22;
    return <>{Array.from({ length: n }, (_, i) => <rect key={i} x={80 - b / 2} y={ZEMIN - (i + 1) * b} width={b} height={b} rx="2" fill={BLOK[i % 4]} stroke="#0f172a" strokeOpacity="0.25" />)}</>;
  }
  if (tur === 'bina') {
    const n = yuksek ? 8 : 2, k = 22, ust = ZEMIN - n * k;
    return (
      <>
        <rect x="45" y={ust} width="70" height={n * k} fill="#fcd9a8" stroke="#b45309" strokeWidth="2" />
        <rect x="41" y={ust - 5} width="78" height="6" fill="#b45309" />
        {Array.from({ length: n }, (_, i) => [52, 88].map((x) => (i === 0 && x === 88 ? null
          : <rect key={`${i}-${x}`} x={x} y={ZEMIN - (i + 1) * k + 5} width="20" height="12" fill="#7dd3fc" stroke="#475569" strokeWidth="1" />)))}
        <rect x="90" y={ZEMIN - 18} width="14" height="18" fill="#92400e" />
      </>
    );
  }
  if (tur === 'kitaplik') {
    const n = yuksek ? 5 : 2, r = 34, ust = ZEMIN - n * r - 6;
    const KITAP = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#a855f7'];
    return (
      <>
        <rect x="46" y={ust} width="68" height={n * r + 6} rx="2" fill="#b07a45" />
        {Array.from({ length: n }, (_, i) => {
          const y = ZEMIN - (i + 1) * r;
          return (
            <g key={i}>
              <rect x="51" y={y} width="58" height={r - 5} fill="#f3e3c8" />
              {KITAP.map((c, j) => <rect key={j} x={54 + j * 8} y={y + 6} width="6" height={r - 11} fill={c} />)}
            </g>
          );
        })}
      </>
    );
  }
  if (tur === 'duvar') {
    const n = yuksek ? 11 : 3, h = 14, w = 24;
    return (
      <>
        {Array.from({ length: n }, (_, i) => Array.from({ length: 6 }, (_, j) => {
          const kay = i % 2 ? w / 2 : 0, x = 20 + j * w - kay;
          return <rect key={`${i}-${j}`} x={Math.max(20, x)} y={ZEMIN - (i + 1) * h} width={Math.min(x + w, 140) - Math.max(20, x)} height={h} fill="#c2410c" stroke="#fde7d6" strokeWidth="2" />;
        }))}
        {Array.from({ length: n }, (_, i) => i % 2 ? <rect key={`s${i}`} x="128" y={ZEMIN - (i + 1) * h} width="12" height={h} fill="#c2410c" stroke="#fde7d6" strokeWidth="2" /> : null)}
      </>
    );
  }
  if (tur === 'cit') {
    const h = yuksek ? 156 : 48;
    return (
      <>
        {[0.3, 0.75].map((t) => <rect key={t} x="18" y={ZEMIN - h * t - 4} width="124" height="8" fill="#a16207" />)}
        {Array.from({ length: 7 }, (_, i) => { const x = 22 + i * 17; return <path key={i} d={`M${x} ${ZEMIN} V${ZEMIN - h + 8} L${x + 6} ${ZEMIN - h} L${x + 12} ${ZEMIN - h + 8} V${ZEMIN} Z`} fill="#fef3c7" stroke="#a16207" strokeWidth="1.5" />; })}
      </>
    );
  }
  // masa ve tabure: üst tabla aynı, ayak boyu değişir
  const masa = tur === 'masa';
  const ayak = masa ? (yuksek ? 140 : 38) : (yuksek ? 140 : 34);
  const en = masa ? 110 : 54, x0 = 80 - en / 2, tabla = ZEMIN - ayak - 9;
  return (
    <>
      <rect x={x0 + 6} y={tabla + 9} width="7" height={ayak} fill="#92400e" />
      <rect x={x0 + en - 13} y={tabla + 9} width="7" height={ayak} fill="#92400e" />
      {ayak > 60 && <rect x={x0 + 10} y={ZEMIN - ayak * 0.35} width={en - 20} height="4" fill="#92400e" opacity={0.8} />}
      <rect x={x0} y={tabla} width={en} height="9" rx="2" fill="#b45309" />
    </>
  );
};

export const YukseklikCiz: React.FC<{ tur: YuksekTur; yuksek: boolean; className?: string }> = ({ tur, yuksek, className }) => (
  <svg viewBox="0 0 160 220" className={className} role="img" aria-label={yuksek ? 'yüksek' : 'alçak'}>
    <rect width="160" height="220" fill="#f8fafc" />
    <rect y={ZEMIN} width="160" height={220 - ZEMIN} fill="#cbd5e1" />
    <Cizim tur={tur} yuksek={yuksek} />
  </svg>
);

// İpucu (Gökhan Hoca): kule blok blok yükselir ya da alçalır
export const KuleIpucu: React.FC<{ soyle: (k: string) => void; yuksekYazi?: string; alcakYazi?: string; dugme?: string }> = ({ soyle, yuksekYazi = 'yüksek', alcakYazi = 'alçak', dugme = '' }) => {
  const [n, setN] = useState(3);
  const z = useRef<ReturnType<typeof setInterval>>();
  useEffect(() => () => clearInterval(z.current), []);
  const git = (hedef: number, soz: string) => {
    clearInterval(z.current);
    z.current = setInterval(() => setN((m) => {
      if (m === hedef) { clearInterval(z.current); soyle(soz); return m; }
      return m + (hedef > m ? 1 : -1);
    }), 260);
  };
  return (
    <div className="w-full text-center">
      <div className="h-44 flex items-end justify-center">
        <div className="flex flex-col-reverse items-center">
          {Array.from({ length: n }, (_, i) => <div key={i} className="w-6 h-[1.15rem] border border-slate-900/20 rounded-sm animate-pop-in" style={{ background: BLOK[i % 4] }} />)}
        </div>
      </div>
      <div className="h-1.5 w-40 mx-auto bg-slate-300 rounded" />
      <div className="flex justify-center gap-8 mt-2">
        <button onClick={() => git(2, 'alçak')} className={`${dugme} bg-slate-500 text-sm px-4`}>{alcakYazi}</button>
        <button onClick={() => git(8, 'yüksek')} className={`${dugme} bg-slate-500 text-sm px-4`}>{yuksekYazi}</button>
      </div>
    </div>
  );
};

const tur = (yuksek: boolean): Tur => {
  const [t, ad] = YK_NESNELER[zar(YK_NESNELER.length)];
  return {
    soru: ykSoru(ad, yuksek), dogruId: yuksek ? 'y' : 'a', dogruSoz: ykDogru(ad, yuksek),
    secenekler: karistir(['y', 'a']).map((id) => ({ id, icerik: <YukseklikCiz tur={t} yuksek={id === 'y'} className="w-full aspect-[160/220]" /> })),
  };
};
const on = (f: () => Tur) => Array.from({ length: 10 }, f);

const Tani: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <OyunCercevesi baslik="Yüksek / Alçak" emoji="🏢" onBack={onBack} yonerge="Resme dokun, dinle.">
    <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
      <div className="grid grid-cols-1 landscape:grid-cols-2 gap-3 w-full max-w-4xl mx-auto">
        {YK_NESNELER.slice(0, 4).map(([t, ad]) => (
          <div key={t} className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-lg">
            {([true, false] as const).map((y) => (
              <button key={String(y)} onClick={() => speak(ykDogru(ad, y).replace(/^Evet! /, ''))} className="rounded-2xl overflow-hidden active:scale-95">
                <YukseklikCiz tur={t} yuksek={y} className="w-full aspect-[160/220]" />
                <span className="block text-lg font-black text-slate-800">{y ? 'yüksek' : 'alçak'}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  </OyunCercevesi>
);

const YuksekAlcakCalis: React.FC<{ onBack: () => void; onSorular: () => void }> = ({ onBack, onSorular }) => (
  <AsamaliCalisma id="yuksekAlcakCalis" baslik="Yüksek / Alçak" emoji="🏢" onBack={onBack} onSorular={onSorular}
    aciklama="Kule, bina, kitaplık, duvar, çit, masa, tabure: eni ve rengi aynı, aynı zeminde; yalnız yüksekliği farklı. Önce “yüksek”, sonra “alçak”; en son karışık."
    tani={(bitti) => <Tani onBack={bitti} />} taniAlt="Yüksek ve alçak, dokun ve dinle"
    asamalar={[
      { ad: 'Yüksek · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur(true)) },
      { ad: 'Alçak · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur(false)) },
    ]}
    karisik={{ alt: '30 soru, yüksek ve alçak karışık', secenek: 2, turlar: () => Array.from({ length: 30 }, () => tur(zar(2) === 0)) }} />
);

export default YuksekAlcakCalis;
