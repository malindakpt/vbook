import { IDataApi } from '../IDataApi';

export class DataApi implements IDataApi {
  addObject<T>(obj: T): T {
    throw new Error('Method not implemented.');
  }
  editObject<T>(id: string, obj: T): T {
    throw new Error('Method not implemented.');
  }
  removeObject<T>(id: string): T {
    throw new Error('Method not implemented.');
  }
  getObject<T>(id: string): T {
    throw new Error('Method not implemented.');
  }
  getObjectList<T>(): T[] {
    throw new Error('Method not implemented.');
  }
  filterObjects<T>(filterProps: Record<string, any>): T {
    throw new Error('Method not implemented.');
  }
}
