import { SignIn } from './components/signIn/signIn';
import './App.css';
import { useGetAllUsersQuery } from './state/api/user.api';

function App() {

const { data, isLoading } = useGetAllUsersQuery();

console.log(`loading: ${isLoading}   data: ${data}`);

  return (
    <div className="App">
      <SignIn />
    </div>
  );
}

export default App;
