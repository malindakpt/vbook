import { Action, Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { AppState } from '../../../state/appSlice';
import { TopBar } from './TopBar';

// const mapStateToProps = (state: AppState) => {
//   return {
//     user: state.user
//   };
// };

const mapStateToProps = (state: AppState) => state.user;

const mapDispatchToProps = (dispatch: Dispatch<Action<unknown>>, ownProps: any) => {
  return {
    // setUser: (user: User) => dispatch(setUser(user))
  };
};

type Params = {
  // user: User;
};

export type Props = Params &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
