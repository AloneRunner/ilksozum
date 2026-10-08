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
const ORGAN_IDLERI = new Set(ORGAN_ESKI.map(([id]) => id));

/**
 * Vücut bölümüyse eski çizim adresini döner (yoksa null). Ham adres (veri dosyasındaki) verilmeli: yalnız eski
 * organ kimliğiyle gelen görsel çizime döner. Aynı fotoğrafı doğrudan kullanan kavram soruları ("Hangi kızın saçı
 * uzun?" → 2414) fotoğraf kalır (Kaan, 2026-10-08: Alternatif açıkken uzun saçlı kız eski çizim oluyordu).
 */
export const organCizimi = (src: string | undefined | null): string | null => {
    if (!src) return null;
    const m = ESKI.exec(src);
    if (!m) return null;
    const id = Number(m[1]);
    return ORGAN_IDLERI.has(id) ? `/images/${id}.png` : null;
};
