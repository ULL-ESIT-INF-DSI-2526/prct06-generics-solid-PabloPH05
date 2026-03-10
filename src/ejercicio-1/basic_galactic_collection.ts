import { GalacticEntity, GalacticRegistry } from './galactic_registry.js';

export abstract class BasicGalacticCollection<
  T extends GalacticEntity,
> implements GalacticRegistry<T> {
  protected entities: T[] = [];

  addEntity(entity: T): void {
    if (!this.is_valid(entity)) {
      throw new Error(`Not a valid entity (${entity.name})`);
    }
    this.entities.push(entity);
  }

  getAll(): T[] {
    return this.entities;
  }

  removeEntity(id: string): boolean {
    const index = this.entities.findIndex((ent) => ent.id === id);
    if (index !== -1) {
      this.entities.splice(index, 1);
      return true;
    }
    return false;
  }

  findByName(name: string): T[] {
    return this.entities.filter((ent) =>
      ent.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  protected abstract is_valid(ent: T): boolean;
}
