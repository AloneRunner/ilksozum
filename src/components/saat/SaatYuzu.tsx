import React, { useRef, useState } from 'react';
import type { Saat } from './saatDil.ts';

// Çocuk saati: görünüm kavram görselleriyle aynı (tools/gorsel-envanter/uret-saat.mjs):
// kalın turuncu kenar, büyük rakamlar, kısa kalın KIRMIZI akrep, uzun ince MAVİ yelkovan.
// Sürükleme: yelkovan çevrilince akrep de dişli gibi ilerler; akrep çevrilince saat değişir, dakika kalır.
export type Ibre = 'akrep' | 'yelkovan';

interface Props {
  saat: Saat;
  surukle?: 'yok' | 'akrep' | 'ikisi';
  adim?: number;                    // yelkovanın oturduğu dakika aralığı (60: tam, 30: buçuk, 15: çeyrek, 5)
  onDegis?: (s: Saat) => void;      // sürüklerken
  onBirak?: (s: Saat) => void;      // parmak kalkınca
  onIbreDokun?: (i: Ibre) => void;  // sürükleme yokken ibreye dokunma (akrep/yelkovan tanıma)
  vurgu?: Ibre | null;
  hayalet?: Saat | null;            // ipucu: hedef saatin soluk ibreleri
  ibresiz?: boolean;                // çalışma kâğıdı: ibreleri çocuk çizer
  className?: string;
}

const C = 256;
const AKREP_BOY = 105, YELKOVAN_BOY = 165;
const akrepAci = ({ h, m }: Saat) => (h % 12) * 30 + m * 0.5;
const yelkovanAci = ({ m }: Saat) => m * 6;
const aciFarki = (a: number, b: number) => { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; };
const saatDuzelt = (h: number) => ((((h - 1) % 12) + 12) % 12) + 1;

const RAKAMLAR = Array.from({ length: 12 }, (_, i) => i + 1).map(n => {
  const a = (n * 30 - 90) * Math.PI / 180;
  return { n, x: C + 168 * Math.cos(a), y: C + 168 * Math.sin(a) };
});
const CENTIKLER = Array.from({ length: 60 }, (_, i) => {
  const a = (i * 6 - 90) * Math.PI / 180, buyuk = i % 5 === 0, r1 = buyuk ? 196 : 204, r2 = 212;
  return { x1: C + r1 * Math.cos(a), y1: C + r1 * Math.sin(a), x2: C + r2 * Math.cos(a), y2: C + r2 * Math.sin(a), buyuk };
});

