import classes from './Login.module.scss';
import { Google } from './google/Google';
import { connect } from 'react-redux';
import { MetaState } from '../../../types/interfaces/MetaState';
import { FC } from 'react';

export type LoginProps = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>;

const Login: FC<LoginProps> = (prop: LoginProps) => {
  return (
    <div className={classes.red}>
      {prop.name}
      <Google />
    </div>
  );
};

const mapStateToProps = (state: MetaState) => {
  return {
    name: state.name
  };
};
const mapDispatchToProps = {
  // fetchBlogs: (paginate, category, sortingby) => {
  //   dispatch(fetchBlogs(paginate, category, sortingby));
  // }
};

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Login);
