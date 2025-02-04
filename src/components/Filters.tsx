import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

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
}) => {
  const handleClassToggle = (classe: string) => {
    if (selectedClasses.includes(classe)) {
      setSelectedClasses(selectedClasses.filter(c => c !== classe));
    } else {
      setSelectedClasses([...selectedClasses, classe]);
    }
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-red-500/20">
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="text-red-500" />
        <h2 className="text-xl font-bold text-white">Filtres</h2>
      </div>

      <div className="space-y-6">
        {/* Type de véhicule (Premier élément) */}
        <div>
          <h3 className="text-white mb-3">Type de véhicule</h3>
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
                {classe}
              </button>
            ))}
          </div>
        </div>

        {/* Fourchette de prix (Deuxième élément) */}
        <div>
          <h3 className="text-white mb-3">Fourchette de prix (¥)</h3>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <span className="text-green-400 font-mono whitespace-nowrap">
              {formatPrice(priceRange[0])}¥
            </span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <span className="text-green-400 font-mono whitespace-nowrap">
              {formatPrice(priceRange[1])}¥
            </span>
          </div>
        </div>

        {/* Filtrer par marque (Dernier élément) */}
        <div>
          <h3 className="text-gray-400 mb-2">Filtrer par marque :</h3>
          <div className="flex flex-wrap gap-2">
            {availableBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => {
                  setSelectedBrand((prevSelected: string[]) => {
                    const updatedSelection = prevSelected.includes(brand)
                      ? prevSelected.filter((b) => b !== brand) // Retire si déjà sélectionné
                      : [...prevSelected, brand]; // Ajoute sinon
                
                    return updatedSelection;
                  });
                }}
                className={`px-3 py-1 rounded-md border ${
                  selectedBrand.includes(brand)
                    ? "bg-green-500 text-white border-green-600"
                    : "bg-gray-800 text-gray-400 border-gray-600"
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