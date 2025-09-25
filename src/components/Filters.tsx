import React from 'react';
import { SlidersHorizontal, Swords, Plane } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Text } from './Text';

interface FiltersProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedClasses: string[];
  setSelectedClasses: (classes: string[]) => void;
  availableClasses: string[];
  selectedBrand: string[];
  setSelectedBrand: (brands: string[]) => void;
  availableBrands: string[];
  maxPrice: number;
  showArmedOnly: boolean;
  setShowArmedOnly: (show: boolean) => void;
  showFlyingOnly: boolean;
  setShowFlyingOnly: (show: boolean) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  priceRange,
  setPriceRange,
  selectedClasses,
  setSelectedClasses,
  availableClasses,
  selectedBrand,
  setSelectedBrand,
  availableBrands,
  maxPrice,
  showArmedOnly,
  setShowArmedOnly,
  showFlyingOnly,
  setShowFlyingOnly,
}) => {
  const { t } = useTranslation();
  const handleClassToggle = (classe: string) => {
    if (selectedClasses.includes(classe)) {
      setSelectedClasses(selectedClasses.filter(c => c !== classe));
    } else {
      setSelectedClasses([...selectedClasses, classe]);
    }
  };

  const formatPrice = (price: number) => {
    const formatted = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formatted.replace(/^0+/, '') || '0';
  };

  return (
    <div className="sticky top-20 z-40 bg-gray-900 p-4 rounded-lg shadow-lg max-w-xs w-full max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="text-red-500" />
        <Text variant="h3">{t('Filter.filter')}</Text>
      </div>

      <div className="space-y-4">
        {/* Filtre véhicules armés et volants (Premier élément) */}
        <div>
          <Text variant="h4" className="mb-2">{t('Filter.vehicleOptions')}</Text>
          <div className="space-y-2">
            <button
              onClick={() => setShowArmedOnly(!showArmedOnly)}
              className={`w-full px-3 py-2 rounded text-sm flex items-center justify-center gap-2 ${
                showArmedOnly
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <Swords size={16} />
              {t('Filter.weaponizedVehicles')}
            </button>
            
            <button
              onClick={() => setShowFlyingOnly(!showFlyingOnly)}
              className={`w-full px-3 py-2 rounded text-sm flex items-center justify-center gap-2 ${
                showFlyingOnly
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <Plane size={16} />
              {t('Filter.flyingVehicles')}
            </button>
          </div>
        </div>

        {/* Type de véhicule (Deuxième élément) */}
        <div>
          <Text variant="h4" className="mb-2">{t('Filter.vehicleType')}</Text>
          <div className="grid grid-cols-2 gap-2">
            {availableClasses.map((classe) => (
              <button
                key={classe}
                onClick={() => handleClassToggle(classe)}
                className={`px-3 py-2 rounded text-sm ${selectedClasses.includes(classe)
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
              >
                {t(`vehicleClasses.${classe}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Fourchette de prix (Troisième élément) */}
        <div>
          <Text variant="h4" className="mb-2">{t('Filter.priceRange')}</Text>
          
          {/* Saisie manuelle */}
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              value={priceRange[0] === 0 ? '' : priceRange[0].toString().replace(/^0+/, '')}
              onChange={(e) => {
                const newMin = parseInt(e.target.value) || 0;
                setPriceRange([newMin, priceRange[1]]);
              }}
              className="w-20 px-2 py-1 text-xs bg-gray-700 text-white rounded border border-gray-600"
              placeholder="Min"
            />
            <input
              type="number"
              value={priceRange[1] === 0 ? '' : priceRange[1].toString().replace(/^0+/, '')}
              onChange={(e) => {
                const newMax = parseInt(e.target.value) || 0;
                setPriceRange([priceRange[0], newMax]);
              }}
              className="w-24 px-2 py-1 text-xs bg-gray-700 text-white rounded border border-gray-600"
              placeholder="Max"
            />
          </div>
          
          {/* Sliders */}
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange[0]}
              onChange={(e) => {
                const newMin = parseInt(e.target.value);
                setPriceRange([Math.min(newMin, priceRange[1]), priceRange[1]]);
              }}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <Text variant="c2" className="text-green-400 font-mono whitespace-nowrap">
              {formatPrice(priceRange[0])}¥
            </Text>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) => {
                const newMax = parseInt(e.target.value);
                setPriceRange([priceRange[0], Math.max(newMax, priceRange[0])]);
              }}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <Text variant="c2" className="text-green-400 font-mono whitespace-nowrap">
              {formatPrice(priceRange[1])}¥
            </Text>
          </div>
        </div>

        {/* Filtrer par marque (Dernier élément) */}
        <div>
          <Text variant="c1" className="text-gray-400 mb-2">{t('Filter.filterByBrand')}</Text>
          <div className="flex flex-wrap gap-1">
            {availableBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  /*@ts-ignore*/
                  setSelectedBrand((prevSelected: string[]) => {
                    const updatedSelection = prevSelected.includes(brand)
                      ? prevSelected.filter((b) => b !== brand) // Retire si déjà sélectionné
                      : [...prevSelected, brand]; // Ajoute sinon
                
                    return updatedSelection;
                  });
                }}
                className={`px-2 py-1 rounded-md border text-xs ${
                  selectedBrand.includes(brand)
                    ? "bg-red-500 text-white border-red-500/20"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 border-gray-600"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};