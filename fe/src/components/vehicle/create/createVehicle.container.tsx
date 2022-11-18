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

  const handleSaveVehicle = async (veh: Vehicle, img?: Blob) => {
    const result: any = await createVehicle({veh, img});
    if(!result.error){
      navigate(`/vehicle/${result.data.id}`);
    }
  };
  
  return (
    <CreateVehicle
      onSave={handleSaveVehicle}
      loading={false}
      userId={user.id}
    />
  );
};
