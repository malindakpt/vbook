export class Payment {
  paymentObjectId: string;
  date: number;
  amount: number;

  watchDetails: Record<string, number>; //lessonId, count

  // meta
  ownerEmail: string;

  constructor(obj: any) {
    this.paymentObjectId = obj.paymentObjectId ?? '';
    this.date = obj.date ?? new Date().getTime();
    this.amount = obj.amount ?? 0;

    this.watchDetails = obj.watchDetails ?? {};

    this.ownerEmail = obj.ownerEmail ?? '';
  }
}
