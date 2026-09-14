# Microsoft Store yayın hazırlığı: İlk Sözüm

İlk Sözüm Microsoft Store'a PWA olarak gönderilir. Paket, canlı siteyi açan bir
Windows kabuğudur. Android uygulamasını etkilemez; site güncellendiğinde
Windows uygulaması da güncellenir.

## Önce karar verin: hangi adres?

PWA paketi başlangıç adresine bağlıdır. Adres sonradan değişirse yeni paket
gerekir. Bu yüzden `ilksozum.ozarik.org` alt alan adını **pakete başlamadan önce**
Netlify'da bağlayın ve paketi o adresle oluşturun. Geçici adres:
`https://ilksozumotizm.netlify.app/`.

## Projede hazır olanlar

- `public/manifest.json`: `start_url` `/?source=windows-app`, dil, kategori,
  doğru boyutta 192/512 piksel simge ve maskelenebilir simge
- `public/sw.js`: dosya önbelleğe almayan, yalnız bağlantı yokken
  `public/offline.html` gösteren servis çalışanı. Eski sürümün her şeyi
  önbelleğe alan kayıtlarını etkinleşince siler.
- Servis çalışanı yalnız tarayıcıda kaydedilir; Android uygulamasında kaydedilmez
- `index.html`: Google için açıklama, kalıcı adres ve paylaşım etiketleri

## Mağaza kuralları (Microsoft Store Policies 7.19)

- **Kategori:** Eğitim.
- **Çocuklar:** Uygulama 13 yaş altı çocuklara yönelik. Partner Center'da bunu
  bildirin ve yaş derecelendirme formunu buna göre doldurun.
- **Reklam ve bağış:** Windows sürümünde ikisi de yok.
- **Uygulama adı:** Pazarlama veya açıklama metni içermemeli. `İlk Sözüm` gibi
  yalın bir ad rezerve edin; "Otizm & Okul Öncesi" açıklamaya gider.
- **Gizlilik politikası:** Partner Center'a bir gizlilik politikası bağlantısı
  girin. Uygulamadaki gizlilik politikası metni bir web sayfası olarak da
  yayınlanmalı.

## Partner Center adımları

1. Bireysel geliştirici hesabıyla Partner Center'a girin.
2. **Apps and games > New product > MSIX or PWA app** yolunu açın.
3. Uygulama adını ayırtın: `İlk Sözüm`.
4. **Product identity** sayfasındaki Package ID, Publisher ID ve Publisher
   display name değerlerini kaydedin.
5. Site yayına alındıktan sonra `https://www.pwabuilder.com/` adresinde
   seçtiğiniz adresi test edin.
6. Windows paketi oluştururken Partner Center'daki üç kimlik değerini girin.
7. Oluşan paketi Partner Center'a yükleyin.

## Mağaza kaydı metinleri

**Kısa açıklama**

    Otizmli ve okul öncesi çocuklar için ücretsiz kavram, nesne, harf-ses ve iletişim kartları.

**Açıklama:** Google Play uzun açıklamasının aynısı. Sona şunu ekleyin:

    Uygulamayı web sürümünden ve Google Play'deki Android uygulamasından da
    kullanabilirsiniz.

**Arama terimleri** (en fazla 7 adet):

    otizm
    özel eğitim
    okul öncesi
    iletişim kartları
    eğitici kartlar
    ilk kelimeler
    dil gelişimi

## Hazırlanacak görseller

- En az bir ekran görüntüsü (1366x768 veya daha büyük)
- 1:1 kare mağaza logosu (`public/images/icon-512x512.png` kullanılabilir)
