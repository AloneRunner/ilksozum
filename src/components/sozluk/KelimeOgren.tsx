import React, { useEffect, useMemo, useRef, useState } from 'react';
import { OyunCercevesi, Kutlama, OyunSonu } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import { etkinlikSay, basariSay } from '../../services/sayac.ts';
import { trHangisi, trEvetBu, trHayirBuDegil } from '../../utils/trDil.ts';
import { kategoriOgeleri } from './KelimeKitabi.tsx';
import { karisabilir, genelKelime } from '../../data/karisabilir.ts';
import { ilkKelimelerOnde } from '../../data/ilkKelimeler.ts';

// Kelime Öğren (Gökhan Hoca, 2026-10-28): "Direkt soru ile başlamasın: önce bütün meyvelerle çalışma sayfası, sonra soru.
// Hep elma sorulsun, diğer 3 meyve değişsin, yerleri karışsın; %80 doğru olunca diğer meyveye geçsin.
// Öğrenilen meyve karışık havuza girsin; 20'lik karışık mod." (ayrık denemelerle öğretim)
// Kategoriye dokununca bu sayfa açılır; eski 8 soruluk test "Hızlı Sorular" olarak durur. Program Modu etkilenmez.

interface Oge { kelime: string; url: string }
// sonuclar: sıradaki kelimenin ilk deneme sonuçları; secili: ailenin seçtiği başlangıç kelimesi (Gökhan Hoca: "isteyen istediği meyveden başlasın")
interface Kayit { ogrenilen: string[]; sonuclar: boolean[]; secili?: string }
const siradakiBul = (ogeler: Oge[], k: Kayit): Oge | null =>
  ogeler.find(o => o.kelime === k.secili && !k.ogrenilen.includes(o.kelime)) || ogeler.find(o => !k.ogrenilen.includes(o.kelime)) || null;

const OGREN_TUR = 10;        // bir oturumda deneme
const KARISIK_TUR = 20;
const PENCERE = 5, ESIK = 4; // son 5 denemede 4 doğru (%80) → öğrenildi

const zar = (n: number) => Math.floor(Math.random() * n);
const karistir = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = zar(i + 1); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const buyuk = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);
const bekle = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
const konus = (m: string) => Promise.race([speak(m), bekle(4500)]);
// "elma" / "yeşil elma" gibi birbirini içeren kelimeler aynı soruda çeldirici olmasın
// Benzer görselli gruplar (lego / yapı blokları / oyuncaklar…) da birlikte çıkmaz: data/karisabilir.ts
const cakisir = (a: string, b: string) => a === b || a.includes(b) || b.includes(a) || karisabilir(a, b);

const profil = () => { try { return JSON.parse(localStorage.getItem('activeProfileId_v1') || 'null') || 'misafir'; } catch { return 'misafir'; } };
const anahtar = (kat: string) => `kelimeOgren_${profil()}_${kat}`;
const oku = (kat: string): Kayit => { try { return { ogrenilen: [], sonuclar: [], ...JSON.parse(localStorage.getItem(anahtar(kat)) || '{}') }; } catch { return { ogrenilen: [], sonuclar: [] }; } };
const yaz = (kat: string, k: Kayit) => { try { localStorage.setItem(anahtar(kat), JSON.stringify(k)); } catch { /* yok say */ } };

const secenekler = (hedef: Oge, havuz: Oge[]): Oge[] => {
  const cel: Oge[] = [];
  for (const o of karistir(havuz)) {
    if (cel.length >= 3) break;
    if (cakisir(o.kelime, hedef.kelime) || cel.some(c => cakisir(c.kelime, o.kelime))) continue;
    cel.push(o);
  }
  return karistir([hedef, ...cel]);
};

