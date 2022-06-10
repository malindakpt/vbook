import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { useState } from 'react';

export const PasswordLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = () => {
    console.log(email, password);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const login = () => {
    console.log(email, password);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const resetPassword = () => {
    console.log(email, password);
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        console.log(userCredential);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div>
      <div>Password login</div>
      <div>
        <input onChange={(e: any) => setEmail(e.target.value)} value={email}></input>
      </div>
      <div>
        <input
          onChange={(e: any) => setPassword(e.target.value)}
          value={password}
          type="password"></input>
      </div>
      <div>
        <button onClick={createUser}>Create User</button>
        <button onClick={resetPassword}>Reset Password</button>
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
};
