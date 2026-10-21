import React, { useEffect, useMemo, useState } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';
import { communicationCategories } from '../../services/communicationData.ts';
import { imageData } from '../../services/database/imageData.ts';
import { nesneUrl } from '../../services/nesneGorsel.ts';
import { OBJECT_CATEGORIES } from '../../constants.ts';
import { kategoriOgeleri } from '../sozluk/KelimeKitabi.tsx';
import { ADIMLAR as TUVALET_ADIMLARI } from '../tuvalet/TuvaletEkrani.tsx';
import { ROUTINES } from '../games/DailyRoutineGameScreen.tsx';
import { RUTIN_GORSEL } from '../../services/database/activities/yeni/tekilGorseller.ts';
import { pdfAdiAyarla } from '../../services/sayac.ts';

// Kart Atölyesi (Kaan, 2026-10-21: "pdflere de bak, daha işlevsel olabilir mi").
// Otizmli çocukla çalışan aile/öğretmenin en çok kullandığı iki çıktı: kesip kullanılan resimli kartlar
// (iletişim/PECS ve kelime kartları) ve adım adım görsel program şeridi (tuvalet, sabah, yemek…).
// Sınırsız kart, sayfa başına 4/6/9/12, yazı ve kesme çizgisi açılıp kapanır; çok sayfa tek seferde yazdırılır.

interface Kart { anahtar: string; ad: string; url?: string | null; emoji?: string }
interface Grup { id: string; ad: string; kartlar: Kart[] }
type Kaynak = 'ifade' | 'kelime' | 'program';

const resim = new Map(imageData.map((i) => [i.id, i.imageUrl]));
const buyuk = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);

const TEMEL: Kart[] = [
  ['Ben', '🙋'], ['istiyorum', '🙏'], ['ver', '🤲'], ['Daha', '➕'], ['Bitti', '✅'], ['Yardım et', '🆘'], ['Evet', '👍'], ['Hayır', '👎'], ['Dur', '✋'],
].map(([ad, emoji]) => ({ anahtar: `temel-${ad}`, ad, emoji }));

const ifadeGruplari = (): Grup[] => {
  const g: Grup[] = [{ id: 'temel', ad: 'Temel kelimeler', kartlar: TEMEL }];
  for (const k of communicationCategories) {
    const altlar = k.subCategories?.length ? k.subCategories : [{ id: k.id, title: k.title, cards: k.cards || [] }];
    for (const a of altlar) {
      const kartlar = (a.cards || []).map((c) => ({ anahtar: `${a.id}-${c.id}`, ad: c.text, url: c.imageId ? nesneUrl(resim.get(c.imageId)) : null, emoji: c.emoji }))
        .filter((c) => c.url || c.emoji);
      if (kartlar.length) g.push({ id: `${k.id}-${a.id}`, ad: k.subCategories?.length ? `${k.title} · ${a.title}` : k.title, kartlar });
    }
  }
  return g;
};
const kelimeGruplari = (): Grup[] => OBJECT_CATEGORIES.filter((c) => !c.disabled)
  .map((c) => ({ id: c.id, ad: c.title, kartlar: kategoriOgeleri(c.id).map((o) => ({ anahtar: `${c.id}-${o.kelime}`, ad: buyuk(o.kelime), url: o.url })) }))
  .filter((g) => g.kartlar.length);
const programGruplari = (): Grup[] => [
  { id: 'tuvalet', ad: 'Tuvalet', kartlar: TUVALET_ADIMLARI.map((a, i) => ({ anahtar: `tv-${i}`, ad: a.yazi, url: a.url, emoji: a.ok })) },
  ...[...ROUTINES.kolay, ...ROUTINES.zor].map((r, n) => ({
    id: `rutin-${n}`, ad: r.title,
    kartlar: r.items.map((it, i) => ({ anahtar: `r${n}-${i}`, ad: it.text, url: RUTIN_GORSEL[it.gorsel] || null, emoji: it.emoji })),
  })),
];

const SAYFA_DUZEN: Record<number, string> = { 4: 'grid-cols-2', 6: 'grid-cols-2', 9: 'grid-cols-3', 12: 'grid-cols-3' };

