import React, { useMemo, useState } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { CommunicationCard, CommunicationCategory } from '../types.ts';
import { imageData } from '../services/database/imageData.ts';
import { nesneUrl } from '../services/nesneGorsel.ts';

// İfade Tahtası (2026-10, Kaan: "daha pratik kullanım lazım").
// Tek ekran: üstte büyük cümle şeridi, altında hızlı kelimeler, sonra kategori sekmeleri ve kartlar.
// Karta dokununca söylenir ve cümleye eklenir; şeride dokununca bütün cümle söylenir.
// Sık kullanılanlar kendiliğinden öne çıkar; kart boyutu (büyük/orta/küçük) seçilebilir.

interface Props {
  categories: CommunicationCategory[];
  sentence: CommunicationCard[];
  onCardClick: (card: CommunicationCard) => void;
  onSpeakSentence: () => void;
  onClearSentence: () => void;
  onRemoveLast: () => void;
  onBack: () => void;
  isPremium: boolean;
  printPool: CommunicationCard[];
  onTogglePrintPool: (card: CommunicationCard) => void;
  profilId?: string;
}

// Her kategoride ve ekranda hazır temel kelimeler (soyut oldukları için emoji)
const HIZLI: CommunicationCard[] = [
  { id: 'hz_ben', text: 'Ben', audioKey: 'ben', emoji: '🙋' },
  { id: 'hz_istiyorum', text: 'istiyorum', audioKey: 'istiyorum', emoji: '🙏', fiil: true },
  { id: 'hz_ver', text: 'ver', audioKey: 'ver', emoji: '🤲', fiil: true },
  { id: 'hz_daha', text: 'Daha', audioKey: 'daha', emoji: '➕' },
  { id: 'hz_bitti', text: 'Bitti', audioKey: 'bitti', emoji: '✅' },
  { id: 'hz_yardim', text: 'Yardım et', audioKey: 'yardim_et', emoji: '🆘' },
  { id: 'hz_evet', text: 'Evet', audioKey: 'evet', emoji: '👍' },
  { id: 'hz_hayir', text: 'Hayır', audioKey: 'hayir', emoji: '👎' },
  { id: 'hz_dur', text: 'Dur', audioKey: 'dur', emoji: '✋' },
];

const KATEGORI_EMOJI: Record<string, string> = {
  ihtiyaclar: '🍎', eylemler: '🏃', duygular: '😊', kisiler: '👪', yerler: '🏠', esyalar: '🧸', hayvanlar: '🐶', tasitlar: '🚗',
};
// İlk açılışta (henüz sayaç yokken) sık kullanılanlar
const VARSAYILAN_SIK = ['su', 'süt', 'elma', 'muz', 'ekmek', 'yemek yemek', 'tuvalete gitmek', 'uyumak', 'anne', 'baba', 'sarılmak', 'oyun oynamak istiyorum', 'parka gitmek istiyorum', 'dışarı çıkmak istiyorum', 'mola vermek istiyorum', 'yardım istiyorum'];
const BOYUT = { buyuk: 'grid-cols-2 landscape:grid-cols-4', orta: 'grid-cols-3 landscape:grid-cols-5', kucuk: 'grid-cols-4 landscape:grid-cols-7' } as const;
type Boyut = keyof typeof BOYUT;

const oku = <T,>(k: string, v: T): T => { try { const x = localStorage.getItem(k); return x ? JSON.parse(x) as T : v; } catch { return v; } };
const yaz = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* yok say */ } };

const resimHaritasi = new Map(imageData.map((i) => [i.id, i.imageUrl]));
const kartResmi = (c: CommunicationCard) => (c.imageId ? nesneUrl(resimHaritasi.get(c.imageId)) : null);

const KartIcerik: React.FC<{ card: CommunicationCard; kucuk?: boolean }> = ({ card, kucuk }) => {
  const url = kartResmi(card);
  const Icon = card.icon;
  return (
    <>
      <div className="flex-1 w-full flex items-center justify-center overflow-hidden rounded-xl bg-white">
        {card.emoji ? <span className={kucuk ? 'text-3xl' : 'text-5xl'}>{card.emoji}</span>
          : url ? <img src={url} alt="" className="w-full h-full object-cover" draggable={false} />
          : Icon ? <Icon className={kucuk ? 'w-8 h-8 text-sky-600' : 'w-12 h-12 text-sky-600'} /> : null}
      </div>
      <span className={`mt-1 w-full text-center font-black leading-tight text-slate-800 line-clamp-2 ${kucuk ? 'text-[11px]' : 'text-sm'}`}>{card.text}</span>
    </>
  );
};

