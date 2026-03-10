import { SearchByName } from './atomic_interfaces.js';

export enum Affiliation {
  Republica,
  Imperio,
  Sith,
  Independiente,
}

export interface GalacticEntity {
  id: string;
  name: string;
  affiliation: Affiliation;
  powerLevel: number;
  constructionYear: number;
  originPlanet: string;
}

export interface GalacticRegistry<
  T extends GalacticEntity,
> extends SearchByName<T> {
  addEntity(entity: T): void;
  removeEntity(id: string): boolean;
  getAll(): T[];
}
