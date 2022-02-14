import { PayableObject } from './PayableObject';

export class ClassRoom {
  title: string;
  desc: string;
  notice: string;
  payableObjects: PayableObject[];

  // meta
  orderIndex: number;
  ownerEmail: string;

  constructor(owner: string) {
    this.title = '';
    this.desc = '';
    this.notice = '';
    this.payableObjects = [];

    this.orderIndex = 0;
    this.ownerEmail = owner;
  }
}
