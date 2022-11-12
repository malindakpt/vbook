import { useReadVehiclesQuery } from "../state/api/vehicle.api";
import { SelectOption } from "../types/SelectOption";
import { Vehicle } from "../types/Vehicle";

export const useVehicleList = (UserId: number|undefined) => {
    const { data: vehicleList } = useReadVehiclesQuery({UserId});
    const firstOption: SelectOption = { id: 0, label: '- Select Vehicle -'};
    const vehicleOptions = [firstOption, ...(vehicleList ? vehicleList.map((v: Vehicle) => ({id: v.id, label: v.regNo})) : [])];
  
    return vehicleOptions;
}