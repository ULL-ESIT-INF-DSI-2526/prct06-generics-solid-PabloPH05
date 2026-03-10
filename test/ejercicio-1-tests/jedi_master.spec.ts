import {
  JediMasterCollection,
  JediMaster,
} from '../../src/ejercicio-1/jedi_master'; // Ajusta la ruta
import { Affiliation } from '../../src/ejercicio-1/galactic_registry'; // Ajusta la ruta
import { describe, test, expect, beforeEach } from 'vitest';

describe('JediMasterCollection', () => {
  let collection: JediMasterCollection;
  let anakin: JediMaster;
  let luke: JediMaster;
  let weakJedi: JediMaster;

  beforeEach(() => {
    collection = new JediMasterCollection();

    // Necesitamos parchear 'entities' aquí si no lo has inicializado en tu clase base:
    // collection['entities'] = [];

    anakin = {
      id: '1',
      name: 'Anakin Skywalker',
      affiliation: Affiliation.Republica,
      powerLevel: 9000,
      constructionYear: 1000, // Por dar un valor
      originPlanet: 'Tatooine',
      family: [],
    };

    luke = {
      id: '2',
      name: 'Luke Skywalker',
      affiliation: Affiliation.Independiente,
      powerLevel: 8500,
      constructionYear: 1020,
      originPlanet: 'Tatooine',
      family: [anakin], // Anakin es su familia (padre)
    };

    weakJedi = {
      id: '3',
      name: 'Youngling',
      affiliation: Affiliation.Republica,
      powerLevel: 2000, // < 5000, debería fallar
      constructionYear: 1040,
      originPlanet: 'Coruscant',
      family: [],
    };
  });

  test('debe añadir un maestro Jedi correctamente si es válido', () => {
    collection.addEntity(anakin);
    const all = collection.getAll();
    expect(all).toHaveLength(1);
    expect(all[0].name).toBe('Anakin Skywalker');
  });

  test('debe lanzar un error al intentar añadir un Jedi con powerLevel insuficiente', () => {
    expect(() => {
      collection.addEntity(weakJedi);
    }).toThrow(`Not a valid entity (${weakJedi.name})`);

    expect(collection.getAll()).toHaveLength(0);
  });

  test('debe eliminar un maestro Jedi existente por su ID', () => {
    collection.addEntity(anakin);
    const result = collection.removeEntity('1');

    expect(result).toBe(true);
    expect(collection.getAll()).toHaveLength(0);
  });

  test('debe devolver false si se intenta eliminar un ID que no existe', () => {
    collection.addEntity(anakin);
    const result = collection.removeEntity('999');

    expect(result).toBe(false);
    expect(collection.getAll()).toHaveLength(1);
  });

  test('debe encontrar a un Jedi por su nombre ignorando mayúsculas y minúsculas', () => {
    collection.addEntity(anakin);
    collection.addEntity(luke);

    const result = collection.findByName('skywalker');
    expect(result).toHaveLength(2);

    const resultLuke = collection.findByName('luke');
    expect(resultLuke).toHaveLength(1);
    expect(resultLuke[0].id).toBe('2');
  });

  test('debe encontrar Jedi por su afiliación', () => {
    collection.addEntity(anakin);
    collection.addEntity(luke);

    const republicJedi = collection.findByAffiliation(Affiliation.Republica);
    expect(republicJedi).toHaveLength(1);
    expect(republicJedi[0].name).toBe('Anakin Skywalker');
  });

  test('debe encontrar Jedi por su planeta de origen', () => {
    collection.addEntity(anakin);
    collection.addEntity(luke);

    const tatooineJedi = collection.findByPlanet('Tatooine');
    expect(tatooineJedi).toHaveLength(2);
  });

  test('debe encontrar a los descendientes/familia de un Jedi usando findSonsOf', () => {
    collection.addEntity(anakin);
    collection.addEntity(luke);

    const sonsOfAnakin = collection.findSonsOf('Anakin Skywalker');
    expect(sonsOfAnakin).toHaveLength(1);
    expect(sonsOfAnakin[0].name).toBe('Luke Skywalker');
  });
});
