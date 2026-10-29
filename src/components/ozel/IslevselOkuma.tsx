import React, { useMemo, useState } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { kategoriOgeleri } from '../sozluk/KelimeKitabi.tsx';
import { speak } from '../../services/speechService.ts';
import { OKUMA_SORU, YAZI_SORU } from './ozelVeri.ts';
import { SecimOyunu, Sekmeler, karistir, sikKur, type Tur } from './ozelOrtak.tsx';

// İşlevsel Okuma (Gökhan Hoca, 2026-10-27): ağır etkilenen çocuk için resim–sözcük eşleme,
// çocuğun sevdiği yiyecek ve içeceklerle. Aile kelimeleri kendisi seçer (cihazda saklanır).
// Oku: yazı gösterilir, söylenmez (okuma olsun diye); çocuk resmini bulur. Yazıyı bul: resim → yazı.
interface Oge { kelime: string; url: string }
const KATEGORILER: [string, string][] = [['meyveler', 'Meyveler'], ['icecekler', 'İçecekler'], ['diger_yiyecekler', 'Yiyecekler'], ['sebzeler', 'Sebzeler']];
const VARSAYILAN = ['elma', 'muz', 'su', 'süt', 'ekmek', 'peynir', 'çikolata', 'makarna', 'portakal', 'çilek', 'yumurta', 'bisküvi'];
const ANAHTAR = 'islevselOkuma_kelimeler_v1';
const TUR_SAYISI = 8;
const buyukBas = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);

const okuSecili = (): string[] => { try { const v = JSON.parse(localStorage.getItem(ANAHTAR) || 'null'); return Array.isArray(v) ? v : VARSAYILAN; } catch { return VARSAYILAN; } };

// Seçilen kelimeler 8 tura yetmezse karışık tekrar eder (az kelimeyle bol tekrar)
const turOgeleri = (l: Oge[]) => { const t: Oge[] = []; while (t.length < TUR_SAYISI) t.push(...karistir(l)); return t.slice(0, TUR_SAYISI); };

const IslevselOkuma: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const gruplar = useMemo(() => {
    const gorulen = new Set<string>();
    return KATEGORILER.map(([id, ad]) => ({ ad, ogeler: kategoriOgeleri(id).filter((o) => !gorulen.has(o.kelime) && gorulen.add(o.kelime)) }));
  }, []);
  const hepsi = useMemo(() => new Map(gruplar.flatMap((g) => g.ogeler.map((o) => [o.kelime, o] as const))), [gruplar]);
  const [secili, setSecili] = useState<string[]>(() => okuSecili().filter((k) => hepsi.has(k)));
  const [sekme, setSekme] = useState<'tani' | 'oku' | 'yazi'>('tani');
  const [duzenle, setDuzenle] = useState(false);
  const ogeler = secili.map((k) => hepsi.get(k)!).filter(Boolean);

  const degistir = (k: string) => {
    const y = secili.includes(k) ? secili.filter((x) => x !== k) : [...secili, k];
    setSecili(y);
    try { localStorage.setItem(ANAHTAR, JSON.stringify(y)); } catch { /* yok say */ }
  };

  const ust = <Sekmeler secili={sekme} sekmeler={[['tani', '👀 Tanı'], ['oku', '📖 Oku'], ['yazi', '🔤 Yazıyı bul']]} onSec={(s) => { setSekme(s); setDuzenle(false); }} />;

  if (sekme === 'oku' && ogeler.length >= 2) return (
    <SecimOyunu key="oku" oyunId="islevselOkuma" sayacAdi="İşlevsel Okuma" baslik="İşlevsel Okuma" emoji="🍎" onBack={onBack} ust={ust}
      secenekSayilari={[2, 3, 4]}
      turlariKur={(n) => turOgeleri(ogeler).map((o): Tur => ({
        soru: OKUMA_SORU, ustYazi: o.kelime, dogruId: o.kelime, dogruSoz: `Evet, bu ${o.kelime}.`,
        secenekler: sikKur(o, ogeler, n, (a, b) => a.kelime === b.kelime).map((x) => ({ id: x.kelime, url: x.url })),
      }))} />
  );
  if (sekme === 'yazi' && ogeler.length >= 2) return (
    <SecimOyunu key="yazi" oyunId="islevselOkumaYazi" sayacAdi="İşlevsel Okuma (Yazıyı bul)" baslik="İşlevsel Okuma" emoji="🍎" onBack={onBack} ust={ust}
      secenekSayilari={[2, 3, 4]}
      turlariKur={(n) => turOgeleri(ogeler).map((o): Tur => ({
        soru: YAZI_SORU, gorsel: o.url, dogruId: o.kelime, dogruSoz: `Evet, bu ${o.kelime}.`,
        secenekler: sikKur(o, ogeler, n, (a, b) => a.kelime === b.kelime)
          .map((x) => ({ id: x.kelime, icerik: <span className="px-2 py-6 sm-landscape:py-4 text-3xl sm-landscape:text-2xl font-black text-slate-800 leading-tight text-center break-words">{x.kelime}</span> })),
      }))} />
  );

  return (
    <OyunCercevesi baslik="İşlevsel Okuma" emoji="🍎" onBack={onBack} yonerge="Resme dokun, dinle.">
      <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
        {ust}
        {sekme !== 'tani' && ogeler.length < 2 && <p className="text-center font-bold text-rose-600">Oyun için en az 2 kelime seçin.</p>}
        {!duzenle ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 landscape:grid-cols-4 gap-3 w-full max-w-3xl mx-auto">
              {ogeler.map((o) => (
                <button key={o.kelime} onClick={() => speak(buyukBas(o.kelime))} className="rounded-3xl bg-white shadow-lg overflow-hidden active:scale-95">
                  <img src={o.url} alt="" draggable={false} className="w-full aspect-square object-cover" />
                  <span className="block py-2 text-3xl font-black text-slate-800">{o.kelime}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setDuzenle(true)} className="self-center px-5 py-3 rounded-full bg-white shadow font-black text-slate-700 active:scale-95">✏️ Kelimeleri seç ({ogeler.length})</button>
            <p className="text-xs text-slate-500 text-center max-w-md mx-auto">Çocuğunuzun en sevdiği yiyecek ve içecekleri seçin. Az kelimeyle (4-6) başlayın; öğrendikçe ekleyin. "Oku"da yazı söylenmez, çocuk yazıyı okuyup resmini bulur.</p>
          </>
        ) : (
          <div className="w-full max-w-3xl mx-auto flex flex-col gap-3">
            <button onClick={() => setDuzenle(false)} className="self-center px-6 py-3 rounded-full bg-emerald-500 text-white shadow font-black active:scale-95">✓ Bitti ({ogeler.length} kelime)</button>
            {gruplar.map((g) => (
              <div key={g.ad}>
                <div className="text-lg font-black text-slate-700 px-1 pb-1">{g.ad}</div>
                <div className="grid grid-cols-4 sm:grid-cols-6 landscape:grid-cols-8 gap-2">
                  {g.ogeler.map((o) => {
                    const s = secili.includes(o.kelime);
                    return (
                      <button key={o.kelime} onClick={() => degistir(o.kelime)}
                        className={`rounded-2xl bg-white overflow-hidden border-4 ${s ? 'border-emerald-500' : 'border-transparent opacity-50'}`}>
                        <img src={o.url} alt="" draggable={false} className="w-full aspect-square object-cover" />
                        <span className="block truncate px-1 text-xs font-bold text-slate-700">{o.kelime}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </OyunCercevesi>
  );
};

export default IslevselOkuma;
