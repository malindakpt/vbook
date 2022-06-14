import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useEffect } from 'react';
import classes from './GoogleLogin.module.scss';
import logo from '../../../../assets/google.png';

const firebaseConfig = {
  apiKey: 'AIzaSyBPcsMrQkeoSX5wTT0WxmqsxLX5AEjrlQ8',
  authDomain: 'vbook-b1701.firebaseapp.com',
  projectId: 'vbook-b1701',
  storageBucket: 'vbook-b1701.appspot.com',
  messagingSenderId: '946448024007',
  appId: '1:946448024007:web:10853122b5ae31a8ea99e2',
  measurementId: 'G-H65G0C8BD6'
};

export const GoogleLogin = () => {
  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);

  const onLoginClick = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    auth.languageCode = 'it';
    // To apply the default browser preference instead of explicitly setting it.
    // firebase.auth().useDeviceLanguage();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...

        console.log('token', token);
        console.log('user', user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log('errorCode', errorCode);
        console.log('errorMessage', errorMessage);
        console.log('email', email);
        console.log('credential', credential);
      });
  };

  return (
    <div className={classes.box}>
      <button onClick={onLoginClick} className={classes.google}>
        <img src={logo}></img>Google Login
      </button>
    </div>
  );
};
