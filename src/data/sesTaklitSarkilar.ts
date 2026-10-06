// Ses Taklit şarkıları (public/muzik). Sözler eski menüden taşındı (2026-10).
export interface Sarki { id: string; ad: string; dosyalar: string[]; sozler: string }

export const SES_TAKLIT_SARKILARI: Sarki[] = [
  { id: 'havhav', ad: 'Hav Hav — Pat Pat', dosyalar: ['/muzik/havhavpatpat.mp3'], sozler: `Hav hav dedi köpekçik
Pat pat koştu ayakçık
Şıp şıp damlar yağmurcuk

[Chorus]
Hav hav
Pat pat
Şıp şıp
Çat çat
Herkes seslere kat kat

[Verse 2]
Miyav dedi minik kedi
Vız vız uçtu arı peri
Tak tak çaldı kapı seni

[Chorus]
Hav hav
Pat pat
Şıp şıp
Çat çat
Herkes seslere kat kat

[Bridge]
Cik cik kuşlar uçar
Tık tık saat kaçar
Hop hop toplar zıplar

[Chorus]
Hav hav
Pat pat
Şıp şıp
Çat çat
Herkes seslere kat kat` },
  { id: 'saksak', ad: 'Şak Şak Hop Hop', dosyalar: ['/muzik/saksakhophop.mp3', '/muzik/saksakhophop2.mp3'], sozler: `[Verse]
Alkış, şak şak şak, eller havada,
Zıplamak, hop hop, bulutlar arada.
Asker yürür, rap rap, yolda sırada,
Gülüşler, ha ha, yayılsın her odada.

[Chorus]
Şak şak, hop hop, herkes katılsın,
Rap rap, ha ha, neşe saçsın!
Şak şak, hop hop, ritim tutulsun,
Rap rap, ha ha, gülüş unutulsun!

[Verse 2]
Kediler miyav, kuşlar cıv cıv,
Doğa şarkı söyler, hepimiz canlı.
Köpekler hav hav, neşeli bir kervan,
Seslerle dolu bu dünya, ne harika bir an!

[Chorus]
Şak şak, hop hop, herkes katılsın,
Rap rap, ha ha, neşe saçsın!
Şak şak, hop hop, ritim tutulsun,
Rap rap, ha ha, gülüş unutulsun!

[Bridge]
Birlikte gülelim, ha ha, çok güzel,
Şarkılarla dolsun günler, her özel.
Şak şak, hop hop, kalpler pır pır,
Seslerle dans eder dünya, ne şık bir sır!

[Outro]
Alkış, şak şak, sesler yankılansın,
Zıplamak, hop hop, göklere ulaşsın.
Rap rap, ha ha, çocuklar gülsün,
Bu şarkıyla herkes neşeyle dolsun!` },
];
