import React, { useEffect, useMemo, useRef, useState } from 'react';
import { OyunCercevesi, Kutlama, OyunSonu } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import { etkinlikSay, basariSay } from '../../services/sayac.ts';
import { trHangisi, trEvetBu, trHayirBuDegil } from '../../utils/trDil.ts';
import { kategoriOgeleri } from './KelimeKitabi.tsx';
import { karisabilir, genelKelime } from '../../data/karisabilir.ts';
import { ilkKelimelerOnde } from '../../data/ilkKelimeler.ts';

// Kelime Öğren (Gökhan Hoca, 2026-10-28): "Direkt soru ile başlamasın: önce bütün meyvelerle çalışma sayfası, sonra soru.
// Hep elma sorulsun, diğer meyveler değişsin, yerleri karışsın." (ayrık denemelerle öğretim)
// 2026-10-29 düzeltmesi: her kelime 2 şık × 10 → 3 şık × 10 → 4 şık × 10; her aşamada 10'da 8 ilk denemede doğru → sonraki aşama,
// 4 şık geçilince kelime öğrenildi, sıradakine geçilir. İki kez üst üste geçemezse bir önceki aşama. "Karışık Tekrar" yerine
// bütün kelimelerden 2'li / 3'lü / 4'lü tekrar; Hızlı Sorular karışık 20 soru.
// Kategoriye dokununca bu sayfa açılır; eski test "Hızlı Sorular" olarak durur. Program Modu etkilenmez.

interface Oge { kelime: string; url: string }
// asama: sıradaki kelimenin aşaması (0: 2 şık, 1: 3 şık, 2: 4 şık); hata: o aşamada üst üste geçilemeyen oturum
// secili: ailenin seçtiği başlangıç kelimesi (Gökhan Hoca: "isteyen istediği meyveden başlasın")
interface Kayit { ogrenilen: string[]; asama?: number; hata?: number; secili?: string }
const siradakiBul = (ogeler: Oge[], k: Kayit): Oge | null =>
  ogeler.find(o => o.kelime === k.secili && !k.ogrenilen.includes(o.kelime)) || ogeler.find(o => !k.ogrenilen.includes(o.kelime)) || null;

const ASAMA_TUR = 10, GECME = 8;  // her aşama 10 soru, 8 ilk denemede doğru → sonraki
const SIK = [2, 3, 4];            // aşamaların şık sayısı
const TEKRAR_TUR = 20;

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
const oku = (kat: string): Kayit => { try { return { ogrenilen: [], ...JSON.parse(localStorage.getItem(anahtar(kat)) || '{}') }; } catch { return { ogrenilen: [] }; } };
const yaz = (kat: string, k: Kayit) => { try { localStorage.setItem(anahtar(kat), JSON.stringify(k)); } catch { /* yok say */ } };

