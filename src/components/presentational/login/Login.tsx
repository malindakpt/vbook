import { GoogleLogin } from './google/GoogleLogin';
import { FaceBookLogin } from './facebook/FaceBookLogin';

export const Login = () => {
  return (
    <div>
      <FaceBookLogin />
      <GoogleLogin />
    </div>
  );
};
