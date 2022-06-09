import SocialLogin from 'react-social-login';

export const SocialButton = (props1: any) => {
  const { children, triggerLogin, ...props } = props1;
  return (
    <button onClick={triggerLogin} {...props}>
      {children}
    </button>
  );
};

export default SocialLogin(SocialButton);
