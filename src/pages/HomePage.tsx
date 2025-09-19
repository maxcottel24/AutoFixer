import { CarGrid } from "../components/CarGrid";
import { Text } from "../components/Text";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-800">
      <div className="max-w-[90rem] mx-auto p-8">
        <Text variant="h3" className="text-center mb-2">
          Bienvenue chez <span className="text-red-500">AutoFixer</span>
        </Text>
        <p className="text-gray-400 text-center mb-8">
          Votre concessionnaire premium à Melnéo
        </p>
        <CarGrid />
      </div>
    </div>
  );
};