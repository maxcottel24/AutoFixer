import { Car, ColorInfo } from '../types';

// Définition des couleurs standards
export const standardColors: readonly ColorInfo[] = [
  // Neutres
  { "name": "Nuit d'Obsidienne", "hex": "#0A0A0A" },
  { "name": "Tempête de Titane", "hex": "#767676" },
  { "name": "Perle Lustreuse", "hex": "#FFFFFF" },
  
  // Rouges
  { "name": "Ardeur Écarlate", "hex": "#AD0000" },
  { "name": "Furie de Pourpre", "hex": "#FF0000" },
  
  // Oranges
  { "name": "Brûlure d'Ambre", "hex": "#FF6700" },
  { "name": "Lueur de Braise", "hex": "#FF7F50" },
  
  // Jaunes/Dorés
  { "name": "Soleil Glissant", "hex": "#FFF300" },
  
  // Verts
  { "name": "Splendeur d'Émeraude", "hex": "#50C878" },
  { "name": "Reflet d'Aigue-Marine", "hex": "#1abc9c" },
  
  // Bleus (du plus clair au plus foncé)
  { "name": "Marée de Néon", "hex": "#00FFFF" },
  { "name": "Brise d'Azur", "hex": "#87CEEB" },
  { "name": "Vague de Saphir", "hex": "#0047AB" },
  { "name": "Foudre Marine", "hex": "#191970" },
  
  // Violets
  { "name": "Prune Impériale", "hex": "#7851A9" },
  { "name": "Brume d'Améthyste", "hex": "#4B0082" },
  
  // Bruns
  { "name": "Crépuscule Châtaigne", "hex": "#8B4513" },
  
  // Rose
  { "name": "Éclosion de Rosée", "hex": "#FF69B4" }
] as const;

// Définition des couleurs exclusives par fabricant
export const exclusiveColors: { readonly [key: string]: ColorInfo } = {
  Rayfield: { "name": "Rayfield Gold Digger", "hex": "#FFD300" },
  Mizutani: { "name": "Mizutani Shinkansen Surge", "hex": "#8800FF" },
  Thorton: { "name": "Thorton Trailblazer", "hex": "#C2B280" },
  Yaiba: { "name": "Yaiba Cyber Wave", "hex": "#FF1493" },
  Quadra: { "name": "Quadra Retro Flash", "hex": "#FFCC00" },
  Brennan: { "name": "Brennan Hyperion Mauve", "hex": "#532881" },
  Villefort: { "name": "Villefort Sceptre d'Airain", "hex": "#8C6239" },
  Herrera: { "name": "Herrera Real Burdeos", "hex": "#800020" },
  Archer: { "name": "Archer Flèche de Glace", "hex": "#72CDEE" },
  Chevillon: { "name": "Chevillon Dreadnought", "hex": "#C0C0C0" },
  Makigai: { "name": "Makigai Nano Wasabi", "hex": "#7EC850" },
  ArchMotorcycles: { "name": "Arch Furie du Bitume", "hex": "#4A0000" },
  Dodge: { "name": "Dodge Dragstrip Inferno", "hex": "#FF8200" },
  Chevrolet: { "name": "Chevrolet Lac Elkhart", "hex": "#005BAC" },
  Viper: { "name": "Vipers", "hex": "#60A832" },
  Corvette: { "name": "Corvettes", "hex": "#714C31" },
} as const;

