import React, { useEffect, useMemo, useRef, useState } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';
import KonusanAgiz from '../agiz/KonusanAgiz.tsx';
import { OBJECT_CATEGORIES } from '../../constants.ts';
import { imageData } from '../../services/database/imageData.ts';
import { nesneUrl } from '../../services/nesneGorsel.ts';
import { kayittanSoyle, cancelSpeech } from '../../services/speechService.ts';

// Kelime Kitabı (Kaan, 2026-10-21): "tüm kelimeler soru sormadan, kategori kategori; bebekler dokunarak ne olduğunu öğrensin;
// konuşan kızımız tıklayınca söylesin". Soru, puan, süre yok. Resme dokun → büyük gösterilir, Gökçe adını söyler (ağız senkron).
// "Hepsini dinle" kategorideki kelimeleri sırayla gösterip söyler.

const normal = (s?: string) => (s || '').toString().toLocaleLowerCase('tr-TR').trim()
  .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
  .replace(/\s*&\s*|\s+\/\s+|\s+/g, '_').replace(/_+/g, '_').replace(/̇/g, '');
const buyuk = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);

interface Oge { kelime: string; url: string }

// Kategori → tekil kelimeler (yalnız yeni fotoğraflar: .webp)
const kategoriOgeleri = (id: string): Oge[] => {
  const gorulen = new Set<string>(); const l: Oge[] = [];
  for (const i of imageData) {
    if (normal(i.tags?.category) !== id) continue;
    const k = String(i.word || '').toLocaleLowerCase('tr-TR').trim();
    if (!k || gorulen.has(k)) continue;
    const url = nesneUrl(i.imageUrl);
    if (!url || !url.endsWith('.webp')) continue;
    gorulen.add(k); l.push({ kelime: k, url });
  }
  return l;
};

const KelimeKitabi: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const kategoriler = useMemo(() => OBJECT_CATEGORIES.filter((c) => !c.disabled)
    .map((c) => ({ ...c, ogeler: kategoriOgeleri(c.id) })).filter((c) => c.ogeler.length > 0), []);
  const [katId, setKatId] = useState(() => { try { return localStorage.getItem('kelimeKitabi_kat') || kategoriler[0]?.id; } catch { return kategoriler[0]?.id; } });
  const kat = kategoriler.find((c) => c.id === katId) || kategoriler[0];
  const [secili, setSecili] = useState(0);
  const [yaziAcik, setYaziAcik] = useState(true);
  const [oto, setOto] = useState(false);
  const izgaraRef = useRef<HTMLDivElement>(null);
  const oge = kat?.ogeler[Math.min(secili, (kat?.ogeler.length || 1) - 1)];

  const soyle = (o?: Oge) => { if (o) kayittanSoyle(buyuk(o.kelime)).catch(() => { /* yok say */ }); };
  const sec = (i: number) => { setSecili(i); soyle(kat?.ogeler[i]); };

  useEffect(() => { try { localStorage.setItem('kelimeKitabi_kat', katId || ''); } catch { /* yok say */ } setSecili(0); setOto(false); izgaraRef.current?.scrollTo({ top: 0 }); }, [katId]);
  useEffect(() => () => { cancelSpeech().catch(() => { /* yok say */ }); }, []);

  // "Hepsini dinle": her 2,6 sn'de bir sonraki kelime
  useEffect(() => {
    if (!oto || !kat) return;
    soyle(kat.ogeler[secili]);
    const z = setTimeout(() => {
      if (secili + 1 >= kat.ogeler.length) { setOto(false); return; }
      setSecili((s) => s + 1);
    }, 2600);
    return () => clearTimeout(z);
  }, [oto, secili]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!kat || !oge) return null;
  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-amber-50 via-white to-sky-50">
      {/* başlık */}
      <header className="flex shrink-0 items-center gap-2 px-3 pt-3 pb-1">
        <button onClick={onBack} className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md active:scale-95" aria-label="Geri dön">
          <ArrowLeftIcon className="h-7 w-7 text-slate-700" />
        </button>
        <h1 className="flex-1 truncate text-xl font-black text-slate-800">📖 Kelime Kitabı</h1>
        <button onClick={() => setYaziAcik((v) => !v)} className={`h-10 rounded-full px-3 text-sm font-black shadow ${yaziAcik ? 'bg-white text-slate-700' : 'bg-slate-200 text-slate-500'}`} aria-label="Yazıyı aç/kapat">
          {yaziAcik ? 'Aa' : 'Aa̸'}
        </button>
        <button onClick={() => setOto((v) => !v)} className={`h-10 rounded-full px-3 text-sm font-black shadow ${oto ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-700'}`}>
          {oto ? '⏸ Dur' : '▶ Hepsi'}
        </button>
      </header>

      {/* kategoriler */}
      <div className="shrink-0 overflow-x-auto px-2 pb-2">
        <div className="flex w-max gap-2">
          {kategoriler.map((c) => (
            <button key={c.id} onClick={() => setKatId(c.id)}
              className={`flex items-center gap-1.5 rounded-2xl px-2.5 py-1.5 text-sm font-black shadow-sm transition ${c.id === kat.id ? 'bg-amber-400 text-white' : 'bg-white text-slate-600'}`}>
              <img src={nesneUrl(`/images/${c.imageId}.png`)} alt="" className="h-7 w-7 object-contain" draggable={false} />
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* sahne: büyük resim + konuşan yüz */}
      <div className="flex shrink-0 items-center justify-center gap-3 px-3 py-2">
        <button onClick={() => soyle(oge)} key={`${kat.id}-${secili}`}
          className="flex aspect-square w-[46%] max-w-[260px] items-center justify-center rounded-[2rem] bg-white p-3 shadow-xl active:scale-95"
          style={{ animation: 'kk-gel .35s ease-out both' }} aria-label={oge.kelime}>
          <img src={oge.url} alt={oge.kelime} className="h-full w-full object-contain" draggable={false} />
        </button>
        <div className="flex flex-col items-center gap-1">
          <button onClick={() => soyle(oge)} aria-label="Tekrar söyle"><KonusanAgiz className="h-28 w-28 drop-shadow" /></button>
          {yaziAcik && <span className="max-w-[9rem] text-center text-2xl font-black leading-tight text-slate-800">{buyuk(oge.kelime)}</span>}
        </div>
      </div>

      {/* ızgara */}
      <div ref={izgaraRef} className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-2.5 sm:grid-cols-4 landscape:grid-cols-6">
          {kat.ogeler.map((o, i) => (
            <button key={o.kelime} onClick={() => { setOto(false); sec(i); }}
              className={`flex aspect-square items-center justify-center rounded-2xl bg-white p-1.5 shadow transition active:scale-95 ${i === secili ? 'ring-4 ring-amber-400' : ''}`}
              aria-label={o.kelime}>
              <img src={o.url} alt={o.kelime} loading="lazy" className="h-full w-full object-contain" draggable={false} />
            </button>
          ))}
        </div>
      </div>
      <style>{`@keyframes kk-gel { 0% { transform: scale(.85); opacity: .3 } 100% { transform: scale(1); opacity: 1 } }`}</style>
    </div>
  );
};

export default KelimeKitabi;
