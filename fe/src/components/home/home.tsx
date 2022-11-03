import { getAllUsers, refreshToken } from "../../state/api/userSlice"
import { useAppDispatch } from "../../state/store";

export const Home = () => {

    // const dispatch = useDispatch();
    const dispatch = useAppDispatch();

    const click = () => {
        dispatch(getAllUsers());
    }

    const handleRefreshToken = () => {
        dispatch(refreshToken());
    }
    

    return <h1><button onClick={click}>Get All Users</button><button onClick={handleRefreshToken}>Refresh</button>This is Home Component</h1>
}