export const cars: Car[] = [
  {
    "nom": "Aerondight S9 Guinevere",
    "fabricant": "Rayfield",
    "classe": "Hypercar",
    "caractéristiques": {
      "vitesse_max": "306 km/h",
      "nombre_de_places": "2",
      "puissance": "950 CV",
      "armé": "Non",
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
    ],
    "colors": [...standardColors],
    "exclusiveColors": exclusiveColors.Rayfield
  },
  {
    "nom": "Caliburn",
    "fabricant": "Rayfield",
    "classe": "Hypercar",
    "caractéristiques": {
      "vitesse_max": "339 km/h",
      "nombre_de_places": "2",
      "puissance": "980 CV",
      "armé": "Non",
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
    ],
    "colors": [...standardColors],
    "exclusiveColors": exclusiveColors.Rayfield
  },
  {
    "nom": "Colby C125",
    "fabricant": "Thorton",
    "classe": "Utilitaire",
    "caractéristiques": {
      "vitesse_max": "220 km/h",
      "nombre_de_places": "2?",
      "puissance": "182 CV",
      "armé": "Non",
      "réduction_des_dégâts": 8,
      "pv": 70
    },
    "prix": "24000",
    "image": "https://i.imgur.com/oJ8lSRn.jpeg",
    "colors": [...standardColors],
    "exclusiveColors": exclusiveColors.Thorton
  },
  {
    "nom": "Colby CX410 Butte",
    "fabricant": "Thorton",
    "classe": "Tout terrain",
    "caractéristiques": {
      "vitesse_max": "220 km/h",
      "nombre_de_places": "4",
      "puissance": "235 CV",
      "armé": "Non",
      "réduction_des_dégâts": 7,
      "pv": 60
    },
    "prix": "21000",
    "image": "https://i.imgur.com/PVcCDr3.jpeg",
    "additionalImages": [
      "https://i.imgur.com/6vVxVw4.jpeg",
      "https://i.imgur.com/lKpmztd.jpeg",
      "https://i.imgur.com/fMGltjZ.jpeg",
      "https://i.imgur.com/mVeqrjV.jpeg",
      "https://i.imgur.com/PUbpe36.jpeg"
    ],
    "colors": [...standardColors],
    "exclusiveColors": exclusiveColors.Thorton
  },
  {
    "nom": "Quartz EC-L R275",
    "fabricant": "Archer",
    "classe": "Citadine",
    "caractéristiques": {
      "vitesse_max": "259 km/h",
      "nombre_de_places": "2",
      "puissance": "161 CV",
      "armé": "Non",
      "réduction_des_dégâts": 6,
      "pv": 54
    },
    "prix": "29000",
    "image": "https://i.imgur.com/KrzXzpi.jpeg", // a virer, angle mauvais
    "additionalImages": [
      "https://i.imgur.com/vBEYt37.jpeg",
      "https://i.imgur.com/Z75Sykz.jpeg",
      "https://i.imgur.com/G5CEIHo.jpeg",
      "https://i.imgur.com/0W2NyZ9.jpeg",
      "https://i.imgur.com/52KnboV.jpeg"
    ],
    "colors": [...standardColors],
    "exclusiveColors": exclusiveColors.Archer
  },
  {
    "nom": "Galena Rattler",
    "fabricant": "Thorton",
    "classe": "Citadine",
    "caractéristiques": {
      "vitesse_max": "290 km/h",
      "nombre_de_places": "2?",
      "puissance": "365 CV",
      "armé": "Non",
      "réduction_des_dégâts": 7,
      "pv": 50
    },
    "prix": "30000",
    "image": "https://i.imgur.com/7UbrYPY.jpeg",
    "additionalImages": [
      "https://i.imgur.com/KLjSZeP.jpeg",
      "https://i.imgur.com/9heNtHt.jpeg",
      "https://i.imgur.com/4I0St6Z.jpeg",
      "https://i.imgur.com/uzDcjhW.jpeg",
      "https://i.imgur.com/f49uLw7.jpeg"
    ],
    "colors": [...standardColors],
    "exclusiveColors": exclusiveColors.Thorton
  },
  {
    "nom": "Alvarado V4F 570 Delegate",
    "fabricant": "Villefort",
    "classe": "Berline",
    "caractéristiques": {
      "vitesse_max": "243 km/h",
      "nombre_de_places": "5",
      "puissance": "407 CV",
      "armé": "Non",
      "réduction_des_dégâts": 8,
      "pv": 60
    },
    "prix": "45000",
    "image": "https://i.imgur.com/ZKdrmJx.jpeg",
    "additionalImages": [
      "https://i.imgur.com/L84zMR0.jpeg",
      "https://i.imgur.com/7SpZxe8.jpeg",
      "https://i.imgur.com/omwH2SO.jpeg",
      "https://i.imgur.com/vfsIUD6.jpeg",
      "https://i.imgur.com/1SK7EPX.jpeg",
      "https://i.imgur.com/tcDCtO1.jpeg"
    ],
    "colors": [...standardColors],
    "exclusiveColors": exclusiveColors.Villefort
  },
  {
    "nom": "Cortes V5000 Valor",
    "fabricant": "Villefort",
    "classe": "Berline",
    "caractéristiques": {
      "vitesse_max": "243 km/h",
      "nombre_de_places": "5",
      "puissance": "333 CV",
      "armé": "Non",
      "réduction_des_dégâts": 7,
      "pv": 48
    },
    "prix": "25000",
    "image": "https://i.imgur.com/FuaoLNr.jpeg",
    "colors": [...standardColors],
    "exclusiveColors": exclusiveColors.Villefort
  },
  {
    "nom": "Thrax 388 Jefferson",
    "fabricant": "Chevillon",
    "classe": "Berline",
    "caractéristiques": {
      "vitesse_max": "243 km/h",
      "nombre_de_places": "5",
      "puissance": "388 CV",
      "armé": "Non",
      "réduction_des_dégâts": 4,
      "pv": 52
    },
    "prix": "26000",
    "image": "https://i.imgur.com/j2nI8zy.jpeg",
    "additionalImages": [
      "https://i.imgur.com/4HzPeie.jpeg",
      "https://i.imgur.com/9nnFN8B.jpeg", // a virer, angle mauvais
      "https://i.imgur.com/Wmoss1g.jpeg", // a virer, angle mauvais
      "https://i.imgur.com/DBcSvvV.jpeg", // a virer, luminosité mauvaise
      "https://i.imgur.com/4GNqgct.jpeg" // a virer, luminosité mauvaise
    ],  
    "colors": [...standardColors],
    "exclusiveColors": exclusiveColors.Chevillon
  },
  {
    "nom": "Outlaw GTS",
    "fabricant": "Herrera",
    "classe": "Hypercar",
    "caractéristiques": {
      "vitesse_max": "299 km/h",
      "nombre_de_places": "4",
      "puissance": "755 CV",
      "armé": "Non",
      "réduction_des_dégâts": 5,
      "pv": 51
    },
    "prix": "62000",
    "image": "https://i.imgur.com/gPtKbUQ.jpeg",
    "additionalImages": [
      "https://i.imgur.com/HRcKwAs.jpeg",
      "https://i.imgur.com/wrKU37b.jpeg",
      "https://i.imgur.com/wHqNWW8.jpeg",
      "https://i.imgur.com/YYp1LuR.jpeg",
      "https://i.imgur.com/miDfSJZ.jpeg"
    ],
    "colors": [...standardColors],
    "exclusiveColors": exclusiveColors.Herrera
  },
  {
    "nom": "Shion Coyote",
    "fabricant": "Mizutani",
    "classe": "Sport",
    "caractéristiques": {
      "vitesse_max": "320 km/h",
      "nombre_de_places": "2",
      "puissance": "570 CV",
      "armé": "Non",
      "réduction_des_dégâts": 12,
      "pv": 75
    },
    "prix": "75000",
    "image": "https://i.imgur.com/yBEcMxK.jpeg",
    "additionalImages": [
      "https://i.imgur.com/2bmflFG.jpeg",
      "https://i.imgur.com/Gh6BCAd.jpeg",
      "https://i.imgur.com/4zDC4oL.jpeg",
      "https://i.imgur.com/fxVP9gY.jpeg",
      "https://i.imgur.com/IHXJqE5.jpeg",
      "https://i.imgur.com/FjCFIvY.jpeg"
    ],
    "colors": [...standardColors],
    "exclusiveColors": exclusiveColors.Mizutani
  },
  {
    "nom": "Apollo",
    "fabricant": "Brennan",
    "classe": "Motos",
    "caractéristiques": {
      "vitesse_max": "220 km/h",
      "nombre_de_places": "2",
      "puissance": "94 CV",
      "armé": "Non",
      "réduction_des_dégâts": 0,
      "pv": 20
    },
    "prix": "15000",
    "image": "https://i.imgur.com/0PVsMzR.jpeg",
    "colors": [...standardColors],
    "exclusiveColors": exclusiveColors.Brennan
  },
  {
    "nom": "Nazare",
    "fabricant": "Arch Motorcycles",
    "classe": "Motos",
    "caractéristiques": {
      "vitesse_max": "286 km/h",
      "nombre_de_places": "2",
      "puissance": "170 CV",
      "armé": "Non",
      "réduction_des_dégâts": 0,
      "pv": 35
    },
    "prix": "49000",
    "image": "https://i.imgur.com/96JatvH.jpeg",
    "additionalImages": [
      "https://i.imgur.com/cYhEYf7.jpeg",
      "https://i.imgur.com/kf1uT4H.jpeg",
      "https://i.imgur.com/BTjy3sE.jpeg",
      "https://i.imgur.com/ecpXSeC.jpeg",
      "https://i.imgur.com/fcb1rAa.jpeg",
      "https://i.imgur.com/ybOdNAe.jpeg"
    ],
    "colors": [...standardColors],
    "exclusiveColors": exclusiveColors.ArchMotorcycles
  },
  {
    "nom": "Viper 1996",
    "fabricant": "Dodge",
    "classe": "Sport",
    "caractéristiques": {
      "vitesse_max": "305 km/h",
      "nombre_de_places": "2",
      "puissance": "501 CV",
      "armé": "Non",
      "réduction_des_dégâts": 2,
      "pv": 43
    },
    "prix": "55000",
    "image": "https://www.sportscarmarket.com/wp-content/uploads/2021/05/1996-dodge-viper-gts-coupe-drivers-front.jpg",
    "additionalImages": [
      "https://www.turbo.fr/sites/default/files/styles/slideshow_images/public/slideshow/slides/2024-09/66fa8cd9d0e4d.jpg?itok=qOpKamDb",
      "https://www.turbo.fr/sites/default/files/styles/slideshow_images/public/slideshow/slides/2024-09/66fa8cd9deabd.jpg?itok=NSCVl90g",
      "https://www.turbo.fr/sites/default/files/styles/slideshow_images/public/slideshow/slides/2024-09/66fa8cda2ad85.jpg?itok=x_B0Zexo",
      "https://www.turbo.fr/sites/default/files/styles/slideshow_images/public/slideshow/slides/2024-09/66fa8cda51f5f.jpg?itok=4YboKCjk"
    ],
    "colors": [...standardColors],
    "exclusiveColors": [
      exclusiveColors.Dodge,
      exclusiveColors.Viper
    ]
  },
  {
    "nom": "Corvette C6 2005",
    "fabricant": "Chevrolet",
    "classe": "Sport",
    "caractéristiques": {
      "vitesse_max": "312 km/h",
      "nombre_de_places": "2",
      "puissance": "505 CV",
      "armé": "Non",
      "réduction_des_dégâts": 3,
      "pv": 40
    },
    "prix": "55000",
    "image": "https://images.unsplash.com/photo-1733299710470-f5b8b6a79849?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "additionalImages": [ 
      "https://images.unsplash.com/photo-1733299710040-f24eb2231436?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1733299707207-0c94238c3704?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1733299707389-2f2ec2e372ab?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    "colors": [...standardColors],
    "exclusiveColors": [
      exclusiveColors.Chevrolet,
      exclusiveColors.Corvette
    ]
  },
  {
    "nom": "Columbus V340-F Freight",
    "fabricant": "Villefort",
    "classe": "Utilitaire",
    "caractéristiques": {
      "vitesse_max": "209 km/h",
      "nombre_de_places": "6",
      "puissance": "210 CV",
      "armé": "Non",
      "réduction_des_dégâts": 10,
      "pv": 80
    },
    "prix": "19000",
    "image": "https://i.imgur.com/PNd8NIR.jpeg",
    "colors": [...standardColors],
    "exclusiveColors": exclusiveColors.Villefort
  },
  {
    "nom": "Kusanagi CT-3X",
    "fabricant": "Yaiba",
    "classe": "Motos",
    "caractéristiques": {
      "vitesse_max": "288 km/h",
      "nombre_de_places": "2",
      "puissance": "183 CV",
      "armé": "Non",
      "réduction_des_dégâts": 0,
      "pv": 27
    },
    "prix": "31000",
    "image": "https://i.imgur.com/4wwua2X.jpeg",
    "additionalImages": [
      "https://i.imgur.com/0uH7cki.jpeg",
      "https://i.imgur.com/DI9Pr32.jpeg",
      "https://i.imgur.com/LFYaUSA.jpeg",
      "https://i.imgur.com/wXKpbjY.jpeg",
      "https://i.imgur.com/yfcET0Q.jpeg",
      "https://i.imgur.com/ICESG8C.jpeg"
    ],
    "colors": [...standardColors],
    "exclusiveColors": exclusiveColors.Yaiba
  },
  {
    "nom": "Turbo-R V-Tech",
    "fabricant": "Quadra",
    "classe": "Sport",
    "caractéristiques": {
      "vitesse_max": "301 km/h",
      "nombre_de_places": "2",
      "puissance": "740 CV",
      "armé": "Non",
      "réduction_des_dégâts": 4,
      "pv": 51
    },
    "prix": "75000",
    "image": "https://i.imgur.com/t82ijtv.jpeg",
    "colors": [...standardColors],
    "exclusiveColors": exclusiveColors.Quadra
  },
  {
    "nom": "Maimai P126",
    "fabricant": "Makigai",
    "classe": "Citadine",
    "caractéristiques": {
      "vitesse_max": "191 km/h",
      "nombre_de_places": "2",
      "puissance": "70 CV",
      "armé": "Non",
      "réduction_des_dégâts": 1,
      "pv": 15
    },
    "prix": "14000",
    "image": "https://i.imgur.com/cxj7AM3.jpeg",
    "additionalImages": [
      "https://i.imgur.com/XxtzxSv.jpeg",
      "https://i.imgur.com/9iK14Jd.jpeg",
      "https://i.imgur.com/JcQdeCO.jpeg",
      "https://i.imgur.com/OWKJ3zg.jpeg",
      "https://i.imgur.com/TXHWWus.jpeg",
      "https://i.imgur.com/qEMp7j4.jpeg",
      "https://i.imgur.com/8uQ3Cr5.jpeg",
    ],
    "colors": [...standardColors],
    "exclusiveColors": exclusiveColors.Makigai
  }
];

export const sortedCars = cars.sort((a, b) => Number(b.prix) - Number(a.prix));

console.log(sortedCars);