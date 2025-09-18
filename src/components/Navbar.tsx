import React from 'react';
import { Link } from 'react-router-dom';
import { Car, ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

export const Navbar: React.FC = () => {
  const { cart } = useCart();
  const { t } = useTranslation();
  
  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-red-500" />
            <span className="text-white text-xl font-bold">AutoFixer</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Link 
              to="/garage" 
              className="flex items-center space-x-2 text-white hover:text-red-500 transition-colors relative"
            >
              <ShoppingCart className="h-6 w-6" />
              <span>{t('navigation.garage')}</span>
              {cart.length > 0 && (
                <div className="absolute -top-1 -right-4 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};