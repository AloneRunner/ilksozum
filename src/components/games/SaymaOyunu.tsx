import React, { useEffect, useMemo, useState } from 'react';
import { OyunCercevesi, Kutlama, OyunSonu, useSeviye } from '../oyunKiti/OyunKiti.tsx';
import { imageData } from '../../services/database/imageData.ts';
import { nesneUrl } from '../../services/nesneGorsel.ts';
import { speak, playEffect } from '../../services/speechService.ts';

// Sayı Sayma (yeniden, Kaan 2026-10-08): aynı nesnenin fotoğrafları; çocuk her birine dokunarak sayar
// (numara çıkar, sesli sayılır), sonra büyük sayı düğmelerinden doğrusunu seçer. Menü yok; 1-3 → 1-5 → 3-7 → 5-10.
const ARALIK: [number, number][] = [[1, 3], [1, 5], [3, 7], [5, 10]];
const OTURUM = 5;
const SAYI = ['sıfır', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz', 'on'];
const KAT = new Set(['Meyveler', 'Hayvanlar', 'Taşıtlar', 'Oyuncaklar', 'Sebzeler', 'hayvanlar']);
const HAVUZ = (() => {
  const g = new Set<string>(); const l: { kelime: string; url: string }[] = [];
  for (const i of imageData) {
    if (!KAT.has(i.tags?.category) || g.has(i.word) || i.word.includes(' ')) continue;
    const url = nesneUrl(i.imageUrl); if (!url?.endsWith('.webp')) continue;
    g.add(i.word); l.push({ kelime: i.word, url });
  }
  return l;
})();
// küçük çocuğun tanıdığı nesneler önce (enginar değil elma)
const TANIDIK = new Set(['elma', 'muz', 'armut', 'çilek', 'portakal', 'kiraz', 'havuç', 'domates', 'ördek', 'kedi', 'köpek', 'tavşan', 'balık', 'kuş', 'civciv', 'inek', 'araba', 'otobüs', 'top', 'balon', 'kalem', 'tren', 'uçak', 'gemi', 'kelebek', 'arı']);
const SAYILACAK = HAVUZ.filter((h) => TANIDIK.has(h.kelime)).length >= 6 ? HAVUZ.filter((h) => TANIDIK.has(h.kelime)) : HAVUZ;
/** "elma" → "elmaları", "köpek" → "köpekleri" (ünlü uyumu) */
const cogulBelirtme = (w: string) => { const u = [...w].reverse().find((h) => 'aıoueiöü'.includes(h)); return w + ('aıou'.includes(u || 'e') ? 'ları' : 'leri'); };
const rastgele = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const buyukBas = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);

