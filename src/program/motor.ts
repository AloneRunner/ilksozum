// Program Modu 2 motoru: öğrenme kuralı, kulvar seviyesi, günlük oturum, yerleştirme (konu atlama), ayarlar.
// Kayıtlar eskisiyle aynı (activityStats; history.mode === 'program'), bu yüzden mevcut ilerleme kaybolmaz.
import { ActivityStats, AttemptRecord } from '../types.ts';
import { KULVARLAR, KulvarId, EtkinlikId, ODUL_OYUNLARI } from './kulvarlar.ts';

export type Rol = 'isinma' | 'yeni' | 'pekistirme' | 'yerlestirme';
export interface OturumOgesi { id: EtkinlikId; rol: Rol; kulvar: KulvarId }

export interface ProgramAyar {
  oturumUzunlugu: 5 | 7 | 10;
  kapaliKulvarlar: KulvarId[];
  odak: KulvarId | null;
  bilinen: Partial<Record<KulvarId, number>>; // atlanan / "biliyor" işaretli seviye sayısı (yerleştirme ya da ebeveyn)
  yerlestirme: 'yok' | 'devam' | 'bitti';
  yerlestirmeKuyrugu?: Array<{ id: EtkinlikId; kulvar: KulvarId }>;
  sonOturum?: string; // YYYY-MM-DD (bitirilen son oturum)
  bekleyenDegerlendirme?: boolean; // yerleştirme turu bitti, sonuç program ekranında hesaplanacak
}

// Okuma varsayılan kapalı (Kaan, 2026-10-06): çocuğun yaşı bilinmiyor (3 de olabilir 10 da); okuma ayrı menüde.
// Ebeveyn Program Modu > Ayarlar'dan açabilir.
const VARSAYILAN: ProgramAyar = { oturumUzunlugu: 7, kapaliKulvarlar: ['okuma'], odak: null, bilinen: {}, yerlestirme: 'yok' };
const anahtar = (profil?: string | null) => `program2_${profil || 'misafir'}`;

export const ayarOku = (profil?: string | null): ProgramAyar => {
  try { const x = localStorage.getItem(anahtar(profil)); return x ? { ...VARSAYILAN, ...JSON.parse(x) } : { ...VARSAYILAN }; } catch { return { ...VARSAYILAN }; }
};
export const ayarYaz = (profil: string | null | undefined, a: ProgramAyar) => { try { localStorage.setItem(anahtar(profil), JSON.stringify(a)); } catch { /* yok say */ } };
export const bugun = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

type Kayitlar = Record<string, ActivityStats>;
const kayitlari = (stats: Kayitlar, id: EtkinlikId): AttemptRecord[] => (stats[String(id)]?.history || []).filter((h) => h.total > 0);
const oran = (h: AttemptRecord) => h.score / h.total;

/** Öğrendi: son 2 program denemesi %80 ve üstü (serbest oyunda son 3 deneme %90 ve üstüyse de sayılır). */
export const ogrendiMi = (stats: Kayitlar, id: EtkinlikId): boolean => {
  const h = kayitlari(stats, id);
  const prog = h.filter((x) => x.mode === 'program').slice(-2);
  if (prog.length === 2 && prog.every((x) => oran(x) >= 0.8)) return true;
  const son3 = h.slice(-3);
  return son3.length === 3 && son3.every((x) => oran(x) >= 0.9);
};
/** İçeriği hiç yüklenemeyen etkinlik seviyeyi kilitlemesin */
const yuklenemiyor = (stats: Kayitlar, id: EtkinlikId) => (stats[String(id)]?.loadFailures || 0) >= 2 && kayitlari(stats, id).length === 0;
export const sonOran = (stats: Kayitlar, id: EtkinlikId): number | null => { const h = kayitlari(stats, id); return h.length ? oran(h[h.length - 1]) : null; };

/** Eski Program Modu'nda ilerlemiş çocuk geri düşmesin: eski en yüksek ünite → kulvarlarda en az bu kadar seviye bilinir */
const ESKI_UNITE_KARSILIGI: Array<[number, Partial<Record<KulvarId, number>>]> = [
  [3, { kelimeler: 1, kavramlar: 1 }],
  [5, { kelimeler: 2, kavramlar: 2, dusunme: 1 }],
  [7, { kelimeler: 3, kavramlar: 3, sayilar: 1, el: 1 }],
  [9, { kelimeler: 3, kavramlar: 4, sayilar: 1, dusunme: 2, el: 1 }],
];
const eskiBilinen = (profil?: string | null): Partial<Record<KulvarId, number>> => {
  let u = 0;
  try { u = Number(localStorage.getItem(`programHighWater_${profil}`) || 0); } catch { /* yok say */ }
  let sonuc: Partial<Record<KulvarId, number>> = {};
  for (const [esik, b] of ESKI_UNITE_KARSILIGI) if (u >= esik) sonuc = b;
  return sonuc;
};

