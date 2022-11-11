import { useNavigate, useParams } from "react-router-dom";
import {
  useReadVehiclesQuery,
} from "../../../state/api/vehicle.api";
import { useAppSelector } from "../../../state/store";
import { Vehicle } from "../../../types/Vehicle";
import { ErrorComponent } from "../../error/error";
import { ListVehicles } from "./listVehicles";

export const ListVehiclesContainer = () => {
  let { uid } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.app.user);
  const { data, error, isLoading } = useReadVehiclesQuery({UserId: Number(uid)});

  if (!user) {
    return <ErrorComponent text="User N/A" />;
  }

  const handleSelect = (v: Vehicle) => {
    navigate(`/vehicle/${v.id}`);
  };

  return (
    <ListVehicles
      onSelect={handleSelect}
      loading={isLoading}
      vehicles={data}
    />
  );
};
