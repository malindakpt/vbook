import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { User } from '../../../entities/User';
import { CustomLink } from '../../styled/CustomLink';
import { Props } from './TopBarContainer';

const Container = styled.div`
  position: absolute;
  top: 0px;
  display: flex;
  justify-content: start;
  background: #00baff;
  height: 31px;
  width: 100vw;
  padding: 10px;
  color: white;
`;

export const TopBar: FC<Props> = ({ user, logout }) => {
  const renderUser = (user: User) => {
    return (
      <div>
        <div>{user.email}</div>
        <div>{user.name}</div>
        <button onClick={logout}>Logout</button>
      </div>
    );
  };

  const renderWelCome = () => {
    return (
      <div>
        <CustomLink to="/login">Login</CustomLink>
      </div>
    );
  };

  return (
    <Container>
      <CustomLink to="/">Home</CustomLink>
      {user ? renderUser(user) : renderWelCome()}
    </Container>
  );
};
