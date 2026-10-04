import React from 'react';
import { nesneUrl } from '../services/nesneGorsel.ts';
import { CommunicationCategory, CommunicationSubCategory } from '../types.ts';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { imageData } from '../services/database/imageData.ts';
import { t, getCurrentLanguage } from '../i18n/index.ts';

interface CommunicationSubCategoryScreenProps {
  category: CommunicationCategory;
  onSelectSubCategory: (subCategory: CommunicationSubCategory) => void;
  onBack: () => void;
}

const SubCategoryButton: React.FC<{
  subCategory: CommunicationSubCategory;
  onClick: () => void;
  color: string;
}> = ({ subCategory, onClick, color }) => {
  const image = imageData.find(img => img.id === subCategory.imageId);
  
  const colorClasses = {
    blue: `from-blue-400 to-sky-500 ring-blue-300`,
  };

  const bgClass = colorClasses[color as keyof typeof colorClasses] || 'from-slate-400 to-slate-500 ring-slate-300';
  
  return (
    <button
      onClick={onClick}
      className={`w-full h-full aspect-[4/3] relative text-white rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-offset-2 overflow-hidden group bg-gradient-to-br ${bgClass}`}
    >
      {image && <img src={nesneUrl(image.imageUrl)} alt={subCategory.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 opacity-50 group-hover:opacity-70" />}
      <div className="absolute inset-0 bg-black/30"></div>
      <h2 className="relative z-10 text-lg font-bold text-center p-2">{(() => { const lang = getCurrentLanguage(); return lang === 'tr' ? subCategory.title : t(`communication.subcategories.${(subCategory as any).id}`, subCategory.title); })()}</h2>
    </button>
  );
};

const CommunicationSubCategoryScreen: React.FC<CommunicationSubCategoryScreenProps> = ({ category, onSelectSubCategory, onBack }) => {
  const lang = getCurrentLanguage();
  const isTr = lang === 'tr';
  const displayedCategoryTitle = isTr ? category.title : t(`communication.categories.${(category as any).id}`, category.title);
  return (
    <div className="flex flex-col items-center justify-start h-full max-w-4xl mx-auto p-4 animate-fade-in">
      <div className="w-full flex items-center mb-5 landscape:mb-3 relative">
        <button onClick={onBack} className="absolute left-0 p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors" aria-label={t('app.back', 'Go back')}>
          <ArrowLeftIcon className="w-7 h-7 text-amber-700" />
        </button>
        <h1 className="flex-1 text-center text-xl sm:text-2xl landscape:text-lg font-black text-amber-800">
          {displayedCategoryTitle}
        </h1>
      </div>

      <div className="w-full flex-grow overflow-y-auto pr-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {category.subCategories?.map((subCat) => (
            <SubCategoryButton
              key={subCat.id}
              subCategory={subCat}
              onClick={() => onSelectSubCategory(subCat)}
              color={category.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(CommunicationSubCategoryScreen);