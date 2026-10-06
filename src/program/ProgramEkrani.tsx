import React, { useEffect, useMemo, useState } from 'react';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon.tsx';
import { ActivityStats } from '../types.ts';
import { ALL_SUB_ACHIEVEMENTS } from '../constants.ts';
import { KULVARLAR, KulvarId, EtkinlikId } from './kulvarlar.ts';
import {
  ayarOku, ayarYaz, bugun, kulvarDurumu, oturumKur, yerlestirmeKur, yerlestirmeDegerlendir, ogrendiMi, sonOran, odulOyunu,
  ProgramAyar, OturumOgesi,
} from './motor.ts';

// Program Modu 2 ekranı: Bugün (oturum, tanıma turu, ödül) · Kulvarlar (seviyeler, "biliyor") · Ayarlar
interface Props {
  profilId?: string | null;
  stats: Record<string, ActivityStats>;
  onBack: () => void;
  onStart: (kuyruk: EtkinlikId[]) => void;
  onOdul: (oyunId: string) => void;
}

const ADLAR = new Map(ALL_SUB_ACHIEVEMENTS.map((s) => [String(s.id), s.name]));
const ad = (id: EtkinlikId) => ADLAR.get(String(id)) || String(id);
const ROL: Record<OturumOgesi['rol'], { ad: string; renk: string }> = {
  isinma: { ad: 'Tekrar', renk: 'bg-amber-100 text-amber-800' },
  yeni: { ad: 'Yeni', renk: 'bg-sky-100 text-sky-800' },
  pekistirme: { ad: 'Pekiştir', renk: 'bg-rose-100 text-rose-800' },
  yerlestirme: { ad: 'Tanıma', renk: 'bg-violet-100 text-violet-800' },
};
const emoji = (k: KulvarId) => KULVARLAR.find((x) => x.id === k)?.emoji || '•';

