import React from 'react';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, CreditCard } from 'lucide-react';
import { CarCartItem, ColorCartItem } from '../types';

const formatPrice = (price: string) => {
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const isColorItem = (item: CarCartItem | ColorCartItem): item is ColorCartItem => {
  return item.type === 'color';
};

export const GaragePage: React.FC = () => {
  const { cart, removePackage, clearCart } = useCart();

  // Trouver toutes les voitures dans le panier
  const carItems = cart.filter(item => !isColorItem(item)) as CarCartItem[];
  const colorItems = cart.filter(isColorItem);
  
  // Pour chaque voiture, trouver sa couleur associée
  const packages = carItems.map((carItem, index) => {
    // On cherche la couleur correspondant à cette instance de voiture
    // en comptant combien de fois cette voiture apparaît avant l'index actuel
    const previousSameCarCount = carItems
      .slice(0, index)
      .filter(c => c.nom === carItem.nom)
      .length;

    // On trouve toutes les couleurs pour cette voiture
    const carColors = colorItems.filter(c => c.forCar === carItem.nom);
    // Et on prend celle qui correspond à cette instance
    const colorItem = carColors[previousSameCarCount];

    return {
      id: `${carItem.nom}-${index}`,
      car: carItem,
      color: colorItem
    };
  });

  const handlePayment = () => {
    alert('Paiement effectué avec succès !');
    clearCart();
  };

  const total = cart.reduce((total, item) => total + parseInt(item.prix), 0);

  return (
    <div className="min-h-screen bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Link
          to="/"
          className="mb-6 flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
        >
          <ArrowLeft size={24} />
          <span>Retour au catalogue</span>
        </Link>

        <h1 className="text-3xl font-bold text-white mb-8">Mon garage</h1>

        {packages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Votre garage est vide</p>
            <Link
              to="/"
              className="inline-block mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Parcourir le catalogue
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {packages.map(({ id, car, color }) => (
              <div key={id} className="bg-gray-900 rounded-lg p-4">
                <div className="flex gap-4">
                  <img
                    src={car.car.image}
                    alt={car.nom}
                    className="w-32 h-24 object-cover rounded"
                  />
                  {color && (
                    <div 
                      className="w-32 h-24 rounded"
                      style={{ backgroundColor: color.hex }}
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold text-white">{car.nom}</h2>
                        <p className="text-red-500">{car.fabricant}</p>
                        {color && (
                          <p className="text-gray-400">Couleur: {color.nom}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-mono text-green-400">
                          {formatPrice((parseInt(car.prix) + (color ? parseInt(color.prix) : 0)).toString())} ¥
                        </p>
                        <button
                          onClick={() => removePackage(car.nom)}
                          className="mt-2 text-red-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 text-gray-400">
                      <p>Classe: {car.car.classe}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 bg-gray-900 rounded-lg p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <p className="text-xl text-white">Total</p>
                  <p className="text-2xl font-mono text-green-400">
                    {formatPrice(total.toString())} ¥
                  </p>
                </div>
                <button
                  onClick={handlePayment}
                  className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <CreditCard size={20} />
                  Payer maintenant
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};