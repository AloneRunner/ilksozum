/**
 * Mini oyunların kullandığı gerçek kart görselleri.
 * Kimlikler public/images/<id>.png dosyalarına ve imageData veritabanına karşılık gelir.
 * Emoji yerine uygulamanın kendi görsellerini kullanmak, çocuğun kartlarda
 * öğrendiği nesneyi oyunda da tanımasını sağlar.
 */
export interface GameImage {
    id: number;
    name: string;
}

export const imgUrl = (id: number): string => `/images/${id}.png`;

export const IMAGE_SETS = {
    animals: [
        { id: 16, name: 'Kedi' },
        { id: 46, name: 'Köpek' },
        { id: 41, name: 'Tavşan' },
        { id: 26, name: 'Ördek' },
        { id: 28, name: 'Fil' },
        { id: 29, name: 'Fare' },
        { id: 32, name: 'Papağan' },
        { id: 42, name: 'Kaplumbağa' },
        { id: 73, name: 'Kuş' },
        { id: 92, name: 'Uğur böceği' },
        { id: 100, name: 'Aslan' },
        { id: 101, name: 'Zürafa' },
        { id: 102, name: 'Horoz' },
        { id: 103, name: 'Baykuş' },
        { id: 740, name: 'Balık' },
        { id: 916, name: 'Ayı' },
    ],
    fruits: [
        { id: 43, name: 'Elma' },
        { id: 55, name: 'Limon' },
        { id: 88, name: 'Üzüm' },
        { id: 114, name: 'Muz' },
        { id: 115, name: 'Portakal' },
        { id: 170, name: 'Karpuz' },
        { id: 171, name: 'Çilek' },
        { id: 278, name: 'Kiraz' },
        { id: 279, name: 'Ananas' },
        { id: 295, name: 'Kavun' },
        { id: 333, name: 'Şeftali' },
        { id: 365, name: 'Armut' },
    ],
    vegetables: [
        { id: 75, name: 'Soğan' },
        { id: 98, name: 'Havuç' },
        { id: 116, name: 'Salatalık' },
        { id: 128, name: 'Domates' },
        { id: 129, name: 'Marul' },
        { id: 227, name: 'Biber' },
        { id: 280, name: 'Patlıcan' },
        { id: 311, name: 'Brokoli' },
    ],
    vehicles: [
        { id: 1, name: 'Araba' },
        { id: 105, name: 'Okul otobüsü' },
        { id: 106, name: 'Tren' },
        { id: 107, name: 'Uçak' },
        { id: 110, name: 'Bisiklet' },
        { id: 162, name: 'Helikopter' },
        { id: 204, name: 'Roket' },
        { id: 256, name: 'İtfaiye aracı' },
        { id: 257, name: 'Ambulans' },
        { id: 259, name: 'Motosiklet' },
        { id: 288, name: 'Kamyon' },
        { id: 289, name: 'Traktör' },
    ],
    clothes: [
        { id: 13, name: 'Tişört' },
        { id: 54, name: 'Pijama' },
        { id: 58, name: 'Çorap' },
        { id: 59, name: 'Ayakkabı' },
        { id: 79, name: 'Pantolon' },
        { id: 111, name: 'Şapka' },
        { id: 206, name: 'Kask' },
        { id: 255, name: 'Gömlek' },
        { id: 268, name: 'Elbise' },
    ],
    music: [
        { id: 72, name: 'Davul' },
        { id: 180, name: 'Gitar' },
        { id: 208, name: 'Keman' },
        { id: 328, name: 'Flüt' },
        { id: 329, name: 'Marakas' },
        { id: 364, name: 'Saksafon' },
        { id: 428, name: 'Zil' },
        { id: 429, name: 'Tef' },
    ],
    household: [
        { id: 5, name: 'Kutu' },
        { id: 34, name: 'Vazo' },
        { id: 39, name: 'Kapı' },
        { id: 96, name: 'Sandalye' },
        { id: 118, name: 'Saat' },
        { id: 124, name: 'Bardak' },
        { id: 134, name: 'Masa' },
        { id: 137, name: 'Yastık' },
    ],
    kitchen: [
        { id: 125, name: 'Kaşık' },
        { id: 126, name: 'Çatal' },
        { id: 153, name: 'Tabak' },
        { id: 262, name: 'Bıçak' },
        { id: 264, name: 'Tava' },
        { id: 356, name: 'Çaydanlık' },
        { id: 671, name: 'Tencere' },
    ],
    school: [
        { id: 36, name: 'Kitap' },
        { id: 121, name: 'Kalem' },
        { id: 149, name: 'Cetvel' },
        { id: 535, name: 'Silgi' },
        { id: 600, name: 'Zarf' },
        { id: 642, name: 'Kağıt' },
        { id: 220, name: 'Pergel' },
    ],
    toys: [
        { id: 109, name: 'Oyuncak bebek' },
        { id: 130, name: 'Balon' },
        { id: 135, name: 'Uçurtma' },
        { id: 156, name: 'Top' },
        { id: 177, name: 'Robot' },
        { id: 276, name: 'Oyuncak ayı' },
        { id: 383, name: 'Kaykay' },
    ],
    plants: [
        { id: 10, name: 'Ağaç' },
        { id: 57, name: 'Lale' },
        { id: 76, name: 'Papatya' },
        { id: 281, name: 'Kaktüs' },
        { id: 309, name: 'Gül' },
        { id: 443, name: 'Çiçek' },
    ],
} satisfies Record<string, GameImage[]>;

export type ImageSetKey = keyof typeof IMAGE_SETS;
