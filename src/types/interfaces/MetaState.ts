import { VehicleType } from './VehicleType';

export interface MetaState {
  name: string;
  status: 'idle' | 'loading' | 'failed';
  vehicleTypes: VehicleType[];
  version: string;
}
