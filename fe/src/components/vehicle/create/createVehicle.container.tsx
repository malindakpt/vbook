import { useCreateVehicleMutation } from "../../../state/api/vehicle.api";
import { useAppSelector } from "../../../state/store";
import { Vehicle } from "../../../types/Vehicle";
import { ErrorComponent } from "../../error/error";
import { CreateVehicle } from "./createVehicle";

export const CreateVehicleContainer = () => {
  const user = useAppSelector((state) => state.app.user);
  const [createVehicle] = useCreateVehicleMutation();

  if (!user?.id) {
    return <ErrorComponent text="User N/A" />;
  }

  const handleCreateVehicle = (v: Vehicle) => {
    console.log("vehicle", v);
    createVehicle(v);
  };
  return (
    <CreateVehicle
      onCreateVehicle={handleCreateVehicle}
      loading={false}
      userId={user.id}
    />
  );
};
