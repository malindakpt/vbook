import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteVehicleMutation,
  useReadVehicleQuery,
} from "../../../state/api/vehicle.api";
import { useAppSelector } from "../../../state/store";
import { Vehicle } from "../../../types/Vehicle";
import { ErrorComponent } from "../../error/error";
import { ReadVehicle } from "./readVehicle";

export const ReadVehicleContainer = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.app.user);
  const { data, error, isLoading } = useReadVehicleQuery(id ?? "");
  const [deleteVehicle] = useDeleteVehicleMutation();

  if (!user) {
    return <ErrorComponent text="User N/A" />;
  }

  const handleOnEdit = (v: Vehicle) => {
    navigate(`/vehicle/update/${v.id}`);
  };

  const handleOnDelete = (v: Vehicle) => {
    if (v.id) {
      deleteVehicle(v.id);
    } else {
      alert("Vehicle Id does not exist");
    }
  };

  return (
    <ReadVehicle
      onEdit={handleOnEdit}
      onDelete={handleOnDelete}
      loading={isLoading}
      vehicle={data}
    />
  );
};