const IfadeTahtasi: React.FC<Props> = ({ categories, sentence, onCardClick, onSpeakSentence, onClearSentence, onRemoveLast, onBack, isPremium, printPool, onTogglePrintPool, profilId }) => {
  const sayacAnahtar = `ifade_sayac_v1_${profilId || 'misafir'}`;
  const [sayac, setSayac] = useState<Record<string, number>>(() => oku(sayacAnahtar, {}));
  const [boyut, setBoyut] = useState<Boyut>(() => oku('ifade_boyut_v1', 'orta'));
  const [katId, setKatId] = useState<string>('sik');
  const [altId, setAltId] = useState<string | null>(null);
  const [yazdirma, setYazdirma] = useState(false);
  const yazdirmaIdleri = useMemo(() => new Set(printPool.map((c) => c.id)), [printPool]);

  // Tüm kartlar (sık kullanılanlar için)
  const tumKartlar = useMemo(() => {
    const m = new Map<string, CommunicationCard & { renk?: string }>();
    for (const k of categories) {
      for (const c of k.cards || []) m.set(c.id, { ...c, renk: k.color });
      for (const a of k.subCategories || []) for (const c of a.cards) m.set(c.id, { ...c, renk: k.color });
    }
    return m;
  }, [categories]);

  const sikKullanilan = useMemo(() => {
    const sirali = Object.entries(sayac).sort((a, b) => b[1] - a[1]).map(([id]) => tumKartlar.get(id)).filter(Boolean) as CommunicationCard[];
    if (sirali.length >= 12) return sirali.slice(0, 16);
    const ek = VARSAYILAN_SIK
      .map((v) => [...tumKartlar.values()].find((c) => c.text.toLocaleLowerCase('tr-TR') === v))
      .filter((c): c is CommunicationCard => !!c && !sirali.some((s) => s.id === c.id));
    return [...sirali, ...ek].slice(0, 16);
  }, [sayac, tumKartlar]);

  const kategori = categories.find((k) => k.id === katId);
  const altlar = kategori?.subCategories || [];
  const seciliAlt = altlar.find((a) => a.id === altId) || altlar[0];
  const kartlar: CommunicationCard[] = katId === 'sik' ? sikKullanilan : seciliAlt ? seciliAlt.cards : (kategori?.cards || []);

  const kartaBas = (c: CommunicationCard) => {
    if (yazdirma) { onTogglePrintPool({ ...c, categoryColor: kategori?.color || 'slate' }); return; }
    onCardClick(c);
    if (!c.id.startsWith('hz_')) {
      const yeni = { ...sayac, [c.id]: (sayac[c.id] || 0) + 1 };
      setSayac(yeni); yaz(sayacAnahtar, yeni);
    }
  };
  const boyutDegistir = () => {
    const sira: Boyut[] = ['buyuk', 'orta', 'kucuk'];
    const y = sira[(sira.indexOf(boyut) + 1) % sira.length];
    setBoyut(y); yaz('ifade_boyut_v1', y);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto px-3 pt-3 animate-fade-in">
      {/* Başlık */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="p-2 rounded-full bg-white/80 shadow active:scale-95" aria-label="Geri">
          <ArrowLeftIcon className="w-6 h-6 text-sky-700" />
        </button>
        <h1 className="flex-1 text-xl font-black text-sky-900">İfade Tahtası</h1>
        <button onClick={boyutDegistir} className="px-3 py-2 rounded-full bg-white/80 shadow text-xs font-black text-sky-800 active:scale-95" aria-label="Kart boyutu">
          🔍 {boyut === 'buyuk' ? 'Büyük' : boyut === 'orta' ? 'Orta' : 'Küçük'}
        </button>
        <button
          onClick={() => isPremium && setYazdirma((v) => !v)}
          className={`px-3 py-2 rounded-full shadow text-xs font-black active:scale-95 ${yazdirma ? 'bg-rose-500 text-white' : 'bg-white/80 text-sky-800'} ${isPremium ? '' : 'opacity-50'}`}
          aria-label="Yazdırmak için kart seç"
        >
          🖨️ {yazdirma ? 'Bitti' : 'Yazdır'}
        </button>
      </div>

      {/* Cümle şeridi */}
      <div className="flex items-stretch gap-2 mb-2">
        <button
          onClick={onSpeakSentence}
          disabled={sentence.length === 0}
          className="flex-1 min-h-[96px] rounded-3xl bg-white shadow-inner border-4 border-sky-200 p-2 flex items-center gap-2 overflow-x-auto text-left"
          aria-label="Cümleyi söyle"
        >
          {sentence.length === 0 ? (
            <span className="w-full text-center text-slate-400 font-semibold">Kartlara dokun, cümle kur. Dinlemek için buraya dokun.</span>
          ) : sentence.map((c, i) => (
            <span key={`${c.id}-${i}`} className="flex-shrink-0 w-[72px] h-[78px] flex flex-col items-center rounded-2xl bg-sky-50 border-2 border-sky-200 p-1">
              <KartIcerik card={c} kucuk />
            </span>
          ))}
        </button>
        <div className="flex flex-col gap-2">
          <button onClick={onSpeakSentence} disabled={sentence.length === 0} className="flex-1 px-3 rounded-2xl bg-green-500 text-white text-2xl shadow disabled:opacity-40 active:scale-95" aria-label="Söyle">🔊</button>
          <div className="flex gap-2">
            <button onClick={onRemoveLast} disabled={sentence.length === 0} className="px-2.5 py-2 rounded-2xl bg-amber-100 text-lg shadow disabled:opacity-40 active:scale-95" aria-label="Son kartı sil">⌫</button>
            <button onClick={onClearSentence} disabled={sentence.length === 0} className="px-2.5 py-2 rounded-2xl bg-rose-100 text-lg shadow disabled:opacity-40 active:scale-95" aria-label="Cümleyi temizle">🗑️</button>
          </div>
        </div>
      </div>

      {/* Hızlı kelimeler */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-1">
        {HIZLI.map((c) => (
          <button key={c.id} onClick={() => kartaBas(c)} className="flex-shrink-0 w-[68px] h-[72px] flex flex-col items-center justify-center rounded-2xl bg-amber-50 border-2 border-amber-200 shadow-sm active:scale-95">
            <span className="text-2xl" aria-hidden="true">{c.emoji}</span>
            <span className="text-[11px] font-black text-amber-900 leading-tight">{c.text}</span>
          </button>
        ))}
      </div>

      {/* Kategori sekmeleri */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[{ id: 'sik', title: 'Sık kullanılan', emoji: '⭐' }, ...categories.map((k) => ({ id: k.id, title: k.title, emoji: KATEGORI_EMOJI[k.id] || '📁' }))].map((k) => (
          <button key={k.id} onClick={() => { setKatId(k.id); setAltId(null); }}
            className={`flex-shrink-0 px-3 py-2 rounded-full text-sm font-black whitespace-nowrap shadow-sm active:scale-95 ${katId === k.id ? 'bg-sky-600 text-white' : 'bg-white/90 text-sky-900'}`}>
            {k.emoji} {k.title}
          </button>
        ))}
      </div>

      {/* Alt kategoriler */}
      {altlar.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto pb-2">
          {altlar.map((a) => (
            <button key={a.id} onClick={() => setAltId(a.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap active:scale-95 ${seciliAlt?.id === a.id ? 'bg-amber-400 text-amber-950' : 'bg-white/70 text-slate-700'}`}>
              {a.title}
            </button>
          ))}
        </div>
      )}

      {/* Kartlar */}
      <div className="flex-1 overflow-y-auto pb-24">
        {yazdirma && <p className="text-center text-sm font-bold text-rose-600 mb-2">Yazdırmak istediğin kartlara dokun.</p>}
        <div className={`grid gap-3 ${BOYUT[boyut]}`}>
          {kartlar.map((c) => (
            <button key={c.id} onClick={() => kartaBas(c)}
              className={`relative aspect-square flex flex-col items-center p-1.5 rounded-3xl bg-white shadow-md border-2 active:scale-95 transition ${yazdirma && yazdirmaIdleri.has(c.id) ? 'border-rose-500 ring-4 ring-rose-200' : 'border-white'}`}>
              <KartIcerik card={c} kucuk={boyut === 'kucuk'} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(IfadeTahtasi);
