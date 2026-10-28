import React, { useEffect, useMemo, useRef, useState } from 'react';
import { OyunCercevesi, Kutlama, OyunSonu } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import { etkinlikSay, basariSay } from '../../services/sayac.ts';
import SaatYuzu, { type Ibre } from './SaatYuzu.tsx';
import { type Saat, ayni, soru, dogruCumle, yanlisCumle, kurCumle, soyle, dijital, yanlisOlumsuzAcik } from './saatDil.ts';

// Saat Merkezi etkinlikleri (Gökhan Hoca önerisi, 2026-10-27): her biri ayrı sekme, kısa oturum, hatasız öğrenme
// (yanlış seçenek kaybolur, ipucu verilir). Az konuşulur; konuşma bitmeden yeni soru gelmez.
const zar = (n: number) => Math.floor(Math.random() * n);
const rastgeleSaat = () => 1 + zar(12);
const baskaSaat = (h: number, enAz = 2) => { let x; do { x = rastgeleSaat(); } while (Math.min(Math.abs(x - h), 12 - Math.abs(x - h)) < enAz); return x; };
const karistir = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);
const bekle = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
// Konuşma bitince döner; takılırsa en fazla ~4,5 sn beklenir
const konus = (m: string) => Promise.race([speak(m), bekle(4500)]);
// Övgü sırası: ton (Kutlama) → söz → sonraki adım; üst üste binmesin
const ovgu = async (m: string, setKutla: (b: boolean) => void) => { setKutla(true); await bekle(700); await konus(m); await bekle(300); setKutla(false); };

// ---------------------------------------------------------------- Saat kaç? (iki saatten doğrusunu seç)
export type SoruTuru = 'tam' | 'bucuk' | 'ceyrekGecer' | 'ceyrekVar' | 'karisik' | 'dijital' | 'dijitalSec';
interface Tur { hedef: Saat; secenekler: Saat[] }

const turUret = (tur: SoruTuru): Tur => {
  const h = rastgeleSaat();
  let hedef: Saat, cel: Saat;
  switch (tur) {
    case 'tam': hedef = { h, m: 0 }; cel = { h: baskaSaat(h, 3), m: 0 }; break;
    // Buçuk: yarısında aynı saatin tamı (ince fark), yarısında başka bir buçuk
    case 'bucuk': hedef = { h, m: 30 }; cel = zar(2) ? { h, m: 0 } : { h: baskaSaat(h), m: 30 }; break;
    // Çeyrek geçiyor / var: en öğretici karşılaştırma aynı saatin öbür çeyreği (yelkovan 3'te mi 9'da mı)
    case 'ceyrekGecer': hedef = { h, m: 15 }; cel = [{ h, m: 45 }, { h, m: 30 }, { h: baskaSaat(h), m: 15 }][zar(3)]; break;
    case 'ceyrekVar': hedef = { h, m: 45 }; cel = [{ h, m: 15 }, { h, m: 30 }, { h: baskaSaat(h), m: 45 }][zar(3)]; break;
    default: { // karışık ve dijital (iki yönde): dört türden biri, çeldirici başka türden
      const dk = [0, 30, 15, 45];
      const m = dk[zar(4)];
      hedef = { h, m };
      cel = zar(2) ? { h, m: dk.filter(x => x !== m)[zar(3)] } : { h: baskaSaat(h), m };
    }
  }
  return { hedef, secenekler: karistir([hedef, cel]) };
};

const SORU_SAYISI = 8;
const BASLIK: Record<SoruTuru, string> = {
  tam: 'Tam Saatler', bucuk: 'Buçuklar', ceyrekGecer: 'Çeyrek Geçiyor', ceyrekVar: 'Çeyrek Var', karisik: 'Karışık Saatler', dijital: 'Dijital Saat', dijitalSec: 'Saat Kaç? (Dijital)',
};

