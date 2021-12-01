import classes from './Login.module.scss';
import { Google } from './google/Google';

export const Login = () => {
  return (
    <div className={classes.red}>
      <Google />
    </div>
  );
};
