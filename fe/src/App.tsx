import { SignInContainer } from './components/signIn/signIn.container';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/home/home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<SignInContainer />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