// Önce öğret (Gökhan Hoca'nın çalışma kâğıtları, 2026-10-28): "Yelkovan 3'ün üzerindeyse çeyrek geçiyor deriz."
// Sorudan önce bir kez: örnek saat, parlayan ibre, kısa anlatım.
const OGRET: Partial<Record<SoruTuru, { saat: Saat; cumle: string }>> = {
  tam: { saat: { h: 3, m: 0 }, cumle: "Yelkovan 12'nin üstündeyse saat tamdır. Akrep hangi sayıdaysa saat odur. Saat üç." },
  bucuk: { saat: { h: 3, m: 30 }, cumle: "Yelkovan 6'nın üstündeyse saat buçuktur. Saat üç buçuk." },
  ceyrekGecer: { saat: { h: 3, m: 15 }, cumle: "Yelkovan 3'ün üstündeyse çeyrek geçiyor deriz. Saat üçü çeyrek geçiyor." },
  ceyrekVar: { saat: { h: 3, m: 45 }, cumle: "Yelkovan 9'un üstündeyse çeyrek var deriz. Saat dörde çeyrek var." },
};
const DIJITAL_SORU = 'Saat kaç? Doğru yazıyı bul.';

const turlarUret = (tur: SoruTuru) => {
  const turlar: Tur[] = [];
  while (turlar.length < SORU_SAYISI) {
    const t = turUret(tur);
    if (!turlar.some(x => ayni(x.hedef, t.hedef))) turlar.push(t);
  }
  return turlar;
};

export const SaatSoru: React.FC<{ tur: SoruTuru; onBack: () => void }> = ({ tur, onBack }) => {
  const [oturum, setOturum] = useState(0);
  const turlar = useMemo(() => turlarUret(tur), [tur, oturum]);
  const [i, setI] = useState(0);
  const [gizli, setGizli] = useState<number | null>(null); // yanlış seçilen şık kaybolur
  const [sallanan, setSallanan] = useState<number | null>(null);
  const [kutla, setKutla] = useState(false);
  const [bitti, setBitti] = useState(false);
  const kilit = useRef(false);
  const ilkDeneme = useRef(true);
  const dogruSayisi = useRef(0);
  const t = turlar[i];
  const ogret = OGRET[tur];
  const [ogretiliyor, setOgretiliyor] = useState(!!ogret);
  const soruCumlesi = tur === 'dijitalSec' ? DIJITAL_SORU : soru(t.hedef);

  useEffect(() => { etkinlikSay(`Saat: ${BASLIK[tur]}`, 'acildi'); }, [tur]);
  useEffect(() => {
    setGizli(null); ilkDeneme.current = true; kilit.current = false;
    const z = setTimeout(() => speak(ogretiliyor && ogret ? ogret.cumle : soruCumlesi), 400);
    return () => clearTimeout(z);
  }, [t, ogretiliyor]); // eslint-disable-line react-hooks/exhaustive-deps

  const sec = async (k: number) => {
    if (kilit.current || gizli === k) return;
    const s = t.secenekler[k];
    kilit.current = true;
    if (ayni(s, t.hedef)) {
      if (ilkDeneme.current) dogruSayisi.current++;
      await ovgu(dogruCumle(t.hedef), setKutla);
      sonraki();
    } else {
      ilkDeneme.current = false;
      setSallanan(k);
      await konus(yanlisCumle(t.hedef, s, yanlisOlumsuzAcik()));
      setSallanan(null); setGizli(k);
      kilit.current = false;
    }
  };
  const sonraki = () => {
    if (i + 1 >= turlar.length) {
      setBitti(true);
      etkinlikSay(`Saat: ${BASLIK[tur]}`, 'bitti'); basariSay(`Saat: ${BASLIK[tur]}`, dogruSayisi.current, turlar.length);
    } else setI(i + 1);
  };
  const tekrar = () => { dogruSayisi.current = 0; setI(0); setBitti(false); setOturum(o => o + 1); };

  return (
    <OyunCercevesi baslik={BASLIK[tur]} emoji="🕒" onBack={onBack} adim={i + (bitti ? 1 : 0)} toplamAdim={turlar.length}
      yonerge={ogretiliyor && ogret ? ogret.cumle : soruCumlesi}>
      {ogretiliyor && ogret ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-3">
          <button onClick={() => speak(ogret.cumle)} className="w-full max-w-[20rem] aspect-square rounded-[2rem] bg-white shadow-xl p-2 active:scale-95" aria-label={ogret.cumle}>
            <SaatYuzu saat={ogret.saat} vurgu="yelkovan" className="w-full h-full pointer-events-none" />
          </button>
          <span className="px-5 py-1 rounded-2xl bg-slate-800 text-emerald-300 font-mono text-4xl font-black tracking-widest shadow">{dijital(ogret.saat)}</span>
          <button onClick={() => setOgretiliyor(false)} className="px-8 py-3 rounded-2xl bg-emerald-500 text-white text-2xl font-black shadow-lg active:scale-95">Başla ▶</button>
        </div>
      ) : (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-3">
        {tur === 'dijitalSec' && (
          <button onClick={() => speak(DIJITAL_SORU)} className="w-full max-w-[16rem] aspect-square rounded-[2rem] bg-white shadow-xl p-2 active:scale-95" aria-label={DIJITAL_SORU}>
            <SaatYuzu saat={t.hedef} className="w-full h-full pointer-events-none" />
          </button>
        )}
        {tur === 'dijital' && (
          <button onClick={() => speak(soru(t.hedef))} className="px-6 py-2 rounded-2xl bg-slate-800 text-emerald-300 font-mono text-6xl font-black tracking-widest shadow-lg active:scale-95">
            {dijital(t.hedef)}
          </button>
        )}
        <div className="flex w-full justify-center gap-3 sm:gap-8">
          {t.secenekler.map((s, k) => (
            <button key={`${i}-${k}`} onClick={() => sec(k)} disabled={gizli === k}
              className={`flex-1 max-w-[18rem] ${tur === 'dijitalSec' ? 'aspect-[2/1]' : 'aspect-square'} rounded-[2rem] bg-white shadow-xl p-2 transition-all duration-500 active:scale-95
                ${gizli === k ? 'opacity-0 scale-75 pointer-events-none' : ''} ${sallanan === k ? 'ok-sallan ring-4 ring-rose-300' : ''}
                ${kutla && ayni(s, t.hedef) ? 'ring-8 ring-emerald-300' : ''}`}
              aria-label={`Saat ${soyle(s)}`}>
              {tur === 'dijitalSec'
                ? <span className="flex h-full items-center justify-center rounded-[1.5rem] bg-slate-800 text-emerald-300 font-mono text-5xl sm:text-6xl font-black tracking-widest">{dijital(s)}</span>
                : <SaatYuzu saat={s} className="w-full h-full" />}
            </button>
          ))}
        </div>
      </div>
      )}
      <Kutlama acik={kutla} alt />
      {bitti && <OyunSonu onTekrar={tekrar} onBack={onBack} />}
    </OyunCercevesi>
  );
};

