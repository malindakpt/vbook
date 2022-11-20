import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useReadVehiclesQuery,
  useSearchVehiclesQuery,
} from "../../../state/api/vehicle.api";
import { useAppSelector } from "../../../state/store";
import { Vehicle } from "../../../types/Vehicle";
import { ErrorComponent } from "../../error/error";
import { VehiclesList } from "./vehiclesList";

export const VehiclesListContainer = () => {
  let [searchParams] = useSearchParams();
  const key = searchParams.get("key") ?? "";
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.app.user);
  const { data, error, isLoading } = useSearchVehiclesQuery({ key });
  // const { data, error, isLoading } = useReadVehiclesQuery({UserId: Number(user?.id) ?? 0});

  const handleSelect = (v: Vehicle) => {
    navigate(`/vehicle/${v.id}`);
  };

  if (!user) {
    return <ErrorComponent text="User N/A" />;
  }

  return (
    <VehiclesList onSelect={handleSelect} loading={isLoading} vehicles={data} />
  );
};