// ---------------------------------------------------------------- tek soru (hedef + 3 çeldirici, hatasız öğrenme)
const Soru: React.FC<{ hedef: Oge; ogeler: Oge[]; onCevap: (ilkDeneme: boolean) => void }> = ({ hedef, ogeler, onCevap }) => {
  const [gizli, setGizli] = useState<string[]>([]);
  const [sallanan, setSallanan] = useState<string | null>(null);
  const [kutla, setKutla] = useState(false);
  const kilit = useRef(false);
  const ilk = useRef(true);

  useEffect(() => { const z = setTimeout(() => speak(trHangisi(hedef.kelime)), 400); return () => clearTimeout(z); }, [hedef, ogeler]);

  const sec = async (o: Oge) => {
    if (kilit.current || gizli.includes(o.kelime)) return;
    kilit.current = true;
    if (o.kelime === hedef.kelime) {
      // Övgü sırası: ton → söz → sonraki (konuşma üst üste binmesin)
      setKutla(true); await bekle(700); await konus(trEvetBu(hedef.kelime)); await bekle(300); setKutla(false);
      onCevap(ilk.current);
    } else {
      ilk.current = false;
      setSallanan(o.kelime);
      await konus(trHayirBuDegil(hedef.kelime));
      setSallanan(null); setGizli(g => [...g, o.kelime]);
      kilit.current = false;
    }
  };

  return (
    <>
      <div className="absolute inset-0 grid grid-cols-2 gap-3 p-3 content-center max-w-xl mx-auto">
        {ogeler.map(o => (
          <button key={o.kelime} onClick={() => sec(o)} disabled={gizli.includes(o.kelime)} aria-label={o.kelime}
            className={`aspect-square rounded-[2rem] bg-white shadow-xl p-2 transition-all duration-500 active:scale-95
              ${gizli.includes(o.kelime) ? 'opacity-0 scale-75 pointer-events-none' : ''} ${sallanan === o.kelime ? 'ok-sallan ring-4 ring-rose-300' : ''}
              ${kutla && o.kelime === hedef.kelime ? 'ring-8 ring-emerald-300' : ''}`}>
            <img src={o.url} alt={o.kelime} className="w-full h-full object-contain" draggable={false} />
          </button>
        ))}
      </div>
      <Kutlama acik={kutla} alt />
    </>
  );
};

// ---------------------------------------------------------------- ana sayfa ve akışlar
type Ekran = 'merkez' | 'tani' | 'ogren' | 'karisik';

