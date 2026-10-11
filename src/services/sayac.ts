// Kullanım sayaçları (Kaan, 2026-10-11): Kaan'ın tüm uygulamaları için ortak panel (ozarik-sayac Firebase projesi).
// Yalnız toplamlar (+1) gider: kimlik, cihaz bilgisi, profil/çocuk adı, kişisel veri YOK; kimse giriş yapmaz.
// Firebase kütüphanesi yok: Realtime Database REST + sunucu tarafı artırma. İnternet yoksa sessizce atlanır.
import { Capacitor } from '@capacitor/core';

const DB = ''; // ör. https://ozarik-sayac-default-rtdb.europe-west1.firebasedatabase.app — boşsa hiçbir şey gönderilmez
const UYGULAMA = 'ilksozum';

type Grup = 'gun' | 'kurulum' | 'etkinlik' | 'ekran' | 'mod' | 'pdf' | 'basari' | 'hece' | 'ifade';
const anahtar = (s: string) => s.replace(/[.#$[\]/\s]/g, '_').slice(0, 50) || '_';
const bugun = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const oku = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const yaz = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* yok say */ } };

// Windows Store sürümü manifest'teki start_url ile açılır (?source=windows-app)
try { if (new URLSearchParams(location.search).get('source') === 'windows-app') yaz('sayac_platform', 'windows'); } catch { /* yok say */ }
const platform = (): string => (Capacitor.isNativePlatform() ? Capacitor.getPlatform() : oku('sayac_platform') || 'web');

// Kısa sürede gelen sayımlar tek istekte gider (aynı yol iki kez gelirse önce bekleyenler gönderilir)
let bekleyen: Record<string, { '.sv': { increment: number } }> = {};
let sonEkran = '';
let pdfAdi = '';
let zamanlayici: ReturnType<typeof setTimeout> | null = null;
const gonder = () => {
  if (zamanlayici) { clearTimeout(zamanlayici); zamanlayici = null; }
  const govde = bekleyen; bekleyen = {};
  if (!DB || !Object.keys(govde).length) return;
  fetch(`${DB}/sayac/${UYGULAMA}.json`, { method: 'PATCH', body: JSON.stringify(govde), keepalive: true }).catch(() => { /* çevrimdışı: yok say */ });
};

/** n: artış (1–100; kural bundan büyüğüne izin vermez) */
const say = (grup: Grup, a: string, b: string, n = 1) => {
  if (!DB || import.meta.env.DEV) return; // geliştirme ve testler sayılmaz
  n = Math.min(100, Math.round(n));
  if (n < 1) return;
  const yol = `${grup}/${anahtar(a)}/${anahtar(b)}`;
  if (bekleyen[yol]) gonder();
  bekleyen[yol] = { '.sv': { increment: n } };
  if (!zamanlayici) zamanlayici = setTimeout(gonder, 3000);
};

/** Uygulama açılışı: cihaz başına günde bir kez; ilk açılış ayrıca "kurulum" sayılır. */
export const acilisSay = () => {
  const g = bugun();
  if (!oku('sayac_kurulum')) { yaz('sayac_kurulum', g); say('kurulum', g, platform()); }
  if (oku('sayac_son_gun') !== g) { yaz('sayac_son_gun', g); say('gun', g, platform()); }
};

/** Ekran açıldı (Tuvalet, Ağzımı İzle, mini oyunlar, Program…) */
export const ekranSay = (ekran: string) => { sonEkran = ekran; pdfAdi = ''; say('ekran', ekran, 'acildi'); };

/** Etkinlik açıldı / sonuna kadar bitirildi (kimlik: etkinlik adı ya da kategori) */
export const etkinlikSay = (etkinlik: string, durum: 'acildi' | 'bitti') => say('etkinlik', etkinlik, durum);

/** Etkinlik bitince toplam doğru / soru (zorluk ölçüsü) */
export const basariSay = (etkinlik: string, dogru: number, soru: number) => { say('basari', etkinlik, 'dogru', dogru); say('basari', etkinlik, 'soru', soru); };

/** Program Modu oturumu, tanıma turu, Rastgele Oyna */
export const modSay = (mod: 'program' | 'tanima' | 'rastgele', durum: 'basladi' | 'bitti') => say('mod', mod, durum);

/** Hece Okuma: hangi derse girildi (1 = ünlüler önce, 2 = klasik) */
export const heceSay = (surum: number, ders: number) => say('hece', `surum${surum}`, `ders_${ders}`);

/** İfade Kartları: basılan kart (kategori + kart yazısı; kişisel değil, kartın kendisi) */
export const ifadeSay = (kategori: string, kart: string) => say('ifade', kategori, kart.toLocaleLowerCase('tr-TR'));

/** Çalışma kağıdı önizlemesi hangi etkinliği gösteriyor (yazdırma/PDF sayımında ad olarak kullanılır) */
export const pdfAdiAyarla = (ad: string) => { pdfAdi = ad; };

if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', gonder);
  // Çalışma kağıtları window.print() ile yazdırılır / PDF'e kaydedilir
  window.addEventListener('beforeprint', () => say('pdf', pdfAdi || sonEkran || 'bilinmiyor', 'yazdir'));
}
