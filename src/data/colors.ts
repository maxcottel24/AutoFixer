import { ColorInfo } from "../types";

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
    { "name": "Éclosion de Rosée", "hex": "#FF69B4" },
  
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
    Militech: { "name": "Militech Man O'War", "hex": "#4548AB" },
    Mahir: { "name": "Mahir Aston Green", "hex": "#0F665E" },
    Zetatech: { "name": "Zetatech Gris de Neige", "hex": "#CCCCCC" },
    TraumaTeam: { "name": "Trauma Team Soins d'Urgence", "hex": "#1DA09D" },
    ChevroletF1: { "name": "Chevrolet F1", "hex": "#00ffff" },
  } as const;