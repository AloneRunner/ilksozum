// Rengi Ne? (yeni): nesnelerin gerçek fotoğrafları, doğal renkleri belli olanlar.
// Eski veriden farkı: üzüm yeni fotoğrafta yeşil; mor için erik ve patlıcan; mavi soruları eklendi (gökyüzü, deniz).
import { ActivityType } from '../../../../types.ts';
import { ColorRecognitionRound } from '../reasoning/colorRecognitionData.ts';

// [resim, kelime, renk, soru (…rengi ne?), doğru cümle özne]
const R: [string, string, string, string][] = [
  ['/images/2307.webp', 'elma', 'kırmızı', 'Elmanın'],
  ['/images/5004.webp', 'domates', 'kırmızı', 'Domatesin'],
  ['/images/6803.webp', 'çilek', 'kırmızı', 'Çileğin'],
  ['/images/8278.webp', 'kiraz', 'kırmızı', 'Kirazın'],
  ['/images/8498.webp', 'nar', 'kırmızı', 'Narın'],
  ['/images/5014.webp', 'muz', 'sarı', 'Muzun'],
  ['/images/8237.webp', 'güneş', 'sarı', 'Güneşin'],
  ['/images/2813.webp', 'limon', 'sarı', 'Limonun'],
  ['/images/8853.webp', 'mısır', 'sarı', 'Mısırın'],
  ['/images/8376.webp', 'civciv', 'sarı', 'Civcivin'],
  ['/images/6807.webp', 'havuç', 'turuncu', 'Havucun'],
  ['/images/5016.webp', 'portakal', 'turuncu', 'Portakalın'],
  ['/images/6202.webp', 'mandalina', 'turuncu', 'Mandalinanın'],
  ['/images/6201.webp', 'balkabağı', 'turuncu', 'Balkabağının'],
  ['/images/2309.webp', 'karpuz', 'yeşil', 'Karpuzun'],
  ['/images/8275.webp', 'kurbağa', 'yeşil', 'Kurbağanın'],
  ['/images/4901.webp', 'ağaç', 'yeşil', 'Ağacın'],
  ['/images/8311.webp', 'brokoli', 'yeşil', 'Brokolinin'],
  ['/images/5018.webp', 'salatalık', 'yeşil', 'Salatalığın'],
  ['/images/5012.webp', 'marul', 'yeşil', 'Marulun'],
  ['/images/8280.webp', 'patlıcan', 'mor', 'Patlıcanın'],
  ['/images/8641.webp', 'erik', 'mor', 'Eriğin'],
  ['/images/6801.webp', 'çikolata', 'kahverengi', 'Çikolatanın'],
  ['/images/8916.webp', 'ayı', 'kahverengi', 'Ayının'],
  ['/images/5006.webp', 'ekmek', 'kahverengi', 'Ekmeğin'],
  ['/images/8650.webp', 'ceviz', 'kahverengi', 'Cevizin'],
  ['/images/4013.webp', 'süt', 'beyaz', 'Sütün'],
  ['/images/8236.webp', 'bulut', 'beyaz', 'Bulutun'],
  ['/images/6906.webp', 'kar', 'beyaz', 'Karın'],
  ['/images/8921.webp', 'kuğu', 'beyaz', 'Kuğunun'],
  ['/images/8232.webp', 'penguen', 'siyah', 'Penguenin'],
  ['/images/8320.webp', 'panda', 'siyah', 'Pandanın'],
  ['/images/8923.webp', 'domuz', 'pembe', 'Domuzun'],
  ['/images/8603.webp', 'gökyüzü', 'mavi', 'Gökyüzünün'],
  ['/images/8225.webp', 'deniz', 'mavi', 'Denizin'],
];

const buyuk = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);

export const colorRecognitionDataYeni: ColorRecognitionRound[] = R.map(([imageUrl, word, renk, iyelik], i) => ({
  id: 3001 + i,
  activityType: ActivityType.ColorRecognition,
  imageId: 0,
  imageUrl,
  word,
  correctColor: renk,
  speech: { tr: { question: `${iyelik} rengi ne?`, correct: `Evet! ${buyuk(word)} ${renk}!`, wrong: `Hayır! ${buyuk(word)} ${renk}!` } },
}));
