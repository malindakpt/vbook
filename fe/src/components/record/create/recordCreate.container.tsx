import { useCreateRecordMutation } from "../../../state/api/record.api";
import { useAppSelector } from "../../../state/store";
import { ErrorComponent } from "../../error/error";
import { Record } from "../../../types/Record";
import { CreateRecord } from "./recordCreate";
import { useVehicleList } from "../../../hooks/useVehicleList";
import { useNavigate, useParams } from "react-router-dom";

export const CreateRecordContainer = () => {
  let { vid } = useParams();

  const user = useAppSelector((state) => state.app.user);
  const vehicleList = useVehicleList(user?.id);
  const navigate = useNavigate();

  const [createRecord] = useCreateRecordMutation();

  const handleSaveRecord = async (r: Record, image?: Blob) => {
      const result: any = await createRecord({rec: r,  img: image});
      if(!result.error){
        navigate('/record/list');
      }
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
