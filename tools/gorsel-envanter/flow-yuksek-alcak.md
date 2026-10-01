# Flow turu 8: Yüksek / Alçak

Tek anlam: yerden yükselen şeylerin boyu ("yüksek bina", "alçak çit"). Konum anlamı ("yüksekte uçan kuş") konum etkinliğinde (yukarıda/aşağıda) var, burada yok. Uzun/kısa ile karışmasın diye yatay uzanan nesne yok, hepsi yere basan yapılar ve eşyalar.

Hedef: 10 çift (20 soru) ve 1 kademeli seri (blok kulesi).
Dosya adları (Claude koyar): `<nesne>-yuksek.jpg`, `<nesne>-alcak.jpg`, seride ayrıca `<nesne>-orta.jpg`.

## Ajana yapıştırılacak metin

Özel eğitim alan küçük çocuklar (3-6 yaş; otizm, dil gecikmesi, zihinsel yetersizlik) için bir kart uygulamasına görsel hazırlıyorum. Çocuğa iki kart gösterilip "Yüksek olan hangisi?" / "Alçak olan hangisi?" diye soruluyor. Kartlar uygulamada AYRI AYRI ve AYNI BOYDA gösterilecek. Bu yüzden yükseklik farkı, nesnenin kartta kapladığı yükseklikle görünmeli.

GENEL KURALLAR:
1. Stil: gerçekçi fotoğraf, yumuşak gündüz ışığı. Eşyalar (masa, tabure, kitaplık, ayakkabı, blok) düz beyaz arka planda stüdyo fotoğrafı. Dış mekan yapıları (bina, dağ, çit, duvar, çadır) sade bir dış mekanda: düz yeşil çimen zemin ve açık mavi gökyüzü, başka bir şey yok.
2. Kare format. Nesne ortada, zemine basıyor. Zemin çizgisi iki görselde aynı yükseklikte.
3. Yazı, logo, marka, tabela yok. İnsan, hayvan, araç yok. BEYAZ nesne yok.
4. ÇİFT KURALI: İki görselde aynı nesne, aynı renk, aynı malzeme, aynı GENİŞLİK, aynı açı, aynı ışık. SADECE yükseklik farklı.
5. KAMERA UZAKLIĞI SABİT: kamera her görselde aynı uzaklıkta ve aynı yükseklikte. Yüksek olan karenin yüksekliğinin %80'ini kaplar. Alçak olan sadece %20-25'ini kaplar, üstünde bol boşluk (gökyüzü ya da beyaz alan) kalır. Alçak olanı YAKINLAŞTIRIP büyütme.
6. REFERANS MODU: Önce YÜKSEK olanı üret. Diğerlerini onu referans alarak ama üzerine YAZMADAN, listeye AYRI YENİ görsel olarak üret. Düzenleme/base modunu kullanma.
7. Her nesneyi bitirince dur ve onayımı bekle.

KADEMELİ SERİ (ÜÇ görsel: YÜKSEK, ORTA, ALÇAK):
1. Blok kulesi: üst üste dizilmiş, aynı boyda renkli ahşap oyuncak bloklar (kırmızı, sarı, mavi, yeşil sırayla), beyaz arka plan. Yüksek: 8 blok. Orta: 4 blok. Alçak: 2 blok. Blokların boyu her görselde AYNI (kamera uzaklığı sabit).

ÇİFTLER (iki görsel: YÜKSEK ve ALÇAK):
2. Bina: açık sarı apartman, aynı pencere tipi, önden, çimenli zeminde. Yüksek: 8 katlı. Alçak: 2 katlı. Genişlik aynı.
3. Dağ: yeşil eteklerle tek bir dağ, önden. Yüksek: sivri, karlı olmayan, çok yüksek dağ. Alçak: aynı genişlikte, alçak yuvarlak tepe.
4. Çit: kahverengi ahşap bahçe çiti, önden, çimenli zeminde. Yüksek: bir yetişkin boyundan yüksek. Alçak: diz boyunda. Uzunluk (yatay) aynı.
5. Duvar: kırmızı tuğla duvar, önden, çimenli zeminde. Yüksek ve alçak. Yatay uzunluk aynı.
6. Masa: açık renkli ahşap masa, dört bacaklı, önden, beyaz arka plan. Yüksek: bacakları çok uzun, yüksek masa. Alçak: aynı tabla, bacakları çok kısa, yere yakın sehpa gibi.
7. Tabure: kırmızı yuvarlak oturaklı tabure, beyaz arka plan. Yüksek: uzun bacaklı bar taburesi. Alçak: aynı oturak, kısa bacaklı alçak tabure.
8. Kitaplık: açık renkli ahşap kitaplık, renkli kitaplarla dolu, önden, beyaz arka plan. Yüksek: 6 raflı. Alçak: aynı genişlikte 2 raflı.
9. Topuklu ayakkabı: kırmızı kadın ayakkabısı, yandan, beyaz arka plan. Yüksek: ince yüksek topuklu. Alçak: aynı model, çok alçak topuklu. Ayakkabının boyu aynı.
10. Çadır: turuncu kamp çadırı, önden, çimenli zeminde. Yüksek: içinde ayakta durulabilecek yükseklikte. Alçak: aynı genişlikte, yere yakın alçak çadır.

SERİ 1 (blok kulesi), YÜKSEK ile başla.

## Sonuç (2026-10-01)
21 görsel, hepsi kullanıldı (ilk denemede). 10 çift + blok serisi → `gorsel-ham/yuksek-alcak/`, id 2501-2521. "Alçak olan %20-25, üstünde boşluk" kuralı baştan verilince sorun çıkmadı.
