import { GoogleLogin } from './google/GoogleLogin';
import { FaceBookLogin } from './facebook/FaceBookLogin';
import { FaceBookLogin2 } from './facebook2/FaceBookLogin';
import { PasswordLogin } from './password/PasswordLogin';

export const Login = () => {
  return (
    <div>
      <FaceBookLogin2 />
      <FaceBookLogin />
      <GoogleLogin />
      <PasswordLogin />
    </div>
  );
};
