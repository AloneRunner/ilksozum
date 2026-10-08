import React, { useEffect, useRef, useState } from 'react';
import { kayitDinle } from '../../services/speechService.ts';
import { AgizDurus, DURUSLAR, Vizem, harfVizemi, karistir } from './agizSekilleri.ts';

// Konuşan yüz (Kaan, 2026-10-08): Gökçe kaydı çalarken ağız harf zamanlarıyla (hizalama.json) senkron hareket eder.
// Çizim tamamen kod (SVG); görsel dosyası yok.

type Hiza = [string, number[], number]; // harfler, başlangıçlar (santisaniye), son
let hizaSozu: Promise<Record<string, Hiza>> | null = null;
const hizalamaYukle = (): Promise<Record<string, Hiza>> =>
  (hizaSozu ??= fetch('/audio/ses/hizalama.json').then((r) => (r.ok ? r.json() : {})).catch(() => ({})) as Promise<Record<string, Hiza>>);

const DUDAK = '#ec8a96', DUDAK_KOYU = '#c9606e', ICERI = '#5b1d2a', DIL = '#e8737f', DIS = '#ffffff';

/** Ağzın kendisi (merkez 0,0). */
export const AgizCizim: React.FC<{ p: AgizDurus; id: string }> = ({ p, id }) => {
  const w = 24 + p.gen * 26 - p.yuv * 10;
  const h = 1.2 + p.acik * 30;
  const lt = 6 + p.yuv * 5;
  const ust = -h * 0.45, alt = h * 0.95;
  const k = 1.333; // kübik eğrinin ortası kontrol noktasının 3/4'üne ulaşır
  const ic = `M ${-w} 0 C ${-w * 0.55} ${ust * k} ${w * 0.55} ${ust * k} ${w} 0 C ${w * 0.55} ${alt * k} ${-w * 0.55} ${alt * k} ${-w} 0 Z`;
  const ut = ust - lt;
  const ustDudak = `M ${-w - 2} 0 C ${-w * 0.6} ${ut * 1.2} ${-12} ${ut * 1.15} 0 ${ut + 2.5} C 12 ${ut * 1.15} ${w * 0.6} ${ut * 1.2} ${w + 2} 0 L ${w} 0 C ${w * 0.55} ${ust * k} ${-w * 0.55} ${ust * k} ${-w} 0 Z`;
  const ab = alt + lt * 1.15;
  const altDudak = `M ${-w - 2} 0 L ${-w} 0 C ${-w * 0.55} ${alt * k} ${w * 0.55} ${alt * k} ${w} 0 L ${w + 2} 0 C ${w * 0.62} ${ab * k} ${-w * 0.62} ${ab * k} ${-w - 2} 0 Z`;
  const disBoyu = 9;
  return (
    <g>
      <defs><clipPath id={`ic-${id}`}><path d={ic} /></clipPath></defs>
      <path d={ic} fill={ICERI} />
      <g clipPath={`url(#ic-${id})`}>
        {p.dilAlt > 0.02 && <ellipse cx={0} cy={alt * 0.95} rx={w * 0.62} ry={(4 + p.acik * 9) * p.dilAlt} fill={DIL} />}
        {p.ust > 0.02 && <rect x={-w} y={ust - 3} width={w * 2} height={3 + p.ust * disBoyu} rx={2} fill={DIS} />}
        {p.ust > 0.3 && [-0.5, 0, 0.5].map((x) => <line key={x} x1={x * w * 0.6} x2={x * w * 0.6} y1={ust - 3} y2={ust + p.ust * disBoyu} stroke="#e6e6ee" strokeWidth={0.8} />)}
        {p.alt > 0.02 && <rect x={-w} y={alt - p.alt * 7} width={w * 2} height={p.alt * 7 + 3} rx={2} fill={DIS} />}
        {p.dilUc > 0.02 && <ellipse cx={0} cy={ust + p.ust * disBoyu + 3} rx={9} ry={6 * p.dilUc} fill={DIL} />}
      </g>
      <path d={ustDudak} fill={DUDAK} stroke={DUDAK_KOYU} strokeWidth={1} strokeLinejoin="round" />
      <path d={altDudak} fill={DUDAK} stroke={DUDAK_KOYU} strokeWidth={1} strokeLinejoin="round" />
      {p.acik < 0.08 && <path d={`M ${-w} 0 C ${-w * 0.5} 1 ${w * 0.5} 1 ${w} 0`} stroke={DUDAK_KOYU} strokeWidth={1.4} fill="none" strokeLinecap="round" />}
      {p.fv > 0.02 && <rect x={-w * 0.55} y={-2} width={w * 1.1} height={2 + 4 * p.fv} rx={1.5} fill={DIS} opacity={p.fv} />}
    </g>
  );
};

