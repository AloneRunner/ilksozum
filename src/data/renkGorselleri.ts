// Renkler etkinliğinin fotoğrafları: 11 nesne × 7 renk (tools/gorsel-envanter/uret-cift.mjs, id 7101-7177).
// Renk Öğren (Gökhan Hoca, 2026-10-29) ve Renkler etiketi ("yeşil elbise") buradan okur.
export const RENKLER = ['kırmızı', 'mavi', 'sarı', 'yeşil', 'turuncu', 'mor', 'pembe'] as const;
export type Renk = typeof RENKLER[number];
export const RENK_KODU: Record<Renk, string> = {
  'kırmızı': '#ef4444', mavi: '#3b82f6', 'sarı': '#facc15', 'yeşil': '#22c55e', turuncu: '#f97316', mor: '#a855f7', pembe: '#ec4899',
};

const s = (kirmizi: number, mavi: number, sari: number, yesil: number, turuncu: number, mor: number, pembe: number): Record<Renk, number> =>
  ({ 'kırmızı': kirmizi, mavi, 'sarı': sari, 'yeşil': yesil, turuncu, mor, pembe });
export const RENKLI_NESNELER: Record<string, Record<Renk, number>> = {
  araba: s(7101, 7102, 7105, 7107, 7106, 7103, 7104),
  balon: s(7108, 7109, 7112, 7114, 7113, 7110, 7111),
  'çanta': s(7115, 7116, 7119, 7121, 7120, 7117, 7118),
  'çizme': s(7122, 7123, 7126, 7128, 7127, 7124, 7125),
  elbise: s(7129, 7130, 7133, 7135, 7134, 7131, 7132),
  'çöp kovası': s(7136, 7137, 7140, 7142, 7141, 7138, 7139),
  kupa: s(7143, 7144, 7147, 7149, 7148, 7145, 7146),
  'şemsiye': s(7150, 7151, 7154, 7156, 7155, 7152, 7153),
  'şişe': s(7157, 7158, 7161, 7163, 7162, 7159, 7160),
  'tişört': s(7164, 7165, 7168, 7170, 7169, 7166, 7167),
  top: s(7171, 7172, 7175, 7177, 7176, 7173, 7174),
};
export const NESNELER = Object.keys(RENKLI_NESNELER);
export const renkliUrl = (nesne: string, renk: Renk) => `/images/${RENKLI_NESNELER[nesne][renk]}.webp`;

const AD = new Map<number, string>();
for (const [n, r] of Object.entries(RENKLI_NESNELER)) for (const renk of RENKLER) AD.set(r[renk], `${renk} ${n}`);
/** Görsel kimliğinden "yeşil elbise" (Renkler etiketi); renkli fotoğraf değilse undefined */
export const renkliAd = (id: number): string | undefined => AD.get(id);

const ilkBuyuk = (t: string) => t.charAt(0).toLocaleUpperCase('tr-TR') + t.slice(1);
export const renkliAdCumle = (nesne: string, renk: Renk) => `${ilkBuyuk(renk)} ${nesne}.`;
export const renkSoru = (nesne: string, renk: Renk) => `Hangi ${nesne} ${renk}?`;
export const renkDogru = (nesne: string, renk: Renk) => `Evet! Bu ${nesne} ${renk}.`;
