import { useCreateVehicleMutation } from "../../../state/api/vehicle.api";
import { useAppSelector } from "../../../state/store";
import { Vehicle } from "../../../types/Vehicle";
import { ErrorComponent } from "../../error/error";
import { CreateVehicle } from "./createVehicle"

export const CreateVehicleContainer = () => {
    // const loading = useAppSelector((state) => state.app.addVehicle.loading);
    const user = useAppSelector((state) => state.app.user);
    const [ createVehicle, result ] = useCreateVehicleMutation()

    if(!user) {
        return <ErrorComponent text="User N/A" />
    }
    

    const handleCreateVehicle = (v: Vehicle) => {
        console.log('vehicle', v);
        createVehicle(v);
    }
   


    return <CreateVehicle onCreateVehicle={handleCreateVehicle} loading={false} owner={user.identifier} />
}