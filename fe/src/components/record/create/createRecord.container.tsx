import { useCreateRecordMutation } from "../../../state/api/record.api";
import { useAppSelector } from "../../../state/store";
import { ErrorComponent } from "../../error/error";
import { CreateRecord } from "./createRecord";
import { Record } from "../../../types/Record";
import { useParams } from "react-router-dom";

export const CreateRecordContainer = () => {
  let { vid } = useParams();
  const vehicleId = Number(vid);

  // const loading = useAppSelector((state) => state.app.addRecord.loading);
  const user = useAppSelector((state) => state.app.user);
  const [createRecord] = useCreateRecordMutation();

  if (!user?.id) {
    return <ErrorComponent text="User N/A" />;
  }
  if (!vehicleId) {
    return <ErrorComponent text="Vehicle N/A" />;
  }

  const handleSaveRecord = (r: Record) => {
    console.log("Record", r);
    createRecord(r);
  };
  return (
    <CreateRecord
      onSaveRecord={handleSaveRecord}
      loading={false}
      vehicleId={vehicleId}
      userId={user.id}
    />
  );
};
