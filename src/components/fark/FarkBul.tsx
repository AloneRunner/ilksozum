import React, { useEffect, useMemo, useRef, useState } from 'react';
import { OyunCercevesi, Kutlama, useSeviye } from '../oyunKiti/OyunKiti.tsx';
import { speak, playEffect } from '../../services/speechService.ts';
import { etkinlikSay, basariSay } from '../../services/sayac.ts';
import { SAHNELER, type Fark } from './sahneler.ts';

// Farkları Bul (Kaan, 2026-10-29: "kaliteli olsun, iki resim arasında 7 fark"). İki resim aynı koddan çizilir,
// yalnız seçilen farklar ayrı: başka hiçbir ayrıntı değişmez. Seviye kendiliğinden: 3 → 5 → 7 fark.
// Yanlış dokunuşta ceza yok; uzun süre bulunamazsa bir fark yanıp söner (ipucu).
const FARK_SAYISI = [3, 5, 7];
const IPUCU_SN = 25;

const zar = (n: number) => Math.floor(Math.random() * n);
const karistir = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = zar(i + 1); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const bekle = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
// Daireleri üst üste binen iki fark (ör. uzaylının anteni ve rengi) birlikte seçilmez: aynı yerde iki fark kafa karıştırır (Kaan).
const farkSec = (adaylar: Fark[], n: number) => karistir(adaylar).reduce<Fark[]>((s, f) =>
  s.length < n && s.every(o => Math.hypot(o.x - f.x, o.y - f.y) >= o.r + f.r) ? [...s, f] : s, []);

const FarkBul: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { seviye, basari, zorlandi } = useSeviye('farkBul', FARK_SAYISI.length - 1);
  const n = FARK_SAYISI[seviye];
  const [tur, setTur] = useState(0);
  const [sahneSira] = useState(() => karistir(SAHNELER.map((_, i) => i)));
  const sahne = SAHNELER[sahneSira[tur % sahneSira.length]];
  const farklar = useMemo<Fark[]>(() => farkSec(sahne.farklar, n), [sahne, n, tur]); // eslint-disable-line react-hooks/exhaustive-deps
  const acik = useMemo(() => new Set(farklar.map(f => f.id)), [farklar]);
  const a = useMemo(() => sahne.ciz(new Set()), [sahne]);
  const b = useMemo(() => sahne.ciz(acik), [sahne, acik]);
  const [bulunan, setBulunan] = useState<string[]>([]);
  const [ipucu, setIpucu] = useState<string | null>(null);
  const [kutla, setKutla] = useState(false);
  const [bitti, setBitti] = useState(false);
  const yardimAldi = useRef(false);
  const yonerge = `İki resim arasında ${n} fark var. Bul ve dokun.`;

  useEffect(() => { etkinlikSay('Farkları Bul', 'acildi'); }, []);
  useEffect(() => {
    setBulunan([]); setIpucu(null); yardimAldi.current = false;
    const z = setTimeout(() => speak(yonerge), 400);
    return () => clearTimeout(z);
  }, [tur]); // eslint-disable-line react-hooks/exhaustive-deps

  // İpucu: son buluştan bu yana IPUCU_SN geçerse kalan bir fark yanıp söner
  useEffect(() => {
    if (bitti || bulunan.length >= farklar.length) return;
    setIpucu(null);
    const z = setTimeout(() => {
      const kalan = farklar.find(f => !bulunan.includes(f.id));
      if (kalan) { setIpucu(kalan.id); yardimAldi.current = true; }
    }, IPUCU_SN * 1000);
    return () => clearTimeout(z);
  }, [bulunan, farklar, bitti]);

  const dokun = async (e: React.PointerEvent<HTMLDivElement>) => {
    if (kutla) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) * 600 / r.width, y = (e.clientY - r.top) * 600 / r.height;
    const f = farklar.find(f => !bulunan.includes(f.id) && Math.hypot(f.x - x, f.y - y) <= f.r + 12);
    if (!f) return;
    const yeni = [...bulunan, f.id];
    setBulunan(yeni);
    if (yeni.length < farklar.length) { void playEffect('correct', { volume: 0.5 }); return; }
    // Hepsi bulundu: ton → söz → sonraki (üst üste binmesin)
    if (yardimAldi.current) zorlandi(); else basari();
    setKutla(true); await bekle(700);
    await Promise.race([speak('Aferin! Bütün farkları buldun.'), bekle(4000)]);
    setKutla(false); setBitti(true);
    etkinlikSay('Farkları Bul', 'bitti'); basariSay('Farkları Bul', yardimAldi.current ? 0 : 1, 1);
  };
  const sonraki = () => { setBitti(false); setTur(t => t + 1); };

  const resim = (icerik: string, etiket: string) => (
    <div className="relative w-full max-w-[min(100%,42vh)] sm-landscape:max-w-[min(100%,70vh)] lg:max-w-[min(100%,60vh)] aspect-square rounded-3xl overflow-hidden shadow-xl bg-white touch-manipulation select-none"
      onPointerDown={dokun} role="img" aria-label={etiket}>
      <div className="absolute inset-0 [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: icerik }} />
      <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full pointer-events-none">
        {farklar.filter(f => bulunan.includes(f.id)).map(f => (
          <circle key={f.id} cx={f.x} cy={f.y} r={f.r} fill="none" stroke="#10b981" strokeWidth={9} style={{ animation: 'ok-yildiz .4s ease-out both', transformOrigin: `${f.x}px ${f.y}px` }} />
        ))}
        {ipucu && <circle cx={farklar.find(f => f.id === ipucu)!.x} cy={farklar.find(f => f.id === ipucu)!.y} r={farklar.find(f => f.id === ipucu)!.r}
          fill="#fde68a" fillOpacity={0.35} stroke="#f59e0b" strokeWidth={6} strokeDasharray="14 10" className="animate-pulse" />}
      </svg>
    </div>
  );

  return (
    <OyunCercevesi baslik={`Farkları Bul · ${sahne.ad}`} emoji="🧐" onBack={onBack} adim={bulunan.length} toplamAdim={n} yonerge={yonerge}>
      <div className="absolute inset-0 flex flex-col landscape:flex-row items-center justify-center gap-3 p-3 overflow-hidden">
        {resim(a, 'Birinci resim')}
        {resim(b, 'İkinci resim')}
      </div>
      <Kutlama acik={kutla} />
      {bitti && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 bg-white/80 backdrop-blur-sm">
          <span className="text-8xl ok-zipla">🏆</span>
          <span className="text-3xl font-black text-slate-800">Bütün farkları buldun!</span>
          <div className="flex gap-3">
            <button onClick={sonraki} className="px-6 py-4 rounded-3xl bg-emerald-500 text-white text-2xl font-black shadow-lg active:scale-95">Yeni resim ▶</button>
            <button onClick={onBack} className="px-6 py-4 rounded-3xl bg-white text-slate-700 text-2xl font-black shadow-lg active:scale-95">🏠 Çık</button>
          </div>
        </div>
      )}
    </OyunCercevesi>
  );
};

export default FarkBul;
