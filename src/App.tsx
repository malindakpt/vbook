import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Login from './components/presentational/login/Login';
import './config/firebase';
import { vehicleTypesAsync } from './state/meta/metaSlice';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('App');
    dispatch(vehicleTypesAsync());
  }, []);
  return (
    <div className="App">
      <Login />
    </div>
  );
};
