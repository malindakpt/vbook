import { LoginContainer } from "./components/login/login.container";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/home";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./state/store";
import { useEffect } from 'react';
import { fetchUser } from "./state/api/userSlice";

function App() {
  const loggedInUser = useSelector((state: RootState) => state.app.user);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="App">
      {loggedInUser ? (
        <Routes>
          <Route path={"/"} element={<Home />} />
        </Routes>
      ) : (
        <LoginContainer />
      )}
    </div>
  );
}

export default App;
