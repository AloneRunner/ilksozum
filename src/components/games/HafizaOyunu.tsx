import React, { useEffect, useMemo, useState } from 'react';
import { OyunCercevesi, Kutlama, OyunSonu, useSeviye } from '../oyunKiti/OyunKiti.tsx';
import { imageData } from '../../services/database/imageData.ts';
import { nesneUrl } from '../../services/nesneGorsel.ts';
import { speak, playEffect } from '../../services/speechService.ts';

// Hafıza Çiftleri (yeniden, Kaan 2026-10-08): gerçek fotoğraflı kartlar, tema/zorluk menüsü yok,
// 2 → 3 → 4 → 6 çift başardıkça; eşleşince nesnenin adı söylenir. Süre ve puan yok.
const SEVIYELER = [2, 3, 4, 6];
const OTURUM = 4;
const KAT = new Set(['Hayvanlar', 'Meyveler', 'Taşıtlar', 'Oyuncaklar', 'Sebzeler', 'hayvanlar']);
const HAVUZ = (() => {
  const g = new Set<string>(); const l: { kelime: string; url: string }[] = [];
  for (const i of imageData) {
    if (!KAT.has(i.tags?.category) || g.has(i.word)) continue;
    const url = nesneUrl(i.imageUrl); if (!url?.endsWith('.webp')) continue;
    g.add(i.word); l.push({ kelime: i.word, url });
  }
  return l;
})();
const karistir = <T,>(a: T[]): T[] => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const buyukBas = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);

const HafizaOyunu: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { seviye, basari, zorlandi } = useSeviye('hafiza', SEVIYELER.length - 1);
  const [adim, setAdim] = useState(0);
  const [tur, setTur] = useState(0);
  const kartlar = useMemo(() => {
    const ciftler = karistir(HAVUZ).slice(0, SEVIYELER[seviye]);
    return karistir(ciftler.flatMap((c, i) => [{ ...c, cift: i, k: `${i}a` }, { ...c, cift: i, k: `${i}b` }]));
  }, [tur]); // eslint-disable-line react-hooks/exhaustive-deps
  const [acik, setAcik] = useState<number[]>([]);
  const [bulunan, setBulunan] = useState<Set<number>>(new Set());
  const [hamle, setHamle] = useState(0);
  const [kutlama, setKutlama] = useState(false);
  const [bitti, setBitti] = useState(false);

  useEffect(() => { setAcik([]); setBulunan(new Set()); setHamle(0); speak('Aynı resimleri bul.'); }, [tur]);

  const cevir = (i: number) => {
    if (acik.length === 2 || acik.includes(i) || bulunan.has(kartlar[i].cift)) return;
    const y = [...acik, i];
    setAcik(y);
    if (y.length < 2) return;
    setHamle((h) => h + 1);
    const [a, b] = y;
    if (kartlar[a].cift === kartlar[b].cift) {
      setTimeout(() => {
        playEffect('correct', { volume: 0.5 }); speak(buyukBas(kartlar[a].kelime));
        setBulunan((s) => { const n = new Set(s).add(kartlar[a].cift); if (n.size * 2 === kartlar.length) setTimeout(() => setKutlama(true), 700); return n; });
        setAcik([]);
      }, 450);
    } else setTimeout(() => setAcik([]), 1100);
  };

  const sonraki = () => {
    setKutlama(false);
    // çift sayısının 2 katından fazla hamle = zorlandı
    if (hamle > kartlar.length) zorlandi(); else basari();
    if (adim + 1 >= OTURUM) { setBitti(true); return; }
    setAdim((a) => a + 1); setTur((t) => t + 1);
  };
  const tekrar = () => { setAdim(0); setTur((t) => t + 1); setBitti(false); };

  const sutun = kartlar.length <= 4 ? 2 : kartlar.length <= 8 ? (kartlar.length === 6 ? 3 : 4) : 4;
  return (
    <OyunCercevesi baslik="Hafıza Çiftleri" emoji="🃏" onBack={onBack} adim={adim + (bitti ? 1 : 0)} toplamAdim={OTURUM} yonerge="Aynı resimleri bul.">
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <div className="grid gap-3 w-full" style={{ gridTemplateColumns: `repeat(${sutun}, minmax(0, 1fr))`, maxWidth: sutun * 150 }}>
          {kartlar.map((k, i) => {
            const gorunur = acik.includes(i) || bulunan.has(k.cift);
            return (
              <button key={k.k} data-kart={k.cift} onClick={() => cevir(i)} className="relative aspect-square [perspective:800px]" aria-label={gorunur ? k.kelime : 'Kapalı kart'}>
                <div className="absolute inset-0 transition-transform duration-500 [transform-style:preserve-3d]" style={{ transform: gorunur ? 'rotateY(180deg)' : 'none' }}>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 shadow-lg flex items-center justify-center text-4xl [backface-visibility:hidden] ring-4 ring-white">⭐</div>
                  <div className={`absolute inset-0 rounded-2xl bg-white shadow-lg overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] ring-4 ${bulunan.has(k.cift) ? 'ring-emerald-400' : 'ring-white'}`}>
                    <img src={k.url} alt="" draggable={false} className="w-full h-full object-cover" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <Kutlama acik={kutlama} yazi="Hepsini buldun!" onBitti={sonraki} sure={1900} />
      {bitti && <OyunSonu onTekrar={tekrar} onBack={onBack} />}
    </OyunCercevesi>
  );
};

export default HafizaOyunu;