const KartGorsel: React.FC<{ k: Kart; buyukEmoji?: boolean }> = ({ k, buyukEmoji }) => (
  k.url
    ? <img src={k.url} alt={k.ad} className="h-full w-full object-contain" draggable={false} />
    : <span className={buyukEmoji ? 'text-7xl' : 'text-3xl'}>{k.emoji}</span>
);

const KartAtolyesi: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [kaynak, setKaynak] = useState<Kaynak>('ifade');
  const gruplar = useMemo(() => (kaynak === 'ifade' ? ifadeGruplari() : kaynak === 'kelime' ? kelimeGruplari() : programGruplari()), [kaynak]);
  const [grupId, setGrupId] = useState<string>('');
  const grup = gruplar.find((g) => g.id === grupId) || gruplar[0];
  const [secili, setSecili] = useState<Set<string>>(new Set());
  const [adet, setAdet] = useState<4 | 6 | 9 | 12>(6);
  const [yazi, setYazi] = useState(true);
  const [kes, setKes] = useState(true);

  // Grup değişince hepsini seç
  useEffect(() => { setSecili(new Set(grup?.kartlar.map((k) => k.anahtar) || [])); }, [grup?.id, kaynak]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (grup) pdfAdiAyarla(`Kart Atölyesi · ${kaynak === 'program' ? 'Görsel program' : kaynak === 'ifade' ? 'İfade kartları' : 'Kelime kartları'} · ${grup.ad}`); }, [grup, kaynak]);

  const secilenler = (grup?.kartlar || []).filter((k) => secili.has(k.anahtar));
  const sayfalar: Kart[][] = [];
  if (kaynak !== 'program') for (let i = 0; i < secilenler.length; i += adet) sayfalar.push(secilenler.slice(i, i + adet));

  const Dugme: React.FC<{ aktif: boolean; onClick: () => void; children: React.ReactNode }> = ({ aktif, onClick, children }) => (
    <button onClick={onClick} className={`rounded-xl px-3 py-1.5 text-sm font-black ${aktif ? 'bg-indigo-600 text-white shadow' : 'bg-white text-slate-600 border border-slate-200'}`}>{children}</button>
  );

  return (
    <div className="flex h-full w-full flex-col bg-slate-100">
      <style>{`
        @page { size: A4; margin: 8mm; }
        @media print {
          body * { visibility: hidden !important; }
          .ka-yazdir, .ka-yazdir * { visibility: visible !important; }
          .ka-yazdir { position: absolute; left: 0; top: 0; width: 100%; }
          .ka-sayfa { box-shadow: none !important; margin: 0 !important; border: none !important; page-break-after: always; break-after: page; width: 194mm !important; height: 280mm !important; }
          .ka-sayfa:last-child { page-break-after: auto; break-after: auto; }
        }
      `}</style>

      {/* ayarlar (yazdırılmaz) */}
      <div className="shrink-0 space-y-2 bg-white px-3 pb-3 pt-3 shadow print:hidden">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100" aria-label="Geri"><ArrowLeftIcon className="h-6 w-6 text-slate-700" /></button>
          <h1 className="flex-1 text-lg font-black text-slate-800">🃏 Kart Atölyesi</h1>
          <button onClick={() => window.print()} disabled={!secilenler.length}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white shadow disabled:opacity-40">🖨️ Yazdır / PDF</button>
        </div>
        <div className="flex gap-1.5">
          <Dugme aktif={kaynak === 'ifade'} onClick={() => { setKaynak('ifade'); setGrupId(''); }}>💬 İletişim kartları</Dugme>
          <Dugme aktif={kaynak === 'kelime'} onClick={() => { setKaynak('kelime'); setGrupId(''); }}>🍎 Kelime kartları</Dugme>
          <Dugme aktif={kaynak === 'program'} onClick={() => { setKaynak('program'); setGrupId(''); }}>🗓️ Görsel program</Dugme>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {gruplar.map((g) => (
            <button key={g.id} onClick={() => setGrupId(g.id)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${g.id === grup?.id ? 'bg-amber-400 text-white' : 'bg-slate-100 text-slate-600'}`}>{g.ad}</button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-600">
          {kaynak !== 'program' && <>
            <span>Sayfada:</span>
            {([4, 6, 9, 12] as const).map((n) => <Dugme key={n} aktif={adet === n} onClick={() => setAdet(n)}>{n}</Dugme>)}
          </>}
          <Dugme aktif={yazi} onClick={() => setYazi(!yazi)}>Aa Yazı</Dugme>
          {kaynak !== 'program' && <Dugme aktif={kes} onClick={() => setKes(!kes)}>✂️ Kesme çizgisi</Dugme>}
          <span className="ml-auto">{secilenler.length}/{grup?.kartlar.length || 0} seçili</span>
          <button onClick={() => setSecili(new Set(secili.size ? [] : grup?.kartlar.map((k) => k.anahtar)))} className="rounded-lg bg-slate-100 px-2 py-1">{secili.size ? 'Hiçbiri' : 'Tümü'}</button>
        </div>
        {/* seçim şeridi */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {grup?.kartlar.map((k) => {
            const s = secili.has(k.anahtar);
            return (
              <button key={k.anahtar} onClick={() => { const y = new Set(secili); if (s) y.delete(k.anahtar); else y.add(k.anahtar); setSecili(y); }}
                className={`flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-lg border-2 bg-white p-0.5 ${s ? 'border-emerald-500' : 'border-slate-200 opacity-40'}`} title={k.ad}>
                <div className="flex h-10 w-full items-center justify-center overflow-hidden"><KartGorsel k={k} /></div>
                <span className="w-full truncate text-[9px] font-bold text-slate-600">{k.ad}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* önizleme = yazdırılacak sayfalar */}
      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <div className="ka-yazdir mx-auto flex max-w-[640px] flex-col gap-4">
          {kaynak !== 'program' && sayfalar.map((sayfa, si) => (
            <div key={si} className="ka-sayfa grid w-full gap-0 bg-white p-[3%] shadow-lg" style={{ aspectRatio: '210 / 297' }}>
              <div className={`grid h-full w-full ${SAYFA_DUZEN[adet]}`} style={{ gridTemplateRows: `repeat(${adet === 4 ? 2 : adet === 6 ? 3 : adet === 9 ? 3 : 4}, 1fr)` }}>
                {sayfa.map((k) => (
                  <div key={k.anahtar} className={`flex min-h-0 flex-col items-center justify-center p-[6%] ${kes ? 'border border-dashed border-slate-400' : ''}`}>
                    <div className="flex min-h-0 w-full flex-1 items-center justify-center"><KartGorsel k={k} buyukEmoji /></div>
                    {yazi && <div className={`mt-1 text-center font-black text-slate-900 ${adet >= 9 ? 'text-base' : 'text-2xl'}`}>{k.ad}</div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {kaynak === 'program' && secilenler.length > 0 && (
            <div className="ka-sayfa flex w-full flex-col bg-white p-[5%] shadow-lg" style={{ aspectRatio: '210 / 297' }}>
              <h2 className="mb-4 text-center text-3xl font-black text-slate-900">{grup?.ad}</h2>
              <div className="grid flex-1 grid-cols-3 content-start gap-x-3 gap-y-5">
                {secilenler.map((k, i) => (
                  <div key={k.anahtar} className="relative flex flex-col items-center rounded-2xl border-2 border-slate-300 p-2">
                    <span className="absolute -left-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-black text-white">{i + 1}</span>
                    <div className="flex aspect-square w-full items-center justify-center overflow-hidden"><KartGorsel k={k} buyukEmoji /></div>
                    {yazi && <div className="mt-1 text-center text-base font-black leading-tight text-slate-900">{k.ad}</div>}
                    <div className="mt-1 h-6 w-6 rounded-md border-2 border-slate-400" title="Yapınca işaretle" />
                    {i < secilenler.length - 1 && (i + 1) % 3 !== 0 && <span className="absolute -right-3 top-1/3 text-xl text-slate-400">➜</span>}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-slate-400">Her adımı yapınca kutuyu işaretleyin.</p>
            </div>
          )}
          {!secilenler.length && <p className="py-10 text-center text-sm font-bold text-slate-500">Yazdırmak için yukarıdan kart seçin.</p>}
        </div>
      </div>
    </div>
  );
};

export default KartAtolyesi;
