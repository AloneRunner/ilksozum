# Flow turu 11: Bütün (Tam) / Yarım / Çeyrek

Kaan'a göre çocukların en zorlandığı konulardan biri. Her yiyeceğin ÜÇ hali var: bütün, yarım, çeyrek. Bunlardan 3 karşılaştırma çıkar (bütün-yarım, yarım-çeyrek, bütün-çeyrek). "Bütün" soruları ayrıca "Tam olan hangisi?" diye de sorulur (Kaan: "tam da lazım").

Hedef: 8 yiyecek × 3 görsel = 24 görsel, 24 karşılaştırma, yaklaşık 64 soru.
Dosya adları (Claude koyar): `<nesne>-butun.jpg`, `<nesne>-yarim.jpg`, `<nesne>-ceyrek.jpg`.

## Ajana yapıştırılacak metin

Özel eğitim alan küçük çocuklar (3-6 yaş; otizm, dil gecikmesi, zihinsel yetersizlik) için bir kart uygulamasına görsel hazırlıyorum. BÜTÜN, YARIM ve ÇEYREK kavramlarını öğretiyoruz. Çocuğa kartlar gösterilip "Bütün olan hangisi?", "Yarım olan hangisi?", "Çeyrek olan hangisi?" diye soruluyor. Kartlar uygulamada AYRI AYRI ve AYNI BOYDA gösterilecek.

GENEL KURALLAR:
1. Stil: gerçekçi stüdyo fotoğrafı, yumuşak eşit ışık, düz saf beyaz arka plan ve beyaz zemin. Belirgin gölge yok.
2. Kare format. Yiyecek ortada, zemine oturuyor.
3. Yazı, logo yok. İnsan, el, bıçak, tabak, kesme tahtası YOK. Sadece yiyecek.
4. Her yiyecek için ÜÇ görsel:
   - BÜTÜN: hiç kesilmemiş, tam yiyecek.
   - YARIM: tam ortadan ikiye kesilmiş, SADECE BİR yarısı görünüyor. Kesik yüzü kameraya dönük, içi görünüyor. Diğer yarı yok.
   - ÇEYREK: dörde bölünmüş, SADECE TEK BİR çeyrek parça görünüyor (dilim/kama şeklinde). Diğer parçalar yok.
5. KAMERA UZAKLIĞI SABİT (çok önemli): üç görselde kamera aynı uzaklıkta. Yarım parça bütünün gerçekten yarısı kadar, çeyrek parça dörtte biri kadar görünmeli. Bütün yiyecek karenin yaklaşık %60'ını kaplar. Yarım ve çeyreği YAKINLAŞTIRIP büyütme, etraflarında boşluk kalsın.
6. Üç görselde aynı yiyecek, aynı renk, aynı olgunluk, aynı ışık, aynı açı (önden, hafif yukarıdan).
7. REFERANS MODU: Önce BÜTÜN olanı üret. YARIM ve ÇEYREĞİ onu referans alarak ama üzerine YAZMADAN, listeye AYRI YENİ görseller olarak üret. Düzenleme/base modunu kullanma.
8. Her yiyeceği bitirince dur ve onayımı bekle.

YİYECEKLER:
1. Elma: kırmızı elma. Yarım ve çeyrekte beyaz içi ve çekirdekleri görünüyor.
2. Portakal: turuncu portakal. Yarımda dilimli turuncu içi görünüyor. Çeyrek, kabuklu bir kama parçası.
3. Pizza: yuvarlak, peynirli, domatesli pizza, yukarıdan. Yarım: yarım daire. Çeyrek: tek bir çeyrek dilim (üçgen).
4. Pasta: yuvarlak, çikolatalı pasta, kremasız, yandan hafif yukarıdan. Yarım: yarım daire pasta, kesik yüzde katları görünüyor. Çeyrek: tek bir çeyrek dilim.
5. Karpuz: yuvarlak yeşil çizgili karpuz. Yarım: kırmızı içi görünen yarım karpuz. Çeyrek: tek bir çeyrek karpuz parçası.
6. Ekmek: yuvarlak köy ekmeği. Yarım: içi görünen yarım ekmek. Çeyrek: tek bir çeyrek parça.
7. Limon: sarı limon. Yarımda dilimli içi görünüyor. Çeyrek: tek bir kama parçası.
8. Domates: kırmızı domates. Yarımda içi ve çekirdekleri görünüyor. Çeyrek: tek bir kama parçası.

YİYECEK 1, BÜTÜN elma ile başla.

## Sonuç (2026-10-01)
24 görsel geldi. Model "bir parçası eksik bütün" ile "sadece o parça"yı karıştırıyor: pizza yarımı 3/4 pizza, pasta çeyreği 3/4 pasta, ekmek yarımı iki yarı yan yana, karpuz çeyreği ikiye bölünmüş yarım. Pastanın bütünü ve yarımı farklı pastalar, çıkarıldı.
- Kullanılan: elma, portakal, limon, domates (3 hal), karpuz (bütün + yarım), ekmek (bütün + çeyrek).
- **Pizza Claude tarafından kesildi:** yukarıdan çekilmiş bütün pizza daire maskesiyle yarım ve çeyreğe bölündü (aynı pizza, aynı ölçek, saf beyaz zemin). Yukarıdan çekilmiş düz yuvarlak yiyeceklerde bu yöntem kullanılabilir.
- Sonuç: 19 görsel (id 2801-2819), 17 karşılaştırma, 46 soru ("Tam olan hangisi?" dahil).

### Düzeltme: aynı sayfaya yaz
1. PASTA (sadece bütün): yuvarlak, üstü çikolata kremalı pasta, TAM YUKARIDAN (kuşbakışı) çekilmiş, düz beyaz zemin, karenin %60'ı. Sadece bu tek görsel. Yarım ve çeyreği ben keseceğim.
2. EKMEK, YARIM: aynı yuvarlak köy ekmeği, ortadan kesilmiş, SADECE TEK BİR YARIM var, kesik yüzü kameraya dönük. İkinci yarım görselde HİÇ YOK.
3. KARPUZ, ÇEYREK: aynı karpuz, SADECE TEK BİR çeyrek parça. Karpuzun dörtte biri: yarım karpuzu bir kez daha ortadan kesince çıkan TEK parça. Kırmızı içi ve kabuğu görünüyor. Yanında başka parça yok.
Referans modu, ayrı yeni görseller. Kamera uzaklığı bütün görselleriyle aynı.
