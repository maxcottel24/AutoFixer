import { WeaponStats } from '../types';

// Définition des armes disponibles avec clés de traduction
export const weapons: { [key: string]: WeaponStats } = {
  "heavyMachineGun": {
    nom: "heavyMachineGun",
    type: "machineGun",
    dégâts: "2d6",
    portée: "100m"
  },
  "automaticCannon30mm": {
    nom: "automaticCannon30mm",
    type: "cannon",
    dégâts: "3d6",
    portée: "150m"
  },
  "heavyMissile": {
    nom: "heavyMissile",
    type: "missileLauncher",
    dégâts: "3d6",
    portée: "800m"
  },
  "guidedMissileLauncher": {
    nom: "guidedMissileLauncher",
    type: "missileLauncher",
    dégâts: "5d6",
    portée: "800m"
  }
}; 