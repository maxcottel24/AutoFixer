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
            
            {/* Badges pour véhicules volants et armés */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              {/* Badge pour véhicules volants */}
              {isFlyingVehicle && (
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                  <Plane size={16} />
                  VOLANT
                </div>
              )}
              
              {/* Badge pour véhicules armés */}
              {car.caractéristiques.armé === "Oui" && (
                <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                  <Swords size={16} />
                  ARMÉ
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
                  Ajouter au garage
                </button>
              </div>
            </div>

            {/* Descriptions spéciales pour certains véhicules */}
            {car.nom === "Aerondight S9 Guinevere" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  L'ultime incarnation du luxe et de la vitesse : 950 chevaux d'ingénierie parfaite, une silhouette sculptée pour 306 km/h, et une aura qui transforme chaque rue en podium.
                </p>
              </div>
            )}

            {car.nom === "Nazare" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Une moto qui crie "je vis vite" et "je meurs jeune" en même temps.
                </p>
              </div>
            )}

            {car.nom === "Kusanagi CT-3X" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Deux roues, zéro excuses. Vous allez perdre vos dents, mais avec style.
                </p>
              </div>
            )}

            {car.nom === "Apollo" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Une moto pour ceux qui veulent sentir chaque nid-de-poule comme une bénédiction divine.
                </p>
              </div>
            )}

            {car.nom === "MI 45 Apache" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Besoin de compenser ? Douze sièges, des missiles et un bruit qui rend sourd : la discrétion, c'est pour les pauvres.
                </p>
              </div>
            )}

            {car.nom === "TT-MR7 Valkyrie" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Quand vos clients saignent à mort, mieux vaut arriver stylé. Trauma Team l'a compris avant vous.
                </p>
              </div>
            )}

            {car.nom === "Veliora LX" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Vous aimez l'idée d'un penthouse volant ? Zetatech vous en vend un, avec ceintures en bonus.
                </p>
              </div>
            )}

            {car.nom === "Maimai P126" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Une boîte à chaussures motorisée. Mais une boîte à chaussures qui peut se garer partout.
                </p>
              </div>
            )}

            {car.nom === "Sport R-7 Sterling" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Une berline sportive pour familles riches qui n'aiment pas ralentir devant les écoles.
                </p>
              </div>
            )}

            {car.nom === "Caliburn" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Tellement basse qu'elle racle les dos-d'âne. Mais si vous avez les moyens d'en acheter une, vous ne conduisez pas en banlieue.
                </p>
              </div>
            )}

            {car.nom === "Shion Samum" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  La voiture parfaite pour ceux qui pensent que "voiture de sport" rime avec "voiture de guerre".
                </p>
              </div>
            )}

            {car.nom === "Turbo-R V-Tech" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Parce que parfois, hurler plus fort que vos voisins est la seule raison valable d'acheter une voiture.
                </p>
              </div>
            )}

            {car.nom === "Corvette X-1" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Un million de ¥ pour une fusée roulante, achetée uniquement pour que vos voisins sachent que vous avez trop d'argent.
                </p>
              </div>
            )}

            {car.nom === "Type-66 'Avenger'" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Le nom dit tout : ce n'est pas une voiture, c'est un règlement de comptes sur roues.
                </p>
              </div>
            )}

            {car.nom === "Type-66 'Javelina'" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Un muscle car qui crache des flammes… et pas qu'avec son moteur. Armé jusqu'aux dents, c'est le seul moyen légal de transformer la route en zone de guerre.
                </p>
              </div>
            )}

            {car.nom === "Sport R-7 Charon" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  La berline qui arrive aux enterrements avec des flammes holographiques sur le capot. Parce que la discrétion, c'est pour les morts.
                </p>
              </div>
            )}

            {car.nom === "Shion Coyote" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Pas besoin de missiles quand votre simple allure fait comprendre aux autres qu'ils doivent se pousser.
                </p>
              </div>
            )}

            {car.nom === "Viper 1996" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Un serpent vieux de cent ans qui mord toujours plus fort que la moitié des voitures neuves.
                </p>
              </div>
            )}

            {car.nom === "Corvette C6 2005" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Une ancienne gloire qui refuse de vieillir, coincée entre la vitrine d'un musée et le parking du supermarché.
                </p>
              </div>
            )}

            {car.nom === "Type-66 'Jen Rowley'" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Un gros ricain bodybuildé, qui consomme plus de carburant qu'un porte-avions et en est fier.
                </p>
              </div>
            )}

            {car.nom === "Emperor 620 Ragnar" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Le SUV idéal pour rappeler à vos voisins qu'ils sont pauvres. Même garé, il leur marche dessus.
                </p>
              </div>
            )}

            {car.nom === "Galena Gecko" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  La voiture d'occasion qui refuse de mourir. Ajoutez un missile dessus et voilà votre nouveau hobby.
                </p>
              </div>
            )}

            {car.nom === "Alvarado V4F 570 Delegate" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Une berline américaine pleine de chrome et de prétention, parfaite pour rouler lentement tout en bloquant deux files.
                </p>
              </div>
            )}

            {car.nom === "Galena Rattler" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Une épave roulante. Achetez-la pour prouver que vous détestez vos passagers.
                </p>
              </div>
            )}

            {car.nom === "Colby Little Mule" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Un pick-up qui transpire la sueur et la rouille, maintenant équipé d'une mitrailleuse pour compenser son absence de personnalité.
                </p>
              </div>
            )}

            {car.nom === "Quartz Specter" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Une compacte avec des flammes peintes dans l'ego : petite, nerveuse, et persuadée d'être une supercar.
                </p>
              </div>
            )}

            {car.nom === "Columbus V340-F Freight" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Un fourgon. Rien de sexy. Mais qui a besoin de sexy quand on peut transporter un cadavre ET son cercueil ?
                </p>
              </div>
            )}

            {car.nom === "Thrax 388 Jefferson" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Une berline corpo tellement blindée qu'elle pourrait survivre à votre mariage.
                </p>
              </div>
            )}

            {car.nom === "Cortes V5000 Valor" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Une voiture si prétentieuse qu'on dirait qu'elle a été dessinée par un architecte frustré. Même garée, elle veut faire un discours.
                </p>
              </div>
            )}

            {car.nom === "Legatus 450 Aquila" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Un utilitaire carré, parfait pour transporter vos courses… ou vos ennemis. À vous de choisir.
                </p>
              </div>
            )}

            {car.nom === "Deleon Vindicator" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Un nom qui promet la vengeance… et une carrosserie qui promet juste des factures de garagiste. L'illusion a un prix.
                </p>
              </div>
            )}

            {car.nom === "Colby C125" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Un bloc d'acier sans charme, né pour caler des bières dans le coffre et bloquer la circulation devant le stade.
                </p>
              </div>
            )}

            {car.nom === "Colby CX410 Butte" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Le SUV de banlieue par excellence. Si votre rêve, c'est d'aller chercher vos gosses avec un tank, c'est pour vous.
                </p>
              </div>
            )}

            {car.nom === "Quartz EC-L R275" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Une compacte mignonne… idéale pour les gens qui veulent mourir discrètement dans un accident.
                </p>
              </div>
            )}

            {car.nom === "Supron FS3" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Un van utilitaire aussi excitant qu'une photocopieuse… mais assez pratique pour entasser vos gosses et vos courses.
                </p>
              </div>
            )}

            {car.nom === "Hellhound" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Parce qu'il y a des problèmes que seule une mitrailleuse de toit et une suspension de tank peuvent régler.
                </p>
              </div>
            )}

            {car.nom === "Outlaw GTS" && (
              <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  Une hypercar qui fait du bruit pour compenser son complexe d'infériorité face aux vraies légendes. Mais au moins, elle est rapide.
                </p>
              </div>
            )}

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

            {/* Section des armes pour les véhicules armés */}
            {car.caractéristiques.armé === "Oui" && car.caractéristiques.armes && car.caractéristiques.armes.length > 0 && (
              <div className="mt-8 mb-8">
                <h3 className="text-white text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                  <Swords size={24} style={{ color: accentColor }} />
                  Système d'Armement
                </h3>
                
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
                          <h4 className="text-white font-semibold text-lg">{arme.nom}</h4>
                          <p className="text-gray-400 text-sm">{arme.type}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Flame size={16} style={{ color: accentColor }} />
                          <div>
                            <p className="text-gray-400 text-xs">Dégâts</p>
                            <p className="text-white font-medium">{arme.dégâts}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Ruler size={16} style={{ color: accentColor }} />
                          <div>
                            <p className="text-gray-400 text-xs">Portée</p>
                            <p className="text-white font-medium">{arme.portée}</p>
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
                        {(car.exclusiveColors as ColorInfo).name}
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