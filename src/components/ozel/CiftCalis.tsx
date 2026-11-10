import React from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import AsamaliCalisma, { type Asama } from './AsamaliCalisma.tsx';
import { GercekSesAyari, gercekSesCal } from './gercekSes.tsx';
import { duyuYapi } from './DuyuCalis.tsx';
import { AraTani, AzCokTani, Grup, KacTani, ParcaTani, YakinSahne, YakinTani, nesneResmi, yerSec } from './miktarParca.tsx';
import { karistir, konus, zar, type Tur } from './ozelOrtak.tsx';
import {
  ISLAK_KURU, SICAK_SOGUK, HAVA_SICAK_SOGUK, GURULTULU_SESSIZ, KIRISIK_DUZ, TATLAR, DOKUNMA_SORU, DOKUNMA_SICAK, DOKUNMA_GUVENLI,
  PURUZLU, SIVRI_KUT, DIKENLI, DOLU_BOS, KALABALIK_TENHA, IC_DIS, YAN_YANA, SAG_SOL, ARASINDA, YAKIN_NESNE, YAKIN_YER, BIZE_YAKIN, yakinSoru, yakinDogru, type AraSet,
  TEK_CIFT, PARCALI, AZ_COK_NESNE, KAC_NESNE, KAC_SORU, azCokSoru, azCokDogru, kacDogru, parcaSoru, parcaDogru,
  dokunmaDogru, hazir, taniSoz, tatSoru, tatDogru, type CiftSet, type Tat, type Yiyecek, type Parcali, type Kisim,
} from '../../data/ciftKavramlar.ts';

// Gökhan Hoca'nın 2026-11-09 turu: fotoğraf çiftli kavramların aşamalı çalışması. Tanı → önce bir yan (10) → öteki yan (10) → karışık.
export type CiftKonu = 'islakKuru' | 'sicakSoguk' | 'aciTatli' | 'gurultuluSessiz' | 'kirisikDuz' | 'tekCift' | 'butunYarim' | 'azCok' | 'kacTane' | 'doluBos' | 'kalabalikTenha' | 'icDis' | 'yanYana' | 'sagSol' | 'arasinda' | 'yakinUzak' | 'duyular' | 'puruzlu' | 'sivriKut';
type Yon = 'a' | 'b';

// Havuz karışık gezilir: bütün çiftler bir kez çıkmadan aynı çift yeniden gelmez
const havuzdan = <T,>(l: T[], n: number): T[] => {
  const s: T[] = [];
  while (s.length < n) for (const x of karistir(l)) { if (s.length < n && s[s.length - 1] !== x) s.push(x); }
  return s;
};

const sesCal = (s: CiftSet, y: Yon) => (s.ses ? (y === 'a' ? gercekSesCal(s.ses) : gercekSesCal('sessiz', true)) : Promise.resolve());

const turKur = (s: CiftSet, y: Yon, etiketler: Record<Yon, string>): Tur => ({
  soru: s[y].soru, dogruId: y, dogruSoz: s[y].dogru, sonraSes: s.ses ? () => sesCal(s, y) : undefined,
  secenekler: karistir<Yon>(['a', 'b']).map((id) => ({ id, url: s[id].url, sonraYazi: id === y ? etiketler[y] : undefined })),
});
const yanTurlari = (l: CiftSet[], y: Yon, e: Record<Yon, string>, n = 10) => () => havuzdan(l, n).map((s) => turKur(s, y, e));
const karisikTurlari = (l: CiftSet[], e: Record<Yon, string>, n = 20) => () => havuzdan(l, n).map((s) => turKur(s, zar(2) ? 'a' : 'b', e));

