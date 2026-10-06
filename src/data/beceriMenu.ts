// Beceri menüleri (2026-10, Kaan onayı): ana menü "ne öğretiyor"a göre gruplanır.
// Etkinlikler, mini oyunlar ve alt menüler aynı listede durur; oyun bitince bu menüye dönülür.
// ActivityType ve oyun kimlikleri değişmez; Program Modu ve Rastgele bundan etkilenmez.
import { ActivityType } from '../types.ts';

export type BeceriId = 'harfler' | 'sayilar' | 'dusunme' | 'el' | 'konusma' | 'oyunOdasi';
export type BeceriEkran = 'harfSes' | 'basara' | 'basara2' | 'sesTaklit' | 'besNBirK';

interface OgeTemel { emoji: string; baslik: string; alt: string; sadeceTr?: boolean }
export type BeceriOge =
  | (OgeTemel & { tur: 'etkinlik'; tip: ActivityType })
  | (OgeTemel & { tur: 'oyun'; oyun: string })
  | (OgeTemel & { tur: 'harf'; tip: ActivityType }) // önce harf (ya da hece grubu) seçilir
  | (OgeTemel & { tur: 'ekran'; ekran: BeceriEkran });

export interface Beceri {
  id: BeceriId;
  emoji: string;
  baslik: string;
  alt: string;
  renk: string; // başlık şeridi ve kart vurgusu (tailwind gradient)
  ogeler: BeceriOge[];
}

const e = (tip: ActivityType, emoji: string, baslik: string, alt: string): BeceriOge => ({ tur: 'etkinlik', tip, emoji, baslik, alt });
const o = (oyun: string, emoji: string, baslik: string, alt: string): BeceriOge => ({ tur: 'oyun', oyun, emoji, baslik, alt });

