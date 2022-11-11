import { useCreateVehicleMutation } from "../../../state/api/vehicle.api";
import { useAppSelector } from "../../../state/store";
import { ErrorComponent } from "../../error/error";
import { CreateRecord } from "./createRecord";
import { Record } from "../../../types/Record";

export const CreateVehicleContainer = () => {
  // const loading = useAppSelector((state) => state.app.addVehicle.loading);
  const user = useAppSelector((state) => state.app.user);
  const [createVehicle] = useCreateVehicleMutation();

  if (!user) {
    return <ErrorComponent text="User N/A" />;
  }

  const handleCreateRecord = (r: Record) => {
    console.log("vehicle", r);
    createVehicle(r);
  };
  return (
    <CreateRecord
      onCreateVehicle={handleCreateRecord}
      loading={false}
      owner={user.identifier}
    />
  );
};
