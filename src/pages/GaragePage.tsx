import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { Trash2, Printer } from 'lucide-react';

const formatPrice = (price: string) => {
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const GaragePage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [showReceipt, setShowReceipt] = useState(false);
  
  const total = cart.reduce((sum, item) => {
    const price = parseInt(item.car.prix.replace(/,/g, ''));
    return sum + price * item.quantity;
  }, 0);

  const handlePurchase = () => {
    setShowReceipt(true);
  };

  return (
    <div className="min-h-screen bg-gray-800 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Mon Garage</h1>
        
        {cart.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Votre garage est vide</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div 
                  key={item.car.nom}
                  className="bg-gray-900 rounded-lg p-4 flex items-center gap-4"
                >
                  <img 
                    src={item.car.image} 
                    alt={item.car.nom}
                    className="w-24 h-24 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-white font-bold">{item.car.nom}</h3>
                    <p className="text-red-500">{item.car.fabricant}</p>
                    <p className="text-green-400 font-mono">{formatPrice(item.car.prix)} ¥</p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.car)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-gray-900 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white">Total:</span>
                <span className="text-2xl font-mono text-green-400">
                  {formatPrice(total.toString())} ¥
                </span>
              </div>

              <button
                onClick={handlePurchase}
                className="w-full bg-red-500 text-white py-3 rounded flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
              >
                <Printer size={20} />
                Acheter
              </button>
            </div>

            {showReceipt && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-lg max-w-md w-full">
                  <h2 className="text-2xl font-bold mb-4 text-center">Reçu d'achat</h2>
                  {cart.map((item) => (
                    <div key={item.car.nom} className="flex justify-between py-2 border-b">
                      <span>{item.car.nom}</span>
                      <span>{formatPrice(item.car.prix)} ¥</span>
                    </div>
                  ))}
                  <div className="flex justify-between mt-4 pt-4 border-t font-bold">
                    <span>Total</span>
                    <span>{formatPrice(total.toString())} ¥</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowReceipt(false);
                      clearCart();
                    }}
                    className="mt-6 w-full bg-red-500 text-white py-2 rounded"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};