// hedef + (sik - 1) çeldirici; "kullanilan"daki çeldiriciler sona atılır, böylece 10 soruda hedef hep başka kelimelerle karşılaşır
const secenekler = (hedef: Oge, havuz: Oge[], sik = 4, kullanilan?: Set<string>): Oge[] => {
  const cel: Oge[] = [];
  const sira = karistir(havuz).sort((x, y) => Number(kullanilan?.has(x.kelime) ?? 0) - Number(kullanilan?.has(y.kelime) ?? 0));
  for (const o of sira) {
    if (cel.length >= sik - 1) break;
    if (cakisir(o.kelime, hedef.kelime) || cel.some(c => cakisir(c.kelime, o.kelime))) continue;
    cel.push(o);
  }
  cel.forEach(c => kullanilan?.add(c.kelime));
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
      <div className={`absolute inset-0 grid grid-cols-2 gap-3 p-3 content-center mx-auto ${ogeler.length === 3 ? 'max-w-xl landscape:grid-cols-3 landscape:max-w-3xl' : 'max-w-xl'}`}>
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
type Ekran = 'merkez' | 'tani' | 'ogren' | 2 | 3 | 4;
const tekrarAd = (n: number) => (n === 2 ? "2'li" : n === 3 ? "3'lü" : "4'lü");

const KelimeOgren: React.FC<{ katId: string; katAd: string; onBack: () => void; onSorular: () => void }> = ({ katId, katAd, onBack, onSorular }) => {
  const hepsi = useMemo(() => ilkKelimelerOnde(kategoriOgeleri(katId)), [katId]);
  // "Oyuncaklar hangisi?" gibi genel kelimeler soru ve şık olmaz; Tanı sayfasında görünür
  const ogeler = useMemo(() => hepsi.filter(o => !genelKelime(o.kelime)), [hepsi]);
  const [kayit, setKayit] = useState<Kayit>(() => oku(katId));
  const [ekran, setEkran] = useState<Ekran>('merkez');
  const kaydet = (k: Kayit) => { setKayit(k); yaz(katId, k); };

  const ogrenilenler = ogeler.filter(o => kayit.ogrenilen.includes(o.kelime));
  const siradaki = siradakiBul(ogeler, kayit);
  const sifirla = () => { if (window.confirm(`${katAd}: öğrenilen kelimeler sıfırlansın mı?`)) kaydet({ ogrenilen: [] }); };
  // Başka kelime seçilince o kelime 2 şıktan başlar
  const baslangicSec = (kelime: string) => { if (kelime !== siradaki?.kelime) kaydet({ ogrenilen: kayit.ogrenilen, secili: kelime }); };
  const ogrenilmemis = ogeler.filter(o => !kayit.ogrenilen.includes(o.kelime));

  if (ekran === 'tani') return <Tani katAd={katAd} ogeler={hepsi} onBack={() => setEkran('merkez')}
    onBasla={(k) => { if (k && ogrenilmemis.some(o => o.kelime === k)) baslangicSec(k); setEkran('ogren'); }} />;
  if (ekran === 'ogren' && siradaki) return <TekTekOgren katAd={katAd} ogeler={ogeler} kayit={kayit} kaydet={kaydet} onBack={() => setEkran('merkez')} />;
  if (typeof ekran === 'number' && ogeler.length >= ekran) return <Tekrar katAd={katAd} ogeler={ogeler} sik={ekran} onBack={() => setEkran('merkez')} />;

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
            <span className="block text-sm text-slate-500">{siradaki ? `Sıradaki: ${buyuk(siradaki.kelime)} · ${SIK[kayit.asama || 0]} şık` : 'Hepsi öğrenildi!'} · {ogrenilenler.length} / {ogeler.length} öğrenildi</span>
            <span className="block text-xs text-slate-400">Her kelime 2 şık, 3 şık, 4 şık; her biri 10 soru, {GECME} doğru → sonraki</span>
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
        {SIK.filter(n => ogeler.length >= n).map(n => (
          <button key={n} className={kart} onClick={() => setEkran(n as 2 | 3 | 4)}>
            <span className="w-14 shrink-0 text-center text-3xl font-black text-sky-600">{n}</span>
            <span><span className="block text-xl font-black text-slate-800">{tekrarAd(n)} Tekrar</span>
              <span className="text-sm text-slate-500">Bütün kelimelerden {TEKRAR_TUR} soru, {n} şık</span></span>
          </button>
        ))}
        <button className={kart} onClick={onSorular}>
          <span className="text-4xl">❓</span>
          <span><span className="block text-xl font-black text-slate-800">Hızlı Sorular</span><span className="text-sm text-slate-500">Karışık · 20 soru</span></span>
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

// Tek hedef: hep aynı kelime sorulur, çeldiriciler ve yerler değişir. Aşama = 10 soru (2, 3, sonra 4 şık); 8 ilk denemede
// doğru → sonraki aşama; 4 şık geçilince kelime öğrenildi. İki kez üst üste geçemezse bir önceki aşama (Gökhan Hoca).
const TekTekOgren: React.FC<{ katAd: string; ogeler: Oge[]; kayit: Kayit; kaydet: (k: Kayit) => void; onBack: () => void }> = ({ katAd, ogeler, kayit, kaydet, onBack }) => {
  const hedef = siradakiBul(ogeler, kayit);
  const asama = Math.min(kayit.asama || 0, SIK.length - 1);
  const sik = Math.min(SIK[asama], ogeler.length);
  const [tanit, setTanit] = useState(true);   // kelime önce tek başına gösterilir
  const [n, setN] = useState(0);              // aşamadaki soru
  const [sec, setSec] = useState<Oge[]>([]);
  const [ara, setAra] = useState<string | null>(null); // aşama sonu mesajı
  const [ogrendi, setOgrendi] = useState<string | null>(null);
  const dogru = useRef(0);
  const kullanilan = useRef(new Set<string>());

  useEffect(() => { etkinlikSay(`Kelime Öğren: ${katAd}`, 'acildi'); }, [katAd]);
  useEffect(() => { if (hedef) setSec(secenekler(hedef, ogeler, sik, kullanilan.current)); }, [hedef?.kelime, n, sik]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!tanit || !hedef) return;
    const z = setTimeout(() => speak(buyuk(hedef.kelime)), 400);
    return () => clearTimeout(z);
  }, [tanit, hedef?.kelime]); // eslint-disable-line react-hooks/exhaustive-deps

  const cevap = async (ilkDeneme: boolean) => {
    if (!hedef) return;
    if (ilkDeneme) dogru.current++;
    if (n + 1 < ASAMA_TUR) { setN(n + 1); return; }
    const d = dogru.current, ad = `${buyuk(hedef.kelime)} · ${SIK[asama]} şık`;
    etkinlikSay(`Kelime Öğren: ${katAd}`, 'bitti'); basariSay(`Kelime Öğren: ${katAd}`, d, ASAMA_TUR);
    if (d >= GECME) {
      if (asama + 1 < SIK.length) {
        kaydet({ ...kayit, asama: asama + 1, hata: 0 });
        setAra(`✅ ${ad} geçildi (${d}/${ASAMA_TUR}). Şimdi ${SIK[asama + 1]} şık.`);
        return;
      }
      kaydet({ ogrenilen: [...kayit.ogrenilen, hedef.kelime] });
      setOgrendi(hedef.kelime);
      await konus('Aferin! Yeni bir kelime öğrendin.');
      setOgrendi(null);
      const kalan = ogeler.some(o => o.kelime !== hedef.kelime && !kayit.ogrenilen.includes(o.kelime));
      setAra(`🌟 ${buyuk(hedef.kelime)} öğrenildi (${d}/${ASAMA_TUR}).${kalan ? ' Sıradaki kelimeye geçiyoruz.' : ' Bütün kelimeler öğrenildi!'}`);
      return;
    }
    const hata = (kayit.hata || 0) + 1;
    if (hata >= 2) {
      kaydet({ ...kayit, asama: Math.max(0, asama - 1), hata: 0 });
      setAra(asama === 0 ? 'İki kez üst üste olmadı. Önce yeniden tanıyalım, sonra deneriz.' : `İki kez üst üste olmadı (${d}/${ASAMA_TUR}). ${SIK[asama - 1]} şıka dönüyoruz.`);
      return;
    }
    kaydet({ ...kayit, hata });
    setAra(`${ad}: ${d}/${ASAMA_TUR}. Geçmek için ${GECME} gerekiyor; bir daha çalışalım.`);
  };
  // Sonraki oturum: yeni kelimede ya da 2 şıka dönüşte önce kelime tek başına gösterilir
  const devam = () => { dogru.current = 0; kullanilan.current = new Set(); setN(0); setAra(null); setTanit((kayit.asama || 0) === 0); };

  if (!hedef) return <OyunCercevesi baslik={katAd} emoji="🎉" onBack={onBack}><OyunSonu onTekrar={onBack} onBack={onBack} /></OyunCercevesi>;
  return (
    <OyunCercevesi baslik={`${katAd}: ${buyuk(hedef.kelime)} · ${SIK[asama]} şık`} emoji="🎯" onBack={onBack}
      adim={tanit || ara ? undefined : n} toplamAdim={tanit || ara ? undefined : ASAMA_TUR}
      yonerge={tanit ? buyuk(hedef.kelime) : trHangisi(hedef.kelime)}>
      {ara ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
          <img src={hedef.url} alt="" className="w-32 h-32 object-contain" draggable={false} />
          <p className="max-w-md text-2xl font-black text-slate-800">{ara}</p>
          <div className="flex gap-3">
            <button onClick={onBack} className="px-6 py-3 rounded-2xl bg-slate-200 text-slate-700 text-xl font-black active:scale-95">Çık</button>
            <button onClick={devam} className="px-8 py-3 rounded-2xl bg-emerald-500 text-white text-2xl font-black shadow-lg active:scale-95">Devam ▶</button>
          </div>
        </div>
      ) : tanit ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6">
          <button onClick={() => speak(buyuk(hedef.kelime))} className="bg-white rounded-[2rem] shadow-xl p-6 active:scale-95" style={{ animation: 'ok-yildiz .5s ease-out both' }}>
            <img src={hedef.url} alt={hedef.kelime} className="w-56 h-56 object-contain" draggable={false} />
          </button>
          <span className="text-4xl font-black text-slate-800">{buyuk(hedef.kelime)}</span>
          <button onClick={() => setTanit(false)} className="px-8 py-3 rounded-2xl bg-emerald-500 text-white text-2xl font-black shadow-lg active:scale-95">Başla ▶</button>
        </div>
      ) : sec.length > 0 && <Soru key={`${hedef.kelime}-${asama}-${n}`} hedef={hedef} ogeler={sec} onCevap={cevap} />}
      {ogrendi && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-white/85">
          <span className="text-7xl ok-zipla">🌟</span>
          <span className="text-3xl font-black text-emerald-600">{buyuk(ogrendi)} öğrenildi!</span>
        </div>
      )}
    </OyunCercevesi>
  );
};

