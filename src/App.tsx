/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Login from './components/presentational/login/Login';
import './config/firebase';
import { useGetPokemonByNameQuery, useGetPostQuery } from './state/services/pokemon';
// import { useGetPokemonByNameQuery } from './dataAPI/query/PaymentApi';
// import { isMetaAlreadyUpdated } from './config/util';
// import { Entity } from './dataAPI/entity';
// import { addDocument, getDocumentsWithProps } from './dataAPI/firebaseAPI';
// import { vehicleTypesAsync } from './state/meta/metaSlice';

export const App = () => {
  // const dispatch = useDispatch();
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');
  const { data: data2, error: error2, isLoading: isLoading2 } = useGetPostQuery(12, {});
  useEffect(() => {
    console.log('useEffect');
  }, []);
  return (
    <div className="App">
      <h1>My application2</h1>
      <div>isLoading: {isLoading2}</div>
      <div>error: {error2}</div>
      <div>Data: {JSON.stringify(data2)}</div>

      <h1>My application</h1>
      <div>isLoading: {isLoading}</div>
      <div>error: {error}</div>
      <div>Data: {JSON.stringify(data)}</div>
    </div>
  );
};
