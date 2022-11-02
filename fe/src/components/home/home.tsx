import { getAllUsers } from "../../state/api/userSlice"
import { useAppDispatch } from "../../state/store";

export const Home = () => {

    // const dispatch = useDispatch();
    const dispatch = useAppDispatch();

    const click = () => {
        dispatch(getAllUsers());
    }
    

    return <h1><button onClick={click}>Click</button>This is Home Component</h1>
}