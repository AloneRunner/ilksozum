import React, { useEffect, useMemo, useState } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';
import SaatYuzu from '../saat/SaatYuzu.tsx';
import { Saat, soyle, dijital } from '../saat/saatDil.ts';
import { pdfAdiAyarla } from '../../services/sayac.ts';

// Saat çalışma kâğıdı (Kaan, 2026-10-29: "saat etkinliğinin pdf desteği var mı").
// Üç tür: saatin kaç olduğunu yaz, verilen saatin ibrelerini çiz, saatle yazısını çizgiyle eşleştir.
// Saat yüzü uygulamadakiyle aynı (SaatYuzu): kırmızı kısa akrep, mavi uzun yelkovan.

type Tur = 'yaz' | 'ciz' | 'eslestir';
type Duzey = 'tam' | 'bucuk' | 'ceyrek' | 'karisik' | 'bes';

const DUZEYLER: { id: Duzey; ad: string; dakikalar: number[] }[] = [
  { id: 'tam', ad: 'Tam', dakikalar: [0] },
  { id: 'bucuk', ad: 'Buçuk', dakikalar: [30] },
  { id: 'ceyrek', ad: 'Çeyrek', dakikalar: [15, 45] },
  { id: 'karisik', ad: 'Karışık', dakikalar: [0, 30, 15, 45] },
  { id: 'bes', ad: '5 dakika', dakikalar: Array.from({ length: 12 }, (_, i) => i * 5) },
];
const TURLER: { id: Tur; ad: string; baslik: string; yonerge: string }[] = [
  { id: 'yaz', ad: '✏️ Saat kaç?', baslik: 'Saat Kaç?', yonerge: 'Saatlere bak, kaç olduğunu yaz.' },
  { id: 'ciz', ad: '🕒 İbreleri çiz', baslik: 'İbreleri Çiz', yonerge: 'Yazan saati göster: kısa akrebi ve uzun yelkovanı çiz.' },
  { id: 'eslestir', ad: '🔗 Eşleştir', baslik: 'Saatleri Eşleştir', yonerge: 'Her saati doğru yazıyla çizgiyle birleştir.' },
];
const DUZEN: Record<number, { sutun: number; satir: number }> = { 6: { sutun: 2, satir: 3 }, 9: { sutun: 3, satir: 3 }, 12: { sutun: 3, satir: 4 } };
const ESLESTIR_ADET = 5;

const karistir = <T,>(a: T[]): T[] => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const buyuk = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);

/** Sayfa başına tekrarsız saatler (havuz bitince yeniden karışır: tam saatte 12'den fazlası istenebilir) */
const saatleriSec = (duzey: Duzey, toplam: number): Saat[] => {
  const dk = DUZEYLER.find((d) => d.id === duzey)!.dakikalar;
  const havuz: Saat[] = [];
  for (let h = 1; h <= 12; h++) for (const m of dk) havuz.push({ h, m });
  const sonuc: Saat[] = [];
  while (sonuc.length < toplam) sonuc.push(...karistir(havuz));
  return sonuc.slice(0, toplam);
};

const Dugme: React.FC<{ aktif: boolean; onClick: () => void; children: React.ReactNode }> = ({ aktif, onClick, children }) => (
  <button onClick={onClick} className={`rounded-xl px-3 py-1.5 text-sm font-black ${aktif ? 'bg-indigo-600 text-white shadow' : 'bg-white text-slate-600 border border-slate-200'}`}>{children}</button>
);

