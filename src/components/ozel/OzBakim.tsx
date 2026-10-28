import React, { useEffect, useMemo, useRef, useState } from 'react';
import { OyunCercevesi, Kutlama, OyunSonu, useSeviye } from '../oyunKiti/OyunKiti.tsx';
import { speak, playEffect } from '../../services/speechService.ts';
import { etkinlikSay, basariSay } from '../../services/sayac.ts';
import { RUTINLER, type Rutin } from './ozelVeri.ts';
import { SecimKarti, Sekmeler, karistir, konus, bekle } from './ozelOrtak.tsx';

// Kendine bakım: el yıkama, diş fırçalama, dışarı çıkmaya hazırlanma.
// "Adım Adım": görsel çizelge, gerçek işi yaparken kart kart ilerlenir (Tuvalet Zamanı gibi).
// "Sırala": kartları sıraya koy; hatasız (yanlış kart sallanır, 2 yanlıştan sonra doğru kart parlar).
// Kolay seviyede ilk adımlar yerinde gelir, son 3 kart dizilir; iki kez hatasız olunca hepsi dizilir.
type Sekme = 'adim' | 'sirala';

const Adimlar: React.FC<{ rutin: Rutin }> = ({ rutin }) => {
  const [adim, setAdim] = useState(0);
  const [kutla, setKutla] = useState(false);
  const a = rutin.adimlar[adim], son = adim === rutin.adimlar.length - 1;
  useEffect(() => { speak(a.soz); }, [adim]); // eslint-disable-line react-hooks/exhaustive-deps
  const ileri = async () => {
    if (!son) { setAdim(adim + 1); void playEffect('correct', { volume: 0.25 }); return; }
    setKutla(true); etkinlikSay(`Kendine Bakım: ${rutin.ad}`, 'bitti');
    await konus('Aferin! Hepsini yaptın.'); setKutla(false); setAdim(0);
  };
  return (
    <div className="flex-1 flex flex-col landscape:flex-row items-center justify-center gap-4">
      <img key={adim} src={a.url} alt="" draggable={false} className="shrink-0 w-[min(100%,46vh)] sm-landscape:w-[min(46vw,56vh)] aspect-square object-cover rounded-3xl shadow-xl bg-white" style={{ animation: 'ok-yildiz .35s ease-out both' }} />
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-1.5">{rutin.adimlar.map((_, i) => <span key={i} className={`w-3 h-3 rounded-full ${i <= adim ? 'bg-emerald-400' : 'bg-slate-200'}`} />)}</div>
        <button onClick={() => speak(a.soz)} className="text-3xl sm-landscape:text-2xl font-black text-slate-800 text-center active:scale-95"><span className="text-sky-500 mr-2">{adim + 1}.</span>{a.yazi} <span className="text-xl">🔊</span></button>
        <div className="flex gap-3">
          <button onClick={() => setAdim(adim - 1)} disabled={adim === 0} className="px-5 py-4 rounded-3xl bg-white shadow text-2xl font-black disabled:opacity-30 active:scale-95">◀</button>
          <button onClick={() => void ileri()} className="px-7 py-4 rounded-3xl bg-emerald-500 text-white shadow-lg text-2xl font-black active:scale-95">{son ? 'Bitti! ⭐' : 'Yaptım ✓'}</button>
        </div>
        <p className="text-xs text-slate-500 text-center max-w-xs">Lavabonun ya da kapının yanında, çocuğunuzla adım adım birlikte yapın.</p>
      </div>
      <Kutlama acik={kutla} />
    </div>
  );
};

