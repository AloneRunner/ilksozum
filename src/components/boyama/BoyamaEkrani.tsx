import React, { useEffect, useMemo, useState } from 'react';
import { OyunCercevesi, Kutlama, neseliMelodi } from '../oyunKiti/OyunKiti.tsx';
import { speak, playEffect } from '../../services/speechService.ts';

// Boyama (yeniden, Kaan 2026-10-08: "şekil boyama, kurallı boyama kötüydü"). Parmakla sürtmek yerine
// "renk seç → bölgeye dokun → dolsun": küçük ve ince motoru zayıf çocuklar için. Kalın çizgili sade resimler.
// serbest (Şekil Boyama): her renk serbest, renk adı söylenir. kurallı (Kurallı Boyama): örnekteki gibi boya;
// yanlış renk boyamaz (bölge sallanır), iki yanlıştan sonra doğru renk parlar.
const RENK: Record<string, [string, string]> = {
  kirmizi: ['#ef4444', 'Kırmızı'], mavi: ['#3b82f6', 'Mavi'], sari: ['#facc15', 'Sarı'], yesil: ['#22c55e', 'Yeşil'],
  turuncu: ['#f97316', 'Turuncu'], mor: ['#a855f7', 'Mor'], pembe: ['#f472b6', 'Pembe'], kahve: ['#92400e', 'Kahverengi'],
  acikmavi: ['#93c5fd', 'Açık mavi'], siyah: ['#1f2937', 'Siyah'],
};
interface Bolge { d: string; renk: string }
// Boyama bitince resim canlanır (Kaan, 2026-10-08: "boyuyorsun, sonra çizgi film gibi oluyor"):
// tum = bütün resmin hareketi, bolge = tek bölgenin hareketi, ekler = resme gelen emoji (kuş, kelebek, kabarcık)
interface Canlanma { tum?: string; bolge?: Record<number, React.CSSProperties>; ekler?: { e: string; x: string; y: string; anim: string; boy?: string }[] }
interface Resim { ad: string; bolgeler: Bolge[]; cizgi?: string; canlan?: Canlanma } // cizgi: boyanmayan ayrıntılar (göz, ip)
const don = (sn: number, merkez?: string): React.CSSProperties => ({ animation: `ok-don ${sn}s linear infinite`, transformBox: merkez ? 'view-box' : 'fill-box', transformOrigin: merkez || 'center' });

const daire = (cx: number, cy: number, r: number) => `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0 Z`;
const elips = (cx: number, cy: number, rx: number, ry: number) => `M ${cx - rx} ${cy} a ${rx} ${ry} 0 1 0 ${2 * rx} 0 a ${rx} ${ry} 0 1 0 ${-2 * rx} 0 Z`;
const isinlar = (() => { let d = ''; for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2, b = a + 0.18, c = a - 0.18; d += `M ${100 + Math.cos(c) * 50} ${100 + Math.sin(c) * 50} L ${100 + Math.cos(a) * 80} ${100 + Math.sin(a) * 80} L ${100 + Math.cos(b) * 50} ${100 + Math.sin(b) * 50} Z `; } return d; })();
const yapraklar = [0, 1, 2, 3, 4].map((i) => { const a = (i / 5) * Math.PI * 2 - Math.PI / 2; return daire(100 + Math.cos(a) * 30, 80 + Math.sin(a) * 30, 20); });

