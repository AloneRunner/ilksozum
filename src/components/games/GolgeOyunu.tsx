import React, { useEffect, useMemo, useState } from 'react';
import { OyunCercevesi, Kutlama, OyunSonu, useSeviye } from '../oyunKiti/OyunKiti.tsx';
import { imageData } from '../../services/database/imageData.ts';
import { GOLGE_KESIMLERI } from '../../data/golgeListesi.ts';
import { speak } from '../../services/speechService.ts';

// Gölge Eşleştirme (yeniden, Kaan 2026-10-08): büyük siyah gölge + renkli seçenekler (saydam kesimler).
// Doğru nesneye dokununca nesne gölgenin üstüne oturur, gölge renklenir, adı söylenir. Menü yok; 2 → 3 → 4 seçenek.
const SECENEK = [2, 3, 4];
const OTURUM = 5;
const NESNELER = [...GOLGE_KESIMLERI].map((id) => {
  const i = imageData.find((x) => x.id === id);
  return i ? { id, kelime: i.word, url: `/images/golge/${id}.webp` } : null;
}).filter((x): x is { id: number; kelime: string; url: string } => !!x)
  .filter((x, i, a) => a.findIndex((y) => y.kelime === x.kelime) === i);
const karistir = <T,>(a: T[]): T[] => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const buyukBas = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);

const GolgeOyunu: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { seviye, basari, zorlandi } = useSeviye('golge', SECENEK.length - 1);
  const [adim, setAdim] = useState(0);
  const [tur, setTur] = useState(0);
  const soru = useMemo(() => {
    const secenekler = karistir(NESNELER).slice(0, SECENEK[seviye]);
    return { hedef: secenekler[Math.floor(Math.random() * secenekler.length)], secenekler };
  }, [tur]); // eslint-disable-line react-hooks/exhaustive-deps
  const [bulundu, setBulundu] = useState(false);
  const [yanlis, setYanlis] = useState(0);
  const [sallanan, setSallanan] = useState<number | null>(null);
  const [kutlama, setKutlama] = useState(false);
  const [bitti, setBitti] = useState(false);

  useEffect(() => { setBulundu(false); setYanlis(0); speak('Bu kimin gölgesi?'); }, [tur]);

  const sec = (id: number) => {
    if (bulundu) return;
    if (id === soru.hedef.id) {
      setBulundu(true);
      setTimeout(() => { setKutlama(true); speak(`Aferin! ${buyukBas(soru.hedef.kelime)}.`); }, 650);
    } else { setSallanan(id); setTimeout(() => setSallanan(null), 700); setYanlis((n) => n + 1); }
  };
  const sonraki = () => {
    setKutlama(false);
    if (yanlis >= 2) zorlandi(); else basari();
    if (adim + 1 >= OTURUM) { setBitti(true); return; }
    setAdim((a) => a + 1); setTur((t) => t + 1);
  };
  const tekrar = () => { setAdim(0); setTur((t) => t + 1); setBitti(false); };

  return (
    <OyunCercevesi baslik="Gölge Eşleştirme" emoji="🔦" onBack={onBack} adim={adim + (bitti ? 1 : 0)} toplamAdim={OTURUM} yonerge="Bu kimin gölgesi?">
      <div className="absolute inset-0 flex flex-col items-center justify-between px-3 pb-4 pt-2 gap-4">
        {/* gölge sahnesi */}
        <div style={{ maxWidth: "min(24rem, 40vh)" }} className="relative w-full aspect-square rounded-[2.5rem] bg-gradient-to-b from-amber-100 to-orange-200 shadow-inner flex items-center justify-center overflow-hidden">
          <div className="absolute inset-x-[15%] bottom-[10%] h-[8%] rounded-full bg-black/10 blur-md" />
          <img src={soru.hedef.url} alt="" draggable={false} className="relative w-[72%] h-[72%] object-contain transition-all duration-700"
            style={{ filter: bulundu ? 'none' : 'brightness(0) saturate(100%) opacity(.85)', transform: bulundu ? 'scale(1.06)' : 'scale(1)' }} />
          {bulundu && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-amber-400 text-white text-2xl font-black shadow-lg whitespace-nowrap">{buyukBas(soru.hedef.kelime)}</div>
          )}
        </div>
        {/* renkli seçenekler */}
        <div className="grid gap-3 w-full max-w-md" style={{ gridTemplateColumns: `repeat(${soru.secenekler.length === 4 ? 2 : soru.secenekler.length}, minmax(0,1fr))` }}>
          {soru.secenekler.map((n) => (
            <button key={n.id} data-secenek={n.id === soru.hedef.id ? 'dogru' : 'yanlis'} onClick={() => sec(n.id)}
              className={`aspect-square rounded-3xl bg-white shadow-lg p-3 ring-4 active:scale-95 transition ${bulundu && n.id === soru.hedef.id ? 'opacity-0' : ''} ${yanlis >= 2 && n.id === soru.hedef.id ? 'ring-amber-400 animate-pulse' : 'ring-white'} ${sallanan === n.id ? 'ok-sallan' : ''}`}
              style={{ maxHeight: soru.secenekler.length === 4 ? '22vh' : '26vh', justifySelf: 'center', width: '100%' }}>
              <img src={n.url} alt={n.kelime} draggable={false} className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      </div>
      <Kutlama acik={kutlama} yazi="Buldun!" onBitti={sonraki} sure={1900} alt />
      {bitti && <OyunSonu onTekrar={tekrar} onBack={onBack} />}
    </OyunCercevesi>
  );
};

export default GolgeOyunu;
