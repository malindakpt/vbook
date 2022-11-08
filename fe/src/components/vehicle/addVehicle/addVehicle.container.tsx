import { useAppSelector } from "../../../state/store";
import { ErrorComponent } from "../../error/error";
import { AddVehicle } from "./addVehicle"

export const AddVehicleContainer = () => {
    const loading = useAppSelector((state) => state.app.addVehicle.loading);
    const user = useAppSelector((state) => state.app.user);

    if(!user) {
        return <ErrorComponent text="User N/A" />
    }
    
    return <AddVehicle loading={loading} owner={user.identifier} />
}