import React, { useMemo, useRef, useState } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import soundImitationImages from '../services/database/soundImitationImages.ts';
import SoundImitationLightbox from './SoundImitationLightbox.tsx';
import { speak } from '../services/speechService.ts';
import { nesneUrl } from '../services/nesneGorsel.ts';
import { SES_TAKLIT_SARKILARI } from '../data/sesTaklitSarkilar.ts';

// Ses Taklit (2026-10): Kartlar + Şarkılar tek ekranda. Videolar kaldırıldı (yedek/seskart; Kaan: "daha iyi teknolojiyle baştan yaparız").
// Karta dokununca sesi söylenir (çocuk için doğal olan bu); 🔍 ile büyük görünüm açılır.

const GRUPLAR: Array<{ id: string; ad: string; kategoriler: string[] }> = [
  { id: 'hepsi', ad: '🎵 Hepsi', kategoriler: [] },
  { id: 'hayvan', ad: '🐶 Hayvanlar', kategoriler: ['Hayvan Sesleri'] },
  { id: 'insan', ad: '🙂 İnsan', kategoriler: ['İnsan Sesleri', 'Sosyal', 'Duyular'] },
  { id: 'arac', ad: '🚗 Araçlar', kategoriler: ['Araç Sesleri'] },
  { id: 'ev', ad: '🏠 Ev', kategoriler: ['Ev Aletleri', 'Ev Sesleri', 'Günlük Yaşam'] },
  { id: 'dis', ad: '🌳 Dışarıda', kategoriler: ['Doğa Sesleri', 'Dış Sesler', 'Hareket', 'Oyun', 'Müzik Aletleri'] },
];

const sesEtiketi = (it: (typeof soundImitationImages)[number]) => {
  const k = it.audioKeys as Record<string, string>;
  return k.label_tr || k.default || it.word;
};

const SesTaklitEkrani: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [sekme, setSekme] = useState<'kart' | 'sarki'>('kart');
  const [grup, setGrup] = useState('hepsi');
  const [calan, setCalan] = useState<number | null>(null);
  const [buyuk, setBuyuk] = useState<number | null>(null);
  const [sarkiCalan, setSarkiCalan] = useState<string | null>(null);
  const [surum, setSurum] = useState<Record<string, number>>({});
  const sesRef = useRef<HTMLAudioElement | null>(null);

  const kartlar = useMemo(() => {
    const g = GRUPLAR.find((x) => x.id === grup)!;
    return g.kategoriler.length ? soundImitationImages.filter((it) => g.kategoriler.includes(String(it.tags?.category))) : soundImitationImages;
  }, [grup]);

  const sesle = async (i: number) => {
    const it = kartlar[i];
    setCalan(it.id);
    try { await speak(sesEtiketi(it)); } finally { setCalan((c) => (c === it.id ? null : c)); }
  };

  const sarkiCal = (id: string, dosya: string) => {
    if (sesRef.current) { sesRef.current.pause(); sesRef.current = null; }
    if (sarkiCalan === id) { setSarkiCalan(null); return; }
    const a = new Audio(dosya);
    a.onended = () => setSarkiCalan(null);
    void a.play();
    sesRef.current = a;
    setSarkiCalan(id);
  };
  React.useEffect(() => () => { sesRef.current?.pause(); }, []);

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto px-3 pt-3 animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <button onClick={onBack} className="p-2 rounded-full bg-white/80 shadow active:scale-95" aria-label="Geri">
          <ArrowLeftIcon className="w-6 h-6 text-sky-700" />
        </button>
        <h1 className="flex-1 text-xl font-black text-sky-900">Ses Taklit</h1>
        <div className="flex rounded-full bg-white/80 shadow p-1">
          {([['kart', '🃏 Kartlar'], ['sarki', '🎶 Şarkılar']] as const).map(([id, ad]) => (
            <button key={id} onClick={() => setSekme(id)} className={`px-3 py-1.5 rounded-full text-xs font-black ${sekme === id ? 'bg-sky-600 text-white' : 'text-sky-900'}`}>{ad}</button>
          ))}
        </div>
      </div>

      {sekme === 'kart' ? (
        <>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {GRUPLAR.map((g) => (
              <button key={g.id} onClick={() => setGrup(g.id)}
                className={`flex-shrink-0 px-3 py-2 rounded-full text-sm font-black whitespace-nowrap shadow-sm active:scale-95 ${grup === g.id ? 'bg-amber-400 text-amber-950' : 'bg-white/90 text-slate-700'}`}>
                {g.ad}
              </button>
            ))}
          </div>
          <p className="text-center text-xs font-semibold text-slate-500 mb-2">Karta dokun, sesi dinle ve taklit et.</p>
          <div className="flex-1 overflow-y-auto pb-24">
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 landscape:grid-cols-5">
              {kartlar.map((it, i) => (
                <div key={it.id} className="relative">
                  <button onClick={() => sesle(i)}
                    className={`w-full flex flex-col items-center rounded-3xl bg-white shadow-md border-4 p-2 transition active:scale-95 ${calan === it.id ? 'border-amber-400 scale-[1.03]' : 'border-white'}`}>
                    <img src={nesneUrl(it.imageUrl)} alt={it.word} className="w-full aspect-square object-cover rounded-2xl" draggable={false} />
                    <span className="mt-2 text-xl font-black text-sky-900 leading-tight">{sesEtiketi(it)}</span>
                    <span className="text-xs font-semibold text-slate-500">{it.word}</span>
                  </button>
                  <button onClick={() => setBuyuk(i)} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-base active:scale-95" aria-label="Büyük göster">🔍</button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-y-auto pb-24 space-y-4">
          {SES_TAKLIT_SARKILARI.map((s) => {
            const sec = surum[s.id] || 0;
            const caliyor = sarkiCalan === s.id;
            return (
              <div key={s.id} className="rounded-3xl bg-white/90 shadow-md p-4">
                <div className="flex items-center gap-3">
                  <button onClick={() => sarkiCal(s.id, s.dosyalar[sec])}
                    className={`w-16 h-16 rounded-full text-3xl shadow-md active:scale-95 ${caliyor ? 'bg-rose-500 text-white' : 'bg-green-500 text-white'}`} aria-label={caliyor ? 'Durdur' : 'Çal'}>
                    {caliyor ? '⏸' : '▶'}
                  </button>
                  <div className="flex-1">
                    <div className="text-lg font-black text-sky-900">{s.ad}</div>
                    {s.dosyalar.length > 1 && (
                      <div className="flex gap-1 mt-1">
                        {s.dosyalar.map((_, k) => (
                          <button key={k} onClick={() => { if (caliyor) sarkiCal(s.id, s.dosyalar[sec]); setSurum((v) => ({ ...v, [s.id]: k })); }}
                            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${sec === k ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{k + 1}. sürüm</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <details className="mt-3">
                  <summary className="text-sm font-bold text-sky-700 cursor-pointer">Şarkı sözleri</summary>
                  <pre className="mt-2 whitespace-pre-wrap font-sans text-sm text-slate-700 leading-relaxed">{s.sozler.replace(/\[[^\]]+\]\n?/g, '')}</pre>
                </details>
              </div>
            );
          })}
        </div>
      )}

      {buyuk !== null && <SoundImitationLightbox items={kartlar} startIndex={buyuk} onClose={() => setBuyuk(null)} />}
    </div>
  );
};

export default React.memo(SesTaklitEkrani);
