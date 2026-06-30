/**
 * Worksheet Registry — tüm başarım kategorileriyle eşleştirildi
 */

export type WorksheetCategory =
  | 'Zıt Kavramlar'
  | 'Mekan & Konum'
  | 'Miktar & Sayı'
  | 'Akıl Yürütme'
  | 'Zaman & Duyular'
  | 'Nesne Tanıma';

export interface WorksheetDef {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  category: WorksheetCategory;
  answerLabel: string;
  color: string;
  loadData: () => Promise<any[]>;
  /** Custom preview component. Defaults to GenericWorksheetPreview when omitted. */
  component?: 'whose-is-this' | 'color-recognition' | 'whats-missing';
}

// Turkish question generator for object recognition activities
const tq = (r: any): string => {
  const correct = r.options?.find((o: any) => o.isCorrect);
  if (!correct) return r.question;
  const word: string = correct.word ?? '';
  const lastVowel = word.match(/[aeıioöuü]/gi)?.pop()?.toLowerCase() ?? 'a';
  const suffix = ['e', 'i', 'ö', 'ü'].includes(lastVowel) ? 'dir' : 'dır';
  return `Hangisi ${word}${suffix}?`;
};

export const WORKSHEET_REGISTRY: WorksheetDef[] = [

  // ═══════════════════════════════════════════════════════
  //  ZIT KAVRAMLAR  (filtre yok → her iki yön karışık gelir)
  // ═══════════════════════════════════════════════════════

  { id: 'big-small',    emoji: '🐘🐭', title: 'Büyük - Küçük',        subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#6366f1',
    loadData: () => import('../../services/database/activities/qualities/bigSmallData.ts').then(m => m.bigSmallData) },

  { id: 'relative-big-small', emoji: '🔍🐘', title: 'Büyük - Küçük (Aynı)', subtitle: 'Aynı nesne karşılaştırması', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#4f46e5',
    loadData: () => import('../../services/database/activities/qualities/relativeBigSmallData').then(m => m.relativeBigSmallData) },

  { id: 'long-short',   emoji: '📏✂️', title: 'Uzun - Kısa',          subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#0ea5e9',
    loadData: () => import('../../services/database/activities/qualities/longShortData.ts').then(m => m.longShortData) },

  { id: 'abstract-long-short', emoji: '✏️📏', title: 'Uzun - Kısa (Basit Çizim)', subtitle: 'Sadeleştirilmiş şekiller', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#3b82f6',
    loadData: () => import('../../services/database/activities/qualities/abstractLongShortData').then(m => m.abstractLongShortData) },

  { id: 'thin-thick',   emoji: '📒📚', title: 'İnce - Kalın',          subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#f59e0b',
    loadData: () => import('../../services/database/activities/qualities/thinThickData.ts').then(m => m.thinThickData) },

  { id: 'wide-narrow',  emoji: '🛣️🚶', title: 'Geniş - Dar',          subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#10b981',
    loadData: () => import('../../services/database/activities/qualities/wideNarrowData.ts').then(m => m.wideNarrowData) },

  { id: 'old-new',      emoji: '🕰️✨', title: 'Eski - Yeni',           subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#f97316',
    loadData: () => import('../../services/database/activities/qualities/oldNewData.ts').then(m => m.oldNewData) },

  { id: 'young-old',    emoji: '👶🧓', title: 'Genç - Yaşlı',          subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#ec4899',
    loadData: () => import('../../services/database/activities/qualities/youngOldData.ts').then(m => m.youngOldData) },

  { id: 'hard-soft',    emoji: '🪨🧸', title: 'Sert - Yumuşak',        subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#78716c',
    loadData: () => import('../../services/database/activities/qualities/hardSoftData.ts').then(m => m.hardSoftData) },

  { id: 'clean-dirty',  emoji: '🧹🪣', title: 'Temiz - Kirli',         subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#38bdf8',
    loadData: () => import('../../services/database/activities/qualities/cleanDirtyData.ts').then(m => m.cleanDirtyData) },

  { id: 'wet-dry',      emoji: '💧☀️', title: 'Islak - Kuru',           subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#3b82f6',
    loadData: () => import('../../services/database/activities/qualities/wetDryData.ts').then(m => m.wetDryData) },

  { id: 'open-closed',  emoji: '🚪🔒', title: 'Açık - Kapalı',         subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#84cc16',
    loadData: () => import('../../services/database/activities/qualities/openClosedData.ts').then(m => m.openClosedData) },

  { id: 'straight-curved', emoji: '➖〰️', title: 'Düz - Eğri',        subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#a78bfa',
    loadData: () => import('../../services/database/activities/qualities/straightCurvedData.ts').then(m => m.straightCurvedData) },

  { id: 'alive-lifeless', emoji: '🌱🪨', title: 'Canlı - Cansız',     subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#16a34a',
    loadData: () => import('../../services/database/activities/qualities/aliveLifelessData.ts').then(m => m.aliveLifelessData) },

  { id: 'bitter-sweet', emoji: '🍋🍯', title: 'Acı - Tatlı',           subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#ca8a04',
    loadData: () => import('../../services/database/activities/qualities/bitterSweetData.ts').then(m => m.bitterSweetData) },

  { id: 'heavy-light',  emoji: '⚖️🪶', title: 'Ağır - Hafif',          subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#8b5cf6',
    loadData: () => import('../../services/database/activities/qualities/heavyLightData.ts').then(m => m.heavyLightData) },

  { id: 'hot-cold',     emoji: '🔥❄️', title: 'Sıcak - Soğuk',         subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#ef4444',
    loadData: () => import('../../services/database/activities/qualities/hotColdData.ts').then(m => m.hotColdData) },

  { id: 'rough-smooth', emoji: '🪵🪞', title: 'Pürüzlü - Pürüzsüz',    subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#92400e',
    loadData: () => import('../../services/database/activities/qualities/roughSmoothData.ts').then(m => m.roughSmoothData) },

  { id: 'broken-intact', emoji: '🔧💎', title: 'Kırık - Sağlam',       subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#dc2626',
    loadData: () => import('../../services/database/activities/qualities/brokenIntactData.ts').then(m => m.brokenIntactData) },

  { id: 'messy-clean',  emoji: '🧹📦', title: 'Dağınık - Düzenli',     subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#0891b2',
    loadData: () => import('../../services/database/activities/qualities/messyCleanData.ts').then(m => m.messyCleanData) },

  { id: 'fresh-stale',  emoji: '🥖🍞', title: 'Taze - Bayat',          subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#b45309',
    loadData: () => import('../../services/database/activities/qualities/tazeBayatData.ts').then(m => m.tazeBayatData) },

  { id: 'wrinkled-smooth', emoji: '👕✨', title: 'Kırışık - Düzgün',   subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#9333ea',
    loadData: () => import('../../services/database/activities/qualities/kirisikDuzgunData.ts').then(m => m.kirisikDuzgunData) },

  { id: 'sharp-blunt',  emoji: '🔪🏏', title: 'Sivri - Küt',           subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#64748b',
    loadData: () => import('../../services/database/activities/qualities/sivriKutData.ts').then(m => m.sivriKutData) },

  { id: 'shiny-dull',   emoji: '💡🌑', title: 'Parlak - Mat',           subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#eab308',
    loadData: () => import('../../services/database/activities/qualities/parlakMatData.ts').then(m => m.parlakMatData) },

  { id: 'lazy-hardworking', emoji: '😴💪', title: 'Tembel - Çalışkan', subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#6d28d9',
    loadData: () => import('../../services/database/activities/qualities/tembelCaliskanData.ts').then(m => m.tembelCaliskanData) },

  { id: 'transparent-opaque', emoji: '🔍🧱', title: 'Şeffaf - Opak',  subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#0e7490',
    loadData: () => import('../../services/database/activities/qualities/seffafOpakData.ts').then(m => m.seffafOpakData) },

  { id: 'spiky-smooth', emoji: '🌵🧸', title: 'Dikenli - Pürüzsüz',   subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#15803d',
    loadData: () => import('../../services/database/activities/qualities/dikenliPuruzsuzData.ts').then(m => m.dikenliPuruzsuzData) },

  { id: 'knotted-untied', emoji: '🪢🧵', title: 'Düğümlü - Çözük',    subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#c2410c',
    loadData: () => import('../../services/database/activities/qualities/dugumCozukData.ts').then(m => m.dugumCozukData) },

  { id: 'hungry-full',  emoji: '🍽️😋', title: 'Aç - Tok',              subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#d97706',
    loadData: () => import('../../services/database/activities/qualities/hungryFullData.ts').then(m => m.hungryFullData) },

  { id: 'deep-shallow', emoji: '🌊🏊', title: 'Derin - Sığ',            subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#1d4ed8',
    loadData: () => import('../../services/database/activities/qualities/derinSigData.ts').then(m => m.derinSigData) },

  { id: 'crowded-empty', emoji: '👥🏙️', title: 'Kalabalık - Tenha',   subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#475569',
    loadData: () => import('../../services/database/activities/qualities/kalabalikTenhaData.ts').then(m => m.kalabalikTenhaData) },

  { id: 'upside-down',  emoji: '🔄✅', title: 'Ters - Düz',             subtitle: 'Karışık yönler', category: 'Zıt Kavramlar', answerLabel: 'DOĞRU', color: '#7c3aed',
    loadData: () => import('../../services/database/activities/qualities/tersDuzData.ts').then(m => m.tersDuzData) },

  // ═══════════════════════════════════════════════════════
  //  MEKAN & KONUM
  // ═══════════════════════════════════════════════════════

  { id: 'on-under',     emoji: '⬆️⬇️', title: 'Üstünde - Altında',     subtitle: 'Karışık yönler', category: 'Mekan & Konum', answerLabel: 'DOĞRU', color: '#0891b2',
    loadData: () => import('../../services/database/activities/spatial/onUnderData.ts').then(m => m.onUnderData) },

  { id: 'inside-outside', emoji: '📦🌿', title: 'İçeride - Dışarıda', subtitle: 'Karışık yönler', category: 'Mekan & Konum', answerLabel: 'DOĞRU', color: '#059669',
    loadData: () => import('../../services/database/activities/spatial/insideOutsideData.ts').then(m => m.insideOutsideData) },

  { id: 'in-front-behind', emoji: '🚗🚶', title: 'Önde - Arkada',     subtitle: 'Karışık yönler', category: 'Mekan & Konum', answerLabel: 'DOĞRU', color: '#7c3aed',
    loadData: () => import('../../services/database/activities/spatial/inFrontOfBehindData.ts').then(m => m.inFrontOfBehindData) },

  { id: 'left-right',   emoji: '⬅️➡️', title: 'Sol - Sağ',             subtitle: 'Karışık yönler', category: 'Mekan & Konum', answerLabel: 'DOĞRU', color: '#db2777',
    loadData: () => import('../../services/database/activities/spatial/leftRightData.ts').then(m => m.leftRightData) },

  { id: 'near-far',     emoji: '📍🗺️', title: 'Yakın - Uzak',           subtitle: 'Karışık yönler', category: 'Mekan & Konum', answerLabel: 'DOĞRU', color: '#0284c7',
    loadData: () => import('../../services/database/activities/spatial/nearFarData.ts').then(m => m.nearFarData) },

  { id: 'high-low',     emoji: '🏔️🏕️', title: 'Yüksek - Alçak',       subtitle: 'Karışık yönler', category: 'Mekan & Konum', answerLabel: 'DOĞRU', color: '#16a34a',
    loadData: () => import('../../services/database/activities/spatial/highLowData.ts').then(m => m.highLowData) },

  { id: 'above-below',  emoji: '🔝🔽', title: 'Yukarıda - Aşağıda',    subtitle: 'Karışık yönler', category: 'Mekan & Konum', answerLabel: 'DOĞRU', color: '#6366f1',
    loadData: () => import('../../services/database/activities/spatial/belowAboveData.ts').then(m => m.belowAboveData) },

  { id: 'beside-opposite', emoji: '↔️👥', title: 'Yan Yana - Karşı Karşıya', subtitle: 'Karışık yönler', category: 'Mekan & Konum', answerLabel: 'DOĞRU', color: '#b45309',
    loadData: () => import('../../services/database/activities/spatial/besideOppositeData.ts').then(m => m.besideOppositeData) },

  { id: 'between',      emoji: '↔️📍', title: 'Arasında',               subtitle: 'Konum tespiti', category: 'Mekan & Konum', answerLabel: 'DOĞRU', color: '#0f766e',
    loadData: () => import('../../services/database/activities/spatial/betweenData.ts').then(m => m.betweenData) },

  // ═══════════════════════════════════════════════════════
  //  MİKTAR & SAYI
  // ═══════════════════════════════════════════════════════

  { id: 'full-empty',   emoji: '🥤🫙', title: 'Dolu - Boş',             subtitle: 'Karışık yönler', category: 'Miktar & Sayı', answerLabel: 'DOĞRU', color: '#e11d48',
    loadData: () => import('../../services/database/activities/quantities/fullEmptyData.ts').then(m => m.fullEmptyData) },

  { id: 'few-much',     emoji: '🫘🌾', title: 'Az - Çok',               subtitle: 'Karışık yönler', category: 'Miktar & Sayı', answerLabel: 'DOĞRU', color: '#d97706',
    loadData: () => import('../../services/database/activities/quantities/fewMuchData.ts').then(m => m.fewMuchData) },

  { id: 'odd-even',     emoji: '🔢🔣', title: 'Tek - Çift',             subtitle: 'Hangi sayı?', category: 'Miktar & Sayı', answerLabel: 'DOĞRU', color: '#7c3aed',
    loadData: () => import('../../services/database/activities/quantities/oddEvenData.ts').then(m => m.oddEvenData) },

  { id: 'how-many',     emoji: '🔢👁️', title: 'Kaç Tane Var?',          subtitle: 'Sayma', category: 'Miktar & Sayı', answerLabel: 'DOĞRU', color: '#0e7490',
    loadData: () => import('../../services/database/activities/quantities/countMatchData.ts').then(m => m.countMatchData) },

  { id: 'whole-half',   emoji: '🍕🍕', title: 'Tam - Yarım - Çeyrek',  subtitle: 'Bölünme', category: 'Miktar & Sayı', answerLabel: 'DOĞRU', color: '#b45309',
    loadData: () => import('../../services/database/activities/quantities/halfQuarterWholeData.ts').then(m => m.halfQuarterWholeData) },

  // ═══════════════════════════════════════════════════════
  //  AKIL YÜRÜTME
  // ═══════════════════════════════════════════════════════

  { id: 'what-doesnt-belong', emoji: '❌🔍', title: 'Hangisi Farklı?', subtitle: 'Gruba uymayan hangisi?', category: 'Akıl Yürütme', answerLabel: 'FARKLI OLAN', color: '#dc2626',
    loadData: () => import('../../services/database/activities/reasoning/whatDoesntBelongData.ts').then(m => m.whatDoesntBelongData) },

  { id: 'whose-is-this', emoji: '🎒👶', title: 'Bu Kimin?', subtitle: 'Eşyayı sahibiyle eşleştir', category: 'Akıl Yürütme', answerLabel: 'DOĞRU SAHİP', color: '#7c3aed', component: 'whose-is-this',
    loadData: () => import('../../services/database/activities/reasoning/ownershipData.ts').then(m => m.ownershipData) },

  { id: 'color-recognition', emoji: '🎨🔍', title: 'Rengi Ne?', subtitle: 'Nesnenin rengini bul', category: 'Akıl Yürütme', answerLabel: 'DOĞRU RENK', color: '#f97316', component: 'color-recognition',
    loadData: () => import('../../services/database/activities/reasoning/colorRecognitionData.ts').then(m => m.colorRecognitionData) },

  { id: 'whats-missing', emoji: '❓🔍', title: 'Hangisi Kayıp?', subtitle: 'Nesneleri ezberle, kayıp olanı bul', category: 'Akıl Yürütme', answerLabel: 'KAYIP NESNE', color: '#0891b2', component: 'whats-missing',
    loadData: () => import('../../services/database/activities/reasoning/whatsMissingData.ts').then(m => m.whatsMissingData) },

  { id: 'fivew-kim',    emoji: '🧑‍⚕️👩‍🏫', title: '5N1K — Kim?',        subtitle: 'Kim yapar / kimdir?', category: 'Akıl Yürütme', answerLabel: 'DOĞRU KİŞİ', color: '#be185d',
    loadData: () => import('../../services/database/activities/reasoning/fiveWOneHData.ts')
      .then(m => m.fiveWOneHData.filter((r: any) => r.question.toLowerCase().includes('kim'))) },

  { id: 'fivew-ne',     emoji: '🔍❓', title: '5N1K — Ne?',             subtitle: 'Ne kullanılır / nedir?', category: 'Akıl Yürütme', answerLabel: 'DOĞRU NESNE', color: '#1d4ed8',
    loadData: () => import('../../services/database/activities/reasoning/fiveWOneHData.ts')
      .then(m => m.fiveWOneHData.filter((r: any) => { const q = r.question.toLowerCase(); return q.includes(' ne ') || q.startsWith('ne ') || q.includes('nedir') || q.includes(' neye ') || q.includes('neyi'); })) },

  { id: 'fivew-nerede', emoji: '📍🏥', title: '5N1K — Nerede?',         subtitle: 'Nerede yapar / yaşar?', category: 'Akıl Yürütme', answerLabel: 'DOĞRU YER', color: '#0f766e',
    loadData: () => import('../../services/database/activities/reasoning/fiveWOneHData.ts')
      .then(m => m.fiveWOneHData.filter((r: any) => r.question.toLowerCase().includes('nerede'))) },

  { id: 'fivew-nezaman', emoji: '🕐📅', title: '5N1K — Ne Zaman?',     subtitle: 'Hangi zaman / durum?', category: 'Akıl Yürütme', answerLabel: 'DOĞRU ZAMAN', color: '#6d28d9',
    loadData: () => import('../../services/database/activities/reasoning/fiveWOneHData.ts')
      .then(m => m.fiveWOneHData.filter((r: any) => { const q = r.question.toLowerCase(); return q.includes('ne zaman') || q.includes('hangi zaman') || q.includes('gündüz') || q.includes('sabah') || q.includes('gece'); })) },

  { id: 'fivew-neden',  emoji: '🤔💬', title: '5N1K — Neden?',         subtitle: 'Neden / niçin?', category: 'Akıl Yürütme', answerLabel: 'DOĞRU NEDEN', color: '#b45309',
    loadData: () => import('../../services/database/activities/reasoning/fiveWOneHData.ts')
      .then(m => m.fiveWOneHData.filter((r: any) => { const q = r.question.toLowerCase(); return q.includes('neden') || q.includes('niçin') || q.includes('niye'); })) },

  { id: 'fivew-nasil',  emoji: '⚙️🛠️', title: '5N1K — Nasıl?',        subtitle: 'Nasıl yapılır?', category: 'Akıl Yürütme', answerLabel: 'DOĞRU YÖNTEM', color: '#0891b2',
    loadData: () => import('../../services/database/activities/reasoning/fiveWOneHData.ts')
      .then(m => m.fiveWOneHData.filter((r: any) => r.question.toLowerCase().includes('nasıl'))) },

  { id: 'fivew-karisik', emoji: '🔀❓', title: '5N1K — Karışık',      subtitle: 'Tüm soru türleri', category: 'Akıl Yürütme', answerLabel: 'DOĞRU CEVAP', color: '#6d28d9',
    loadData: () => import('../../services/database/activities/reasoning/fiveWOneHData.ts')
      .then(m => m.fiveWOneHData) },

  // ═══════════════════════════════════════════════════════
  //  ZAMAN KAVRAMI  (temporalData.ts'den)
  // ═══════════════════════════════════════════════════════

  { id: 'before-after', emoji: '🔁⏭️', title: 'Önce - Sonra',          subtitle: 'Karışık yönler', category: 'Zaman & Duyular', answerLabel: 'DOĞRU', color: '#7c3aed',
    loadData: () => import('../../services/database/activities/temporalData.ts').then(m => m.beforeAfterData) },

  { id: 'day-night',    emoji: '🌞🌙', title: 'Gündüz - Gece',         subtitle: 'Karışık yönler', category: 'Zaman & Duyular', answerLabel: 'DOĞRU', color: '#1e40af',
    loadData: () => import('../../services/database/activities/temporalData.ts').then(m => m.dayNightData) },

  { id: 'fast-slow',    emoji: '🐇🐢', title: 'Hızlı - Yavaş',         subtitle: 'Karışık yönler', category: 'Zaman & Duyular', answerLabel: 'DOĞRU', color: '#dc2626',
    loadData: () => import('../../services/database/activities/temporalData.ts').then(m => m.fastSlowData) },

  // ═══════════════════════════════════════════════════════
  //  DUYULAR
  // ═══════════════════════════════════════════════════════

  { id: 'senses',       emoji: '👁️👂', title: 'Duyularımız',           subtitle: 'Hangi duyu organı?', category: 'Zaman & Duyular', answerLabel: 'DOĞRU ORGAN', color: '#0f766e',
    loadData: () => import('../../services/database/activities/sensesData.ts').then(m => m.sensesData) },

  { id: 'noisy-quiet',  emoji: '🔊🤫', title: 'Gürültülü - Sessiz',    subtitle: 'Karışık yönler', category: 'Zaman & Duyular', answerLabel: 'DOĞRU', color: '#92400e',
    loadData: () => import('../../services/database/activities/qualities/noisyQuietData.ts').then(m => m.noisyQuietData) },

  // ═══════════════════════════════════════════════════════
  //  NESNE TANIMA  (Türkçe sorular otomatik üretilir)
  // ═══════════════════════════════════════════════════════

  { id: 'obj-animals',       emoji: '🐘🦁', title: 'Hayvanlar',         subtitle: 'Hangi hayvan?', category: 'Nesne Tanıma', answerLabel: 'DOĞRU HAYVAN', color: '#15803d',
    loadData: () => import('../../services/database/activities/objects/enAnimalsData.ts').then(m => m.enAnimalsData.map((r: any) => ({ ...r, question: tq(r) }))) },

  { id: 'obj-vehicles',      emoji: '🚗🚀', title: 'Taşıtlar',          subtitle: 'Hangi taşıt?', category: 'Nesne Tanıma', answerLabel: 'DOĞRU TAŞIT', color: '#1e40af',
    loadData: () => import('../../services/database/activities/objects/enVehiclesData.ts').then(m => m.enVehiclesData.map((r: any) => ({ ...r, question: tq(r) }))) },

  { id: 'obj-foods',         emoji: '🍎🥗', title: 'Yiyecekler',        subtitle: 'Hangi yiyecek?', category: 'Nesne Tanıma', answerLabel: 'DOĞRU YİYECEK', color: '#dc2626',
    loadData: () => import('../../services/database/activities/objects/enFoodsData.ts').then(m => m.enFoodsData.map((r: any) => ({ ...r, question: tq(r) }))) },

  { id: 'obj-fruits',        emoji: '🍓🍊', title: 'Meyveler',          subtitle: 'Hangi meyve?', category: 'Nesne Tanıma', answerLabel: 'DOĞRU MEYVE', color: '#f97316',
    loadData: () => import('../../services/database/activities/objects/enFruitsData.ts').then(m => m.enFruitsData.map((r: any) => ({ ...r, question: tq(r) }))) },

  { id: 'obj-vegetables',    emoji: '🥕🥦', title: 'Sebzeler',          subtitle: 'Hangi sebze?', category: 'Nesne Tanıma', answerLabel: 'DOĞRU SEBZE', color: '#15803d',
    loadData: () => import('../../services/database/activities/objects/enVegetablesData.ts').then(m => m.enVegetablesData.map((r: any) => ({ ...r, question: tq(r) }))) },

  { id: 'obj-drinks',        emoji: '🥤🧃', title: 'Diğer Yiyecekler',  subtitle: 'Hangi yiyecek?', category: 'Nesne Tanıma', answerLabel: 'DOĞRU YİYECEK', color: '#0891b2',
    loadData: () => import('../../services/database/activities/objects/enEntertainmentData.ts').then(m => m.enEntertainmentData.map((r: any) => ({ ...r, question: tq(r) }))) },

  { id: 'obj-household',     emoji: '🛋️🍳', title: 'Ev Eşyaları',      subtitle: 'Hangi eşya?', category: 'Nesne Tanıma', answerLabel: 'DOĞRU EŞYA', color: '#b45309',
    loadData: () => import('../../services/database/activities/objects/enHouseholdData.ts').then(m => m.enHouseholdData.map((r: any) => ({ ...r, question: tq(r) }))) },

  { id: 'obj-toys',          emoji: '🪀🧸', title: 'Oyuncaklar',        subtitle: 'Hangi oyuncak?', category: 'Nesne Tanıma', answerLabel: 'DOĞRU OYUNCAK', color: '#7c3aed',
    loadData: () => import('../../services/database/activities/objects/enToysData.ts').then(m => m.enToysData.map((r: any) => ({ ...r, question: tq(r) }))) },

  { id: 'obj-clothes',       emoji: '👕👗', title: 'Giysiler',          subtitle: 'Hangi giysi?', category: 'Nesne Tanıma', answerLabel: 'DOĞRU GİYSİ', color: '#9333ea',
    loadData: () => import('../../services/database/activities/objects/enClothesData.ts').then(m => m.enClothesData.map((r: any) => ({ ...r, question: tq(r) }))) },

  { id: 'obj-kitchen',       emoji: '🍳🥄', title: 'Mutfak Gereçleri', subtitle: 'Hangi mutfak gereci?', category: 'Nesne Tanıma', answerLabel: 'DOĞRU GERECI', color: '#c2410c',
    loadData: () => import('../../services/database/activities/objects/enKitchenData.ts').then(m => m.enKitchenData.map((r: any) => ({ ...r, question: tq(r) }))) },

  { id: 'obj-school',        emoji: '📚✏️', title: 'Okul & Ofis Eşyaları', subtitle: 'Hangi eşya?', category: 'Nesne Tanıma', answerLabel: 'DOĞRU EŞYA', color: '#0891b2',
    loadData: () => import('../../services/database/activities/objects/enSchoolItemsData.ts').then(m => m.enSchoolItemsData.map((r: any) => ({ ...r, question: tq(r) }))) },

  { id: 'obj-family',        emoji: '👪❤️', title: 'Aile Üyeleri',      subtitle: 'Kim?', category: 'Nesne Tanıma', answerLabel: 'DOĞRU KİŞİ', color: '#be185d',
    loadData: () => import('../../services/database/activities/objects/enPeopleData.ts').then(m => m.enPeopleData.map((r: any) => ({ ...r, question: tq(r) }))) },

  { id: 'obj-plants',        emoji: '🌸🌳', title: 'Bitkiler',          subtitle: 'Hangi bitki?', category: 'Nesne Tanıma', answerLabel: 'DOĞRU BİTKİ', color: '#16a34a',
    loadData: () => import('../../services/database/activities/objects/enPlantsData.ts').then(m => m.enPlantsData.map((r: any) => ({ ...r, question: tq(r) }))) },

  { id: 'obj-professions',   emoji: '👨‍⚕️👩‍🍳', title: 'Meslekler',    subtitle: 'Hangi meslek?', category: 'Nesne Tanıma', answerLabel: 'DOĞRU MESLEK', color: '#374151',
    loadData: () => import('../../services/database/activities/objects/enProfessionsData.ts').then(m => m.enProfessionsData.map((r: any) => ({ ...r, question: tq(r) }))) },

  { id: 'obj-places',        emoji: '🏥🏫', title: 'Yerler & Odalar',  subtitle: 'Hangi yer?', category: 'Nesne Tanıma', answerLabel: 'DOĞRU YER', color: '#1d4ed8',
    loadData: () => import('../../services/database/activities/objects/enPlacesData.ts').then(m => m.enPlacesData.map((r: any) => ({ ...r, question: tq(r) }))) },

  { id: 'obj-body',          emoji: '🦾👁️', title: 'Vücudun Bölümleri', subtitle: 'Hangi organ?', category: 'Nesne Tanıma', answerLabel: 'DOĞRU ORGAN', color: '#dc2626',
    loadData: () => import('../../services/database/activities/objects/enBodyPartsData.ts').then(m => m.enBodyPartsData.map((r: any) => ({ ...r, question: tq(r) }))) },

  { id: 'obj-tools',         emoji: '🔧🔨', title: 'Aletler',           subtitle: 'Hangi alet?', category: 'Nesne Tanıma', answerLabel: 'DOĞRU ALET', color: '#78716c',
    loadData: () => import('../../services/database/activities/objects/enToolsData.ts').then(m => m.enToolsData.map((r: any) => ({ ...r, question: tq(r) }))) },

  { id: 'obj-musical',       emoji: '🎸🎹', title: 'Müzik Aletleri',   subtitle: 'Hangi müzik aleti?', category: 'Nesne Tanıma', answerLabel: 'DOĞRU ALET', color: '#e11d48',
    loadData: () => import('../../services/database/activities/objects/enMusicalInstrumentsData.ts').then(m => m.enMusicalInstrumentsData.map((r: any) => ({ ...r, question: tq(r) }))) },

  { id: 'obj-nature',        emoji: '🌋🏝️', title: 'Doğal Yapılar & Uzay', subtitle: 'Nedir?', category: 'Nesne Tanıma', answerLabel: 'DOĞRU NESNE', color: '#0c4a6e',
    loadData: () => import('../../services/database/activities/objects/enNaturalStructuresData.ts').then(m => m.enNaturalStructuresData.map((r: any) => ({ ...r, question: tq(r) }))) },
];

// Ordered category list
export const WORKSHEET_CATEGORIES: WorksheetCategory[] = [
  'Zıt Kavramlar',
  'Mekan & Konum',
  'Miktar & Sayı',
  'Akıl Yürütme',
  'Zaman & Duyular',
  'Nesne Tanıma',
];
