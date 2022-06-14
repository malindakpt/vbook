import { GoogleLogin } from './google/GoogleLogin';
import { FaceBookLogin } from './facebook/FaceBookLogin';
import { PasswordLogin } from './password/PasswordLogin';
import { FC } from 'react';
import { Props } from './LoginContainer';
import { User } from '../../../entities/User';
import styled from 'styled-components';
import bg from '../../../assets/bg.jpg';

export const Login: FC<Props> = ({ setUser }) => {
  const handleLoginSuccess = (user: User) => {
    const { ...object } = user;
    setUser(object);
  };

  const Container = styled.div`
    background: url(${bg});
    background-repeat: no-repeat;
    background-size: 100vw calc(100vh);
    width: 100vw;
    height: 100vh;
  `;

  return (
    <Container>
      <FaceBookLogin onLoginSuccess={handleLoginSuccess} />
      <GoogleLogin />
      <PasswordLogin />
    </Container>
  );
};
