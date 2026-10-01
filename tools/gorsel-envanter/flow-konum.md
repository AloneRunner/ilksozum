# Flow turu 3: Konum kavramları (kapsamlı)

Hedef: uygulamayı kullanan tüm çocuklar (~600 kullanıcı). Konum kavramları aynı nesnelerle öğretilir, sonra farklı nesnelerle genellenir.

**3 set, her biri ayrı Flow sayfası:**
- **Set 1 (öğretim):** kırmızı top + karton kutu + ahşap masa
- **Set 2 (genelleme):** oyuncak ayı + hasır sepet + sandalye
- **Set 3 (genelleme):** oyuncak araba + plastik kova + sehpa

Her sette aynı kavramlar var:
- içinde / dışında
- üstünde / altında
- önünde / arkasında
- yanında
- arasında
- yukarıda / aşağıda

Toplam yaklaşık 3 × 12 = 36 görsel. Bunlardan iki tür soru çıkar:
- **Seçmeli:** "Top kutunun içinde olan hangisi?" gibi, iki ya da daha fazla görselden biri seçilir.
- **Evet/hayır:** "Top kutunun altında mı?" gibi, tek görsel gösterilir.

Ayrıca kendi içinde karıştırılınca (içinde mi, üstünde mi, önünde mi?) zor seviye sorular da çıkar.

Mevcut uygulamada bu kavramların verileri: `onUnderData`, `insideOutsideData` (sadece 5 çift, hepsi farklı nesne), `inFrontOfBehindData`, `besideOppositeData`, `betweenData` (~4 tur), `belowAboveData`. Bunlar yeni setle baştan yazılacak.

## Toplu indirme
Her set bitince Flow'da "projeyi indir" ile tümünü indir. Claude zip'i açar, doğruları seçer, `gorsel-ham/konum-set1/` gibi klasörlere ayırır ve seçtiklerini önizleme olarak gösterir.

---

## SET 1: Ajana yapıştırılacak metin

Özel eğitim alan küçük çocuklar (3-6 yaş; otizm, dil gecikmesi, zihinsel yetersizlik) için bir kart uygulamasına görsel hazırlıyorum. Bu sefer KONUM kavramlarını öğretiyoruz: "Top kutunun içinde olan hangisi?", "Top masanın altında olan hangisi?" gibi. Bu çocuklar için en önemli şey şu: tüm görsellerde AYNI nesneler, AYNI renkler, AYNI kamera açısı olacak. Görseller arasında değişen TEK şey topun yeri olacak. Böylece çocuk nesnelere değil, sadece konuma bakacak.

GENEL KURALLAR:
1. Stil: gerçekçi stüdyo fotoğrafı, yumuşak eşit ışık, düz saf beyaz arka plan ve beyaz zemin. Belirgin gölge yok, sadece nesnelerin altında hafif temas gölgesi olabilir.
2. Kare format. Sahne ortada, kenarlarda en az %10 boşluk, hiçbir nesne kesilmesin.
3. Yazı, logo, marka, desen yok. İnsan, el, hayvan, ek nesne yok. BEYAZ mobilya ya da beyaz nesne kullanma (beyaz zeminde kayboluyor). Kaplar OPAK olsun (şeffaf cam ya da tel olmasın).
4. SABİT NESNELER (hepsinde birebir aynı):
   - TOP: parlak düz kırmızı top, desensiz, futbol topu değil, çocuk elinde tutulacak boyutta.
   - KUTU: açık kahverengi karton kutu, üst kapakları açık ve yanlara katlanmış (içi görünüyor), topun yaklaşık 2,5 katı büyüklükte.
   - MASA: küçük, sade, açık renkli ahşap çocuk masası, dört bacaklı, masanın altı boş ve net görünüyor.
5. KAMERA: önden, hafif yukarıdan (yaklaşık 25 derece). Kutunun içi görülebilecek kadar yukarıdan. Bütün görsellerde bu açı aynı.
6. REFERANS MODU: İlk görseli üret. Sonrakileri ilk görseli referans alarak ama üzerine YAZMADAN, listeye AYRI YENİ görsel olarak üret. Düzenleme/base modunu kullanma. Hiçbir görsel silinmemeli.
7. Her görselde sadece bir tane top olsun.
8. Bir grup bitince dur ve onayımı bekle.

GRUP 1: İçinde / dışında (kutu)
1. Top kutunun İÇİNDE: kutunun içinde duruyor, yukarıdan açıkça görünüyor (topun üst yarısı kutunun ağzından görünür).
2. Top kutunun DIŞINDA: kutu boş (içinin boş olduğu belli), top kutunun sağında yerde, kutudan belirgin bir mesafede, kutuya değmiyor.

