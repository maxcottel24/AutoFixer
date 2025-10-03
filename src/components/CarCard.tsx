import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';
import { GaugeCircle, Battery, Shield, Crosshair, Swords, Plane } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Text } from './Text';

interface CarCardProps {
  car: Car;
}

const formatPrice = (price: string) => {
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { t } = useTranslation();
  const isFlyingVehicle = car.classe === "Hélicoptère" || car.classe === "Navi";
  const isArmed = car.caractéristiques.armé === true;
  
  return (
    <div className="h-full min-h-[450px] flex flex-col bg-gray-900 rounded-lg overflow-hidden border border-red-500/20 hover:border-red-500/50 transition-all relative">
      {/* Badges pour véhicules volants et armés */}
      <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
        {/* Badge pour véhicules volants */}
        {isFlyingVehicle && (
          <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Plane size={12} />
            {t('CarGrid.flying')}
          </div>
        )}
        
        {/* Badge pour véhicules armés */}
        {isArmed && (
          <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Swords size={12} />
            {t('CarGrid.armed')}
          </div>
        )}
      </div>
      
      <img 
        src={car.image} 
        alt={car.nom}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex-col flex flex-grow">
        <div className="flex justify-between items-start min-h-[4.9rem]">
          <div>
            <Text variant="filterTitleAndCarGridModel">{car.nom}</Text>
            <Text variant="carCardBrand" className="text-red-500">{car.fabricant}</Text>
          </div>
          <Text variant="carCardPrice" className="text-green-400 font-mono whitespace-nowrap">{formatPrice(car.prix)} ¥</Text>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4 text-sm whitespace-nowrap min-h-[4rem]">
          <div className="flex items-center gap-2 text-gray-400">
            <GaugeCircle size={16} className="text-red-500" />
            <Text variant="carCardStat">{t('carCard.speed')}: {car.caractéristiques.vitesse_max}</Text>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Crosshair size={16} className="text-red-500" />
            <Text variant="carCardStat">{t('carCard.armed')}: {car.caractéristiques.armé}</Text>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Shield size={16} className="text-red-500" />
            <Text variant="carCardStat">{t('carCard.armor')}: {car.caractéristiques.réduction_des_dégâts}</Text>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Battery size={16} className="text-red-500" />
            <Text variant="carCardStat">{t('carCard.hp')}: {car.caractéristiques.pv}</Text>
          </div>
        </div>
        
        <div className="flex-grow"></div>

        <Link 
          to={`/car/${car.nom}`}
          className="mt-4 block w-full text-center bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-color"
        >
          {t('carCard.viewDetails')}
        </Link>
      </div>
    </div>
  );
};