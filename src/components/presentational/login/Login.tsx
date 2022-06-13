import { GoogleLogin } from './google/GoogleLogin';
import { FaceBookLogin } from './facebook/FaceBookLogin';
import { FaceBookLogin2 } from './facebook2/FaceBookLogin';
import { PasswordLogin } from './password/PasswordLogin';
import { FC, useEffect } from 'react';
import { Props } from './LoginContainer';

export const Login: FC<Props> = ({ isEnabled }) => {
  useEffect(() => {
    console.log(isEnabled);
  }, []);

  return (
    <div>
      <FaceBookLogin2 />
      <FaceBookLogin />
      <GoogleLogin />
      <PasswordLogin />
    </div>
  );
};
