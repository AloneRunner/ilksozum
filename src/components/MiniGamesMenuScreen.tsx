import React, { useState, useMemo } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import MenuButton from './ui/MenuButton.tsx';
import GameIcon from './icons/GameIcon.tsx';
import { useAppContext } from '../contexts/AppContext.ts';

interface MiniGamesMenuScreenProps {
  onBack: () => void;
  onSelectGame: (gameId: string) => void;
}

// Game categories with emojis
const CATEGORIES = [
  { id: 'all', label: '🎮 Tümü', emoji: '🎮' },
  { id: 'fun', label: '🎈 Eğlence', emoji: '🎈' },
  { id: 'basic', label: '📏 Temel', emoji: '📏' },
  { id: 'numbers', label: '🔢 Sayılar', emoji: '🔢' },
  { id: 'letters', label: '🔤 Harfler', emoji: '🔤' },
  { id: 'creative', label: '🎨 Yaratıcı', emoji: '🎨' },
  { id: 'logic', label: '🧠 Mantık', emoji: '🧠' },
  { id: 'action', label: '🎯 Aksiyon', emoji: '🎯' },
  { id: 'social', label: '💕 Sosyal', emoji: '💕' },
  { id: 'advanced', label: '🏆 İleri', emoji: '🏆' },
];