const CiftTani: React.FC<{ baslik: string; emoji: string; setler: CiftSet[]; etiketler: Record<Yon, string>; ust?: React.ReactNode; onBack: () => void }> = ({ baslik, emoji, setler, etiketler, ust, onBack }) => {
  const dinlet = async (s: CiftSet, y: Yon) => { await konus(taniSoz(s[y].dogru)); if (s[y].uyari) await konus(s[y].uyari as string); await sesCal(s, y); };
  return (
    <OyunCercevesi baslik={baslik} emoji={emoji} onBack={onBack} yonerge="Resme dokun, dinle.">
      <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
        {ust}
        <div className="grid grid-cols-1 landscape:grid-cols-2 gap-3 w-full max-w-4xl mx-auto">
          {setler.map((s) => (
            <div key={s.a.url} className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-lg">
              {(['a', 'b'] as const).map((y) => (
                <button key={y} onClick={() => void dinlet(s, y)} className="rounded-2xl overflow-hidden active:scale-95">
                  <img src={s[y].url} alt="" draggable={false} className="w-full aspect-square object-cover" />
                  <span className="block text-lg font-black text-slate-800">{etiketler[y]}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </OyunCercevesi>
  );
};

// Tatlar: çiftler rastgele kurulur (tatlı–ekşi, tatlı–acı)
const tatTur = (sor: Tat, oteki: Tat, ...daha: Tat[]): Tur => {
  const y = TATLAR[sor][zar(TATLAR[sor].length)];
  const celdirici = [oteki, ...daha].map((t) => ({ t, o: TATLAR[t][zar(TATLAR[t].length)] }));
  const secenek = (t: Tat, o: Yiyecek) => ({ id: t, url: o.url, sonraYazi: t === sor ? t : undefined });
  return { soru: tatSoru(sor), dogruId: sor, dogruSoz: tatDogru(y.ad, sor), secenekler: karistir([secenek(sor, y), ...celdirici.map((c) => secenek(c.t, c.o))]) };
};
const on = (f: () => Tur) => () => Array.from({ length: 10 }, f);

const TatTani: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <OyunCercevesi baslik="Acı / Tatlı" emoji="🍋" onBack={onBack} yonerge="Resme dokun, dinle.">
    <div className="absolute inset-0 flex flex-col gap-4 px-3 pb-3 overflow-y-auto">
      {(['tatlı', 'ekşi', 'acı'] as const).map((t) => (
        <div key={t} className="w-full max-w-4xl mx-auto rounded-3xl bg-white p-3 shadow-lg">
          <div className="text-2xl font-black text-slate-800 text-center mb-2">{t}</div>
          <div className="grid grid-cols-4 landscape:grid-cols-5 gap-2">
            {TATLAR[t].map((o) => (
              <button key={o.ad} onClick={() => speak(taniSoz(tatDogru(o.ad, t)))} className="rounded-2xl active:scale-95">
                <img src={o.url} alt={o.ad} draggable={false} className="w-full aspect-square object-contain" />
                <span className="block text-sm font-bold text-slate-700">{o.ad}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </OyunCercevesi>
);

const dokunmaTur = (): Tur => {
  const s = DOKUNMA_SICAK[zar(DOKUNMA_SICAK.length)], g = DOKUNMA_GUVENLI[zar(DOKUNMA_GUVENLI.length)];
  const resim = (url: string, p: string) => <img src={url} alt="" draggable={false} className={`w-full aspect-square object-contain ${p}`} />;
  return {
    soru: DOKUNMA_SORU, dogruId: 'sicak', dogruSoz: dokunmaDogru(s.ad),
    secenekler: karistir([{ id: 'sicak', icerik: resim(s.url, ''), sonraYazi: 'sıcak' }, { id: 'guvenli', icerik: resim(g, 'p-[14%]') }]),
  };
};

// Arasında: "yan" resmi aynalanınca nesne solda olur (2 şıkta ikisinden biri, 3 şıkta üçü)
const araTur = (s: AraSet, sik: 2 | 3): Tur => {
  const resim = (id: string) => <img src={id === 'orta' ? s.orta : s.yan} alt="" draggable={false} className="w-full aspect-square object-contain" style={id === 'sol' ? { transform: 'scaleX(-1)' } : undefined} />;
  const idler = sik === 3 ? ['orta', 'sag', 'sol'] : ['orta', zar(2) ? 'sag' : 'sol'];
  return { soru: s.soru, dogruId: 'orta', dogruSoz: s.dogru, secenekler: karistir(idler).map((id) => ({ id, icerik: resim(id), sonraYazi: id === 'orta' ? 'arasında' : undefined })) };
};

const yakinTur = (yakin: boolean): Tur => {
  const n = YAKIN_NESNE[zar(YAKIN_NESNE.length)], y = YAKIN_YER[zar(YAKIN_YER.length)], hedef = yakin ? 'yakin' : 'uzak';
  return {
    soru: yakinSoru(n.ad, y, yakin), dogruId: hedef, dogruSoz: yakinDogru(n.ad, y, yakin),
    secenekler: karistir(['yakin', 'uzak']).map((id) => ({ id, icerik: <YakinSahne yer={y.dosya} nesne={n.dosya} yakin={id === 'yakin'} />, sonraYazi: id === hedef ? (yakin ? 'yakın' : 'uzak') : undefined })),
  };
};

// Bütün / Yarım: bütün hali her soruda üstte (hoca); etiket cevaptan sonra
const parcaTur = (p: Parcali, k: Kisim, sec: Kisim[]): Tur => ({
  soru: parcaSoru(p.ad, k), dogruId: k, dogruSoz: parcaDogru(p.ad, k),
  sahne: <img src={p.bütün} alt="" draggable={false} className="h-[18vh] w-[18vh] sm-landscape:h-[24vh] sm-landscape:w-[24vh] rounded-2xl bg-white object-contain shadow" />,
  secenekler: karistir(sec).map((id) => ({ id, url: p[id], sonraYazi: id === k ? k : undefined })),
});

// Az / Çok: az 1-4, çok 8-15; 4×4 sabit ızgara, nesne boyu ikisinde de aynı
const azCokTur = (ad: string, k: 'az' | 'çok'): Tur => {
  const url = nesneResmi(ad) || '';
  const kume = (id: 'az' | 'çok') => <Grup url={url} sutun={4} hucre={16} yerler={yerSec(id === 'çok' ? 8 + zar(8) : 1 + zar(4), 16)} />;
  return { soru: azCokSoru(ad, k), dogruId: k, dogruSoz: azCokDogru(ad, k), secenekler: karistir<'az' | 'çok'>(['az', 'çok']).map((id) => ({ id, icerik: kume(id), sonraYazi: id === k ? k : undefined })) };
};

// Kaç Tane: fark: şıklar arasındaki en az fark (ilk aşamada 2)
const kacTur = (sik: number, fark: number): Tur => {
  const nesneler = KAC_NESNE.filter((a) => nesneResmi(a));
  const ad = nesneler[zar(nesneler.length)], url = nesneResmi(ad) || '', n = 1 + zar(5);
  const adaylar = karistir([1, 2, 3, 4, 5].filter((x) => Math.abs(x - n) >= fark)).slice(0, sik - 1);
  return {
    soru: KAC_SORU, dogruId: String(n), dogruSoz: kacDogru(n, ad),
    sahne: <img src={`/images/${6725 + n}.webp`} alt="" draggable={false} className="h-[20vh] w-[20vh] sm-landscape:h-[26vh] sm-landscape:w-[26vh] rounded-2xl bg-white object-contain shadow" />,
    secenekler: karistir([n, ...adaylar]).map((x) => ({ id: String(x), icerik: <Grup url={url} sutun={3} hucre={9} yerler={yerSec(x, 9)} /> })),
  };
};

interface Yapi { id: string; baslik: string; emoji: string; aciklama: string; taniAlt: string; tani: (b: () => void, ust?: React.ReactNode) => React.ReactNode; asamalar: Asama[]; karisik: { alt: string; secenek: number; turlar: () => Tur[] }; ileri?: Asama[]; ust?: React.ReactNode; ek?: 'kutu' }

const ikiYan = (id: string, baslik: string, emoji: string, setler: CiftSet[], a: string, b: string, ust?: React.ReactNode, ozet?: string): Yapi => {
  const e = { a, b };
  return {
    id, baslik, emoji, ust, taniAlt: `${a} ve ${b}, dokun ve dinle`,
    aciklama: ozet || `Aynı nesne bir resimde ${a}, ötekinde ${b}. Önce “${a}”, sonra “${b}”; en son karışık.`,
    tani: (bitti) => <CiftTani baslik={baslik} emoji={emoji} setler={setler} etiketler={e} ust={ust} onBack={bitti} />,
    asamalar: [
      { ad: `${a.charAt(0).toLocaleUpperCase('tr-TR')}${a.slice(1)} · 2 şık`, alt: '10 soru', secenek: 2, turlar: yanTurlari(setler, 'a', e) },
      { ad: `${b.charAt(0).toLocaleUpperCase('tr-TR')}${b.slice(1)} · 2 şık`, alt: '10 soru', secenek: 2, turlar: yanTurlari(setler, 'b', e) },
    ],
    karisik: { alt: `20 soru, ${a} ve ${b} karışık`, secenek: 2, turlar: karisikTurlari(setler, e) },
  };
};

const yapiKur = (konu: CiftKonu): Yapi => {
  if (konu === 'puruzlu') return ikiYan('puruzluCalis', 'Pürüzlü / Pürüzsüz', '🪨', PURUZLU, 'pürüzlü', 'pürüzsüz', undefined, 'Aynı nesne, yalnız yüzeyi farklı. Pürüzlü elimize takılır, pürüzsüz düzdür. Önce “pürüzlü”, sonra “pürüzsüz”; en son karışık.');
  if (konu === 'sivriKut') return {
    ...ikiYan('sivriKutCalis', 'Sivri / Küt', '✏️', SIVRI_KUT, 'sivri', 'küt', undefined, 'Aynı nesnenin yalnız ucu farklı. Önce “sivri”, sonra “küt”; en son karışık. Sivri şeyler batar, dikkat ederiz. Sonra ileri aşama: dikenli, dikensiz.'),
    ileri: [{ ad: 'Dikenli, dikensiz', alt: '10 soru', secenek: 2, turlar: karisikTurlari(DIKENLI, { a: 'dikenli', b: 'dikensiz' }, 10) }],
  };
  if (konu === 'duyular') return duyuYapi();
  if (konu === 'doluBos') return ikiYan('doluBosCalis', 'Dolu / Boş', '🥛', DOLU_BOS, 'dolu', 'boş');
  if (konu === 'kalabalikTenha') return ikiYan('kalabalikCalis', 'Kalabalık / Tenha', '👥', KALABALIK_TENHA, 'kalabalık', 'tenha', undefined, 'Aynı yer bir resimde kalabalık, ötekinde tenha. Önce “kalabalık”, sonra “tenha”; en son karışık.');
  if (konu === 'icDis') return { ...ikiYan('icDisCalis', 'İçinde / Dışında', '📦', IC_DIS, 'içinde', 'dışında', undefined, 'İki resimde aynı kap ve aynı nesne, yalnız yeri farklı. Önce “içinde”, sonra “dışında”; en son karışık.'), ek: 'kutu' };
  if (konu === 'yanYana') return ikiYan('yanYanaCalis', 'Yan Yana / Karşı Karşıya', '🐱', YAN_YANA, 'yan yana', 'karşı karşıya', undefined, 'Aynı canlılar bir resimde yan yana, ötekinde karşı karşıya. Önce “yan yana”, sonra “karşı karşıya”; en son karışık.');
  if (konu === 'sagSol') return ikiYan('sagSolCalis', 'Sağ / Sol', '🐴', SAG_SOL, 'sola bakıyor', 'sağa bakıyor', undefined, 'Yalnız yüzü olan canlılar. Önce “sola”, sonra “sağa”; en son karışık. Doğru cevabın yeri her soruda değişir.');
  if (konu === 'arasinda') return {
    id: 'arasindaCalis', baslik: 'Arasında', emoji: '📦', taniAlt: 'Arasında olanlar, dokun ve dinle',
    aciklama: 'Nesne iki kabın arasında mı? Önce 2 şık, sonra nesne solda, ortada ya da sağda (3 şık); en son karışık.',
    tani: (bitti) => <AraTani setler={ARASINDA} onBack={bitti} />,
    asamalar: [
      { ad: '2 şık', alt: '10 soru', secenek: 2, turlar: () => havuzdan(ARASINDA, 10).map((s) => araTur(s, 2)) },
      { ad: '3 şık', alt: '10 soru: solda, ortada, sağda', secenek: 3, turlar: () => havuzdan(ARASINDA, 10).map((s) => araTur(s, 3)) },
    ],
    karisik: { alt: '20 soru, 3 şık', secenek: 3, turlar: () => havuzdan(ARASINDA, 20).map((s) => araTur(s, 3)) },
  };
  if (konu === 'yakinUzak') {
    const bize = { a: 'yakın', b: 'uzak' };
    return {
      id: 'yakinUzakCalis', baslik: 'Yakın / Uzak', emoji: '📏', taniAlt: 'Yakın ve uzak, dokun ve dinle',
      aciklama: 'Aynı sahne, nesneler aynı boyutta, yalnız aradaki mesafe değişir. Önce “yakın”, sonra “uzak”; en son karışık. Sonra ileri aşama: bize yakın, bizden uzak.',
      tani: (bitti) => <YakinTani onBack={bitti} />,
      asamalar: [
        { ad: 'Yakın · 2 şık', alt: '10 soru', secenek: 2, turlar: on(() => yakinTur(true)) },
        { ad: 'Uzak · 2 şık', alt: '10 soru', secenek: 2, turlar: on(() => yakinTur(false)) },
      ],
      karisik: { alt: '20 soru, yakın ve uzak karışık', secenek: 2, turlar: () => Array.from({ length: 20 }, () => yakinTur(zar(2) === 0)) },
      ileri: [{ ad: 'Bize yakın, bizden uzak', alt: '10 soru, fotoğraflarla', secenek: 2, turlar: karisikTurlari(BIZE_YAKIN, bize, 10) }],
    };
  }
  if (konu === 'tekCift') return ikiYan('tekCiftCalis', 'Tek / Çift', '🧦', TEK_CIFT, 'çift', 'tek', undefined, 'Aynı eşyanın bir resimde bir çifti, ötekinde teki var. Önce “çift”, sonra “tek”; en son karışık.');
  if (konu === 'butunYarim') {
    const ceyrekler = PARCALI.filter((p) => p.tamOran);
    const parca = (l: Parcali[], f: (p: Parcali) => Tur, n: number) => () => havuzdan(l, n).map(f);
    return {
      id: 'butunYarimCalis', baslik: 'Bütün / Yarım', emoji: '🍕', taniAlt: 'Elle ikiye ve dörde böl, dokun ve dinle',
      aciklama: 'Önce “bütün”, sonra “yarım”; en son karışık. Karışık bitince ileri aşama: çeyrek. Her soruda bütün hali üstte durur.',
      tani: (bitti) => <ParcaTani onBack={bitti} />,
      asamalar: [
        { ad: 'Bütün · 2 şık', alt: '10 soru', secenek: 2, turlar: parca(PARCALI, (p) => parcaTur(p, 'bütün', ['bütün', 'yarım']), 10) },
        { ad: 'Yarım · 2 şık', alt: '10 soru', secenek: 2, turlar: parca(PARCALI, (p) => parcaTur(p, 'yarım', ['bütün', 'yarım']), 10) },
      ],
      karisik: { alt: '20 soru, bütün ve yarım karışık', secenek: 2, turlar: parca(PARCALI, (p) => parcaTur(p, zar(2) ? 'bütün' : 'yarım', ['bütün', 'yarım']), 20) },
      ileri: [
        { ad: 'Çeyrek', alt: '10 soru, çeyrek ve yarım', secenek: 2, turlar: parca(ceyrekler, (p) => parcaTur(p, 'çeyrek', ['yarım', 'çeyrek']), 10) },
        { ad: 'Bütün, yarım, çeyrek', alt: '10 soru, 3 şık', secenek: 3, turlar: parca(ceyrekler, (p) => parcaTur(p, (['bütün', 'yarım', 'çeyrek'] as const)[zar(3)], ['bütün', 'yarım', 'çeyrek']), 10) },
      ],
    };
  }
  if (konu === 'azCok') {
    const nesneler = AZ_COK_NESNE.filter((a) => nesneResmi(a));
    return {
      id: 'azCokCalis', baslik: 'Az / Çok', emoji: '🍎', taniAlt: 'Az ve çok, dokun ve dinle',
      aciklama: 'İki resimde de nesneler aynı boyutta. Az olan 1-4, çok olan 8-15 tane. Önce “çok”, sonra “az”; en son karışık.',
      tani: (bitti) => <AzCokTani nesneler={nesneler.slice(0, 6)} onBack={bitti} />,
      asamalar: [
        { ad: 'Çok · 2 şık', alt: '10 soru', secenek: 2, turlar: () => havuzdan(nesneler, 10).map((a) => azCokTur(a, 'çok')) },
        { ad: 'Az · 2 şık', alt: '10 soru', secenek: 2, turlar: () => havuzdan(nesneler, 10).map((a) => azCokTur(a, 'az')) },
      ],
      karisik: { alt: '20 soru, az ve çok karışık', secenek: 2, turlar: () => havuzdan(nesneler, 20).map((a) => azCokTur(a, zar(2) ? 'çok' : 'az')) },
    };
  }
  if (konu === 'kacTane') {
    return {
      id: 'kacTaneCalis', baslik: 'Kaç Tane Var?', emoji: '🖐️', taniAlt: '1’den 5’e, dokun ve dinle',
      aciklama: 'Eldeki parmak kadar nesneyi bul. Nesneler her şıkta aynı boyutta. Önce 2 şık (sayılar birbirinden uzak), sonra 3 şık; en son karışık.',
      tani: (bitti) => <KacTani ad="elma" onBack={bitti} />,
      asamalar: [
        { ad: '2 şık', alt: '10 soru', secenek: 2, turlar: on(() => kacTur(2, 2)) },
        { ad: '3 şık', alt: '10 soru', secenek: 3, turlar: on(() => kacTur(3, 1)) },
      ],
      karisik: { alt: '20 soru, 3 şık', secenek: 3, turlar: () => Array.from({ length: 20 }, () => kacTur(3, 1)) },
    };
  }
  if (konu === 'islakKuru') return ikiYan('islakKuruCalis', 'Islak / Kuru', '💧', hazir(ISLAK_KURU), 'ıslak', 'kuru');
  if (konu === 'kirisikDuz') return ikiYan('kirisikDuzCalis', 'Kırışık / Düz', '👕', hazir(KIRISIK_DUZ), 'kırışık', 'düz');
  if (konu === 'gurultuluSessiz') return ikiYan('gurultuluSessizCalis', 'Gürültülü / Sessiz', '🔊', hazir(GURULTULU_SESSIZ), 'gürültülü', 'sessiz', <GercekSesAyari />,
    'Aynı özne bir resimde ses çıkarıyor, ötekinde çıkarmıyor. Doğru cevaptan sonra gerçek sesi çalar; sesi kısabilir ya da kapatabilirsiniz.');
  if (konu === 'sicakSoguk') {
    const y = ikiYan('sicakSogukCalis', 'Sıcak / Soğuk', '🔥', hazir(SICAK_SOGUK), 'sıcak', 'soğuk', undefined,
      'Önce “sıcak”, sonra “soğuk”; sıcak şeylere dokunmamayı öğrenip karışığa geçilir. Karışık tamamlanınca ileri aşama: hava durumu.');
    const he = { a: 'sıcak', b: 'soğuk' };
    const havaSet = hazir(HAVA_SICAK_SOGUK);
    return {
      ...y,
      asamalar: [...y.asamalar, { ad: 'Sıcak şeylere dokunmayız', alt: '10 soru', secenek: 2, turlar: on(dokunmaTur) }],
      ileri: [{ ad: 'Hava sıcak mı, soğuk mu?', alt: '10 soru', secenek: 2, turlar: () => havuzdan(havaSet.length > 1 ? havaSet : [...havaSet, ...havaSet], 10).map((s) => turKur(s, zar(2) ? 'a' : 'b', he)) }],
    };
  }
  return {
    id: 'aciTatliCalis', baslik: 'Acı / Tatlı', emoji: '🍋', taniAlt: 'Tatlı, ekşi ve acı, dokun ve dinle',
    aciklama: 'Önce tatlı ve ekşi ayrı ayrı, sonra tatlı ve acı; en son üçü bir arada.',
    tani: (bitti) => <TatTani onBack={bitti} />,
    asamalar: [
      { ad: 'Tatlı (ekşi yanında)', alt: '10 soru', secenek: 2, turlar: on(() => tatTur('tatlı', 'ekşi')) },
      { ad: 'Ekşi', alt: '10 soru', secenek: 2, turlar: on(() => tatTur('ekşi', 'tatlı')) },
      { ad: 'Tatlı (acı yanında)', alt: '10 soru', secenek: 2, turlar: on(() => tatTur('tatlı', 'acı')) },
      { ad: 'Acı', alt: '10 soru', secenek: 2, turlar: on(() => tatTur('acı', 'tatlı')) },
    ],
    karisik: { alt: '20 soru, tatlı, ekşi ve acı', secenek: 3, turlar: () => Array.from({ length: 20 }, () => {
      const t = (['tatlı', 'ekşi', 'acı'] as const)[zar(3)];
      const o = (['tatlı', 'ekşi', 'acı'] as const).filter((x) => x !== t);
      return tatTur(t, o[0], o[1]);
    }) },
  };
};

const CiftCalis: React.FC<{ konu: CiftKonu; onBack: () => void; onSorular: () => void; onKutu?: () => void }> = ({ konu, onBack, onSorular, onKutu }) => {
  const y = yapiKur(konu);
  return (
    <AsamaliCalisma id={y.id} baslik={y.baslik} emoji={y.emoji} aciklama={y.aciklama} onBack={onBack} onSorular={onSorular} ust={y.ust}
      ekKart={y.ek === 'kutu' && onKutu ? { emoji: '🖐️', baslik: 'Kutu Oyunu', alt: 'Nesneyi kendin yerleştir', onClick: onKutu } : undefined}
      tani={(bitti) => y.tani(bitti, y.ust)} taniAlt={y.taniAlt} asamalar={y.asamalar} karisik={y.karisik} ileri={y.ileri} />
  );
};

export default CiftCalis;
