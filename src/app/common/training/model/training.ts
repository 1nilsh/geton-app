import { Lesson } from './lesson';

export interface Training {
  id: number;
  name: string;
  image?: string;
  lessons?: Lesson[];
}
