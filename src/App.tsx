/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Login from './components/presentational/login/Login';
import './config/firebase';
import { useGetPokemonByNameQuery } from './state/services/pokemon';
// import { useGetPokemonByNameQuery } from './dataAPI/query/PaymentApi';
// import { isMetaAlreadyUpdated } from './config/util';
// import { Entity } from './dataAPI/entity';
// import { addDocument, getDocumentsWithProps } from './dataAPI/firebaseAPI';
// import { vehicleTypesAsync } from './state/meta/metaSlice';

export const App = () => {
  // const dispatch = useDispatch();
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');
  useEffect(() => {
    // const { data, error, isLoading } = useGetDataQuery();
    // console.log(data);
    // console.log(error);
    // console.log(isLoading);
    // dispatch(vehicleTypesAsync());
    // isMetaAlreadyUpdated().then((isUpdated) => {
    //   console.log('isMetaAlreadyUpdated:', isUpdated);
    //   if (!isUpdated) {
    //     dispatch(vehicleTypesAsync());
    //   }
    //   // addDocument(Entity.EXAMS, { a: 123 });
    //   getDocumentsWithProps(Entity.EXAMS, {}).then((data) => console.log(data));
    // });
  }, []);
  return (
    <div className="App">
      <h1>My application</h1>
      <div>isLoading: {isLoading}</div>
      <div>error: {error}</div>
      <div>Data: {JSON.stringify(data)}</div>
    </div>
  );
};
