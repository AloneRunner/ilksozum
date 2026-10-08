# Sonraki güncelleme planı

Yazıldığı tarih: 7 Ekim 2026, Play'e 9.1.0 (92) yüklendikten sonra. Kaan'la birlikte bakılacak.

## 1. 9.1.0 paketinde kalan ve sonradan düzeltilenler

Bunlar 9.1.1'e girecek:

- **Yazdırma kart seçimi.** Kategoride sadece 1–3 kart çıkıyordu (Meyveler'de yalnız incir, Giysiler'de 3 kart).
  - Sebep: kategori etiketi verilerde iki ayrı biçimde yazılmış ("Meyveler" ve "meyveler").
  - Düzeltildi: artık Meyveler 25, Giysiler 34 kart.
- **Gelişim raporu.** "Program Modu İlerlemesi" bölümü eski ünite sistemini gösteriyordu ("Ünite 1/10, günde en fazla 3 ünite").
  - Artık yeni Program Modu'nun her beceri alanı için seviyeyi ve öğrenilen etkinlik sayısını gösteriyor.

- **Başarımlar, Etkinlik Yönetimi, menü başlıkları.** Eski adlar ("Nesneleri Tanıyalım", "Akıl Oyunları", "İnce Motor") yeni menü adlarıyla değiştirildi.
- **Bozuk Türkçe karakterler.** Başarımlar'da ve kelime adlarında "DiÄŸer Yiyecekler", "Ev EÅŸyaları" gibi görünüyordu. objects.json'daki 48 yer düzeltildi.
- **Ayarlar.** Eski ünite sistemine ait "Joker Hakkı" bölümü gizlendi; yeni Program Modu'nda etkisizdi.
- **Not:** Play'e yüklenen 9.1.1 (93) bu düzeltmeleri İÇERMİYOR. Paket, akşamki aktarmadan sonra yeniden aktarılmadan üretildi.
  - Sonraki paketten önce: `npm run build && npx cap sync android`.

- **Bağış:** "Tek seferlik destek" düğmesi herkeste gizleniyordu ve herkese "Daha önce destek oldunuz" yazıyordu (Kaan fark etti, 8 Ekim). Ayarlara satın alma yerine "premium mu" bilgisi gidiyordu; premium herkese açık olduğu için hep doğruydu. Düzeltildi.

## 2. Ses (ElevenLabs): Kaan'la birlikte, ondan izin almadan üretim yok

Şu an Gökçe'nin sesiyle konuşanlar, toplam 1.900 kayıt (~20 MB):

- Övgüler.
- BASARA ünlüleri, heceleri ve kelimeleri.
- Ses Taklit kartları.
- Konum kavramları: İç/Dış, Altında/Üstünde, Aşağıda/Yukarıda.
- Boyut kavramları: Geniş/Dar, Büyük/Küçük, Uzun/Kısa.
- Şekiller, Renkler, Rengi Ne?, Duygular.
- Dolu/Boş, Az/Çok.
- Gece/Gündüz, Sıcak/Soğuk, Islak/Kuru, Temiz/Kirli, Açık/Kapalı, Sert/Yumuşak.

