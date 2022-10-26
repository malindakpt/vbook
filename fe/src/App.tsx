import { useGetAllUsersQuery } from './state/api/user.api';
import { SignInContainer } from './components/signIn/signIn.container';
import { Route, Routes } from 'react-router-dom';

function App() {

const { data, isLoading } = useGetAllUsersQuery();

console.log(`loading: ${isLoading}   data: ${data}`);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<SignInContainer />} />
        <Route path="about" element={<div></div>} />
      </Routes>
    </div>
  );
}

export default App;
