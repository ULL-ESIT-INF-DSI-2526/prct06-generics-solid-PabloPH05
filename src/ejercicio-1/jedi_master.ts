import {
  SearchByAffiliation,
  SearchByPlanet,
  SearchByPowerLevel,
} from './atomic_interfaces.js';
import { BasicGalacticCollection } from './basic_galactic_collection.js';
import { Affiliation, GalacticEntity } from './galactic_registry.js';

export interface JediMaster extends GalacticEntity {
  family: JediMaster[];
}

export class JediMasterCollection
  extends BasicGalacticCollection<JediMaster>
  implements
    SearchByAffiliation<JediMaster>,
    SearchByPowerLevel<JediMaster>,
    SearchByPlanet<JediMaster>
{
  protected is_valid(item: JediMaster) {
    return item.powerLevel > 5000;
  }

  findByAffiliation(aff: Affiliation): JediMaster[] {
    return this.entities.filter((ent) => ent.affiliation === aff);
  }

  findByPowerLevel(level: number): JediMaster[] {
    return this.entities.filter((ent) => ent.powerLevel === level);
  }

  findByPlanet(planet: string): JediMaster[] {
    return this.entities.filter((ent) => ent.originPlanet === planet);
  }

  findSonsOf(parent_name: string): JediMaster[] {
    return this.entities.filter((ent) =>
      ent.family.includes(this.findByName(parent_name)[0]),
    );
  }
}
