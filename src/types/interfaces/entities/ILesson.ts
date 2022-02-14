export interface ILesson {
  title: string;
  description: string;
  notice: string;

  liveUrl: string;
  videoUrl: string;
  pdfUrl: string;

  providedAnswers: string[];
  correctAnswers: { ans: string }[];

  // meta
  orderIndex: number;
  ownerEmail: string;
}
