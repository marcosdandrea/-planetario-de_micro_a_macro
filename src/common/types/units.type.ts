
export type UnitName = 
    'picómetro' | 'nanómetro' | 'micrómetro' | 'milímetro' | 'centímetro' | 'metro' | 
    'kilómetro' | 'megámetro' | 'gigámetro' | 'terámetro' | 'petámetro' | 'exámetro' | 
    'año luz' | 'parsec' | 'kiloparsec' | 'megaparsec' | 'gigaparsec' | 'teraparsec';

export type UnitSymbol = 
    'pm' | 'nm' | 'μm' | 'mm' | 'cm' | 'm' | 'km' | 'Mm' | 'Gm' | 'Tm' | 'Pm' | 'Em' | 
    'ly' | 'pc' | 'kpc' | 'Mpc' | 'Gpc' | 'Tpc';


export type UnitType = {
    name: UnitName;
    symbol: UnitSymbol;
    toBase10: (value: number) => number; // Función para convertir a base 10
    fromBase10: (value: number) => number; // Función para convertir desde base 10
}