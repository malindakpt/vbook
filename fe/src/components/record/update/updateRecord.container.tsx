import { useParams } from "react-router-dom";
import { useReadRecordQuery, useUpdateRecordMutation } from "../../../state/api/record.api";
import { useAppSelector } from "../../../state/store";
import { Record } from "../../../types/Record";
import { ErrorComponent } from "../../error/error";
import { CreateRecord } from "../create/createRecord";

export const UpdateRecordContainer = () => {
  const { vid, rid } = useParams();
  const user = useAppSelector((state) => state.app.user);


  const { data: record, error, isLoading } = useReadRecordQuery(rid ?? "");
  const [updateVehicle, result] = useUpdateRecordMutation();

  const vehicleId = Number(vid);

  if (!user) {
    return <ErrorComponent text="User N/A" />;
  }

  const handleUpdateRecord = (r: Record) => {
    console.log("record", r);
    updateVehicle(r);
  };

  if(isLoading){
    return <div>Loading.....</div>
  }

  if(!record){
    return <div>Record Not Found</div>
  }

  if(!user?.id){
    return <div>User Not Found</div>
  }

  return (
    <CreateRecord
      initialState={record}
      vehicleId={vehicleId}
      onSaveRecord={handleUpdateRecord}
      loading={false}
      userId={user.id}
    />
  );
};
