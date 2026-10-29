import React from 'react';

// Üstünde/Altında sahneleri (Gökhan Hoca, 2026-10-29): iki şıkta aynı mobilya, yalnız nesnenin yeri değişir.
// Mobilya kodla çizilir; nesne beyaz zeminli fotoğraftan kesilmiş saydam resim (tools/gorsel-envanter/nesne-kes.py).
// "Altında": çizim sırası arka ayaklar → nesne → tabla → ön ayaklar; nesne iki ayak sırasının arasında, yerde.
// "Üstünde": nesne tablaya oturur (altında gölge), havada durmaz.
import type { Mobilya } from '../../data/ustAlt.ts';
export type { Mobilya };

const AHSAP = { ust: '#ecd2a8', yan: '#d6ad78', ayak: '#c99a62', koyu: '#b8864f' };

interface Olcu {
  ust: (ad: string) => React.ReactNode;           // tabla / oturak
  arka: React.ReactNode; on: React.ReactNode;      // arka ve ön ayaklar
  yuzeyY: number; yerY: number; boy: number;       // nesnenin oturacağı y'ler ve nesne yüksekliği
}

const ayak = (x: number, y1: number, y2: number, g = 8) => <rect x={x - g / 2} y={y1} width={g} height={y2 - y1} rx={2} fill={AHSAP.ayak} />;
const tabla = (onY: number, arkaY: number, onX: [number, number], arkaX: [number, number], kalin: number) => (
  <>
    <polygon points={`${onX[0]},${onY} ${onX[1]},${onY} ${arkaX[1]},${arkaY} ${arkaX[0]},${arkaY}`} fill={AHSAP.ust} />
    <rect x={onX[0]} y={onY} width={onX[1] - onX[0]} height={kalin} fill={AHSAP.yan} />
  </>
);

const OLCULER: Record<Mobilya, Olcu> = {
  masa: {
    ust: () => tabla(86, 68, [28, 172], [46, 154], 9),
    arka: <>{ayak(52, 72, 164)}{ayak(148, 72, 164)}</>, on: <>{ayak(34, 92, 182, 9)}{ayak(166, 92, 182, 9)}</>,
    yuzeyY: 79, yerY: 175, boy: 62,
  },
  sandalye: {
    ust: () => (
      <>
        {ayak(68, 26, 100, 7)}{ayak(132, 26, 100, 7)}
        <rect x={66} y={34} width={68} height={9} rx={3} fill={AHSAP.yan} /><rect x={66} y={54} width={68} height={8} rx={3} fill={AHSAP.yan} />
        {tabla(116, 98, [52, 148], [64, 136], 8)}
      </>
    ),
    arka: <>{ayak(68, 100, 166, 7)}{ayak(132, 100, 166, 7)}</>, on: <>{ayak(57, 122, 182)}{ayak(143, 122, 182)}</>,
    yuzeyY: 108, yerY: 176, boy: 48,
  },
  tabure: {
    ust: () => (
      <>
        <ellipse cx={100} cy={97} rx={50} ry={9} fill={AHSAP.yan} />
        <rect x={50} y={88} width={100} height={9} fill={AHSAP.yan} />
        <ellipse cx={100} cy={88} rx={50} ry={14} fill={AHSAP.ust} />
      </>
    ),
    arka: <>{ayak(100, 92, 162, 8)}</>, on: <>{ayak(64, 98, 182, 9)}{ayak(136, 98, 182, 9)}</>,
    yuzeyY: 90, yerY: 174, boy: 58,
  },
  sehpa: {
    ust: () => tabla(108, 92, [24, 176], [42, 158], 9),
    arka: <>{ayak(48, 96, 166)}{ayak(152, 96, 166)}</>, on: <>{ayak(30, 114, 182, 9)}{ayak(170, 114, 182, 9)}</>,
    yuzeyY: 101, yerY: 176, boy: 46,
  },
  bank: {
    ust: () => tabla(100, 88, [8, 192], [22, 178], 8),
    arka: <>{ayak(30, 92, 166)}{ayak(170, 92, 166)}</>, on: <>{ayak(16, 106, 182, 9)}{ayak(184, 106, 182, 9)}</>,
    yuzeyY: 95, yerY: 176, boy: 54,
  },
};

const Nesne: React.FC<{ url: string; altY: number; boy: number }> = ({ url, altY, boy }) => (
  <>
    <ellipse cx={100} cy={altY} rx={boy * 0.45} ry={4} fill="#000" opacity={0.18} />
    <image href={url} x={100 - boy * 0.7} y={altY - boy} width={boy * 1.4} height={boy} preserveAspectRatio="xMidYMax meet" />
  </>
);

export const MobilyaSahne: React.FC<{ mobilya: Mobilya; nesne: string; ustunde: boolean; className?: string }> = ({ mobilya, nesne, ustunde, className }) => {
  const o = OLCULER[mobilya];
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={`${mobilya} ${ustunde ? 'üstünde' : 'altında'}`}>
      <rect width="200" height="200" fill="#f8fafc" />
      <ellipse cx="100" cy="178" rx="92" ry="9" fill="#cbd5e1" opacity={0.6} />
      {o.arka}
      {!ustunde && <Nesne url={nesne} altY={o.yerY} boy={o.boy} />}
      {o.ust(mobilya)}
      {o.on}
      {ustunde && <Nesne url={nesne} altY={o.yuzeyY} boy={o.boy} />}
    </svg>
  );
};

export default MobilyaSahne;
