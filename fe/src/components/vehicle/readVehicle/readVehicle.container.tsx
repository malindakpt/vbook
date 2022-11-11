import { useParams, useSearchParams } from "react-router-dom";
import { useReadVehicleQuery } from "../../../state/api/vehicle.api";
import { useAppSelector } from "../../../state/store";
import { Vehicle } from "../../../types/Vehicle";
import { ErrorComponent } from "../../error/error";
import { ReadVehicle } from "./readVehicle";

export const ReadVehicleContainer = () => {
  let { id } = useParams();

  const user = useAppSelector((state) => state.app.user);
  const { data, error, isLoading } = useReadVehicleQuery(id ?? '');

  if (!user) {
    return <ErrorComponent text="User N/A" />;
  }

  return (
        <ReadVehicle
      loading={isLoading}
      vehicle={data}
    />
  );
};
