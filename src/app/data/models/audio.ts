import { Lesson } from './lesson';

export interface Audio {
  lektionId: number;
  audioName: string;
  audioUrl: string;
  lesson?: Lesson;
}
