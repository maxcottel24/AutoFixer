import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cars } from '../data/cars';
import { useCart } from '../hooks/useCart';
import { 
  GaugeCircle, Battery, Shield, Zap, 
  Timer, Cog, Plus 
} from 'lucide-react';

const formatPrice = (price: string) => {
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const CarPage: React.FC = () => {
  const { carName } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const car = cars.find(c => c.nom === carName);
  
  if (!car) {
    return <div>Véhicule non trouvé</div>;
  }

  return (
    <div className="min-h-screen bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <img 
            src={car.image} 
            alt={car.nom}
            className="w-full h-96 object-cover"
          />
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{car.nom}</h1>
                <p className="text-red-500 text-xl">{car.fabricant}</p>
                <p className="text-gray-400">Classe: {car.classe}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-mono text-green-400">{formatPrice(car.prix)} ¥</p>
                <button
                  onClick={() => {
                    addToCart(car);
                    navigate('/garage');
                  }}
                  className="mt-4 flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  <Plus size={20} />
                  Ajouter au garage
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-center gap-3">
                <GaugeCircle size={24} className="text-red-500" />
                <div>
                  <p className="text-gray-400">Vitesse max</p>
                  <p className="text-white">{car.caractéristiques.vitesse_max}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Timer size={24} className="text-red-500" />
                <div>
                  <p className="text-gray-400">0-100 km/h</p>
                  <p className="text-white">{car.caractéristiques.accélération_0_100_kmh}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Zap size={24} className="text-red-500" />
                <div>
                  <p className="text-gray-400">Puissance</p>
                  <p className="text-white">{car.caractéristiques.puissance}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Cog size={24} className="text-red-500" />
                <div>
                  <p className="text-gray-400">Transmission</p>
                  <p className="text-white">{car.caractéristiques.transmission}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Shield size={24} className="text-red-500" />
                <div>
                  <p className="text-gray-400">Réduction des dégâts</p>
                  <p className="text-white">{car.caractéristiques.réduction_des_dégâts}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Battery size={24} className="text-red-500" />
                <div>
                  <p className="text-gray-400">PV</p>
                  <p className="text-white">{car.caractéristiques.pv}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};