const SaymaOyunu: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { seviye, basari, zorlandi } = useSeviye('sayma', ARALIK.length - 1);
  const [adim, setAdim] = useState(0);
  const [tur, setTur] = useState(0);
  const soru = useMemo(() => {
    const [a, b] = ARALIK[seviye];
    const n = rastgele(a, b);
    const nesne = SAYILACAK[Math.floor(Math.random() * SAYILACAK.length)];
    const secenek = new Set([n]);
    while (secenek.size < 3) { const x = rastgele(Math.max(1, n - 2), Math.min(10, n + 2)); secenek.add(x); }
    // nesneleri üst üste binmeden ızgaraya dağıt
    const sut = n <= 3 ? n : n <= 6 ? 3 : 4;
    const konum = Array.from({ length: n }, (_, i) => ({ x: ((i % sut) + 0.5) / sut, y: (Math.floor(i / sut) + 0.5) / Math.ceil(n / sut), a: (Math.random() - 0.5) * 16 }));
    return { n, nesne, secenekler: [...secenek].sort((x, y) => x - y), konum };
  }, [tur]); // eslint-disable-line react-hooks/exhaustive-deps
  const [sayilan, setSayilan] = useState<number[]>([]);
  const [yanlis, setYanlis] = useState(0);
  const [sallanan, setSallanan] = useState<number | null>(null);
  const [kutlama, setKutlama] = useState(false);
  const [bitti, setBitti] = useState(false);
  const hepsiSayildi = sayilan.length === soru.n;

  useEffect(() => { setSayilan([]); setYanlis(0); speak(`${buyukBas(cogulBelirtme(soru.nesne.kelime))} say. Her birine dokun.`); }, [tur]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (hepsiSayildi) setTimeout(() => speak('Kaç tane?'), 700); }, [hepsiSayildi]);

  const say = (i: number) => {
    if (sayilan.includes(i)) return;
    const y = [...sayilan, i]; setSayilan(y);
    playEffect('correct', { volume: 0.2 }); speak(buyukBas(SAYI[y.length]));
  };
  const sec = (k: number) => {
    if (!hepsiSayildi) { speak('Önce hepsini say.'); return; }
    if (k === soru.n) { setKutlama(true); speak(`Aferin! ${buyukBas(SAYI[k])} ${soru.nesne.kelime}.`); }
    else { setSallanan(k); setTimeout(() => setSallanan(null), 700); setYanlis((n) => n + 1); }
  };
  const sonraki = () => {
    setKutlama(false);
    if (yanlis >= 2) zorlandi(); else basari();
    if (adim + 1 >= OTURUM) { setBitti(true); return; }
    setAdim((a) => a + 1); setTur((t) => t + 1);
  };
  const tekrar = () => { setAdim(0); setTur((t) => t + 1); setBitti(false); };
  const boy = soru.n <= 3 ? 34 : soru.n <= 6 ? 27 : 21; // nesne boyu (% genişlik)

  return (
    <OyunCercevesi baslik="Sayı Sayma" emoji="🔢" onBack={onBack} adim={adim + (bitti ? 1 : 0)} toplamAdim={OTURUM}
      yonerge={hepsiSayildi ? 'Kaç tane?' : `${buyukBas(cogulBelirtme(soru.nesne.kelime))} say. Her birine dokun.`}>
      <div className="absolute inset-0 flex flex-col px-3 pb-3 gap-3">
        <div className="relative flex-1 rounded-3xl bg-gradient-to-br from-amber-50 to-sky-50 shadow-inner">
          {soru.konum.map((k, i) => {
            const sira = sayilan.indexOf(i);
            return (
              <button key={`${tur}-${i}`} data-nesne={i} onClick={() => say(i)}
                className={`absolute rounded-2xl bg-white p-1 shadow-lg transition ${sira >= 0 ? 'ring-4 ring-emerald-400 scale-95' : 'ring-4 ring-white active:scale-90'}`}
                style={{ left: `calc(${k.x * 100}% - ${boy / 2}%)`, top: `calc(${k.y * 100}% - ${boy * 0.45}%)`, width: `${boy}%`, aspectRatio: '1', transform: `rotate(${k.a}deg)` }}>
                <img src={soru.nesne.url} alt={soru.nesne.kelime} draggable={false} className="w-full h-full object-cover rounded-xl" />
                {sira >= 0 && <span className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-emerald-500 text-white text-2xl font-black flex items-center justify-center shadow" style={{ animation: 'ok-yildiz .35s ease-out' }}>{sira + 1}</span>}
              </button>
            );
          })}
        </div>
        <div className={`flex justify-center gap-4 transition-opacity ${hepsiSayildi ? 'opacity-100' : 'opacity-40'}`}>
          {soru.secenekler.map((k) => (
            <button key={k} data-sayi={k} onClick={() => sec(k)}
              className={`w-24 h-24 rounded-3xl bg-white shadow-lg text-5xl font-black text-sky-600 active:scale-95 ring-4 ${yanlis >= 2 && k === soru.n ? 'ring-amber-400 animate-pulse' : 'ring-white'} ${sallanan === k ? 'ok-sallan' : ''}`}>{k}</button>
          ))}
        </div>
      </div>
      <Kutlama acik={kutlama} yazi={`${soru.n}!`} onBitti={sonraki} sure={2000} />
      {bitti && <OyunSonu onTekrar={tekrar} onBack={onBack} />}
    </OyunCercevesi>
  );
};

export default SaymaOyunu;
