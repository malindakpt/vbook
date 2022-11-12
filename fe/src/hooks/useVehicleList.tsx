import { useReadVehiclesQuery } from "../state/api/vehicle.api";
import { SelectOption } from "../types/SelectOption";
import { Vehicle } from "../types/Vehicle";

const firstOption: SelectOption = { id: 0, label: "- Select Vehicle -" };

export const useVehicleList = (UserId: number | undefined) => {
  const { data } = useReadVehiclesQuery({ UserId });
  const vehicleOptions = (
      data
        ? [
            firstOption,
            ...(data
              ? data.map((v: Vehicle) => ({ id: v.id, label: v.regNo }))
              : []),
          ]
        : null
  );
  return vehicleOptions;
};
