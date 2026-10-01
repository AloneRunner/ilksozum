// Yeni (gerçekçi görselli) soru setleri.
// 2026-10-01'den itibaren derlenen uygulamada da açık (Kaan onayı). Eski soru dosyaları yedek olarak
// duruyor; geri dönmek için bu satırı `false` yapmak yeterli. Yenilenmeyen etkinlikler eski verisini kullanır.
// Plan: tools/gorsel-envanter/YOL-HARITASI.md
export const YENI_SORULAR_AKTIF: boolean = true;

export { thinThickDataYeni } from './thinThickData';
export {
    insideOutsideDataYeni,
    onUnderDataYeni,
    inFrontOfBehindDataYeni,
    betweenDataYeni,
    belowAboveDataYeni,
} from './konumData';
export { wideNarrowDataYeni } from './genisDarData';
export { bigSmallDataYeni } from './buyukKucukData';
export { longShortDataYeni } from './uzunKisaData';
export { highLowDataYeni } from './yuksekAlcakData';
export { fullEmptyDataYeni } from './doluBosData';
