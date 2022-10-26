import { SignIn } from './components/signIn/signIn';
import './App.css';
import { useGetAllUsersQuery } from './state/api/user.api';
import { SignInContainer } from './components/signIn/signIn.container';

function App() {

const { data, isLoading } = useGetAllUsersQuery();

console.log(`loading: ${isLoading}   data: ${data}`);

  return (
    <div className="App">
      <SignInContainer />
    </div>
  );
}

export default App;
