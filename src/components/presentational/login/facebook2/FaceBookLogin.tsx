import { getAuth, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';

export const FaceBookLogin2 = () => {
  const loginFacebook = (e: any) => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);

        if (credential) {
          const accessToken = credential.accessToken;
          console.log(result);
        } else {
          console.log('No credential');
        }

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };
  return (
    <div>
      <button onClick={loginFacebook}>TFB Google</button>
    </div>
  );
};
