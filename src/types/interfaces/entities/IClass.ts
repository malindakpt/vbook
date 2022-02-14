import { IPayableObject } from './IPayableObject';

export interface IClass {
  title: string;
  description: string;
  notice: string;
  payableObjects: IPayableObject[];

  // meta
  orderIndex: number;
  ownerEmail: string;
}
