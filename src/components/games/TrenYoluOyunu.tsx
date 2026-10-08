import React, { useEffect, useMemo, useRef, useState } from 'react';
import { OyunCercevesi, Kutlama, OyunSonu, useSeviye } from '../oyunKiti/OyunKiti.tsx';
import { speak, playEffect } from '../../services/speechService.ts';

// Tren Yolu (yeniden, Kaan 2026-10-08: "duvarlar garip garip yanıyor"): ray yolunda eksik parçalar var;
// çocuk doğru parçayı (düz / kıvrık) boşluğa taşır, boşlukta parçanın silueti görünür. Bitince tren yolu izleyip
// istasyona gider. Seviye: 1 → 2 → 3 boşluk, sonra çok kıvrımlı yollar. Ceza yok.
const SAT = 5, SUT = 5, OTURUM = 5;
type Yon = 'L' | 'R' | 'U' | 'D';
type Tip = 'LR' | 'DU' | 'DL' | 'LU' | 'DR' | 'RU';
interface Hucre { r: number; c: number; tip: Tip }
const SEVIYELER = [{ bosluk: 1, kivrim: 0 }, { bosluk: 2, kivrim: 1 }, { bosluk: 3, kivrim: 2 }, { bosluk: 3, kivrim: 3 }];

const tipBul = (a: Yon, b: Yon): Tip => [a, b].sort().join('') as Tip;
const komsuYon = (r1: number, c1: number, r2: number, c2: number): Yon => (r2 < r1 ? 'U' : r2 > r1 ? 'D' : c2 < c1 ? 'L' : 'R');
const ters: Record<Yon, Yon> = { L: 'R', R: 'L', U: 'D', D: 'U' };

/** Soldan sağa, kendini kesmeyen rastgele yol; en az `kivrim` dönüş */
const yolUret = (kivrim: number): Hucre[] => {
  for (let deneme = 0; deneme < 500; deneme++) {
    let r = 1 + Math.floor(Math.random() * (SAT - 2)), c = 0;
    const yol: [number, number][] = [[r, c]];
    const gorulen = new Set([`${r},${c}`]);
    while (c < SUT - 1 && yol.length < 14) {
      const adaylar: [number, number][] = [];
      for (const [dr, dc, w] of [[0, 1, 3], [-1, 0, 2], [1, 0, 2]] as const) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nr >= SAT || gorulen.has(`${nr},${nc}`)) continue;
        for (let i = 0; i < w; i++) adaylar.push([nr, nc]);
      }
      if (!adaylar.length) break;
      [r, c] = adaylar[Math.floor(Math.random() * adaylar.length)];
      gorulen.add(`${r},${c}`); yol.push([r, c]);
    }
    if (c !== SUT - 1) continue;
    const hucreler: Hucre[] = yol.map(([hr, hc], i) => {
      const giris: Yon = i === 0 ? 'L' : komsuYon(hr, hc, yol[i - 1][0], yol[i - 1][1]);
      const cikis: Yon = i === yol.length - 1 ? 'R' : komsuYon(hr, hc, yol[i + 1][0], yol[i + 1][1]);
      return { r: hr, c: hc, tip: tipBul(giris, cikis) };
    });
    const donus = hucreler.filter((h) => h.tip !== 'LR' && h.tip !== 'DU').length;
    if (donus >= kivrim && donus <= kivrim + 3) return hucreler;
  }
  return Array.from({ length: SUT }, (_, c) => ({ r: 2, c, tip: 'LR' as Tip }));
};

/** Hücre içindeki orta çizgi noktası (t: 0 giriş → 1 çıkış); S hücre boyu */
const yanNokta = (y: Yon, S: number): [number, number] => ({ L: [0, S / 2], R: [S, S / 2], U: [S / 2, 0], D: [S / 2, S] } as Record<Yon, [number, number]>)[y];

