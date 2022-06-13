import { FC } from 'react';
import { Props } from './TopBarContainer';

export const TopBar: FC<Props> = ({ id }) => {
  return <div>User: {id}</div>;
};
