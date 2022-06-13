import { FC } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../../entities/User';
import { Props } from './TopBarContainer';

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
        Welcome!{' '}
        <div>
          <Link to="/login">Login</Link>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Link to="/">Home</Link>
      {user ? renderUser(user) : renderWelCome()}
    </div>
  );
};