/** Kart küçük resmi: yalnız ağız, durağan. */
export const AgizSekli: React.FC<{ v: Vizem; className?: string }> = ({ v, className }) => {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg viewBox="-60 -42 120 84" className={className} aria-hidden="true">
      <rect x={-60} y={-42} width={120} height={84} rx={18} fill="#fbe1cf" />
      <AgizCizim p={DURUSLAR[v]} id={id} />
    </svg>
  );
};

interface Props {
  className?: string;
  /** Çalan kaydın kaçıncı harfinde (-1 = sustu); ekrandaki yazıyı vurgulamak için */
  onHarf?: (i: number) => void;
  /** Ağzımı İzle ve BASARA'da ağız büyük (hareket görünsün); maskotta küçük ve doğal */
  buyukAgiz?: boolean;
}

const KonusanAgiz: React.FC<Props> = ({ className, onHarf, buyukAgiz }) => {
  const id = React.useId().replace(/:/g, '');
  const [p, setP] = useState<AgizDurus>(DURUSLAR.sus);
  const [kirp, setKirp] = useState(false);
  const aktif = useRef<{ audio: HTMLAudioElement; hiza?: Hiza } | null>(null);
  const simdiki = useRef<AgizDurus>(DURUSLAR.sus);
  const sonVizem = useRef<Vizem>('sus');
  const sonHarf = useRef(-1);
  const tutma = useRef(0);
  const harfCb = useRef(onHarf);
  harfCb.current = onHarf;

  useEffect(() => kayitDinle((k) => {
    if (!k) { aktif.current = null; return; }
    const kayit = { audio: k.audio } as { audio: HTMLAudioElement; hiza?: Hiza };
    aktif.current = kayit;
    hizalamaYukle().then((t) => { kayit.hiza = t[k.dosya]; });
  }), []);

  useEffect(() => { hizalamaYukle(); }, []);

  useEffect(() => {
    let raf = 0, once = performance.now();
    const kare = (simdi: number) => {
      const dt = Math.min(0.05, (simdi - once) / 1000); once = simdi;
      let hedef: Vizem = 'sus';
      let harf = -1;
      const a = aktif.current;
      if (a && !a.audio.paused) {
        const t = (a.audio.currentTime + 0.04) * 100; // sesten biraz önce: dudak önce kıpırdar
        if (a.hiza) {
          const [harfler, bas, son] = a.hiza;
          if (t < son) {
            let i = 0;
            while (i + 1 < bas.length && bas[i + 1] <= t) i++;
            const v = harfVizemi(harfler[i]);
            hedef = v ?? sonVizem.current;
            harf = i;
          }
        } else {
          hedef = Math.floor(t / 15) % 2 ? 'A' : 'M'; // zaman verisi yoksa kaba ağız aç-kapa
        }
      }
      // ses bitince son şekli yarım saniye tut: kısa kayıtlarda (tek ünlü 0,3 sn) çocuk ağzı görebilsin
      if (hedef !== 'sus') tutma.current = simdi + 500;
      else if (simdi < tutma.current) hedef = sonVizem.current;
      sonVizem.current = hedef;
      if (harf !== sonHarf.current) { sonHarf.current = harf; harfCb.current?.(harf); }
      simdiki.current = karistir(simdiki.current, DURUSLAR[hedef], 1 - Math.exp(-dt * 24));
      setP(simdiki.current);
      raf = requestAnimationFrame(kare);
    };
    raf = requestAnimationFrame(kare);
    return () => cancelAnimationFrame(raf);
  }, []);

  // göz kırpma
  useEffect(() => {
    let z = 0;
    const plan = () => { z = window.setTimeout(() => { setKirp(true); window.setTimeout(() => setKirp(false), 130); plan(); }, 2500 + Math.random() * 3000); };
    plan();
    return () => clearTimeout(z);
  }, []);

  // Gökçe (Kaan, 2026-10-08: "daha güzel kız olmaz mı"): yuvarlak yüz, büyük parlak gözler, kâkül, iki topuz + toka
  const SAC = '#5b3a29', TEN = '#ffe3d1';
  const goz = (cx: number) => kirp
    ? <path d={`M ${cx - 12} 130 Q ${cx} 138 ${cx + 12} 130`} stroke="#3b2a24" strokeWidth={3} fill="none" strokeLinecap="round" />
    : (
      <g>
        <ellipse cx={cx} cy={128} rx={13} ry={15} fill="#fff" />
        <circle cx={cx} cy={131} r={10} fill="#7a4a2a" />
        <circle cx={cx} cy={132} r={5.5} fill="#2b1a12" />
        <circle cx={cx + 4} cy={126} r={3.6} fill="#fff" />
        <circle cx={cx - 3} cy={136} r={1.6} fill="#fff" opacity={0.9} />
        <path d={`M ${cx - 13} 122 Q ${cx} 108 ${cx + 13} 122`} stroke="#3b2a24" strokeWidth={2.6} fill="none" strokeLinecap="round" />
        <path d={cx < 120 ? `M ${cx - 12} 120 l -6 -4 M ${cx - 8} 115 l -4 -6` : `M ${cx + 12} 120 l 6 -4 M ${cx + 8} 115 l 4 -6`} stroke="#3b2a24" strokeWidth={2.2} strokeLinecap="round" />
      </g>
    );
  return (
    <svg viewBox="0 0 240 240" className={className} role="img" aria-label="Gökçe">
      {/* topuzlar ve tokalar */}
      <circle cx={30} cy={96} r={30} fill={SAC} />
      <circle cx={210} cy={96} r={30} fill={SAC} />
      {/* arka saç */}
      <path d="M 26 140 C 20 60 70 22 120 22 C 170 22 220 60 214 140 C 214 175 200 196 186 204 L 54 204 C 40 196 26 175 26 140 Z" fill={SAC} />
      {/* tokalar: topuzla saçın birleştiği yerde */}
      <circle cx={52} cy={70} r={9} fill="#f472b6" stroke="#db2777" strokeWidth={2} />
      <circle cx={188} cy={70} r={9} fill="#f472b6" stroke="#db2777" strokeWidth={2} />
      {/* yüz */}
      <ellipse cx={120} cy={138} rx={90} ry={86} fill={TEN} stroke="#f5c9ae" strokeWidth={2.5} />
      {/* kâkül + parlaklık */}
      <path d="M 34 132 C 30 64 80 34 120 34 C 160 34 210 64 206 132 C 194 106 176 94 158 98 C 148 86 132 82 120 88 C 106 82 90 86 80 98 C 62 94 46 106 34 132 Z" fill={SAC} />
      <path d="M 70 62 C 90 48 120 44 146 50" stroke="#fff" strokeWidth={5} strokeLinecap="round" fill="none" opacity={0.22} />
      {goz(86)}
      {goz(154)}
      <ellipse cx={62} cy={164} rx={15} ry={9} fill="#f9a8b8" opacity={0.55} />
      <ellipse cx={178} cy={164} rx={15} ry={9} fill="#f9a8b8" opacity={0.55} />
      <path d="M 117 150 Q 120 155 124 152" stroke="#e0a688" strokeWidth={2.6} fill="none" strokeLinecap="round" />
      <g transform={`translate(120 ${buyukAgiz ? 184 : 180}) scale(${buyukAgiz ? 1.15 : 0.72})`}><AgizCizim p={p} id={id} /></g>
    </svg>
  );
};

export default KonusanAgiz;
