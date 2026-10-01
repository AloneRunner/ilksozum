# Görsel yenileme yol haritası

Sıralamayı Claude belirler, Kaan Flow'da üretir. Her parti bir Flow sayfası, yaklaşık 20-40 görsel.
Yöntem: üret → toplu indir → Claude seçer ve `gorsel-ham/<konu>/` klasörüne ayırır → Claude işler ve bağlar.

## Büyük resim (envanter, 2026-10-01)
- **Kavram soruları:** 45 kavram, 417 benzersiz çift. Yeni hedef: kavram başına 6-10 temiz çift. Boyut kavramları için kademeli seri yapılır, bunlar göreceli soruları da besler. Toplam yaklaşık 600-700 görsel.
- **Nesneler:** 519 benzersiz kelime, 19 kategori. Nesne tanıma ve harf/hece oyunları bunları kullanıyor. Her kelimeye 1 gerçekçi görsel.
- **Diğer:** 5N1K (109), Hangisi Farklı (40), sıralama hikayeleri, örüntü, duyular, iletişim kartları. Çoğu nesne görsellerini yeniden kullanır.
- **Hedef:** her kavramda en az 10 çift, yani 20 soru (bir turda en fazla 8 soru soruluyor, havuz büyük olunca her tur farklı olur). 10'a ulaşmayan kavram 'eksik' sayılır.
- **2026-10-01 akşam: yeni sorular derlenen uygulamada da AÇIK** (`YENI_SORULAR_AKTIF = true`, Kaan onayı: "bağla, gitte yedeğimiz var"). Geri dönmek için `false`.
- **Eski not (Kaan, 2026-10-01):** yeni sorular `src/services/database/activities/yeni/` altında. `YENI_SORULAR_AKTIF` = yalnızca geliştirme sunucusu. Derlenen uygulama eski soruları kullanır. Yeni görsel kayıtları da aynı anahtara bağlı. Hepsi bitip uyum kontrol edilince tek satırla geçilir.
- **Kural:** yeni görseller yeni id alır (2001+). Eski id'nin üzerine yazılmaz. Ayrıntı: memory `image-redo-plan`.

## Araçlar
- `uret-cift.mjs`: çift kavramlar (klasör: `<nesne>-<a>.jpg / <nesne>-<b>.jpg`) → görsel listesi + `yeni/<dosya>.ts`. Yeni kavram = KAVRAMLAR dizisine bir kayıt.
- `uret-cift.mjs` → `yenidenKullan`: başka kavramdaki görseli tekrar kullan (Kaan: "şemsiye zaten vardı"). Yeni tur hazırlarken önce mevcut görsellere bak.
- `uret-konum.mjs`: konum setleri.
- `gorsel-isle.mjs`: liste → `public/images/<id>.webp` + `imageData-yeni.ts`. Sahne görsellerinde `sahne: true` (renkler korunur).
- Sonra: `contentService.ts` içinde ilgili etkinliği `YENI_SORULAR_AKTIF ? xYeni : x` yap, `yeni/index.ts`'e export ekle.

## Aşama 0: Denemeler ✅
- [x] Deneme 1: dolu/boş, ters/düz, sivri/küt, sıcak/soğuk, su/süt/ayran (15)
- [x] İnce / Kalın (20)
- [x] Konum: 3 set × 12 (36). Kavram başına sadece 3 çift, 20 soru için yetersiz.
- [x] Konum ek setleri 4-8 → toplam 8 set, 93 görsel (`gorsel-ham/konum-set*`). Kavram başına 7-8 set. Kuş setinde arkasında yok. Kalem setinde yukarıda ve dışında yok.
- [x] Konum bağlandı (2026-10-01): `yeni/konumData.ts`, `uret-konum.mjs` ile üretilir. İçinde/Dışında 16, Üstünde/Altında 16, Önünde/Arkasında 14, Arasında 8 (sadece olumlu soru), Aşağıda/Yukarıda 14 soru. Görseller 2021-2114. Soru numaraları 1001+ (eski i18n `sp_*_<id>` anahtarlarıyla çakışmasın diye).
- [ ] Yanında ve zor görselleri (işlendi, kayıtlı) için karışık konum soru türü (yeni özellik, sonra)

