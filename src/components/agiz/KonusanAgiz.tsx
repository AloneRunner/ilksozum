import React, { useEffect, useRef, useState } from 'react';
import { kayitDinle } from '../../services/speechService.ts';
import { AgizDurus, DURUSLAR, Vizem, harfVizemi, karistir } from './agizSekilleri.ts';

// Konuşan yüz (Kaan, 2026-10-08): Gökçe kaydı çalarken ağız harf zamanlarıyla (hizalama.json) senkron hareket eder.
// Çizim tamamen kod (SVG); görsel dosyası yok.

type Hiza = [string, number[], number]; // harfler, başlangıçlar (santisaniye), son
let hizaSozu: Promise<Record<string, Hiza>> | null = null;
const hizalamaYukle = (): Promise<Record<string, Hiza>> =>
  (hizaSozu ??= fetch('/audio/ses/hizalama.json').then((r) => (r.ok ? r.json() : {})).catch(() => ({})) as Promise<Record<string, Hiza>>);

const DUDAK = '#d95f6c', DUDAK_KOYU = '#b3434f', ICERI = '#5b1d2a', DIL = '#e8737f', DIS = '#ffffff';

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
}

const KonusanAgiz: React.FC<Props> = ({ className, onHarf }) => {
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

  return (
    <svg viewBox="0 0 240 240" className={className} role="img" aria-label="Konuşan yüz">
      <circle cx={120} cy={124} r={108} fill="#fbe1cf" stroke="#f0c9ae" strokeWidth={3} />
      <path d="M 22 112 C 26 40 90 14 120 16 C 150 14 214 40 218 112 C 200 70 160 52 120 54 C 80 52 40 70 22 112 Z" fill="#6b4a3a" />
      <ellipse cx={66} cy={150} rx={17} ry={11} fill="#f4a6a6" opacity={0.45} />
      <ellipse cx={174} cy={150} rx={17} ry={11} fill="#f4a6a6" opacity={0.45} />
      <path d="M 70 88 Q 85 80 100 88" stroke="#6b4a3a" strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M 140 88 Q 155 80 170 88" stroke="#6b4a3a" strokeWidth={4} fill="none" strokeLinecap="round" />
      <ellipse cx={85} cy={108} rx={9} ry={kirp ? 1.2 : 11} fill="#3b2a24" />
      <ellipse cx={155} cy={108} rx={9} ry={kirp ? 1.2 : 11} fill="#3b2a24" />
      {!kirp && <><circle cx={88} cy={104} r={3} fill="#fff" /><circle cx={158} cy={104} r={3} fill="#fff" /></>}
      <path d="M 116 124 Q 120 138 126 132" stroke="#d9a989" strokeWidth={3} fill="none" strokeLinecap="round" />
      <g transform="translate(120 176) scale(1.35)"><AgizCizim p={p} id={id} /></g>
    </svg>
  );
};

export default KonusanAgiz;
