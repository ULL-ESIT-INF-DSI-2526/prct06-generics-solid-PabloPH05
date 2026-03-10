import { Affiliation } from '../../src/ejercicio-1/galactic_registry';
import { describe, test, expect, beforeEach } from 'vitest';
import { StarShipCollection, StarShip } from '../../src/ejercicio-1/starships';

describe('StarShipCollection', () => {
  let collection: StarShipCollection;
  let xWing: StarShip;
  let falcon: StarShip;

  beforeEach(() => {
    collection = new StarShipCollection();

    xWing = {
      id: 'S1',
      name: 'X-Wing Fighter',
      affiliation: Affiliation.Republica,
      powerLevel: 300,
      constructionYear: 1010,
      originPlanet: 'Coruscant',
      fuelLevel: 100, // Válida (>= 85)
      isOperational: true,
    };

    falcon = {
      id: 'S2',
      name: 'Millennium Falcon',
      affiliation: Affiliation.Independiente,
      powerLevel: 800,
      constructionYear: 990,
      originPlanet: 'Corellia',
      fuelLevel: 90, // Válida (>= 85)
      isOperational: true,
    };
  });

  test('el método backHome debe reducir el combustible en 15 a las naves del planeta indicado', () => {
    collection.addEntity(xWing); // 100 de combustible
    collection.backHome('Coruscant');

    const ships = collection.findByPlanet('Coruscant');
    expect(ships[0].fuelLevel).toBe(85); // 100 - 15
    expect(ships[0].isOperational).toBe(true); // Sigue operativa
  });

  test('el método backHome debe cambiar isOperational a false si el combustible baja de 5', () => {
    // Creamos una nave que justo pasará la validación
    const riskyShip: StarShip = {
      ...xWing,
      id: 'S4',
      name: 'Risky Ship',
      fuelLevel: 85,
      isOperational: true,
    };
    collection.addEntity(riskyShip);

    // 85 - (15 * 6) = -5. A la sexta vez, el nivel de fuel será < 5.
    for (let i = 0; i < 6; i++) {
      collection.backHome('Coruscant');
    }

    const updatedShip = collection.findByName('Risky Ship')[0];
    expect(updatedShip.fuelLevel).toBe(-5);
    expect(updatedShip.isOperational).toBe(false);
  });

  test('el método readyToFight debe devolver solo las naves operativas', () => {
    const brokenShip: StarShip = {
      ...falcon,
      id: 'S5',
      name: 'Broken Falcon',
      fuelLevel: 90,
      isOperational: false, // Añadida como no operativa directamente
    };

    collection.addEntity(xWing); // Operativa
    collection.addEntity(brokenShip); // No operativa

    const readyShips = collection.readyToFight();

    expect(readyShips).toHaveLength(1);
    expect(readyShips[0].name).toBe('X-Wing Fighter');
  });
});
