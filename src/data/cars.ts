type Car = {
  nom: string;
  fabricant: string;
  classe: string;
  caractéristiques: {
    vitesse_max: string;
    accélération_0_100_kmh: string;
    accélération_0_60_kmh: string;
    puissance: string;
    transmission: string;
    réduction_des_dégâts: number;
    pv: number;
  };
  prix: string;
  image: string;
  additionalImages?: string[];
};

export const cars = [
  {
    "nom": "Aerondight S9 Guinevere",
    "fabricant": "Rayfield",
    "classe": "Hypercar",
    "caractéristiques": {
      "vitesse_max": "306 km/h",
      "accélération_0_100_kmh": "5 sec",
      "accélération_0_60_kmh": "3.01 sec",
      "puissance": "950 CV",
      "transmission": "Propulsion arrière (RWD)",
      "réduction_des_dégâts": 6,
      "pv": 45
    },
    "prix": "225000",
    "image": "https://i.imgur.com/Ymey91P.jpeg",
    "additionalImages": [
      "https://i.imgur.com/xO3Ccoh.jpeg",
      "https://i.imgur.com/xAHdOIu.jpeg",
      "https://i.imgur.com/0baaBt6.jpeg",
      "https://i.imgur.com/TZnYTmo.jpeg",
      "https://i.imgur.com/IORiuTJ.jpeg",
      "https://i.imgur.com/Z19GPNF.jpeg",
      "https://i.imgur.com/dT8Keo4.jpeg",
      "https://i.imgur.com/2F4r9Os.jpeg",
      "https://i.imgur.com/40TPf9b.jpeg"
    ]
  },
  {
    "nom": "Caliburn",
    "fabricant": "Rayfield",
    "classe": "Hypercar",
    "caractéristiques": {
      "vitesse_max": "339 km/h",
      "accélération_0_100_kmh": "4.3 sec",
      "accélération_0_60_kmh": "2.15 sec",
      "puissance": "980 CV",
      "transmission": "Transmission intégrale (AWD)",
      "réduction_des_dégâts": 6,
      "pv": 40
    },
    "prix": "157000",
    "image": "https://i.imgur.com/j9XFzvW.jpeg",
    "additionalImages": [
      "https://i.imgur.com/LKsjGZw.jpeg",
      "https://i.imgur.com/zarWULq.jpeg",
      "https://i.imgur.com/k56TpvB.jpeg",
      "https://i.imgur.com/W4Rzjoo.jpeg",
      "https://i.imgur.com/e8N7Jwc.jpeg",
      "https://i.imgur.com/tfFiuhe.jpeg"
    ]
  },
  {
    "nom": "Colby C125",
    "fabricant": "Thorton",
    "classe": "Utilitaire",
    "caractéristiques": {
      "vitesse_max": "220 km/h",
      "accélération_0_100_kmh": "12 sec",
      "accélération_0_60_kmh": "6.02 sec",
      "puissance": "182 CV",
      "transmission": "Traction avant (FWD)",
      "réduction_des_dégâts": 8,
      "pv": 70
    },
    "prix": "24000",
    "image": "https://i.imgur.com/oJ8lSRn.jpeg"
  },
  {
    "nom": "Colby CX410 Butte",
    "fabricant": "Thorton",
    "classe": "Tout terrain",
    "caractéristiques": {
      "vitesse_max": "220 km/h",
      "accélération_0_100_kmh": "13 sec",
      "accélération_0_60_kmh": "7.51 sec",
      "puissance": "235 CV",
      "transmission": "Transmission intégrale (AWD)",
      "réduction_des_dégâts": 7,
      "pv": 60
    },
    "prix": "21000",
    "image": "https://i.imgur.com/PVcCDr3.jpeg"
  },
  {
    "nom": "Quartz EC-L R275",
    "fabricant": "Archer",
    "classe": "Citadine",
    "caractéristiques": {
      "vitesse_max": "259 km/h",
      "accélération_0_100_kmh": "7 sec",
      "accélération_0_60_kmh": "4 sec",
      "puissance": "161 CV",
      "transmission": "Propulsion arrière (RWD)",
      "réduction_des_dégâts": 6,
      "pv": 54
    },
    "prix": "29000",
    "image": "https://i.imgur.com/KrzXzpi.jpeg"
  },
  {
    "nom": "Galena Rattler",
    "fabricant": "Thorton",
    "classe": "Citadine",
    "caractéristiques": {
      "vitesse_max": "290 km/h",
      "accélération_0_100_kmh": "5.1 sec",
      "accélération_0_60_kmh": "2.42 sec",
      "puissance": "365 CV",
      "transmission": "Transmission intégrale (AWD)",
      "réduction_des_dégâts": 7,
      "pv": 50
    },
    "prix": "30000",
    "image": "https://i.imgur.com/7UbrYPY.jpeg"
  },
  {
    "nom": "Alvarado V4F 570 Delegate",
    "fabricant": "Villefort",
    "classe": "Berline",
    "caractéristiques": {
      "vitesse_max": "243 km/h",
      "accélération_0_100_kmh": "16 sec",
      "accélération_0_60_kmh": "7.31 sec",
      "puissance": "407 CV",
      "transmission": "Traction avant (FWD)",
      "réduction_des_dégâts": 8,
      "pv": 60
    },
    "prix": "45000",
    "image": "https://i.imgur.com/TROhhwz.jpeg"
  },
  {
    "nom": "Cortes V5000 Valor",
    "fabricant": "Villefort",
    "classe": "Berline",
    "caractéristiques": {
      "vitesse_max": "243 km/h",
      "accélération_0_100_kmh": "N/A",
      "accélération_0_60_kmh": "6.1 sec",
      "puissance": "333 CV",
      "transmission": "Propulsion arrière (RWD)",
      "réduction_des_dégâts": 7,
      "pv": 48
    },
    "prix": "25000",
    "image": "https://i.imgur.com/FuaoLNr.jpeg"
  },
  {
    "nom": "Thrax 388 Jefferson",
    "fabricant": "Chevillon",
    "classe": "Berline",
    "caractéristiques": {
      "vitesse_max": "243 km/h",
      "accélération_0_100_kmh": "N/A",
      "accélération_0_60_kmh": "N/A",
      "puissance": "388 CV",
      "transmission": "Propulsion arrière (RWD)",
      "réduction_des_dégâts": 4,
      "pv": 52
    },
    "prix": "26000",
    "image": "https://i.imgur.com/j2nI8zy.jpeg"
  },
  {
    "nom": "Outlaw GTS",
    "fabricant": "Herrera",
    "classe": "Hypercar",
    "caractéristiques": {
      "vitesse_max": "299 km/h",
      "accélération_0_100_kmh": "5.3 sec",
      "accélération_0_60_kmh": "2.52 sec",
      "puissance": "755 CV",
      "transmission": "Transmission intégrale (AWD)",
      "réduction_des_dégâts": 5,
      "pv": 51
    },
    "prix": "62000",
    "image": "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&q=80&w=1200"
  },
  {
    "nom": "Shion Coyote",
    "fabricant": "Mizutani",
    "classe": "Sport",
    "caractéristiques": {
      "vitesse_max": "320 km/h",
      "accélération_0_100_kmh": "5.5 sec",
      "accélération_0_60_kmh": "3.1 sec",
      "puissance": "570 CV",
      "transmission": "Transmission intégrale (AWD)",
      "réduction_des_dégâts": 12,
      "pv": 75
    },
    "prix": "75000",
    "image": "https://i.imgur.com/yBEcMxK.jpeg"
  },
  {
    "nom": "Apollo",
    "fabricant": "Brennan",
    "classe": "Motos",
    "caractéristiques": {
      "vitesse_max": "220 km/h",
      "accélération_0_100_kmh": "8.01 sec",
      "accélération_0_60_kmh": "5.16 sec",
      "puissance": "94 CV",
      "transmission": "Propulsion arrière (RWD)",
      "réduction_des_dégâts": 0,
      "pv": 20
    },
    "prix": "15000",
    "image": "https://i.imgur.com/0PVsMzR.jpeg"
  },
  {
    "nom": "Nazare",
    "fabricant": "Arch Motorcycles",
    "classe": "Motos",
    "caractéristiques": {
      "vitesse_max": "286 km/h",
      "accélération_0_100_kmh": "6.8 sec",
      "accélération_0_60_kmh": "3.19 sec",
      "puissance": "170 CV",
      "transmission": "Propulsion arrière (RWD)",
      "réduction_des_dégâts": 0,
      "pv": 35
    },
    "prix": "49000",
    "image": "https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&q=80&w=1200"
  },
  {
    "nom": "Viper 1996",
    "fabricant": "Dodge",
    "classe": "Sport",
    "caractéristiques": {
      "vitesse_max": "305 km/h",
      "accélération_0_100_kmh": "4.6 sec",
      "accélération_0_60_kmh": "2.8 sec",
      "puissance": "501 CV",
      "transmission": "Propulsion arrière (RWD)",
      "réduction_des_dégâts": 2,
      "pv": 43
    },
    "prix": "55000",
    "image": "https://www.sportscarmarket.com/wp-content/uploads/2021/05/1996-dodge-viper-gts-coupe-drivers-front.jpg"
  },
  {
    "nom": "Corvette C6 2005",
    "fabricant": "Chevrolet",
    "classe": "Sport",
    "caractéristiques": {
      "vitesse_max": "312 km/h",
      "accélération_0_100_kmh": "4.1 sec",
      "accélération_0_60_kmh": "2.7 sec",
      "puissance": "505 CV",
      "transmission": "Propulsion arrière (RWD)",
      "réduction_des_dégâts": 3,
      "pv": 40
    },
    "prix": "55000",
    "image": "https://images.unsplash.com/photo-1733299710470-f5b8b6a79849?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "nom": "Columbus V340-F Freight",
    "fabricant": "Villefort",
    "classe": "Utilitaire",
    "caractéristiques": {
      "vitesse_max": "209 km/h",
      "accélération_0_100_kmh": "11.08 sec",
      "accélération_0_60_kmh": "8.23 sec",
      "puissance": "210 CV",
      "transmission": "Propulsion arrière (RWD)",
      "réduction_des_dégâts": 10,
      "pv": 80
    },
    "prix": "19000",
    "image": "https://i.imgur.com/PNd8NIR.jpeg"
  },
  {
    "nom": "Kusanagi CT-3X",
    "fabricant": "Yaiba",
    "classe": "Motos",
    "caractéristiques": {
      "vitesse_max": "288 km/h",
      "accélération_0_100_kmh": "4.99 sec",
      "accélération_0_60_kmh": "3.57 sec",
      "puissance": "183 CV",
      "transmission": "Propulsion arrière (RWD)",
      "réduction_des_dégâts": 0,
      "pv": 27
    },
    "prix": "31000",
    "image": "https://i.imgur.com/4wwua2X.jpeg"
  },
  {
    "nom": "Turbo-R V-Tech",
    "fabricant": "Quadra",
    "classe": "Sport",
    "caractéristiques": {
      "vitesse_max": "301 km/h",
      "accélération_0_100_kmh": "4.4 sec",
      "accélération_0_60_kmh": "3.04 sec",
      "puissance": "740 CV",
      "transmission": "Propulsion arrière (RWD)",
      "réduction_des_dégâts": 4,
      "pv": 51
    },
    "prix": "75000",
    "image": "https://i.imgur.com/t82ijtv.jpeg"
  },
  {
    "nom": "Maimai P126",
    "fabricant": "Makigai",
    "classe": "Citadine",
    "caractéristiques": {
      "vitesse_max": "191 km/h",
      "accélération_0_100_kmh": "N/A",
      "accélération_0_60_kmh": "6.34 sec",
      "puissance": "70 CV",
      "transmission": "Propulsion arrière (RWD)",
      "réduction_des_dégâts": 1,
      "pv": 15
    },
    "prix": "14000",
    "image": "https://i.imgur.com/cxj7AM3.jpeg"
  }
];

const sortedCars = cars.sort((a: Car, b: Car) => Number(b.prix) - Number(a.prix));

console.log(sortedCars);