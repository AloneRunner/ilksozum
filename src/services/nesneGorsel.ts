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

// Vücut bölümleri (Kaan, 2026-10-06): varsayılan yeni fotoğraf; "Alternatif" açıksa eski çizim.
// Yeni adres → eski id (aynı fotoğrafı paylaşan dudak/ağız kelimeyle ayrılır).
const ORGAN_ESKI: Array<[number, string]> = [
    [285, 'el'], [479, 'gözler'], [490, 'kulak'], [555, 'kaş'], [556, 'burun'], [557, 'dudak'], [558, 'dil'],
    [559, 'omuz'], [560, 'kol'], [561, 'ayak'], [562, 'bacak'], [563, 'parmak'], [597, 'göz'], [662, 'saç'],
    [949, 'ağız'], [981, 'diş'],
];
const organlar = new Map<string, Array<[number, string]>>();
for (const [id, ad] of ORGAN_ESKI) {
    const yeni = NESNE_YENI[id];
    if (yeni) organlar.set(yeni, [...(organlar.get(yeni) || []), [id, ad]]);
}

/** Organ fotoğrafıysa eski çizim adresini döner (yoksa null). */
export const organCizimi = (src: string | undefined | null, kelime?: string): string | null => {
    if (!src) return null;
    const adaylar = organlar.get(src);
    if (!adaylar) return null;
    const k = (kelime || '').toLocaleLowerCase('tr-TR').trim();
    const secilen = adaylar.find(([, ad]) => ad === k) || adaylar[0];
    return `/images/${secilen[0]}.png`;
};