export interface KulvarDurumu { id: KulvarId; seviye: number; toplam: number; bitti: boolean; ogrenilen: number; seviyeEtkinlikSayisi: number }

/** Kulvarın şu anki seviyesi: bilinen seviyelerden sonra, etkinliklerinin %80'i öğrenilmemiş ilk seviye (0 tabanlı) */
export const kulvarDurumu = (stats: Kayitlar, ayar: ProgramAyar, id: KulvarId, profil?: string | null): KulvarDurumu => {
  const k = KULVARLAR.find((x) => x.id === id)!;
  const taban = Math.max(ayar.bilinen[id] || 0, eskiBilinen(profil)[id] || 0);
  for (let s = Math.min(taban, k.seviyeler.length); s < k.seviyeler.length; s++) {
    const et = k.seviyeler[s].etkinlikler;
    const ogrenilen = et.filter((e) => ogrendiMi(stats, e) || yuklenemiyor(stats, e)).length;
    if (ogrenilen < Math.ceil(et.length * 0.8)) return { id, seviye: s, toplam: k.seviyeler.length, bitti: false, ogrenilen, seviyeEtkinlikSayisi: et.length };
  }
  return { id, seviye: k.seviyeler.length, toplam: k.seviyeler.length, bitti: true, ogrenilen: 0, seviyeEtkinlikSayisi: 0 };
};

/** Gün + profile göre sabit karıştırma: önizlemede görülen oturum Başlat'ta değişmesin */
const tohumluRastgele = (tohum: string) => {
  let h = 2166136261;
  for (const c of tohum) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 100000) / 100000; };
};
const karistir = <T,>(dizi: T[], r: () => number) => dizi.map((x) => [r(), x] as const).sort((a, b) => a[0] - b[0]).map((x) => x[1]);

/** Aralıklı tekrar: öğrenilmiş etkinlik ne zaman yeniden gelsin (gün) */
const tekrarAraligi = (n: number) => [1, 3, 7, 14, 30][Math.min(n, 4)];

export const oturumKur = (stats: Kayitlar, ayar: ProgramAyar, profil?: string | null, ek = 0): OturumOgesi[] => {
  const r = tohumluRastgele(`${bugun()}|${profil}|${ek}`);
  const acik = KULVARLAR.filter((k) => !ayar.kapaliKulvarlar.includes(k.id));
  const durumlar = acik.map((k) => kulvarDurumu(stats, ayar, k.id, profil));
  const uzunluk = ayar.oturumUzunlugu;
  const secilen = new Set<string>();
  const oturum: OturumOgesi[] = [];
  const ekle = (o: OturumOgesi) => { if (!secilen.has(String(o.id))) { secilen.add(String(o.id)); oturum.push(o); } };

  // 1) Isınma: tekrar zamanı gelmiş öğrenilmiş bir etkinlik (en gecikmiş olan)
  const simdi = Date.now();
  const tekrarlar: Array<{ id: EtkinlikId; kulvar: KulvarId; gecikme: number }> = [];
  for (const k of acik) for (const sv of k.seviyeler) for (const e of sv.etkinlikler) {
    if (!ogrendiMi(stats, e)) continue;
    const h = kayitlari(stats, e);
    const son = h[h.length - 1]?.timestamp || 0;
    const gecikme = (simdi - son) / 86400000 - tekrarAraligi(h.filter((x) => x.mode === 'program').length);
    if (gecikme >= 0) tekrarlar.push({ id: e, kulvar: k.id, gecikme });
  }
  tekrarlar.sort((a, b) => b.gecikme - a.gecikme);
  if (tekrarlar[0]) ekle({ id: tekrarlar[0].id, kulvar: tekrarlar[0].kulvar, rol: 'isinma' });

  // 2) Yeni: her kulvarın o anki seviyesinden, sırayla (önce odak kulvarı); denenmemişler önce, sonra en zayıflar
  const adaylar = new Map<KulvarId, EtkinlikId[]>();
  for (const d of durumlar) {
    if (d.bitti) continue;
    const et = KULVARLAR.find((k) => k.id === d.id)!.seviyeler[d.seviye].etkinlikler.filter((e) => !ogrendiMi(stats, e) && !yuklenemiyor(stats, e));
    const denenmemis = karistir(et.filter((e) => sonOran(stats, e) === null), r);
    const zayif = et.filter((e) => sonOran(stats, e) !== null).sort((a, b) => (sonOran(stats, a)! - sonOran(stats, b)!));
    adaylar.set(d.id, [...denenmemis, ...zayif]);
  }
  let sira = karistir([...adaylar.keys()], r);
  if (ayar.odak && adaylar.has(ayar.odak)) sira = [ayar.odak, ayar.odak, ...sira.filter((k) => k !== ayar.odak)];
  const yeniHedef = uzunluk - (oturum.length ? 1 : 0) - 1; // bir yer pekiştirmeye
  let tur = 0;
  while (oturum.filter((o) => o.rol === 'yeni').length < yeniHedef && tur < 40) {
    let eklendi = false;
    for (const k of sira) {
      if (oturum.filter((o) => o.rol === 'yeni').length >= yeniHedef) break;
      const liste = adaylar.get(k)!;
      const sonraki = liste.find((e) => !secilen.has(String(e)));
      if (sonraki !== undefined) { ekle({ id: sonraki, kulvar: k, rol: 'yeni' }); eklendi = true; }
    }
    if (!eklendi) break;
    tur++;
  }

  // 3) Pekiştirme: denenmiş ama öğrenilmemiş, en düşük son başarı (oturumda olmayan)
  const zayiflar: Array<{ id: EtkinlikId; kulvar: KulvarId; o: number }> = [];
  for (const k of acik) for (const sv of k.seviyeler) for (const e of sv.etkinlikler) {
    const o = sonOran(stats, e);
    if (o !== null && o < 0.8 && !ogrendiMi(stats, e) && !secilen.has(String(e))) zayiflar.push({ id: e, kulvar: k.id, o });
  }
  zayiflar.sort((a, b) => a.o - b.o);
  if (zayiflar[0]) ekle({ id: zayiflar[0].id, kulvar: zayiflar[0].kulvar, rol: 'pekistirme' });

  // Eksik kaldıysa: önce kalan yeni adaylarla, sonra tekrarlarla doldur
  for (const k of sira) {
    for (const e of adaylar.get(k) || []) { if (oturum.length >= uzunluk) break; ekle({ id: e, kulvar: k, rol: 'yeni' }); }
  }
  for (const t of tekrarlar.slice(1)) { if (oturum.length >= uzunluk) break; ekle({ id: t.id, kulvar: t.kulvar, rol: 'isinma' }); }

  // Sıra: ısınma → yeniler → pekiştirme
  const rolSira: Record<Rol, number> = { isinma: 0, yerlestirme: 1, yeni: 1, pekistirme: 2 };
  return oturum.slice(0, uzunluk).sort((a, b) => rolSira[a.rol] - rolSira[b.rol]);
};

