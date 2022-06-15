import { GoogleLogin } from './google/GoogleLogin';
import { FaceBookLogin } from './facebook/FaceBookLogin';
import { PasswordLogin } from './password/PasswordLogin';
import { FC } from 'react';
import { Props } from './LoginContainer';
import { User } from '../../../entities/User';
import classes from './Login.module.scss';

export const Login: FC<Props> = ({ setUser }) => {
  const handleLoginSuccess = (user: User) => {
    const { ...object } = user;
    setUser(object);
  };

  return (
    <div className={classes.container}>
      <div className={classes.loginTypes}>
        <FaceBookLogin onLoginSuccess={handleLoginSuccess} />
        <GoogleLogin />
        <PasswordLogin />
      </div>
    </div>
  );
};
