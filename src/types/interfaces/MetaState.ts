import { VehicleType } from './VehicleType';

export interface MetaState {
  status: 'idle' | 'loading' | 'failed';
  vehicleTypes: VehicleType[];
}
