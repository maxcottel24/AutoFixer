import React from 'react';
import { Link } from 'react-router-dom';
import { Car, ShoppingCart } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 border-b border-red-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-red-500" />
            <span className="text-white text-xl font-bold">AutoFixer</span>
          </Link>
          
          <Link 
            to="/garage" 
            className="flex items-center space-x-2 text-white hover:text-red-500 transition-colors"
          >
            <ShoppingCart className="h-6 w-6" />
            <span>Mon Garage</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};