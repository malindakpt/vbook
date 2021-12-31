export enum StorageKeys {
  // eslint-disable-next-line no-unused-vars
  STATE = 'STATE'
}

export const persist = (state: any) => {
  const str = JSON.stringify(state);
  localStorage.setItem(StorageKeys.STATE, str);
};

export const getState = () => {
  const str = localStorage.getItem(StorageKeys.STATE);
  return JSON.parse(str ?? '{}');
};
