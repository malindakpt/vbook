import { LoginContainer } from "./components/login/login.container";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/home";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./state/store";
import { useEffect } from "react";
import { PopupContainer } from "./components/popup/popup.container";
import { User } from "./types/User";
import { setUser } from "./state/api/userSlice";
import { TopBarContainer } from "./components/topbar/topbar.container";

function App() {
  const loggedInUser = useSelector((state: RootState) => state.app.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cachedUser = User.getUserFromCookie();
    if (cachedUser) {
      dispatch(setUser(cachedUser));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <PopupContainer />
      {loggedInUser ? (
        <>
          <TopBarContainer />
          <Routes>
            <Route path={"/"} element={<Home />} />
          </Routes>
        </>
      ) : (
        <LoginContainer />
      )}
    </div>
  );
}

export default App;