// ---------------------------------------------------------------- Saati kur (ibreleri parmakla çevir)
export type KurTuru = 'kurTam' | 'kurCeyrek';
const KUR_SAYISI = 6;
const KUR_BASLIK: Record<KurTuru, string> = { kurTam: 'Tam Saati Kur', kurCeyrek: 'Buçuk, Çeyrek Kur' };

export const SaatKur: React.FC<{ tur: KurTuru; onBack: () => void }> = ({ tur, onBack }) => {
  const tam = tur === 'kurTam';
  const hedefUret = (): Saat => ({ h: rastgeleSaat(), m: tam ? 0 : [0, 15, 30, 45][zar(4)] });
  const [oturum, setOturum] = useState(0);
  const hedefler = useMemo(() => {
    const l: Saat[] = [];
    while (l.length < KUR_SAYISI) { const s = hedefUret(); if (!l.some(x => ayni(x, s))) l.push(s); }
    return l;
  }, [tur, oturum]); // eslint-disable-line react-hooks/exhaustive-deps
  const [i, setI] = useState(0);
  const hedef = hedefler[i];
  const [saat, setSaat] = useState<Saat>({ h: 12, m: 0 });
  const [ipucu, setIpucu] = useState(false);
  const [kutla, setKutla] = useState(false);
  const [bitti, setBitti] = useState(false);
  const [sallan, setSallan] = useState(false);
  const kilit = useRef(false);
  const ilkDeneme = useRef(true);
  const dogruSayisi = useRef(0);

  useEffect(() => { etkinlikSay(`Saat: ${KUR_BASLIK[tur]}`, 'acildi'); }, [tur]);
  useEffect(() => {
    // Başlangıç: hedeften uzak bir saat (çocuk ibreyi gerçekten çevirsin)
    setSaat({ h: (hedef.h + 5 + zar(3)) % 12 + 1, m: tam ? 0 : (hedef.m + 30) % 60 });
    setIpucu(false); ilkDeneme.current = true; kilit.current = false;
    const z = setTimeout(() => speak(kurCumle(hedef)), 400);
    return () => clearTimeout(z);
  }, [hedef]); // eslint-disable-line react-hooks/exhaustive-deps

  const kontrol = async () => {
    if (kilit.current) return;
    kilit.current = true;
    if (ayni(saat, hedef)) {
      if (ilkDeneme.current) dogruSayisi.current++;
      await ovgu(dogruCumle(hedef), setKutla);
      sonraki();
    } else {
      ilkDeneme.current = false;
      setSallan(true);
      await konus(yanlisCumle(hedef, saat, yanlisOlumsuzAcik()));
      setSallan(false);
      setIpucu(true); // hedef ibreler soluk görünür
      kilit.current = false;
    }
  };
  const sonraki = () => {
    if (i + 1 >= hedefler.length) {
      setBitti(true);
      etkinlikSay(`Saat: ${KUR_BASLIK[tur]}`, 'bitti'); basariSay(`Saat: ${KUR_BASLIK[tur]}`, dogruSayisi.current, hedefler.length);
    } else setI(i + 1);
  };
  const tekrar = () => { dogruSayisi.current = 0; setI(0); setBitti(false); setOturum(o => o + 1); };

  return (
    <OyunCercevesi baslik={KUR_BASLIK[tur]} emoji="👆" onBack={onBack} adim={i + (bitti ? 1 : 0)} toplamAdim={hedefler.length}
      yonerge={`${kurCumle(hedef)} ${tam ? 'Kırmızı akrebi çevir.' : 'İbreleri çevir.'}`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-3">
        <div className={`w-full max-w-[22rem] aspect-square rounded-[2rem] bg-white shadow-xl p-2 ${sallan ? 'ok-sallan ring-4 ring-rose-300' : ''} ${kutla ? 'ring-8 ring-emerald-300' : ''}`}>
          <SaatYuzu saat={saat} surukle={tam ? 'akrep' : 'ikisi'} adim={tam ? 60 : 15} onDegis={setSaat}
            hayalet={ipucu ? hedef : null} vurgu={ipucu ? null : (tam ? 'akrep' : 'yelkovan')} className="w-full h-full" />
        </div>
        <button onClick={kontrol} className="px-10 py-4 rounded-3xl bg-emerald-500 text-white text-3xl font-black shadow-lg active:scale-95">Tamam ✓</button>
      </div>
      <Kutlama acik={kutla} alt />
      {bitti && <OyunSonu onTekrar={tekrar} onBack={onBack} />}
    </OyunCercevesi>
  );
};

// ---------------------------------------------------------------- Akrep ve yelkovan (tanıtım + "Akrep hangisi?")
// İbreler birbirinden uzak dursun (dokununca karışmasın): akrep h'de, yelkovan karşı tarafta
const aciFarki = (a: number, b: number) => { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; };
const ayrikSaat = (): Saat => {
  const h = rastgeleSaat();
  const adaylar = [0, 15, 30, 45].map(m => ({ h, m })).sort((a, b) => aciFarki(b.m * 6, (h % 12) * 30 + b.m / 2) - aciFarki(a.m * 6, (h % 12) * 30 + a.m / 2));
  return adaylar[zar(2)];
};

export const SaatTani: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [asama, setAsama] = useState<0 | 1 | 2>(0); // 0: akrep tanıtımı, 1: yelkovan tanıtımı, 2: sorular
  const [oturum, setOturum] = useState(0);
  const sorular = useMemo(() => karistir<Ibre>(['akrep', 'akrep', 'akrep', 'yelkovan', 'yelkovan', 'yelkovan']).map(ibre => ({ ibre, saat: ayrikSaat() })), [oturum]);
  const [i, setI] = useState(0);
  const [kutla, setKutla] = useState(false);
  const [bitti, setBitti] = useState(false);
  const [yanlisIbre, setYanlisIbre] = useState<Ibre | null>(null);
  const kilit = useRef(false);
  const ilkDeneme = useRef(true);
  const dogruSayisi = useRef(0);
  const tanitim = { akrep: 'Bu akrep. Kısa ve kırmızı. Saati gösterir.', yelkovan: 'Bu yelkovan. Uzun ve mavi. Dakikayı gösterir.' };
  const soruCumle = (ib: Ibre) => `${ib === 'akrep' ? 'Akrep' : 'Yelkovan'} hangisi? Dokun.`;
  const q = sorular[i];

  useEffect(() => { etkinlikSay('Saat: Akrep ve Yelkovan', 'acildi'); }, []);
  useEffect(() => {
    const z = setTimeout(() => speak(asama === 0 ? tanitim.akrep : asama === 1 ? tanitim.yelkovan : soruCumle(q.ibre)), 400);
    return () => clearTimeout(z);
  }, [asama, i]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { ilkDeneme.current = true; kilit.current = false; setYanlisIbre(null); }, [i]);

  const dokun = async (ib: Ibre) => {
    if (asama < 2) { speak(tanitim[ib]); return; }
    if (kilit.current) return;
    kilit.current = true;
    if (ib === q.ibre) {
      if (ilkDeneme.current) dogruSayisi.current++;
      await ovgu(`Evet! Bu ${ib}.`, setKutla);
      sonraki();
    } else {
      ilkDeneme.current = false;
      setYanlisIbre(ib);
      await konus(yanlisOlumsuzAcik() ? `Hayır, bu ${q.ibre} değil.` : `Hayır, bu ${ib}.`);
      kilit.current = false;
    }
  };
  const sonraki = () => {
    if (i + 1 >= sorular.length) { setBitti(true); etkinlikSay('Saat: Akrep ve Yelkovan', 'bitti'); basariSay('Saat: Akrep ve Yelkovan', dogruSayisi.current, sorular.length); }
    else setI(i + 1);
  };
  const tekrar = () => { dogruSayisi.current = 0; setI(0); setBitti(false); setAsama(2); setOturum(o => o + 1); };

  const tanitimda = asama < 2;
  return (
    <OyunCercevesi baslik="Akrep ve Yelkovan" emoji="⏰" onBack={onBack}
      adim={tanitimda ? undefined : i + (bitti ? 1 : 0)} toplamAdim={tanitimda ? undefined : sorular.length}
      yonerge={asama === 0 ? tanitim.akrep : asama === 1 ? tanitim.yelkovan : soruCumle(q.ibre)}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-3">
        <div className={`w-full max-w-[22rem] aspect-square rounded-[2rem] bg-white shadow-xl p-2 ${kutla ? 'ring-8 ring-emerald-300' : ''}`}>
          <SaatYuzu saat={tanitimda ? { h: 3, m: 0 } : q.saat} onIbreDokun={dokun}
            vurgu={asama === 0 ? 'akrep' : asama === 1 ? 'yelkovan' : (yanlisIbre ? q.ibre : null)} className="w-full h-full" />
        </div>
        {tanitimda && (
          <button onClick={() => setAsama(asama === 0 ? 1 : 2)} className="px-8 py-3 rounded-2xl bg-emerald-500 text-white text-2xl font-black shadow-lg active:scale-95">Sonraki ▶</button>
        )}
      </div>
      <Kutlama acik={kutla} alt />
      {bitti && <OyunSonu onTekrar={tekrar} onBack={onBack} />}
    </OyunCercevesi>
  );
};

