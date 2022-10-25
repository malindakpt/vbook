import { Avatar } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';
import { User } from '../../../entities/User';
import { CustomLink } from '../../styled/CustomLink';
import { Div100 } from '../../styled/Div100';
import { Props } from './TopBarContainer';

const Container = styled.div`
  position: absolute;
  top: 0px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center start;
  background: #00baff;
  height: 58px;
  width: 100vw;
  padding: 10px;
  color: white;
`;

const UserInfo = styled.div`
  grid-gap: 5px;
  grid-template-columns: auto 54px;
  width: 100%;
  display: grid;
  place-items: center end;
  text-align: end;
`;

export const TopBar: FC<Props> = ({ user, logout }) => {
  const renderUser = (user: User) => {
    return (
      <Div100>
        <UserInfo>
          <CustomLink to="/login">{user.name}</CustomLink>
          <Avatar size="large" style={{ backgroundColor: 'orange' }}>
            Sumudu
          </Avatar>
        </UserInfo>
      </Div100>
    );
  };

  const renderWelCome = () => {
    return (
      <div style={{ display: 'grid', placeItems: 'center end', width: '90%' }}>
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