const RESIMLER: Resim[] = [
  { ad: 'Güneş', bolgeler: [{ d: 'M0 0 H200 V200 H0 Z', renk: 'acikmavi' }, { d: isinlar, renk: 'turuncu' }, { d: daire(100, 100, 42), renk: 'sari' }],
    cizgi: 'M84 92 v6 M116 92 v6 M82 112 q18 16 36 0', canlan: { bolge: { 1: don(6, '100px 100px') }, ekler: [{ e: '🐦', x: '0%', y: '12%', anim: 'ok-ucus 3.2s ease-in-out' }] } },
  { ad: 'Ev', bolgeler: [{ d: 'M0 0 H200 V160 H0 Z', renk: 'acikmavi' }, { d: 'M0 160 H200 V200 H0 Z', renk: 'yesil' }, { d: 'M45 95 H155 V165 H45 Z', renk: 'sari' },
    { d: 'M33 97 L100 40 L167 97 Z', renk: 'kirmizi' }, { d: 'M88 122 H114 V165 H88 Z', renk: 'kahve' }, { d: 'M56 108 H80 V130 H56 Z', renk: 'mavi' }, { d: 'M122 108 H146 V130 H122 Z', renk: 'mavi' }], canlan: { ekler: [{ e: '🐦', x: '0%', y: '6%', anim: 'ok-ucus 3s ease-in-out' }, { e: '🦋', x: '12%', y: '70%', anim: 'ok-kelebek 3s ease-in-out' }] } },
  { ad: 'Çiçek', bolgeler: [{ d: 'M95 110 H105 V190 H95 Z', renk: 'yesil' }, { d: elips(124, 150, 20, 9), renk: 'yesil' }, ...yapraklar.map((d) => ({ d, renk: 'pembe' })), { d: daire(100, 80, 17), renk: 'sari' }], canlan: { tum: 'ok-ruzgar 1.2s ease-in-out infinite', ekler: [{ e: '🦋', x: '20%', y: '40%', anim: 'ok-kelebek 3s ease-in-out' }, { e: '🐝', x: '65%', y: '15%', anim: 'ok-yuz 1s ease-in-out infinite' }] } },
  { ad: 'Balık', bolgeler: [{ d: 'M0 0 H200 V200 H0 Z', renk: 'mavi' }, { d: 'M150 100 L190 70 L190 130 Z', renk: 'sari' }, { d: elips(95, 100, 60, 38), renk: 'turuncu' }, { d: 'M80 64 L105 40 L115 66 Z', renk: 'sari' }],
    cizgi: `${daire(62, 92, 5)} M70 112 q10 6 18 0`, canlan: { tum: 'ok-yuz 1.4s ease-in-out infinite', ekler: [0, 1, 2].map((i) => ({ e: '🫧', x: `${20 + i * 12}%`, y: '55%', anim: `ok-kabarcik 1.6s ${i * 0.4}s ease-out infinite`, boy: '1.6rem' })) } },
  { ad: 'Araba', bolgeler: [{ d: 'M0 150 H200 V200 H0 Z', renk: 'yesil' }, { d: 'M60 75 H130 L150 105 H45 Z', renk: 'acikmavi' }, { d: 'M20 105 H180 Q190 105 190 115 V140 H10 V115 Q10 105 20 105 Z', renk: 'kirmizi' },
    { d: daire(55, 145, 18), renk: 'siyah' }, { d: daire(145, 145, 18), renk: 'siyah' }], canlan: { bolge: Object.fromEntries([1, 2, 3, 4].map((i) => [i, { animation: 'ok-sur 3s ease-in 0.3s forwards', transformBox: 'view-box' } as React.CSSProperties])), ekler: [{ e: '💨', x: '0%', y: '58%', anim: 'ok-kabarcik 1s ease-out infinite', boy: '2rem' }] } },
  { ad: 'Elma', bolgeler: [{ d: 'M100 60 C60 40 25 75 35 120 C45 165 80 180 100 165 C120 180 155 165 165 120 C175 75 140 40 100 60 Z', renk: 'kirmizi' },
    { d: 'M102 58 C110 35 135 30 145 38 C135 52 118 58 102 58 Z', renk: 'yesil' }, { d: 'M96 62 L94 35 H102 L102 60 Z', renk: 'kahve' }], canlan: { tum: 'ok-zipla .6s ease-in-out infinite', ekler: [{ e: '🐛', x: '62%', y: '42%', anim: 'ok-yuz 1s ease-in-out infinite' }] } },
  { ad: 'Ağaç', bolgeler: [{ d: 'M0 170 H200 V200 H0 Z', renk: 'yesil' }, { d: 'M88 110 H112 V175 H88 Z', renk: 'kahve' },
    { d: `${daire(100, 70, 40)} ${daire(70, 95, 30)} ${daire(130, 95, 30)}`, renk: 'yesil' }, { d: daire(85, 70, 7), renk: 'kirmizi' }, { d: daire(120, 90, 7), renk: 'kirmizi' }], canlan: { tum: 'ok-ruzgar 1.4s ease-in-out infinite', ekler: [{ e: '🐦', x: '0%', y: '5%', anim: 'ok-ucus 3.2s ease-in-out' }, { e: '🐿️', x: '58%', y: '72%', anim: 'ok-zipla .5s ease-in-out infinite' }] } },
  { ad: 'Balonlar', bolgeler: [{ d: elips(60, 70, 30, 38), renk: 'kirmizi' }, { d: elips(110, 55, 30, 38), renk: 'mavi' }, { d: elips(150, 90, 30, 38), renk: 'sari' }],
    cizgi: 'M60 108 Q70 150 100 185 M110 93 Q105 140 100 185 M150 128 Q130 160 100 185', canlan: { tum: 'ok-uc 3.2s ease-in 0.2s forwards' } },
];

