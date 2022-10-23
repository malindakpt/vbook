import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { FC, useState } from 'react';
import { Collapse } from 'antd';
import classes from './PasswordLogin.module.scss';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { getEmailError, getEmailOrPasswordError } from './util';
import { showError, showInfo } from '../../../../util/util';
import { LoginSubProps } from '../Login';
import { User } from '../../../../entities/User';

const NoPadding = styled.div`
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 0px 10px;
    background: #42904c;
    color: white;
    font-size: 20px;
    height: 42px;
    display: grid;
    place-items: center;
  }
`;
export const PasswordLogin: FC<LoginSubProps> = ({ onLoginSuccess }) => {
  const { Panel } = Collapse;

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = () => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        showInfo('A new user is added. Please login');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showError(errorMessage);
        // ..
      });
  };

  const login = () => {
    const error = getEmailOrPasswordError(email, password);

    if (error) {
      showError(error);
    } else {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          if (user.email) {
            const newUser = new User(
              user.uid,
              user.email,
              user.displayName ?? user.email,
              'google'
            );
            onLoginSuccess(newUser);
          } else {
            showError('This user does not include an email');
          }
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          showError(errorMessage);
          // ..
        });
    }
  };

  const resetPassword = () => {
    const error = getEmailError(email);

    if (error) {
      showError(error);
    } else {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then((userCredential) => {
          // Signed in
          // const user = userCredential.user;
          console.log(userCredential);
          showInfo('Password reset email sent. Please check your email inbox/spam/junk');
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          showError(errorMessage);
          // ..
        });
    }
  };

  return (
    <NoPadding>
      <Collapse
        onChange={onChange}
        bordered={false}
        style={{ height: '42px', background: '#42904c' }}
        className={classes.container}
        expandIcon={() => <div></div>}>
        <Panel key="1" header="Own Account" showArrow={false} className={classes.panel}>
          <Input
            placeholder="Enter Your Email"
            onChange={(e: any) => setEmail(e.target.value)}
            value={email}></Input>
          <Input
            placeholder="Enter Your Password"
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
            type="password"></Input>
          <Button block onClick={login} type="primary">
            Login
          </Button>
          <Button type="link" block onClick={createUser}>
            Create User
          </Button>
          <Button type="link" block onClick={resetPassword} danger>
            Reset password for this email
          </Button>
        </Panel>
      </Collapse>
    </NoPadding>
  );
};
