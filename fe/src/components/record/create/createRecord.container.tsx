import { useCreateRecordMutation } from "../../../state/api/record.api";
import { useAppSelector } from "../../../state/store";
import { ErrorComponent } from "../../error/error";
import { Record } from "../../../types/Record";
import { CreateRecord } from "./createRecord";
import { useVehicleList } from "../../../hooks/useVehicleList";

export const CreateRecordContainer = () => {

  const user = useAppSelector((state) => state.app.user);
  const vehicleList = useVehicleList(user?.id);

  const [createRecord] = useCreateRecordMutation();

  if (!user?.id) {
    return <ErrorComponent text="User N/A" />;
  }

  const handleSaveRecord = (r: Record) => {
    console.log("Record", r);
    createRecord(r);
  };
  return (
    <CreateRecord
      vehicleList={vehicleList}
      onSaveRecord={handleSaveRecord}
      loading={false}
      userId={user.id}
    />
  );
};
