// Ağız şekilleri (vizem): her ses grubunun ağız duruşu. Kaan, 2026-10-08.
// Önden görünüm; "Adım Adım Konuşuyorum" tarzı artikülasyon kartlarından esinlenildi (çizimler bizim, kodla).
//
// acik: ağız açıklığı 0–1 · gen: genişlik 0–1 · yuv: yuvarlak/öne uzatma 0–1
// ust/alt: üst/alt dişlerin görünmesi 0–1 · dilUc: dil ucu üst dişlere 0–1 · dilAlt: dil altta görünür 0–1
// fv: üst dişler alt dudağa değiyor (f, v) 0–1
export interface AgizDurus { acik: number; gen: number; yuv: number; ust: number; alt: number; dilUc: number; dilAlt: number; fv: number }
export type Vizem = 'sus' | 'A' | 'E' | 'I' | 'O' | 'U' | 'M' | 'F' | 'S' | 'SH' | 'L' | 'R' | 'K';

const d = (p: Partial<AgizDurus>): AgizDurus => ({ acik: 0, gen: 0.55, yuv: 0.15, ust: 0, alt: 0, dilUc: 0, dilAlt: 0, fv: 0, ...p });

export const DURUSLAR: Record<Vizem, AgizDurus> = {
  sus: d({ acik: 0.04, gen: 0.55, yuv: 0.15 }),
  A: d({ acik: 1, gen: 0.68, yuv: 0.15, ust: 0.55, alt: 0.15, dilAlt: 0.7 }),
  E: d({ acik: 0.55, gen: 0.86, yuv: 0, ust: 0.75, alt: 0.45, dilAlt: 0.35 }),
  I: d({ acik: 0.28, gen: 0.92, yuv: 0, ust: 0.85, alt: 0.7 }),
  O: d({ acik: 0.7, gen: 0.42, yuv: 0.85, ust: 0.25, dilAlt: 0.4 }),
  U: d({ acik: 0.34, gen: 0.26, yuv: 1, ust: 0.1 }),
  M: d({ acik: 0, gen: 0.56, yuv: 0.1 }),
  F: d({ acik: 0.12, gen: 0.66, yuv: 0, fv: 1 }),
  S: d({ acik: 0.16, gen: 0.8, yuv: 0, ust: 1, alt: 1 }),
  SH: d({ acik: 0.22, gen: 0.5, yuv: 0.65, ust: 1, alt: 1 }),
  L: d({ acik: 0.38, gen: 0.7, yuv: 0.05, ust: 0.6, dilUc: 1 }),
  R: d({ acik: 0.3, gen: 0.62, yuv: 0.1, ust: 0.5, dilUc: 0.75 }),
  K: d({ acik: 0.5, gen: 0.64, yuv: 0.1, ust: 0.45, alt: 0.2, dilAlt: 0.55 }),
};

const HARF: Record<string, Vizem> = {
  a: 'A', e: 'E', ı: 'I', i: 'I', y: 'I', o: 'O', ö: 'O', u: 'U', ü: 'U',
  m: 'M', b: 'M', p: 'M', f: 'F', v: 'F',
  s: 'S', z: 'S', ş: 'SH', ç: 'SH', c: 'SH', j: 'SH',
  l: 'L', n: 'L', t: 'L', d: 'L', r: 'R', k: 'K', g: 'K', h: 'K',
};

/** Harfin vizemi; "ğ" önceki ünlüyü uzatır (null = önceki şekil sürsün). */
export const harfVizemi = (h: string): Vizem | null => {
  const k = h.toLocaleLowerCase('tr-TR');
  if (k === 'ğ') return null;
  return HARF[k] ?? 'sus';
};

/** Metnin baskın (ilk ünlü ya da ilk ünsüz) vizemi: kart küçük resmi için. */
export const anaVizem = (metin: string): Vizem => {
  for (const h of metin) { const v = harfVizemi(h); if (v && v !== 'sus') return v; }
  return 'sus';
};

export const karistir = (a: AgizDurus, b: AgizDurus, t: number): AgizDurus => {
  const r = {} as AgizDurus;
  (Object.keys(a) as (keyof AgizDurus)[]).forEach((k) => { r[k] = a[k] + (b[k] - a[k]) * t; });
  return r;
};