const Sirala: React.FC<{ rutin: Rutin; onBack: () => void }> = ({ rutin, onBack }) => {
  const adimlar = useMemo(() => rutin.adimlar.filter(a => a.sirala !== false), [rutin]);
  const { seviye, basari, zorlandi } = useSeviye('ozBakimSirala', 1);
  const [oyun, setOyun] = useState(0);
  const hazir = seviye === 0 ? Math.max(0, adimlar.length - 3) : 0;
  const [yerlesen, setYerlesen] = useState(hazir);
  const kartlar = useMemo(() => karistir(adimlar.map((_, i) => i).slice(hazir)), [oyun, hazir, adimlar]);
  const [sallanan, setSallanan] = useState<number | null>(null);
  const [hata, setHata] = useState(0);
  const [kutla, setKutla] = useState(false);
  const [bitti, setBitti] = useState(false);
  const hatasiz = useRef(true);
  const yonerge = 'Kartları sırayla diz. Önce hangisi?';

  useEffect(() => { setYerlesen(hazir); setHata(0); hatasiz.current = true; const z = setTimeout(() => speak(yonerge), 350); return () => clearTimeout(z); }, [oyun]); // eslint-disable-line react-hooks/exhaustive-deps

  const dokun = async (k: number) => {
    if (kutla || k < yerlesen) return;
    if (k !== yerlesen) {
      hatasiz.current = false; setHata(h => h + 1);
      setSallanan(k); void playEffect('softincorrect', { volume: 0.4 }); setTimeout(() => setSallanan(null), 700);
      return;
    }
    const y = yerlesen + 1;
    setYerlesen(y); setHata(0);
    if (y < adimlar.length) { void playEffect('correct', { volume: 0.3 }); return; }
    if (hatasiz.current) basari(); else zorlandi();
    setKutla(true); await bekle(700); await konus('Aferin! Sıraladın.'); setKutla(false);
    etkinlikSay(`Sırala: ${rutin.ad}`, 'bitti'); basariSay(`Sırala: ${rutin.ad}`, hatasiz.current ? 1 : 0, 1);
    setBitti(true);
  };

  return (
    <div className="flex-1 flex flex-col items-center"><div className="my-auto w-full flex flex-col items-center gap-3 sm-landscape:gap-2">
      <button onClick={() => speak(yonerge)} className="text-lg sm-landscape:text-base font-black text-slate-700">{yonerge} 🔊</button>
      <div className="grid gap-2 w-full max-w-3xl sm-landscape:max-w-[140vh]" style={{ gridTemplateColumns: `repeat(${adimlar.length}, minmax(0, 1fr))` }}>
        {adimlar.map((a, i) => (
          <div key={i} className={`relative aspect-square rounded-2xl overflow-hidden ${i < yerlesen ? 'bg-white shadow' : 'border-4 border-dashed ' + (i === yerlesen ? 'border-sky-400 animate-pulse bg-sky-50' : 'border-slate-200 bg-white/60')}`}>
            {i < yerlesen && <img src={a.url} alt="" draggable={false} className="w-full h-full object-cover" style={{ animation: 'ok-yildiz .3s ease-out both' }} />}
            <span className="absolute top-1 left-1 w-7 h-7 rounded-full bg-sky-500 text-white text-sm font-black flex items-center justify-center shadow">{i + 1}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-3 sm-landscape:gap-2 w-full max-w-3xl">
        {kartlar.filter(k => k >= yerlesen).map(k => (
          <button key={k} onClick={() => void dokun(k)} className={`w-[30%] max-w-[12rem] sm-landscape:w-[26vh] rounded-2xl overflow-hidden bg-white shadow-lg active:scale-95 ${sallanan === k ? 'ok-sallan ring-4 ring-rose-300' : ''} ${hata >= 2 && k === yerlesen ? 'ring-8 ring-amber-300 animate-pulse' : ''}`}>
            <img src={adimlar[k].url} alt={adimlar[k].yazi} draggable={false} className="w-full aspect-square object-cover" />
          </button>
        ))}
      </div>
      <Kutlama acik={kutla} />
      {bitti && <OyunSonu onTekrar={() => { setBitti(false); setOyun(o => o + 1); }} onBack={onBack} />}
    </div></div>
  );
};

const OzBakim: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [rutin, setRutin] = useState<Rutin | null>(null);
  const [sekme, setSekme] = useState<Sekme>('adim');
  useEffect(() => { etkinlikSay('Kendine Bakım', 'acildi'); }, []);

  if (!rutin) return (
    <OyunCercevesi baslik="Kendine Bakım" emoji="🧼" onBack={onBack} yonerge="Ne yapalım? Birini seç.">
      <div className="absolute inset-0 overflow-y-auto px-3 pb-4">
        <div className="grid grid-cols-2 landscape:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {RUTINLER.map(r => <SecimKarti key={r.id} url={r.adimlar[r.adimlar.length - 1].url} emoji={r.emoji} ad={r.ad} onClick={() => { setSekme('adim'); setRutin(r); }} />)}
        </div>
      </div>
    </OyunCercevesi>
  );
  return (
    <OyunCercevesi baslik={rutin.ad} emoji={rutin.emoji} onBack={() => setRutin(null)}>
      <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
        <Sekmeler secili={sekme} sekmeler={[['adim', '👣 Adım Adım'], ['sirala', '🔢 Sırala']]} onSec={setSekme} />
        {sekme === 'adim' ? <Adimlar key={rutin.id} rutin={rutin} /> : <Sirala key={rutin.id} rutin={rutin} onBack={() => setRutin(null)} />}
      </div>
    </OyunCercevesi>
  );
};

export default OzBakim;
