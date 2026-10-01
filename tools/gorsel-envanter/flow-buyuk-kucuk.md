# Flow turu 6: Büyük / Küçük

Eski uygulamada en çok kullanılan kavram (21 çift). Hedef: 10 çift (20 soru) ve 4 kademeli seri (küçük, orta, büyük). Seriler göreceli sorular içindir, çünkü aynı nesne bir soruda büyük, başka bir soruda küçük olur.

Bilerek seçilmeyenler:
- Ağaç ve bina: büyüklükle birlikte yükseklik de değişir, yüksek/alçak ile karışır.
- Kedi ve köpek: büyüyünce yaş da değişir, yavru/yetişkin farkına döner.
- Beyaz nesneler.

Dosya adları (Claude koyar): `<nesne>-buyuk.jpg`, `<nesne>-kucuk.jpg`, serilerde ayrıca `<nesne>-orta.jpg`.

## Ajana yapıştırılacak metin

Özel eğitim alan küçük çocuklar (3-6 yaş; otizm, dil gecikmesi, zihinsel yetersizlik) için bir kart uygulamasına görsel hazırlıyorum. Çocuğa iki kart gösterilip "Büyük olan hangisi?" / "Küçük olan hangisi?" diye soruluyor. Kartlar uygulamada AYRI AYRI ve AYNI BOYDA gösterilecek. Bu yüzden büyüklük farkı, nesnenin kartta kapladığı alanla görünmeli.

GENEL KURALLAR:
1. Stil: gerçekçi stüdyo fotoğrafı, yumuşak eşit ışık, düz saf beyaz arka plan ve beyaz zemin. Belirgin gölge yok.
2. Kare format. Tek nesne ortada, yere oturuyor.
3. Yazı, logo, marka, desen yok. İnsan, el, ek nesne yok. BEYAZ nesne yok.
4. ÇİFT KURALI: İki görselde aynı nesne, aynı renk, aynı model, aynı açı, aynı ışık, aynı oranlar. SADECE büyüklük farklı.
5. KAMERA UZAKLIĞI SABİT (çok önemli): kamera her görselde aynı uzaklıkta ve aynı yükseklikte. Büyük nesne karenin yaklaşık %75'ini kaplar. Küçük nesne yaklaşık %20-25'ini kaplar ve etrafında bol boşluk kalır. Küçük nesneyi YAKINLAŞTIRIP büyütme.
6. REFERANS MODU: Önce BÜYÜK olanı üret. Diğerlerini onu referans alarak ama üzerine YAZMADAN, listeye AYRI YENİ görsel olarak üret. Düzenleme/base modunu kullanma.
7. Her nesneyi bitirince dur ve onayımı bekle.

KADEMELİ SERİLER (ÜÇ görsel: BÜYÜK, ORTA, KÜÇÜK). Orta yaklaşık %45-50 alan kaplar:
1. Top: parlak düz kırmızı top, desensiz.
2. Elma: parlak kırmızı elma, saplı.
3. Oyuncak ayı: açık kahverengi pelüş ayı, oturuyor.
4. Kutu: kapalı, açık kahverengi karton kutu, önden hafif yukarıdan.

ÇİFTLER (iki görsel: BÜYÜK ve KÜÇÜK):
5. Balon: kırmızı parti balonu, ipi aşağı sarkıyor.
6. Ayakkabı: mavi çocuk spor ayakkabısı (bağcıklı, yan görünüm). Büyük olan yetişkin ayakkabısı boyutunda, küçük olan bebek ayakkabısı boyutunda. Model aynı.
7. Kupa: kulplu, düz yeşil seramik kupa.
8. Tencere: kapaklı, düz kırmızı tencere.
9. Karpuz: bütün, yeşil çizgili karpuz.
10. Yastık: düz sarı kare yastık.

SERİ 1 (top), BÜYÜK ile başla.

## Sonuç (2026-10-01)
24 görsel geldi (ham: `gorsel-ham/buyuk-kucuk-ham/`). Kullanılan 8 çift: top, elma, ayı, kupa, karpuz, tencere, balon, yastık → `gorsel-ham/buyuk-kucuk/`, id 2301-2317, 16 soru. Bağlandı.
- Seri: sadece top oldu (büyük, orta, küçük). Elma ve ayıda "orta" büyüğe çok yakın, kullanılmadı.
- Olmayanlar: kutu (üçü aynı boyda), ayakkabı (fark ~1,4 kat ve farklı model).

### Düzeltme: aynı sayfaya yaz
Kutu ve ayakkabıyı yeniden üret. Model küçük nesneyi kareyi dolduracak şekilde YAKINLAŞTIRIYOR, bunu YAPMA.
1. KUTU, BÜYÜK: kapalı, açık kahverengi karton kutu, önden hafif yukarıdan, karenin %75'ini kaplıyor.
2. KUTU, KÜÇÜK: AYNI kutu, AYNI açı, AYNI kamera uzaklığı. Kutu çok küçük: karenin sadece %15'i kadar, ortada yerde. Etrafındaki alanın büyük kısmı BOŞ beyaz zemin. Kibrit kutusu kadar küçük bir karton kutu gibi düşün.
3. AYAKKABI, BÜYÜK: mavi, bağcıklı, alçak (boğazsız) spor ayakkabı, yandan, karenin %75'i genişliğinde.
4. AYAKKABI, KÜÇÜK: AYNI model, AYNI renk, alçak (boğazsız), yandan, AYNI kamera uzaklığı. Bebek ayakkabısı kadar küçük: karenin sadece %20'si genişliğinde, etrafı boş beyaz zemin.
Referans modu, ayrı yeni görseller.