// 2'li / 3'lü / 4'lü tekrar (Gökhan Hoca): bütün kelimeler sırayla hedef olur (her kelime bir kez, sonra yeniden);
// ilk denemede yanlış olan kelime 3 soru sonra yeniden sorulur
const Tekrar: React.FC<{ katAd: string; ogeler: Oge[]; sik: number; onBack: () => void }> = ({ katAd, ogeler, sik, onBack }) => {
  const kur = () => {
    const l: Oge[] = [];
    while (l.length < TEKRAR_TUR) for (const o of karistir(ogeler)) { if (l.length < TEKRAR_TUR && l[l.length - 1]?.kelime !== o.kelime) l.push(o); }
    return l;
  };
  const [sira, setSira] = useState<Oge[]>(kur);
  const [i, setI] = useState(0);
  const [bitti, setBitti] = useState(false);
  const dogru = useRef(0);
  const ad = `${tekrarAd(sik)} Tekrar: ${katAd}`;
  const t = sira[i];
  const sec = useMemo(() => secenekler(t, ogeler, sik), [t, i, ogeler, sik]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { etkinlikSay(ad, 'acildi'); }, [ad]);
  const cevap = (ilkDeneme: boolean) => {
    if (ilkDeneme) dogru.current++;
    else if (i + 3 < sira.length) setSira(s => [...s.slice(0, i + 3), t, ...s.slice(i + 3, -1)]);
    if (i + 1 >= sira.length) { setBitti(true); etkinlikSay(ad, 'bitti'); basariSay(ad, dogru.current, sira.length); }
    else setI(i + 1);
  };
  return (
    <OyunCercevesi baslik={`${katAd}: ${tekrarAd(sik)} Tekrar`} emoji="🔀" onBack={onBack} adim={i + (bitti ? 1 : 0)} toplamAdim={sira.length} yonerge={trHangisi(t.kelime)}>
      <Soru key={i} hedef={t} ogeler={sec} onCevap={cevap} />
      {bitti && <OyunSonu onTekrar={() => { dogru.current = 0; setSira(kur()); setI(0); setBitti(false); }} onBack={onBack} />}
    </OyunCercevesi>
  );
};

export default KelimeOgren;