GRUP 2: Üstünde / altında (masa)
3. Top masanın ÜSTÜNDE: masanın tablasının tam ortasında duruyor.
4. Top masanın ALTINDA: masanın altında, yerde, tam ortada, bacakların arasında açıkça görünüyor. Masanın üstü boş.

GRUP 3: Önünde / arkasında / yanında (kutu)
5. Top kutunun ÖNÜNDE: kutunun önünde yerde, kameraya daha yakın, tamamen görünüyor.
6. Top kutunun ARKASINDA: kutunun arkasında yerde, kutunun üst kenarının üzerinden topun sadece üst kısmı görünüyor (kısmen saklı).
7. Top kutunun YANINDA: kutunun sağ yanında yerde, kutuya neredeyse değiyor, kutuyla aynı hizada (önünde ya da arkasında değil).

GRUP 4: Arasında (iki kutu)
8. Top iki kutunun ARASINDA: aynı karton kutudan iki tane yan yana, aralarında boşluk var, top tam ortadaki boşlukta yerde duruyor.
9. Top iki kutunun arasında DEĞİL: aynı iki kutu, top sağdaki kutunun sağ tarafında, dışarıda.

GRUP 5: Yukarıda / aşağıda (masa, top havada)
10. Top YUKARIDA: masanın çok üstünde, havada asılı gibi duruyor (masaya değmiyor, görselin üst kısmında).
11. Top AŞAĞIDA: aynı masa, top masanın yanında yerde (görselin alt kısmında).

GRUP 6: Masa ve kutu birlikte (zor seviye, karışık konum soruları için)
12. Kutu masanın üstünde, top kutunun içinde. Aynı nesneler, aynı açı.

GRUP 1, görsel 1 ile başla.

---

## SET 2: Ajana yapıştırılacak metin (ayrı sayfa)

Set 1 metninin aynısı, sadece nesneler ve adları değişir:
- TOP → OYUNCAK AYI: küçük, açık kahverengi pelüş oyuncak ayı, oturur pozisyonda.
- KUTU → SEPET: açık renkli hasır sepet, kulpsuz, yuvarlak, üstü açık. Ayının yaklaşık 2 katı büyüklükte.
- MASA → SANDALYE: sade, açık renkli ahşap çocuk sandalyesi, dört bacaklı, oturağın altı boş.

Grup 5'te "havada asılı" yerine: 10. Ayı YUKARIDA, sandalyenin arkalığının tepesinde oturuyor. 11. Ayı AŞAĞIDA, sandalyenin yanında yerde.

---

## SET 3: Ajana yapıştırılacak metin (ayrı sayfa)

Set 1 metninin aynısı, nesneler:
- TOP → OYUNCAK ARABA: küçük, düz mavi oyuncak araba, desensiz, yazısız.
- KUTU → KOVA: sarı plastik kova, sapı aşağı yatık, üstü açık, arabanın yaklaşık 2 katı büyüklükte.
- MASA → SEHPA: alçak, sade, beyaz, dört bacaklı sehpa, altı boş.

Grup 5'te: 10. Araba YUKARIDA, sehpanın üstünde, sehpanın üzerine konmuş bir kitap yığınının tepesinde (yüksekte). 11. Araba AŞAĞIDA, sehpanın yanında yerde.

## Sonuç (2026-10-01)
3 set × 12 = 36 görsel indirildi (ham: `gorsel-ham/konum-ham/`). Kavram adlarıyla ayrıldı: `gorsel-ham/konum-set1-top/`, `konum-set2-ayi/`, `konum-set3-araba/`. Dosya adları: icinde, disinda, ustunde, altinda, onunde, arkasinda, yaninda, arasinda, arasinda-degil, yukarida, asagida, zor-...
Flow dosya adları yine yanlış çıktı (ör. "Red_ball_in_box" aslında ÖNÜNDE). Görsele bakarak eşleştirildi.

Yeniden yapılanlar (4 görsel, 2026-10-01, yerlerine konuldu — set tamam):
- Set 3 `zor-sehpa-kova-icinde`: arka plan mavi → beyaz zeminde, aynı beyaz sehpa.
- Set 2 `yukarida` ve `altinda`: sandalye farklı model → `ustunde` görselindeki sandalyenin aynısı.
- Set 1 `disinda`: top kutuya çok yakın, "yanında" ile karışabilir → kutudan belirgin uzakta.
Küçük farklar (kabul): set 3 `ustunde` sehpası biraz farklı; bazı görsellerde top yakın plan.
