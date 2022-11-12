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

  const handleSaveRecord = (r: Record) => {
    createRecord(r);
  };

  if (!user?.id) {
    return <ErrorComponent text="User N/A" />;
  }

  if(!vehicleList) {
    return <div>Loading...</div>
  }

  return (
    <CreateRecord
      vehicleList={vehicleList}
      onSaveRecord={handleSaveRecord}
      loading={false}
      userId={user.id}
    />
  );
};
