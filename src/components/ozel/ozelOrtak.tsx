import React, { useEffect, useMemo, useRef, useState } from 'react';
import { OyunCercevesi, Kutlama, OyunSonu, useSeviye } from '../oyunKiti/OyunKiti.tsx';
import { speak, playEffect } from '../../services/speechService.ts';
import { etkinlikSay, basariSay } from '../../services/sayac.ts';

// Özel eğitim etkinliklerinin ortak parçaları.
// Konuşma kuralı: ton → söz → sonraki adım; söz en çok ~4,5 sn beklenir (üst üste binmesin).
export const zar = (n: number) => Math.floor(Math.random() * n);
export const karistir = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = zar(i + 1); [b[i], b[j]] = [b[j], b[i]]; } return b; };
export const bekle = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
export const konus = (metin: string) => Promise.race([speak(metin), bekle(4500)]);

// Üstte sekme düğmeleri (Tanı / Soru gibi)
export const Sekmeler = <T extends string>({ secili, sekmeler, onSec }: { secili: T; sekmeler: [T, string][]; onSec: (s: T) => void }) => (
  <div className="flex gap-2 justify-center shrink-0">
    {sekmeler.map(([id, ad]) => (
      <button key={id} onClick={() => onSec(id)} className={`px-4 py-2 rounded-full text-base font-black shadow-sm active:scale-95 ${secili === id ? 'bg-sky-500 text-white' : 'bg-white text-slate-700'}`}>{ad}</button>
    ))}
  </div>
);

// Liste ekranındaki büyük seçim kartı
export const SecimKarti: React.FC<{ url?: string; emoji: string; ad: string; onClick: () => void }> = ({ url, emoji, ad, onClick }) => (
  <button onClick={onClick} className="flex flex-col rounded-3xl bg-white shadow-lg overflow-hidden active:scale-95 transition-transform text-left">
    {url ? <img src={url} alt="" draggable={false} className="w-full aspect-[4/3] object-cover" /> : <div className="w-full aspect-[4/3] flex items-center justify-center text-7xl bg-sky-50">{emoji}</div>}
    <span className="px-3 py-2 text-lg font-black text-slate-800 leading-tight">{emoji} {ad}</span>
  </button>
);

// --- Hatasız seçim oyunu: soru (+ isteğe bağlı büyük resim) ve şıklar ---
// Yanlış şık sallanıp söner; 2 yanlıştan sonra doğru şık parlar. İlk denemede doğruysa başarı sayılır.
export interface Secenek { id: string; url?: string; emoji?: string; yazi?: string; icerik?: React.ReactNode }
// ustYazi: resmin yerine büyük yazı (İşlevsel Okuma: kelimeyi oku, resmini bul); sahne: serbest içerik (Toplama: iki grup nesne)
// genis: şıklar yatay (banknot gibi 2:1), daha geniş yer kaplasın
export interface Tur { soru: string; gorsel?: string; ustYazi?: string; sahne?: React.ReactNode; genis?: boolean; secenekler: Secenek[]; dogruId: string; dogruSoz: string }

