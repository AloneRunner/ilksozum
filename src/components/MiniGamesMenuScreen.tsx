import React, { useState, useMemo } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import MenuButton from './ui/MenuButton.tsx';
import GameIcon from './icons/GameIcon.tsx';
import { useAppContext } from '../contexts/AppContext.ts';

interface MiniGamesMenuScreenProps {
  onBack: () => void;
  onSelectGame: (gameId: string) => void;
}

// Beceriye göre gruplar (Kaan onayı, 2026-10-04): sekme adı ne öğrettiğini söylesin
const CATEGORIES = [
  { id: 'all', label: '🎮 Tümü', emoji: '🎮' },
  { id: 'sayma', label: '🔢 Sayma', emoji: '🔢' },
  { id: 'dikkat', label: '👀 Dikkat ve Hafıza', emoji: '👀' },
  { id: 'el', label: '✋ El Becerisi', emoji: '✋' },
  { id: 'eslestir', label: '🎨 Eşleştir ve Grupla', emoji: '🎨' },
  { id: 'okuma', label: '🔤 Okuma Öncesi', emoji: '🔤' },
  { id: 'gunluk', label: '🏠 Günlük Yaşam', emoji: '🏠' },
  { id: 'rahat', label: '🎵 Rahatlama', emoji: '🎵' },
];

const MiniGamesMenuScreen: React.FC<MiniGamesMenuScreenProps> = ({ onBack, onSelectGame }) => {
  const { settings } = useAppContext();
  const theme = settings.theme;
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchText, setSearchText] = useState('');

  const games = [
    // === SAYMA ===
    { id: 'musicTouch', category: 'sayma', icon: GameIcon, title: '🎹 Müzik Dokun', subtitle: 'Piyano çal, kaç kere bas!', color: 'indigo' as const },
    { id: 'counting', category: 'sayma', icon: GameIcon, title: '🔢 Sayı Sayma', subtitle: 'Kaç tane var?', color: 'teal' as const },
    { id: 'plantGrowing', category: 'sayma', icon: GameIcon, title: '🌱 Bitki Büyüt', subtitle: 'Üç kere su, üç kere güneş!', color: 'lime' as const },
    { id: 'connectDots', category: 'sayma', icon: GameIcon, title: '✏️ Noktaları Birleştir', subtitle: 'Sayıları takip et!', color: 'blue' as const },
    { id: 'numberSequence', category: 'sayma', icon: GameIcon, title: '🪜 Sayı Sırala', subtitle: '1, 2, 3... sırala!', color: 'indigo' as const },

    // === DİKKAT VE HAFIZA ===
    { id: 'colorSequence', category: 'dikkat', icon: GameIcon, title: '🔴🔵 Renk Sırası', subtitle: 'Yanan renklere sırayla bas!', color: 'sky' as const },
    { id: 'memoryMatch', category: 'dikkat', icon: GameIcon, title: '🃏 Hafıza Çiftleri', subtitle: 'Eşleşen kartları bul!', color: 'purple' as const },
    { id: 'shadowMatch', category: 'dikkat', icon: GameIcon, title: '🔦 Gölge Eşleştirme', subtitle: 'Gölge kime ait?', color: 'sky' as const },

    // === EL BECERİSİ ===
    { id: 'maze', category: 'el', icon: GameIcon, title: '🐭 Labirent', subtitle: 'Fareyi peynire götür!', color: 'orange' as const },
    { id: 'trainTrack', category: 'el', icon: GameIcon, title: '🚂 Tren Yolu', subtitle: 'Yol çiz!', color: 'emerald' as const },
    { id: 'puzzle', category: 'el', icon: GameIcon, title: '🧩 Yapboz', subtitle: 'Parçaları birleştir!', color: 'purple' as const },
    { id: 'sheepShearing', category: 'el', icon: GameIcon, title: '🐑 Koyun Kırkma', subtitle: 'Yününü kırk!', color: 'lime' as const },

    // === EŞLEŞTİR VE GRUPLA ===
    { id: 'busJam', category: 'eslestir', icon: GameIcon, title: '🚌 Otobüs Durağı', subtitle: 'Yolcuları bindir!', color: 'sky' as const },
    { id: 'sizeOrdering', category: 'eslestir', icon: GameIcon, title: '📏 Boyut Sıralama', subtitle: 'Küçükten büyüğe!', color: 'lime' as const },
    { id: 'shapeMatching', category: 'eslestir', icon: GameIcon, title: '🔷 Şekil Eşleştirme', subtitle: 'Şekilleri yerine koy!', color: 'orange' as const },
    { id: 'whereBelongs', category: 'eslestir', icon: GameIcon, title: '🏠 Nereye Ait?', subtitle: 'Doğru odaya koy!', color: 'amber' as const },

    // === OKUMA ÖNCESİ ===
    { id: 'letterBubbles', category: 'okuma', icon: GameIcon, title: '🔤 Harf Baloncukları', subtitle: 'Söylenen harfi bul!', color: 'indigo' as const },
    { id: 'syllableTrain', category: 'okuma', icon: GameIcon, title: '🚃 Hece Treni', subtitle: 'Heceleri birleştir!', color: 'purple' as const },
    { id: 'wordBox', category: 'okuma', icon: GameIcon, title: '📦 Kelime Kutusu', subtitle: 'Resmi kelimeyle eşle!', color: 'indigo' as const },

    // === GÜNLÜK YAŞAM ===
    { id: 'dailyRoutine', category: 'gunluk', icon: GameIcon, title: '📋 Sıralı Ol!', subtitle: 'Günlük rutini sırala!', color: 'fuchsia' as const },
    { id: 'roomCleaning', category: 'gunluk', icon: GameIcon, title: '🧹 Oda Temizliği', subtitle: 'Odayı topla!', color: 'amber' as const },

    // === RAHATLAMA ===
    { id: 'bubblePop', category: 'rahat', icon: GameIcon, title: '🫧 Baloncuk Patlat', subtitle: 'Baloncuklara dokun!', color: 'cyan' as const },
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