/** Ray çizimi (hücre içi, 0..S) */
const Ray: React.FC<{ tip: Tip; S: number; soluk?: boolean }> = ({ tip, S, soluk }) => {
  const [a, b] = tip.split('') as [Yon, Yon];
  const ofs = S * 0.17;
  const duz = tip === 'LR' || tip === 'DU';
  const renk = soluk ? '#cbd5e1' : '#6b7280';
  const travers = soluk ? '#e2e8f0' : '#a16207';
  if (duz) {
    const yatay = tip === 'LR';
    const t = [0.12, 0.37, 0.62, 0.87];
    return (
      <g>
        {t.map((k) => yatay
          ? <rect key={k} x={k * S - S * 0.05} y={S / 2 - S * 0.27} width={S * 0.1} height={S * 0.54} rx={2} fill={travers} />
          : <rect key={k} y={k * S - S * 0.05} x={S / 2 - S * 0.27} height={S * 0.1} width={S * 0.54} rx={2} fill={travers} />)}
        {[-ofs, ofs].map((o) => yatay
          ? <line key={o} x1={0} x2={S} y1={S / 2 + o} y2={S / 2 + o} stroke={renk} strokeWidth={S * 0.06} />
          : <line key={o} y1={0} y2={S} x1={S / 2 + o} x2={S / 2 + o} stroke={renk} strokeWidth={S * 0.06} />)}
      </g>
    );
  }
  // kıvrım: iki yan arasındaki köşe merkezli çeyrek daire
  const kx = a === 'L' || b === 'L' ? 0 : S, ky = a === 'U' || b === 'U' ? 0 : S;
  const pa = yanNokta(a, S), pb = yanNokta(b, S);
  const traversler = [0.15, 0.5, 0.85].map((t) => {
    const aci0 = Math.atan2(pa[1] - ky, pa[0] - kx), aci1 = Math.atan2(pb[1] - ky, pb[0] - kx);
    let d = aci1 - aci0; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI;
    const ac = aci0 + d * t;
    const ic = S / 2 - S * 0.27, dis = S / 2 + S * 0.27;
    return <line key={t} x1={kx + Math.cos(ac) * ic} y1={ky + Math.sin(ac) * ic} x2={kx + Math.cos(ac) * dis} y2={ky + Math.sin(ac) * dis} stroke={travers} strokeWidth={S * 0.1} strokeLinecap="round" />;
  });
  return (
    <g>
      {traversler}
      {[S / 2 - ofs, S / 2 + ofs].map((rad) => <path key={rad} d={yayYolu(kx, ky, pa, pb, rad, S)} stroke={renk} strokeWidth={S * 0.06} fill="none" />)}
    </g>
  );
  function yayYolu(cx: number, cy: number, A: [number, number], B: [number, number], rad: number, s: number) {
    const p1 = [cx + (A[0] - cx) * (rad / (s / 2)), cy + (A[1] - cy) * (rad / (s / 2))];
    const p2 = [cx + (B[0] - cx) * (rad / (s / 2)), cy + (B[1] - cy) * (rad / (s / 2))];
    const cross = (A[0] - cx) * (B[1] - cy) - (A[1] - cy) * (B[0] - cx);
    return `M ${p1[0]} ${p1[1]} A ${rad} ${rad} 0 0 ${cross > 0 ? 1 : 0} ${p2[0]} ${p2[1]}`;
  }
};

const Lokomotif: React.FC<{ boy: number }> = ({ boy }) => (
  <svg width={boy} height={boy} viewBox="0 0 60 60" style={{ overflow: 'visible' }}>
    <rect x={6} y={22} width={36} height={20} rx={4} fill="#ef4444" />
    <rect x={30} y={10} width={18} height={32} rx={3} fill="#dc2626" />
    <rect x={34} y={14} width={10} height={9} rx={2} fill="#bfdbfe" />
    <rect x={10} y={12} width={7} height={11} rx={1.5} fill="#374151" />
    <rect x={2} y={38} width={50} height={5} rx={2} fill="#1f2937" />
    {[14, 28, 42].map((x) => <circle key={x} cx={x} cy={46} r={6} fill="#1f2937" stroke="#9ca3af" strokeWidth={2} />)}
    <circle cx={50} cy={34} r={3} fill="#fde047" />
  </svg>
);

