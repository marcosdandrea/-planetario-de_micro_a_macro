import { UnitType } from "@common/types/units.type";

export const getUnits = (): UnitType[] =>  {
    const units: UnitType[] = [
        // Escalas subatómicas y atómicas
        {
            name: 'picómetro',
            symbol: 'pm',
            toBase10: (value: number) => value * 1e-12,
            fromBase10: (value: number) => value / 1e-12,
        },
        {
            name: 'nanómetro',
            symbol: 'nm',
            toBase10: (value: number) => value * 1e-9,
            fromBase10: (value: number) => value / 1e-9,
        },
        
        // Escalas moleculares y celulares
        {
            name: 'micrómetro',
            symbol: 'μm',
            toBase10: (value: number) => value * 1e-6,
            fromBase10: (value: number) => value / 1e-6,
        },
        
        // Escalas microscópicas
        {
            name: 'milímetro',
            symbol: 'mm',
            toBase10: (value: number) => value * 1e-3,
            fromBase10: (value: number) => value / 1e-3,
        },
        {
            name: 'centímetro',
            symbol: 'cm',
            toBase10: (value: number) => value * 1e-2,
            fromBase10: (value: number) => value / 1e-2,
        },
        
        // Escalas humanas
        {
            name: 'metro',
            symbol: 'm',
            toBase10: (value: number) => value,
            fromBase10: (value: number) => value,
        },
        {
            name: 'kilómetro',
            symbol: 'km',
            toBase10: (value: number) => value * 1e3,
            fromBase10: (value: number) => value / 1e3,
        },
        
        // Escalas terrestres
        {
            name: 'megámetro',
            symbol: 'Mm',
            toBase10: (value: number) => value * 1e6,
            fromBase10: (value: number) => value / 1e6,
        },
        {
            name: 'gigámetro',
            symbol: 'Gm',
            toBase10: (value: number) => value * 1e9,
            fromBase10: (value: number) => value / 1e9,
        },
        
        // Escalas planetarias y del sistema solar
        {
            name: 'terámetro',
            symbol: 'Tm',
            toBase10: (value: number) => value * 1e12,
            fromBase10: (value: number) => value / 1e12,
        },
        {
            name: 'petámetro',
            symbol: 'Pm',
            toBase10: (value: number) => value * 1e15,
            fromBase10: (value: number) => value / 1e15,
        },
        {
            name: 'exámetro',
            symbol: 'Em',
            toBase10: (value: number) => value * 1e18,
            fromBase10: (value: number) => value / 1e18,
        },
        
        // Escalas estelares e interestelares
        {
            name: 'año luz',
            symbol: 'ly',
            toBase10: (value: number) => value * 9.461e15, // 1 año luz ≈ 9.461 × 10^15 metros
            fromBase10: (value: number) => value / 9.461e15,
        },
        {
            name: 'parsec',
            symbol: 'pc',
            toBase10: (value: number) => value * 3.086e16, // 1 parsec ≈ 3.086 × 10^16 metros
            fromBase10: (value: number) => value / 3.086e16,
        },
        {
            name: 'kiloparsec',
            symbol: 'kpc',
            toBase10: (value: number) => value * 3.086e19, // 1000 parsecs
            fromBase10: (value: number) => value / 3.086e19,
        },
        
        // Escalas galácticas
        {
            name: 'megaparsec',
            symbol: 'Mpc',
            toBase10: (value: number) => value * 3.086e22, // 1 millón de parsecs
            fromBase10: (value: number) => value / 3.086e22,
        },
        {
            name: 'gigaparsec',
            symbol: 'Gpc',
            toBase10: (value: number) => value * 3.086e25, // 1000 millones de parsecs
            fromBase10: (value: number) => value / 3.086e25,
        },
        
        // Escalas cosmológicas
        {
            name: 'teraparsec',
            symbol: 'Tpc',
            toBase10: (value: number) => value * 3.086e28, // 1 billón de parsecs
            fromBase10: (value: number) => value / 3.086e28,
        }
    ];

    return units;
}

export const unitsServices = {
    getUnits
}