export interface WeaponStats {
  nom: string;
  type: "machineGun" | "cannon" | "missileLauncher";
  dégâts: string;
  portée: string;
}

export interface CarStats {
  vitesse_max: string;
  vitesse_max_en?: string;
  nombre_de_places: string;
  puissance: string;
  armé: boolean;
  réduction_des_dégâts: number;
  pv: number;
  accélération_0_100_kmh?: string;
  accélération_0_60_kmh?: string;
  transmission?: string;
  armes?: WeaponStats[];
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