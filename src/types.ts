export interface CarStats {
  vitesse_max: string;
  accélération_0_100_kmh: string;
  accélération_0_60_kmh: string;
  puissance: string;
  transmission: string;
  réduction_des_dégâts: number;
  pv: number;
}

export interface Car {
  nom: string;
  fabricant: string;
  classe: string;
  caractéristiques: CarStats;
  prix: string;
  image: string;
}

export interface CartItem {
  car: Car;
  quantity: number;
}