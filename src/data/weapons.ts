import { WeaponStats } from '../types';

// Définition des armes disponibles
export const weapons: { [key: string]: WeaponStats } = {
  "Mitrailleuse lourde": {
    nom: "Mitrailleuse lourde",
    type: "Mitrailleuse",
    dégâts: "2d6",
    portée: "100m"
  },
  "Canon automatique 30mm": {
    nom: "Canon automatique 30mm",
    type: "Canon",
    dégâts: "3d6",
    portée: "150m"
  },
  "Missile lourd": {
    nom: "Missile lourd",
    type: "Lance-missiles",
    dégâts: "3d6",
    portée: "800m"
  },
  "Lance-missiles guidés": {
    nom: "Lance-missiles guidés",
    type: "Lance-missiles",
    dégâts: "5d6",
    portée: "800m"
  }
}; 