const SaatYuzu: React.FC<Props> = ({ saat, surukle = 'yok', adim = 5, onDegis, onBirak, onIbreDokun, vurgu, hayalet, ibresiz, className }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tutulan = useRef<Ibre | null>(null);
  const anlik = useRef<Saat>(saat);
  anlik.current = saat;
  const [suruklen, setSuruklen] = useState(false);

  // Parmağın saat merkezine göre açısı (12 yönü 0°, saat yönünde) ve uzaklığı (512'lik koordinatta)
  const konum = (e: React.PointerEvent) => {
    const r = svgRef.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) * 512 / r.width - C, y = (e.clientY - r.top) * 512 / r.height - C;
    return { aci: (Math.atan2(y, x) * 180 / Math.PI + 90 + 360) % 360, uzak: Math.hypot(x, y) };
  };
  const hangiIbre = (aci: number, uzak: number): Ibre | null => {
    const dA = aciFarki(aci, akrepAci(anlik.current)), dY = aciFarki(aci, yelkovanAci(anlik.current));
    if (uzak < 40) return null;
    if (uzak < AKREP_BOY + 25 && dA < 35 && dA <= dY + 10) return 'akrep';
    if (dY < 40) return 'yelkovan';
    if (dA < 35) return 'akrep';
    return null;
  };

  const tasi = (aci: number) => {
    const s = anlik.current;
    let yeni: Saat;
    if (tutulan.current === 'yelkovan') {
      const m = (Math.round(aci / 6 / adim) * adim) % 60;
      let h = s.h;
      if (s.m >= 45 && m < 15) h = saatDuzelt(h + 1);
      else if (s.m < 15 && m >= 45) h = saatDuzelt(h - 1);
      yeni = { h, m };
    } else {
      yeni = { h: saatDuzelt(Math.round((aci - s.m * 0.5) / 30)), m: s.m };
    }
    if (yeni.h !== s.h || yeni.m !== s.m) { anlik.current = yeni; onDegis?.(yeni); }
  };

  const bas = (e: React.PointerEvent) => {
    const { aci, uzak } = konum(e);
    const ibre = hangiIbre(aci, uzak);
    if (surukle === 'yok') { if (ibre) onIbreDokun?.(ibre); return; }
    // Yalnız akrep çevriliyorsa (tam saatler) saatin neresine dokunulursa dokunulsun akrep gelir
    const tut = surukle === 'akrep' ? 'akrep' : ibre;
    if (!tut) return;
    tutulan.current = tut;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setSuruklen(true);
    tasi(aci);
  };
  const kay = (e: React.PointerEvent) => { if (tutulan.current) tasi(konum(e).aci); };
  const birak = () => {
    if (!tutulan.current) return;
    tutulan.current = null;
    setSuruklen(false);
    onBirak?.(anlik.current);
  };

  const gecis = suruklen ? 'none' : 'transform .35s ease-out';
  const ibre = (aci: number, boy: number, renk: string, kalin: number, ad: Ibre, soluk = false) => (
    <g style={{ transform: `rotate(${aci}deg)`, transformOrigin: `${C}px ${C}px`, transition: gecis }} opacity={soluk ? 0.28 : 1}>
      {vurgu === ad && !soluk && <line x1={C} y1={C} x2={C} y2={C - boy} stroke={renk} strokeWidth={kalin + 22} strokeLinecap="round" opacity={0.3} className="saat-nabiz" />}
      <line x1={C} y1={C} x2={C} y2={C - boy} stroke={renk} strokeWidth={kalin} strokeLinecap="round" strokeDasharray={soluk ? '14 12' : undefined} />
    </g>
  );

  return (
    <svg ref={svgRef} viewBox="0 0 512 512" className={className} style={{ touchAction: 'none', userSelect: 'none' }}
      onPointerDown={bas} onPointerMove={kay} onPointerUp={birak} onPointerCancel={birak} role="img" aria-label="Saat">
      <style>{'@keyframes saat-nabiz{0%,100%{opacity:.15}50%{opacity:.5}}.saat-nabiz{animation:saat-nabiz 1s ease-in-out infinite}'}</style>
      <circle cx={C} cy={C} r={220} fill="#fffdf5" stroke="#f59e0b" strokeWidth={18} />
      {CENTIKLER.map((c, i) => <line key={i} {...c} stroke="#334155" strokeWidth={c.buyuk ? 6 : 2} strokeLinecap="round" />)}
      {RAKAMLAR.map(r => (
        <text key={r.n} x={r.x} y={r.y} fontFamily="Segoe UI, Arial, sans-serif" fontSize={52} fontWeight={700} fill="#1f2937" textAnchor="middle" dominantBaseline="central">{r.n}</text>
      ))}
      {hayalet && ibre(akrepAci(hayalet), AKREP_BOY, '#dc2626', 18, 'akrep', true)}
      {hayalet && ibre(yelkovanAci(hayalet), YELKOVAN_BOY, '#2563eb', 10, 'yelkovan', true)}
      {!ibresiz && ibre(akrepAci(saat), AKREP_BOY, '#dc2626', 18, 'akrep')}
      {!ibresiz && ibre(yelkovanAci(saat), YELKOVAN_BOY, '#2563eb', 10, 'yelkovan')}
      <circle cx={C} cy={C} r={14} fill="#1f2937" />
    </svg>
  );
};

export default SaatYuzu;
