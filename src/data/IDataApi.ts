export interface IDataApi {
  addObject<T>(obj: T): T;
  editObject<T>(id: string, obj: T): T;
  removeObject<T>(id: string): T;

  getObject<T>(id: string): T;
  getObjectList<T>(): T[];
  filterObjects<T>(filterProps: Record<string, any>): T;
}