/** Yerleştirme turu: her açık kulvarın şu anki seviyesinden bir yoklama etkinliği (konu atlama) */
export const yerlestirmeKur = (stats: Kayitlar, ayar: ProgramAyar, profil?: string | null): OturumOgesi[] => {
  const sonuc: OturumOgesi[] = [];
  for (const k of KULVARLAR) {
    if (ayar.kapaliKulvarlar.includes(k.id) || k.id === 'el') continue; // el becerisi puanla ölçülemiyor
    const d = kulvarDurumu(stats, ayar, k.id, profil);
    if (d.bitti) continue;
    const ilk = k.seviyeler[d.seviye].etkinlikler[0];
    sonuc.push({ id: ilk, kulvar: k.id, rol: 'yerlestirme' });
  }
  return sonuc;
};

/** Yerleştirme bitince: yoklamada %80 ve üstü alınan kulvarlarda o seviye "biliyor" sayılır (bir seviye atlanır) */
export const yerlestirmeDegerlendir = (stats: Kayitlar, ayar: ProgramAyar, profil?: string | null): { ayar: ProgramAyar; atlanan: KulvarId[] } => {
  const atlanan: KulvarId[] = [];
  const bilinen = { ...ayar.bilinen };
  for (const y of ayar.yerlestirmeKuyrugu || []) {
    const o = sonOran(stats, y.id);
    if (o !== null && o >= 0.8) {
      const d = kulvarDurumu(stats, ayar, y.kulvar, profil);
      bilinen[y.kulvar] = Math.max(bilinen[y.kulvar] || 0, d.seviye + 1);
      atlanan.push(y.kulvar);
    }
  }
  return { ayar: { ...ayar, bilinen, yerlestirme: 'bitti', yerlestirmeKuyrugu: undefined }, atlanan };
};

export const odulOyunu = () => ODUL_OYUNLARI[Math.floor(Math.random() * ODUL_OYUNLARI.length)];

/** Program kuyruğu bittiğinde (useActivity): bugünü kaydet; yerleştirme turuysa değerlendirmeyi beklet */
export const programOturumBitti = (profil?: string | null) => {
  const a = ayarOku(profil);
  ayarYaz(profil, { ...a, sonOturum: bugun(), ...(a.yerlestirme === 'devam' ? { bekleyenDegerlendirme: true } : {}) });
};
