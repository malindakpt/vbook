import { useNavigate, useParams } from "react-router-dom";
import { useVehicleList } from "../../../hooks/useVehicleList";
import { useReadRecordQuery, useUpdateRecordMutation } from "../../../state/api/record.api";
import { useAppSelector } from "../../../state/store";
import { Record } from "../../../types/Record";
import { ErrorComponent } from "../../error/error";
import { CreateRecord } from "../create/recordCreate";

export const UpdateRecordContainer = () => {
  const { rid } = useParams();
  const user = useAppSelector((state) => state.app.user);
  const navigate = useNavigate();
  const vehicleList = useVehicleList(user?.id);
  
  const { data: record, error, isLoading } = useReadRecordQuery(rid ?? "");
  const [updateVehicle, result] = useUpdateRecordMutation();

  const handleUpdateRecord = async (r: Record, image?: Blob) => {
    const result: any = await updateVehicle({rec: r,  img: image});
    if(!result.error){
      navigate('/record/list');
    }
  };

  if (!user) {
    return <ErrorComponent text="User N/A" />;
  }

  if(isLoading || !vehicleList){
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
      vehicleList={vehicleList}
      initialState={record}
      onSaveRecord={handleUpdateRecord}
      loading={false}
      userId={user.id}
    />
  );
};
