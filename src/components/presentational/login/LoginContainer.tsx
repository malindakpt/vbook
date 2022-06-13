import { Action, Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { AppState, setUser } from '../../../features/counter/appSlice';
import { Login } from './Login';

const mapStateToProps = (state: AppState) => {
  return {
    isLoggedIn: state.userName !== undefined
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action<unknown>>, ownProps: any) => {
  return {
    setUser: () => dispatch(setUser(ownProps.todoId))
  };
};

type Params = {
  isEnabled: boolean;
};

export type Props = Params &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
