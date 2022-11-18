import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateVehicleMutation } from "../../../state/api/vehicle.api";
import { useAppSelector } from "../../../state/store";
import { Vehicle } from "../../../types/Vehicle";
import { ErrorComponent } from "../../error/error";
import { VehicleCreate } from "./vehicleCreate";

interface Props {
  simple?: boolean;
}
export const VehicleCreateContainer: FC<Props> = ({simple}) => {
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
    <VehicleCreate
      onSave={handleSaveVehicle}
      loading={false}
      userId={user.id}
      isSimpleMode={simple}
    />
  );
};
