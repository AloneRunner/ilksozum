import React, { useEffect, useMemo, useRef, useState } from 'react';
import { OyunCercevesi, Kutlama, neseliMelodi } from '../oyunKiti/OyunKiti.tsx';
import { speak, playEffect } from '../../services/speechService.ts';

// Tuvalet Zamanı (Kaan, 2026-10-08: "bez bıraktırmaya çalışıyoruz, gene başarısız… gerçekten işe yararsa").
// Otizmde işe yaradığı bilinen parçalar bir arada: görsel adım çizelgesi (görev analizi), sosyal öykü,
// anında ödül (çıkartma tablosu), düzenli oturtma hatırlatıcısı, ebeveyn kaydı + kaza saatleri örüntüsü, ipuçları.
// Tuvalette çocuk fotoğrafı YOK (hassas); adımlar nesne fotoğrafları + kısa cümle.
type Sekme = 'adim' | 'oyku' | 'odul' | 'hatir' | 'kayit' | 'ipucu';
type KayitTuru = 'cis' | 'kaka' | 'kaza' | 'kuru';
interface Kayit { t: number; tur: KayitTuru }
interface Veri { kayitlar: Kayit[]; yildiz: Record<string, number> }

const ADIMLAR: { url: string; ok?: '⬇️' | '⬆️' | '💧'; yazi: string; soz: string }[] = [
  { url: '/images/8422.webp', yazi: 'Tuvalete git', soz: 'Tuvalete gidiyoruz.' },
  { url: '/images/4713.webp', ok: '⬇️', yazi: 'Pantolonu indir', soz: 'Pantolonunu indir.' },
  { url: '/images/8422.webp', yazi: 'Tuvalete otur', soz: 'Tuvalete otur.' },
  { url: '/images/8422.webp', ok: '💧', yazi: 'Çişini yap', soz: 'Çişini yap.' },
  { url: '/images/8815.webp', yazi: 'Kağıtla sil', soz: 'Tuvalet kağıdıyla sil.' },
  { url: '/images/8799.webp', yazi: 'Sifonu çek', soz: 'Sifonu çek.' },
  { url: '/images/4713.webp', ok: '⬆️', yazi: 'Pantolonu giy', soz: 'Pantolonunu giy.' },
  { url: '/images/6337.webp', yazi: 'Ellerini yıka', soz: 'Ellerini sabunla yıka.' },
  { url: '/images/3304.webp', yazi: 'Ellerini kurula', soz: 'Ellerini havluyla kurula.' },
];

const OYKU: { url: string; yazi: string }[] = [
  { url: '/images/8422.webp', yazi: 'Bu tuvalet. Çişim ya da kakam gelince tuvalete giderim.' },
  { url: '/images/4713.webp', yazi: 'Pantolonumu indiririm ve tuvalete otururum.' },
  { url: '/images/8422.webp', yazi: 'Çişimi tuvalete yaparım. Acele etmem, biraz beklerim.' },
  { url: '/images/8799.webp', yazi: 'Kağıtla silerim, sifonu çekerim. Su şırıl şırıl akar.' },
  { url: '/images/6337.webp', yazi: 'Ellerimi sabunla yıkarım ve kurularım.' },
  { url: '/images/8929.webp', yazi: 'Artık büyüdüm. Bez yerine külot giyerim.' },
  { url: '/images/8422.webp', yazi: 'Tuvalette çiş yapınca annem ve babam çok sevinir. Ben de çok mutlu olurum!' },
];

