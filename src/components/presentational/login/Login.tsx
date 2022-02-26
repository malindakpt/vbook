import classes from './Login.module.scss';
import { Google } from './google/Google';
import { connect } from 'react-redux';

// import { MetaState } from '../../../types/interfaces/MetaState';
import { FC } from 'react';
// import { Dispatch } from '@reduxjs/toolkit';
// import { fetchName } from '../../../state/meta/metaSlice';
// @ts-ignore
import { RootState } from '../../../state/store';

export type LoginProps = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>;

const Login: FC<LoginProps> = () => {
  return (
    <div className={classes.red}>
      <Google />
    </div>
  );
};

const mapStateToProps = (state: RootState) => state.metaReducer;
//   return {
//     name: state.name
//   };
// };
// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   getName: () => dispatch(fetchName)
//   // fetchBlogs: (paginate, category, sortingby) => {
//   //   dispatch(fetchBlogs(paginate, category, sortingby));
//   // }
// });

export const mapDispatchToProps = {
  // dispatching actions returned by action creators
  // fetchName
  // decrement: () => dispatch(decrement()),
  // reset: () => dispatch(reset()),
};

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Login);