const SaatKagidi: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [tur, setTur] = useState<Tur>('yaz');
  const [duzey, setDuzey] = useState<Duzey>('tam');
  const [adet, setAdet] = useState<6 | 9 | 12>(6);
  const [sayfaSayisi, setSayfaSayisi] = useState(1);
  const [cevap, setCevap] = useState(false);
  const [tohum, setTohum] = useState(0);

  const tanim = TURLER.find((t) => t.id === tur)!;
  const sayfaBasi = tur === 'eslestir' ? ESLESTIR_ADET : adet;
  // Eşleştirmede sağ sütun karışık sırada; sol sütunla aynı sırada kalırsa düz çizgiler cevabı verir
  const sayfalar = useMemo(() => {
    const saatler = saatleriSec(duzey, sayfaBasi * sayfaSayisi);
    return Array.from({ length: sayfaSayisi }, (_, i) => {
      const s = saatler.slice(i * sayfaBasi, (i + 1) * sayfaBasi);
      let sag = karistir(s);
      for (let k = 0; k < 10 && sag.some((x, j) => x === s[j]); k++) sag = karistir(s);
      return { saatler: s, sag };
    });
  }, [duzey, sayfaBasi, sayfaSayisi, tohum]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { pdfAdiAyarla(`Saat çalışma kâğıdı · ${tanim.baslik} · ${DUZEYLER.find((d) => d.id === duzey)!.ad}`); }, [tanim, duzey]);

  const d = DUZEN[adet];
  const kucuk = adet >= 9;

  return (
    <div className="flex h-full w-full flex-col bg-slate-100">
      <style>{`
        @page { size: A4; margin: 8mm; }
        @media print {
          body * { visibility: hidden !important; }
          .sk-yazdir, .sk-yazdir * { visibility: visible !important; }
          .sk-yazdir { position: absolute; left: 0; top: 0; width: 100%; }
          .sk-sayfa { box-shadow: none !important; margin: 0 !important; page-break-after: always; break-after: page; width: 194mm !important; height: 280mm !important; }
          .sk-sayfa:last-child { page-break-after: auto; break-after: auto; }
        }
      `}</style>

      {/* ayarlar (yazdırılmaz) */}
      <div className="shrink-0 space-y-2 bg-white px-3 pb-3 pt-3 shadow print:hidden">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100" aria-label="Geri"><ArrowLeftIcon className="h-6 w-6 text-slate-700" /></button>
          <h1 className="flex-1 text-lg font-black text-slate-800">🕒 Saat Kâğıtları</h1>
          <button onClick={() => window.print()} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white shadow">🖨️ Yazdır / PDF</button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {TURLER.map((t) => <Dugme key={t.id} aktif={tur === t.id} onClick={() => setTur(t.id)}>{t.ad}</Dugme>)}
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-600">
          {DUZEYLER.map((x) => (
            <button key={x.id} onClick={() => setDuzey(x.id)}
              className={`rounded-full px-3 py-1 text-xs font-bold ${duzey === x.id ? 'bg-amber-400 text-white' : 'bg-slate-100 text-slate-600'}`}>{x.ad}</button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-600">
          {tur !== 'eslestir' && <>
            <span>Sayfada:</span>
            {([6, 9, 12] as const).map((n) => <Dugme key={n} aktif={adet === n} onClick={() => setAdet(n)}>{n}</Dugme>)}
          </>}
          <span className="ml-1">Sayfa:</span>
          {[1, 2, 3].map((n) => <Dugme key={n} aktif={sayfaSayisi === n} onClick={() => setSayfaSayisi(n)}>{n}</Dugme>)}
          <Dugme aktif={cevap} onClick={() => setCevap(!cevap)}>✓ Cevaplar</Dugme>
          <button onClick={() => setTohum(tohum + 1)} className="rounded-lg bg-slate-100 px-2 py-1.5">🔀 Yeni saatler</button>
        </div>
      </div>

      {/* önizleme = yazdırılacak sayfalar */}
      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <div className="sk-yazdir mx-auto flex max-w-[640px] flex-col gap-4">
          {sayfalar.map((sayfa, si) => (
            <div key={si} className="sk-sayfa flex min-h-0 w-full flex-col overflow-hidden bg-white p-[5%] shadow-lg" style={{ aspectRatio: '210 / 297' }}>
              <div className="mb-[3%] flex items-start justify-between border-b-2 border-slate-300 pb-2">
                <div>
                  <div className="text-xl font-black text-slate-800">{tanim.baslik}</div>
                  <div className="text-xs font-semibold text-slate-500">{tanim.yonerge}</div>
                </div>
                <div className="flex flex-col gap-1.5 text-right text-[10px] font-semibold text-slate-500">
                  <div>Adı: <span className="inline-block w-32 border-b border-dashed border-slate-400" /></div>
                  <div>Tarih: <span className="inline-block w-20 border-b border-dashed border-slate-400" /></div>
                </div>
              </div>

              {tur !== 'eslestir' && (
                <div className="grid min-h-0 flex-1 gap-[3%]" style={{ gridTemplateColumns: `repeat(${d.sutun}, 1fr)`, gridTemplateRows: `repeat(${d.satir}, 1fr)` }}>
                  {sayfa.saatler.map((s, i) => (
                    <div key={i} className="flex min-h-0 flex-col items-center justify-center">
                      <SaatYuzu saat={s} ibresiz={tur === 'ciz' && !cevap} className="min-h-0 w-full flex-1" />
                      {tur === 'yaz' ? (
                        <div className={`mt-1 flex w-full items-end justify-center gap-1 font-black text-slate-800 ${kucuk ? 'text-base' : 'text-xl'}`}>
                          <span>Saat</span>
                          <span className="inline-block min-w-0 max-w-[9rem] flex-1 truncate border-b-2 border-slate-500 text-center text-slate-400">{cevap ? soyle(s) : ' '}</span>
                        </div>
                      ) : (
                        <div className="mt-1 text-center leading-tight">
                          <div className={`font-black text-slate-900 ${kucuk ? 'text-sm' : 'text-lg'}`}>Saat {soyle(s)}</div>
                          <div className={`font-bold text-slate-500 ${kucuk ? 'text-xs' : 'text-sm'}`}>{dijital(s)}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {tur === 'eslestir' && (
                <div className="relative grid min-h-0 flex-1" style={{ gridTemplateRows: `repeat(${ESLESTIR_ADET}, 1fr)` }}>
                  {cevap && (
                    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {sayfa.saatler.map((s, i) => {
                        const j = sayfa.sag.indexOf(s), y = (k: number) => (k + 0.5) * 100 / ESLESTIR_ADET;
                        return <line key={i} x1={36} y1={y(i)} x2={60} y2={y(j)} stroke="#64748b" strokeWidth={1.5} vectorEffect="non-scaling-stroke" strokeDasharray="4 3" />;
                      })}
                    </svg>
                  )}
                  {sayfa.saatler.map((s, i) => {
                    const sag = sayfa.sag[i];
                    return (
                      <div key={i} className="flex min-h-0 items-center">
                        <div className="flex h-full w-[36%] items-center justify-end gap-2 py-[2%]">
                          <SaatYuzu saat={s} className="h-full min-h-0" />
                          <span className="h-3 w-3 shrink-0 rounded-full bg-slate-800" />
                        </div>
                        <div className="flex-1" />
                        <div className="flex w-[40%] items-center gap-2">
                          <span className="h-3 w-3 shrink-0 rounded-full bg-slate-800" />
                          <div className="leading-tight">
                            <div className="text-xl font-black text-slate-900">{buyuk(soyle(sag))}</div>
                            <div className="text-sm font-bold text-slate-500">{dijital(sag)}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-[2%] flex justify-between border-t border-slate-200 pt-1 text-[8px] text-slate-400">
                <span>İlk Sözüm · ilksozum.ozarik.org</span>
                <span>Kırmızı kısa ibre: akrep (saat) · Mavi uzun ibre: yelkovan (dakika)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SaatKagidi;