const IPUCLARI: string[] = [
  'Başlamadan önce 2–3 gün yalnız kayıt tutun: çiş ve kaka ne zaman oluyor? Bu sekmedeki "Kayıt" bölümü bunun için.',
  'Gündüz bezi bırakıp külota geçin. Çocuk ıslaklığı hissetmeli; bez bu hissi saklar.',
  'Çocuk istemese de belli aralıklarla (önce 30–45 dakikada bir) tuvalete götürün ve 3–5 dakika oturtun. "Hatırlatıcı" bunun için.',
  'Kazaların en sık olduğu saatten 10–15 dakika önce oturtun. "Kayıt" bu saatleri gösterir.',
  'Tuvalette başardığı an hemen ödül verin. Ödül, en çok sevdiği ama yalnızca tuvalet başarısında verdiğiniz bir şey olsun (küçük bir yiyecek, özel bir oyuncak, çıkartma).',
  'Kazaya tepki göstermeyin, kızmayın. Sakin bir sesle "Çiş tuvalete yapılır" deyip birlikte temizleyin, çocuk da katılsın.',
  'Her seferinde aynı rutin ve aynı kelimeler: aynı tuvalet, aynı sıra, aynı cümleler. "Adımlar" kartlarını tuvaletin yanında gösterebilirsiniz.',
  'Su ve lif yönünden zengin beslenme; kabızlık tuvaleti korkutucu yapabilir. Kabızlık ya da ağrı varsa doktora danışın.',
  'Sabırlı olun: otizmli çocuklarda tuvalet eğitimi aylar sürebilir; geri adımlar normaldir. Gerilerse bir önceki aşamaya dönün.',
  'Bu öneriler genel bilgidir. Özel eğitim öğretmeniniz ya da terapistinizle birlikte planlayın.',
];

