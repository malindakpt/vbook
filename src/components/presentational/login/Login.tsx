import { GoogleLogin } from './google/GoogleLogin';
import { FaceBookLogin } from './facebook/FaceBookLogin';
import { FaceBookLogin2 } from './facebook2/FaceBookLogin';
import { PasswordLogin } from './password/PasswordLogin';
import { FC, useEffect } from 'react';
import { Props } from './LoginContainer';
import { User } from '../../../entities/User';

export const Login: FC<Props> = ({ isEnabled, setUser }) => {
  useEffect(() => {
    console.log(isEnabled);
  }, []);

  const handleLoginSuccess = (user: User) => {
    const { ...object } = user;
    setUser(object);
  };

  return (
    <div>
      {/* <FaceBookLogin2 /> */}
      <FaceBookLogin onLoginSuccess={handleLoginSuccess} />
      <GoogleLogin />
      <PasswordLogin />
    </div>
  );
};
