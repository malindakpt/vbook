/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Login from './components/presentational/login/Login';
import './config/firebase';
import { useGetPokemonByNameQuery, useGetPostQuery } from './state/services/pokemon';

export const App = () => {
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
    </div>
  );
};
