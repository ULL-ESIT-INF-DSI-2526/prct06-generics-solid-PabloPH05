import { Affiliation } from './galactic_registry.js';

export interface SearchByName<T> {
  findByName(name: string): T[];
}

export interface SearchByAffiliation<T> {
  findByAffiliation(aff: Affiliation): T[];
}

export interface SearchByPowerLevel<T> {
  findByPowerLevel(level: number): T[];
}

export interface SearchByYear<T> {
  findByYear(year: number): T[];
}
export interface SearchByPlanet<T> {
  findByPlanet(planet: string): T[];
}
