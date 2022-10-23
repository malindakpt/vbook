import { FC } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { User } from '../../../../entities/User';
import { LoginSubProps } from '../Login';
import { ButtonLarge } from '../../../styled/ButtonLarge';

export const FaceBookLogin: FC<LoginSubProps> = ({ onLoginSuccess }) => {
  const responseFacebook = (e: any) => {
    console.log('facabook', e);
    onLoginSuccess(new User(e.id, e.email, e.name, 'facebook'));
  };
  return (
    <FacebookLogin
      appId="1180966182690354"
      autoLoad={false}
      fields="name,email,picture"
      // onClick={componentClicked}
      callback={responseFacebook}
      render={(renderProps) => (
        <ButtonLarge onClick={renderProps.onClick} color={'white'} backgroundColor={'#1259cc'}>
          FaceBook Login
        </ButtonLarge>
      )}
    />
  );
};
