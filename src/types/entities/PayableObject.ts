import { Lesson } from './Lesson';

export class PayableObject {
  title: string;
  desc: string;
  lessons: Lesson[];
  price: number;

  //meta
  orderIndex: number;
  ownerEmail: string;

  constructor(obj: any) {
    this.title = obj.title ?? '';
    this.desc = obj.desc ?? '';
    this.lessons = obj.lessons ?? [];
    this.price = obj.price ?? 0;

    this.orderIndex = obj.orderIndex ?? 0;
    this.ownerEmail = obj.ownerEmail ?? '';
  }
}
