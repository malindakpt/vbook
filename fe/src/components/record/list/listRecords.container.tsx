import { useNavigate, useParams } from "react-router-dom";
import { useReadRecordsQuery } from "../../../state/api/record.api";
import { useAppSelector } from "../../../state/store";
import { Record } from "../../../types/Record";
import { ErrorComponent } from "../../error/error";
import { ListRecords } from "./listRecords";

export const ListRecordsContainer = () => {
  let { vid } = useParams(); // incase if we need to view Records of other owner
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.app.user);
  const { data, error, isLoading } = useReadRecordsQuery({VehicleId: Number(vid)});

  const handleSelect = (v: Record) => {
    navigate(`/record/${v.id}`);
  };

  const handleEdit = (r: Record) => {
    navigate(`/record/update/${r.id}`);
  };

  if (!user) {
    return <ErrorComponent text="User N/A" />;
  }
  
  return (
    <ListRecords
      onSelect={handleSelect}
      onEdit={handleEdit}
      loading={isLoading}
      records={data}
    />
  );
};
