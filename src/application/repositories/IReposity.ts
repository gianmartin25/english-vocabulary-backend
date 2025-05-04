export interface IReposity<T> {
  create(entity: T): Promise<T>;
  findById(id: number): Promise<T>;
  findAll(): Promise<T[]>;
}
