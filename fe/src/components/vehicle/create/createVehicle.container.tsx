import { useNavigate } from "react-router-dom";
import { useCreateVehicleMutation } from "../../../state/api/vehicle.api";
import { useAppSelector } from "../../../state/store";
import { Vehicle } from "../../../types/Vehicle";
import { ErrorComponent } from "../../error/error";
import { CreateVehicle } from "./createVehicle";

export const CreateVehicleContainer = () => {
  const user = useAppSelector((state) => state.app.user);
  const [createVehicle] = useCreateVehicleMutation();
  const navigate = useNavigate();

  if (!user?.id) {
    return <ErrorComponent text="User N/A" />;
  }

  const handleCreateVehicle = async (v: Vehicle) => {
    const result: any = await createVehicle(v);
    if(!result.error){
      navigate(`/vehicle/${result.data.id}`);
    }
  };
  
  return (
    <CreateVehicle
      onCreateVehicle={handleCreateVehicle}
      loading={false}
      userId={user.id}
    />
  );
};
