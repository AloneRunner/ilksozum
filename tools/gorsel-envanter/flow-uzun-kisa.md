# Flow turu 7: Uzun / Kısa

Hedef: 10 çift (20 soru) ve 2 kademeli seri (kalem, tren). Yüksek/alçak ile karışmasın diye çoğu nesne YATAY uzanıyor. Ağaç, bina ve kule gibi dik nesneler kullanılmıyor, onlar yüksek/alçak kavramında.

Dosya adları (Claude koyar): `<nesne>-uzun.jpg`, `<nesne>-kisa.jpg`, serilerde ayrıca `<nesne>-orta.jpg`.

## Ajana yapıştırılacak metin

Özel eğitim alan küçük çocuklar (3-6 yaş; otizm, dil gecikmesi, zihinsel yetersizlik) için bir kart uygulamasına görsel hazırlıyorum. Çocuğa iki kart gösterilip "Uzun olan hangisi?" / "Kısa olan hangisi?" diye soruluyor. Kartlar uygulamada AYRI AYRI ve AYNI BOYDA gösterilecek. Bu yüzden uzunluk farkı, nesnenin kartta kapladığı uzunlukla görünmeli.

GENEL KURALLAR:
1. Stil: gerçekçi stüdyo fotoğrafı, yumuşak eşit ışık, düz saf beyaz arka plan ve beyaz zemin. Belirgin gölge yok.
2. Kare format. Tek nesne ortada.
3. Yazı, logo, marka, rakam, desen yok. Ek nesne yok. BEYAZ nesne yok.
4. ÇİFT KURALI: İki görselde aynı nesne, aynı renk, aynı model, aynı KALINLIK, aynı açı, aynı ışık. SADECE uzunluk farklı.
5. KAMERA UZAKLIĞI SABİT: kamera her görselde aynı uzaklıkta. Uzun olan karenin genişliğinin yaklaşık %85'ini kaplar. Kısa olan yaklaşık %25-30'unu kaplar, iki yanında bol boşluk kalır. Kısa olanı YAKINLAŞTIRIP büyütme.
6. REFERANS MODU: Önce UZUN olanı üret. Diğerlerini onu referans alarak ama üzerine YAZMADAN, listeye AYRI YENİ görsel olarak üret. Düzenleme/base modunu kullanma.
7. Her nesneyi bitirince dur ve onayımı bekle.

KADEMELİ SERİLER (ÜÇ görsel: UZUN, ORTA, KISA. Orta yaklaşık %55 uzunlukta):
1. Kalem: düz kırmızı boya kalemi, yazısız, YATAY, ucu sağda. Uzun: yeni kalem. Orta: biraz kullanılmış. Kısa: çok kullanılmış küçük kalem. Kalınlık aynı.
2. Tren: düz mavi oyuncak tren, yandan, raysız. Uzun: lokomotif ve 4 vagon. Orta: lokomotif ve 2 vagon. Kısa: sadece lokomotif. Lokomotif ve vagonların boyu her görselde aynı (kamera uzaklığı sabit).

ÇİFTLER (iki görsel: UZUN ve KISA):
3. Atkı: düz turuncu yün atkı, düz şekilde yatay serilmiş, saçaksız.
4. Kurdele: düz kırmızı saten kurdele, düz şekilde yatay, fiyonksuz.
5. Oyuncak yılan: düz yeşil kumaş oyuncak yılan, düz şekilde yatay uzanıyor.
6. Bank: düz ahşap park bankı, sırtlıklı, önden. Yükseklik aynı, sadece boyu (yatay) farklı.
7. Pantolon / şort: düz mavi kot pantolon, önden, düz serilmiş. Uzun: bileğe kadar pantolon. Kısa: aynı kumaş ve renkte, diz üstü şort. Bel aynı genişlikte.
8. Tişört kolu: düz yeşil tişört, önden, düz serilmiş. Uzun: uzun kollu. Kısa: aynı tişört, kısa kollu. Gövde aynı.
9. Çorap: düz sarı çocuk çorabı, yandan, düz serilmiş. Uzun: dize kadar uzun çorap. Kısa: bilekte biten kısa çorap. Ayak kısmı aynı boyda.
10. Saç: kahverengi saçlı, gülümseyen bir kız çocuğu, omuzdan yukarı, önden. Uzun: saçları beline kadar uzun ve düz. Kısa: AYNI kız, saçları çene hizasında kısa. Yüz, kıyafet ve arka plan aynı. (Bu görselde insan olabilir.)

SERİ 1 (kalem), UZUN ile başla.

## Sonuç (2026-10-01)
22 görsel geldi (ham: `gorsel-ham/uzun-kisa-ham/`). Kullanılan 8 çift: pantolon, tişört kolu, çorap, kurdele, bank, kalem, tren, saç → `gorsel-ham/uzun-kisa/`, id 2401-2416, 16 soru. Bağlandı.
- Seriler olmadı: orta kalem uzuna çok yakın, 2 vagonlu tren 4 vagonlu kadar uzun kadrajlanmış.
- Saç: iki farklı kız (kabul edildi, saç farkı net). Gri portre arka planı → `sahneNesneler`.
- Olmayanlar: atkı ve yılan (kısa olan da kartı dolduruyor).

### Düzeltme: aynı sayfaya yaz
Atkı ve oyuncak yılanı yeniden üret. Kısa olanı kartı dolduracak şekilde BÜYÜTME, kamera uzaklığı aynı kalsın.
1. ATKI, UZUN: düz turuncu yün atkı, yatay düz serilmiş, karenin genişliğinin %85'i.
2. ATKI, KISA: AYNI atkı kumaşı, AYNI genişlik (en), AYNI kamera uzaklığı. Boyu karenin genişliğinin sadece %25'i kadar, yani kare yakın küçük bir parça. Sağında ve solunda geniş boş beyaz alan.
3. YILAN, UZUN: düz yeşil kumaş oyuncak yılan, yatay düz uzanıyor, karenin %85'i.
4. YILAN, KISA: AYNI yılan (aynı kafa, aynı kalınlık, aynı renk), AYNI kamera uzaklığı. Boyu karenin sadece %25'i kadar, kafası aynı boyda, gövdesi çok kısa. İki yanında geniş boş alan.
Referans modu, ayrı yeni görseller.
