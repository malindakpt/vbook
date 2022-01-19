import { getMetaVersion } from '../dataAPI/metaAPI';
import { LocalStorage } from '../state/localStorage';

export const isMetaUpdated = () => {
  return new Promise((resolve) => {
    getMetaVersion()
      .then((latestVersion: string) => {
        const storedVersion = LocalStorage.getString(LocalStorage.META_VERSION) ?? '';
        if (storedVersion < latestVersion) {
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