export const BECERILER: Beceri[] = [
  {
    id: 'harfler', emoji: '🔤', baslik: 'Harfler ve Okuma', alt: 'Harf, ses, hece ve ilk okuma',
    renk: 'from-sky-400 to-blue-500',
    ogeler: [
      // Harf ve Sesler'in etkinlikleri doğrudan burada (ara menü kalktı, 2026-10-06)
      { tur: 'ekran', ekran: 'basara', emoji: '📖', baslik: 'BASARA Yöntemi', alt: 'Önce ünlüler, sonra heceler', sadeceTr: true },
      { tur: 'ekran', ekran: 'basara2', emoji: '📗', baslik: 'BASARA 2 (Klasik)', alt: 'a-serisi heceler ve tüm ünlüler', sadeceTr: true },
      { tur: 'harf', tip: ActivityType.FindTheLetterInGrid, emoji: '🔠', baslik: 'Harf Tablosu', alt: 'Karışık harflerden isteneni bul' },
      { tur: 'harf', tip: ActivityType.FindTheLetter, emoji: '🔍', baslik: 'Harf Bulma', alt: 'Kelimedeki harfi bul' },
      { tur: 'harf', tip: ActivityType.SoundPresence, emoji: '👂', baslik: 'Seste Harf Var mı?', alt: 'Resmin adında o ses var mı?' },
      { tur: 'harf', tip: ActivityType.FindTheSoundInImage, emoji: '🖼️', baslik: 'Görselde Sesi Bul', alt: 'O sesi içeren resmi seç' },
      { tur: 'harf', tip: ActivityType.Syllabification, emoji: '👏', baslik: 'Heceleme', alt: 'Kelimeyi hecelerine ayır', sadeceTr: true },
      { tur: 'harf', tip: ActivityType.EmbeddedStory, emoji: '📚', baslik: 'Hikâye Zamanı', alt: 'Harfle ilgili kısa hikâyeler', sadeceTr: true },
      e(ActivityType.LetterTracing, '✍️', 'Harf Çizgisi', 'Harfin üzerinden parmağınla git'),
      o('letterBubbles', '🫧', 'Harf Baloncukları', 'Söylenen harfi bul'),
      o('syllableTrain', '🚃', 'Hece Treni', 'Heceleri birleştir'),
      o('wordBox', '📦', 'Kelime Kutusu', 'Resmi kelimeyle eşle'),
      e(ActivityType.Hangman, '🎈', 'Adam Asmaca', 'Kelimeyi tahmin et'),
    ],
  },
  {
    id: 'sayilar', emoji: '🔢', baslik: 'Sayılar', alt: 'Saymak, eşlemek, sıralamak',
    renk: 'from-lime-400 to-green-500',
    ogeler: [
      e(ActivityType.CountMatch, '✋', 'Kaç Tane Var?', 'Parmak sayısını resimle eşle'),
      o('counting', '🔢', 'Sayı Sayma', 'Nesneleri tek tek say'),
      o('musicTouch', '🎹', 'Kaç Kere Bas?', 'Piyanoda istenen kadar bas'),
      o('plantGrowing', '🌱', 'Bitki Büyüt', 'Üç kere su, üç kere güneş'),
      e(ActivityType.DragAndDropCounting, '🧺', 'Nesneleri Taşı', 'İstenen sayıda nesneyi taşı'),
      o('numberSequence', '🪜', 'Sayı Sırala', '1, 2, 3... sırala'),
      e(ActivityType.OddEven, '🧦', 'Tek / Çift', 'Tek mi, bir çift mi?'),
    ],
  },
  {
    id: 'dusunme', emoji: '🧠', baslik: 'Düşünme ve Hafıza', alt: 'Dikkat, hafıza, mantık',
    renk: 'from-indigo-400 to-violet-500',
    ogeler: [
      e(ActivityType.AyniniBul, '👯', 'Aynısını Bul', 'Aynı resmi eşle'),
      e(ActivityType.WhatDoesntBelong, '🔍', 'Hangisi Farklı?', 'Gruba uymayanı bul'),
      e(ActivityType.WhatsMissing, '🫥', 'Hangisi Kayıp?', 'Ezberle, kaybolanı bul'),
      e(ActivityType.MemoryCards, '🃏', 'Hafıza Kartları', 'Kartların eşini bul'),
      o('memoryMatch', '🎴', 'Hafıza Çiftleri', 'Eşleşen kartları aç'),
      o('colorSequence', '🔴', 'Renk Sırası', 'Yanan renklere sırayla bas'),
      o('waitAndPress', '🚦', 'Bekle ve Bas', 'Kırmızıda bekle, yeşilde bas'),
      e(ActivityType.SequencingStories, '🎞️', 'Olay Sıralama', 'Hikâyeyi doğru sıraya diz'),
      e(ActivityType.PatternCompletion, '🔷', 'Örüntü Tamamlama', 'Sıradakini bul'),
      e(ActivityType.Sudoku, '🧩', 'Görsel Sudoku', 'Eksik parçayı tamamla'),
      o('shadowMatch', '🔦', 'Gölge Eşleştirme', 'Gölge kime ait?'),
      o('whereBelongs', '🏠', 'Nereye Ait?', 'Eşyayı doğru odaya koy'),
      e(ActivityType.ObjectCollector, '🧺', 'Nesne Toplama', 'Doğru nesneleri sepete topla'),
      e(ActivityType.DragAndDropPositioning, '📍', 'Nesneyi Yerleştir', 'Nesneyi söylenen yere koy'),
    ],
  },
  {
    id: 'el', emoji: '✋', baslik: 'El Becerisi', alt: 'Çizgi, boyama, yapboz',
    renk: 'from-rose-400 to-pink-500',
    ogeler: [
      e(ActivityType.LineTracing, '〰️', 'Çizgi Takip', 'Parmağınla çizgiyi izle'),
      o('connectDots', '✏️', 'Noktaları Birleştir', 'Sayıları sırayla birleştir'),
      o('maze', '🐭', 'Labirent', 'Fareyi peynire götür'),
      o('trainTrack', '🚂', 'Tren Yolu', 'Trene yol çiz'),
      o('puzzle', '🧩', 'Yapboz', 'Parçaları birleştir'),
      e(ActivityType.ShapeColoring, '🖍️', 'Şekil Boyama', 'Şekilleri renklendir'),
      e(ActivityType.ConstrainedColoring, '🎨', 'Kurallı Boyama', 'Her bölgeyi doğru renge boya'),
      o('sheepShearing', '🐑', 'Koyun Kırkma', 'Yününü kırk'),
      o('busJam', '🚌', 'Otobüs Durağı', 'Yolcuları renklerine göre bindir'),
      o('sizeOrdering', '📏', 'Boyut Sıralama', 'Küçükten büyüğe diz'),
      o('shapeMatching', '🔺', 'Şekil Eşleştirme', 'Şekilleri yerine koy'),
    ],
  },
  {
    id: 'konusma', emoji: '🗣️', baslik: 'Konuşma ve Anlama', alt: 'Ses taklidi, soru-cevap, günlük işler',
    renk: 'from-cyan-400 to-teal-500',
    ogeler: [
      { tur: 'ekran', ekran: 'sesTaklit', emoji: '🔊', baslik: 'Ses Taklit Kartları', alt: 'Hayvan ve eşya seslerini taklit et' },
      { tur: 'ekran', ekran: 'besNBirK', emoji: '❓', baslik: '5N1K', alt: 'Kim, ne, nerede, ne zaman, neden, nasıl' },
      o('dailyRoutine', '📋', 'Sıralı Ol!', 'Günlük işleri sıraya koy'),
      o('roomCleaning', '🧹', 'Oda Temizliği', 'Eşyaları yerine kaldır'),
    ],
  },
  {
    id: 'oyunOdasi', emoji: '🎈', baslik: 'Oyun Odası', alt: 'Ödül ve rahatlama oyunları',
    renk: 'from-fuchsia-400 to-purple-500',
    ogeler: [
      o('bubblePop', '🫧', 'Baloncuk Patlat', 'Baloncuklara dokun'),
      o('musicTouch', '🎹', 'Müzik Dokun', 'Piyano çal'),
      o('sheepShearing', '🐑', 'Koyun Kırkma', 'Yününü kırk'),
    ],
  },
];

export const beceriBul = (id: BeceriId | null | undefined): Beceri | undefined => BECERILER.find((b) => b.id === id);
