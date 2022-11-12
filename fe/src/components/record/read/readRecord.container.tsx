import { useNavigate, useParams } from "react-router-dom";
import { useDeleteRecordMutation, useReadRecordQuery } from "../../../state/api/record.api";
import { useAppSelector } from "../../../state/store";
import { Record } from "../../../types/Record";
import { ErrorComponent } from "../../error/error";
import { ReadRecord } from "./readRecord";

export const ReadRecordContainer = () => {
  let { rid } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.app.user);
  const { data, error, isLoading } = useReadRecordQuery(rid ?? "");
  const [deleteVehicle] = useDeleteRecordMutation();

  const handleEdit = (r: Record) => {
    navigate(`/record/update/${r.id}`);
  };

  const handleDelete = (r: Record) => {
    if (r.id) {
      deleteVehicle(r.id);
    } else {
      alert("Record Id does not exist");
    }
  };

  if (!user) {
    return <ErrorComponent text="User N/A" />;
  }

  return (
    <ReadRecord
      onEdit={handleEdit}
      onDelete={handleDelete}
      loading={isLoading}
      record={data}
    />
  );
};
