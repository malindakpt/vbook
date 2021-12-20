// import { Login } from './components/presentational/login/Login';
import './config/firebase';
// import { useEffect } from 'react';
import im1 from './assets/animations/loader.json';
import im2 from './assets/animations/spinner.json';
import { Animation } from './components/presentational/animation/Animation';

export const App = () => {
  // useEffect(() => {

  // }, [])
  return (
    <div className="App">
      {/* <Login /> */}
      <Animation src={im1} />
      <Animation src={im2} />
    </div>
  );
};
