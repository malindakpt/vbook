import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteRecordMutation,
  useReadRecordsQuery,
} from "../../../state/api/record.api";
import { useAppSelector } from "../../../state/store";
import { Record } from "../../../types/Record";
import { ErrorComponent } from "../../error/error";
import { ListRecords } from "./listRecords";

export const ListRecordsContainer = () => {
  // let { vid } = useParams(); // incase if we need to view Records of other owner
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.app.user);
  const { data, error, isLoading } = useReadRecordsQuery({UserId: user?.id});

  const [deleteRecord, result] = useDeleteRecordMutation();

  const handleSelect = (v: Record) => {
    navigate(`/record/${v.id}`);
  };

  const handleEdit = (r: Record) => {
    navigate(`/record/update/${r.id}`);
  };

  const handleDelete = async (r: Record) => {
    if (r?.id) {
      await deleteRecord(r.id);
    }
  };

  if (!user) {
    return <ErrorComponent text="User N/A" />;
  }

  return (
    <ListRecords
      onSelect={handleSelect}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loading={isLoading}
      records={data}
    />
  );
};
