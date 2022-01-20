import { getMetaVersion } from '../dataAPI/metaAPI';
import { LocalStorage } from '../state/localStorage';
import { MetaState } from '../types/interfaces/MetaState';

export const isMetaAlreadyUpdated = () => {
  return new Promise((resolve) => {
    getMetaVersion()
      .then((serverVersion: string) => {
        const localMeta = LocalStorage.getObject<MetaState>(LocalStorage.META);

        if (localMeta && localMeta.version === serverVersion) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(() => {
        resolve(false);
      });
  });
};
