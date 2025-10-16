import { navigationData } from "@common/types/navigation.type";

export const mockupData = [
  {
    id: '1',
    sprite: {
      id: '1',
      image: 'atomo.png',
      displayName: 'Átomo de hidrógeno',
      description: 'Unidad básica de la materia: un protón con un electrón orbitando',
      displaySize: '0.1 nm',
      unit: 'nanómetro',
      base10Size: 1e-10,
      isIndex: false
    },
    background: { image: null }
  },
  {
    id: '2',
    sprite: {
      id: '2',
      image: 'virus.png',
      displayName: 'Virus',
      description: 'Partícula biológica típica del orden de los 100 nm',
      displaySize: '100 nm',
      unit: 'nanómetro',
      base10Size: 1e-7
    },
    background: { image: null }
  },
  {
    id: '3',
    sprite: {
      id: '3',
      image: 'arena.png',
      displayName: 'Grano de arena',
      description: 'Partícula mineral visible a simple vista',
      displaySize: '0.5 mm',
      unit: 'milímetro',
      base10Size: 5e-4
    },
    background: { image: "universe.jpg" }
  },
  {
    id: '4',
    sprite: {
      id: '4',
      image: 'Alfajon Habanna.png',
      displayName: 'Alfajor',
      description: 'Galleta rellena típica',
      displaySize: '6 cm de diámetro',
      unit: 'metro',
      base10Size: 0.06
    },
    background: { image: null }
  },
  {
    id: '5',
    sprite: {
      id: '5',
      image: 'Pelota de Playa.png',
      displayName: 'Pelota de playa',
      description: 'Esfera inflable de uso recreativo',
      displaySize: '40 cm de diámetro',
      unit: 'metro',
      base10Size: 0.4
    },
    background: { image: null }
  },
  {
    id: '6',
    sprite: {
      id: '6',
      image: 'mate.png',
      displayName: 'Mate',
      description: 'Recipiente para infusión típica rioplatense',
      displaySize: '12 cm de alto',
      unit: 'metro',
      base10Size: 0.12
    },
    background: { image: null }
  },
  {
    id: '7',
    sprite: {
      id: '7',
      image: 'Humano.png',
      displayName: 'Persona',
      description: 'Ser humano adulto promedio',
      displaySize: '1.75 m',
      unit: 'metro',
      base10Size: 1.75,
      isIndex: true
    },
    background: { image: null }
  },
  {
    id: '8',
    sprite: {
      id: '8',
      image: 'omnibus.png',
      displayName: 'Ómnibus',
      description: 'Vehículo de transporte de pasajeros',
      displaySize: '12 m',
      unit: 'metro',
      base10Size: 12
    },
    background: { image: null }
  },
  {
    id: '9',
    sprite: {
      id: '9',
      image: 'estacion internacional.png',
      displayName: 'Estación Espacial Internacional',
      description: 'Complejo orbital tripulado',
      displaySize: '109 m (envergadura)',
      unit: 'metro',
      base10Size: 109
    },
    background: { image: 'universe.jpg' }
  },
  {
    id: '10',
    sprite: {
      id: '10',
      image: 'luna.png',
      displayName: 'La Luna',
      description: 'Satélite natural de la Tierra (diámetro)',
      displaySize: '3,474.8 km',
      unit: 'kilómetro',
      base10Size: 3474.8
    },
    background: { image: 'universe.jpg' }
  },
  {
    id: '11',
    sprite: {
      id: '11',
      image: 'tierra.png',
      displayName: 'Planeta Tierra',
      description: 'Nuestro planeta (diámetro ecuatorial)',
      displaySize: '12,742 km',
      unit: 'kilómetro',
      base10Size: 12742
    },
    background: { image: 'universe.jpg' }
  },
  {
    id: '12',
    sprite: {
      id: '12',
      image: 'marte.png',
      displayName: 'Marte',
      description: 'Planeta rocoso (diámetro)',
      displaySize: '6,779 km',
      unit: 'kilómetro',
      base10Size: 6779
    },
    background: { image: 'universe.jpg' }
  },
  {
    id: '13',
    sprite: {
      id: '13',
      image: 'jupiter.png',
      displayName: 'Júpiter',
      description: 'El planeta más grande (diámetro ecuatorial)',
      displaySize: '139,820 km',
      unit: 'kilómetro',
      base10Size: 139820
    },
    background: { image: 'universe.jpg' }
  },
  {
    id: '14',
    sprite: {
      id: '14',
      image: 'saturno.png',
      displayName: 'Saturno',
      description: 'Gigante gaseoso (diámetro ecuatorial)',
      displaySize: '116,460 km',
      unit: 'kilómetro',
      base10Size: 116460
    },
    background: { image: 'universe.jpg' }
  }
] as navigationData[];

