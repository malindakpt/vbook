import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteVehicleMutation,
  useReadVehicleQuery,
} from "../../../state/api/vehicle.api";
import { useAppSelector } from "../../../state/store";
import { Vehicle } from "../../../types/Vehicle";
import { ErrorComponent } from "../../error/error";
import { VehicleDetailedView } from "./vehicleDetailedView";

export const VehicleViewContainer = () => {
  let { vid } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.app.user);
  const { data, error, isLoading } = useReadVehicleQuery(vid ?? "");
  const [deleteVehicle] = useDeleteVehicleMutation();

  if (!user) {
    return <ErrorComponent text="User N/A" />;
  }

  const handleOnAddRecord = (v: Vehicle) => {
    navigate(`/record/create/${v.id}`);
  };

  const handleOnEdit = (v: Vehicle) => {
    navigate(`/vehicle/update/${v.id}`);
  };

  const handleViewRecord = (v: Vehicle) => {
    navigate(`/record/list/${v.id}`);
  };

  const handleOnDelete = (v: Vehicle) => {
    if (v.id) {
      deleteVehicle(v.id);
    } else {
      alert("Vehicle Id does not exist");
    }
  };

  return (
    <VehicleDetailedView
      onAddRecord={handleOnAddRecord}
      onEdit={handleOnEdit}
      onDelete={handleOnDelete}
      onViewRecord={handleViewRecord}
      loading={isLoading}
      vehicle={data}
    />
  );
};
