# ElevenLabs ses planı (6 Ekim 2026)

Kaan'ın kararı: krediler sınırlı, her şeye konmaz. Kaan olmadan hiçbir ses üretilmez. Bu dosya plan; üretime Kaan'la birlikte geçilir.

## Bugün

- Bütün konuşma telefonun kendi sesiyle (TTS) yapılıyor.
- Bazı telefonlarda Türkçe ses yok ya da İngilizce aksanla okuyor: "nine" → "nayn" gibi.
- Ağız hareketi yapılamıyor, çünkü telefonun sesinden ses verisi alınamıyor.

## Ne kazanırız

- Her telefonda aynı, sıcak, doğru Türkçe ses. Hece ve kelimeler net okunur.
- Kayıtlı seste ağız hareketi yapılabilir. Konuşma öğretme için bu çok önemli.
- İnternet gerekmez; sesler uygulamanın içine gömülür.

## Kredi hesabı

Kredi karakter başına harcanır.
- Multilingual v2 modelinde 1 karakter = 1 kredi.
- Flash modelinde yarı fiyat, ama kalite biraz düşük.

Tek hece ya da kısa kelime çoğu zaman birkaç denemede düzgün çıktığı için kısa kayıtlar ×3, uzunlar ×1,2 sayıldı.

| Aşama | İçerik | Karakter | Tahmini kredi | Boyut (32 kbps) |
|---|---|---|---|---|
| **1. Konuşma öğretme** | a, o, m gibi sesler; ba, ma heceleri; ~100 ilk kelime | ~1.500 | ~4.500 | ~1 MB |
| **2. Ses Taklit kartları** | 80 kart (hav hav, agu…) | ~1.100 | ~3.300 | ~0,5 MB |
| **3. BASARA** | 257 ünlü/hece + görme kelimeleri | ~800 | ~2.500 | ~0,7 MB |
| **4. Hızlı kelimeler + övgüler** | "Aferin!", "Harika!", "Tekrar dene"; İfade Tahtası hızlı kelimeleri | ~600 | ~1.000 | ~0,3 MB |
| 5. İfade kartları | 333 kart | ~2.600 | ~3.100 | ~2 MB |
| 6. Nesne kelimeleri | 805 kelime | ~6.200 | ~7.500 | ~4 MB |
| 7. Kavram soruları | 920 soru | ~19.700 | ~24.000 | ~9 MB |
| 8. Doğru/yanlış cümleleri | 2.226 cümle | ~55.000 | ~66.000 | ~25 MB |

- **1–4. aşamalar:** ~11.000 kredi. Starter planın (30.000/ay) bir ayına rahatça sığar. En çok fayda bunlarda.
- **5–6. aşamalar:** ~10.000 kredi. İkinci ay.
- **7–8. aşamalar:** Pahalı ve uygulamayı ~35 MB büyütür. Önerim: doğru/yanlış cümlelerini kalıplara bölmek. Örneğin "Evet!" + "Bu kalem kalın." gibi parçalar yeniden kullanılırsa sayı çok düşer. Mümkün değilse bu kısım telefon sesinde kalsın.

## Teknik plan

1. **Üretim aracı:** `tools/ses/uret-ses.mjs`.
   - Seçilen aşamanın metinlerini toplar.
   - ElevenLabs'tan mp3 alır: 22 kHz, 32 kbps mono, küçük boyut.
   - Dosyaları `public/audio/tts/` klasörüne yazar.
   - Daha önce üretilmiş metni tekrar üretmez, kredi boşa gitmez.
   - API anahtarı sadece Kaan'ın bilgisayarında, ortam değişkeninde durur. Depoya asla yazılmaz.
2. **Ses listesi:** Hangi metnin hangi dosyada olduğunu tutan `ses-listesi.json`.
3. **Çalma:** `speak()` önce listeye bakar. Kayıt varsa mp3 çalar, yoksa bugünkü gibi telefon sesine düşer. Yani her şey kademeli eklenebilir.
4. **Ağız hareketi:**
   - ElevenLabs "zaman damgalı" üretimde her harfin ne zaman söylendiğini veriyor. Bununla ağız şekilleri (a, o, m, b…) sesle tam eşleşir.
   - Daha önce yaptığımız dudak demosu (`tools/dudak-demo/`) buna bağlanır.
   - Önce konuşma öğretme setinde (1. aşama) kullanılır.
5. **Ses seçimi:** ElevenLabs'ın Türkçe konuşabilen 3-4 sesinden kısa örnekler üretilir (birkaç yüz kredi). Kaan dinleyip seçer; çocuklar için sıcak, yavaş ve net bir kadın sesi öneriyorum.

## Kaan'dan gerekenler

1. Hangi ElevenLabs planı var? Aylık kredi ne kadar?
2. Ses seçimi için örnek dinleme.
3. API anahtarı. Üretim günü kendi bilgisayarında ortam değişkenine yazılır.
4. Hangi aşamalardan başlanacağı. Önerim 1 → 2 → 3 → 4.

## Ses denemesi sonucu (6 Ekim 2026, Kaan'la)

- **Hesap:** Starter planı. Kredi her ay 27'sinde yenilenir; 6 Ekim'de 23.840 kredi kalmıştı.
- **Seçilen ses:** **Gökçe Deniz**, kütüphane sesi `oPC5I9GKjMReiaM29gjY`.
  - Gökçe'nin hesaba eklenmiş hali farklı bir kimlikle gelir.
  - Adaylar arasında Nazlı da vardı. Ama hesaba eklenince Nazlı, örnek kaydındaki sese hiç benzemedi; bu yüzden elendi.
- **Ayarlar:** Kaan'ın beğendiği hali aşağıdaki gibi.
  - Model: **`eleven_v3`**, dil `tr`, ses ayarı verilmez.
  - İlk denemelerde `eleven_multilingual_v2` kullanıldı. Kısa kelimelerde ("Aferin!") aksanlı ve şiveli çıktı.
  - Kaan v3'ü seçti (7 Ekim).
  - Öğretmen sesi adayları da denendi (Alice, Burcu, Aura, Mine, Ahu). Kaan: "Alice komutan gibi". Gökçe ile kalındı.
- **Kalite:** Üretim yüksek kalitede yapılır (`mp3_44100_128`); boyutu biz sonra ffmpeg ile küçültürüz.
  - 22 kHz / 32 kbps doğrudan üretimde ses bozuldu.
- **Tek sesler:** "Aaa", "Mmm" gibi tek sesleri yapay ses düzgün okuyamıyor. Gökçe hiç söylemedi, Nazlı'nınki tuhaf çıktı.
  - Bu sesler ya ebeveyn kaydıyla gelir ya da hece ve kelime içinden öğretilir. Karar Kaan'da.
- **Ses yeri:** Hesapta 10 ses yeri var, 9'u dolu.
  - Üretim günü ses hesaba eklenir ve üretimden sonra çıkarılır.
  - Kaan'ın eski seslerine dokunulmaz.
