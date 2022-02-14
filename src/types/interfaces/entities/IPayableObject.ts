import { ILesson } from './ILesson';

export interface IPayableObject {
  title: string;
  desc: string;
  lessons: ILesson[];
  price: number;

  //meta
  orderIndex: number;
  ownerEmail: string;
}
