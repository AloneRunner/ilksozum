/**
 * BASARA Yöntemi — TR'ye özel rehberli okuma kulvarı.
 *
 * İçerik, uzman (özel eğitim) tarafından önerilen kaynaktan alınmıştır:
 * https://ozelegitimetkinlik.com/ — "BASARA yöntemi" (92 sayfalık set).
 *
 * Yöntem OKUMA temellidir; çocuk hece/kelime/cümleyi BÜTÜN olarak okur ("b-a" diye değil "ba").
 *
 * AKIŞ (Faz 1 = çekirdek BASARA, 1–33. ders):
 *   1–8   : ÜNLÜLER (a e ı i o ö u ü) — ikişer ikişer öğretilir, yazma/çizgi ağırlıklı
 *   9 ba · 10 sa · 11 BAK · 12 ra · 13 GEL · 14 ma · 15 VER · 16 ka · 17 AL
 *   18 ça · 19 ta · 20 na · 21 ya · 22 ha · 23 pa · 24 şa · 25 za · 26 la · 27 va
 *   28 dı · 29 ca · 30 fa · 31 ga · 32 ja · 33 ğa
 *   → BAK/GEL/VER/AL "görme kelimeleri" KENDİ dersleridir (heceler arasına girer).
 *
 * AKIŞ (Faz 2 = ALTERNATİF/EK, 34–54): sessizler tüm ünlülerle (r k ç t s h ş y z m d l b n v p j c g f ğ).
 *   Kaynakta yoktur; ek okuma alıştırması olarak tutulur.
 *
 * Kural: bir ders tamamlanmadan diğeri açılmaz (şu an BASARA_UNLOCK_ALL ile hepsi açık).
 * NOT: 15. ders (ver) kaynaktan görülemedi; makul biçimde yeniden kuruldu (gerçeğiyle güncellenecek).
 * Tüm içerik buradan düzenlenebilir (data-driven).
 */

export interface BasaraLesson {
  id: number;
  phase: 1 | 2;
  tag?: 'vowel' | 'sight';   // ünlü dersi / görme-kelimesi dersi (yoksa hece dersi)
  newUnit: string;           // gösterim/rozet
  title: string;
  family: string[];          // okunacak hece(ler) (Faz1: 1; Faz2: 8 ünlü ailesi)
  closed?: string[];         // Faz2 ters heceler
  words: string[];
  sentences: string[];
  story?: string[];          // Opsiyonel hikaye/paragraf
}

export const BASARA_VOWELS = ['a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü'];
export const BASARA_PHASE2_ORDER = ['r', 'k', 'ç', 't', 's', 'h', 'ş', 'y', 'z', 'm', 'd', 'l', 'b', 'n', 'v', 'p', 'j', 'c', 'g', 'f', 'ğ'];

const fam = (c: string) => BASARA_VOWELS.map((v) => c + v);
const closedFam = (c: string) => BASARA_VOWELS.map((v) => v + c);

const upper = (s: string) => s.toLocaleUpperCase('tr-TR');

// Ünlü dersi (1–8)
const vowel = (id: number, v: string): BasaraLesson => ({
  id, phase: 1, tag: 'vowel', newUnit: v, title: `${upper(v)} sesi`, family: [v], words: [], sentences: [],
});
// Görme-kelimesi dersi (bak/gel/ver/al)
const sight = (id: number, w: string, sentences: string[], words: string[] = []): BasaraLesson => ({
  id, phase: 1, tag: 'sight', newUnit: w, title: `${w} (görme kelimesi)`, family: [w], words, sentences,
});
// Hece dersi (a-serisi)
const syl = (id: number, s: string, words: string[], sentences: string[], story?: string[]): BasaraLesson => ({
  id, phase: 1, newUnit: s, title: `${s} hecesi`, family: [s], words, sentences, story,
});
// Faz 2 (alternatif): sessiz + tüm ünlüler
const p2 = (id: number, newUnit: string, c: string, words: string[], sentences: string[], story?: string[]): BasaraLesson => ({
  id, phase: 2, newUnit, title: `${newUnit} sesi`, family: fam(c), closed: closedFam(c), words, sentences, story,
});

