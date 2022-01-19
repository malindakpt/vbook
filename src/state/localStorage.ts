export class LocalStorage {
  public static META_VERSION = 'META_VERSION';
  public static STATE = 'STATE';

  public static persist = (state: any) => {
    const str = JSON.stringify(state);
    localStorage.setItem(LocalStorage.STATE, str);
  };

  public static getState = () => {
    const str = localStorage.getItem(LocalStorage.STATE);
    return JSON.parse(str ?? '{}');
  };

  public static getString = (key: string) => {
    const str = localStorage.getItem(key);
    return str;
  };
}