const gun = (t = Date.now()) => { const d = new Date(t); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const profil = () => { try { return JSON.parse(localStorage.getItem('activeProfileId_v1') || 'null') || 'misafir'; } catch { return 'misafir'; } };
const anahtar = () => `tuvalet_v1_${profil()}`;
const oku = (): Veri => { try { return { kayitlar: [], yildiz: {}, ...JSON.parse(localStorage.getItem(anahtar()) || '{}') }; } catch { return { kayitlar: [], yildiz: {} }; } };
const yaz = (v: Veri) => { try { localStorage.setItem(anahtar(), JSON.stringify(v)); } catch { /* yok say */ } };
const saat = (t: number) => new Date(t).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
const KAYIT_AD: Record<KayitTuru, [string, string]> = { cis: ['💧', 'Tuvalette çiş'], kaka: ['💩', 'Tuvalette kaka'], kaza: ['⚠️', 'Kaza'], kuru: ['☀️', 'Kuru (kontrol)'] };

const Kart: React.FC<{ url: string; ok?: string; className?: string }> = ({ url, ok, className }) => (
  <div className={`relative rounded-3xl bg-white shadow-lg overflow-hidden ${className || ''}`}>
    <img src={url} alt="" draggable={false} className="w-full h-full object-cover" />
    {ok && <span className="absolute top-2 right-2 text-5xl drop-shadow-lg">{ok}</span>}
  </div>
);

const TuvaletEkrani: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [sekme, setSekme] = useState<Sekme>('adim');
  const [veri, setVeri] = useState<Veri>(oku);
  const guncelle = (f: (v: Veri) => Veri) => setVeri((v) => { const y = f(v); yaz(y); return y; });
  const [kutlama, setKutlama] = useState<string | null>(null);

  // --- Adımlar ---
  const [adim, setAdim] = useState(0);
  useEffect(() => { if (sekme === 'adim') speak(ADIMLAR[adim].soz); }, [adim, sekme]);
  const adimIleri = () => {
    if (adim + 1 < ADIMLAR.length) { setAdim(adim + 1); playEffect('correct', { volume: 0.25 }); return; }
    setKutlama('Aferin!'); neseliMelodi(); speak('Aferin! Tuvaleti kendin yaptın.');
    guncelle((v) => ({ ...v, yildiz: { ...v.yildiz, [gun()]: (v.yildiz[gun()] || 0) + 1 } }));
  };

  // --- Öykü ---
  const [sayfa, setSayfa] = useState(0);
  useEffect(() => { if (sekme === 'oyku') speak(OYKU[sayfa].yazi); }, [sayfa, sekme]);

  // --- Ödül ---
  const bugunYildiz = veri.yildiz[gun()] || 0;
  const basardi = () => {
    guncelle((v) => ({ ...v, yildiz: { ...v.yildiz, [gun()]: (v.yildiz[gun()] || 0) + 1 }, kayitlar: [...v.kayitlar, { t: Date.now(), tur: 'cis' }] }));
    setKutlama('Süpersin!'); neseliMelodi(); speak('Aferin! Tuvalete yaptın, süpersin!');
  };

  // --- Hatırlatıcı (uygulama açıkken) ---
  const [aralik, setAralik] = useState<number | null>(null); // dakika
  const [kalan, setKalan] = useState(0);
  const sonUyari = useRef(0);
  useEffect(() => {
    if (!aralik) return;
    setKalan(aralik * 60);
    const z = setInterval(() => setKalan((k) => {
      if (k <= 1) {
        if (Date.now() - sonUyari.current > 5000) { sonUyari.current = Date.now(); neseliMelodi(); speak('Tuvalet zamanı! Hadi tuvalete gidelim.'); }
        return aralik * 60;
      }
      return k - 1;
    }), 1000);
    return () => clearInterval(z);
  }, [aralik]);

  // --- Kayıt ---
  const kaydet = (tur: KayitTuru) => { guncelle((v) => ({ ...v, kayitlar: [...v.kayitlar, { t: Date.now(), tur }] })); playEffect('correct', { volume: 0.2 }); };
  const geriAl = () => guncelle((v) => ({ ...v, kayitlar: v.kayitlar.slice(0, -1) }));
  const bugunKayit = veri.kayitlar.filter((k) => gun(k.t) === gun()).slice().reverse();
  const yediGun = useMemo(() => veri.kayitlar.filter((k) => Date.now() - k.t < 7 * 864e5), [veri.kayitlar]);
  const saatler = useMemo(() => {
    const kaza = Array(24).fill(0), basari = Array(24).fill(0);
    for (const k of yediGun) { const h = new Date(k.t).getHours(); if (k.tur === 'kaza') kaza[h]++; else if (k.tur !== 'kuru') basari[h]++; }
    return { kaza, basari };
  }, [yediGun]);
  const enCokKaza = saatler.kaza.some((x) => x) ? saatler.kaza.map((x, h) => [x, h] as const).sort((a, b) => b[0] - a[0]).slice(0, 2).filter((x) => x[0] > 0).map(([, h]) => h) : [];
  const maks = Math.max(1, ...saatler.kaza.map((x, h) => x + saatler.basari[h]));

  const SEKMELER: [Sekme, string][] = [['adim', '🚽 Adımlar'], ['oyku', '📖 Öykü'], ['odul', '⭐ Ödül'], ['hatir', '⏰ Hatırlatıcı'], ['kayit', '📝 Kayıt'], ['ipucu', '💡 İpuçları']];
  const yonerge = sekme === 'adim' ? ADIMLAR[adim].soz : sekme === 'oyku' ? 'Birlikte okuyalım.' : sekme === 'odul' ? 'Tuvalete yapınca yıldız kazan!' : undefined;

  return (
    <OyunCercevesi baslik="Tuvalet Zamanı" emoji="🚽" onBack={onBack} yonerge={yonerge}>
      <div className="absolute inset-0 flex flex-col px-3 pb-3 gap-3">
        <div className="flex gap-2 overflow-x-auto pb-1 shrink-0">
          {SEKMELER.map(([id, ad]) => (
            <button key={id} onClick={() => setSekme(id)} className={`shrink-0 px-3 py-2 rounded-full text-sm font-black shadow-sm ${sekme === id ? 'bg-sky-500 text-white' : 'bg-white text-slate-700'}`}>{ad}</button>
          ))}
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto">
          {sekme === 'adim' && (
            <div className="h-full flex flex-col items-center gap-3">
              <div className="flex gap-1.5">{ADIMLAR.map((_, i) => <span key={i} className={`w-3 h-3 rounded-full ${i <= adim ? 'bg-emerald-400' : 'bg-slate-200'}`} />)}</div>
              <Kart key={adim} url={ADIMLAR[adim].url} ok={ADIMLAR[adim].ok} className="w-full max-w-xs aspect-square" />
              <div className="text-3xl font-black text-slate-800 text-center"><span className="text-sky-500 mr-2">{adim + 1}.</span>{ADIMLAR[adim].yazi}</div>
              <div className="flex gap-3">
                <button onClick={() => setAdim(Math.max(0, adim - 1))} disabled={adim === 0} className="px-5 py-4 rounded-3xl bg-white shadow text-2xl font-black disabled:opacity-30 active:scale-95">◀</button>
                <button onClick={() => speak(ADIMLAR[adim].soz)} className="px-5 py-4 rounded-3xl bg-white shadow text-2xl active:scale-95" aria-label="Tekrar söyle">🔊</button>
                <button onClick={adimIleri} className="px-8 py-4 rounded-3xl bg-emerald-500 text-white shadow-lg text-2xl font-black active:scale-95">{adim + 1 < ADIMLAR.length ? 'Yaptım ✓' : 'Bitti! ⭐'}</button>
              </div>
              {adim + 1 === ADIMLAR.length && <button onClick={() => setAdim(0)} className="text-sm font-bold text-slate-500 underline">Baştan başla</button>}
              <p className="text-xs text-slate-500 text-center max-w-sm">Kartları tuvalette çocuğunuzla birlikte adım adım gösterebilirsiniz. Her adımda "Yaptım"a basın.</p>
            </div>
          )}

          {sekme === 'oyku' && (
            <div className="h-full flex flex-col items-center gap-3">
              <Kart url={OYKU[sayfa].url} className="w-full max-w-xs aspect-square" />
              <p className="text-2xl font-black text-slate-800 text-center leading-snug max-w-md">{OYKU[sayfa].yazi}</p>
              <div className="flex gap-3 items-center">
                <button onClick={() => setSayfa(Math.max(0, sayfa - 1))} disabled={sayfa === 0} className="px-5 py-4 rounded-3xl bg-white shadow text-2xl font-black disabled:opacity-30">◀</button>
                <span className="font-bold text-slate-500">{sayfa + 1} / {OYKU.length}</span>
                <button onClick={() => setSayfa(Math.min(OYKU.length - 1, sayfa + 1))} disabled={sayfa === OYKU.length - 1} className="px-5 py-4 rounded-3xl bg-sky-500 text-white shadow text-2xl font-black disabled:opacity-30">▶</button>
              </div>
            </div>
          )}

          {sekme === 'odul' && (
            <div className="flex flex-col items-center gap-4">
              <div className="text-xl font-black text-slate-700">Bugünkü yıldızlar</div>
              <div className="grid grid-cols-5 gap-2 w-full max-w-sm">
                {Array.from({ length: Math.max(10, bugunYildiz) }, (_, i) => (
                  <div key={i} className={`aspect-square rounded-2xl flex items-center justify-center text-4xl ${i < bugunYildiz ? 'bg-amber-100' : 'bg-white border-2 border-dashed border-slate-200'}`} style={i === bugunYildiz - 1 ? { animation: 'ok-yildiz .5s ease-out' } : undefined}>{i < bugunYildiz ? '⭐' : ''}</div>
                ))}
              </div>
              <button onClick={basardi} className="px-8 py-5 rounded-3xl bg-emerald-500 text-white shadow-lg text-2xl font-black active:scale-95">🎉 Tuvalete yaptı!</button>
              <p className="text-xs text-slate-500 text-center max-w-sm">Çocuğunuz tuvalete yaptığı an basın: yıldız eklenir, kutlama çıkar. Çıkartmayı gerçek bir ödülle (yalnız tuvalet başarısında verilen) birleştirin.</p>
              <div className="w-full max-w-sm">
                <div className="text-sm font-black text-slate-600 mb-1">Son 7 gün</div>
                <div className="flex justify-between gap-1">
                  {Array.from({ length: 7 }, (_, i) => { const g = gun(Date.now() - (6 - i) * 864e5); const n = veri.yildiz[g] || 0; return (
                    <div key={g} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-lg bg-amber-300" style={{ height: 6 + n * 10 }} />
                      <span className="text-[10px] text-slate-500">{g.slice(8)}</span><span className="text-xs font-bold">{n}</span>
                    </div>); })}
                </div>
              </div>
            </div>
          )}

          {sekme === 'hatir' && (
            <div className="flex flex-col items-center gap-4">
              <p className="text-center text-slate-700 font-semibold max-w-sm">Çocuk istemese de belli aralıklarla tuvalete götürüp 3–5 dakika oturtun. Süre dolunca uygulama uyarır.</p>
              <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                {[30, 45, 60, 90].map((d) => (
                  <button key={d} onClick={() => setAralik(aralik === d ? null : d)} className={`py-4 rounded-3xl text-xl font-black shadow ${aralik === d ? 'bg-sky-500 text-white' : 'bg-white text-slate-700'}`}>{d} dk</button>
                ))}
              </div>
              {aralik ? (
                <div className="flex flex-col items-center gap-1">
                  <div className="text-6xl font-black text-sky-600 tabular-nums">{String(Math.floor(kalan / 60)).padStart(2, '0')}:{String(kalan % 60).padStart(2, '0')}</div>
                  <div className="text-sm text-slate-500">sonra "Tuvalet zamanı!" uyarısı</div>
                  <button onClick={() => setAralik(null)} className="mt-2 px-5 py-2 rounded-full bg-white shadow font-bold text-slate-600">Durdur</button>
                </div>
              ) : <div className="text-slate-400 font-semibold">Bir süre seçin</div>}
              <p className="text-[11px] text-slate-400 text-center max-w-sm">Uyarı uygulama açıkken çalışır. Telefon kilitliyken çalmaz; o zaman telefonun kendi zamanlayıcısını kullanabilirsiniz.</p>
            </div>
          )}

          {sekme === 'kayit' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(KAYIT_AD) as KayitTuru[]).map((k) => (
                  <button key={k} onClick={() => kaydet(k)} className={`py-4 rounded-2xl shadow font-black text-lg active:scale-95 ${k === 'kaza' ? 'bg-rose-100 text-rose-700' : k === 'kuru' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{KAYIT_AD[k][0]} {KAYIT_AD[k][1]}</button>
                ))}
              </div>
              <div className="rounded-2xl bg-white shadow p-3">
                <div className="flex justify-between items-center mb-1"><span className="font-black text-slate-700">Bugün</span>{bugunKayit.length > 0 && <button onClick={geriAl} className="text-xs font-bold text-slate-500 underline">Son kaydı sil</button>}</div>
                {bugunKayit.length ? bugunKayit.map((k, i) => <div key={i} className="text-sm text-slate-700">{saat(k.t)} · {KAYIT_AD[k.tur][0]} {KAYIT_AD[k.tur][1]}</div>) : <div className="text-sm text-slate-400">Henüz kayıt yok</div>}
              </div>
              <div className="rounded-2xl bg-white shadow p-3">
                <div className="font-black text-slate-700 mb-2">Son 7 gün: saatlere göre</div>
                <div className="flex gap-[2px] h-24">
                  {Array.from({ length: 24 }, (_, h) => (
                    <div key={h} className="flex-1 flex flex-col justify-end" title={`${h}:00`}>
                      <div className="bg-rose-400 rounded-t-sm" style={{ height: `${(saatler.kaza[h] / maks) * 100}%` }} />
                      <div className="bg-emerald-400" style={{ height: `${(saatler.basari[h] / maks) * 100}%` }} />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1"><span>00</span><span>06</span><span>12</span><span>18</span><span>23</span></div>
                <div className="text-xs mt-2 text-slate-600"><span className="inline-block w-2 h-2 bg-rose-400 rounded-sm mr-1" />kaza <span className="inline-block w-2 h-2 bg-emerald-400 rounded-sm ml-2 mr-1" />tuvalette</div>
                {enCokKaza.length > 0 && (
                  <p className="mt-2 text-sm font-bold text-slate-700">💡 Kazalar en çok {enCokKaza.map((h) => `${String(h).padStart(2, '0')}:00`).join(' ve ')} civarında. Bu saatlerden 10–15 dakika önce tuvalete oturtmayı deneyin.</p>
                )}
              </div>
            </div>
          )}

          {sekme === 'ipucu' && (
            <ol className="flex flex-col gap-2 max-w-md mx-auto list-none">
              {IPUCLARI.map((x, i) => <li key={i} className="rounded-2xl bg-white shadow-sm p-3 text-sm text-slate-700 leading-snug"><b className="text-sky-600 mr-1">{i + 1}.</b>{x}</li>)}
            </ol>
          )}
        </div>
      </div>
      <Kutlama acik={!!kutlama} yazi={kutlama || ''} onBitti={() => { setKutlama(null); if (sekme === 'adim') setAdim(0); }} sure={2200} />
    </OyunCercevesi>
  );
};

export default TuvaletEkrani;
