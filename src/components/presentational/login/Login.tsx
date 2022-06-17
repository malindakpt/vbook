import { GoogleLogin } from './google/GoogleLogin';
import { FaceBookLogin } from './facebook/FaceBookLogin';
import { PasswordLogin } from './password/PasswordLogin';
import { FC } from 'react';
import { Props } from './LoginContainer';
import { User } from '../../../entities/User';
import classes from './Login.module.scss';
import { ButtonLarge } from '../../styled/ButtonLarge';

export const Login: FC<Props> = ({ setUser, user }) => {
  const handleLoginSuccess = (user: User) => {
    const { ...object } = user;
    setUser(object);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className={classes.container}>
      {user ? (
        <ButtonLarge onClick={logout} color={'white'} backgroundColor={'#00baff'}>
          Logout
        </ButtonLarge>
      ) : (
        <div className={classes.loginTypes}>
          <FaceBookLogin onLoginSuccess={handleLoginSuccess} />
          <GoogleLogin onLoginSuccess={handleLoginSuccess} />
          <PasswordLogin />
        </div>
      )}
    </div>
  );
};

export interface LoginSubProps {
  onLoginSuccess: (user: User) => void;
}
