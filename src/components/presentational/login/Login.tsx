import classes from './Login.module.scss';
// import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

export const Login = () => {
  const loginWithGoogle = () => {
    const auth = getAuth();
    auth.languageCode = 'it';
  };

  return (
    <div className={classes.red}>
      Login
      <button onClick={loginWithGoogle}>Login</button>
    </div>
  );
};
