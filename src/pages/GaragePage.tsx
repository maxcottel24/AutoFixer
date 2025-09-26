import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, CreditCard } from 'lucide-react';
import { CarCartItem, ColorCartItem } from '../types';
import { PaymentModal } from '../components/PaymentModal';
import { useTranslation } from 'react-i18next';
import { Text } from '../components/Text';

const formatPrice = (price: string) => {
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const isColorItem = (item: CarCartItem | ColorCartItem): item is ColorCartItem => {
  return item.type === 'color';
};

export const GaragePage: React.FC = () => {
  const { cart, removePackage, clearCart } = useCart();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { t } = useTranslation();

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
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
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
<Text variant="p1">Retour au catalogue</Text>
        </Link>

        <Text variant="h2" className="mb-8">{t('garage.title')}</Text>

        {packages.length === 0 ? (
          <div className="text-center py-12">
            <Text variant="p1" className="text-gray-400">{t('garage.empty')}</Text>
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
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                      <div>
                        <Text variant="h3">{car.nom}</Text>
                        <Text variant="p1" className="text-red-500">{car.fabricant}</Text>
                        {color && (
                          <Text variant="p2" className="text-gray-400">Couleur: {color.nom}</Text>
                        )}
                      </div>
                      <div className="flex justify-between items-center sm:flex-col sm:items-end sm:gap-2">
                        <Text variant="h4" className="font-mono text-green-400">
                          {formatPrice((parseInt(car.prix) + (color ? parseInt(color.prix) : 0)).toString())} ¥
                        </Text>
                        <button
                          onClick={() => removePackage(car.nom)}
                          className="text-red-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 text-gray-400">
                      <Text variant="p2" className="text-gray-400">Classe: {car.car.classe}</Text>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 bg-gray-900 rounded-lg p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <Text variant="h4">Total</Text>
                  <Text variant="h3" className="font-mono text-green-400">
                    {formatPrice(total.toString())} ¥
                  </Text>
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

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};