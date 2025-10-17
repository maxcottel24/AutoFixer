import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cars } from '../data/cars';
import { useCart } from '../hooks/useCart';
import { Car, ColorInfo } from '../types';
import { 
  GaugeCircle, Battery, Shield, Plane, 
  Crosshair, Plus, Users,
  ChevronLeft, ChevronRight,
  ArrowLeft, Target, Swords,
  Flame, Ruler, Zap
} from 'lucide-react';
import { ImageModal } from '../components/ImageModal';
import { useTranslation } from 'react-i18next';
import { Text } from '../components/Text';

const formatPrice = (price: string) => {
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const isExclusiveColor = (selectedColor: string, car: Car) => {
  if (!car.exclusiveColors) return false;
  
  if (Array.isArray(car.exclusiveColors)) {
    return car.exclusiveColors.some((color: ColorInfo) => color.hex === selectedColor);
  }
  
  return car.exclusiveColors.hex === selectedColor;
};

// Fonction pour obtenir la clé de traduction d'une couleur
const getColorTranslationKey = (colorName: string): string => {
  const colorMap: { [key: string]: string } = {
    "Nuit d'Obsidienne": "obsidianNight",
    "Tempête de Titane": "titanStorm",
    "Perle Lustreuse": "lustrousPearl",
    "Ardeur Écarlate": "scarletArdour",
    "Furie de Pourpre": "crimsonFury",
    "Brûlure d'Ambre": "amberBurn",
    "Lueur de Braise": "emberGlow",
    "Soleil Glissant": "goldenGlint",
    "Splendeur d'Émeraude": "emeraldSplendor",
    "Reflet d'Aigue-Marine": "reflectionOfAquamarine",
    "Marée de Néon": "neonSea",
    "Brise d'Azur": "azureBreeze",
    "Vague de Saphir": "sapphireWave",
    "Foudre Marine": "lightningMarine",
    "Prune Impériale": "imperialPlum",
    "Brume d'Améthyste": "amethystMist",
    "Crépuscule Châtaigne": "twilightChestnut",
    "Éclosion de Rosée": "roseBloom",
    "Rayfield Gold Digger": "rayfieldGoldDigger",
    "Mizutani Shinkansen Surge": "mizutaniShinkansenSurge",
    "Thorton Trailblazer": "thortonTrailblazer",
    "Yaiba Cyber Wave": "yaibaCyberWave",
    "Quadra Retro Flash": "quadraRetroFlash",
    "Brennan Hyperion Mauve": "brennanHyperionMauve",
    "Villefort Sceptre d'Airain": "villefortSceptreD'Airain",
    "Herrera Real Burdeos": "herreraRealBurdeos",
    "Archer Flèche de Glace": "archerFlecheDeGlace",
    "Chevillon Dreadnought": "chevillonDreadnought",
    "Makigai Nano Wasabi": "makigaiNanoWasabi",
    "Arch Furie du Bitume": "archFurieDuBitume",
    "Dodge Dragstrip Inferno": "dodgeDragstripInferno",
    "Chevrolet Lac Elkhart": "chevroletLacElkhart",
    "Vipers": "vipers",
    "Corvettes": "corvettes",
    "Militech Man O'War": "militechManOWar",
    "Mahir Aston Green": "mahirAstonGreen",
    "Zetatech Gris de Neige": "zetatechGrisDeNeige",
    "Trauma Team Soins d'Urgence": "traumaTeamSoinsD'Urgence",
    "Chevrolet F1": "chevroletF1"
  };
  
  return colorMap[colorName] || colorName;
};

// Function to get the translation key for a car description
const getCarDescriptionKey = (carName: string): string => {
  const carMap: { [key: string]: string } = {
    'Aerondight S9 Guinevere': 'aerondights9guinevere',
    'Nazare': 'nazare',
    'Kusanagi CT-3X': 'kusanagict3x',
    'Apollo': 'apollo',
    'MI 45 Apache': 'mi45apache',
    'TT-MR7 Valkyrie': 'ttmr7valkyrie',
    'Veliora LX': 'velioralx',
    'Maimai P126': 'maimaip126',
    'Sport R-7 Sterling': 'sportr7sterling',
    'Caliburn': 'caliburn',
    'Shion Samum': 'shionsamum',
    'Turbo-R V-Tech': 'turborvttech',
    'Corvette X-1': 'corvettex1',
    'Type-66 \'Avenger\'': 'type66avenger',
    'Type-66 \'Javelina\'': 'type66javelina',
    'Sport R-7 Charon': 'sportr7charon',
    'Shion Coyote': 'coyote',
    'Viper 1996': 'viper1996',
    'Corvette C6 2005': 'corvettec62005',
    'Type-66 \'Jen Rowley\'': 'type66jenrowley',
    'Emperor 620 Ragnar': 'emperor620ragnar',
    'Galena Gecko': 'galenagecko',
    'Alvarado V4F 570 Delegate': 'alvaradov4f570delegate',
    'Galena Rattler': 'galenarattler',
    'Colby Little Mule': 'colbylittlemule',
    'Quartz Specter': 'quartzspecter',
    'Columbus V340-F Freight': 'columbusv340ffreight',
    'Thrax 388 Jefferson': 'thrax388jefferson',
    'Cortes V5000 Valor': 'cortesv5000valor',
    'Legatus 450 Aquila': 'legatus450aquila',
    'Deleon Vindicator': 'deleonvindicator',
    'Colby C125': 'colbyc125',
    'Colby CX410 Butte': 'colbycx410butte',
    'Quartz EC-L R275': 'quartzecrlr275',
    'Supron FS3': 'supronsfs3',
    'Hellhound': 'hellhound',
    'Outlaw GTS': 'outlawgts',
  };
  return carMap[carName] || carName.toLowerCase().replace(/\s+/g, '').replace(/['"]/g, '');
};

// Function to parse speed and return formatted value with translated unit
const formatSpeed = (speedString: string, t: (key: string) => string): string => {
  // Extract number from strings like "306 km/h"
  const match = speedString.match(/^(\d+(?:\.\d+)?)\s*(km\/h|mph)$/i);
  if (match) {
    const [, number] = match;
    return `${number} ${t('units.speed')}`;
  }
  // Fallback for any other format
  return speedString;
};

// Function to parse power and return formatted value with translated unit
const formatPower = (powerString: string, t: (key: string) => string): string => {
  // Extract number from strings like "950 CV"
  const match = powerString.match(/^(\d+(?:\.\d+)?)\s*(CV|HP)$/i);
  if (match) {
    const [, number] = match;
    return `${number} ${t('units.hp')}`;
  }
  // Fallback for any other format
  return powerString;
};

export const CarPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('#0A0A0A'); // Nuit d'Obsidienne
  const [accentColor, setAccentColor] = useState<string>('#ef4444'); // Default to red-500
  
  const { carName } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t } = useTranslation();
  
  const car = cars.find(c => c.nom === carName);
  
  const allImages = car ? [car.image, ...(car.additionalImages || [])] : [];
  
  const isFlyingVehicle = car ? (car.classe === "Hélicoptère" || car.classe === "Navi") : false;
  
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
          <span>{t('carPage.return')}</span>
        </button>

        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="relative">
            <img 
              src={allImages[currentImageIndex]} 
              alt={car.nom}
              className="w-full h-48 sm:h-72 md:h-96 object-cover cursor-zoom-in"
              onClick={() => setIsModalOpen(true)}
            />
            
            {/* Badges pour véhicules volants et armés */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              {/* Badge pour véhicules volants */}
              {isFlyingVehicle && (
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                  <Plane size={16} />
                  {t('carPage.flyingPatch')}
                </div>
              )}
              
              {/* Badge pour véhicules armés */}
              {car.caractéristiques.armé === true && (
                <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                  <Swords size={16} />
                  {t('carPage.armedPatch')}
                </div>
              )}
            </div>
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
                <Text variant="carPageName">{car.nom}</Text>
                <Text variant="carPageBrand" style={{ color: accentColor }}>{car.fabricant}</Text>
                <Text variant="carPageClass">{t('carPage.class')}: {t(`vehicleClasses.${car.classe}`)}</Text>
              </div>
              <div className="w-full sm:w-auto text-right">
                <Text variant="price">
                  {selectedColor && isExclusiveColor(selectedColor, car) 
                    ? `${formatPrice((parseInt(car.prix) + 2500).toString())} ¥`
                    : `${formatPrice(car.prix)} ¥`
                  }
                </Text>
                <button
                  onClick={() => {
                    // Ajouter la voiture
                    addToCart({
                      type: 'car',
                      nom: car.nom,
                      fabricant: car.fabricant,
                      prix: car.prix,
                      car: car
                    });

                    // Ajouter la couleur sélectionnée
                    const selectedColorInfo = car.colors.find(c => c.hex === selectedColor) ||
                      (Array.isArray(car.exclusiveColors) 
                        ? car.exclusiveColors.find(c => c.hex === selectedColor)
                        : car.exclusiveColors?.hex === selectedColor 
                          ? car.exclusiveColors 
                          : null);

                    if (selectedColorInfo) {
                      addToCart({
                        type: 'color',
                        nom: selectedColorInfo.name,
                        fabricant: isExclusiveColor(selectedColor, car) ? car.fabricant : "AutoFixer",
                        prix: isExclusiveColor(selectedColor, car) ? "2500" : "0",
                        hex: selectedColorInfo.hex,
                        forCar: car.nom
                      });
                    }

                    navigate('/garage');
                  }}
                  className="w-full sm:w-auto mt-4 flex items-center justify-center gap-2 text-white px-6 py-2 rounded transition-colors hover:opacity-80"
                  style={{ backgroundColor: accentColor }}
                >
                  <Plus size={20} />
                  {t('carPage.addToGarage')}
                </button>
              </div>
            </div>

            {/* Descriptions spéciales pour certains véhicules */}
            {car.nom && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <Text variant="carPageDescription">
                  {t(`carDescriptions.${getCarDescriptionKey(car.nom)}`)}
                </Text>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 mb-8">
              <div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
                <GaugeCircle size={24} style={{ color: accentColor }} className="shrink-0" />
                <div>
                  <Text variant="carPageTitleStats">{t('carPage.maxSpeed')}</Text>
                  <Text variant="carPageStats">{formatSpeed(car.caractéristiques.vitesse_max, t)}</Text>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
                <Users size={24} style={{ color: accentColor }} className="shrink-0" />
                <div>
                  <Text variant="carPageTitleStats">{t('carPage.numberOfPlaces')}</Text>
                  <Text variant="carPageStats">{car.caractéristiques.nombre_de_places}</Text>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
                <Zap size={24} style={{ color: accentColor }} className="shrink-0" />
                <div>
                  <Text variant="carPageTitleStats">{t('carPage.power')}</Text>
                  <Text variant="carPageStats">{formatPower(car.caractéristiques.puissance, t)}</Text>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
                <Crosshair size={24} style={{ color: accentColor }} className="shrink-0" />
                <div>
                  <Text variant="carPageTitleStats">{t('carPage.armed')}</Text>
                  <Text variant="carPageStats">{car.caractéristiques.armé ? t('carPage.yes') : t('carPage.no')}</Text>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
                <Shield size={24} style={{ color: accentColor }} className="shrink-0" />
                <div>
                  <Text variant="carPageTitleStats">{t('carPage.damageReduction')}</Text>
                  <Text variant="carPageStats">{car.caractéristiques.réduction_des_dégâts}</Text>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
                <Battery size={24} style={{ color: accentColor }} className="shrink-0" />
                <div>
                  <Text variant="carPageTitleStats">{t('carPage.hp')}</Text>
                  <Text variant="carPageStats">{car.caractéristiques.pv}</Text>
                </div>
              </div>
            </div>

            {/* Section des armes pour les véhicules armés */}
            {car.caractéristiques.armé === true && car.caractéristiques.armes && car.caractéristiques.armes.length > 0 && (
              <div className="mt-8 mb-8">
                <Text variant="weaponSystemTitle">
                  <Swords size={24} style={{ color: accentColor }} />
                  {t('carPage.weaponSystem')}
                </Text>
                
                <div className={`grid gap-6 ${
                  car.caractéristiques.armes.length === 1 
                    ? 'grid-cols-1' 
                    : 'grid-cols-1 md:grid-cols-2'
                }`}>
                  {car.caractéristiques.armes.map((arme, index) => (
                    <div key={index} className={`bg-gray-800/50 rounded-lg p-6 border border-gray-700 ${
                      car.caractéristiques.armes && car.caractéristiques.armes.length === 3 && index === 2 
                        ? 'md:col-span-2' 
                        : ''
                    }`}>
                      <div className="flex items-center gap-3 mb-4">
                        <Target size={24} style={{ color: accentColor }} className="shrink-0" />
                        <div>
                          <Text variant="weaponSystemSubtitle">{t(`weapons.${arme.nom}`)}</Text>
                          <Text variant="carPageTitleStats">{t(`weapons.${arme.type}`)}</Text>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Flame size={16} style={{ color: accentColor }} />
                          <div>
                            <Text variant="weaponSystemTitleStats">{t('carPage.damage')}</Text>
                            <Text variant="carPageStats">{arme.dégâts}</Text>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Ruler size={16} style={{ color: accentColor }} />
                          <div>
                            <Text variant="weaponSystemTitleStats">{t('carPage.range')}</Text>
                            <Text variant="carPageStats">{arme.portée}</Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {car.exclusiveColors && (
              <div className="mb-6">
                <Text variant="colorTitle">
                  Couleur{Array.isArray(car.exclusiveColors) && car.exclusiveColors.length > 1 ? 's' : ''} exclusive{Array.isArray(car.exclusiveColors) && car.exclusiveColors.length > 1 ? 's' : ''} {car.fabricant}
                  <Text variant="carPageTitleStats" className="block mt-1">{t('carPage.exclusiveColorPrice')}</Text>
                </Text>
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
                          {t(`colors.${getColorTranslationKey(color.name)}`)}
                        </div>
                      </button>
                    ))
                  ) : (
                    <button
                      onClick={() => handleColorSelect((car.exclusiveColors as ColorInfo).hex)}
                      className="group relative"
                    >
                      <div 
                        className={`w-11 h-11 rounded-full border-2 transition-all duration-200 ${
                          selectedColor === (car.exclusiveColors as ColorInfo).hex 
                            ? 'scale-110' 
                            : 'hover:opacity-90'
                        }`}
                        style={{ 
                          backgroundColor: (car.exclusiveColors as ColorInfo).hex,
                          borderColor: selectedColor === (car.exclusiveColors as ColorInfo).hex ? (car.exclusiveColors as ColorInfo).hex : 'transparent'
                        }}
                      />
                      <div className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 mt-2 bg-gray-900 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-center min-w-[120px] z-10">
                        {t(`colors.${getColorTranslationKey((car.exclusiveColors as ColorInfo).name)}`)}
                      </div>
                    </button>
                  )}
                </div>
              </div>
            )}

            {car.colors && car.colors.length > 0 && (
              <div className="mb-8">
                <Text variant="colorTitle">Couleurs AutoFixer</Text>
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
                        {t(`colors.${getColorTranslationKey(color.name)}`)}
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