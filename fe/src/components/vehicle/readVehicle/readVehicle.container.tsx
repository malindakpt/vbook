import { useNavigate, useParams } from "react-router-dom";
import { useReadVehicleQuery } from "../../../state/api/vehicle.api";
import { useAppSelector } from "../../../state/store";
import { Vehicle } from "../../../types/Vehicle";
import { ErrorComponent } from "../../error/error";
import { ReadVehicle } from "./readVehicle";

export const ReadVehicleContainer = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.app.user);
  const { data, error, isLoading } = useReadVehicleQuery(id ?? "");
  
  if (!user) {
    return <ErrorComponent text="User N/A" />;
  }

  const handleOnEdit = (v: Vehicle) => {
    navigate(`/vehicle/update/${v.id}`);
  };

  return (
    <ReadVehicle onEdit={handleOnEdit} loading={isLoading} vehicle={data} />
  );
};