const TrenYoluOyunu: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { seviye, basari, zorlandi } = useSeviye('trenyolu', SEVIYELER.length - 1);
  const [adim, setAdim] = useState(0);
  const [tur, setTur] = useState(0);
  const { yol, bosluklar } = useMemo(() => {
    const ayar = SEVIYELER[seviye];
    const y = yolUret(ayar.kivrim);
    const ic = y.map((_, i) => i).filter((i) => i > 0 && i < y.length - 1);
    // önce kıvrımlar boşluk olsun (asıl öğretilen), sonra rastgele
    const sirali = [...ic].sort((a, b) => Number(y[b].tip !== 'LR' && y[b].tip !== 'DU') - Number(y[a].tip !== 'LR' && y[a].tip !== 'DU') || Math.random() - 0.5);
    return { yol: y, bosluklar: new Set(sirali.slice(0, ayar.bosluk)) };
  }, [tur]); // eslint-disable-line react-hooks/exhaustive-deps
  // yol dışındaki karelere seyrek süs (boş çimen olmasın)
  const susler = useMemo(() => {
    const yolda = new Set(yol.map((h) => `${h.r},${h.c}`));
    const l: { r: number; c: number; e: string }[] = [];
    for (let r = 0; r < SAT; r++) for (let c = 0; c < SUT; c++) {
      if (!yolda.has(`${r},${c}`) && Math.random() < 0.38) l.push({ r, c, e: ['🌳', '🌲', '🌼', '🌷', '🐄', '🐑', '🌻', '🍄'][Math.floor(Math.random() * 8)] });
    }
    return l;
  }, [yol]);
  const [dolu, setDolu] = useState<Set<number>>(new Set());
  const tepsi = useMemo(() => [...bosluklar].sort(() => Math.random() - 0.5), [bosluklar]);
  const [surukle, setSurukle] = useState<{ i: number; x: number; y: number } | null>(null);
  const [secili, setSecili] = useState<number | null>(null);
  const [sallanan, setSallanan] = useState<number | null>(null);
  const [yanlis, setYanlis] = useState(0);
  const [gidiyor, setGidiyor] = useState(false);
  const [trenKonum, setTrenKonum] = useState<{ x: number; y: number; a: number } | null>(null);
  const [kutlama, setKutlama] = useState(false);
  const [bitti, setBitti] = useState(false);
  const alan = useRef<HTMLDivElement>(null);
  const tahta = useRef<HTMLDivElement>(null);
  const [alanBoy, setAlanBoy] = useState({ w: 360, h: 600 });

  useEffect(() => {
    const el = alan.current; if (!el) return;
    const ol = () => { const { width, height } = el.getBoundingClientRect(); setAlanBoy({ w: width, h: height }); };
    ol(); const ro = new ResizeObserver(ol); ro.observe(el); return () => ro.disconnect();
  }, []);
  const S = Math.floor(Math.min((alanBoy.w - 40) / (SUT + 1.2), (alanBoy.h - 180) / SAT, 84));
  const tw = S * SUT, th = S * SAT;

  useEffect(() => { setDolu(new Set()); setYanlis(0); setSecili(null); setGidiyor(false); setTrenKonum(null);
    speak(bosluklar.size === 1 ? 'Eksik rayı yerine koy.' : 'Eksik rayları yerine koy.'); }, [tur]); // eslint-disable-line react-hooks/exhaustive-deps

  // hepsi dolunca tren yola çıkar
  useEffect(() => {
    if (!bosluklar.size || dolu.size !== bosluklar.size || gidiyor) return;
    setGidiyor(true); playEffect('finish');
    const noktalar: { x: number; y: number }[] = [{ x: -S * 0.8, y: yol[0].r * S + S / 2 }];
    yol.forEach((h, i) => {
      const giris = (i === 0 ? 'L' : komsuYon(h.r, h.c, yol[i - 1].r, yol[i - 1].c)) as Yon;
      const cikis = (i === yol.length - 1 ? 'R' : komsuYon(h.r, h.c, yol[i + 1].r, yol[i + 1].c)) as Yon;
      const [ax, ay] = yanNokta(giris, S), [bx, by] = yanNokta(cikis, S);
      const kivrik = giris !== ters[cikis];
      for (let k = 1; k <= 8; k++) {
        const t = k / 8;
        if (!kivrik) noktalar.push({ x: h.c * S + ax + (bx - ax) * t, y: h.r * S + ay + (by - ay) * t });
        else {
          const kx = giris === 'L' || cikis === 'L' ? 0 : S, ky = giris === 'U' || cikis === 'U' ? 0 : S;
          const a0 = Math.atan2(ay - ky, ax - kx), a1 = Math.atan2(by - ky, bx - kx);
          let d = a1 - a0; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI;
          const ac = a0 + d * t;
          noktalar.push({ x: h.c * S + kx + Math.cos(ac) * S / 2, y: h.r * S + ky + Math.sin(ac) * S / 2 });
        }
      }
    });
    noktalar.push({ x: tw + S * 0.6, y: yol[yol.length - 1].r * S + S / 2 });
    let i = 0, raf = 0, once = performance.now();
    const adimla = (simdi: number) => {
      const ilerle = ((simdi - once) / 1000) * 14; once = simdi; i = Math.min(noktalar.length - 1, i + ilerle);
      const k = Math.floor(i), f = i - k, p = noktalar[k], q = noktalar[Math.min(k + 1, noktalar.length - 1)];
      setTrenKonum({ x: p.x + (q.x - p.x) * f, y: p.y + (q.y - p.y) * f, a: Math.atan2(q.y - p.y, q.x - p.x) });
      if (i < noktalar.length - 1) raf = requestAnimationFrame(adimla);
      else { setKutlama(true); speak('Aferin! Tren istasyona vardı.'); }
    };
    setTimeout(() => { speak('Çuf çuf!'); raf = requestAnimationFrame(adimla); }, 300);
    return () => cancelAnimationFrame(raf);
  }, [dolu.size]); // eslint-disable-line react-hooks/exhaustive-deps

  const koy = (parca: number, hucreI: number) => {
    // parça, aynı tipte herhangi bir boş yere oturur
    if (bosluklar.has(hucreI) && !dolu.has(hucreI) && yol[hucreI].tip === yol[parca].tip) {
      setDolu((d) => new Set(d).add(hucreI));
      kullanilan.current.add(parca);
      setSecili(null); playEffect('correct', { volume: 0.5 });
      return true;
    }
    setSallanan(parca); setTimeout(() => setSallanan(null), 700); setYanlis((n) => n + 1);
    return false;
  };
  const kullanilan = useRef(new Set<number>());
  useEffect(() => { kullanilan.current = new Set(); }, [tur]);

  const hucreAt = (x: number, y: number): number | null => {
    const b = tahta.current?.getBoundingClientRect(); if (!b) return null;
    const c = Math.floor((x - b.left) / S), r = Math.floor((y - b.top) / S);
    const i = yol.findIndex((h) => h.r === r && h.c === c);
    return i >= 0 ? i : null;
  };

  useEffect(() => {
    if (!surukle) return;
    const hareket = (e: PointerEvent) => setSurukle((s) => (s ? { ...s, x: e.clientX, y: e.clientY } : s));
    const birak = (e: PointerEvent) => { const h = hucreAt(e.clientX, e.clientY); const p = surukle.i; setSurukle(null); if (h !== null) koy(p, h); };
    window.addEventListener('pointermove', hareket); window.addEventListener('pointerup', birak, { once: true });
    return () => { window.removeEventListener('pointermove', hareket); window.removeEventListener('pointerup', birak); };
  }, [surukle?.i]); // eslint-disable-line react-hooks/exhaustive-deps

  const sonraki = () => {
    setKutlama(false);
    if (yanlis >= 3) zorlandi(); else basari();
    if (adim + 1 >= OTURUM) { setBitti(true); return; }
    setAdim((a) => a + 1); setTur((t) => t + 1);
  };
  const tekrar = () => { setAdim(0); setTur((t) => t + 1); setBitti(false); };

  const ipucuTip = yanlis >= 2 && (secili !== null || surukle) ? yol[secili ?? surukle!.i].tip : null;
  const kalanTepsi = tepsi.filter((p) => !kullanilan.current.has(p));
  const basY = yol[0].r * S + S / 2, sonY = yol[yol.length - 1].r * S + S / 2;

  return (
    <OyunCercevesi baslik="Tren Yolu" emoji="🚂" onBack={onBack} adim={adim + (bitti ? 1 : 0)} toplamAdim={OTURUM}
      yonerge={bosluklar.size === 1 ? 'Eksik rayı yerine koy.' : 'Eksik rayları yerine koy.'}>
      <div ref={alan} className="absolute inset-0 flex flex-col items-center gap-4 pt-4 select-none touch-none">
        <div className="relative shrink-0" style={{ width: tw + S * 1.2, height: th }}>
          {/* çimen zemin */}
          <div ref={tahta} className="absolute rounded-2xl bg-gradient-to-br from-lime-200 to-emerald-200 shadow-inner" style={{ left: S * 0.6, top: 0, width: tw, height: th }}>
            <svg width={tw} height={th} className="absolute inset-0 overflow-visible">
              {yol.map((h, i) => (
                <g key={i} transform={`translate(${h.c * S} ${h.r * S})`}>
                  {bosluklar.has(i) && !dolu.has(i)
                    ? <g>
                        <rect x={3} y={3} width={S - 6} height={S - 6} rx={10} fill={ipucuTip === h.tip ? '#fde68a' : 'rgba(255,255,255,.55)'} stroke="#f59e0b" strokeWidth={3} strokeDasharray="8 6" />
                        <Ray tip={h.tip} S={S} soluk />
                      </g>
                    : <Ray tip={h.tip} S={S} />}
                </g>
              ))}
            </svg>
            {susler.map((x, i) => <span key={i} className="absolute pointer-events-none" style={{ left: x.c * S + S * 0.18, top: x.r * S + S * 0.12, fontSize: S * 0.55 }}>{x.e}</span>)}
            {/* dokun-dokun için hücreler */}
            {[...bosluklar].map((i) => (
              <div key={i} data-bosluk={i} onClick={() => secili !== null && koy(secili, i)} className="absolute" style={{ left: yol[i].c * S, top: yol[i].r * S, width: S, height: S }} />
            ))}
          </div>
          {/* istasyon */}
          <div className="absolute text-4xl" style={{ left: tw + S * 0.6 - 4, top: sonY - S * 0.55 }}>🏠</div>
          {/* tren */}
          {!gidiyor && <div className="absolute" style={{ left: 0, top: basY - S * 0.45 }}><Lokomotif boy={S * 0.9} /></div>}
          {trenKonum && (
            <div className="absolute pointer-events-none" style={{ left: trenKonum.x + S * 0.6 - S * 0.45, top: trenKonum.y - S * 0.45, transform: `rotate(${trenKonum.a}rad)` }}>
              <Lokomotif boy={S * 0.9} />
            </div>
          )}
        </div>

        {/* tepsi: eksik parçalar */}
        <div className="flex gap-4 justify-center">
          {kalanTepsi.map((p) => (
            <div key={p} data-ray={p}
              onPointerDown={(e) => { e.preventDefault(); setSecili(p); setSurukle({ i: p, x: e.clientX, y: e.clientY }); }}
              className={`rounded-2xl bg-white shadow-lg ring-4 cursor-grab ${secili === p ? 'ring-sky-400' : 'ring-white'} ${sallanan === p ? 'ok-sallan' : ''} ${surukle?.i === p ? 'opacity-30' : ''}`}
              style={{ width: S * 1.4, height: S * 1.4, padding: S * 0.2 }}>
              <svg width={S} height={S}><Ray tip={yol[p].tip} S={S} /></svg>
            </div>
          ))}
        </div>
      </div>

      {surukle && (
        <div className="fixed z-50 pointer-events-none rounded-2xl bg-white/80 shadow-2xl" style={{ left: surukle.x - S / 2, top: surukle.y - S / 2, width: S, height: S }}>
          <svg width={S} height={S}><Ray tip={yol[surukle.i].tip} S={S} /></svg>
        </div>
      )}

      <Kutlama acik={kutlama} yazi="Aferin!" onBitti={sonraki} sure={2000} alt />
      {bitti && <OyunSonu onTekrar={tekrar} onBack={onBack} />}
    </OyunCercevesi>
  );
};

export default TrenYoluOyunu;
