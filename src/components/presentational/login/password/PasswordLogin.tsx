import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { useState } from 'react';
import { Collapse } from 'antd';
import classes from './PasswordLogin.module.scss';
import styled from 'styled-components';
import { Input, Button } from 'antd';

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
export const PasswordLogin = () => {
  const { Panel } = Collapse;

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = () => {
    console.log(email, password);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const login = () => {
    console.log(email, password);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const resetPassword = () => {
    console.log(email, password);
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        console.log(userCredential);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <NoPadding>
      <Collapse
        defaultActiveKey={['1']}
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
          <Button block onClick={createUser}>
            Create User
          </Button>
          <Button block onClick={resetPassword} danger>
            Reset password for this email
          </Button>
        </Panel>
      </Collapse>
    </NoPadding>
  );
  // return (
  //   <Collapse defaultActiveKey={['1']}>
  //     <div>
  //       <div>Password login</div>
  //       <div>
  //         <input onChange={(e: any) => setEmail(e.target.value)} value={email}></input>
  //       </div>
  //       <div>
  //         <input
  //           onChange={(e: any) => setPassword(e.target.value)}
  //           value={password}
  //           type="password"></input>
  //       </div>
  //       <div>
  //         <button onClick={createUser}>Create User</button>
  //         <button onClick={resetPassword}>Reset Password</button>
  //         <button onClick={login}>Login</button>
  //       </div>
  //     </div>
  //   </Collapse>
  // );
};
