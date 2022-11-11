import { useParams } from "react-router-dom";
import {
  useReadVehicleQuery,
  useUpdateVehicleMutation,
} from "../../../state/api/vehicle.api";
import { useAppSelector } from "../../../state/store";
import { Vehicle } from "../../../types/Vehicle";
import { ErrorComponent } from "../../error/error";
import { CreateVehicle } from "../create/createVehicle";

export const UpdateVehicleContainer = () => {
  const { id } = useParams();
  const user = useAppSelector((state) => state.app.user);
  const { data: vehicle, error, isLoading } = useReadVehicleQuery(id ?? "");
  const [updateVehicle, result] = useUpdateVehicleMutation();

  if (!user) {
    return <ErrorComponent text="User N/A" />;
  }

  const handleUpdateVehicle = (v: Vehicle) => {
    console.log("vehicle", v);
    updateVehicle(v);
  };

  if(isLoading){
    return <div>Loading.....</div>
  }

  if(!vehicle){
    return <div>Vehicle Not Found</div>
  }
  return (
    <CreateVehicle
      initialState={vehicle}
      onCreateVehicle={handleUpdateVehicle}
      loading={false}
      owner={user.identifier}
    />
  );
};
