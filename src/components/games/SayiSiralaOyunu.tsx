import React, { useEffect, useMemo, useState } from 'react';
import { OyunCercevesi, Kutlama, OyunSonu, useSeviye } from '../oyunKiti/OyunKiti.tsx';
import { speak, playEffect } from '../../services/speechService.ts';

// Sayı Sırala (yeniden, Kaan 2026-10-08): karışık sayı balonları; sırayla dokun, her sayı trenin vagonuna biner.
// Menü yok: 1-3 → 1-5 → 1-7 → 1-10 → geriye (5'ten 1'e).
const SEVIYELER = [{ n: 3, geri: false }, { n: 5, geri: false }, { n: 7, geri: false }, { n: 10, geri: false }, { n: 5, geri: true }];
const OTURUM = 4;
const SAYI = ['sıfır', 'Bir', 'İki', 'Üç', 'Dört', 'Beş', 'Altı', 'Yedi', 'Sekiz', 'Dokuz', 'On'];
const RENK = ['bg-rose-400', 'bg-amber-400', 'bg-emerald-400', 'bg-sky-400', 'bg-violet-400', 'bg-pink-400', 'bg-lime-400', 'bg-orange-400', 'bg-cyan-400', 'bg-fuchsia-400'];
const karistir = <T,>(a: T[]): T[] => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

const SayiSiralaOyunu: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { seviye, basari, zorlandi } = useSeviye('sayisirala', SEVIYELER.length - 1);
  const [adim, setAdim] = useState(0);
  const [tur, setTur] = useState(0);
  const ayar = SEVIYELER[seviye];
  const sira = useMemo(() => { const l = Array.from({ length: ayar.n }, (_, i) => i + 1); return ayar.geri ? l.reverse() : l; }, [ayar]);
  const balonlar = useMemo(() => karistir(sira).map((s) => ({ s, x: Math.random() * 6 - 3, gecikme: Math.random() * 1.5 })), [tur]); // eslint-disable-line react-hooks/exhaustive-deps
  const [binen, setBinen] = useState<number[]>([]);
  const [sallanan, setSallanan] = useState<number | null>(null);
  const [yanlis, setYanlis] = useState(0);
  const [kutlama, setKutlama] = useState(false);
  const [bitti, setBitti] = useState(false);
  const beklenen = sira[binen.length];
  const yonerge = ayar.geri ? `${SAYI[ayar.n]}'ten geriye say. Önce ${ayar.n}.` : 'Sayıları sırayla seç. Önce bir.';

  useEffect(() => { setBinen([]); setYanlis(0); speak(yonerge); }, [tur]); // eslint-disable-line react-hooks/exhaustive-deps

  const sec = (s: number) => {
    if (binen.includes(s)) return;
    if (s === beklenen) {
      const y = [...binen, s]; setBinen(y); speak(SAYI[s]); playEffect('correct', { volume: 0.25 });
      if (y.length === ayar.n) setTimeout(() => { setKutlama(true); speak('Aferin! Tren dolu, hadi gidelim!'); }, 500);
    } else { setSallanan(s); setTimeout(() => setSallanan(null), 700); setYanlis((n) => n + 1); }
  };
  const sonraki = () => {
    setKutlama(false);
    if (yanlis >= 3) zorlandi(); else basari();
    if (adim + 1 >= OTURUM) { setBitti(true); return; }
    setAdim((a) => a + 1); setTur((t) => t + 1);
  };
  const tekrar = () => { setAdim(0); setTur((t) => t + 1); setBitti(false); };
  const sut = ayar.n <= 3 ? 3 : ayar.n <= 6 ? 3 : 4;
  const balonBoy = ayar.n <= 3 ? 'w-28 h-28 text-6xl' : ayar.n <= 7 ? 'w-24 h-24 text-5xl' : 'w-20 h-20 text-4xl';

  return (
    <OyunCercevesi baslik="Sayı Sırala" emoji="🔢" onBack={onBack} adim={adim + (bitti ? 1 : 0)} toplamAdim={OTURUM} yonerge={yonerge}>
      <div className="absolute inset-0 flex flex-col px-3 pb-4 gap-3">
        {/* balonlar */}
        <div className="flex-1 grid place-items-center gap-3 rounded-3xl bg-gradient-to-b from-sky-100 to-white shadow-inner p-3" style={{ gridTemplateColumns: `repeat(${sut}, minmax(0,1fr))` }}>
          {balonlar.map(({ s, x, gecikme }) => (
            <button key={s} data-sayi={s} onClick={() => sec(s)}
              className={`relative ${balonBoy} rounded-full ${RENK[(s - 1) % RENK.length]} text-white font-black shadow-lg flex items-center justify-center transition-all duration-500 ${binen.includes(s) ? 'opacity-0 scale-50 pointer-events-none' : 'ok-zipla'} ${sallanan === s ? 'ok-sallan' : ''} ${yanlis >= 2 && s === beklenen ? 'ring-8 ring-amber-300' : ''}`}
              style={{ animationDelay: `${gecikme}s`, transform: `translateX(${x}px)` }}>
              {s}
              <span className="absolute -bottom-5 left-1/2 w-0.5 h-5 bg-slate-400" />
            </button>
          ))}
        </div>
        {/* tren */}
        <div className="flex items-end gap-1 overflow-x-auto pb-1 shrink-0">
          <span className="text-5xl shrink-0">🚂</span>
          {sira.map((s, k) => (
            <div key={k} className={`shrink-0 w-12 h-12 rounded-lg border-4 flex items-center justify-center text-2xl font-black ${binen.includes(s) ? `${RENK[(s - 1) % RENK.length]} border-white text-white shadow` : 'border-dashed border-slate-300 text-slate-300 bg-white'}`}
              style={binen.includes(s) ? { animation: 'ok-yildiz .35s ease-out' } : undefined}>
              {binen.includes(s) ? s : ''}
            </div>
          ))}
        </div>
      </div>
      <Kutlama acik={kutlama} yazi="Çuf çuf!" onBitti={sonraki} sure={1900} />
      {bitti && <OyunSonu onTekrar={tekrar} onBack={onBack} />}
    </OyunCercevesi>
  );
};

export default SayiSiralaOyunu;
