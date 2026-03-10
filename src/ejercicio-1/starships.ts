import { SearchByAffiliation, SearchByPlanet } from './atomic_interfaces.js';
import { BasicGalacticCollection } from './basic_galactic_collection.js';
import { Affiliation, GalacticEntity } from './galactic_registry.js';

export interface StarShip extends GalacticEntity {
  fuelLevel: number;
  isOperational: boolean;
}

export class StarShipCollection
  extends BasicGalacticCollection<StarShip>
  implements SearchByAffiliation<StarShip>, SearchByPlanet<StarShip>
{
  protected is_valid(item: StarShip) {
    return item.fuelLevel >= 85;
  }

  findByAffiliation(aff: Affiliation): StarShip[] {
    return this.entities.filter((ent) => ent.affiliation === aff);
  }

  findByPlanet(planet: string): StarShip[] {
    return this.entities.filter((ent) => ent.originPlanet === planet);
  }

  backHome(planet: string): void {
    this.findByPlanet(planet).forEach((ship) => {
      ship.fuelLevel -= 15;
      if (ship.fuelLevel < 5) ship.isOperational = false;
    });
  }

  readyToFight(): StarShip[] {
    return this.entities.filter((ent) => ent.isOperational);
  }
}
