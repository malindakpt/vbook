import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useGetAllUsersQuery } from './state/api/user.api';

function App() {

const { data, isLoading } = useGetAllUsersQuery();

console.log(`loading: ${isLoading}   data: ${data}`);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>s
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
