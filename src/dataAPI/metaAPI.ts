import { VehicleType } from '../types/interfaces/VehicleType';

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export const fetchVehicleTypes = () => {
  return new Promise<VehicleType[]>((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: '0', label: 'Car' },
          { id: '1', label: 'Van' }
        ]),
      500
    )
  );
};

export const getName = () => {
  return new Promise<string>((resolve) => setTimeout(() => resolve('Malinda'), 500));
};

export const getMetaVersion = () => {
  return new Promise<string>((resolve) => setTimeout(() => resolve('1.0.0'), 500));
};
