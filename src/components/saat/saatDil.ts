// Saatin Türkçe söylenişi (Saat Merkezi, 2026-10-27).
// Tam ve buçuk cümleleri kavram etkinliğindekiyle (yeni/saatData.ts) birebir aynı: kayıtlı sesler çalsın.
export interface Saat { h: number; m: number } // h: 1-12, m: 0-59

const SAYI = ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz', 'on', 'on bir', 'on iki'];
const BELIRTME = ['', 'biri', 'ikiyi', 'üçü', 'dördü', 'beşi', 'altıyı', 'yediyi', 'sekizi', 'dokuzu', 'onu', 'on biri', 'on ikiyi'];
const YONELME = ['', 'bire', 'ikiye', 'üçe', 'dörde', 'beşe', 'altıya', 'yediye', 'sekize', 'dokuza', 'ona', 'on bire', 'on ikiye'];
const DAKIKA: Record<number, string> = { 5: 'beş', 10: 'on', 15: 'çeyrek', 20: 'yirmi', 25: 'yirmi beş' };

export const sonrakiSaat = (h: number) => (h % 12) + 1;
export const ayni = (a: Saat, b: Saat) => a.h === b.h && a.m === b.m;

/** "üç", "üç buçuk", "üçü çeyrek geçiyor", "dörde çeyrek var" (5 dakikalıklar da) */
export const soyle = ({ h, m }: Saat): string => {
  if (m === 0) return SAYI[h];
  if (m === 30) return `${SAYI[h]} buçuk`;
  if (m < 30) return `${BELIRTME[h]} ${DAKIKA[m] ?? `${m} dakika`} geçiyor`;
  return `${YONELME[sonrakiSaat(h)]} ${DAKIKA[60 - m] ?? `${60 - m} dakika`} var`;
};

/** Belirtme hali, "gösteriyor" ile: "üçü", "üç buçuğu", "üçü çeyrek geçeyi", "dörde çeyrek kalayı" */
export const gosterge = ({ h, m }: Saat): string => {
  if (m === 0) return BELIRTME[h];
  if (m === 30) return `${SAYI[h]} buçuğu`;
  if (m < 30) return `${BELIRTME[h]} ${DAKIKA[m] ?? `${m} dakika`} geçeyi`;
  return `${YONELME[sonrakiSaat(h)]} ${DAKIKA[60 - m] ?? `${60 - m} dakika`} kalayı`;
};

export const soru = (s: Saat) => `Hangi saat ${gosterge(s)} gösteriyor?`;
export const dogruCumle = (s: Saat) => `Evet! Saat ${soyle(s)}.`;
/** Varsayılan: seçilen saati söyler. Ayarlar > "Yanlışta kavramı olumsuzla" açıksa sorulan saat olumsuzlanır. */
export const yanlisCumle = (sorulan: Saat, secilen: Saat, olumsuz: boolean) =>
  olumsuz ? `Hayır, bu saat ${gosterge(sorulan)} göstermiyor.` : `Hayır, bu saat ${gosterge(secilen)} gösteriyor.`;
/** "Saati üç yap.", "Saati üçü çeyrek geçe yap.", "Saati dörde çeyrek kala yap." */
export const kurCumle = ({ h, m }: Saat) => {
  const ne = m === 0 ? SAYI[h] : m === 30 ? `${SAYI[h]} buçuk`
    : m < 30 ? `${BELIRTME[h]} ${DAKIKA[m]} geçe` : `${YONELME[sonrakiSaat(h)]} ${DAKIKA[60 - m]} kala`;
  return `Saati ${ne} yap.`;
};

export const dijital = ({ h, m }: Saat) => `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

export const yanlisOlumsuzAcik = () => { try { return localStorage.getItem('yanlisOlumsuz_v1') === 'true'; } catch { return false; } };
