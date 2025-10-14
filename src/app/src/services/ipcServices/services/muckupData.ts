import { navigationData } from "@common/types/navigation.type";

export const mockupData = [
  {
    id: '1',
    sprite: {
      id: '1',
      image: 'atomo-hidrogeno.png',
      displayName: 'Átomo de hidrógeno',
      description: 'Unidad básica de la materia, un protón orbitado por un electrón',
      displaySize: '0.1 nm',
      unit: 'nanómetro',
      base10Size: 1e-10,
      isIndex: false
    },
    background: {
      image: 'universe.jpg',
    }
  },
  {
    id: '2',
    sprite: {
      id: '2',
      image: 'adn.png',
      displayName: 'Doble hélice de ADN',
      description: 'La molécula que contiene la información genética',
      displaySize: '2 nm de ancho',
      base10Size: 2e-9,
      unit: 'nanómetro',
    },
    background: {
      image: null,
    }
  },
  {
    id: '3',
    sprite: {
      id: '3',
      image: 'virus.png',
      displayName: 'Virus (ej. ~100 nm)',
      description: 'Partícula infecciosa que necesita células para replicarse',
      displaySize: '100 nm',
      base10Size: 1e-7,
      unit: 'nanómetro',
    },
    background: {
      image: null,
    }
  },
  {
    id: '4',
    sprite: {
      id: '4',
      image: 'bacteria-ecoli.png',
      displayName: 'Bacteria E. coli',
      description: 'Bacteria típica de ~2 μm de largo',
      displaySize: '2 μm',
      base10Size: 2e-6,
      unit: 'micrómetro',
    },
    background: {
      image: null,
    }
  },
  {
    id: '5',
    sprite: {
      id: '5',
      image: 'globulo-rojo.png',
      displayName: 'Glóbulo rojo',
      description: 'Célula sanguínea encargada de transportar oxígeno',
      displaySize: '8 μm de diámetro',
      base10Size: 8e-6,
      unit: 'micrómetro',
    },
    background: {
      image: null,
    }
  },
  {
    id: '6',
    sprite: {
      id: '6',
      image: 'grano-arena.png',
      displayName: 'Grano de arena',
      description: 'Partícula mineral visible a simple vista',
      displaySize: '0.5 mm',
      base10Size: 5e-4,
      unit: 'milímetro',
    },
    background: {
      image: null,
    }
  },
  {
    id: '7',
    sprite: {
      id: '7',
      image: 'hormiga.png',
      displayName: 'Hormiga',
      description: 'Insecto social de unos milímetros',
      displaySize: '5 mm',
      base10Size: 5e-3,
      unit: 'milímetro',
    },
    background: {
      image: null,
    }
  },
  {
    id: '8',
    sprite: {
      id: '8',
      image: 'persona.png',
      displayName: 'Persona',
      description: 'Ser humano adulto promedio',
      displaySize: '1.75 m',
      isIndex: true,
      base10Size: 1.75,
      unit: 'metro',
    },
    background: {
      image: null,
    }
  },
  {
    id: '9',
    sprite: {
      id: '9',
      image: 'auto.png',
      displayName: 'Automóvil',
      description: 'Vehículo de uso cotidiano',
      displaySize: '4.5 m',
      base10Size: 4.5,
      unit: 'metro',
    },
    background: {
      image: null,
    }
  },
  {
    id: '10',
    sprite: {
      id: '10',
      image: 'obelisco-ba.png',
      displayName: 'Obelisco de \n Buenos Aires',
      description: 'Monumento icónico de la ciudad',
      displaySize: '67.5 m',
      base10Size: 67.5,
      unit: 'metro',
    },
    background: {
      image: null,
    }
  },
  {
    id: '11',
    sprite: {
      id: '11',
      image: 'manhattan.png',
      displayName: 'Isla de Manhattan',
      description: 'Isla urbana de referencia; longitud aproximada norte–sur',
      displaySize: '21.6 km',
      base10Size: 21600,
      unit: 'kilómetro',
    },
    background: {
      image: null,
    }
  },
  {
    id: '12',
    sprite: {
      id: '12',
      image: 'luna.png',
      displayName: 'La Luna',
      description: 'Satélite natural de la Tierra',
      displaySize: '3,474.8 km',
      base10Size: 3474.8,
      unit: 'kilómetro',
    },
    background: {
      image: 'universe.jpg',
    }
  },
  {
    id: '13',
    sprite: {
      id: '13',
      image: 'tierra.png',
      displayName: 'Planeta Tierra',
      description: 'El planeta donde vivimos',
      displaySize: '12,742 km',
      base10Size: 12742,
      unit: 'kilómetro',
    },
    background: {
      image: 'universe.jpg',
    }
  },
  {
    id: '14',
    sprite: {
      id: '14',
      image: 'jupiter.png',
      displayName: 'Júpiter',
      description: 'El planeta más grande del sistema solar',
      displaySize: '139,820 km',
      base10Size: 139820,
      unit: 'kilómetro',
    },
    background: {
      image: 'universe.jpg',
    }
  },
  {
    id: '15',
    sprite: {
      id: '15',
      image: 'sol.png',
      displayName: 'El Sol',
      description: 'Nuestra estrella, fuente principal de energía',
      displaySize: '1,392,700 km',
      base10Size: 1392700,
      unit: 'kilómetro',
    },
    background: {
      image: 'universe.jpg',
    }
  }
] as navigationData[];