export const BASARA_LESSONS: BasaraLesson[] = [
  // ── 1–8: ÜNLÜLER ──
  vowel(1, 'a'), vowel(2, 'e'), vowel(3, 'ı'), vowel(4, 'i'),
  vowel(5, 'o'), vowel(6, 'ö'), vowel(7, 'u'), vowel(8, 'ü'),

  // ── 9–33: ÇEKİRDEK (heceler + görme kelimeleri) ──
  syl(9, 'ba', ['oba', 'aba', 'baba'], ['baba o oba', 'baba o aba']),
  syl(10, 'sa', ['isa', 'asa', 'basa', 'saba'], ['isa o asa', 'baba asa', 'isa o baba', 'baba o isa', 'isa asa']),
  sight(11, 'bak', ['isa bak', 'baba bak', 'bak baba bak', 'isa asa bak', 'isa bak o baba', 'baba bak o isa', 'isa o aba bak', 'bak isa bak', 'baba o asa bak'], ['bak', 'baksa']),
  syl(12, 'ra', ['ara', 'ora', 'araba', 'arasa', 'sara'], ['isa ara', 'isa o araba', 'baba araba bak', 'ara baba ara', 'isa bak araba', 'sara araba bak', 'bak sara bak', 'baba araba ara', 'sara o araba bak']),
  sight(13, 'gel', ['isa gel', 'baba gel', 'sara gel', 'gel isa gel', 'isa gel araba bak', 'baba gel asa bak', 'sara gel ara', 'baba o araba gel bak', 'sara gel araba ara'], ['gel']),
  syl(14, 'ma', ['mama', 'bakma', 'arama', 'masa', 'ama'], ['isa masa ara', 'baba mama ara', 'sara masa bak', 'baba bak o masa', 'isa o masa ama', 'isa mama arama', 'isa masa bakma', 'sara gel mama bak', 'baba gel masa ara']),
  // 15 (ver) — uzman onayladı; cümleler sıraya sadık (önceki bana/oya hataları düzeltildi)
  sight(15, 'ver', ['baba mama ver', 'isa asa ver', 'sara masa ver', 'baba araba ver', 'isa gel mama ver', 'baba araba ver ama bak', 'sara gel mama ver', 'isa baba araba ver'], ['ver']),
  syl(16, 'ka', ['kasa', 'saka', 'kara', 'kaba', 'kasaba', 'makara', 'kabak'], ['isa kasa ver', 'isa kabak ver', 'isa makara bak', 'baba gel o kasaba', 'isa bak o saka', 'baba kara kabak ver', 'sara saka ara', 'isa gel kabak bak', 'baba kara araba ver']),
  sight(17, 'al', ['isa araba al', 'baba kasa al', 'masa al', 'isa masa al', 'isa gel kabak al', 'baba kara araba al', 'sara makara al', 'sara mama al ver', 'isa saka al'], ['al', 'alma', 'alsa']),
  syl(18, 'ça', ['maça', 'kaça', 'saça', 'çama'], ['isa maça gel', 'baba gel çama bak', 'baba saça bak', 'isa çaba ara.', 'sara maça gel.', 'baba gel maça bak.', 'isa saça makara al.', 'sara maça araba al.', 'isa saça bakma.', 'baba kara çama bak.', 'sara çaba ara.']),
  syl(19, 'ta', ['ata', 'ota', 'tara', 'tabak', 'tasa', 'taça'], ['isa saça bak tara', 'ata matara al', 'baba atama bak', 'ata taka al.', 'sara matara ara.', 'ata maça gel.', 'baba taka bak.', 'isa ata matara ver.', 'ata kara matara al.', 'sara saça bak tara.', 'ata masa al.', 'isa matara arama.']),
  syl(20, 'na', ['ana', 'ona', 'bana', 'sana', 'nara'], ['baba bana kabak al', 'ana ona mama ver', 'isa ona araba al', 'ana bana kasa al.', 'isa sana araba ver.', 'ata bana taka al.', 'ana ona masa al.', 'baba ona kasa ver.', 'isa sana makara al.', 'ana maça gel.', 'ata bana araba ver.', 'sara ona mama ver.', 'ana bana matara al.']),
  syl(21, 'ya', ['yaka', 'maya', 'kaya', 'yaya', 'yara', 'yasa'], ['kaya aya bak', 'isa arabaya gel', 'oya oraya saya saya gel', 'kaya yaya gel.', 'oya yakaya bak.', 'kaya bana yaka al.', 'baba kaya bak.', 'oya yaya gel.', 'ana oya maça gel.', 'kaya yara bak.', 'ata oraya yaya gel.', 'oya bana matara al.', 'kaya arabaya bak.']),
  syl(22, 'ha', ['oha', 'aha', 'saha', 'hata', 'boha', 'taha'], ['oya sahaya gel', 'taha kara kabak al', 'kaya gel saraya bak', 'taha sahaya gel.', 'isa hata arama.', 'baba taha arabaya bak.', 'oya sahaya masa al.', 'taha bana yaka al.', 'kaya sahaya yaya gel.', 'ata taha maça gel.', 'taha saraya bak.', 'oya sahaya gel maça bak.', 'kaya taha araba al.']),
  syl(23, 'pa', ['para', 'paça', 'kapa', 'sapana', 'sopa'], ['baba bana para ver', 'taha takaya gel çapa ver', 'ana yapana mama ver', 'kaya para ver.', 'taha çapa al.', 'oya bana paça al.', 'taha araba kapa.', 'ata sahaya çapa al.', 'kaya para ara.', 'sara paça bak.', 'baba bana para al.', 'taha sapa bak.', 'oya yapana para ver.']),
  syl(24, 'şa', ['şaka', 'taşa', 'paşa', 'şaha'], ['isa tahaya maşa ver', 'kaya şaka yapama', 'yaşa ata yaşa', 'paşa bana gel', 'paşa şaka yapama.', 'oya maşa al.', 'taha paşa gel.', 'paşa arabaya bak.', 'kaya bana maşa al.', 'ata paşa sahaya gel.', 'taha şaka yapama gel.', 'isa paşa maşa ver.', 'baba oya şaka yapama.', 'kaya paşa sahaya bak.']),
  syl(25, 'za', ['baza', 'kaza', 'saza', 'zara', 'zama'], ['taha pazara gel kabak al', 'isa saza bak', 'yaza gel bahara gel', 'baba baza al.', 'taha pazara gel.', 'isa kazaya bak.', 'oya saza bak.', 'ata yaza maça gel.', 'kaya pazara kabak al.', 'sara kazaya bakma.', 'paşa baza arama.', 'taha saza makara al.', 'isa pazara yaya gel.']),
  syl(26, 'la', ['ala', 'Ela', 'hala', 'lapa', 'bala', 'kala'], ['İsa oraya salata al', 'taha olaya bak', 'Baba halama araba al', 'sara salata al.', 'baba halana araba al.', 'kaya balaya gel.', 'paşa palaya bak.', 'taha halama maşa al.', 'isa pazara gel salata al.', 'ata halana bak.', 'oya salata arama.', 'sara maşala bak.']),
  syl(27, 'va', ['vaka', 'vana', 'tava', 'hava'], ['baba bak baklava', 'isa ovaya gel hava al', 'oya tavaya kabak ver', 'taha vana gel ovaya bak', 'baba baklava al.', 'ata vanaya bak.', 'sara havaya bak.', 'kaya ovaya gel hava al.', 'paşa bana baklava ver.', 'isa tavaya salata yapama.', 'taha vanaya bak hava al.', 'baba ovaya araba al.', 'oya halana baklava ver.']),
  syl(28, 'dı', ['tadı', 'aldı', 'taradı', 'kadı', 'bakmadı'], ['Baba sana araba aldı', 'isa pazara kaçamadı', 'saka ona uçamadı', 'O bana bakamadı', 'baba araba aldı.', 'isa aradı bakamadı.', 'kaya pazara varamadı.', 'sara kanadı aradı.', 'ata halana baklava aldı.', 'oya tavaya bakamadı.', 'taha ovaya varamadı.', 'paşa arabaya bakamadı.', 'isa bana salata aldı.', 'kaya saza bakamadı.']),
  syl(29, 'ca', ['cama', 'cadı', 'karaca', 'saca', 'baca', 'boca'], ['cadı o bacaya bak', 'baba canana bak cama bak', 'isa bak o cadı', 'cadı karacaya bakmadı', 'isa cadı aradı.', 'baba bacaya bak.', 'ata karacaya bakamadı.', 'oya yamaca varamadı.', 'kaya amaca bakamadı.', 'sara cadıya bakamadı.', 'taha bacaya bak.', 'paşa karaca aldı.', 'isa cadı aramadı.', 'baba karacaya araba aldı.']),
  syl(30, 'fa', ['kafa', 'fala', 'ufala', 'faka', 'rafa'], ['o tarafa bakma', 'isa afacana bak yakala', 'ufaladı bana ufaladı', 'baba yakala falakaya al', 'baba kafaya bak.', 'isa lafa bakamadı.', 'sara kafa yaramadı.', 'oya kafana bak.', 'ata faya bakamadı.', 'kaya lafa bak.', 'taha kafana takamadı.', 'paşa o lafa bakamadı.', 'isa kafaya bakamadı.', 'baba faya varamadı.']),
  syl(31, 'ga', ['gaga', 'galata', 'gara', 'gala', 'gata', 'gaza'], ['baba galataya gel', 'o saka kafa gagaladı', 'takaya bak galataya bak', 'isa kabak gagaladı', 'oya kara karacaya bak', 'baba gagaya bak.', 'isa agaya baklava aldı.', 'sara bagaya bakamadı.', 'kaya gaga aradı.', 'ata o gaga kanadı.', 'oya agaya salata ver.', 'taha gagaya bakamadı.', 'paşa agaya araba aldı.', 'isa bagaya varamadı.', 'kaya agaya bak.']),
  syl(32, 'ja', ['baraja', 'masaja', 'garaja', 'pasaja'], ['ajana bak ajana', 'isa masaja gel masaja', 'oya baraja bakamadı', 'pasaja gel baklava al', 'masaja gel rahata gel', 'isa garaja araba aldı.', 'baba bagaja baklava ver.', 'ata baraja bakamadı.', 'oya garaja varamadı.', 'sara bagaja salata aldı.', 'kaya baraja bak.', 'taha garaja araba aldı.', 'paşa bagaja kabak al.', 'isa baraja varamadı.', 'baba garaja bakamadı.']),
  syl(33, 'ğa', ['ağa', 'kazağa', 'sağa', 'bağa', 'çağa', 'yağa'], ['oraya gel uzağa bak', 'isa mağaraya gel', 'Tabağa lahana al, ona ver', 'yatağa bak yatama', 'uçağa bak uçağa', 'isa sağa bak.', 'baba yağa bak.', 'ata ağaya araba aldı.', 'oya bağa varamadı.', 'sara sağa bakamadı.', 'kaya ağaya baklava ver.', 'taha yağa salata yapamadı.', 'paşa sağa bak.', 'isa bağa bakamadı.', 'baba ağaya araba aldı.']),

  // ── 34–54: FAZ 2 (ALTERNATİF) — sessizler tüm ünlülerle ──
  p2(34, 'R', 'r', ['kare', 'fare', 'kara', 'yara', 'tara', 'sarı', 'karı', 'roma', 'karar', 'sarar', 'marka', 'tarla', 'sarma', 'kaşar', 'arı', 'erik', 'renk', 'soru', 'yarın', 'fırın', 'marul', 'roman', 'koro', 'şarkı'], ['Bahar yarın erken gel', 'Serdar fırından erik al', 'Recep oradan roman al', 'Arı kovanına çomak sokma', 'Beril sarı araba aldı']),
  p2(35, 'K', 'k', ['kaka', 'sakar', 'yaka', 'çakır', 'şarkı', 'kına', 'koro', 'küre', 'kova', 'kabak', 'tabak', 'erik', 'kürek', 'okur'], ['Sadık kürek sakla', 'Baba tabağa erik ver', 'Okan kekik kokla.', 'Kamil kavun kes.', 'Kedi kabağa kondu.', 'Kemal kalemi kır.']),
  p2(36, 'Ç', 'ç', ['keçi', 'keçe', 'çıra', 'çaba', 'çile', 'saçma', 'kaçma', 'yamaç', 'küçük', 'çürük', 'taraça', 'üçer'], ['Çürük alma saçma', 'Keçi taraçaya kaçar', 'Yamaç küçük çıra aldı', 'Çakır maç kaçta?', 'Çetin çadırı aç.', 'Çiçek çayı iç.', 'Çoban çayda çim.', 'Seçil çilek çok tatlı.']),
  p2(37, 'T', 't', ['tek', 'toka', 'türü', 'takı', 'kötü', 'tere', 'yatak', 'matrak', 'batak', 'atlama', 'satma', 'çatla'], ['Tarık yatak satma', 'Baba Oya\'ya toka al', 'Tuna baya matrak', 'Yamaç ata ot at', 'Tarık topu tut.', 'Tülin tabağı taşı.', 'Tekin teli tak.', 'Teyze tatlı tabak getir.']),
  p2(38, 'S', 's', ['sır', 'süt', 'sıra', 'köse', 'soru', 'basma', 'tasma', 'yasak', 'maske', 'yastık', 'lastik', 'sakal'], ['Ruslar lastik kesti', 'Sara yastığa basma', 'Selim suyu soğut.', 'Sevgi sarı saksı al.', 'Serkan simit sat.', 'Suna sabun sür.']),
  p2(39, 'H', 'h', ['hata', 'hela', 'hırka', 'hiç', 'tahta', 'sahte', 'bahar', 'hasır', 'hisar', 'silah', 'hapis', 'halat'], ['Ahsen baharda bal al', 'Hala bana hırka al', 'Hakan hırka al.', 'Hasan halı saha bak.', 'Hande havlu as.', 'Halil hamur harca.']),
  p2(40, 'Ş', 'ş', ['şaka', 'maşa', 'şıra', 'şiir', 'şarkı', 'başla', 'taşla', 'yarış', 'barış', 'karış', 'marş', 'kaşe'], ['Şirin ata kaşağı al', 'Şule Maraş\'a gel', 'Barış hadi yarışa başla', 'Şükrü şapka al.', 'Şule şurup iç.', 'Şenol şişe şişti.', 'Şaban şaka yapma.']),
  p2(41, 'Y', 'y', ['yün', 'yol', 'yas', 'yaş', 'yasa', 'yayla', 'bayrak', 'ayı', 'sayma', 'çaylak', 'yolla', 'yayık'], ['Taylan o ayı hızla kaç', 'Ayılar balları yedi', 'Aliye yayık ayran iç', 'Yasin yumurta ye.', 'Yeliz yakayı yırtma.', 'Yaman yastığa yat.', 'Yakup yaya yürü.']),
  p2(42, 'Z', 'z', ['zar', 'azı', 'sazı', 'bazı', 'kazı', 'üzüm', 'çözüm', 'kazık', 'yazı', 'yüzük', 'hazır', 'bazlama'], ['Azize altın yüzük tak', 'Zehra bazlama aç', 'Öksüz öküz aç kaldı', 'Ziya zil çaldı.', 'Zeynep zeytin ye.', 'Zeki zımba al.', 'Zahit zarfı zımbala.']),
  p2(43, 'M', 'm', ['mor', 'masa', 'makara', 'mama', 'temiz', 'makas', 'mağara', 'milat', 'moruk', 'mısra', 'ezme', 'kazma'], ['Murat İzmir\'e gel', 'Asım ambara mısır koy', 'Mehmet anaya mor makas al', 'Merih maça gel', 'Musa masa mavi.', 'Metin mantar mangalda.', 'Mine mavi makas al.', 'Murat mısır mırıldan.']),
  p2(44, 'D', 'd', ['dam', 'dik', 'dut', 'daha', 'doku', 'doktor', 'badem', 'dana', 'adres', 'badana', 'ahududu', 'soyadı'], ['Arda adres ver', 'Adem Adana\'ya gel', 'Dede badana yapak', 'Arda dokuz badem ye', 'Derya demir döv.', 'Davut düdük dinle.', 'Deniz defter dolapta.', 'Dursun dut dalda.']),
  p2(45, 'L', 'l', ['lale', 'kule', 'kale', 'kilo', 'kukla', 'sakla', 'kulak', 'deli', 'delik', 'dilek', 'soluk', 'kirli'], ['Lale Antalya\'ya gel', 'Leyla dilek dile', 'Kuliste kimler var?', 'Kilere iki kilo elma al', 'Lale lokum al.', 'Leyla lamba lazım.', 'Leman limonata lezzetli.', 'Ali zili çaldı.']),
  p2(46, 'B', 'b', ['bal', 'bol', 'bul', 'boy', 'bez', 'abla', 'bacak', 'bebek', 'biber', 'bardak', 'bohça', 'albüm'], ['Albay biber aldı', 'Arabaya bez bebek aldım', 'Bebek için bohça aldık', 'Ablama albüm aldık', 'Burak balon bul.', 'Buse bardak boş.', 'Bekir bakkal bak.', 'Banu balık bol.']),
  p2(47, 'N', 'n', ['nar', 'nal', 'not', 'nem', 'nane', 'nine', 'kına', 'kanal', 'çanak', 'konuk', 'tünel', 'sinek'], ['Önal\'ı sinek soktu', 'Nebi kanala su ver', 'Suna soruya yanıt ver', 'Nisa\'nın yanakları kızardı', 'Nilay nar narin.', 'Nedim nine nane al.', 'Nuri nane nerede.', 'Nalan nal nalburda.']),
  p2(48, 'V', 'v', ['var', 'ver', 'vur', 'kova', 'deve', 'ayva', 'çivi', 'kivi', 'vali', 'bavul', 'davul', 'havuç'], ['Ayvaz havuza su verdi', 'Evler alev alev yandı', 'Avare avare dolaşma', 'Havuza su ilave etti', 'Veli valiz ver.', 'Vildan vazo al.', 'Vedat vali valiz aldı.', 'Vefa vapur veda.']),
  p2(49, 'P', 'p', ['kap', 'sopa', 'kupa', 'arpa', 'çapa', 'depo', 'kapı', 'çorap', 'dolap', 'garip', 'karpuz', 'hatip'], ['İpek dolapta eşarp var mı?', 'Eyüp Hatip\'e karpuz ver', 'Pakize dolaptan çorap al', 'Pınar perde as.', 'Pelin pamuk al.', 'Polat patlıcan pişir.', 'Pusat pilav pişti.']),
  p2(50, 'J', 'j', ['jüri', 'jöle', 'judo', 'jilet', 'Japon', 'jeton', 'joker', 'pasaj', 'müjde', 'proje', 'garaj', 'abajur'], ['Ajda bagaja kaju koy', 'Jale saçına jöle sürdü', 'O pasajda Japon var', 'Ajda garajda jilet buldu', 'Jale jandarma geldi.', 'Müjde jeton al.', 'Ejder jöle sür.', 'Jilet jandarmada.']),
  p2(51, 'C', 'c', ['cam', 'cep', 'caz', 'cici', 'cuma', 'cami', 'ceket', 'ceviz', 'cezve', 'cisim', 'sucuk', 'loca'], ['Celal ceviz yedi', 'Ceren bencil olma', 'Cemre cezveye su koy', 'Can camı cilala.', 'Cemil ceket cep.', 'Cansu cami civarı.', 'Canan cüzdan bul.']),
  p2(52, 'G', 'g', ['gaz', 'gar', 'göz', 'gel', 'gol', 'gaga', 'bugün', 'dergi', 'çalgı', 'duygu', 'gayret', 'geniş'], ['Ergin gitarı gayet güzel çaldı', 'Ezgi bugün duygulu', 'Gizem bugün dergi aldı', 'Gözde Prag\'a gitmiş', 'Gaye gemi geldi.', 'Galip gazete getir.', 'Gamze garaj geniş.', 'Gürkan geyik gördü.']),
  p2(53, 'F', 'f', ['far', 'fok', 'fal', 'fes', 'fen', 'saf', 'şef', 'enfes', 'fayda', 'fırın', 'fırça', 'fidan'], ['Elif fırına enfes yemek koydu', 'Afşin faydalı ol', 'Latif fidan dik', 'Nazif komik fıkra anlattı', 'Fatih fırça al.', 'Funda fındık ye.', 'Ferit fatura fazla.', 'Filiz fular fena.']),
  p2(54, 'Ğ', 'ğ', ['doğa', 'doğu', 'boğa', 'ağaç', 'ağıl', 'boğaz', 'ciğer', 'göğüs', 'düğün', 'doğum', 'düğme', 'aşağı'], ['Kağan\'ın düğünü olmuş', 'Dağcılar Muğla\'ya gitti', 'Aşağıda koyunun oğlağı olmuş', 'Yiğit\'in göğsü ağrıyormuş', 'Uğur iğne iplik.', 'Çağla ağaç ağır.', 'Oğuz kağıt katla.', 'Tuğba yağmur yağıyor.'], [
    'Kağan dağa çıktı.',
    'Dağda büyük bir ağaç vardı.',
    'Ağacın yanında bir kurbağa gördü.',
    'Kurbağa göle doğru zıpladı.',
    'Yağmur yağmaya başladı.',
    'Kağan aşağıya doğru koştu.'
  ]),
];

