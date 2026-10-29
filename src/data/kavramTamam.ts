// Kavram tamamlandı kaydı (Gökhan Hoca, 2026-10-29: "karışık bölüm tamamlanınca kavram tamamlandı sayılsın, rozet verilsin").
// Profil başına cihazda. Aşamalı çalışmalar yazar (ozel/ozelOrtak.tsx), Kavramlar menüsü kartta 🏅 gösterir.
import { ActivityType } from '../types.ts';

const profilId = () => { try { return JSON.parse(localStorage.getItem('activeProfileId_v1') || 'null') || 'misafir'; } catch { return 'misafir'; } };
const oku = (): Record<string, number> => { try { return JSON.parse(localStorage.getItem(`kavramTamam_${profilId()}`) || '{}'); } catch { return {}; } };
export const kavramTamamMi = (id: string) => !!oku()[id];
export const kavramTamamla = (id: string) => {
  try { localStorage.setItem(`kavramTamam_${profilId()}`, JSON.stringify({ ...oku(), [id]: Date.now() })); } catch { /* yok say */ }
};

/** Kavramlar menüsündeki etkinlik → aşamalı çalışmanın kimliği */
export const CALISMA_ID: Partial<Record<ActivityType, string>> = {
  [ActivityType.Colors]: 'renkOgren', [ActivityType.ColorRecognition]: 'rengiNe', [ActivityType.Shapes]: 'sekilCalis',
  [ActivityType.AcikKoyu]: 'acikKoyuCalis', [ActivityType.ParlakMat]: 'parlakMatCalis', [ActivityType.SeffafOpak]: 'seffafOpakCalis',
  [ActivityType.BigSmall]: 'buyukKucukCalis', [ActivityType.LongShort]: 'uzunKisaCalis', [ActivityType.ThinThick]: 'kalinInceCalis', [ActivityType.WideNarrow]: 'genisDarCalis', [ActivityType.DerinSig]: 'derinSigCalis',
};
