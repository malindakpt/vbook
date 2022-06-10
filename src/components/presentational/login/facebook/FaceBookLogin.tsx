// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

export const FaceBookLogin = () => {
  const responseFacebook = (e: any) => {
    console.log('facabook', e);
  };
  return (
    <div>
      <FacebookLogin
        appId="1180966182690354"
        autoLoad={false}
        fields="name,email,picture"
        // onClick={componentClicked}
        callback={responseFacebook}
        render={(renderProps) => (
          <button onClick={renderProps.onClick}>This is my custom FB button</button>
        )}
      />
    </div>
  );
};
