import classes from './Login.module.scss';
import SocialButton from '../../hoc/socialButton';

export const Login = () => {
  const handleSocialLogin = (user: any) => {
    console.log(user);
  };

  const handleSocialLoginFailure = (err: any) => {
    console.error(err);
  };

  return (
    <div className={classes.red}>
      <SocialButton
        provider="facebook"
        appId="YOUR_APP_ID"
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}>
        Login with Facebook
      </SocialButton>
    </div>
  );
};
