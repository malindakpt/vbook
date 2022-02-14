export class Lesson {
  title: string;
  desc: string;
  notice: string;

  liveUrl: string;
  videoUrl: string;
  pdfUrl: string;

  duration: number;
  attachments: string[];

  providedAnswers: string[];
  correctAnswers: { ans: string }[];

  allowedWatchCount: number;

  // meta
  orderIndex: number;
  ownerEmail: string;

  constructor(obj: any) {
    this.title = obj.title ?? '';
    this.desc = obj.desc ?? '';
    this.notice = obj.notice ?? '';

    this.liveUrl = obj.liveUrl ?? '';
    this.videoUrl = obj.videoUrl ?? '';
    this.pdfUrl = obj.pdfUrl ?? '';

    this.duration = obj.duration ?? 2;
    this.attachments = obj.attachments ?? [];

    this.providedAnswers = obj.providedAnswers ?? [];
    this.correctAnswers = obj.correctAnswers ?? [];

    this.allowedWatchCount = obj.allowedWatchCount ?? 2;

    this.orderIndex = obj.orderIndex ?? 0;
    this.ownerEmail = obj.ownerEmail ?? '';
  }
}
