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
export { fewMuchDataYeni } from './azCokData';
export { halfQuarterWholeDataYeni } from './butunYarimCeyrekData';
export { derinSigDataYeni } from './derinSigData';
export { openClosedDataYeni } from './acikKapaliData';
export { brokenIntactDataYeni } from './kirikSaglamData';
export { cleanDirtyDataYeni } from './temizKirliData';
export { wetDryDataYeni } from './islakKuruData';
export { oldNewDataYeni } from './eskiYeniData';
export { hardSoftDataYeni } from './sertYumusakData';
export { hotColdDataYeni } from './sicakSogukData';
export { roughSmoothDataYeni } from './puruzluPuruzsuzData';
export { dikenliPuruzsuzDataYeni } from './dikenliPuruzsuzData';
export { parlakMatDataYeni } from './parlakMatData';
export { seffafOpakDataYeni } from './seffafOpakData';
export { bitterSweetDataYeni } from './aciTatliData';
export { noisyQuietDataYeni } from './gurultuluSessizData';
export { hungryFullDataYeni } from './acTokData';
export { youngOldDataYeni } from './yasliGencData';
export { tembelCaliskanDataYeni } from './tembelCaliskanData';
export { kalabalikTenhaDataYeni } from './kalabalikTenhaData';
export { kirisikDuzgunDataYeni } from './kirisikDuzgunData';
export { dugumCozukDataYeni } from './dugumCozukData';
export { straightCurvedDataYeni } from './duzEgriData';
export { tazeBayatDataYeni } from './tazeBayatData';
export { messyCleanDataYeni } from './daginikTopluData';
export { hangisiFarkliKolayYeni, hangisiFarkliZorYeni } from './hangisiFarkliData';
export { leftRightDataYeni } from './sagSolData';
export { aliveLifelessDataYeni } from './canliCansizData';
export { saatDataYeni } from './saatData';
export { nearFarDataYeni } from './yakinUzakData';
export { besideOppositeDataYeni } from './yanyanaKarsiData';
export { tersDuzDataYeni } from './tersDuzData';
export { sivriKutDataYeni } from './sivriKutData';
export { dayNightDataYeni } from './gunduzGeceData';
export { fastSlowDataYeni } from './hizliYavasData';
export { beforeAfterDataYeni } from './onceSonraData';
export { heavyLightDataYeni } from './agirHafifData';
export { emotionsDataYeni } from './duygularData';
export { acikKoyuDataYeni } from './acikKoyuData';
export { yenirYenmezDataYeni } from './yenirYenmezData';
export { tehlikeliGuvenliDataYeni } from './tehlikeliGuvenliData';
export { havaDurumuDataYeni } from './havaDurumuData';
export { oddEvenDataYeni } from './tekCiftData';
export { ilkSonDataYeni } from './ilkSonData';
export { countMatchDataYeni } from './countMatchData';
export { sensesDataYeni } from './sensesData';
export { ownershipDataYeni } from './ownershipData';
export { ODA_GORSEL, KAP_GORSEL, RUTIN_GORSEL } from './tekilGorseller';
