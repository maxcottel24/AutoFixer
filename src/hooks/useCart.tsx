import React, { createContext, useContext, useState } from 'react';
import { Car, CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (car: Car) => void;
  removeFromCart: (car: Car) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (car: Car) => {
    setCart(prev => {
      const existing = prev.find(item => item.car.nom === car.nom);
      if (existing) {
        return prev.map(item =>
          item.car.nom === car.nom
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { car, quantity: 1 }];
    });
  };

  const removeFromCart = (car: Car) => {
    setCart(prev => prev.filter(item => item.car.nom !== car.nom));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};