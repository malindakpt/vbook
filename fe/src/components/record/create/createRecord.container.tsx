import { useCreateRecordMutation } from "../../../state/api/record.api";
import { useAppSelector } from "../../../state/store";
import { ErrorComponent } from "../../error/error";
import { Record } from "../../../types/Record";
import { CreateRecord } from "./createRecord";
import { useVehicleList } from "../../../hooks/useVehicleList";
import { useParams } from "react-router-dom";

export const CreateRecordContainer = () => {
  let { vid } = useParams();

  const user = useAppSelector((state) => state.app.user);
  const vehicleList = useVehicleList(user?.id);

  const [createRecord] = useCreateRecordMutation();

  const handleSaveRecord = (r: Record) => {
    createRecord(r);
  };

  const initialState: Partial<Record> = vid ? { VehicleId: Number(vid) } : {};

  if (!user?.id) {
    return <ErrorComponent text="User N/A" />;
  }

  if (!vehicleList) {
    return <div>Loading...</div>;
  }

  return (
    <CreateRecord
      vehicleList={vehicleList}
      onSaveRecord={handleSaveRecord}
      loading={false}
      userId={user.id}
      initialState={initialState}
    />
  );
};
