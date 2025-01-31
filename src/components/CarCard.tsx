import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';
import { GaugeCircle, Battery, Shield, Zap } from 'lucide-react';

interface CarCardProps {
  car: Car;
}

const formatPrice = (price: string) => {
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="h-full min-h-[450px] flex flex-col bg-gray-900 rounded-lg overflow-hidden border border-red-500/20 hover:border-red-500/50 transition-all">
      <img 
        src={car.image} 
        alt={car.nom}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex-col flex flex-grow">
        <div className="flex justify-between items-start min-h-[4.9rem]">
          <div>
            <h3 className="text-xl font-bold text-white">{car.nom}</h3>
            <p className="text-red-500">{car.fabricant}</p>
          </div>
          <span className="text-green-400 font-mono whitespace-nowrap">{formatPrice(car.prix)} ¥</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4 text-sm whitespace-nowrap min-h-[4rem]">
          <div className="flex items-center gap-2 text-gray-400">
            <GaugeCircle size={16} className="text-red-500" />
            <span>Vitesse: {car.caractéristiques.vitesse_max}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Zap size={16} className="text-red-500" />
            <span>Puissance: {car.caractéristiques.puissance}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Shield size={16} className="text-red-500" />
            <span>Armure: {car.caractéristiques.réduction_des_dégâts}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Battery size={16} className="text-red-500" />
            <span>PV: {car.caractéristiques.pv}</span>
          </div>
        </div>
        
        <div className="flex-grow"></div>

        <Link 
          to={`/car/${car.nom}`}
          className="mt-4 block w-full text-center bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-color"
        >
          Voir les détails
        </Link>
      </div>
    </div>
  );
};