import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cars } from '../data/cars';
import { useCart } from '../hooks/useCart';
import { 
  GaugeCircle, Battery, Shield, Zap, 
  Crosshair, Plus, Users,
  ChevronLeft, ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { ImageModal } from '../components/ImageModal';

const formatPrice = (price: string) => {
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const isExclusiveColor = (selectedColor: string, car: any) => {
  if (!car.exclusiveColors) return false;
  
  if (Array.isArray(car.exclusiveColors)) {
    return car.exclusiveColors.some(color => color.hex === selectedColor);
  }
  
  return car.exclusiveColors.hex === selectedColor;
};

export const CarPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('#0A0A0A'); // Nuit d'Obsidienne
  const [accentColor, setAccentColor] = useState<string>('#ef4444'); // Default to red-500
  
  const { carName } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const car = cars.find(c => c.nom === carName);
  
  const allImages = car ? [car.image, ...(car.additionalImages || [])] : [];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Function to handle color selection
  const handleColorSelect = (hex: string) => {
    setSelectedColor(hex);
    setAccentColor(hex);
  };

  if (!car) {
    return <div>Véhicule non trouvé</div>;
  }

  return (
    <div className="min-h-screen bg-gray-800 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        <button
          onClick={() => navigate('/')}
          className="mb-4 flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
        >
          <ArrowLeft size={24} />
          <span>Retour</span>
        </button>

        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="relative">
            <img 
              src={allImages[currentImageIndex]} 
              alt={car.nom}
              className="w-full h-48 sm:h-72 md:h-96 object-cover cursor-zoom-in"
              onClick={() => setIsModalOpen(true)}
            />
            {allImages.length > 1 && (
              <>
                <button 
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/75 transition-colors"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/75 transition-colors"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          {isModalOpen && (
            <ImageModal 
              imageUrl={allImages[currentImageIndex]}
              onClose={() => setIsModalOpen(false)}
              onNext={nextImage}
              onPrevious={previousImage}
              hasMultipleImages={allImages.length > 1}
            />
          )}
          
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{car.nom}</h1>
                <p className="text-lg sm:text-xl" style={{ color: accentColor }}>{car.fabricant}</p>
                <p className="text-gray-400">Classe: {car.classe}</p>
              </div>
              <div className="w-full sm:w-auto text-right">
                <p className="text-2xl sm:text-3xl font-mono text-green-400">
                  {selectedColor && isExclusiveColor(selectedColor, car) 
                    ? `${formatPrice((parseInt(car.prix) + 2500).toString())} ¥`
                    : `${formatPrice(car.prix)} ¥`
                  }
                </p>
                <button
                  onClick={() => {
                    addToCart({
                      ...car,
                      selectedColor: selectedColor,
                      totalPrice: selectedColor && isExclusiveColor(selectedColor, car) 
                        ? (parseInt(car.prix) + 2500).toString()
                        : car.prix
                    });
                    navigate('/garage');
                  }}
                  className="w-full sm:w-auto mt-4 flex items-center justify-center gap-2 text-white px-6 py-2 rounded transition-colors hover:opacity-80"
                  style={{ backgroundColor: accentColor }}
                >
                  <Plus size={20} />
                  Ajouter au garage
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 mb-8">
              <div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
                <GaugeCircle size={24} style={{ color: accentColor }} className="shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Vitesse max</p>
                  <p className="text-white">{car.caractéristiques.vitesse_max}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
                <Users size={24} style={{ color: accentColor }} className="shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Nombre de places</p>
                  <p className="text-white">{car.caractéristiques.nombre_de_places}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
                <Zap size={24} style={{ color: accentColor }} className="shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Puissance</p>
                  <p className="text-white">{car.caractéristiques.puissance}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
                <Crosshair size={24} style={{ color: accentColor }} className="shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Armé</p>
                  <p className="text-white">{car.caractéristiques.armé}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
                <Shield size={24} style={{ color: accentColor }} className="shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Réduction des dégâts</p>
                  <p className="text-white">{car.caractéristiques.réduction_des_dégâts}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
                <Battery size={24} style={{ color: accentColor }} className="shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">PV</p>
                  <p className="text-white">{car.caractéristiques.pv}</p>
                </div>
              </div>
            </div>

            {car.exclusiveColors && (
              <div className="mb-6">
                <h3 className="text-white text-lg mb-4 text-center">
                  Couleur{Array.isArray(car.exclusiveColors) && car.exclusiveColors.length > 1 ? 's' : ''} exclusive{Array.isArray(car.exclusiveColors) && car.exclusiveColors.length > 1 ? 's' : ''} {car.fabricant}
                  <span className="block text-sm text-gray-400 mt-1">2,500 ¥ la couleur</span>
                </h3>
                <div className="flex flex-wrap gap-x-3 gap-y-8 justify-center">
                  {Array.isArray(car.exclusiveColors) ? (
                    car.exclusiveColors.map((color) => (
                      <button
                        key={color.hex}
                        onClick={() => handleColorSelect(color.hex)}
                        className="group relative"
                      >
                        <div 
                          className={`w-11 h-11 rounded-full border-2 transition-all duration-200 ${
                            selectedColor === color.hex 
                              ? 'scale-110' 
                              : 'hover:opacity-90'
                          }`}
                          style={{ 
                            backgroundColor: color.hex,
                            borderColor: selectedColor === color.hex ? color.hex : 'transparent'
                          }}
                        />
                        <div className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 mt-2 bg-gray-900 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-center min-w-[120px] z-10">
                          {color.name}
                        </div>
                      </button>
                    ))
                  ) : (
                    <button
                      onClick={() => handleColorSelect(car.exclusiveColors.hex)}
                      className="group relative"
                    >
                      <div 
                        className={`w-11 h-11 rounded-full border-2 transition-all duration-200 ${
                          selectedColor === car.exclusiveColors.hex 
                            ? 'scale-110' 
                            : 'hover:opacity-90'
                        }`}
                        style={{ 
                          backgroundColor: car.exclusiveColors.hex,
                          borderColor: selectedColor === car.exclusiveColors.hex ? car.exclusiveColors.hex : 'transparent'
                        }}
                      />
                      <div className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 mt-2 bg-gray-900 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-center min-w-[120px] z-10">
                        {car.exclusiveColors.name}
                      </div>
                    </button>
                  )}
                </div>
              </div>
            )}

            {car.colors && car.colors.length > 0 && (
              <div className="mb-8">
                <h3 className="text-white text-lg mb-4 text-center">Couleurs AutoFixer</h3>
                <div className="flex flex-wrap gap-x-3 gap-y-8 justify-center">
                  {car.colors.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => {
                        setSelectedColor(color.hex);
                        setAccentColor('#ef4444'); // Reset to red-500
                      }}
                      className="group relative"
                    >
                      <div 
                        className={`w-11 h-11 rounded-full border-2 transition-all duration-200 ${
                          selectedColor === color.hex 
                            ? 'scale-110' 
                            : 'hover:opacity-90'
                        }`}
                        style={{ 
                          backgroundColor: color.hex,
                          borderColor: selectedColor === color.hex ? '#ef4444' : 'transparent'
                        }}
                      />
                      <div className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 mt-2 bg-gray-900 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-center min-w-[120px] z-10">
                        {color.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};