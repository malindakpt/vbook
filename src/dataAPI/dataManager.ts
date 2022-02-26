import { Dispatch } from '@reduxjs/toolkit';
import { isMetaAlreadyUpdated } from '../config/util';
// import { vehicleTypesAsync } from '../state/meta/metaSlice';
import { Entity } from './entity';
import { getDocumentsWithProps } from './firebaseAPI';

export const fetchMeta = (dispatch: Dispatch<any>) => {
  isMetaAlreadyUpdated().then((isUpdated) => {
    console.log('isMetaAlreadyUpdated:', isUpdated);
    if (!isUpdated) {
      // dispatch(vehicleTypesAsync(isUpdated));
    }
    getDocumentsWithProps(Entity.EXAMS, {}).then((data) => console.log(data));
  });
};
