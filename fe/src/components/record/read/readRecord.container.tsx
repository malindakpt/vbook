import { useNavigate, useParams } from "react-router-dom";
import { useReadVehicleQuery, useDeleteVehicleMutation } from "../../../state/api/vehicle.api";
import { useAppSelector } from "../../../state/store";
import { Record } from "../../../types/Record";
import { ErrorComponent } from "../../error/error";
import { ReadRecord } from "./readRecord";

export const ReadRecordContainer = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.app.user);
  const { data, error, isLoading } = useReadVehicleQuery(id ?? "");
  const [deleteVehicle] = useDeleteVehicleMutation();

  if (!user) {
    return <ErrorComponent text="User N/A" />;
  }

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

  return (
    <ReadRecord
      onEdit={handleEdit}
      onDelete={handleDelete}
      loading={isLoading}
      record={data}
    />
  );
};