Kalanlar (tahmini kredi; gerçekte bunun yaklaşık %40'ı harcanıyor):

| Sıra | İçerik | Tahmini kredi |
|---|---|---|
| 1 | İfade Tahtası (333 kart): konuşamayan çocuğun "sesi" | ~2.600 |
| 2 | Nesne kelimeleri (805) | ~6.200 |
| 3 | Kalan kavramlar (~45 etkinlik, her biri 1–2k) | ~55.000 |
| 4 | BASARA okuma cümleleri | ~9.200 |
| 5 | Mini oyun yönergeleri | ölçülecek |

- Kredi her ayın 27'sinde yenileniyor.
- Kaan'ın başka bir uygulaması için de kredi ayrılacak.
- Araçlar:
  - `node tools/ses/uret-ses.mjs <paket> [--evet]`: üretir.
  - `tools/ses/kontrol.mjs`: şüpheli kayıtları bulur.
  - `tools/ses/temizle.mjs`: hışırtıyı ve tıkları temizler.

## 3. Yabancı dildeki kullanıcılar için uyarı (Kaan'ın fikri)

Play istatistiklerinde yabancı ülkelerden kullanıcılar da görünüyor. Gerçekten yabancılar mı, yoksa yurt dışındaki Türkler mi, bilinmiyor.

- **Duyuru:** "Türkçe dışında bir dilde kullanmak istiyorsanız mağaza yorumuna yazın."
- **İstek gelirse:** Çoklu dil eklenir. O dillerde ElevenLabs kullanılmaz, cihaz sesiyle konuşulur.
- **Uygulamada:** Duyuru kartına bir madde olarak eklenebilir; ana ekrandaki "Yenilikler" penceresi bunun için uygun.

## 4. Çalışma kâğıtları ve PDF

- Kaan: "Çizgi film gibi olan görsellerimiz artık yok." Eski çizimler yedeğe taşındı, yerlerine fotoğraflar geldi.
- Fotoğraflar yazıcıda çizimler kadar iyi çıkmayabilir: renkli mürekkep harcar, siyah-beyaz baskıda koyu görünür.
- Seçenekler:
  - **a)** PDF'e "yazıcı dostu" anahtarı eklemek. Fotoğraf açık ve gri tonlu basılır.
  - **b)** Çalışma kâğıtları için Flow'da beyaz zeminli, kalın çizgili "boyama kitabı" tarzı ayrı bir görsel seti üretmek.
  - **c)** Eski çizimleri yalnız PDF için yedekten geri getirmek.
- 81 çalışma kâğıdının taraması: kırık görsel listesi aşağıda (bölüm 7).

## 5. Diğer bekleyenler

- **Netlify** (ilksozumotizm.netlify.app): GitHub'a BAĞLI (8 Ekim'de doğrulandı); her gönderim web sürümünü günceller. Aşağıdaki not eski:
  - Projede Netlify ayar dosyası yok. Site GitHub'a bağlı değilse elle yüklenmiş olabilir.
  - Kaan Netlify panelinde "Site configuration → Build & deploy → Continuous deployment" bölümüne bakmalı. Bağlıysa her GitHub gönderiminde site kendiliğinden güncellenir.
  - ozarik.org'un altında `ilksozum.ozarik.org` adresi açılacak.
- **Windows Store:** Kaan, Store kimliği için uygulama adını ayıracak.
- **Program Modu:** Kaan oğluyla birkaç gün deneyecek. Gerekirse seviyeler ve eşikler ayarlanacak.
- **Organ görselleri, temalar, "nine" telaffuzu:** Kaan deneyecek.

## 6. Kaan'ın denemesi gerekenler (9.1.0)

- Program Modu: tanıma turu, günlük oturum, ödül oyunu.
- Gökçe'nin sesi:
  - BASARA dersi.
  - Ses Taklit.
  - Kavramlar → Konum → İç/Dış.
  - Ayarlar → "Kayıtlı ses (Gökçe)" anahtarı.
- Yazdırma: bir kategoriden kart seçip PDF almak. Düzeltme 9.1.1'de.

## 7. Gece taraması sonuçları (7 Ekim, 81 çalışma kâğıdı tek tek açıldı)

- **Kırık ya da boş görsel:** 0. Bütün kâğıtlar açılıyor ve resimleri yükleniyor.
  - Meyveler, Aile Üyeleri ve 🎨 boyama kâğıdı yavaş açılıyor (10 saniyeye kadar "Yükleniyor…").
- **Hâlâ eski çizim kullanan 8 kâğıt.** Bu kelimelerin yeni fotoğrafı yok; eski çizimler yedeğe taşınmadığı için görünüyorlar:
  - Hangisi Kayıp? (2)
  - Ev Eşyaları (1)
  - Oyuncaklar (2)
  - Okul & Ofis Eşyaları (3)
  - Aile Üyeleri (8)
  - Meslekler (1)
  - Yerler & Odalar (2)
  - Vücudun Bölümleri (6; organlarda "Alternatif" çizim zaten bilerek duruyor)
- Kâğıtta fotoğraf ile çizim karışık görünüyor. Bölüm 4'teki karar (yazıcı dostu tarz) verilince bunlar da tek tarza getirilmeli.

