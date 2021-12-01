import { Login } from './components/presentational/login/Login';
import './config/firebase';
// import { useEffect } from 'react';

export const App = () => {
  // useEffect(() => {

  // }, [])
  return (
    <div className="App">
      <Login />
    </div>
  );
};
