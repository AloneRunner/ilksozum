import React, { useEffect, useMemo, useState } from 'react';
import { OyunCercevesi, Kutlama, OyunSonu, useSeviye } from '../oyunKiti/OyunKiti.tsx';
import { imageData } from '../../services/database/imageData.ts';
import { GOLGE_KESIMLERI } from '../../data/golgeListesi.ts';
import { speak } from '../../services/speechService.ts';

// Boyut Sıralama (yeniden, Kaan 2026-10-08): aynı nesnenin farklı boyları karışık; çocuk sırayla en küçüğe
// (ya da en büyüğe) dokunur, nesne alttaki sıraya dizilir. Yanlışta yalnız sallanır. Menü yok:
// 3 küçükten büyüğe → 4 → 4 büyükten küçüğe → 5.
const SEVIYELER = [{ n: 3, ters: false }, { n: 4, ters: false }, { n: 4, ters: true }, { n: 5, ters: false }, { n: 5, ters: true }];
const OTURUM = 4;
const NESNELER = [...GOLGE_KESIMLERI].map((id) => {
  const i = imageData.find((x) => x.id === id);
  return i ? { kelime: i.word, url: `/images/golge/${id}.webp` } : null;
}).filter((x): x is { kelime: string; url: string } => !!x);
const karistir = <T,>(a: T[]): T[] => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

const BoyutSiralaOyunu: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { seviye, basari, zorlandi } = useSeviye('boyutsirala', SEVIYELER.length - 1);
  const [adim, setAdim] = useState(0);
  const [tur, setTur] = useState(0);
  const ayar = SEVIYELER[seviye];
  const soru = useMemo(() => {
    const nesne = NESNELER[Math.floor(Math.random() * NESNELER.length)];
    const boylar = Array.from({ length: ayar.n }, (_, i) => 0.4 + (0.6 * i) / (ayar.n - 1)); // 0.4 … 1.0
    return { nesne, karisik: karistir(boylar.map((b, i) => ({ i, b }))) };
  }, [tur]); // eslint-disable-line react-hooks/exhaustive-deps
  const [dizilen, setDizilen] = useState<number[]>([]);
  const [sallanan, setSallanan] = useState<number | null>(null);
  const [yanlis, setYanlis] = useState(0);
  const [kutlama, setKutlama] = useState(false);
  const [bitti, setBitti] = useState(false);
  const sira = ayar.ters ? [...Array(ayar.n).keys()].reverse() : [...Array(ayar.n).keys()];
  const beklenen = sira[dizilen.length];
  const yonerge = ayar.ters ? 'Büyükten küçüğe diz. Önce en büyüğü seç.' : 'Küçükten büyüğe diz. Önce en küçüğü seç.';

  useEffect(() => { setDizilen([]); setYanlis(0); speak(yonerge); }, [tur]); // eslint-disable-line react-hooks/exhaustive-deps

  const sec = (i: number) => {
    if (dizilen.includes(i)) return;
    if (i === beklenen) {
      const y = [...dizilen, i]; setDizilen(y);
      if (y.length === ayar.n) setTimeout(() => { setKutlama(true); speak(ayar.ters ? 'Aferin! Büyükten küçüğe dizdin.' : 'Aferin! Küçükten büyüğe dizdin.'); }, 400);
    } else { setSallanan(i); setTimeout(() => setSallanan(null), 700); setYanlis((n) => n + 1); }
  };
  const sonraki = () => {
    setKutlama(false);
    if (yanlis >= 3) zorlandi(); else basari();
    if (adim + 1 >= OTURUM) { setBitti(true); return; }
    setAdim((a) => a + 1); setTur((t) => t + 1);
  };
  const tekrar = () => { setAdim(0); setTur((t) => t + 1); setBitti(false); };
  const temel = ayar.n <= 3 ? 34 : ayar.n === 4 ? 28 : 24;
  const boy = (b: number) => `min(${Math.round(b * temel)}vw, ${Math.round(b * temel * 0.55)}vh)`;
  const rafBoy = (b: number) => `min(${Math.round(b * temel * 0.75)}vw, ${Math.round(b * temel * 0.4)}vh)`;

  return (
    <OyunCercevesi baslik="Boyut Sıralama" emoji="📏" onBack={onBack} adim={adim + (bitti ? 1 : 0)} toplamAdim={OTURUM} yonerge={yonerge}>
      <div className="absolute inset-0 flex flex-col px-3 pb-4 gap-3">
        {/* karışık nesneler */}
        <div className="flex-1 flex flex-wrap items-end justify-center content-center gap-x-4 gap-y-6 rounded-3xl bg-gradient-to-b from-sky-50 to-amber-50 shadow-inner p-3">
          {soru.karisik.map(({ i, b }) => (
            <button key={i} data-boy={i} onClick={() => sec(i)}
              className={`transition-all duration-500 ${dizilen.includes(i) ? 'opacity-0 scale-50 pointer-events-none' : 'active:scale-95'} ${sallanan === i ? 'ok-sallan' : ''} ${yanlis >= 2 && i === beklenen ? 'animate-pulse' : ''}`}
              style={{ width: boy(b), height: boy(b) }}>
              <img src={soru.nesne.url} alt={soru.nesne.kelime} draggable={false} className="w-full h-full object-contain drop-shadow-lg" />
            </button>
          ))}
        </div>
        {/* sıra rafı */}
        <div className="flex items-end justify-center gap-2 rounded-3xl bg-amber-200/70 ring-4 ring-amber-300 px-3 pt-3 pb-2 min-h-[24vh]">
          {sira.map((i, k) => (
            <div key={k} className="flex flex-col items-center justify-end" style={{ width: rafBoy(soru.karisik.find((x) => x.i === i)!.b) }}>
              {dizilen.includes(i)
                ? <img src={soru.nesne.url} alt="" className="w-full object-contain drop-shadow" style={{ height: rafBoy(soru.karisik.find((x) => x.i === i)!.b), animation: 'ok-yildiz .4s ease-out' }} />
                : <div className="w-full rounded-xl border-4 border-dashed border-amber-400/70" style={{ height: rafBoy(soru.karisik.find((x) => x.i === i)!.b) }} />}
            </div>
          ))}
        </div>
      </div>
      <Kutlama acik={kutlama} yazi="Sıraladın!" onBitti={sonraki} sure={1900} />
      {bitti && <OyunSonu onTekrar={tekrar} onBack={onBack} />}
    </OyunCercevesi>
  );
};

export default BoyutSiralaOyunu;
