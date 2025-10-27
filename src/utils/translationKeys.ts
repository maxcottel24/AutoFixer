// Fonction pour obtenir la clé de traduction d'une couleur
export const getColorTranslationKey = (colorName: string): string => {
  const colorMap: { [key: string]: string } = {
    "Nuit d'Obsidienne": "obsidianNight",
    "Tempête de Titane": "titanStorm",
    "Perle Lustreuse": "lustrousPearl",
    "Ardeur Écarlate": "scarletArdour",
    "Furie de Pourpre": "crimsonFury",
    "Brûlure d'Ambre": "amberBurn",
    "Lueur de Braise": "emberGlow",
    "Soleil Glissant": "goldenGlint",
    "Splendeur d'Émeraude": "emeraldSplendor",
    "Reflet d'Aigue-Marine": "reflectionOfAquamarine",
    "Marée de Néon": "neonSea",
    "Brise d'Azur": "azureBreeze",
    "Vague de Saphir": "sapphireWave",
    "Foudre Marine": "lightningMarine",
    "Prune Impériale": "imperialPlum",
    "Brume d'Améthyste": "amethystMist",
    "Crépuscule Châtaigne": "twilightChestnut",
    "Éclosion de Rosée": "roseBloom",
    "Rayfield Gold Digger": "rayfieldGoldDigger",
    "Mizutani Shinkansen Surge": "mizutaniShinkansenSurge",
    "Thorton Trailblazer": "thortonTrailblazer",
    "Yaiba Cyber Wave": "yaibaCyberWave",
    "Quadra Retro Flash": "quadraRetroFlash",
    "Brennan Hyperion Mauve": "brennanHyperionMauve",
    "Villefort Sceptre d'Airain": "villefortSceptreDAirain",
    "Herrera Real Burdeos": "herreraRealBurdeos",
    "Archer Flèche de Glace": "archerFlecheDeGlace",
    "Chevillon Dreadnought": "chevillonDreadnought",
    "Makigai Nano Wasabi": "makigaiNanoWasabi",
    "Arch Furie du Bitume": "archFurieDuBitume",
    "Dodge Dragstrip Inferno": "dodgeDragstripInferno",
    "Chevrolet Lac Elkhart": "chevroletLacElkhart",
    "Vipers": "vipers",
    "Corvettes": "corvettes",
    "Militech Man O'War": "militechManOWar",
    "Mahir Aston Green": "mahirAstonGreen",
    "Zetatech Gris de Neige": "zetatechGrisDeNeige",
    "Trauma Team Soins d'Urgence": "traumaTeamSoinsDUrgence",
    "Chevrolet F1": "chevroletF1"
  };
  
  return colorMap[colorName] || colorName;
};

// Function to get the translation key for a car description
export const getCarDescriptionKey = (carName: string): string => {
  const carMap: { [key: string]: string } = {
    'Aerondight S9 Guinevere': 'aerondights9guinevere',
    'Nazare': 'nazare',
    'Kusanagi CT-3X': 'kusanagict3x',
    'Apollo': 'apollo',
    'MI-45 Apache': 'mi45apache',
    'TTMR7 Valkyrie': 'ttmr7valkyrie',
    'Veliora LX': 'velioralx',
    'Maimai P126': 'maimaip126',
    'Sport R-7 Sterling': 'sportr7sterling',
    'Caliburn': 'caliburn',
    'Shion Samum': 'shionsamum',
    'Turbo-R V-Tech': 'turborvttech',
    'Corvette X-1': 'corvettex1',
    'Type-66 Avenger': 'type66avenger',
    'Type-66 Javelina': 'type66javelina',
    'Sport R-7 Charon': 'sportr7charon',
    'Coyote': 'coyote',
    'Viper 1996': 'viper1996',
    'Corvette C6 2005': 'corvettec62005',
    'Type-66 Jen Rowley': 'type66jenrowley',
    'Emperor 620 Ragnar': 'emperor620ragnar',
    'Galena Gecko': 'galenagecko',
    'Alvarado V4F 570 Delegate': 'alvaradov4f570delegate',
    'Galena Rattler': 'galenarattler',
    'Colby Little Mule': 'colbylittlemule',
    'Quartz Specter': 'quartzspecter',
    'Columbus V340-F Freight': 'columbusv340ffreight',
    'Thrax 388 Jefferson': 'thrax388jefferson',
    'Cortes V5000 Valor': 'cortesv5000valor',
    'Legatus 450 Aquila': 'legatus450aquila',
    'Deleon Vindicator': 'deleonvindicator',
    'Colby C125': 'colbyc125',
    'Colby CX410 Butte': 'colbycx410butte',
    'Quartz EC-L R275': 'quartzecrlr275',
    'Supron SF-S3': 'supronsfs3',
    'Hellhound': 'hellhound',
    'Outlaw GTS': 'outlawgts'
  };
  
  return carMap[carName] || carName.toLowerCase().replace(/\s+/g, '');
};

// Function to get the translation key for a vehicle class
export const getVehicleClassTranslationKey = (className: string): string => {
  // The vehicle classes are already stored as keys in the translation files
  // so we can return the class name directly as it should match the translation key
  return className;
};