export const BASARA_TOTAL_LESSONS = BASARA_LESSONS.length; // 54 (33 çekirdek + 21 alternatif)
export const BASARA_CORE_LESSONS = BASARA_LESSONS.filter((l) => l.phase === 1).length; // 33

export function getBasaraLesson(id: number): BasaraLesson | undefined {
  return BASARA_LESSONS.find((l) => l.id === id);
}

/**
 * BASARA 2 (KLASİK) — internette yaygın olan "eski" sürüm.
 * Ayrı ünlü/görme-kelimesi dersleri YOKTUR: doğrudan a-serisi (ba…ğa) + tüm-ünlüler fazı.
 * İçerik v1'den yeniden kullanılır (tekrar yazılmaz). İki kulvar yan yana durur (Kaan isteği).
 */
const A_SERIES = ['ba', 'sa', 'ra', 'ma', 'ka', 'ça', 'ta', 'na', 'ya', 'ha', 'pa', 'şa', 'za', 'la', 'va', 'dı', 'ca', 'fa', 'ga', 'ja', 'ğa'];

function buildBasara2(): BasaraLesson[] {
  const byUnit = (u: string) => BASARA_LESSONS.find((l) => l.newUnit === u);
  const out: BasaraLesson[] = [];
  let id = 0;
  // a-serisi (1–21): her sessiz +a
  for (const s of A_SERIES) {
    const src = byUnit(s);
    id += 1;
    out.push({ id, phase: 1, newUnit: s, title: `${s} hecesi`, family: [s], words: src?.words ?? [], sentences: src?.sentences ?? [] });
  }
  // tüm-ünlüler fazı (22–42): v1'in Faz 2 içeriği
  for (const l of BASARA_LESSONS.filter((l) => l.phase === 2)) {
    id += 1;
    out.push({ ...l, id, phase: 2 });
  }
  return out;
}

export const BASARA2_LESSONS: BasaraLesson[] = buildBasara2();
export const BASARA2_TOTAL_LESSONS = BASARA2_LESSONS.length; // 42

/**
 * variant: 1 = uzman sürümü, 2 = klasik.
 * BASARA (v1) = uzmanın yöntemi: YALNIZCA 33 derslik çekirdek (ünlüler+heceler+görme
 * kelimeleri), tamamı katı sıraya (strict) uygun. "Tüm ünlülerle" fazı uzmanın yöntemi
 * değildir → yalnız BASARA 2 (Klasik) kulvarında gösterilir.
 */
export function getBasaraLessons(variant: 1 | 2): BasaraLesson[] {
  return variant === 2 ? BASARA2_LESSONS : BASARA_LESSONS.filter((l) => l.phase === 1);
}