const MiniGamesMenuScreen: React.FC<MiniGamesMenuScreenProps> = ({ onBack, onSelectGame }) => {
  const { settings } = useAppContext();
  const theme = settings.theme;
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchText, setSearchText] = useState('');

  const games = [
    // === EĞLENCELİ BAŞLANGIÇ ===
    { id: 'balloonPop', category: 'fun', icon: GameIcon, title: '🎈 Balon Patlatma', subtitle: 'Balonları patlat!', color: 'fuchsia' as const },
    { id: 'butterflyGarden', category: 'fun', icon: GameIcon, title: '🦋 Kelebek Bahçesi', subtitle: 'Kelebekleri çiçeklere götür!', color: 'emerald' as const },
    { id: 'rainbow', category: 'fun', icon: GameIcon, title: '🌈 Gökkuşağı', subtitle: 'Renkleri sırala!', color: 'pink' as const },
    { id: 'bubblePop', category: 'fun', icon: GameIcon, title: '🫧 Baloncuk Patlat', subtitle: 'Baloncukları patlat!', color: 'cyan' as const },

    // === TEMEL BECERİLER ===
    { id: 'counting', category: 'numbers', icon: GameIcon, title: '🔢 Sayı Sayma', subtitle: 'Kaç tane var?', color: 'teal' as const },
    { id: 'sizeOrdering', category: 'basic', icon: GameIcon, title: '📏 Boyut Sıralama', subtitle: 'Küçükten büyüğe!', color: 'lime' as const },
    { id: 'shapeMatching', category: 'basic', icon: GameIcon, title: '🔷 Şekil Eşleştirme', subtitle: 'Şekilleri eşleştir!', color: 'orange' as const },
    { id: 'shadowMatch', category: 'basic', icon: GameIcon, title: '🔦 Gölge Eşleştirme', subtitle: 'Gölgeleri bul!', color: 'sky' as const },
    { id: 'colorMix', category: 'basic', icon: GameIcon, title: '🧪 Renk Karıştır', subtitle: 'Renkleri karıştır!', color: 'pink' as const },

    // === SAYI OYUNLARI ===
    { id: 'numberTarget', category: 'numbers', icon: GameIcon, title: '🎯 Sayı Hedefi', subtitle: 'Hedef sayıyı yakala!', color: 'orange' as const },
    { id: 'numberSequence', category: 'numbers', icon: GameIcon, title: '🔢 Sayı Sırala', subtitle: '1, 2, 3... sırala!', color: 'indigo' as const },
    { id: 'balanceScale', category: 'numbers', icon: GameIcon, title: '⚖️ Tartı Dengele', subtitle: 'Ağır-hafif, büyük-küçük...', color: 'amber' as const },

    // === ALFABE / DİL ===
    { id: 'letterBubbles', category: 'letters', icon: GameIcon, title: '🔤 Harf Baloncukları', subtitle: 'Harfleri patlat!', color: 'indigo' as const },
    { id: 'syllableTrain', category: 'letters', icon: GameIcon, title: '🚂 Hece Treni', subtitle: 'Heceleri birleştir!', color: 'purple' as const },
    { id: 'wordBox', category: 'letters', icon: GameIcon, title: '📦 Kelime Kutusu', subtitle: 'Resmi kelimeyle eşle!', color: 'indigo' as const },

    // === YARATICILIK / EL BECERİSİ ===
    { id: 'connectDots', category: 'creative', icon: GameIcon, title: '✏️ Noktaları Birleştir', subtitle: 'Sayıları takip et!', color: 'blue' as const },
    { id: 'colorSorting', category: 'creative', icon: GameIcon, title: '🎨 Renk Toplama', subtitle: 'Renklere göre ayır!', color: 'rose' as const },
    { id: 'plantGrowing', category: 'creative', icon: GameIcon, title: '🌱 Bitki Büyüt', subtitle: 'Su ver, güneş ver!', color: 'cyan' as const },
    { id: 'trainTrack', category: 'creative', icon: GameIcon, title: '🚂 Tren Yolu', subtitle: 'Yol çiz!', color: 'emerald' as const },
    { id: 'pattern', category: 'creative', icon: GameIcon, title: '🎨 Örüntü Tamamla', subtitle: 'Desenleri tamamla!', color: 'cyan' as const },
    { id: 'sheepShearing', category: 'creative', icon: GameIcon, title: '🐑 Koyun Kırkma', subtitle: 'Yününü kırk!', color: 'lime' as const },

    // === MANTIK / ZEKA ===
    { id: 'memoryMatch', category: 'logic', icon: GameIcon, title: '🃏 Hafıza Çiftleri', subtitle: 'Eşleşen kartları bul!', color: 'purple' as const },
    { id: 'oddOneOut', category: 'logic', icon: GameIcon, title: '🎪 Kim Farklı?', subtitle: 'Farklı olanı bul!', color: 'cyan' as const },
    { id: 'whereBelongs', category: 'logic', icon: GameIcon, title: '🏠 Nereye Ait?', subtitle: 'Doğru yere koy!', color: 'amber' as const },
    { id: 'whoseIsThis', category: 'logic', icon: GameIcon, title: '🧩 Bu Kimin?', subtitle: 'Sahipleri eşleştir!', color: 'indigo' as const },
    { id: 'dailyRoutine', category: 'logic', icon: GameIcon, title: '📋 Sıralı Ol!', subtitle: 'Günlük rutini sırala!', color: 'fuchsia' as const },
    { id: 'maze', category: 'logic', icon: GameIcon, title: '🐭 Labirent', subtitle: 'Fareyi peynire götür!', color: 'orange' as const },
    { id: 'sevenDifferences', category: 'logic', icon: GameIcon, title: '🔍 7 Fark Bul', subtitle: 'Farkları bul!', color: 'amber' as const },
    { id: 'puzzle', category: 'logic', icon: GameIcon, title: '🧩 Yapboz', subtitle: 'Parçaları birleştir!', color: 'purple' as const },
    { id: 'busJam', category: 'logic', icon: GameIcon, title: '🚌 Otobüs Durağı', subtitle: 'Yolcuları bindir!', color: 'sky' as const },

    // === AKSİYON / REFLEKSİ ===
    { id: 'targetShooting', category: 'action', icon: GameIcon, title: '🎯 Hedef Vurma', subtitle: 'Hedeflere dokun!', color: 'indigo' as const },
    { id: 'fishing', category: 'action', icon: GameIcon, title: '🎣 Balık Tutma', subtitle: 'Balık yakala!', color: 'cyan' as const },
    { id: 'fruitCollector', category: 'action', icon: GameIcon, title: '🍎 Meyve Topla', subtitle: 'Meyveleri topla!', color: 'lime' as const },

    // === SOSYAL / DUYGUSAL ===
    { id: 'emotionPuppet', category: 'social', icon: GameIcon, title: '🎭 Duygu Kuklası', subtitle: 'Duyguları öğren!', color: 'rose' as const },
    { id: 'roomCleaning', category: 'social', icon: GameIcon, title: '🧹 Oda Temizliği', subtitle: 'Odayı topla!', color: 'amber' as const },
    { id: 'musicTouch', category: 'social', icon: GameIcon, title: '🎹 Müzik Dokun', subtitle: 'Müzik alet çal!', color: 'indigo' as const },

    // === İLERİ SEVİYE (MERGE OYUNLARI) ===
    { id: 'mergeDrop', category: 'advanced', icon: GameIcon, title: '🍎 Meyve Birleştir', subtitle: 'Meyveleri birleştir, büyüt!', color: 'emerald' as const },
    { id: 'numberMerge', category: 'advanced', icon: GameIcon, title: '🔢 Sayı Birleştir', subtitle: 'Sayıları birleştir, 10\'a ulaş!', color: 'blue' as const },
  ];

  // Filter games based on category and search
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
      const matchesSearch = searchText === '' ||
        game.title.toLowerCase().includes(searchText.toLowerCase()) ||
        game.subtitle.toLowerCase().includes(searchText.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchText]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-b from-purple-600/95 to-purple-600/80 backdrop-blur-sm pb-2">
          <div className="flex items-center justify-between p-3">
            <button
              onClick={onBack}
              className="bg-white/90 hover:bg-white text-purple-600 rounded-full p-2 shadow-lg"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>

            <h1 className="text-xl font-black text-white drop-shadow-lg">
              🎮 Mini Oyunlar
            </h1>

            <div className="w-9"></div>
          </div>

          {/* Search Bar */}
          <div className="px-3 pb-2">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Oyun ara..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full bg-white/90 rounded-full px-4 py-2 text-sm text-gray-800 placeholder-gray-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
              />
              {searchText && (
                <button
                  onClick={() => setSearchText('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="px-2 pb-2 overflow-x-auto scrollbar-hide">
            <div className="flex gap-1 min-w-max">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat.id
                    ? 'bg-white text-purple-600 shadow-lg scale-105'
                    : 'bg-white/30 text-white hover:bg-white/50'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          <div className="max-w-4xl mx-auto">
            {filteredGames.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-white/80 text-lg">Oyun bulunamadı</p>
                <button
                  onClick={() => { setSearchText(''); setSelectedCategory('all'); }}
                  className="mt-4 bg-white/30 hover:bg-white/50 text-white px-4 py-2 rounded-full text-sm"
                >
                  Filtreleri Temizle
                </button>
              </div>
            ) : (
              <>
                <p className="text-white/70 text-xs mb-2 text-center">
                  {filteredGames.length} oyun
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {filteredGames.map((game) => (
                    <MenuButton
                      key={game.id}
                      icon={game.icon}
                      title={game.title}
                      subtitle={game.subtitle}
                      onClick={() => onSelectGame(game.id)}
                      color={game.color}
                      theme={theme}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default MiniGamesMenuScreen;
