import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { logout } from "../../state/thunks";
import { TopBar } from "./topbar"

export const TopBarContainer = () => {

    const user = useAppSelector((state) => state.app.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    const handleLogout = () => {
        dispatch(logout());
    }

    if(!user){
        return <></>;
    }

    return <TopBar onMenuClick={handleNavigate} onLogout={handleLogout}/>
}