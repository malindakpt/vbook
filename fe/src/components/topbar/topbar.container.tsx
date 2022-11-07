import { useAppDispatch, useAppSelector } from "../../state/store";
import { TopBar } from "./topbar"

export const TopBarContainer = () => {

    const dispatch = useAppDispatch();
    const name = useAppSelector((state) => state.app.user?.name) ?? '';
    
    return <TopBar userName={name} />
}