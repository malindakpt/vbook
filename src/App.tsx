import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Login from './components/presentational/login/Login';
import './config/firebase';
import { isMetaAlreadyUpdated } from './config/util';
import { vehicleTypesAsync } from './state/meta/metaSlice';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    isMetaAlreadyUpdated().then((isUpdated) => {
      console.log('metaUpdated:', isUpdated);
      if (!isUpdated) {
        dispatch(vehicleTypesAsync());
      }

      // addDocument(Entity.EXAMS, { a: 123 });
      // getDocumentsWithProps(Entity.EXAMS, {}).then((data) => console.log(data));
    });
  }, []);
  return (
    <div className="App">
      <Login />
    </div>
  );
};
