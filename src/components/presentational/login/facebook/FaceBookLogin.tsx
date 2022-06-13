// import FacebookLogin from 'react-facebook-login';
import { FC } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { User } from '../../../../entities/User';

interface Props {
  onLoginSuccess: (user: User) => void;
}
export const FaceBookLogin: FC<Props> = ({ onLoginSuccess }) => {
  const responseFacebook = (e: any) => {
    console.log('facabook', e);
    onLoginSuccess(new User(e.id, e.email, e.name));
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