interface Props { currentCard: number; totalCards: number; onAdvance: (dogru: boolean) => Promise<void> | void; onBack: () => void; kurallı?: boolean }

const BoyamaEkrani: React.FC<Props> = ({ currentCard, totalCards, onAdvance, onBack, kurallı }) => {
  const resim = RESIMLER[(currentCard + (kurallı ? 3 : 0)) % RESIMLER.length];
  const gerekli = useMemo(() => [...new Set(resim.bolgeler.map((b) => b.renk))], [resim]);
  const palet = useMemo(() => {
    if (!kurallı) return ['kirmizi', 'mavi', 'sari', 'yesil', 'turuncu', 'mor', 'pembe', 'kahve', 'acikmavi', 'siyah'];
    const fazla = Object.keys(RENK).filter((k) => !gerekli.includes(k)).sort(() => Math.random() - 0.5).slice(0, 2);
    return [...gerekli, ...fazla].sort(() => Math.random() - 0.5);
  }, [resim, kurallı, gerekli]);
  const [renk, setRenk] = useState<string | null>(null);
  const [boya, setBoya] = useState<Record<number, string>>({});
  const [sallanan, setSallanan] = useState<number | null>(null);
  const [yanlis, setYanlis] = useState(0);
  const [son, setSon] = useState<number | null>(null);
  const [kutlama, setKutlama] = useState(false);
  const [canli, setCanli] = useState(false);

  useEffect(() => {
    setBoya({}); setRenk(null); setYanlis(0); setSon(null); setCanli(false);
    speak(kurallı ? `${resim.ad}. Örnekteki gibi boya.` : `${resim.ad}. Bir renk seç, sonra resme dokun.`);
  }, [resim, kurallı]);

  const bitti = resim.bolgeler.every((_, i) => boya[i]);
  // bitince önce resim canlanır (müzikle), sonra kutlama
  useEffect(() => {
    if (!bitti || kutlama) return;
    const z1 = setTimeout(() => { setCanli(true); neseliMelodi(); }, 350);
    const z2 = setTimeout(() => setKutlama(true), resim.canlan ? 3600 : 500);
    return () => { clearTimeout(z1); clearTimeout(z2); };
  }, [bitti]); // eslint-disable-line react-hooks/exhaustive-deps

  const renkSec = (k: string) => { setRenk(k); speak(RENK[k][1]); };
  const bolgeyeDokun = (i: number) => {
    if (!renk) { speak('Önce bir renk seç.'); return; }
    if (kurallı && resim.bolgeler[i].renk !== renk) {
      setSallanan(i); setTimeout(() => setSallanan(null), 600); setYanlis((n) => n + 1); return;
    }
    setBoya((b) => ({ ...b, [i]: renk })); setSon(i); playEffect('correct', { volume: 0.25 });
  };

  const ipucu = kurallı && yanlis >= 2 ? resim.bolgeler.find((_, i) => !boya[i])?.renk : null;
  const Cizim: React.FC<{ kucuk?: boolean }> = ({ kucuk }) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {resim.bolgeler.map((b, i) => (
        <path key={i} d={b.d} data-bolge={kucuk ? undefined : i}
          fill={kucuk ? RENK[b.renk][0] : boya[i] ? RENK[boya[i]][0] : '#ffffff'}
          stroke="#334155" strokeWidth={kucuk ? 4 : 3} strokeLinejoin="round" fillRule="nonzero"
          onClick={kucuk ? undefined : () => bolgeyeDokun(i)}
          style={{ transition: 'fill .25s', cursor: 'pointer', transformOrigin: 'center', transformBox: 'fill-box', ...(sallanan === i ? { animation: 'ok-sallan .3s 2' } : {}), ...(!kucuk && canli ? resim.canlan?.bolge?.[i] : {}), filter: !kucuk && son === i && !canli ? 'brightness(1.12)' : undefined }} />
      ))}
      {resim.cizgi && <path d={resim.cizgi} fill="none" stroke="#334155" strokeWidth={3} strokeLinecap="round" pointerEvents="none" />}
    </svg>
  );

  return (
    <OyunCercevesi baslik={kurallı ? 'Kurallı Boyama' : 'Boyama'} emoji={kurallı ? '🎨' : '🖍️'} onBack={onBack} adim={currentCard - 1} toplamAdim={totalCards}
      yonerge={kurallı ? 'Örnekteki gibi boya.' : 'Bir renk seç, sonra resme dokun.'}>
      <div className="absolute inset-0 flex flex-col landscape:flex-row items-center gap-3 px-3 pb-3 select-none">
        <div className="relative w-full max-w-[min(92vw,62vh)] landscape:max-w-[min(55vw,75vh)] aspect-square rounded-3xl bg-white shadow-xl p-2 overflow-hidden">
          <div className="w-full h-full" style={canli && resim.canlan?.tum ? { animation: resim.canlan.tum, transformOrigin: '50% 90%' } : undefined}><Cizim /></div>
          {canli && resim.canlan?.ekler?.map((x, i) => (
            <span key={i} className="absolute pointer-events-none" style={{ left: x.x, top: x.y, fontSize: x.boy || '2.6rem', animation: x.anim }}>{x.e}</span>
          ))}
          {kurallı && (
            <div className="absolute -top-2 -right-2 w-[28%] aspect-square rounded-2xl bg-white shadow-lg ring-4 ring-amber-300 p-1" aria-label="Örnek">
              <Cizim kucuk />
            </div>
          )}
        </div>
        <div className="flex flex-wrap landscape:flex-col justify-center gap-2 max-w-md">
          {palet.map((k) => (
            <button key={k} onClick={() => renkSec(k)} aria-label={RENK[k][1]}
              className={`w-14 h-14 rounded-full shadow-md transition active:scale-90 ${renk === k ? 'ring-[6px] ring-slate-800 scale-110' : 'ring-4 ring-white'} ${ipucu === k ? 'animate-pulse ring-amber-400' : ''}`}
              style={{ background: RENK[k][0] }} />
          ))}
        </div>
      </div>
      <Kutlama acik={kutlama} yazi="Çok güzel!" sure={1800} onBitti={() => { setKutlama(false); void onAdvance(yanlis < 3); }} />
    </OyunCercevesi>
  );
};

export default BoyamaEkrani;
