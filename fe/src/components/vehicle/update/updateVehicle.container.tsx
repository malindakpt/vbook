import { useNavigate, useParams } from "react-router-dom";
import {
  useReadVehicleQuery,
  useUpdateVehicleMutation,
} from "../../../state/api/vehicle.api";
import { useAppSelector } from "../../../state/store";
import { Vehicle } from "../../../types/Vehicle";
import { ErrorComponent } from "../../error/error";
import { CreateVehicle } from "../create/createVehicle";

export const UpdateVehicleContainer = () => {
  const { vid } = useParams();
  const user = useAppSelector((state) => state.app.user);
  const navigate = useNavigate();
  const { data: vehicle, error, isLoading } = useReadVehicleQuery(vid ?? "");
  const [updateVehicle, result] = useUpdateVehicleMutation();



  const handleUpdateVehicle = async (v: Vehicle) => {
    const result: any = await updateVehicle(v);
    if(!result.error){
      navigate(`/vehicle/${v.id}`);
    }
  };

  if (!user?.id) {
    return <ErrorComponent text="User N/A" />;
  }
  
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
      userId={user.id}
    />
  );
};
