import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { logout } from "../../state/thunks";
import { TopBar } from "./topbar"

export const TopBarContainer = () => {

    const name = useAppSelector((state) => state.app.user?.name) ?? '';
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSpeedDial = (path: string) => {
        navigate(`/createVehicle`);
    };

    const handleLogout = () => {
        dispatch(logout());
    }
    return <TopBar userName={name} onSpeedDial={handleSpeedDial} onLogout={handleLogout} />
}