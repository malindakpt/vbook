import { SignInContainer } from "./components/signIn/signIn.container";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/home";
import { useSelector } from "react-redux";
import { user } from "./state/api/app";

function App() {
  const loggedIn = useSelector(user);

  return (
    <div className="App">
      {loggedIn ? (
        <Routes>
          <Route path={"/"} element={<Home />} />
        </Routes>
      ) : (
        <SignInContainer />
      )}
    </div>
  );
}

export default App;
