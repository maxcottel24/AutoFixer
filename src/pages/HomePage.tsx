import React from 'react';
import { CarGrid } from '../components/CarGrid';


import { useTranslation } from 'react-i18next';
import { Text } from '../components/Text';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-800">
      <div className="max-w-[90rem] mx-auto p-8">
        <Text variant="h3" className="text-center mb-2">
          {t('homepage.subtitle')} <span className="text-red-500">AutoFixer</span>
        </Text>

        <Text variant="p1" className="text-gray-400 text-center mb-8">
          {t('homepage.subtitle')}
        </Text>
        <CarGrid />
      </div>
    </div>
  );
};