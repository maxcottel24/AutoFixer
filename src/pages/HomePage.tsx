import React from 'react';
import { CarGrid } from '../components/CarGrid';
import { Text } from '../components/Text';

import { useTranslation } from 'react-i18next';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-800">
      <div className="max-w-[90rem] mx-auto p-8">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          <span className="text-red-500">AutoFixer</span>
        </h1>
                <Text variant="h3" className="text-center mb-2">
          Bienvenue chez <span className="text-red-500">AutoFixer</span>
        </Text>
        <p className="text-gray-400 text-center mb-8">
          {t('homepage.subtitle')}
        </p>
        <CarGrid />
      </div>
    </div>
  );
};