const KelimeOgren: React.FC<{ katId: string; katAd: string; onBack: () => void; onSorular: () => void }> = ({ katId, katAd, onBack, onSorular }) => {
  const hepsi = useMemo(() => ilkKelimelerOnde(kategoriOgeleri(katId)), [katId]);
  // "Oyuncaklar hangisi?" gibi genel kelimeler soru ve şık olmaz; Tanı sayfasında görünür
  const ogeler = useMemo(() => hepsi.filter(o => !genelKelime(o.kelime)), [hepsi]);
  const [kayit, setKayit] = useState<Kayit>(() => oku(katId));
  const [ekran, setEkran] = useState<Ekran>('merkez');
  const kaydet = (k: Kayit) => { setKayit(k); yaz(katId, k); };

  const ogrenilenler = ogeler.filter(o => kayit.ogrenilen.includes(o.kelime));
  const siradaki = siradakiBul(ogeler, kayit);
  const sifirla = () => { if (window.confirm(`${katAd}: öğrenilen kelimeler sıfırlansın mı?`)) kaydet({ ogrenilen: [], sonuclar: [] }); };
  // Başka kelime seçilince o kelimenin deneme penceresi baştan başlar
  const baslangicSec = (kelime: string) => { if (kelime !== siradaki?.kelime) kaydet({ ...kayit, secili: kelime, sonuclar: [] }); };
  const ogrenilmemis = ogeler.filter(o => !kayit.ogrenilen.includes(o.kelime));

  if (ekran === 'tani') return <Tani katAd={katAd} ogeler={hepsi} onBack={() => setEkran('merkez')}
    onBasla={(k) => { if (k && ogrenilmemis.some(o => o.kelime === k)) baslangicSec(k); setEkran('ogren'); }} />;
  if (ekran === 'ogren' && siradaki) return <TekTekOgren katAd={katAd} ogeler={ogeler} kayit={kayit} kaydet={kaydet} onBack={() => setEkran('merkez')} />;
  if (ekran === 'karisik' && ogrenilenler.length >= 2) return <KarisikTekrar katAd={katAd} ogeler={ogeler} havuz={ogrenilenler} onBack={() => setEkran('merkez')} />;

  const kart = 'w-full flex items-center gap-3 rounded-3xl bg-white p-4 shadow-md text-left active:scale-[.98] transition-transform disabled:opacity-50';
  return (
    <OyunCercevesi baslik={katAd} emoji="📚" onBack={onBack}>
      <div className="absolute inset-0 overflow-y-auto px-3 pb-6 space-y-3 pt-2 max-w-xl mx-auto">
        <button className={kart} onClick={() => setEkran('tani')}>
          <span className="text-4xl">📖</span>
          <span><span className="block text-xl font-black text-slate-800">Tanı</span><span className="text-sm text-slate-500">Bütün {katAd.toLocaleLowerCase('tr-TR')}, dokun ve dinle</span></span>
        </button>
        <button className={kart} onClick={() => setEkran('ogren')} disabled={!siradaki}>
          {siradaki ? <img src={siradaki.url} alt="" className="w-14 h-14 object-contain" /> : <span className="text-4xl">🎉</span>}
          <span className="flex-1">
            <span className="block text-xl font-black text-slate-800">Tek Tek Öğren</span>
            <span className="text-sm text-slate-500">{siradaki ? `Sıradaki: ${buyuk(siradaki.kelime)}` : 'Hepsi öğrenildi!'} · {ogrenilenler.length} / {ogeler.length} öğrenildi</span>
          </span>
        </button>
        {ogrenilmemis.length > 1 && (
          <div className="rounded-3xl bg-white/70 p-3">
            <div className="text-sm font-bold text-slate-600 mb-2">Hangi kelimeyle başlayalım? (dokunun)</div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {ogrenilmemis.map(o => (
                <button key={o.kelime} onClick={() => baslangicSec(o.kelime)} title={o.kelime}
                  className={`shrink-0 w-16 rounded-xl bg-white p-1 shadow-sm active:scale-95 ${o.kelime === siradaki?.kelime ? 'ring-4 ring-emerald-400' : ''}`}>
                  <img src={o.url} alt={o.kelime} className="w-full aspect-square object-contain" draggable={false} />
                  <span className="block truncate text-[11px] font-bold text-slate-600">{o.kelime}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        <button className={kart} onClick={() => setEkran('karisik')} disabled={ogrenilenler.length < 2}>
          <span className="text-4xl">🔀</span>
          <span><span className="block text-xl font-black text-slate-800">Karışık Tekrar</span>
            <span className="text-sm text-slate-500">{ogrenilenler.length >= 2 ? `Öğrenilen ${ogrenilenler.length} kelimeden ${KARISIK_TUR} soru` : 'En az 2 kelime öğrenilince açılır'}</span></span>
        </button>
        <button className={kart} onClick={onSorular}>
          <span className="text-4xl">❓</span>
          <span><span className="block text-xl font-black text-slate-800">Hızlı Sorular</span><span className="text-sm text-slate-500">Bütün kelimelerden 8 soru</span></span>
        </button>
        {ogrenilenler.length > 0 && (
          <div className="rounded-3xl bg-white/70 p-3">
            <div className="text-sm font-bold text-slate-600 mb-2">Öğrenilenler</div>
            <div className="flex flex-wrap gap-2">
              {ogrenilenler.map(o => <img key={o.kelime} src={o.url} alt={o.kelime} title={o.kelime} className="w-12 h-12 object-contain rounded-xl bg-white shadow-sm" />)}
            </div>
            <button onClick={sifirla} className="mt-3 text-xs font-bold text-slate-400 underline">İlerlemeyi sıfırla</button>
          </div>
        )}
      </div>
    </OyunCercevesi>
  );
};

// Çalışma sayfası: bütün kelimeler; dokununca adı söylenir
const Tani: React.FC<{ katAd: string; ogeler: Oge[]; onBack: () => void; onBasla: (secili: string | null) => void }> = ({ katAd, ogeler, onBack, onBasla }) => {
  const [secili, setSecili] = useState<string | null>(null);
  useEffect(() => { etkinlikSay(`Kelime Tanı: ${katAd}`, 'acildi'); }, [katAd]);
  return (
    <OyunCercevesi baslik={katAd} emoji="📖" onBack={onBack} yonerge="Resme dokun, adını dinle.">
      <div className="absolute inset-0 overflow-y-auto px-3 pb-24">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-w-2xl mx-auto">
          {ogeler.map(o => (
            <button key={o.kelime} onClick={() => { setSecili(o.kelime); speak(buyuk(o.kelime)); }}
              className={`flex flex-col items-center rounded-2xl bg-white p-1.5 shadow active:scale-95 ${secili === o.kelime ? 'ring-4 ring-amber-300' : ''}`}>
              <img src={o.url} alt={o.kelime} className="w-full aspect-square object-contain" draggable={false} />
              <span className="text-sm font-bold text-slate-700">{buyuk(o.kelime)}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="absolute bottom-3 inset-x-0 flex justify-center">
        <button onClick={() => onBasla(secili)} className="px-8 py-3 rounded-2xl bg-emerald-500 text-white text-2xl font-black shadow-lg active:scale-95">
          {secili ? `${buyuk(secili)} ile başla ▶` : 'Öğrenmeye başla ▶'}
        </button>
      </div>
    </OyunCercevesi>
  );
};

// Tek hedef: hep aynı kelime sorulur, çeldiriciler ve yerler değişir; son 5'te 4 doğru → öğrenildi, sıradakine geçilir
const TekTekOgren: React.FC<{ katAd: string; ogeler: Oge[]; kayit: Kayit; kaydet: (k: Kayit) => void; onBack: () => void }> = ({ katAd, ogeler, kayit, kaydet, onBack }) => {
  const hedef = siradakiBul(ogeler, kayit);
  const [tanit, setTanit] = useState(true);   // yeni hedef önce tek başına gösterilir
  const [n, setN] = useState(0);              // bu oturumdaki deneme
  const [sec, setSec] = useState<Oge[]>([]);
  const [bitti, setBitti] = useState(false);
  const [ogrendi, setOgrendi] = useState<string | null>(null);
  const dogru = useRef(0);

  useEffect(() => { etkinlikSay(`Kelime Öğren: ${katAd}`, 'acildi'); }, [katAd]);
  useEffect(() => { if (hedef) setSec(secenekler(hedef, ogeler)); }, [hedef?.kelime, n]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!tanit || !hedef) return;
    const z = setTimeout(() => speak(buyuk(hedef.kelime)), 400);
    return () => clearTimeout(z);
  }, [tanit, hedef?.kelime]); // eslint-disable-line react-hooks/exhaustive-deps

  const oturumSonu = () => { setBitti(true); etkinlikSay(`Kelime Öğren: ${katAd}`, 'bitti'); basariSay(`Kelime Öğren: ${katAd}`, dogru.current, n + 1); };

  const cevap = async (ilkDeneme: boolean) => {
    if (!hedef) return;
    if (ilkDeneme) dogru.current++;
    const sonuclar = [...kayit.sonuclar, ilkDeneme].slice(-PENCERE);
    const tamam = sonuclar.length >= PENCERE && sonuclar.filter(Boolean).length >= ESIK;
    if (tamam) {
      kaydet({ ogrenilen: [...kayit.ogrenilen, hedef.kelime], sonuclar: [] });
      setOgrendi(hedef.kelime);
      await konus('Aferin! Yeni bir kelime öğrendin.');
      setOgrendi(null);
      if (n + 1 >= OGREN_TUR || ogeler.every(o => o.kelime === hedef.kelime || kayit.ogrenilen.includes(o.kelime))) { oturumSonu(); return; }
      setTanit(true); setN(n + 1);
      return;
    }
    kaydet({ ...kayit, sonuclar });
    if (n + 1 >= OGREN_TUR) { oturumSonu(); return; }
    setN(n + 1);
  };
  const devam = () => { dogru.current = 0; setN(0); setBitti(false); setTanit(true); };

  if (!hedef) return <OyunCercevesi baslik={katAd} emoji="🎉" onBack={onBack}><OyunSonu onTekrar={onBack} onBack={onBack} /></OyunCercevesi>;
  return (
    <OyunCercevesi baslik={`${katAd}: ${buyuk(hedef.kelime)}`} emoji="🎯" onBack={onBack}
      adim={tanit ? undefined : n + (bitti ? 1 : 0)} toplamAdim={tanit ? undefined : OGREN_TUR}
      yonerge={tanit ? buyuk(hedef.kelime) : trHangisi(hedef.kelime)}>
      {tanit ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6">
          <button onClick={() => speak(buyuk(hedef.kelime))} className="bg-white rounded-[2rem] shadow-xl p-6 active:scale-95" style={{ animation: 'ok-yildiz .5s ease-out both' }}>
            <img src={hedef.url} alt={hedef.kelime} className="w-56 h-56 object-contain" draggable={false} />
          </button>
          <span className="text-4xl font-black text-slate-800">{buyuk(hedef.kelime)}</span>
          <button onClick={() => setTanit(false)} className="px-8 py-3 rounded-2xl bg-emerald-500 text-white text-2xl font-black shadow-lg active:scale-95">Başla ▶</button>
        </div>
      ) : sec.length > 0 && <Soru key={`${hedef.kelime}-${n}`} hedef={hedef} ogeler={sec} onCevap={cevap} />}
      {ogrendi && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-white/85">
          <span className="text-7xl ok-zipla">🌟</span>
          <span className="text-3xl font-black text-emerald-600">{buyuk(ogrendi)} öğrenildi!</span>
        </div>
      )}
      {bitti && <OyunSonu onTekrar={devam} onBack={onBack} />}
    </OyunCercevesi>
  );
};

// Karışık tekrar: öğrenilen kelimeler hedef, çeldiriciler kategorinin bütün kelimelerinden
const KarisikTekrar: React.FC<{ katAd: string; ogeler: Oge[]; havuz: Oge[]; onBack: () => void }> = ({ katAd, ogeler, havuz, onBack }) => {
  const [oturum, setOturum] = useState(0);
  const sira = useMemo(() => {
    const l: Oge[] = [];
    while (l.length < KARISIK_TUR) { const o = havuz[zar(havuz.length)]; if (l[l.length - 1]?.kelime !== o.kelime) l.push(o); }
    return l.map(h => ({ hedef: h, sec: secenekler(h, ogeler) }));
  }, [havuz, ogeler, oturum]);
  const [i, setI] = useState(0);
  const [bitti, setBitti] = useState(false);
  const dogru = useRef(0);
  useEffect(() => { etkinlikSay(`Karışık Tekrar: ${katAd}`, 'acildi'); }, [katAd]);
  const cevap = (ilkDeneme: boolean) => {
    if (ilkDeneme) dogru.current++;
    if (i + 1 >= sira.length) { setBitti(true); etkinlikSay(`Karışık Tekrar: ${katAd}`, 'bitti'); basariSay(`Karışık Tekrar: ${katAd}`, dogru.current, sira.length); }
    else setI(i + 1);
  };
  const t = sira[i];
  return (
    <OyunCercevesi baslik={`${katAd}: Karışık`} emoji="🔀" onBack={onBack} adim={i + (bitti ? 1 : 0)} toplamAdim={sira.length} yonerge={trHangisi(t.hedef.kelime)}>
      <Soru key={`${oturum}-${i}`} hedef={t.hedef} ogeler={t.sec} onCevap={cevap} />
      {bitti && <OyunSonu onTekrar={() => { dogru.current = 0; setI(0); setBitti(false); setOturum(o => o + 1); }} onBack={onBack} />}
    </OyunCercevesi>
  );
};

export default KelimeOgren;
