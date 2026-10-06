// Nesne turu: eski nesne görselinin (/images/<id>.png|gif|webp, id < 2001) yeni gerçekçi karşılığı.
// Eşleme tools/gorsel-envanter/uret-nesne.mjs ile üretilir (database/nesneYeni.ts). Eski dosyalara dokunulmaz;
// adres yalnızca gösterirken (ve görsel kaydında) değiştirilir. YENI_SORULAR_AKTIF kapalıysa hiçbir şey değişmez.
import { NESNE_YENI } from './database/nesneYeni.ts';
import { YENI_SORULAR_AKTIF } from './database/activities/yeni/index.ts';

const ESKI = /^\/images\/(\d+)\.(png|gif|webp)$/;

/** Eski nesne adresini yenisine çevirir; karşılığı yoksa aynen döner. */
export const nesneUrl = (src: string | undefined | null): string => {
    if (!src || !YENI_SORULAR_AKTIF) return src || '';
    const m = ESKI.exec(src);
    if (!m) return src;
    const id = Number(m[1]);
    if (id >= 2001) return src;
    return NESNE_YENI[id] || src;
};

/**
 * Güvenlik ağı: eski görsel dosyası yüklenemezse (yedek/eski-gorseller'e taşındıysa) yeni karşılığına geç.
 * Eşleyiciden geçmeyen bir ekran gözden kaçsa bile kırık resim görünmez. Bir kez kurulur.
 */
export const eskiGorselYedeginiKur = (): void => {
    document.addEventListener('error', (e) => {
        const img = e.target as HTMLImageElement | null;
        if (!img || img.tagName !== 'IMG') return;
        const yol = new URL(img.src, location.href).pathname;
        const yeni = nesneUrl(yol.replace(/^\/realistic\//, '/images/'));
        if (yeni && yeni !== yol && img.dataset.eskiYedek !== '1') {
            img.dataset.eskiYedek = '1';
            img.src = yeni;
        }
    }, true);
};