## Aşama 1: Pilot bağlama (Claude, Kaan sadece telefonda dener)
Yüzlerce görsel üretmeden önce zinciri uçtan uca kanıtla.
- [x] İşleme betiği `gorsel-isle.mjs`: arka plan beyaza, 512 px WebP, kırpma YOK (çift ölçeği korunur). Liste: `yeni-gorseller.json`
- [x] İnce/Kalın bağlandı: 2001-2020, `thinThickData.ts` 20 soru (konum ek setlerden sonra)
- [x] Gerçekçi ayar: `.webp` görseller olduğu gibi gösterilir (SmartImage + çalışma kağıtları). Yasaklı görseller id ile çalışır, yeni id'ler çakışmaz.
- [x] Envanter ile doğrulandı (20 soru, tsc temiz)
- [ ] Kaan telefonda dener (vite --host, http://192.168.1.6:5173)

## Aşama 2: Boyut ve miktar (kademeli serilerle, göreceli soruları da besler)
Her nesneden 3-4 kademe üretilir (ör. 4 boyda aynı top). Bunlardan hem çift soruları hem göreceli sorular çıkar.
- [x] Geniş / dar bağlandı (2026-10-01): 10 çift, 20 soru, id 2201-2221, `yeni/genisDarData.ts`. Kaydırak dar/orta/geniş serisi var. Kapı yeniden yapıldı (çift kanatlı ve tek kanatlı), eski kapı "orta" oldu, böylece kapı serisi de var.
- [x] Büyük / küçük bağlandı (2026-10-01): 10 çift, 20 soru, id 2301-2321, top serisi var (kutu ve ayakkabı düzeltildi).
- [x] Uzun / kısa bağlandı (2026-10-01): 10 çift, 20 soru, id 2401-2420. Yılan ve atkıda fark ~1,5-1,7 kat (zayıf ama kabul).
- [x] Yüksek / alçak bağlandı (2026-10-01): 10 çift, 20 soru, id 2501-2521, blok serisi (8/4/2) tam. Soru numaraları 1001+ (HighLow da i18n sp_ anahtarı arıyor).
- [x] Derin / sığ bağlandı: 9 çift, 18 soru, id 2901-2918 (çekmece olmadı, çıkarıldı).
- [x] Az / çok bağlandı: 10 çift, 20 soru, id 2701-2720 (az = 2 tane, çok = 12-15, kap yok).
- [ ] Kalabalık / tenha
- [x] Dolu / boş bağlandı: 10 çift (kumbara + 9), 20 soru, id 2601-2620.
- [x] Bütün (tam) / yarım / çeyrek bağlandı: 24 görsel (2801-2824), 24 karşılaştırma, 64 soru. Pizza Claude tarafından kesildi. Ekmek yarımı Kaan yaptı. Pasta (kuşbakışı) ve karpuz çeyreği (yarım karpuzun yarısı) Claude tarafından kesildi; 8 yiyecek tam. (`flow-butun-yarim-ceyrek.md`).
- [ ] Tek / çift, kaç tane
- [ ] Ağır / hafif (görselden anlaşılması zor; bilinen nesne çiftleri: fil/tüy gibi)

## Aşama 3: Durum ve nitelik (aynı nesne, iki hal)
- [x] Açık / kapalı bağlandı: 10 çift, 20 soru, id 3001-3020.
- [x] Kırık / sağlam bağlandı: 10 çift, 20 soru, id 3101-3120.
- [ ] YENİ KAVRAM: Bozuk / çalışan (Kaan önerisi). Kırık = parçalanmış, bozuk = çalışmıyor. Görselde zor (yanmayan lamba = kapalı lamba ile karışır). Fikir: aynı oyuncak/alet, çalışan hali hareket/ışık/ses işaretiyle (ör. pervane dönüyor, ekranda görüntü var), bozuk hali duman, ters dönmüş, ekran karanlık ve çatlak değil. Ayrıca düşünülecek.
- [x] Temiz / kirli bağlandı: 10 çift, 20 soru, id 3201-3220.
- [x] Islak / kuru bağlandı: 9 çift, 18 soru, id 3301+. Kuru şemsiye = Açık/Kapalı'daki açık şemsiye (yeniden kullanım, `yenidenKullan`). Köpek olmadı.
- [ ] Eski / yeni
- [ ] Taze / bayat
- [ ] Dağınık / toplu
- [ ] Kırışık / düzgün
- [ ] Düğümlü / çözük
- [ ] Düz / eğri
- [ ] Parlak / mat
- [ ] Şeffaf / opak
- [ ] Ters / düz ve sivri / küt (deneme 1'e ek çiftler)

## Aşama 4: Duyusal, sosyal, yön
- [ ] Sıcak / soğuk (ek çiftler; kar tanesi gibi soyut sembol yok)
- [ ] Sert / yumuşak
- [ ] Pürüzlü / pürüzsüz
- [ ] Dikenli / pürüzsüz
- [ ] Acı / tatlı
- [ ] Gürültülü / sessiz
- [ ] Aç / tok
- [ ] Yaşlı / genç (gerçekten yaşlı vs genç; yavru-yetişkin değil)
- [ ] Tembel / çalışkan
- [ ] Canlı / cansız
- [ ] Sağ / sol
- [ ] Yakın / uzak
- [ ] Yan yana / karşı karşıya

## Aşama 5: Nesneler (en büyük aşama, kategori kategori)
519 kelime. Her kategori bir Flow sayfası. Sıralama: çocuğun en çok karşılaştığından başlanır.
- [ ] İçecekler (8)
- [ ] Meyveler (21)
- [ ] Sebzeler (20)
- [ ] Diğer yiyecekler (37)
- [ ] Hayvanlar (52+19)
- [ ] Vücudun bölümleri (14)
- [ ] Giysiler ve aksesuarlar (28)
- [ ] Oyuncaklar (19)
- [ ] Ev eşyaları (82)
- [ ] Mutfak gereçleri (11)
- [ ] Okul ve ofis (18)
- [ ] Taşıtlar (21)
- [ ] Aile üyeleri (8; ebeveyn kendi fotoğrafını koyabilsin fikri)
- [ ] Meslekler (25)
- [ ] Mekanlar ve odalar (28)
- [ ] Bitkiler (18)
- [ ] Doğal yapılar ve uzay (32)
- [ ] Aletler (25)
- [ ] Müzik aletleri (9)

Not: kategori adlarında tutarsızlık var ("Hayvanlar" ve "hayvanlar" gibi). Bu aşamada düzeltilecek.

## Aşama 5b: Yeni görselleri diğer etkinliklere açma
Şu an yeni görseller sadece kavram sorularında (category none). Tek başına nesne olarak uygun olanlar (ör. kırmızı elma, mavi kupa, sarı kova) seçilip kategori, renk ve şekil etiketi alacak. Böylece nesne, renk, şekil ve harf etkinliklerine de girecekler. Sahneler, konum setleri ve yarım/çeyrek görseller girmez. Kaan sordu (2026-10-01).

## Aşama 6: Kalanlar ve temizlik
- [ ] 5N1K, sıralama hikayeleri, gündüz/gece, önce/sonra, hızlı/yavaş, duyular
- [ ] İletişim kartları
- [ ] 22 GIF'in kaldırılması (61 MB) ve eski kullanılmayan görsellerin silinmesi
- [ ] Gerçekçi set ayarının kaldırılması (tek set kalır)
- [ ] Kavram menüsünün yeniden gruplanması (bkz. ilk denetim raporu)
