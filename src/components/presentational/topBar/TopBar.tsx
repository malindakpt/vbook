import { FC } from 'react';
import { Props } from './TopBarContainer';

export const TopBar: FC<Props> = ({ user }) => {
  return <div>User: {user?.id}</div>;
};
