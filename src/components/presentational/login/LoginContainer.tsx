import { Action, Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { User } from '../../../entities/User';
import { AppState, setUser } from '../../../state/appSlice';
import { Login } from './Login';

const mapStateToProps = (state: AppState) => {
  return {
    isLoggedIn: state.user !== undefined
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action<unknown>>, ownProps: any) => {
  return {
    setUser: (user: User) => dispatch(setUser(user))
  };
};

type Params = {
  isEnabled: boolean;
};

export type Props = Params &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
