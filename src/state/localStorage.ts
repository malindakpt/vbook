export class LocalStorage {
  public static META = 'META';
  public static STATE = 'STATE';

  public static persist = (key: string, state: any) => {
    const str = JSON.stringify(state);
    localStorage.setItem(key, str);
  };

  public static getState = () => {
    const str = localStorage.getItem(LocalStorage.STATE);
    return JSON.parse(str ?? '{}');
  };

  public static getString = (key: string) => {
    const str = localStorage.getItem(key);
    return str;
  };

  public static getObject = <T>(key: string): T | null => {
    const str = localStorage.getItem(key);
    if (str) {
      const obj: T = JSON.parse(str);
      return obj;
    }
    return null;
  };
}
