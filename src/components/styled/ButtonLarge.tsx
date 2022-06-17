// import button from 'antd/lib/button';
import styled from 'styled-components';

export const ButtonLarge: any = styled.button`
  width: 300px;
  height: 42px;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${(props: any) => (props.color ? props.color : 'white')};
  background-color: ${(props: any) => (props.backgroundColor ? props.backgroundColor : 'grey')};
`;
