import React from 'react';
import { CarGrid } from '../components/CarGrid';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-800">
      <div className="max-w-[90rem] mx-auto py-8">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Bienvenue chez <span className="text-red-500">AutoFixer</span>
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Votre concessionnaire premium à Melnéo
        </p>
        <CarGrid />
      </div>
    </div>
  );
};