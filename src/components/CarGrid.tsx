import React, { useState, useMemo } from 'react';
import { CarCard } from './CarCard';
import { Filters } from './Filters';
import { cars } from '../data/cars';

export const CarGrid: React.FC = () => {
  const minPrice = Math.min(...cars.map(car => parseInt(car.prix)));
  const maxPrice = Math.max(...cars.map(car => parseInt(car.prix)));
  const availableClasses = Array.from(new Set(cars.map(car => car.classe))).sort(); 
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const availableBrands = Array.from(new Set(cars.map(car => car.fabricant))).sort();

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const price = parseInt(car.prix);
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      const matchesClass = selectedClasses.length === 0 || selectedClasses.includes(car.classe);
      const matchesBrand = selectedBrand.length === 0 || selectedBrand.includes(car.fabricant);
      return matchesPrice && matchesClass && matchesBrand;
    }).sort((a,b) => Number(b.prix) - Number(a.prix));
  }, [priceRange, selectedClasses, selectedBrand]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
      <div className="w-full lg:w-80 lg:flex-shrink-0">
        <div className="lg:sticky lg:top-6">
          <Filters
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedClasses={selectedClasses}
            setSelectedClasses={setSelectedClasses}
            availableClasses={availableClasses}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            availableBrands={availableBrands}
            maxPrice={maxPrice}
          />
        </div>
      </div>
      
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.nom} car={car} />
          ))}
        </div>
        
        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">Aucun véhicule ne correspond à vos filtres</p>
          </div>
        )}
      </div>
    </div>
  );
};