// ---------------------------------------------------------------- Saatle oyna (serbest: çevir, saat söylensin)
export const SerbestSaat: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [saat, setSaat] = useState<Saat>({ h: 3, m: 0 });
  useEffect(() => { etkinlikSay('Saat: Saatle Oyna', 'acildi'); }, []);
  return (
    <OyunCercevesi baslik="Saatle Oyna" emoji="🕹️" onBack={onBack} yonerge="İbreleri çevir. Saati söyleyeyim.">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-3">
        <div className="w-full max-w-[22rem] aspect-square rounded-[2rem] bg-white shadow-xl p-2">
          <SaatYuzu saat={saat} surukle="ikisi" adim={5} onDegis={setSaat} onBirak={s => speak(`Saat ${soyle(s)}.`)} className="w-full h-full" />
        </div>
        <button onClick={() => speak(`Saat ${soyle(saat)}.`)} className="flex flex-col items-center gap-1 active:scale-95">
          <span className="px-5 py-1 rounded-2xl bg-slate-800 text-emerald-300 font-mono text-5xl font-black tracking-widest shadow">{dijital(saat)}</span>
          <span className="text-2xl font-black text-slate-700">Saat {soyle(saat)}</span>
        </button>
      </div>
    </OyunCercevesi>
  );
};
