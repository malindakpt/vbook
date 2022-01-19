import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Login from './components/presentational/login/Login';
import './config/firebase';
import { isMetaUpdated } from './config/util';
import { vehicleTypesAsync } from './state/meta/metaSlice';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('App');
    isMetaUpdated().then((isUpdated) => {
      console.log('metaUpdated:', isUpdated);
      if (isUpdated) {
        dispatch(vehicleTypesAsync());
      }
    });
  }, []);
  return (
    <div className="App">
      <Login />
    </div>
  );
};
