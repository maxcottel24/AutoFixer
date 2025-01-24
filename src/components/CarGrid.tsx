import React, { useState, useMemo } from 'react';
import { CarCard } from './CarCard';
import { Filters } from './Filters';
import { cars } from '../data/cars';

export const CarGrid: React.FC = () => {
  const maxPrice = Math.max(...cars.map(car => parseInt(car.prix)));
  const availableClasses = Array.from(new Set(cars.map(car => car.classe))).sort();
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const price = parseInt(car.prix);
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      const matchesClass = selectedClasses.length === 0 || selectedClasses.includes(car.classe);
      return matchesPrice && matchesClass;
    });
  }, [priceRange, selectedClasses]);

  return (
    <div className="flex gap-6 p-6">
      <div className="w-80 flex-shrink-0">
        <div className="sticky top-6">
          <Filters
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedClasses={selectedClasses}
            setSelectedClasses={setSelectedClasses}
            availableClasses={availableClasses}
            maxPrice={maxPrice}
          />
        </div>
      </div>
      
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.nom} car={car} />
          ))}
        </div>
        
        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No vehicles match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};