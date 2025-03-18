export interface CarStats {
  vitesse_max: string;
  nombre_de_places: string;
  puissance: string;
  armé: "Oui" | "Non";
  réduction_des_dégâts: number;
  pv: number;
  accélération_0_100_kmh?: string;
  accélération_0_60_kmh?: string;
  transmission?: string;
}

export interface ColorInfo {
  name: string;
  hex: string;
}

export interface Car {
  nom: string;
  fabricant: string;
  classe: string;
  caractéristiques: CarStats;
  prix: string;
  image: string;
  additionalImages?: string[];
  colors: ColorInfo[];
  exclusiveColors?: ColorInfo | ColorInfo[];
}

export type CartItemType = 'car' | 'color';

export interface BaseCartItem {
  type: CartItemType;
  nom: string;
  fabricant: string;
  prix: string;
}

export interface CarCartItem extends BaseCartItem {
  type: 'car';
  car: Car;
}

export interface ColorCartItem extends BaseCartItem {
  type: 'color';
  hex: string;
  forCar: string;
}

export type CartItem = CarCartItem | ColorCartItem;