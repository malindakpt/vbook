import { MetaState } from '../types/interfaces/MetaState';

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export const fetchMetaData = () => {
  return new Promise<MetaState>((resolve) =>
    setTimeout(
      () =>
        resolve({
          name: 'name',
          status: 'idle',
          vehicleTypes: [
            { id: '0', label: 'Car' },
            { id: '1', label: 'Van' }
          ],
          version: '1.0.0'
        }),
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
