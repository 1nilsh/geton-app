import { LessonDto } from './lesson-dto';

export interface TrainingDto {
  id: number;
  name: string;
  image?: string;
  lessons?: LessonDto[];
}
