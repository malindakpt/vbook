import classes from './Login.module.scss';
import { GoogleLogin } from './google/GoogleLogin';
import { FaceBookLogin } from './facebook/FaceBookLogin';

export const Login = () => {
  return (
    <div className={classes.red}>
      <FaceBookLogin />
      <GoogleLogin />
    </div>
  );
};
