import { SignInContainer } from "./components/signIn/signIn.container";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/home";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";

function App() {
  const loggedInUser = useSelector((state: RootState) => state.app.user);

  return (
    <div className="App">
      {loggedInUser ? (
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