const ProgramEkrani: React.FC<Props> = ({ profilId, stats, onBack, onStart, onOdul }) => {
  const [ayar, setAyarDurum] = useState<ProgramAyar>(() => ayarOku(profilId));
  const [sekme, setSekme] = useState<'bugun' | 'kulvar' | 'ayar'>('bugun');
  const [ek, setEk] = useState(0);
  const [mesaj, setMesaj] = useState<string | null>(null);
  const setAyar = (a: ProgramAyar) => { setAyarDurum(a); ayarYaz(profilId, a); };

  // Tanıma turu bittiyse sonucu hesapla (atlanan kulvarlar)
  useEffect(() => {
    if (!ayar.bekleyenDegerlendirme) return;
    const { ayar: yeni, atlanan } = yerlestirmeDegerlendir(stats, { ...ayar, bekleyenDegerlendirme: false }, profilId);
    setAyar(yeni);
    setMesaj(atlanan.length
      ? `Tanıma turu bitti. Bildiği konular atlandı: ${atlanan.map((k) => `${emoji(k)} ${KULVARLAR.find((x) => x.id === k)!.ad}`).join(', ')}.`
      : 'Tanıma turu bitti. Her kulvara baştan, kolay seviyeden başlıyoruz.');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const oturum = useMemo(() => oturumKur(stats, ayar, profilId, ek), [stats, ayar, profilId, ek]);
  const bugunBitti = ayar.sonOturum === bugun();

  const tanimaBaslat = () => {
    const kuyruk = yerlestirmeKur(stats, ayar, profilId);
    setAyar({ ...ayar, yerlestirme: 'devam', yerlestirmeKuyrugu: kuyruk.map((o) => ({ id: o.id, kulvar: o.kulvar })) });
    onStart(kuyruk.map((o) => o.id));
  };

  const Sekme = ({ id, ad: a }: { id: typeof sekme; ad: string }) => (
    <button onClick={() => setSekme(id)} className={`flex-1 py-2 rounded-full text-sm font-black ${sekme === id ? 'bg-emerald-600 text-white shadow' : 'text-emerald-900'}`}>{a}</button>
  );

  return (
    <div className="flex flex-col h-full w-full max-w-3xl mx-auto px-3 pt-3 animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <button onClick={onBack} className="p-2 rounded-full bg-white/80 shadow active:scale-95" aria-label="Geri"><ArrowLeftIcon className="w-6 h-6 text-emerald-700" /></button>
        <h1 className="flex-1 text-xl font-black text-emerald-900">🎓 Program Modu</h1>
      </div>
      <div className="flex gap-1 rounded-full bg-white/80 p-1 shadow mb-3">
        <Sekme id="bugun" ad="Bugün" /><Sekme id="kulvar" ad="Kulvarlar" /><Sekme id="ayar" ad="Ayarlar" />
      </div>

      <div className="flex-1 overflow-y-auto pb-24 space-y-3">
        {mesaj && <div className="rounded-2xl bg-violet-50 border-2 border-violet-200 p-3 text-sm font-bold text-violet-900">{mesaj}</div>}

        {sekme === 'bugun' && (
          <>
            {ayar.yerlestirme === 'yok' && (
              <div className="rounded-3xl bg-white shadow-md p-4">
                <div className="text-lg font-black text-slate-800">🧭 Hızlı tanıma turu</div>
                <p className="text-sm text-slate-600 mt-1">Her beceriden kısa bir etkinlik. Çocuğunuzun zaten bildiği konular atlanır, programa doğru yerden başlar. (5-10 dakika)</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={tanimaBaslat} className="flex-1 py-3 rounded-2xl bg-violet-600 text-white font-black shadow active:scale-95">Tanıma turunu başlat</button>
                  <button onClick={() => setAyar({ ...ayar, yerlestirme: 'bitti' })} className="px-4 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold active:scale-95">Atla</button>
                </div>
              </div>
            )}
            {ayar.yerlestirme === 'devam' && (
              <div className="rounded-3xl bg-white shadow-md p-4">
                <div className="text-lg font-black text-slate-800">🧭 Tanıma turu yarım kaldı</div>
                <div className="flex gap-2 mt-3">
                  <button onClick={tanimaBaslat} className="flex-1 py-3 rounded-2xl bg-violet-600 text-white font-black shadow active:scale-95">Baştan başlat</button>
                  <button onClick={() => { const { ayar: y } = yerlestirmeDegerlendir(stats, ayar, profilId); setAyar(y); }} className="px-4 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold active:scale-95">Bu kadarı yeter</button>
                </div>
              </div>
            )}

            {bugunBitti && (
              <div className="rounded-3xl bg-gradient-to-br from-amber-300 to-rose-400 p-4 text-white shadow-md text-center">
                <div className="text-2xl font-black">🎉 Bugünkü oturum tamamlandı!</div>
                <button onClick={() => onOdul(odulOyunu())} className="mt-3 px-6 py-3 rounded-2xl bg-white text-rose-600 text-lg font-black shadow active:scale-95">🎁 Ödül oyunu</button>
              </div>
            )}

            <div className="rounded-3xl bg-white shadow-md p-4">
              <div className="flex items-center justify-between">
                <div className="text-lg font-black text-slate-800">{bugunBitti ? 'Bir oturum daha' : 'Bugünün oturumu'}</div>
                <span className="text-xs font-bold text-slate-500">{oturum.length} etkinlik</span>
              </div>
              <ol className="mt-2 space-y-1.5">
                {oturum.map((o, i) => (
                  <li key={`${String(o.id)}-${i}`} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                    <span className="text-xl" aria-hidden="true">{emoji(o.kulvar)}</span>
                    <span className="flex-1 text-sm font-bold text-slate-800">{ad(o.id)}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-black ${ROL[o.rol].renk}`}>{ROL[o.rol].ad}</span>
                  </li>
                ))}
                <li className="flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2">
                  <span className="text-xl" aria-hidden="true">🎁</span><span className="flex-1 text-sm font-bold text-rose-800">Sonunda ödül oyunu</span>
                </li>
              </ol>
              <button
                onClick={() => { if (bugunBitti) setEk(ek + 1); onStart(oturum.map((o) => o.id)); }}
                disabled={oturum.length === 0}
                className="mt-3 w-full py-4 rounded-2xl bg-emerald-600 text-white text-lg font-black shadow active:scale-95 disabled:opacity-40"
              >
                ▶ {bugunBitti ? 'Bir oturum daha başlat' : 'Oturumu başlat'}
              </button>
            </div>
          </>
        )}

        {sekme === 'kulvar' && KULVARLAR.map((k) => {
          const kapali = ayar.kapaliKulvarlar.includes(k.id);
          const d = kulvarDurumu(stats, ayar, k.id, profilId);
          const sv = d.bitti ? null : k.seviyeler[d.seviye];
          return (
            <div key={k.id} className={`rounded-3xl bg-white shadow-md p-4 ${kapali ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-2">
                <span className="text-2xl" aria-hidden="true">{k.emoji}</span>
                <div className="flex-1">
                  <div className="font-black text-slate-800">{k.ad}{kapali ? ' (kapalı)' : ''}</div>
                  <div className="text-xs font-bold text-slate-500">{d.bitti ? 'Bütün seviyeler tamam ✓' : `Seviye ${d.seviye + 1}/${d.toplam} · ${sv!.ad}`}</div>
                </div>
              </div>
              <div className="mt-2 flex gap-1">
                {k.seviyeler.map((_, i) => <div key={i} className={`h-2 flex-1 rounded-full ${i < d.seviye ? 'bg-emerald-500' : i === d.seviye ? 'bg-amber-400' : 'bg-slate-200'}`} />)}
              </div>
              {sv && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {sv.etkinlikler.map((e) => {
                    const o = sonOran(stats, e);
                    const tamam = ogrendiMi(stats, e);
                    return <span key={String(e)} className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${tamam ? 'bg-emerald-100 text-emerald-800' : o === null ? 'bg-slate-100 text-slate-500' : 'bg-amber-100 text-amber-800'}`}>{tamam ? '✓ ' : ''}{ad(e)}{!tamam && o !== null ? ` %${Math.round(o * 100)}` : ''}</span>;
                  })}
                </div>
              )}
              <div className="mt-3 flex gap-2">
                {!d.bitti && <button onClick={() => setAyar({ ...ayar, bilinen: { ...ayar.bilinen, [k.id]: d.seviye + 1 } })} className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-black active:scale-95">✓ Bu seviyeyi biliyor, atla</button>}
                {(ayar.bilinen[k.id] || 0) > 0 && <button onClick={() => setAyar({ ...ayar, bilinen: { ...ayar.bilinen, [k.id]: Math.max(0, (ayar.bilinen[k.id] || 0) - 1) } })} className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold active:scale-95">↩ Bir seviye geri</button>}
              </div>
            </div>
          );
        })}

        {sekme === 'ayar' && (
          <div className="rounded-3xl bg-white shadow-md p-4 space-y-4">
            <div>
              <div className="font-black text-slate-800 mb-2">Oturum uzunluğu</div>
              <div className="flex gap-2">
                {([5, 7, 10] as const).map((n) => (
                  <button key={n} onClick={() => setAyar({ ...ayar, oturumUzunlugu: n })} className={`flex-1 py-2 rounded-xl text-sm font-black ${ayar.oturumUzunlugu === n ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                    {n === 5 ? 'Kısa (5)' : n === 7 ? 'Normal (7)' : 'Uzun (10)'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-black text-slate-800 mb-1">Kulvarlar</div>
              <p className="text-xs text-slate-500 mb-2">Okuma varsayılan olarak kapalı; çocuğunuz okumaya hazırsa açın. Harf ve okuma etkinlikleri her zaman Harfler ve Okuma menüsünde.</p>
              <div className="flex flex-wrap gap-2">
                {KULVARLAR.map((k) => {
                  const acik = !ayar.kapaliKulvarlar.includes(k.id);
                  return (
                    <button key={k.id} onClick={() => setAyar({ ...ayar, kapaliKulvarlar: acik ? [...ayar.kapaliKulvarlar, k.id] : ayar.kapaliKulvarlar.filter((x) => x !== k.id) })}
                      className={`px-3 py-2 rounded-full text-sm font-bold ${acik ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-100 text-slate-400 line-through'}`}>
                      {k.emoji} {k.ad}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="font-black text-slate-800 mb-1">Bu hafta odak</div>
              <p className="text-xs text-slate-500 mb-2">Seçilen beceriden oturumda daha çok etkinlik gelir.</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setAyar({ ...ayar, odak: null })} className={`px-3 py-2 rounded-full text-sm font-bold ${ayar.odak === null ? 'bg-amber-400 text-amber-950' : 'bg-slate-100 text-slate-700'}`}>Yok</button>
                {KULVARLAR.filter((k) => !ayar.kapaliKulvarlar.includes(k.id)).map((k) => (
                  <button key={k.id} onClick={() => setAyar({ ...ayar, odak: k.id })} className={`px-3 py-2 rounded-full text-sm font-bold ${ayar.odak === k.id ? 'bg-amber-400 text-amber-950' : 'bg-slate-100 text-slate-700'}`}>{k.emoji} {k.ad}</button>
                ))}
              </div>
            </div>
            <button onClick={() => { setAyar({ ...ayar, yerlestirme: 'yok' }); setSekme('bugun'); }} className="w-full py-3 rounded-2xl bg-violet-50 text-violet-800 font-black active:scale-95">🧭 Tanıma turunu yeniden yap</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProgramEkrani);
