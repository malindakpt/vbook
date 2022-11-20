import { useNavigate } from "react-router-dom";
import { useLazySearchVehiclesQuery } from "../../state/api/vehicle.api";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { logout } from "../../state/thunks";
import { TopBar } from "./topbar"

export const TopBarContainer = () => {

    const user = useAppSelector((state) => state.app.user);
    const [trigger] = useLazySearchVehiclesQuery();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    const handleLogout = () => {
        dispatch(logout());
    }

    const handleSearch = (key: string) => {
        trigger({key});
    }

    if(!user){
        return <></>;
    }

    return <TopBar onMenuClick={handleNavigate} onSearch={handleSearch} onLogout={handleLogout}/>
}