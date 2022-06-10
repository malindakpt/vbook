import classes from './Login.module.scss';
import { Google } from './google/Google';
import { FaceBookLogin } from './facebook/FaceBookLogin';

export const Login = () => {
  return (
    <div className={classes.red}>
      <FaceBookLogin />
      <Google />
    </div>
  );
};