export const SecimOyunu: React.FC<{
  oyunId: string; sayacAdi: string; baslik: string; emoji: string; onBack: () => void;
  secenekSayilari: number[]; // seviyeye göre şık sayısı, ör. [2, 3, 4]
  turlariKur: (secenekSayisi: number) => Tur[];
  ust?: React.ReactNode;
  onBitti?: (ilkDenemeDogru: number, toplam: number) => void; // aşamalı çalışmalar (Renk Öğren) geçme kararı için
}> = ({ oyunId, sayacAdi, baslik, emoji, onBack, secenekSayilari, turlariKur, ust, onBitti }) => {
  const { seviye, basari, zorlandi } = useSeviye(oyunId, secenekSayilari.length - 1);
  const [oyun, setOyun] = useState(0);
  const turlar = useMemo(() => turlariKur(secenekSayilari[seviye]), [oyun]); // eslint-disable-line react-hooks/exhaustive-deps
  const [i, setI] = useState(0);
  const [sonen, setSonen] = useState<string[]>([]);
  const [sallanan, setSallanan] = useState<string | null>(null);
  const [kilit, setKilit] = useState(false);
  const [kutla, setKutla] = useState(false);
  const [bitti, setBitti] = useState(false);
  const ilkDeneme = useRef(true);
  const dogrular = useRef(0);
  const tur = turlar[i];

  useEffect(() => { etkinlikSay(sayacAdi, 'acildi'); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!tur || bitti) return;
    setSonen([]); setSallanan(null); setKilit(false); ilkDeneme.current = true;
    const z = setTimeout(() => speak(tur.soru), 350);
    return () => clearTimeout(z);
  }, [i, oyun]); // eslint-disable-line react-hooks/exhaustive-deps

  const sec = async (s: Secenek) => {
    if (kilit || sonen.includes(s.id)) return;
    if (s.id !== tur.dogruId) {
      ilkDeneme.current = false;
      setSallanan(s.id); void playEffect('softincorrect', { volume: 0.4 });
      setTimeout(() => { setSallanan(null); setSonen(x => [...x, s.id]); }, 700);
      return;
    }
    setKilit(true);
    if (ilkDeneme.current) { dogrular.current++; basari(); } else zorlandi();
    setKutla(true); await bekle(700); // Kutlama tonu çalar
    await konus(tur.dogruSoz);
    setKutla(false);
    if (i + 1 < turlar.length) { setI(i + 1); return; }
    etkinlikSay(sayacAdi, 'bitti'); basariSay(sayacAdi, dogrular.current, turlar.length);
    onBitti?.(dogrular.current, turlar.length);
    setBitti(true);
  };
  const tekrar = () => { setBitti(false); setI(0); dogrular.current = 0; setOyun(o => o + 1); };

  if (!tur) return null;
  const ipucu = sonen.length >= 2;
  return (
    <OyunCercevesi baslik={baslik} emoji={emoji} onBack={onBack} adim={i} toplamAdim={turlar.length} yonerge={tur.soru}>
      <div className="absolute inset-0 flex flex-col items-center gap-3 px-3 pb-3 overflow-y-auto">
        {ust}
        <div className={`flex-1 w-full max-w-4xl flex ${tur.gorsel ? 'flex-col landscape:flex-row' : 'flex-col'} items-center justify-center gap-4`}>
          {tur.gorsel && <img key={tur.gorsel} src={tur.gorsel} alt="" draggable={false} className="shrink-0 w-[min(100%,46vh)] sm-landscape:w-[min(46vw,60vh)] aspect-square object-cover rounded-3xl shadow-xl bg-white" />}
          {tur.sahne && <div key={i} className="shrink-0 w-full flex justify-center">{tur.sahne}</div>}
          {tur.ustYazi && <div key={tur.ustYazi} className={`shrink-0 max-w-full rounded-3xl bg-white px-8 py-4 shadow-xl font-black text-slate-800 tracking-wide ${tur.ustYazi.length > 9 ? 'text-4xl sm-landscape:text-3xl lg:text-5xl' : 'text-6xl sm-landscape:text-5xl lg:text-7xl'}`}>{tur.ustYazi}</div>}
          {/* Resimli şıklar yatay telefonda ekrana sığsın: her şık en çok ~50vh */}
          <div className={`grid gap-3 w-full ${tur.secenekler.length <= 2 ? 'grid-cols-2' : tur.secenekler.length === 3 ? 'grid-cols-3' : 'grid-cols-2 landscape:grid-cols-4'} ${tur.gorsel ? 'max-w-md' : 'max-w-3xl'}`}
            style={tur.gorsel ? undefined : { maxWidth: `min(48rem, ${tur.secenekler.length * (tur.genis ? 95 : tur.ustYazi || tur.sahne ? 34 : 50)}vh, 100%)` }}>
            {tur.secenekler.map(s => {
              const soldu = sonen.includes(s.id), parla = ipucu && s.id === tur.dogruId;
              return (
                <button key={s.id} onClick={() => void sec(s)} disabled={soldu}
                  className={`relative flex flex-col items-center justify-center rounded-3xl bg-white shadow-lg overflow-hidden transition-all active:scale-95 ${soldu ? 'opacity-25' : ''} ${parla ? 'ring-8 ring-amber-300 animate-pulse' : ''} ${sallanan === s.id ? 'ok-sallan ring-4 ring-rose-300' : ''}`}>
                  {s.icerik ?? (s.url ? <img src={s.url} alt={s.yazi || ''} draggable={false} className="w-full aspect-square object-cover" />
                    : <span className="text-6xl sm-landscape:text-5xl lg:text-7xl py-3 leading-none">{s.emoji}</span>)}
                  {s.yazi && <span className="w-full py-1.5 text-center text-xl font-black text-slate-800">{s.yazi}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <Kutlama acik={kutla} />
      {bitti && <OyunSonu onTekrar={tekrar} onBack={onBack} />}
    </OyunCercevesi>
  );
};

// Bir dizinin içinden, doğru dışında rastgele n-1 öğe + doğru, karışık
export const sikKur = <T,>(dogru: T, havuz: T[], n: number, ayni: (a: T, b: T) => boolean = (a, b) => a === b) =>
  karistir([dogru, ...karistir(havuz.filter(x => !ayni(x, dogru))).slice(0, n - 1)]);
